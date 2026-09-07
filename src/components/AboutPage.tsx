import React from 'react';
import { 
  ArrowLeft, 
  Heart, 
  BookOpen, 
  MessageSquare, 
  Palette
} from 'lucide-react';
import { AppView } from '../types';
import { PlayArtLogo } from './PlayArtLogo';

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
  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-4xl mx-auto">
      
      {/* 頂部導航 */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5C554B] hover:text-[#1F2421] transition-colors group w-fit"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-[#E2DDD5] flex items-center justify-center group-hover:-translate-x-0.5 transition-transform shadow-2xs">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span>返回首頁</span>
      </button>

      {/* 主標題區塊 */}
      <div className="rounded-3xl p-8 sm:p-10 bg-white border border-[#E8E4DC] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#E2DDD5] p-1.5 shadow-xs shrink-0 flex items-center justify-center">
            <PlayArtLogo className="w-full h-full object-contain" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#4D6A56] border border-[#D5CFC5]">
              <Heart className="w-3.5 h-3.5 text-[#E07A5F]" />
              關於本站・初衷與理念
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1F2421] leading-snug">
              玩藝所：心靈對話與體驗引導資源庫
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed pt-2 border-t border-[#F0EBE1]">
          這是個專為助人工作者、心理師、社工、引導師、培訓講師與團體帶領者量身設計的高質感內容型錄。
          我們將繁複的實務經驗凝鍊為三個核心模組：<b>引導問句庫</b>、<b>藝術媒材表</b>與<b>活動教案庫</b>，
          讓你在帶領團體時能隨時隨地輕鬆檢索、靈感湧現。
        </p>
      </div>

      {/* 三大核心支柱卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDF0ED] text-[#E07A5F] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#1F2421]">三大學派引導問句</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            收錄「焦點解決短期治療 (SFBT)」、「敘事治療」與「ORID 焦點討論法」，協助帶領者精準提問，促進深層自我覺察與對話。
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEF3EF] text-[#4D6A56] flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#1F2421]">藝術媒材心理屬性</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            依據表達性藝術治療原理，整理乾性、濕性、塑形與隱喻等不同媒材的控制度與情緒流動特質，提供精準的媒材選擇策略。
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDF6E9] text-[#D4A373] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#1F2421]">實務教案型錄 ({activitiesCount})</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            涵蓋破冰、暖身、合作、表達、自我探索等豐富主題，每篇教案皆具備清晰人數、時長、強度、詳細步驟與帶領者心法。
          </p>
        </div>
      </div>

      {/* 快速開始按鈕 */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-medium hover:bg-[#343B37] transition-all active:scale-95 shadow-xs"
        >
          前往首頁探索
        </button>
        <button
          onClick={() => onNavigate('activities')}
          className="px-5 py-2.5 rounded-xl bg-white border border-[#D5CFC5] text-[#1F2421] text-xs sm:text-sm font-medium hover:bg-[#F3EFEA] transition-all active:scale-95 shadow-xs"
        >
          瀏覽活動教案庫 ({activitiesCount})
        </button>
      </div>

    </div>
  );
};
