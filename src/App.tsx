import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Compass, 
  CheckCircle, 
  ArrowLeft,
  MessageSquare,
  Palette,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, FilterState, CategoryType, AppView } from './types';
import { NOTION_ACTIVITIES, CATEGORIES } from './data/activities';
import { Header } from './components/Header';
import { SidebarDrawer } from './components/SidebarDrawer';
import { HomePage } from './components/HomePage';
import { InquiryPage } from './components/InquiryPage';
import { MaterialsPage } from './components/MaterialsPage';
import { AboutPage } from './components/AboutPage';
import { FilterBar } from './components/FilterBar';
import { ActivityCard } from './components/ActivityCard';
import { ActivityDetailModal } from './components/ActivityDetailModal';
import { PlayArtLogo } from './components/PlayArtLogo';

interface HistoryState {
  view: AppView;
  activityId: string | null;
}

// 輔助函式：自多種 URL 參數形式精準比對活動 (支援 notion-act-01、act-01、純數字編號或活動標題)
function findActivityByParam(list: Activity[], param: string | null): Activity | null {
  if (!param) return null;
  const cleanParam = decodeURIComponent(param).trim().toLowerCase();
  
  // 1. 完全比對 ID
  let found = list.find((a) => a.id.toLowerCase() === cleanParam);
  if (found) return found;

  // 2. 去除 activity- 或 notion- 前綴後比對
  const strippedParam = cleanParam.replace(/^(activity-|notion-)/, '');
  found = list.find((a) => a.id.toLowerCase().replace(/^(activity-|notion-)/, '') === strippedParam);
  if (found) return found;

  // 3. 提取數字編號 (例如 "1", "01" 對應 "notion-act-01")
  const num = parseInt(cleanParam.replace(/\D/g, ''), 10);
  if (!isNaN(num)) {
    found = list.find((a) => {
      const aNum = parseInt(a.id.replace(/\D/g, ''), 10);
      return aNum === num;
    });
    if (found) return found;
  }

  // 4. 比對標題
  found = list.find((a) => a.title.toLowerCase() === cleanParam);
  return found || null;
}

export default function App() {
  // 活動資料庫狀態：以 NOTION_ACTIVITIES（30 項真實教案）為唯一真實來源，徹底清除舊版快取
  const [activities] = useState<Activity[]>(() => {
    try {
      localStorage.removeItem('activity_catalog_data_v1');
      localStorage.removeItem('activity_catalog_data_v2');
      localStorage.removeItem('activity_catalog_data_v3');
      localStorage.removeItem('activity_catalog_data_v4');
    } catch (e) {
      // ignore
    }
    return NOTION_ACTIVITIES;
  });

  // 從目前 URL (Hash 或 Search Query) 解析初始視圖與欲開啟的活動
  const getInitialRoute = (): { initialView: AppView; initialActId: string | null } => {
    if (typeof window === 'undefined') return { initialView: 'home', initialActId: null };

    // 支援 query 參數: ?activity=... 或 ?act=... 或 ?page=about 或 ?view=about
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const queryAct = searchParams.get('activity') || searchParams.get('act');
      if (queryAct) {
        return { initialView: 'activities', initialActId: queryAct };
      }
      const page = searchParams.get('page') || searchParams.get('view');
      if (page && ['home', 'inquiry', 'materials', 'activities', 'about'].includes(page)) {
        return { initialView: page as AppView, initialActId: null };
      }
    } catch {
      // ignore
    }

    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash.startsWith('activity-')) {
      const actId = hash.replace('activity-', '');
      return { initialView: 'activities', initialActId: actId };
    }
    if (hash.startsWith('notion-act-')) {
      return { initialView: 'activities', initialActId: hash };
    }
    if (['home', 'inquiry', 'materials', 'activities', 'about'].includes(hash)) {
      return { initialView: hash as AppView, initialActId: null };
    }
    return { initialView: 'home', initialActId: null };
  };

  const { initialView, initialActId } = getInitialRoute();

  // 當前頁面視圖
  const [currentView, setCurrentView] = useState<AppView>(initialView);

  // 側邊欄抽屜開關狀態
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 首頁搜尋欄傳入的即時搜尋關鍵字
  const [homeSearchQuery, setHomeSearchQuery] = useState('');

  // 當前正在檢視詳情的活動 (若有初始活動連結則立即打開)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(() => {
    if (!initialActId) return null;
    return findActivityByParam(activities, initialActId);
  });

  // 提示 Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  // 4. 瀏覽器上一頁 / 下一頁 (popstate & hashchange) 支援：確保外部連結或返回上一動作時完全同步
  useEffect(() => {
    // 首次載入時寫入基準 state
    const currentHash = window.location.hash || `#${currentView}`;
    window.history.replaceState(
      { view: currentView, activityId: selectedActivity?.id || null } as HistoryState,
      '',
      currentHash
    );

    const handleRouteSync = (e?: PopStateEvent) => {
      const state = e?.state as HistoryState | null;
      const hash = window.location.hash.replace(/^#\/?/, '');

      let targetView: AppView = 'home';
      let targetActId: string | null = null;

      // 優先檢查 query 參數
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const queryAct = searchParams.get('activity') || searchParams.get('act');
        if (queryAct) {
          targetActId = queryAct;
          targetView = 'activities';
        }
        const page = searchParams.get('page') || searchParams.get('view');
        if (!targetActId && page && ['home', 'inquiry', 'materials', 'activities', 'about'].includes(page)) {
          targetView = page as AppView;
        }
      } catch {
        // ignore
      }

      if (!targetActId) {
        if (state && state.view) {
          targetView = state.view;
          targetActId = state.activityId || null;
        } else if (hash.startsWith('activity-')) {
          targetActId = hash.replace('activity-', '');
          targetView = 'activities';
        } else if (hash.startsWith('notion-act-')) {
          targetActId = hash;
          targetView = 'activities';
        } else if (['home', 'inquiry', 'materials', 'activities', 'about'].includes(hash)) {
          targetView = hash as AppView;
        }
      }

      setCurrentView(targetView);

      if (targetActId) {
        const found = findActivityByParam(activities, targetActId);
        setSelectedActivity(found || null);
      } else {
        setSelectedActivity(null);
      }

      // 關閉側邊欄以防卡住
      setIsSidebarOpen(false);
    };

    window.addEventListener('popstate', handleRouteSync);
    window.addEventListener('hashchange', () => handleRouteSync());
    return () => {
      window.removeEventListener('popstate', handleRouteSync);
      window.removeEventListener('hashchange', () => handleRouteSync());
    };
  }, [activities, currentView, selectedActivity]);

  // 頁面導航切換函式 (推入瀏覽器歷史，保留上一動作)
  const navigateTo = useCallback((view: AppView) => {
    setCurrentView(view);
    setSelectedActivity(null);
    setIsSidebarOpen(false);
    window.history.pushState(
      { view, activityId: null } as HistoryState,
      '',
      `#${view}`
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 開啟活動詳情彈窗函式 (推入瀏覽器歷史)
  const openActivityModal = useCallback((activity: Activity) => {
    setSelectedActivity(activity);
    window.history.pushState(
      { view: currentView, activityId: activity.id } as HistoryState,
      '',
      `#activity-${activity.id}`
    );
  }, [currentView]);

  // 關閉活動詳情彈窗函式 (如為 hash 進入則觸發 history.back 回到上個動作)
  const closeActivityModal = useCallback(() => {
    if (window.location.hash.startsWith('#activity-')) {
      window.history.back();
    } else {
      setSelectedActivity(null);
      window.history.replaceState(
        { view: currentView, activityId: null } as HistoryState,
        '',
        `#${currentView}`
      );
    }
  }, [currentView]);

  // 篩選條件狀態 (教案庫專用)
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: '全部',
    selectedGroupSize: 'all',
    selectedIntensity: 'all',
    selectedDepth: 'all',
    selectedNature: '',
    selectedAbility: '',
    sortBy: 'default',
  });

  // 篩選與排序邏輯
  const filteredActivities = useMemo(() => {
    let list = activities.filter((act) => {
      // 分類篩選
      if (filters.selectedCategory !== '全部' && act.category !== filters.selectedCategory) {
        return false;
      }

      // 建議人數篩選 (個人, 2~5人, 5人以上)
      if (filters.selectedGroupSize !== 'all' && act.groupSize !== filters.selectedGroupSize) {
        return false;
      }

      // 活動強度篩選 (低強度, 中強度, 高強度)
      if (filters.selectedIntensity !== 'all' && act.intensity !== filters.selectedIntensity) {
        return false;
      }

      // 深度篩選 (較淺, 適中, 較深/較深入)
      if (filters.selectedDepth !== 'all') {
        const matchesDepth = (filters.selectedDepth === '較深' || filters.selectedDepth === '較深入')
          ? (act.depth === '較深' || act.depth === '較深入')
          : act.depth === filters.selectedDepth;
        if (!matchesDepth) {
          return false;
        }
      }

      // 能力標籤篩選
      if (filters.selectedAbility && !act.abilities.includes(filters.selectedAbility)) {
        return false;
      }

      // 文字即時搜尋
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = act.title.toLowerCase().includes(q);
        const matchSummary = act.summary.toLowerCase().includes(q);
        const matchCategory = act.category.toLowerCase().includes(q);
        const matchMaterials = act.materials.some((m) => m.toLowerCase().includes(q));
        const matchAbilities = act.abilities.some((a) => a.toLowerCase().includes(q));
        const matchNature = act.nature.some((n) => n.toLowerCase().includes(n));
        const matchSteps = act.steps.some(
          (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
        );

        if (
          !matchTitle &&
          !matchSummary &&
          !matchCategory &&
          !matchMaterials &&
          !matchAbilities &&
          !matchNature &&
          !matchSteps
        ) {
          return false;
        }
      }

      return true;
    });

    // 排序
    if (filters.sortBy === 'title') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant'));
    } else if (filters.sortBy === 'intensity') {
      const order = { '低強度': 1, '中強度': 2, '高強度': 3 };
      list = [...list].sort((a, b) => (order[a.intensity] || 0) - (order[b.intensity] || 0));
    }

    return list;
  }, [activities, filters]);

  // 各分類數量計算
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      '全部': activities.length,
    };

    CATEGORIES.forEach((cat) => {
      if (cat !== '全部') {
        counts[cat] = activities.filter((a) => a.category === cat).length;
      }
    });

    return counts;
  }, [activities]);

  // 更新篩選狀態
  const handleUpdateFilters = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  // 重設篩選
  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: '全部',
      selectedGroupSize: 'all',
      selectedIntensity: 'all',
      selectedDepth: 'all',
      selectedNature: '',
      selectedAbility: '',
      sortBy: 'default',
    });
    showToast('已重設所有篩選條件');
  };

  // 側邊欄搜尋直接跳至首頁並執行搜尋 (無彈窗)
  const handleSidebarSearch = (query: string) => {
    setHomeSearchQuery(query);
    navigateTo('home');
  };

  // 詳情彈窗中的上一個 / 下一個活動導航
  const currentIndex = selectedActivity
    ? filteredActivities.findIndex((a) => a.id === selectedActivity.id)
    : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filteredActivities.length - 1;

  const handlePreviousActivity = () => {
    if (hasPrevious) {
      const prevAct = filteredActivities[currentIndex - 1];
      setSelectedActivity(prevAct);
      window.history.replaceState(
        { view: currentView, activityId: prevAct.id } as HistoryState,
        '',
        `#activity-${prevAct.id}`
      );
    }
  };

  const handleNextActivity = () => {
    if (hasNext) {
      const nextAct = filteredActivities[currentIndex + 1];
      setSelectedActivity(nextAct);
      window.history.replaceState(
        { view: currentView, activityId: nextAct.id } as HistoryState,
        '',
        `#activity-${nextAct.id}`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#1F2421] selection:bg-[#E07A5F]/20 selection:text-[#1F2421]">
      
      {/* 頂部導航列 (包含最左邊選單按鈕、預留LOGO空間、網站名稱「玩藝所」) */}
      <Header
        currentView={currentView}
        onSelectView={(v) => navigateTo(v)}
        onOpenMenu={() => setIsSidebarOpen(true)}
      />

      {/* 側邊抽屜導航選單 (含搜尋欄、首頁、資源下拉、關於) */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={(v) => navigateTo(v)}
        onSearch={handleSidebarSearch}
        activitiesCount={activities.length}
      />

      {/* 5. 具備優雅過場動畫的主內容區域 (包含點擊標題回首頁、切換頁面時的流暢轉場) */}
      <div className="flex-1 flex flex-col w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col w-full"
          >
            {/* 1. 首頁畫面 */}
            {currentView === 'home' && (
              <HomePage
                onNavigate={(view) => navigateTo(view)}
                activities={activities}
                onSelectActivity={(act) => openActivityModal(act)}
                initialSearchQuery={homeSearchQuery}
                onClearInitialSearch={() => setHomeSearchQuery('')}
              />
            )}

            {/* 2. 引導問句庫獨立分頁 */}
            {currentView === 'inquiry' && (
              <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <InquiryPage
                  onBackToHome={() => navigateTo('home')}
                  onNavigateToActivities={() => navigateTo('activities')}
                  onNavigateToMaterials={() => navigateTo('materials')}
                />
              </main>
            )}

            {/* 3. 藝術媒材表獨立分頁 */}
            {currentView === 'materials' && (
              <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <MaterialsPage
                  onBackToHome={() => navigateTo('home')}
                  onNavigateToActivities={(cat) => {
                    if (cat) handleUpdateFilters({ selectedCategory: cat as CategoryType });
                    navigateTo('activities');
                  }}
                  onNavigateToInquiry={() => navigateTo('inquiry')}
                  onSelectActivity={(act) => openActivityModal(act)}
                />
              </main>
            )}

            {/* 4. 活動教案庫獨立分頁 */}
            {currentView === 'activities' && (
              <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="space-y-7 sm:space-y-8">
                  
                  {/* 麵包屑導航與快速切換 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      onClick={() => navigateTo('home')}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5C554B] hover:text-[#1F2421] transition-colors group w-fit active:scale-95 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E2DDD5] flex items-center justify-center group-hover:-translate-x-0.5 transition-transform shadow-2xs">
                        <ArrowLeft className="w-4 h-4" />
                      </div>
                      <span>返回首頁</span>
                    </button>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#8A847A]">快捷跳轉：</span>
                      <button
                        onClick={() => navigateTo('inquiry')}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD5] text-[#C85A3E] hover:bg-[#FDF0ED] transition-colors active:scale-95 shadow-2xs font-medium cursor-pointer"
                      >
                        💬 引導問句庫
                      </button>
                      <button
                        onClick={() => navigateTo('materials')}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD5] text-[#4D6A56] hover:bg-[#EEF3EF] transition-colors active:scale-95 shadow-2xs font-medium cursor-pointer"
                      >
                        🎨 藝術媒材表
                      </button>
                    </div>
                  </div>

                  {/* 教案庫橫幅氛圍 */}
                  <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-[#EFECE6] border border-[#E2DDD5] overflow-hidden shadow-xs">
                    <div className="relative z-10 max-w-2xl space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#4D6A56] border border-[#D5CFC5]">
                        <Compass className="w-3.5 h-3.5 text-[#E07A5F]" />
                        活動教案庫（共 {activities.length} 項教案）
                      </span>
                      <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1F2421] tracking-tight">
                        活動檢索與教案型錄
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed font-normal">
                        支援分類標籤、人數、強度與深度篩選。點擊任意活動卡片即可查看完整內容。
                        <br />
                        分類僅用於迅速統整，不代表該活動唯一性質。
                      </p>
                    </div>

                    <div className="absolute -right-6 -bottom-8 w-44 h-44 rounded-full bg-[#E2DDD5]/40 pointer-events-none blur-xl" />
                    <div className="absolute right-12 top-4 w-28 h-28 rounded-full bg-[#E07A5F]/10 pointer-events-none blur-lg" />
                  </div>

                  {/* 多維度分類與篩選面板 */}
                  <section className="bg-white rounded-2xl border border-[#E8E4DC] p-5 sm:p-6 shadow-xs">
                    <FilterBar
                      filters={filters}
                      onChangeFilters={handleUpdateFilters}
                      onResetFilters={handleResetFilters}
                      categoryCounts={categoryCounts}
                      totalResults={filteredActivities.length}
                      totalActivities={activities.length}
                    />
                  </section>

                  {/* 卡片展示網格 (手機端雙欄並排，提高視野密度) */}
                  <section>
                    {filteredActivities.length > 0 ? (
                      <div
                        id="activities-grid"
                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5"
                      >
                        {filteredActivities.map((act) => (
                          <ActivityCard
                            key={act.id}
                            activity={act}
                            onSelect={(item) => openActivityModal(item)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="py-16 sm:py-20 px-4 text-center bg-white rounded-2xl border border-[#EAE6DF] shadow-xs space-y-4 max-w-lg mx-auto">
                        <div className="w-14 h-14 rounded-2xl bg-[#F3EFEA] text-[#8A847A] mx-auto flex items-center justify-center text-2xl">
                          🍃
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-serif font-bold text-lg text-[#1F2421]">
                            沒有找到符合條件的活動教案
                          </h3>
                          <p className="text-xs sm:text-sm text-[#736E65] leading-relaxed">
                            請嘗試放寬人數、強度或清除關鍵字搜尋，瀏覽更多精彩活動提案。
                          </p>
                        </div>
                        <div>
                          <button
                            id="btn-empty-reset"
                            onClick={handleResetFilters}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1F2421] text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-[#343B37] transition-all shadow-xs active:scale-95 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>清除所有篩選條件</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </section>

                </div>
              </main>
            )}

            {/* 5. 關於我們與理念獨立分頁 */}
            {currentView === 'about' && (
              <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <AboutPage
                  onBackToHome={() => navigateTo('home')}
                  onNavigate={(v) => navigateTo(v)}
                  activitiesCount={activities.length}
                />
              </main>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部 Footer */}
      <footer className="mt-16 border-t border-[#E8E4DC] bg-[#FAF8F5] py-8 text-xs text-[#7A7368]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-6 h-6 rounded-lg bg-white border border-[#E2DDD5] p-0.5 overflow-hidden flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <PlayArtLogo className="w-full h-full object-contain" />
            </div>
            <span className="font-serif font-medium text-[#1F2421] group-hover:text-[#E07A5F] transition-colors">玩藝所</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 text-[#8A847A] whitespace-nowrap overflow-x-auto max-w-full justify-center text-xs">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-[#1F2421] transition-colors underline underline-offset-4 cursor-pointer"
            >
              首頁
            </button>
            <span className="text-[#C5BFB5]">•</span>
            <button
              onClick={() => navigateTo('inquiry')}
              className="hover:text-[#1F2421] transition-colors underline underline-offset-4 cursor-pointer"
            >
              問句庫
            </button>
            <span className="text-[#C5BFB5]">•</span>
            <button
              onClick={() => navigateTo('materials')}
              className="hover:text-[#1F2421] transition-colors underline underline-offset-4 cursor-pointer"
            >
              媒材表
            </button>
            <span className="text-[#C5BFB5]">•</span>
            <button
              onClick={() => navigateTo('activities')}
              className="hover:text-[#1F2421] transition-colors underline underline-offset-4 cursor-pointer"
            >
              教案庫
            </button>
            <span className="text-[#C5BFB5]">•</span>
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-[#1F2421] transition-colors underline underline-offset-4 cursor-pointer"
            >
              關於
            </button>
          </div>
        </div>
      </footer>

      {/* 活動詳細引導彈窗 */}
      <ActivityDetailModal
        activity={selectedActivity}
        isOpen={Boolean(selectedActivity)}
        onClose={closeActivityModal}
        onPrevious={handlePreviousActivity}
        onNext={handleNextActivity}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onToast={showToast}
      />

      {/* 全域輕量 Toast 提示訊息 */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#1F2421] text-[#FAF8F5] text-xs sm:text-sm font-medium shadow-lg border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#D1E0D5]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
