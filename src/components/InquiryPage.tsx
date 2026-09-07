import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  Lightbulb, 
  HelpCircle,
  Share2,
  BookOpen
} from 'lucide-react';
import { INQUIRY_TOOLKIT } from '../data/inquiryQuestions';

interface InquiryPageProps {
  onBackToHome: () => void;
  onNavigateToActivities: () => void;
  onNavigateToMaterials: () => void;
}

export const InquiryPage: React.FC<InquiryPageProps> = ({
  onBackToHome,
  onNavigateToActivities,
  onNavigateToMaterials,
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // 篩選問句
  const filteredCategories = INQUIRY_TOOLKIT.filter((cat) => {
    if (selectedCategory !== 'all' && cat.title !== selectedCategory) {
      return false;
    }
    return true;
  }).map((cat) => {
    if (!searchQuery.trim()) return cat;
    const q = searchQuery.toLowerCase();
    const matchedItems = cat.items.filter(
      (item) =>
        item.type.toLowerCase().includes(q) ||
        item.question.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
    return { ...cat, items: matchedItems };
  }).filter((cat) => cat.items.length > 0);

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
            onClick={onNavigateToMaterials}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD5] text-[#4D6A56] hover:bg-[#EEF3EF] transition-colors"
          >
            🎨 藝術媒材表
          </button>
          <button
            onClick={onNavigateToActivities}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD5] text-[#C85A3E] hover:bg-[#FDF0ED] transition-colors"
          >
            📚 活動教案庫
          </button>
        </div>
      </div>

      {/* 頁面標題 Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-[#FDF0ED] border border-[#F4D0C7] overflow-hidden shadow-xs">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#C85A3E] border border-[#F4D0C7]">
            <MessageSquare className="w-3.5 h-3.5 text-[#E07A5F]" />
            表達性藝術與團體引導技術
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1F2421] tracking-tight">
            帶領者引導問句庫
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed font-normal">
            提問是開啟反思與重塑故事的鑰匙。收錄焦點解決短期治療、敘事治療與 ORID 焦點討論法三大經典引導架構，點擊右側即可一鍵複製至教案中。
          </p>
        </div>

        <div className="absolute -right-6 -bottom-8 w-44 h-44 rounded-full bg-[#E07A5F]/15 pointer-events-none blur-xl" />
      </div>

      {/* 搜尋與類別篩選列 */}
      <div className="bg-white rounded-2xl border border-[#E8E4DC] p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8A847A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋特定問句關鍵字（如：奇蹟、例外、外化、ORID、情緒...）"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs sm:text-sm text-[#1F2421] placeholder:text-[#A6A095] focus:outline-hidden focus:ring-2 focus:ring-[#E07A5F]/30"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#1F2421] text-white'
                  : 'bg-[#FAF8F5] text-[#5C554B] border border-[#E2DDD5] hover:bg-[#EFECE6]'
              }`}
            >
              全部學派
            </button>
            {INQUIRY_TOOLKIT.map((c) => (
              <button
                key={c.title}
                onClick={() => setSelectedCategory(c.title)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === c.title
                    ? 'bg-[#1F2421] text-white'
                    : 'bg-[#FAF8F5] text-[#5C554B] border border-[#E2DDD5] hover:bg-[#EFECE6]'
                }`}
              >
                {c.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 問句區塊清單 */}
      <div className="space-y-6">
        {filteredCategories.map((section, idx) => (
          <section
            key={idx}
            className="bg-white rounded-3xl border border-[#EAE6DF] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="border-b border-[#F0ECE4] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#1F2421] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]" />
                  {section.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A7368] mt-1">
                  {section.subtitle}
                </p>
              </div>
              <span className="text-xs text-[#8A847A] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E2DDD5] w-fit">
                共 {section.items.length} 則問句
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {section.items.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] hover:border-[#D5CFC5] transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-[#EFECE6] text-[#4A443B]">
                        {item.type}
                      </span>
                      <button
                        onClick={() => handleCopy(item.question)}
                        title="複製問句到剪貼簿"
                        className="p-1.5 rounded-lg bg-white border border-[#E2DDD5] text-[#7A7368] hover:text-[#1F2421] hover:bg-[#F3EFEA] transition-colors shadow-2xs"
                      >
                        {copiedText === item.question ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-sm font-medium text-[#1F2421] leading-relaxed pt-1">
                      {item.question}
                    </p>
                  </div>

                  {item.description && (
                    <div className="pt-2 border-t border-[#EAE6DF] text-xs text-[#7A7368] flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-[#D4A373] shrink-0 mt-0.5" />
                      <span>{item.description}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#EAE6DF] max-w-md mx-auto">
            <div className="text-3xl mb-2">🔍</div>
            <h4 className="font-serif font-bold text-base text-[#1F2421]">無相符問句</h4>
            <p className="text-xs text-[#736E65] mt-1">請嘗試變更搜尋關鍵字或選擇「全部學派」。</p>
          </div>
        )}
      </div>

    </div>
  );
};
