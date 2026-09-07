import React, { useState, useMemo, useRef } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  BookOpen, 
  MessageSquare, 
  Palette,
  User,
  Camera
} from 'lucide-react';
import { AppView } from '../types';
import { PlayArtLogo } from './PlayArtLogo';
import { getAssetUrl } from '../utils/assets';

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigate: (view: AppView) => void;
  activitiesCount: number;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onNavigate,
  activitiesCount,
}) => {
  // 創作者相片支援本地上傳快取或靜態資源多重候選路徑
  const [customPhoto, setCustomPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem('playart_author_photo');
    } catch {
      return null;
    }
  });

  const [photoError, setPhotoError] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoCandidates = useMemo(() => {
    if (customPhoto) return [customPhoto];
    return [
      getAssetUrl('assets/author.jpg'),
      getAssetUrl('assets/profile.jpg'),
      getAssetUrl('assets/creator.jpg'),
      getAssetUrl('assets/author.png'),
      getAssetUrl('assets/profile.png'),
    ];
  }, [customPhoto]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomPhoto(result);
          setPhotoError(false);
          try {
            localStorage.setItem('playart_author_photo', result);
          } catch {
            // ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-7 sm:space-y-8 py-4 sm:py-6 max-w-4xl mx-auto">
      
      {/* 頂部導航 */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5C554B] hover:text-[#1F2421] transition-colors group w-fit cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-[#E2DDD5] flex items-center justify-center group-hover:-translate-x-0.5 transition-transform shadow-2xs">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span>返回首頁</span>
      </button>

      {/* 1. 主標題區塊：關於玩藝所 */}
      <div className="rounded-3xl p-7 sm:p-9 bg-white border border-[#E8E4DC] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-white border border-[#E2DDD5] p-1.5 shadow-xs shrink-0 flex items-center justify-center">
            <PlayArtLogo className="w-full h-full object-contain" />
          </div>
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#4D6A56] border border-[#D5CFC5]">
              <Heart className="w-3.5 h-3.5 text-[#E07A5F]" />
              關於本站・初衷與理念
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1F2421] leading-snug">
              玩藝所：心靈對話與體驗引導資源庫
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-[14px] text-[#5C554B] leading-relaxed pt-2 border-t border-[#F0EBE1]">
          這是個專為助人工作者、心理師、社工、引導師、培訓講師與團體帶領者量身設計的高質感內容型錄。
          我們將繁複的實務經驗凝鍊為三個核心模組：<b>引導問句庫</b>、<b>藝術媒材表</b>與<b>活動教案庫</b>，
          讓你在帶領團體時能隨時隨地輕鬆檢索、靈感湧現。
        </p>
      </div>

      {/* 2. 三大核心支柱卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FDF0ED] text-[#E07A5F] flex items-center justify-center">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F2421]">三大學派引導問句</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            收錄「焦點解決短期治療 (SFBT)」、「敘事治療」與「ORID 焦點討論法」，協助帶領者精準提問，促進深層自我覺察與對話。
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EEF3EF] text-[#4D6A56] flex items-center justify-center">
            <Palette className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F2421]">藝術媒材心理屬性</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            依據表達性藝術治療原理，整理乾性、濕性、塑形與隱喻等不同媒材的控制度與情緒流動特質，提供精準的媒材選擇策略。
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FDF6E9] text-[#D4A373] flex items-center justify-center">
            <BookOpen className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F2421]">實務教案型錄 ({activitiesCount})</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            涵蓋破冰、暖身、合作、表達、自我探索等豐富主題，每篇教案皆具備清晰人數、時長、強度、詳細步驟與帶領者心法。
          </p>
        </div>
      </div>

      {/* 3. 關於創作者介紹區塊 */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#E8E4DC] shadow-xs space-y-4 sm:space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#8C5E58] border border-[#D5CFC5]">
          <User className="w-3.5 h-3.5 text-[#E07A5F]" />
          <span>關於創作者</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 pt-1">
          {/* 照片預留空間 */}
          <div className="relative group shrink-0 w-32 sm:w-36 md:w-40 aspect-3/4 rounded-2xl overflow-hidden border border-[#E2DDD5] bg-[#F5F2EB] shadow-xs flex items-center justify-center">
            {!photoError && photoCandidates[currentPhotoIndex] ? (
              <img
                src={photoCandidates[currentPhotoIndex]}
                alt="周亦霆"
                className="w-full h-full object-cover"
                onError={() => {
                  if (currentPhotoIndex < photoCandidates.length - 1) {
                    setCurrentPhotoIndex((prev) => prev + 1);
                  } else {
                    setPhotoError(true);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-[#FAF8F5] to-[#F2EFE9] text-[#736E65]">
                <div className="w-11 h-11 rounded-full bg-[#EAE5DC] flex items-center justify-center text-[#8C827A] mb-1.5 shadow-2xs group-hover:scale-105 transition-transform">
                  <User className="w-5 h-5 text-[#7D756C]" />
                </div>
                <span className="text-xs font-serif font-bold text-[#1F2421]">周亦霆</span>
                <span className="text-[11px] text-[#8A847A] mt-0.5">照片預留空間</span>
                <span className="text-[9.5px] text-[#A69E92] mt-1 font-mono leading-tight">assets/author.jpg</span>
              </div>
            )}

            {/* 懸浮上傳 / 更換按鈕 */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-medium cursor-pointer"
              title="點擊上傳或更換照片"
            >
              <Camera className="w-4 h-4 mb-1 text-white" />
              <span>更換照片</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          {/* 創作者姓名與經歷自述 */}
          <div className="flex-1 space-y-3 min-w-0">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1F2421]">
                  周亦霆
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F4F0E8] border border-[#E2DDD5] text-[#5C554B] font-medium">
                  創作者 / 實習社工
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-medium text-[#C8644A] leading-relaxed">
                輔仁大學社會工作學系學生，熱衷於探索表達性藝術與戲劇在團體工作中的無限可能。
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed sm:leading-[1.65] text-[#4A443B] text-justify pt-2 border-t border-[#F0EBE1]">
              <p>
                2026 年夏天，我在臺灣戲劇復原力協會擔任社工實習生。這段日子裡，我與夥伴穿梭於不同族群與議題的團體之間；雖然服務對象各異，但不變的是，我們始終以遊戲、戲劇與藝術媒材作為橋樑，陪伴成員在安全與創造性的氛圍中找回內在的復原力量。
              </p>
              <p>
                實際規劃團體時，最燒腦的往往是「今天該帶什麼活動？」。不同發展階段與議題特質的成員，需要截然不同的切入點；到了現場，更考驗著帶領者臨機應變的功力，成為一個「遊戲王」是團體領導者必備的特質之一。
              </p>
              <p>
                架設「玩藝所」，是希望將實習期間的摸索、教案與反思好好沉澱紀錄。期待透過這個開放共享的小天地，與更多助人工作者交流活動靈感，一起在團體實務與藝術媒材的交會處持續探索。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 快速開始按鈕 (位於創作者介紹下方) */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-medium hover:bg-[#343B37] transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          前往首頁探索
        </button>
        <button
          onClick={() => onNavigate('activities')}
          className="px-5 py-2.5 rounded-xl bg-white border border-[#D5CFC5] text-[#1F2421] text-xs sm:text-sm font-medium hover:bg-[#F3EFEA] transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          瀏覽活動教案庫 ({activitiesCount})
        </button>
      </div>

    </div>
  );
};

