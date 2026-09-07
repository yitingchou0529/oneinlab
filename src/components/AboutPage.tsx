import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  BookOpen, 
  MessageSquare, 
  Palette,
  User,
  Compass
} from 'lucide-react';
import { AppView } from '../types';
import { PlayArtLogo } from './PlayArtLogo';
import { getAssetUrl } from '../utils/assets';

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigate: (view: AppView) => void;
  activitiesCount?: number;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onNavigate,
}) => {
  const [photoError, setPhotoError] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // 創作者照片直接載入專屬後台資料夾 about-me 中的照片檔案，供所有使用者與各裝置造訪時直接閱覽
  const photoCandidates = useMemo(() => {
    return [
      getAssetUrl('about-me/about-me.jpg'),
      getAssetUrl('about-me/about-me.jpg.jpg'),
      getAssetUrl('about-me/about-me.jpeg'),
      getAssetUrl('about-me/about-me.png'),
      getAssetUrl('about-me/about-me.webp'),
      '/about-me/about-me.jpg',
      '/about-me/about-me.jpg.jpg',
      getAssetUrl('assets/about-me/about-me.jpg'),
    ];
  }, []);

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

      {/* 1. 主標題與本站介紹區塊 */}
      <div className="rounded-3xl p-7 sm:p-9 bg-white border border-[#E8E4DC] shadow-xs space-y-5">
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
              玩藝所：以玩入心 活動資源庫
            </h2>
          </div>
        </div>

        {/* 本站詳細介紹 */}
        <div className="pt-4 border-t border-[#F0EBE1] space-y-4 text-xs sm:text-[13.5px] text-[#4A443B] leading-relaxed">
          <p className="font-medium text-[#1F2421] sm:text-[14.5px]">
            玩藝所（One In Lab）是一個整合表達性藝術、戲劇遊戲與活動的實務教案資料庫。
          </p>

          {/* 名稱意涵 */}
          <div className="rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] p-4 sm:p-5 space-y-2.5">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#E07A5F]"></span>
              名稱意涵
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#5C554B] pl-1">
              <li className="flex items-start gap-2">
                <span className="text-[#E07A5F] font-bold shrink-0">•</span>
                <span><b>One In 諧音「玩藝」</b>：結合遊戲的趣味與藝術媒材的表達。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E07A5F] font-bold shrink-0">•</span>
                <span><b>All in one</b>：一站式整合多元團體活動與教案，方便工作者快速檢索與靈感共備。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E07A5F] font-bold shrink-0">•</span>
                <span><b>從 One（玩）入 In（內在）</b>：透過遊戲與活動設計，降低防衛，引導成員進入內在世界探索，達到復原力效果。</span>
              </li>
            </ul>
          </div>

          {/* 本站核心 */}
          <div className="rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] p-4 sm:p-5 space-y-2">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#4D6A56]"></span>
              本站核心
            </h3>
            <p className="text-xs sm:text-[13px] text-[#5C554B] leading-relaxed pl-1">
              源自創作者在臺灣戲劇復原力協會的社工實習實踐，將第一線團體活動設計、操作步驟與反思系統化記錄。建立一套可立即參考、彈性調度且兼具結構性的教案工具庫。
            </p>
          </div>
        </div>
      </div>

      {/* 2. 三大核心支柱卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FDF0ED] text-[#E07A5F] flex items-center justify-center">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F2421]">三大學派引導問句</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            收錄「焦點解決短期治療」、「敘事治療」與「ORID 焦點討論法」，協助帶領者精準提問，促進深層自我覺察與對話。
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EEF3EF] text-[#4D6A56] flex items-center justify-center">
            <Palette className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F2421]">藝術媒材</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            彙整表達性藝術常用媒材及特性介紹，作為活動介入或遊戲設計時的指引。
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FDF6E9] text-[#D4A373] flex items-center justify-center">
            <BookOpen className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F2421]">實務教案型錄</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            涵蓋破冰、暖身、合作、表達、自我探索等豐富主題，每篇教案皆具備建議人數、時長、強度、詳細步驟與帶領者心法。
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
          {/* 照片展示空間：直接讀取後台 about-me 資料夾中的照片檔案 */}
          <div className="relative shrink-0 w-32 sm:w-36 md:w-40 aspect-3/4 rounded-2xl overflow-hidden border border-[#E2DDD5] bg-[#F5F2EB] shadow-xs flex items-center justify-center">
            {!photoError && photoCandidates[currentPhotoIndex] ? (
              <img
                src={photoCandidates[currentPhotoIndex]}
                alt="創作者 周亦霆"
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
                <div className="w-11 h-11 rounded-full bg-[#EAE5DC] flex items-center justify-center text-[#8C827A] mb-1.5 shadow-2xs">
                  <User className="w-5 h-5 text-[#7D756C]" />
                </div>
                <span className="text-xs font-serif font-bold text-[#1F2421]">周亦霆</span>
                <span className="text-[11px] text-[#8A847A] mt-0.5">創作者相片</span>
                <span className="text-[9.5px] text-[#A69E92] mt-1 font-mono leading-tight">about-me/about-me.jpg</span>
              </div>
            )}
          </div>

          {/* 創作者姓名與經歷自述 */}
          <div className="flex-1 space-y-3 min-w-0">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1F2421]">
                  周亦霆
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F4F0E8] border border-[#E2DDD5] text-[#5C554B] font-medium">
                  創作者
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

      {/* 4. 快速導航按鈕 (位於創作者介紹下方) */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-medium hover:bg-[#343B37] transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          首頁
        </button>
        <button
          onClick={() => onNavigate('activities')}
          className="px-5 py-2.5 rounded-xl bg-white border border-[#D5CFC5] text-[#1F2421] text-xs sm:text-sm font-medium hover:bg-[#F3EFEA] transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          活動教案庫
        </button>
      </div>

    </div>
  );
};


