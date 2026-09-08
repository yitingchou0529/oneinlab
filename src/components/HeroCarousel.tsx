import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';
import { Activity, AppView, CategoryType } from '../types';
import { getAssetUrl } from '../utils/assets';

export interface BannerItem {
  id: string;
  actNum: number;
  reservedImage: string;
  title: string;
  category: string;
  badge: string;
  summary: string;
  tags: string[];
  activity: Activity;
}

interface HeroCarouselProps {
  activities: Activity[];
  onNavigate: (view: AppView) => void;
  onSelectActivity: (activity: Activity) => void;
}

// 輪播背景圖片組件：直接取用該活動的封面照，並智慧解析多種命名格式
const HeroBannerBackground: React.FC<{ activity: Activity }> = ({ activity }) => {
  const candidateUrls = useMemo(() => {
    const urls: string[] = [];
    const add = (u?: string) => {
      if (!u) return;
      let path = u;
      if (!path.startsWith('http') && !path.startsWith('data:') && !path.startsWith('blob:')) {
        if (!path.includes('assets/')) {
          path = `assets/activities/${path}`;
        }
      }
      const resolved = getAssetUrl(path);
      if (!urls.includes(resolved)) urls.push(resolved);
    };

    const match = activity.id.match(/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      const padded = String(num).padStart(2, '0');
      add(`assets/activities/activity-${num}.jpg`);
      add(`assets/activities/activity-notion-act-${padded}.jpg`);
      add(`assets/activities/activity-${num}.jpg.jpg`);
      add(`assets/activities/activity-${padded}.jpg`);
      add(`assets/activity-${num}.jpg`);
      add(`assets/activity-${num}.jpg.jpg`);
      add(`assets/activity-notion-act-${padded}.jpg`);
      add(`assets/activities/activity-${num}.png`);
      add(`assets/activities/activity-${num}.webp`);
    }

    if (activity.coverImage) add(activity.coverImage);

    return urls;
  }, [activity]);

  const [urlIndex, setUrlIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setUrlIndex(0);
    setIsLoaded(false);
    setHasError(false);
  }, [activity.id]);

  const currentUrl = candidateUrls[urlIndex];

  // 檢查快取已完成載入的圖片
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      setHasError(false);
    }
  }, [currentUrl]);

  const handleError = () => {
    if (urlIndex < candidateUrls.length - 1) {
      setUrlIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="absolute inset-0 z-0 bg-[#1A1F1C] overflow-hidden">
      {!hasError && currentUrl && (
        <img
          ref={imgRef}
          key={currentUrl}
          src={currentUrl}
          alt={activity.title}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-95 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        />
      )}

      {/* 若尚未上傳照片時的優雅底色 */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#262E28] via-[#1E2521] to-[#151917] opacity-60" />
      )}

      {/* 從左到右由黑漸淺的輕透漸層：左側保護文字閱讀，右側通透展現活動封面照 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  activities,
  onNavigate,
  onSelectActivity,
}) => {
  // 動態推薦欄位內容：100% 來自使用者設計的活動教案庫
  const banners: BannerItem[] = useMemo(() => {
    if (!activities || activities.length === 0) return [];

    const chosenActivities: Activity[] = [];

    // 第一張固定鎖定已上傳照片的第 1 項教案「箭與靶」
    const act01 = activities.find((a) => a.id === 'notion-act-01');
    if (act01) {
      chosenActivities.push(act01);
    }

    // 其餘依序涵蓋不同類別的代表教案
    const preferredCategories: CategoryType[] = ['破冰', '暖身', '合作', '藝術', '模擬體驗'];
    preferredCategories.forEach((cat) => {
      if (chosenActivities.length < 5) {
        const item = activities.find((a) => a.category === cat && !chosenActivities.some((c) => c.id === a.id));
        if (item) chosenActivities.push(item);
      }
    });

    // 若仍不足 5 個，從其餘教案中依序補足
    activities.forEach((act) => {
      if (chosenActivities.length < 5 && !chosenActivities.some((c) => c.id === act.id)) {
        chosenActivities.push(act);
      }
    });

    return chosenActivities.map((act) => {
      const actNum = parseInt(act.id.replace(/\D/g, ''), 10) || 1;
      return {
        id: act.id,
        actNum,
        reservedImage: getAssetUrl(`assets/activities/activity-${actNum}.jpg`),
        title: act.title,
        category: act.category,
        badge: `${act.category}精選`,
        summary: act.summary,
        tags: [act.intensity, act.groupSize, act.duration],
        activity: act,
      };
    });
  }, [activities]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const mouseStartRef = useRef<{ x: number; time: number } | null>(null);
  const isMouseDownRef = useRef(false);

  // 當 banners 長度變化時，防止索引溢位
  useEffect(() => {
    if (currentIndex >= banners.length && banners.length > 0) {
      setCurrentIndex(0);
    }
  }, [banners.length, currentIndex]);

  // 自動輪播 (每 6 秒切換，滑鼠懸停或觸控拖曳時暫停)
  useEffect(() => {
    if (isPaused || isSwiping || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, isSwiping, banners.length]);

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex] || banners[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // 手機觸控拖動處理
  const handleTouchStart = (e: React.TouchEvent) => {
    if (banners.length <= 1) return;
    setIsPaused(true);
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
    isHorizontalSwipeRef.current = null;
    setIsSwiping(false);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || banners.length <= 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartRef.current.x;
    const diffY = currentY - touchStartRef.current.y;

    // 判斷是否為水平滑動（避免干擾使用者垂直滾動網頁）
    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
        isHorizontalSwipeRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      // 帶阻尼的彈性跟隨，讓觸控時有平滑回饋
      setTouchDeltaX(diffX * 0.65);
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartRef.current && isHorizontalSwipeRef.current) {
      const endX = e.changedTouches[0]?.clientX ?? touchStartRef.current.x;
      const diffX = endX - touchStartRef.current.x;
      const duration = Date.now() - touchStartRef.current.time;
      const velocity = Math.abs(diffX) / Math.max(duration, 1);

      // 觸發切換門檻：水平移動超過 40px 或快速滑拂 (速度 > 0.3)
      if (diffX < -40 || (diffX < -20 && velocity > 0.3)) {
        handleNext();
      } else if (diffX > 40 || (diffX > 20 && velocity > 0.3)) {
        handlePrev();
      }
    }

    touchStartRef.current = null;
    isHorizontalSwipeRef.current = null;
    setIsSwiping(false);
    setTouchDeltaX(0);
  };

  // 支援滑鼠拖動測試
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (banners.length <= 1) return;
    setIsPaused(true);
    isMouseDownRef.current = true;
    mouseStartRef.current = {
      x: e.clientX,
      time: Date.now(),
    };
    setIsSwiping(false);
    setTouchDeltaX(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || !mouseStartRef.current || banners.length <= 1) return;
    const diffX = e.clientX - mouseStartRef.current.x;
    if (Math.abs(diffX) > 6) {
      setIsSwiping(true);
      setTouchDeltaX(diffX * 0.5);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    setIsPaused(false);
    if (mouseStartRef.current && isSwiping) {
      const diffX = e.clientX - mouseStartRef.current.x;
      const duration = Date.now() - mouseStartRef.current.time;
      const velocity = Math.abs(diffX) / Math.max(duration, 1);

      if (diffX < -40 || (diffX < -20 && velocity > 0.3)) {
        handleNext();
      } else if (diffX > 40 || (diffX > 20 && velocity > 0.3)) {
        handlePrev();
      }
    }
    isMouseDownRef.current = false;
    mouseStartRef.current = null;
    setIsSwiping(false);
    setTouchDeltaX(0);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    // 若正在滑動中，避免觸發點擊跳轉
    if (isSwiping || Math.abs(touchDeltaX) > 6) {
      e.preventDefault();
      return;
    }
    if (currentBanner.activity) {
      onSelectActivity(currentBanner.activity);
    } else {
      onNavigate('activities');
    }
  };

  return (
    <div 
      className="relative w-full bg-[#1F2421] overflow-hidden group border-b border-[#E2DDD5] touch-pan-y select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={(e) => {
        setIsPaused(false);
        handleMouseUp(e);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 背景圖片：直接取用該活動的封面照 (全幅平鋪接在頂部 Banner 之下) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-0"
        >
          <HeroBannerBackground activity={currentBanner.activity} />
          
          {/* 裝飾柔和圓環 */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden md:block">
            <div className="w-80 h-80 rounded-full border border-white/20" />
            <div className="w-60 h-60 rounded-full border border-[#E07A5F]/30 -mt-70 ml-10" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 輪播主畫面內容 (依齊 max-w-7xl)，支援觸控拖曳位移回饋 */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] flex flex-col justify-end transition-transform ease-out"
        style={{
          transform: touchDeltaX !== 0 ? `translateX(${touchDeltaX}px)` : undefined,
          transitionDuration: isSwiping ? '0ms' : '300ms',
        }}
      >
        
        {/* 輪播文字內容區塊 */}
        <div className="max-w-2xl space-y-3 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner.id + '-text'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2.5"
            >
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight drop-shadow-sm">
                {currentBanner.title}
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-white/95 leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal max-w-xl drop-shadow-xs">
                {currentBanner.summary}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                {currentBanner.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-black/35 backdrop-blur-xs text-white border border-white/20 font-medium shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 互動按鈕 */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleActionClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF8F5] text-[#1F2421] font-semibold text-xs sm:text-sm hover:bg-white transition-all shadow-md active:scale-95 group/btn cursor-pointer"
            >
              <span>查看此教案內容</span>
              <ArrowRight className="w-4 h-4 text-[#C85A3E] group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* 左右導航切換按鈕 */}
        <button
          onClick={handlePrev}
          aria-label="上一個資源"
          className="absolute left-3 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all active:scale-90 shadow-md cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="下一個資源"
          className="absolute right-3 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all active:scale-90 shadow-md cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 底部指示點 (Dots) */}
        <div className="absolute bottom-4 sm:bottom-6 right-6 sm:right-10 lg:right-12 z-20 flex items-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`跳至第 ${idx + 1} 個資源`}
              className={`h-2 rounded-full transition-all duration-300 active:scale-90 cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-[#FAF8F5]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
