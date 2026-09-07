import React from 'react';
import { 
  Search, 
  X, 
  RotateCcw, 
  Users, 
  Zap, 
  SlidersHorizontal,
  Flame,
  Layers,
  GraduationCap
} from 'lucide-react';
import { FilterState, CategoryType, TargetAudience, IntensityLevel, DepthLevel, GroupSizeOption } from '../types';
import { CATEGORIES } from '../data/activities';

interface FilterBarProps {
  filters: FilterState;
  onChangeFilters: (partial: Partial<FilterState>) => void;
  onResetFilters: () => void;
  categoryCounts: Record<string, number>;
  totalResults: number;
  totalActivities: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  categoryCounts,
  totalResults,
  totalActivities,
}) => {
  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.selectedCategory !== '全部' ||
    filters.selectedAudience !== 'all' ||
    filters.selectedGroupSize !== 'all' ||
    filters.selectedIntensity !== 'all' ||
    filters.selectedDepth !== 'all' ||
    filters.selectedAbility !== '';

  const popularAbilities = ['全部能力', '創意', '反應力', '合作', '溝通', '肢體', '自我覺察', '專注'];

  return (
    <div className="space-y-5">
      
      {/* 搜尋框與排序 */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        
        {/* 即時文字搜尋框 */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8A847A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChangeFilters({ searchQuery: e.target.value })}
            placeholder="搜尋活動名稱、一句話亮點、道具、引導步驟或能力..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-sm text-[#1F2421] placeholder:text-[#A6A095] focus:outline-hidden focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChangeFilters({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A847A] hover:text-[#1F2421] p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 排序方式選單 */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs text-[#7A7368] whitespace-nowrap">
            排序：
          </label>
          <select
            id="sort-select"
            value={filters.sortBy}
            onChange={(e) => onChangeFilters({ sortBy: e.target.value as any })}
            className="px-3 py-2.5 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs sm:text-sm text-[#1F2421] focus:outline-hidden focus:ring-2 focus:ring-[#E07A5F]/30"
          >
            <option value="default">預設排序 (Notion 編號)</option>
            <option value="title">名稱筆畫順序</option>
            <option value="intensity">依活動強度 (高→低)</option>
          </select>
        </div>

      </div>

      {/* 分類標籤列 (Tabs / Pills) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[#7A7368]">
          <span className="font-medium">活動類型分類：</span>
          <span>
            共 <strong className="text-[#1F2421]">{totalResults}</strong> 項（資料庫總計 {totalActivities} 項）
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.selectedCategory === cat;
            const count = categoryCounts[cat] ?? 0;
            return (
              <button
                key={cat}
                onClick={() => onChangeFilters({ selectedCategory: cat })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'bg-[#1F2421] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#F2EFE9] text-[#5C554B] hover:bg-[#EAE5DC] hover:text-[#1F2421]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#E2DDD5] text-[#5C554B]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 次要條件篩選區（建議人數、活動強度、深度、對象族群） */}
      <div className="pt-2 border-t border-[#F0ECE4] flex flex-wrap items-center gap-2.5 sm:gap-3">
        
        {/* 建議人數 */}
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#7A7368]" />
          <select
            id="filter-groupsize"
            value={filters.selectedGroupSize}
            onChange={(e) => onChangeFilters({ selectedGroupSize: e.target.value as GroupSizeOption })}
            className="px-2.5 py-1.5 rounded-lg border border-[#E2DDD5] bg-[#FAF8F5] text-xs text-[#1F2421] focus:outline-hidden focus:ring-1 focus:ring-[#E07A5F]"
          >
            <option value="all">建議人數：全部</option>
            <option value="個人">個人 (1人)</option>
            <option value="2~5人">2~5人 (小組)</option>
            <option value="5人以上">5人以上 (大團體)</option>
          </select>
        </div>

        {/* 活動強度 */}
        <div className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-[#E07A5F]" />
          <select
            id="filter-intensity"
            value={filters.selectedIntensity}
            onChange={(e) => onChangeFilters({ selectedIntensity: e.target.value as IntensityLevel })}
            className="px-2.5 py-1.5 rounded-lg border border-[#E2DDD5] bg-[#FAF8F5] text-xs text-[#1F2421] focus:outline-hidden focus:ring-1 focus:ring-[#E07A5F]"
          >
            <option value="all">活動強度：全部</option>
            <option value="低強度">低強度（靜態、安頓）</option>
            <option value="中強度">中強度（適度走動交流）</option>
            <option value="高強度">高強度（敏捷奔跑破冰）</option>
          </select>
        </div>

        {/* 深度 */}
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#4D6A56]" />
          <select
            id="filter-depth"
            value={filters.selectedDepth === '較深入' ? '較深' : filters.selectedDepth}
            onChange={(e) => onChangeFilters({ selectedDepth: e.target.value as DepthLevel })}
            className="px-2.5 py-1.5 rounded-lg border border-[#E2DDD5] bg-[#FAF8F5] text-xs text-[#1F2421] focus:outline-hidden focus:ring-1 focus:ring-[#E07A5F]"
          >
            <option value="all">深度層次：全部</option>
            <option value="較淺">較淺（輕鬆無負擔）</option>
            <option value="適中">適中（自我省思）</option>
            <option value="較深">較深（深刻心理覺察）</option>
          </select>
        </div>

        {/* 團體對象族群 */}
        <div className="flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-[#817291]" />
          <select
            id="filter-audience"
            value={filters.selectedAudience}
            onChange={(e) => onChangeFilters({ selectedAudience: e.target.value as TargetAudience })}
            className="px-2.5 py-1.5 rounded-lg border border-[#E2DDD5] bg-[#FAF8F5] text-xs text-[#1F2421] focus:outline-hidden focus:ring-1 focus:ring-[#E07A5F]"
          >
            <option value="all">對象族群：全部</option>
            <option value="兒童">兒童適用</option>
            <option value="青少年">青少年適用</option>
            <option value="成人">成人適用</option>
          </select>
        </div>

        {/* 能力標籤過濾 */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {popularAbilities.map((ab) => {
            const isAll = ab === '全部能力';
            const isSelected = isAll ? filters.selectedAbility === '' : filters.selectedAbility === ab;
            return (
              <button
                key={ab}
                onClick={() => onChangeFilters({ selectedAbility: isAll ? '' : ab })}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#EFECE6] text-[#1F2421] font-bold border border-[#D5CFC5]'
                    : 'text-[#7A7368] hover:text-[#1F2421] hover:bg-[#F9F8F6]'
                }`}
              >
                {ab}
              </button>
            );
          })}
        </div>

        {/* 一鍵清除篩選 */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#C85A3E] hover:text-[#B23A48] hover:bg-[#FDF0ED] rounded-lg transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>重設篩選</span>
          </button>
        )}

      </div>

    </div>
  );
};
