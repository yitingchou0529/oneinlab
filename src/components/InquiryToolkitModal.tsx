import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Copy, 
  Check, 
  Sparkles, 
  Palette, 
  Compass, 
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { INQUIRY_TOOLKIT, ART_MATERIALS } from '../data/inquiryQuestions';

interface InquiryToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryToolkitModal: React.FC<InquiryToolkitModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'questions' | 'materials'>('questions');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl sm:rounded-3xl border border-[#E2DDD5] shadow-2xl overflow-hidden my-6 text-[#1F2421] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EAE6DF] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF0ED] text-[#E07A5F] flex items-center justify-center border border-[#F4D0C7]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1F2421]">
                帶領者引導問句庫與藝術媒材
              </h3>
              <p className="text-xs text-[#7A7368]">
                來自你的 Notion 教案庫：焦點解決、敘事治療、ORID 焦點討論法與常用媒材
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F3EFEA] flex items-center justify-center text-[#736E65]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab 選單 */}
        <div className="flex border-b border-[#EAE6DF] bg-[#F4F0E8] px-6">
          <button
            onClick={() => setActiveTab('questions')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'questions'
                ? 'border-[#1F2421] text-[#1F2421] bg-[#FAF8F5]'
                : 'border-transparent text-[#736E65] hover:text-[#1F2421]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#E07A5F]" />
            <span>三大學派引導問句 (ORID / 焦點解決短期治療 / 敘事)</span>
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'materials'
                ? 'border-[#1F2421] text-[#1F2421] bg-[#FAF8F5]'
                : 'border-transparent text-[#736E65] hover:text-[#1F2421]'
            }`}
          >
            <Palette className="w-4 h-4 text-[#4D6A56]" />
            <span>常用藝術媒材清單 (12 種)</span>
          </button>
        </div>

        {/* 內容區 */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Tab 1: 引導問句 */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              {INQUIRY_TOOLKIT.map((section, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-[#E8E4DC] p-5 shadow-xs space-y-3">
                  <div className="border-b border-[#F0ECE6] pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#1F2421] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#E07A5F]" />
                        {section.title}
                      </h4>
                      <p className="text-xs text-[#7A7368] mt-0.5">{section.subtitle}</p>
                    </div>
                    {section.fullContent && (
                      <button
                        onClick={() => handleCopy(section.fullContent!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-[#FAF8F5] text-[#7A7368] hover:text-[#1F2421] border border-[#E2DDD5] transition-colors"
                      >
                        {copiedText === section.fullContent ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>已複製全文</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>複製指南</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {section.intro && (
                    <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#EFE8DC] text-xs text-[#5C554B] leading-relaxed whitespace-pre-line">
                      {section.intro}
                    </div>
                  )}

                  <div className="space-y-3 pt-1">
                    {section.items.map((item, qIdx) => (
                      <div
                        key={qIdx}
                        className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] hover:border-[#D5CFC5] transition-colors flex items-start justify-between gap-3 group"
                      >
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#EFECE6] text-[#4A443B]">
                            {item.type}
                          </span>
                          <p className="text-sm font-medium text-[#1F2421] leading-relaxed">
                            {item.question}
                          </p>
                          {item.description && (
                            <p className="text-xs text-[#7A7368]">{item.description}</p>
                          )}
                        </div>

                        <button
                          onClick={() => handleCopy(item.question)}
                          title="複製問句"
                          className="shrink-0 p-2 rounded-lg bg-white border border-[#E2DDD5] text-[#7A7368] hover:text-[#1F2421] hover:bg-[#F3EFEA] transition-colors shadow-2xs"
                        >
                          {copiedText === item.question ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  {section.conclusion && (
                    <div className="p-3.5 rounded-xl bg-[#F5F8F5] border border-[#DCE5DC] text-xs text-[#47604E] leading-relaxed whitespace-pre-line space-y-1">
                      <div className="font-bold text-xs text-[#2F4E38]">💡 帶領心法與實務建議</div>
                      <div>{section.conclusion}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: 常用藝術媒材清單 */}
          {activeTab === 'materials' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-[#EEF3EF] border border-[#D1E0D5] rounded-xl text-xs text-[#3E5C46]">
                以下為你的 Notion「活動教案庫」整理之常用表達性藝術媒材，帶領者可依活動團體屬性與目標挑選適合的創作介質：
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {ART_MATERIALS.map((mat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#E8E4DC] shadow-xs hover:border-[#D5CFC5] transition-all space-y-1.5"
                  >
                    <div className="text-2xl">{mat.icon}</div>
                    <div className="font-serif font-bold text-sm text-[#1F2421]">
                      {mat.name}
                    </div>
                    <p className="text-xs text-[#7A7368] leading-relaxed">
                      {mat.desc}
                    </p>
                    {mat.suitableActivities && (
                      <div className="pt-1.5 text-[11px] text-[#4D6A56] font-medium border-t border-[#F0ECE6]">
                        對應教案：{mat.suitableActivities}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* 底部關閉 */}
        <div className="px-6 py-3.5 bg-white border-t border-[#EAE6DF] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E2DDD5] bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#1F2421] rounded-lg text-xs sm:text-sm font-medium transition-colors"
          >
            關閉視窗
          </button>
        </div>

      </div>
    </div>
  );
};
