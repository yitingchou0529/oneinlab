import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  MessageSquare, 
  Palette, 
  ArrowRight,
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { performGlobalSearch } from '../utils/searchEngine';
import { SearchResultItem, Activity } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onSelectActivity: (activity: Activity) => void;
  onNavigateToInquiry: () => void;
  onNavigateToMaterials: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onSelectActivity,
  onNavigateToInquiry,
  onNavigateToMaterials,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeType, setActiveType] = useState<'all' | 'activity' | 'inquiry' | 'material'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  const allResults = performGlobalSearch(query);
  const filteredResults = activeType === 'all' 
    ? allResults 
    : allResults.filter(r => r.type === activeType);

  const handleResultClick = (item: SearchResultItem) => {
    onClose();
    if (item.type === 'activity') {
      onSelectActivity(item.originalData as Activity);
    } else if (item.type === 'inquiry') {
      onNavigateToInquiry();
    } else if (item.type === 'material') {
      onNavigateToMaterials();
    }
  };

  const counts = {
    all: allResults.length,
    activity: allResults.filter(r => r.type === 'activity').length,
    inquiry: allResults.filter(r => r.type === 'inquiry').length,
    material: allResults.filter(r => r.type === 'material').length,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E2DDD5] overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 頂部搜尋輸入列 */}
        <div className="p-4 border-b border-[#EAE6DF] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#8A847A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋全站：活動名稱、引導問句、藝術媒材、目標能力..."
            className="w-full text-base bg-transparent border-none outline-none text-[#1F2421] placeholder-[#A39D93]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#8A847A] hover:bg-[#EAE6DF] transition-colors active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded-lg border border-[#D5CFC5] bg-white text-[#5C554B] hover:bg-[#EAE6DF] transition-colors active:scale-95 shrink-0"
          >
            ESC
          </button>
        </div>

        {/* 分類篩選 Tab (全部、活動、問句、媒材) */}
        <div className="px-4 py-2 border-b border-[#EAE6DF] flex items-center gap-1.5 text-xs bg-[#FAF8F5]/50 overflow-x-auto">
          <button
            onClick={() => setActiveType('all')}
            className={`px-3 py-1 rounded-md font-medium transition-all active:scale-95 ${
              activeType === 'all' 
                ? 'bg-[#1F2421] text-white shadow-2xs' 
                : 'text-[#6B6357] hover:bg-[#EAE6DF]'
            }`}
          >
            全部 ({counts.all})
          </button>
          <button
            onClick={() => setActiveType('activity')}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-md font-medium transition-all active:scale-95 ${
              activeType === 'activity' 
                ? 'bg-[#FDF6E9] text-[#B87A44] border border-[#F4E1BA]' 
                : 'text-[#6B6357] hover:bg-[#EAE6DF]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            活動教案 ({counts.activity})
          </button>
          <button
            onClick={() => setActiveType('inquiry')}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-md font-medium transition-all active:scale-95 ${
              activeType === 'inquiry' 
                ? 'bg-[#FDF0ED] text-[#C85A3E] border border-[#F4D0C7]' 
                : 'text-[#6B6357] hover:bg-[#EAE6DF]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            引導問句 ({counts.inquiry})
          </button>
          <button
            onClick={() => setActiveType('material')}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-md font-medium transition-all active:scale-95 ${
              activeType === 'material' 
                ? 'bg-[#EEF3EF] text-[#3E5C46] border border-[#D1E0D5]' 
                : 'text-[#6B6357] hover:bg-[#EAE6DF]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            藝術媒材 ({counts.material})
          </button>
        </div>

        {/* 搜尋結果列表 */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-[#F0ECE6]">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => {
              const iconMap = {
                activity: <BookOpen className="w-4 h-4 text-[#D4A373]" />,
                inquiry: <MessageSquare className="w-4 h-4 text-[#E07A5F]" />,
                material: <Palette className="w-4 h-4 text-[#4D6A56]" />,
              };

              const badgeColor = {
                activity: 'bg-[#FDF6E9] text-[#B87A44] border-[#F4E1BA]',
                inquiry: 'bg-[#FDF0ED] text-[#C85A3E] border-[#F4D0C7]',
                material: 'bg-[#EEF3EF] text-[#3E5C46] border-[#D1E0D5]',
              }[item.type];

              return (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item)}
                  className="p-3 hover:bg-[#FAF8F5] rounded-xl transition-all duration-150 cursor-pointer flex items-start justify-between gap-3 group active:scale-[0.99]"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E2DDD5] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      {iconMap[item.type]}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${badgeColor}`}>
                          {item.typeLabel}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EFECE6] text-[#5C554B]">
                            {item.badge}
                          </span>
                        )}
                        <h4 className="font-semibold text-sm text-[#1F2421] group-hover:text-[#E07A5F] transition-colors truncate">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#736E65] line-clamp-2 leading-relaxed">
                        {item.snippet}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-xs text-[#8A847A] group-hover:text-[#1F2421] pt-1">
                    <span>前往</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })
          ) : query.trim() ? (
            <div className="py-12 text-center text-[#8A847A] space-y-2">
              <p className="text-sm">未找到與「{query}」相關的內容</p>
              <p className="text-xs text-[#A39D93]">嘗試搜尋：破冰、SFBT、水彩、敘事治療、自我探索</p>
            </div>
          ) : (
            <div className="py-10 text-center text-[#8A847A] space-y-3">
              <Sparkles className="w-6 h-6 mx-auto text-[#D4A373]" />
              <p className="text-sm font-medium text-[#1F2421]">全站快速檢索</p>
              <p className="text-xs max-w-sm mx-auto text-[#736E65]">
                可輸入任意關鍵字，即時比對 30 項活動教案、三大學派引導問句與常用藝術媒材指南。
              </p>
            </div>
          )}
        </div>

        {/* 底部輔助列 */}
        <div className="px-4 py-2.5 bg-[#FAF8F5] border-t border-[#EAE6DF] text-[11px] text-[#8A847A] flex items-center justify-between">
          <span>點擊任意項目立即跳轉或開啟詳細教案</span>
          <span>按 ESC 鍵關閉</span>
        </div>
      </div>
    </div>
  );
};
