import React, { useState, useMemo, useEffect } from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'banner' | 'card' | 'square' | 'wide' | 'auto';
  reservedFilename: string;
  hint?: string;
  overlayBadge?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  reservedFilename,
  hint,
  overlayBadge,
}) => {
  // 自動解析多重候選路徑（支援放置在 /public/assets/ 或 /public/assets/activities/，支援簡短命名與副檔名相容）
  const candidateUrls = useMemo(() => {
    const urls: string[] = [];
    const add = (u?: string) => {
      if (!u) return;
      const normalized = (u.startsWith('/') || u.startsWith('http') || u.startsWith('data:'))
        ? u
        : `/assets/activities/${u}`;
      if (!urls.includes(normalized)) urls.push(normalized);
    };

    // 解析活動編號，如 notion-act-01、activity-1 等，優先加入最常用的標準路徑
    const match = (src || reservedFilename || '').match(/(?:notion-act-|activity-)(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      const padded = String(num).padStart(2, '0');

      // 優先依序嘗試目前資料夾中最常見的命名方式
      add(`/assets/activities/activity-${num}.jpg`);
      add(`/assets/activities/activity-notion-act-${padded}.jpg`);
      add(`/assets/activities/activity-${num}.jpg.jpg`);
      add(`/assets/activities/activity-${padded}.jpg`);
      add(`/assets/activity-${num}.jpg`);
      add(`/assets/activity-${num}.jpg.jpg`);
      add(`/assets/activity-notion-act-${padded}.jpg`);
      add(`/assets/activities/activity-${num}.png`);
      add(`/assets/activities/activity-${num}.webp`);
    }

    add(src);
    if (reservedFilename) add(reservedFilename);

    return urls;
  }, [src, reservedFilename]);

  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // 當 src 變更時重設狀態
  useEffect(() => {
    setCurrentUrlIndex(0);
    setHasError(false);
    setIsLoaded(false);
  }, [src, reservedFilename]);

  const currentUrl = candidateUrls[currentUrlIndex] || src;

  // 檢查快取已完成載入的圖片 (特別是預覽 iframe 環境中防止 onLoad 未及時觸發)
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      setHasError(false);
    }
  }, [currentUrl]);

  const handleImageError = () => {
    if (currentUrlIndex < candidateUrls.length - 1) {
      setCurrentUrlIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const ratioClass = {
    banner: 'aspect-[21/9] sm:aspect-[2.4/1]',
    card: 'aspect-[16/10]',
    square: 'aspect-square',
    wide: 'aspect-[16/9]',
    auto: '',
  }[aspectRatio];

  return (
    <div className={`relative overflow-hidden bg-[#EFECE6] ${ratioClass} ${className}`}>
      {/* 嘗試載入圖片（自動依序嘗試多種可能放置路徑） */}
      {!hasError && currentUrl && (
        <img
          ref={imgRef}
          key={currentUrl}
          src={currentUrl}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
          }`}
        />
      )}

      {/* 當圖片尚未上傳或載入失敗時，顯示優雅預留檔名佔位設計 */}
      {(!isLoaded || hasError) && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-[#D5CFC5] rounded-inherit bg-gradient-to-br from-[#FAF8F5] via-[#F3EFEA] to-[#EAE6DF] select-none">
          <div className="w-12 h-12 rounded-2xl bg-white/80 border border-[#E2DDD5] flex items-center justify-center text-[#8A847A] shadow-2xs mb-2.5">
            <ImageIcon className="w-6 h-6 text-[#A39D93]" />
          </div>

          <span className="text-xs font-semibold text-[#5C554B] tracking-wide flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#E07A5F]" />
            預留圖片位置
          </span>

          <div className="mt-1 px-2.5 py-1 rounded-md bg-white/70 border border-[#E2DDD5] text-[11px] font-mono text-[#736E65] max-w-full truncate">
            建議檔名：<span className="text-[#1F2421] font-medium">{reservedFilename}</span>
          </div>

          <p className="text-[10px] text-[#8A847A] mt-1">
            {hint || '支援直接放在 /public/assets/ 命名為 activity-{編號}.jpg'}
          </p>

          {overlayBadge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1F2421]/75 backdrop-blur-xs text-[11px] font-medium text-white shadow-xs">
              {overlayBadge}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
