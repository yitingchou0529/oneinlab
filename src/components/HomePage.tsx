import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  BookOpen, 
  MessageSquare, 
  Palette, 
  ArrowRight, 
  Clock, 
  Users,
  X,
  Sparkles,
  ExternalLink,
  Tag
} from 'lucide-react';
import { HeroCarousel } from './HeroCarousel';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Activity, AppView, SearchResultItem } from '../types';
import { performGlobalSearch, getSearchSuggestions, KeywordSuggestion } from '../utils/searchEngine';
import { getAssetUrl } from '../utils/assets';

interface HomePageProps {
  onNavigate: (view: AppView) => void;
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
  initialSearchQuery?: string;
  onClearInitialSearch?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  activities,
  onSelectActivity,
  initialSearchQuery = '',
  onClearInitialSearch,
}) => {
  const [searchInput, setSearchInput] = useState(initialSearchQuery);
  const [activeSearchQuery, setActiveSearchQuery] = useState(initialSearchQuery);
  const [isSearching, setIsSearching] = useState(Boolean(initialSearchQuery));
  const [selectedResultType, setSelectedResultType] = useState<'all' | 'activity' | 'inquiry' | 'material'>('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [seed, setSeed] = useState(0);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 當外部傳入初始搜尋詞時同步
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchInput(initialSearchQuery);
      setActiveSearchQuery(initialSearchQuery);
      setIsSearching(true);
    }
  }, [initialSearchQuery]);

  // 點擊外部時關閉建議下拉框
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 即時關鍵字建議清單 (輸入中即時運算)
  const suggestions = useMemo(() => {
    return getSearchSuggestions(searchInput);
  }, [searchInput]);

  // 全站搜尋結果 (按下搜尋後運算)
  const searchResults = useMemo(() => {
    if (!isSearching || !activeSearchQuery.trim()) return [];
    return performGlobalSearch(activeSearchQuery);
  }, [isSearching, activeSearchQuery]);

  // 搜尋結果分類篩選
  const filteredSearchResults = useMemo(() => {
    if (selectedResultType === 'all') return searchResults;
    return searchResults.filter((item) => item.type === selectedResultType);
  }, [searchResults, selectedResultType]);

  const activityResultsCount = useMemo(
    () => searchResults.filter((r) => r.type === 'activity').length,
    [searchResults]
  );
  const inquiryResultsCount = useMemo(
    () => searchResults.filter((r) => r.type === 'inquiry').length,
    [searchResults]
  );
  const materialResultsCount = useMemo(
    () => searchResults.filter((r) => r.type === 'material').length,
    [searchResults]
  );

  // 精選五篇活動教案 (初次預設必定包含第 1 個「箭與靶」，確保使用者隨時看得到成果)
  const featuredActivities = useMemo(() => {
    if (activities.length === 0) return [];
    if (seed === 0) {
      const firstAct = activities.find((a) => a.id === 'notion-act-01') || activities[0];
      const others = activities.filter((a) => a.id !== firstAct.id);
      return [firstAct, ...others.slice(0, 4)];
    }
    const offset = (seed * 5) % activities.length;
    return [...activities.slice(offset), ...activities.slice(0, offset)].slice(0, 5);
  }, [activities, seed]);

  // 換一批推薦 (5篇)
  const handleShuffleFeatured = () => {
    setSeed((prev) => prev + 1);
  };

  // 執行搜尋
  const handleExecuteSearch = (queryToSearch: string) => {
    const q = queryToSearch.trim();
    if (!q) {
      handleClearSearch();
      return;
    }
    setActiveSearchQuery(q);
    setIsSearching(true);
    setShowSuggestions(false);
    setSelectedResultType('all');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch(searchInput);
  };

  // 點擊建議項目
  const handleSelectSuggestion = (suggestion: KeywordSuggestion) => {
    setSearchInput(suggestion.text);
    handleExecuteSearch(suggestion.text);
  };

  // 清除搜尋，返回精選項目推薦
  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearchQuery('');
    setIsSearching(false);
    setShowSuggestions(false);
    if (onClearInitialSearch) {
      onClearInitialSearch();
    }
  };

  const handleSelectActivityById = (activityId: string) => {
    const found = activities.find((a) => a.id === activityId);
    if (found) {
      onSelectActivity(found);
    } else {
      onNavigate('activities');
    }
  };

  return (
    <div className="w-full">
      
      {/* 1. 橫幅：輪播 5 個資源項目的圖片 (100% 取自活動教案庫 30 項教案) */}
      <HeroCarousel
        activities={activities}
        onNavigate={onNavigate}
        onSelectActivity={onSelectActivity}
      />

      {/* 2. 橫幅圖片之下的搜尋欄區域 (輸入時出現關鍵字建議，按下搜尋後直接在頁面顯示內容，不彈跳視窗) */}
      <section aria-label="全站搜尋欄" className="w-full bg-[#FAF8F5] border-b border-[#E8E4DC] py-5 sm:py-6">
        <div ref={searchContainerRef} className="max-w-3xl mx-auto px-4 sm:px-6 relative">
          <form onSubmit={handleFormSubmit} className="flex gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A847A]" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => {
                  if (searchInput.trim()) setShowSuggestions(true);
                }}
                placeholder="搜尋全站內容（活動教案、引導問句、藝術媒材...）"
                className="w-full pl-12 pr-10 py-3 rounded-xl sm:rounded-2xl bg-white border border-[#D5CFC5] text-[#1F2421] placeholder-[#8A847A] text-sm sm:text-base font-normal outline-none shadow-2xs transition-all focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A847A] hover:text-[#1F2421] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-2xl bg-[#1F2421] hover:bg-[#343B37] text-white text-sm font-semibold transition-all duration-150 shadow-xs active:scale-95 shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>搜尋</span>
            </button>
          </form>

          {/* 即時關鍵字建議下拉面板 (輸入中即時浮現) */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-4 right-4 sm:left-6 sm:right-6 top-full mt-2 bg-white rounded-2xl border border-[#E2DDD5] shadow-xl overflow-hidden z-40 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="p-2.5 border-b border-[#F0ECE4] text-[11px] font-semibold text-[#8A847A] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                  即時關鍵字建議
                </span>
                <span className="text-[10px] text-[#A8A196]">點擊快速填入並搜尋</span>
              </div>
              <ul className="py-1 max-h-64 overflow-y-auto divide-y divide-[#F5F2EB]">
                {suggestions.map((sug, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(sug)}
                      className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#FAF8F5] transition-colors group cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm text-[#2B2620] group-hover:text-[#E07A5F] font-medium transition-colors line-clamp-1">
                        {sug.text}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F3EFEA] text-[#736E65] border border-[#E8E4DC] shrink-0 font-normal">
                        {sug.typeLabel}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </section>

      {/* 3. 頁面內容區 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        
        {/* === 情況 A：搜尋中，直接在頁面上展示搜尋結果 (不開彈窗) === */}
        {isSearching && (
          <section aria-label="搜尋結果內容" className="space-y-6 animate-in fade-in duration-200">
            
            {/* 搜尋結果標頭與狀態 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#1F2421] flex items-center gap-2.5">
                  <Search className="w-5 h-5 text-[#E07A5F]" />
                  <span>「{activeSearchQuery}」的搜尋結果</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#736E65] mt-1">
                  全站共找到 <strong className="text-[#1F2421] font-semibold">{searchResults.length}</strong> 筆相關內容
                </p>
              </div>

              {/* 返回/清除搜尋按鈕 */}
              <button
                onClick={handleClearSearch}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2DDD5] text-xs font-semibold text-[#4A443B] hover:bg-[#F3EFEA] hover:border-[#C5BFB5] transition-all active:scale-95 shadow-2xs w-fit cursor-pointer"
              >
                <X className="w-3.5 h-3.5 text-[#C85A3E]" />
                <span>清除搜尋・返回精選</span>
              </button>
            </div>

            {/* 結果類型篩選 Tab */}
            {searchResults.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedResultType('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                    selectedResultType === 'all'
                      ? 'bg-[#1F2421] text-white shadow-xs'
                      : 'bg-white text-[#5C554B] border border-[#E2DDD5] hover:bg-[#FAF8F5]'
                  }`}
                >
                  全部 ({searchResults.length})
                </button>
                <button
                  onClick={() => setSelectedResultType('activity')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                    selectedResultType === 'activity'
                      ? 'bg-[#1F2421] text-white shadow-xs'
                      : 'bg-white text-[#5C554B] border border-[#E2DDD5] hover:bg-[#FAF8F5]'
                  }`}
                >
                  活動教案 ({activityResultsCount})
                </button>
                <button
                  onClick={() => setSelectedResultType('inquiry')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                    selectedResultType === 'inquiry'
                      ? 'bg-[#C85A3E] text-white shadow-xs'
                      : 'bg-white text-[#5C554B] border border-[#E2DDD5] hover:bg-[#FAF8F5]'
                  }`}
                >
                  引導問句 ({inquiryResultsCount})
                </button>
                <button
                  onClick={() => setSelectedResultType('material')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                    selectedResultType === 'material'
                      ? 'bg-[#3E5C46] text-white shadow-xs'
                      : 'bg-white text-[#5C554B] border border-[#E2DDD5] hover:bg-[#FAF8F5]'
                  }`}
                >
                  藝術媒材 ({materialResultsCount})
                </button>
              </div>
            )}

            {/* 搜尋結果列表 / 網格 (手機端雙欄並排，縮減預覽卡片高度) */}
            {filteredSearchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                {filteredSearchResults.map((item) => {
                  if (item.type === 'activity') {
                    const act = item.originalData as Activity;
                    const actNum = parseInt(act.id.replace(/\D/g, ''), 10) || 1;
                    const friendlyFilename = `activity-${actNum}.jpg`;
                    const reservedImgPath = getAssetUrl(act.coverImage || `assets/activities/${friendlyFilename}`);
                    return (
                      <div
                        key={item.id}
                        onClick={() => onSelectActivity(act)}
                        className="group bg-white rounded-xl sm:rounded-2xl border border-[#E8E4DC] hover:border-[#C5BFB5] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
                      >
                        <div>
                          <div className="relative aspect-16/10 overflow-hidden bg-[#EFECE6]">
                            <ImagePlaceholder
                              src={reservedImgPath}
                              alt={act.title}
                              aspectRatio="auto"
                              className="w-full h-full"
                              reservedFilename={friendlyFilename}
                              hint={`支援 activity-${actNum}.jpg 或 activity-notion-act-${String(actNum).padStart(2, '0')}.jpg`}
                              overlayBadge="教案"
                            />
                            <div className="absolute bottom-2 right-2 px-1.5 sm:px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] sm:text-[11px] font-semibold text-[#1F2421] border border-[#E2DDD5] shadow-2xs">
                              {act.category}
                            </div>
                          </div>

                          <div className="p-2.5 sm:p-3.5 space-y-1 sm:space-y-1.5">
                            <h4 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] group-hover:text-[#E07A5F] transition-colors leading-snug line-clamp-1">
                              {act.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-[#736E65] line-clamp-2 leading-normal font-normal h-[2rem] sm:h-[2.4rem] overflow-hidden">
                              {act.summary || item.snippet}
                            </p>
                          </div>
                        </div>

                        <div className="px-2.5 sm:px-3.5 py-2 border-t border-[#F0ECE6] bg-[#FAF8F5]/80 flex items-center justify-between text-[10px] sm:text-xs text-[#8A847A]">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-[#4D6A56]" />
                            <span className="truncate max-w-[60px] sm:max-w-none">{act.groupSize}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#E07A5F]" />
                            <span className="truncate max-w-[70px] sm:max-w-none">{act.duration}</span>
                          </span>
                        </div>
                      </div>
                    );
                  }

                  if (item.type === 'inquiry') {
                    return (
                      <div
                        key={item.id}
                        onClick={() => onNavigate('inquiry')}
                        className="group bg-white rounded-3xl border border-[#F4D0C7] hover:border-[#E07A5F] p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer space-y-4"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FDF0ED] text-[#C85A3E] border border-[#F4D0C7]">
                              <MessageSquare className="w-3 h-3" />
                              引導問句・{item.badge}
                            </span>
                            <span className="text-[10px] text-[#8A847A]">{item.category}</span>
                          </div>
                          <h4 className="font-serif font-bold text-base text-[#1F2421] group-hover:text-[#E07A5F] transition-colors leading-relaxed">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#736E65] leading-relaxed font-normal">
                            {item.snippet}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-xs text-[#C85A3E] font-medium">
                          <span>前往問句專區</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  }

                  // 藝術媒材
                  return (
                    <div
                      key={item.id}
                      onClick={() => onNavigate('materials')}
                      className="group bg-white rounded-3xl border border-[#D1E0D5] hover:border-[#4D6A56] p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#EEF3EF] text-[#3E5C46] border border-[#D1E0D5]">
                            <Palette className="w-3 h-3" />
                            藝術媒材
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-lg text-[#1F2421] group-hover:text-[#3E5C46] transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#736E65] leading-relaxed font-normal">
                          {item.snippet}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-xs text-[#3E5C46] font-medium">
                        <span>前往媒材指南</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 px-4 text-center bg-white rounded-3xl border border-[#EAE6DF] shadow-xs space-y-4 max-w-md mx-auto">
                <div className="w-12 h-12 rounded-2xl bg-[#F3EFEA] text-2xl flex items-center justify-center mx-auto">
                  🔍
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-[#1F2421]">
                    找不到與「{activeSearchQuery}」相關的內容
                  </h4>
                  <p className="text-xs text-[#736E65] leading-relaxed">
                    您可以嘗試使用更精簡的關鍵字（如：破冰、水彩、奇蹟問句、生命線），或點選下方按鈕返回。
                  </p>
                </div>
                <button
                  onClick={handleClearSearch}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1F2421] text-white text-xs font-semibold hover:bg-[#343B37] transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>清除搜尋・返回精選推薦</span>
                </button>
              </div>
            )}

          </section>
        )}

        {/* === 情況 B：非搜尋中，展示常規首頁「精選資源項目」 (已去除 (5 篇範例教案・確認模板排版) 與 三大模組) === */}
        {!isSearching && (
          <section aria-label="精選資源項目" className="space-y-6">
            
            {/* 標題與換一批按鈕 (已依需求刪除「(5 篇範例教案・確認模板排版)」) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E4DC] pb-4">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#1F2421] flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]" />
                  精選資源項目
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleShuffleFeatured}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2DDD5] text-xs font-semibold text-[#4A443B] hover:bg-[#F3EFEA] hover:border-[#C5BFB5] transition-all active:scale-95 shadow-2xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>換一批推薦 (5篇)</span>
                </button>

                <button
                  onClick={() => onNavigate('activities')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1F2421] text-white text-xs font-semibold hover:bg-[#343B37] transition-all active:scale-95 shadow-2xs cursor-pointer"
                >
                  <span>查看全部 ({activities.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 精選卡片展示網格 (5篇精選，手機端雙欄並排，提高視野密度) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
              {featuredActivities.map((act, index) => {
                const actNum = parseInt(act.id.replace(/\D/g, ''), 10) || 1;
                const friendlyFilename = `activity-${actNum}.jpg`;
                const reservedImgPath = getAssetUrl(act.coverImage || `assets/activities/${friendlyFilename}`);
                return (
                  <div
                    key={act.id}
                    onClick={() => onSelectActivity(act)}
                    className="group bg-white rounded-xl sm:rounded-2xl border border-[#E8E4DC] hover:border-[#C5BFB5] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* 封面圖片預留展示 (ImagePlaceholder) */}
                      <div className="relative aspect-16/10 overflow-hidden bg-[#EFECE6]">
                        <ImagePlaceholder
                          src={reservedImgPath}
                          alt={act.title}
                          aspectRatio="auto"
                          className="w-full h-full"
                          reservedFilename={friendlyFilename}
                          hint={`支援 activity-${actNum}.jpg 或 activity-notion-act-${String(actNum).padStart(2, '0')}.jpg`}
                          overlayBadge={`精選 #${index + 1}`}
                        />
                        
                        {/* 分類標籤浮動膠囊 */}
                        <div className="absolute bottom-2 right-2 px-1.5 sm:px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] sm:text-[11px] font-semibold text-[#1F2421] border border-[#E2DDD5] shadow-2xs">
                          {act.category}
                        </div>
                      </div>

                      {/* 卡片內容資訊 */}
                      <div className="p-2.5 sm:p-3.5 space-y-1 sm:space-y-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap text-xs">
                          <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] text-[#5C554B] border border-[#E2DDD5] font-medium text-[10px] sm:text-[11px]">
                            {act.nature[0] || '表達性'}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] text-[#5C554B] border border-[#E2DDD5] font-medium text-[10px] sm:text-[11px]">
                            {act.intensity}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] group-hover:text-[#E07A5F] transition-colors leading-snug line-clamp-1">
                          {act.title}
                        </h4>

                        <p className="text-[11px] sm:text-xs text-[#736E65] line-clamp-2 leading-normal font-normal h-[2rem] sm:h-[2.4rem] overflow-hidden">
                          {act.summary || '精選引導體驗教案，詳情請點擊卡片瀏覽。'}
                        </p>
                      </div>
                    </div>

                    {/* 底部屬性與互動提示 */}
                    <div className="px-2.5 sm:px-3.5 py-2 border-t border-[#F0ECE6] bg-[#FAF8F5]/80 flex items-center justify-between text-[10px] sm:text-xs text-[#8A847A]">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#4D6A56]" />
                        <span className="truncate max-w-[60px] sm:max-w-none">{act.groupSize}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#E07A5F]" />
                        <span className="truncate max-w-[70px] sm:max-w-none">{act.duration}</span>
                      </span>
                    </div>

                  </div>
                );
              })}

              {/* 第 6 格：前往探索全部教案型錄的引導卡片 */}
              <div
                onClick={() => onNavigate('activities')}
                className="group bg-gradient-to-br from-[#FAF8F5] to-[#EFECE6] rounded-xl sm:rounded-2xl border-2 border-dashed border-[#D5CFC5] hover:border-[#1F2421] p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-2.5 shadow-2xs hover:shadow-md transition-all cursor-pointer min-h-[180px] sm:min-h-[220px]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#E2DDD5] flex items-center justify-center text-[#1F2421] group-hover:scale-110 transition-transform shadow-xs">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A373]" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] group-hover:text-[#E07A5F] transition-colors">
                    探索完整教案
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#736E65] max-w-xs leading-relaxed line-clamp-2">
                    全庫收錄 30 項實務教案，多維度精準篩選
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#1F2421] group-hover:text-[#E07A5F]">
                  <span>前往瀏覽 ({activities.length})</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

            </div>

          </section>
        )}

      </div>

    </div>
  );
};
