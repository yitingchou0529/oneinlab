import React from 'react';
import { Menu } from 'lucide-react';
import { AppView } from '../types';
import { PlayArtLogo } from './PlayArtLogo';

interface HeaderProps {
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  onOpenMenu: () => void;
  totalCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectView,
  onOpenMenu,
}) => {
  return (
    <header className="border-b border-[#E8E4DC] bg-[#FAF8F5]/95 backdrop-blur-md sticky top-0 z-30 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 sm:py-3.5 flex items-center justify-between gap-3">
          
          {/* 左側：選單 Icon + LOGO 預留空間 + 網站名稱「玩藝所」 */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* 最左邊選單按鈕 (點擊展開側欄 Drawer) */}
            <button
              id="btn-open-sidebar"
              onClick={onOpenMenu}
              aria-label="打開主選單"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white hover:bg-[#EFECE6] border border-[#E2DDD5] text-[#1F2421] flex items-center justify-center transition-all duration-150 shadow-2xs hover:shadow-xs active:scale-90 shrink-0 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* 網站名稱與 LOGO 預留區域 (點擊返回首頁) */}
            <div 
              onClick={() => onSelectView('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              title="回到首頁"
            >
              {/* 玩藝所專屬藝術形象 LOGO */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center shadow-xs overflow-hidden border border-[#E2DDD5] group-hover:scale-105 group-hover:border-[#D5CFC5] transition-all duration-150 shrink-0 p-0.5">
                <PlayArtLogo className="w-full h-full object-contain" />
              </div>

              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-serif font-bold tracking-tight text-[#1F2421] group-hover:text-[#E07A5F] transition-colors">
                  玩藝所
                </h1>
                <p className="text-[10px] sm:text-xs text-[#736E65] font-normal hidden sm:block">
                  引導問句庫・藝術媒材表・教案型錄
                </p>
              </div>
            </div>

          </div>

          {/* 右側：最右側右下角小小的［Created by YITING］ */}
          <div className="self-end pb-0.5 sm:pb-1 shrink-0 flex items-end">
            <span 
              id="header-creator-credit"
              className="text-[10px] sm:text-[11px] font-sans font-normal text-[#8C857B] tracking-wide select-none leading-none whitespace-nowrap"
            >
              ［Created by YITING］
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};
