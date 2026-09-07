import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Palette, 
  Search, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Compass, 
  ExternalLink,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { ART_MATERIALS } from '../data/inquiryQuestions';
import { NOTION_ACTIVITIES } from '../data/activities';
import { Activity } from '../types';

interface MaterialsPageProps {
  onBackToHome: () => void;
  onNavigateToActivities: (filterCategory?: string) => void;
  onNavigateToInquiry: () => void;
  onSelectActivity?: (activity: Activity) => void;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({
  onBackToHome,
  onNavigateToActivities,
  onNavigateToInquiry,
  onSelectActivity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 篩選媒材
  const filteredMaterials = ART_MATERIALS.filter((mat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      mat.name.toLowerCase().includes(q) ||
      mat.desc.toLowerCase().includes(q) ||
      (mat.suitableActivities && mat.suitableActivities.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 py-4 sm:py-6">
      
      {/* 頂部導航列與麵包屑 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5C554B] hover:text-[#1F2421] transition-colors group w-fit"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-[#E2DDD5] flex items-center justify-center group-hover:-translate-x-0.5 transition-transform shadow-2xs">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>返回首頁選項</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#8A847A]">快捷跳轉：</span>
          <button
            onClick={onNavigateToInquiry}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD5] text-[#C85A3E] hover:bg-[#FDF0ED] transition-colors"
          >
            💬 引導問句庫
          </button>
          <button
            onClick={() => onNavigateToActivities()}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD5] text-[#4D6A56] hover:bg-[#EEF3EF] transition-colors"
          >
            📚 活動教案庫
          </button>
        </div>
      </div>

      {/* 頁面標題 Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-[#EEF3EF] border border-[#D1E0D5] overflow-hidden shadow-xs">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#3E5C46] border border-[#D1E0D5]">
            <Palette className="w-3.5 h-3.5 text-[#4D6A56]" />
            表達性藝術治療核心媒介
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1F2421] tracking-tight">
            常用藝術媒材指南表
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed font-normal">
            媒材是心理能量與潛意識投射的載體。了解不同媒材的物理阻力、結構性、退化度與宣洩效果，能協助帶領者為不同對象（兒童、青少年、成人）精準挑選最適宜的創作工具。
          </p>
        </div>

        <div className="absolute -right-6 -bottom-8 w-44 h-44 rounded-full bg-[#4D6A56]/15 pointer-events-none blur-xl" />
      </div>

      {/* 搜尋與即時過濾 */}
      <div className="bg-white rounded-2xl border border-[#E8E4DC] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#8A847A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋媒材名稱、心理特質或推薦活動..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs sm:text-sm text-[#1F2421] placeholder:text-[#A6A095] focus:outline-hidden focus:ring-2 focus:ring-[#4D6A56]/30"
          />
        </div>

        <div className="text-xs text-[#7A7368]">
          顯示 <strong>{filteredMaterials.length}</strong> / {ART_MATERIALS.length} 種精選藝術媒材
        </div>
      </div>

      {/* 12 種媒材格狀展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredMaterials.map((mat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-[#EAE6DF] hover:border-[#D5CFC5] p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* 媒材頭部與圖標 */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E2DDD5] flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform">
                  {mat.icon}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FAF8F5] text-[#5C554B] border border-[#E2DDD5]">
                  媒材 #{idx + 1}
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-xl text-[#1F2421] group-hover:text-[#4D6A56] transition-colors">
                  {mat.name}
                </h4>
                <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed pt-1">
                  {mat.desc}
                </p>
              </div>

              {/* 推薦教案連結 */}
              {mat.suitableActivities && (
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-1.5 text-xs">
                  <div className="font-semibold text-[#4D6A56] flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" />
                    <span>本資料庫推薦對應教案：</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {mat.suitableActivities.split('、').map((actTitle) => {
                      const matched = NOTION_ACTIVITIES.find((a) => a.title === actTitle);
                      if (matched && onSelectActivity) {
                        return (
                          <button
                            key={actTitle}
                            type="button"
                            onClick={() => onSelectActivity(matched)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-[#D5CFC5] text-[#1F2421] font-medium hover:border-[#4D6A56] hover:text-[#4D6A56] hover:bg-[#F2F7F4] transition-all cursor-pointer text-[11px] shadow-2xs group/btn"
                          >
                            <span>{actTitle}</span>
                            <ExternalLink className="w-2.5 h-2.5 text-[#8A847A] group-hover/btn:text-[#4D6A56]" />
                          </button>
                        );
                      }
                      return (
                        <span key={actTitle} className="px-2 py-0.5 rounded-md bg-white border border-[#D5CFC5] text-[#332E27] font-medium text-[11px]">
                          {actTitle}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 底部操作引導 */}
            <div className="pt-3 border-t border-[#F2EEE9] flex items-center justify-between">
              <button
                onClick={() => onNavigateToActivities('藝術')}
                className="text-xs font-semibold text-[#4D6A56] hover:underline inline-flex items-center gap-1"
              >
                <span>尋找藝術類教案</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 媒材心理特質概念小指南 */}
      <div className="rounded-3xl bg-[#FAF8F5] border border-[#E2DDD5] p-6 sm:p-8 space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#1F2421] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#4D6A56]" />
          帶領者媒材安全光譜與選擇心法
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C554B]">
          <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] space-y-1.5">
            <span className="font-bold text-[#1F2421]">1. 高控制度媒材（安全、防衛）</span>
            <p className="leading-relaxed text-[#7A7368]">
              如色筆、彩色原子筆、剪刀雜誌。適合剛開始建立信任感的團體，能給予安全邊界與預測感，不易引發失控焦慮。
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] space-y-1.5">
            <span className="font-bold text-[#1F2421]">2. 立體與重塑媒材（觸覺、整合）</span>
            <p className="leading-relaxed text-[#7A7368]">
              如輕黏土、軟陶、毛根。能透過雙手揉捏提供本體感覺回饋，讓內在模糊感受具象化、立體化與賦形。
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] space-y-1.5">
            <span className="font-bold text-[#1F2421]">3. 高流動性媒材（宣洩、突破）</span>
            <p className="leading-relaxed text-[#7A7368]">
              如水彩、手指膏、撕撕報紙。適合已有高度信任感的團體，能促進情感宣洩與自由流動，突破僵化思維。
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
