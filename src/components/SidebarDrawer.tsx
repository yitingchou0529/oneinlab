import React, { useState } from 'react';
import { 
  X, 
  Home, 
  BookOpen, 
  MessageSquare, 
  Palette, 
  Info, 
  Search, 
  ChevronDown, 
  FolderTree, 
  ExternalLink,
  Sparkles,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView } from '../types';
import { PlayArtLogo } from './PlayArtLogo';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onSearch: (query: string) => void;
  activitiesCount: number;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  onSearch,
  activitiesCount,
}) => {
  // 「資源」選單的下拉展開狀態 (預設展開方便點選)
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleSelectView = (view: AppView) => {
    onNavigate(view);
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    onSearch(searchInput);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          
          {/* 背景半透明遮罩 (點擊關閉) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* 側邊欄本體 (平滑自左側滑出) */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-xs sm:max-w-sm bg-[#FAF8F5] border-r border-[#E2DDD5] shadow-2xl flex flex-col h-full z-10 overflow-hidden"
          >
            {/* 側欄頂部：LOGO 空間與網站名稱 */}
            <div className="p-4 sm:p-5 border-b border-[#E8E4DC] flex items-center justify-between bg-white/70">
              <div 
                onClick={() => handleSelectView('home')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                {/* 玩藝所專屬藝術形象 LOGO */}
                <div className="relative w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-xs overflow-hidden border border-[#E2DDD5] group-hover:scale-105 group-hover:border-[#D5CFC5] transition-transform shrink-0 p-0.5">
                  <PlayArtLogo className="w-full h-full object-contain" />
                </div>

                <div>
                  <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F2421] group-hover:text-[#E07A5F] transition-colors leading-tight">
                    玩藝所
                  </h2>
                  <p className="text-[10px] text-[#8A847A]">
                    引導與體驗學習資源型錄
                  </p>
                </div>
              </div>

              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                aria-label="關閉側邊選單"
                className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EAE6DF] border border-[#E2DDD5] flex items-center justify-center text-[#5C554B] transition-all active:scale-90 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 側欄內容區 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* 1. 搜尋欄 (輸入後按 Enter 直接於首頁呈現結果) */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-3.5 w-4 h-4 text-[#8A847A]" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="搜尋全站資源..."
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-[#E2DDD5] focus:border-[#E07A5F] text-xs text-[#1F2421] placeholder-[#8A847A] outline-none shadow-2xs transition-all"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => setSearchInput('')}
                      className="absolute right-2.5 text-[#8A847A] hover:text-[#1F2421] p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* 導航選單列表 */}
              <nav className="space-y-1 text-sm font-medium">
                
                {/* 2. 首頁 */}
                <button
                  onClick={() => handleSelectView('home')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer ${
                    currentView === 'home'
                      ? 'bg-[#1F2421] text-white shadow-xs'
                      : 'text-[#5C554B] hover:bg-white hover:text-[#1F2421]'
                  }`}
                >
                  <Home className="w-4 h-4 shrink-0" />
                  <span>首頁</span>
                </button>

                {/* 3. 資源 (可下拉為：引導問句庫、活動教案庫、藝術媒材表) */}
                <div className="pt-1">
                  <button
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[#5C554B] hover:bg-white hover:text-[#1F2421] transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <FolderTree className="w-4 h-4 text-[#D4A373] shrink-0" />
                      <span>資源庫</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isResourcesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-[#8A847A]" />
                    </motion.div>
                  </button>

                  {/* 下拉子項目 (引導問句庫、活動教案庫、藝術媒材表) */}
                  <AnimatePresence>
                    {isResourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4 pr-1 py-1 space-y-1"
                      >
                        {/* 3-1. 引導問句庫 */}
                        <button
                          onClick={() => handleSelectView('inquiry')}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all active:scale-[0.98] cursor-pointer ${
                            currentView === 'inquiry'
                              ? 'bg-[#FDF0ED] text-[#C85A3E] font-semibold shadow-2xs border border-[#F4D0C7]'
                              : 'text-[#6B6357] hover:bg-white hover:text-[#1F2421]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <MessageSquare className="w-3.5 h-3.5 text-[#C85A3E]" />
                            <span>引導問句庫</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF8F5] text-[#8A847A] border border-[#E8E4DC]">
                            3大主題
                          </span>
                        </button>

                        {/* 3-2. 活動教案庫 */}
                        <button
                          onClick={() => handleSelectView('activities')}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all active:scale-[0.98] cursor-pointer ${
                            currentView === 'activities'
                              ? 'bg-[#1F2421] text-white font-semibold shadow-2xs'
                              : 'text-[#6B6357] hover:bg-white hover:text-[#1F2421]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#D4A373]" />
                            <span>活動教案庫</span>
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            currentView === 'activities'
                              ? 'bg-white/20 text-white'
                              : 'bg-[#FAF8F5] text-[#8A847A] border border-[#E8E4DC]'
                          }`}>
                            {activitiesCount} 篇
                          </span>
                        </button>

                        {/* 3-3. 藝術媒材表 */}
                        <button
                          onClick={() => handleSelectView('materials')}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all active:scale-[0.98] cursor-pointer ${
                            currentView === 'materials'
                              ? 'bg-[#EEF3EF] text-[#3E5C46] font-semibold shadow-2xs border border-[#D1E0D5]'
                              : 'text-[#6B6357] hover:bg-white hover:text-[#1F2421]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Palette className="w-3.5 h-3.5 text-[#4D6A56]" />
                            <span>藝術媒材表</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF8F5] text-[#8A847A] border border-[#E8E4DC]">
                            6大媒材
                          </span>
                        </button>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. 關於我們與理念 */}
                <button
                  onClick={() => handleSelectView('about')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer ${
                    currentView === 'about'
                      ? 'bg-[#1F2421] text-white shadow-xs'
                      : 'text-[#5C554B] hover:bg-white hover:text-[#1F2421]'
                  }`}
                >
                  <Info className="w-4 h-4 shrink-0" />
                  <span>關於本站</span>
                </button>

              </nav>

            </div>

            {/* 側欄頁尾 */}
            <div className="p-4 border-t border-[#E8E4DC] bg-white/70 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#8A847A]">
                <span>玩藝所</span>
                <span>v2.0</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
