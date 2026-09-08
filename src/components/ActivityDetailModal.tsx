import React, { useEffect } from 'react';
import { 
  X, 
  Clock, 
  Users, 
  Sparkles, 
  Lightbulb, 
  HelpCircle, 
  Box, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Share2,
  Flame,
  Layers,
  Activity as ActivityIcon
} from 'lucide-react';
import { Activity } from '../types';
import { CATEGORY_THEMES } from '../data/activities';
import { ImagePlaceholder } from './ImagePlaceholder';
import { getAssetUrl } from '../utils/assets';

interface ActivityDetailModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  onToast?: (message: string) => void;
}

function renderGameplayContent(gameplay?: string, steps?: Activity['steps']) {
  if (gameplay) {
    const rawLines = gameplay.split('\n');
    interface ParsedItem {
      type: 'numbered' | 'bullet' | 'header' | 'paragraph';
      number?: string;
      title?: string;
      text: string;
      subItems: string[];
    }
    const items: ParsedItem[] = [];
    let currentItem: ParsedItem | null = null;

    for (const line of rawLines) {
      const trimmed = line.trim();
      if (!trimmed) {
        if (currentItem) {
          items.push(currentItem);
          currentItem = null;
        }
        continue;
      }

      // 匹配數字列表項目，如 "1. ", "2. ", "1、", "1) "
      const numMatch = trimmed.match(/^(\d+)[\.、\)]\s*(.*)$/);
      if (numMatch) {
        if (currentItem) {
          items.push(currentItem);
        }
        const num = numMatch[1];
        const content = numMatch[2];
        const colonMatch = content.match(/^([^：:]{2,15})[：:]\s*(.+)$/);
        if (colonMatch) {
          currentItem = {
            type: 'numbered',
            number: num,
            title: colonMatch[1],
            text: colonMatch[2],
            subItems: []
          };
        } else {
          currentItem = {
            type: 'numbered',
            number: num,
            text: content,
            subItems: []
          };
        }
        continue;
      }

      // 匹配子列點，如 "• ", "- ", "* "
      const bulletMatch = trimmed.match(/^[•\-*]\s*(.*)$/);
      if (bulletMatch) {
        if (currentItem && currentItem.type === 'numbered') {
          currentItem.subItems.push(bulletMatch[1]);
        } else {
          if (currentItem) items.push(currentItem);
          currentItem = {
            type: 'bullet',
            text: bulletMatch[1],
            subItems: []
          };
        }
        continue;
      }

      // 匹配小標題
      if (trimmed.startsWith('#') || trimmed.startsWith('**') || trimmed.startsWith('版本') || /^[一二三四五六七八九十]+[、.]/.test(trimmed)) {
        if (currentItem) {
          items.push(currentItem);
        }
        currentItem = {
          type: 'header',
          text: trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, ''),
          subItems: []
        };
        continue;
      }

      // 若當前項為列點，處理後續接續說明或例如說明
      if (currentItem && currentItem.type === 'numbered' && (trimmed.startsWith('例如') || trimmed.startsWith('如：') || trimmed.startsWith('（'))) {
        currentItem.subItems.push(trimmed);
        continue;
      }

      // 一般段落文字
      if (currentItem) {
        items.push(currentItem);
      }
      currentItem = {
        type: 'paragraph',
        text: trimmed,
        subItems: []
      };
    }

    if (currentItem) {
      items.push(currentItem);
    }

    return (
      <div className="space-y-4 sm:space-y-5">
        {items.map((item, idx) => {
          if (item.type === 'numbered') {
            return (
              <div key={idx} className="flex items-start gap-3 sm:gap-3.5 group">
                <span className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-[#FAF8F5] border border-[#D5CFC5] text-[#1F2421] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:border-[#E07A5F] group-hover:text-[#E07A5F] transition-colors">
                  {item.number}
                </span>
                <div className="flex-1 space-y-2 text-sm sm:text-[15px] text-[#2D2A26] leading-relaxed sm:leading-7">
                  <div>
                    {item.title ? (
                      <>
                        <span className="font-bold text-[#1F2421] mr-1">{item.title}：</span>
                        <span>{item.text}</span>
                      </>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                  {item.subItems && item.subItems.length > 0 && (
                    <div className="pl-3 sm:pl-4 border-l-2 border-[#E8E4DC] space-y-2 pt-1 text-xs sm:text-sm text-[#5C554B]">
                      {item.subItems.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2">
                          <span className="text-[#8C857B] mt-1 shrink-0">•</span>
                          <span className="leading-relaxed">{sub}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (item.type === 'header') {
            return (
              <div key={idx} className="font-serif font-bold text-sm sm:text-base text-[#1F2421] pt-2 pb-0.5 border-b border-[#F0ECE4]">
                {item.text}
              </div>
            );
          }

          if (item.type === 'bullet') {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2 text-sm sm:text-[15px] text-[#2D2A26] leading-relaxed sm:leading-7">
                <span className="text-[#8C857B] mt-1.5 shrink-0">•</span>
                <span>{item.text}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-sm sm:text-[15px] text-[#2D2A26] leading-relaxed sm:leading-7">
              {item.text}
            </p>
          );
        })}
      </div>
    );
  }

  // 無 gameplay 字串時 fallback 至 steps
  if (steps && steps.length > 0) {
    return (
      <div className="space-y-4 sm:space-y-5">
        {steps.map((s) => (
          <div key={s.stepNumber} className="flex items-start gap-3 sm:gap-3.5 group">
            <span className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-[#FAF8F5] border border-[#D5CFC5] text-[#1F2421] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:border-[#E07A5F] group-hover:text-[#E07A5F] transition-colors">
              {s.stepNumber}
            </span>
            <div className="flex-1 space-y-1 text-sm sm:text-[15px] text-[#2D2A26] leading-relaxed sm:leading-7">
              <div className="font-bold text-[#1F2421]">
                {s.title}
              </div>
              <p className="text-[#4D453A]">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <p className="text-sm text-[#8A847A]">暫無進行方式說明</p>;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  onToast,
}) => {
  const [linkCopied, setLinkCopied] = React.useState(false);

  // 鍵盤監聽（Esc 關閉、左右方向鍵切換前後活動）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) onPrevious();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasPrevious, hasNext, onPrevious, onNext, onClose]);

  if (!isOpen || !activity) return null;

  const theme = CATEGORY_THEMES[activity.category] || {
    bg: 'bg-[#F2EFE9]',
    text: 'text-[#4A443B]',
    border: 'border-[#E2DDD5]',
    accent: '#4A443B',
  };

  const actNum = parseInt(activity.id.replace(/\D/g, ''), 10) || 1;
  const friendlyFilename = `activity-${actNum}.jpg`;
  const reservedImgPath = getAssetUrl(activity.coverImage || `assets/activities/${friendlyFilename}`);

  // 分享活動：複製該活動的直接跳轉連結至剪貼簿
  const handleShareActivity = async () => {
    let shareUrl = '';
    try {
      const url = new URL(window.location.href);
      url.hash = `activity-${activity.id}`;
      shareUrl = `${url.origin}${url.pathname}${url.hash}`;
    } catch (e) {
      shareUrl = `${window.location.origin}${window.location.pathname}#activity-${activity.id}`;
    }

    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        textArea.remove();
      } catch (e) {
        // ignore
      }
    }

    setLinkCopied(true);
    if (onToast) {
      onToast('已複製活動分享連結！其他人點選即可直達此活動。');
    }
    setTimeout(() => setLinkCopied(false), 2400);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* 彈窗主體 */}
      <div
        id="activity-detail-modal"
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl sm:rounded-3xl border border-[#E2DDD5] shadow-2xl overflow-hidden my-6 text-[#1F2421] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 頂部操作列 */}
        <div className="sticky top-0 z-20 px-5 sm:px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-[#EAE6DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${theme.bg} ${theme.text} border ${theme.border}`}
            >
              {activity.category}
            </span>
            <span className="text-xs text-[#7A7368] hidden sm:inline">
              強度：<strong>{activity.intensity}</strong>・深度：<strong>{activity.depth}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* 上一個 / 下一個活動導航 */}
            <div className="flex items-center border border-[#E2DDD5] rounded-lg overflow-hidden mr-1">
              <button
                type="button"
                aria-label="上一個活動"
                disabled={!hasPrevious}
                onClick={onPrevious}
                className="p-1.5 hover:bg-[#F3EFEA] disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-[#4A443B]"
                title="上一個活動 (鍵盤 ← 鍵)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-[#E2DDD5]" />
              <button
                type="button"
                aria-label="下一個活動"
                disabled={!hasNext}
                onClick={onNext}
                className="p-1.5 hover:bg-[#F3EFEA] disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-[#4A443B]"
                title="下一個活動 (鍵盤 → 鍵)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 分享活動 (點選複製專屬連結) */}
            <button
              type="button"
              onClick={handleShareActivity}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs ${
                linkCopied
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-400/20'
                  : 'border-[#E2DDD5] bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#3D3830] active:scale-95'
              }`}
              title="複製活動專屬連結以分享給他人"
            >
              {linkCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 animate-in zoom-in-50 duration-150" />
                  <span>已複製連結</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#E07A5F]" />
                  <span>分享活動</span>
                </>
              )}
            </button>

            {/* 關閉按鈕 */}
            <button
              type="button"
              aria-label="關閉視窗"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#736E65] border border-[#E2DDD5] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 滾動內容本體 */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-7 flex-1">
          
          {/* 活動封面預覽縮圖 / 示意圖 */}
          <div className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden border border-[#EAE6DF] bg-[#EFECE6] shadow-xs">
            <ImagePlaceholder
              src={reservedImgPath}
              alt={activity.title}
              aspectRatio="auto"
              className="w-full h-full object-cover"
              reservedFilename={friendlyFilename}
              hint={`支援 activity-${actNum}.jpg 或 activity-notion-act-${String(actNum).padStart(2, '0')}.jpg`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

            {/* 右下角時間標籤 */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 pointer-events-none">
              <span className="text-white text-xs font-medium px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center gap-1 shadow-xs">
                <Clock className="w-3 h-3 text-[#E07A5F]" />
                <span>{activity.duration}</span>
              </span>
            </div>
          </div>

          {/* 標題與一句話簡介 */}
          <div className="space-y-2.5">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1F2421] tracking-tight">
              {activity.title}
            </h2>
            <p className="text-sm sm:text-base text-[#4D453A] leading-relaxed bg-[#F4F0E8] p-3.5 sm:p-4 rounded-xl border border-[#EAE6DF]">
              {activity.summary}
            </p>
          </div>

          {/* Notion 屬性表格檢視 (Properties Panel) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-[#EAE6DF] shadow-xs">
            <div className="space-y-1">
              <span className="text-[11px] text-[#8A847A] flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#E07A5F]" />
                預估時間
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#1F2421]">{activity.duration}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-[#8A847A] flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-[#4D6A56]" />
                建議人數
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#1F2421]">{activity.groupSize}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-[#8A847A] flex items-center gap-1 font-medium">
                <Flame className="w-3.5 h-3.5 text-[#B23A48]" />
                活動強度與深度
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#1F2421]">{activity.intensity} / {activity.depth}</p>
            </div>
          </div>

          {/* 性質與核心能力標籤 */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[#7A7368] font-medium">核心能力與性質：</span>
            {activity.abilities.map((ab, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#EEF3EF] text-[#3E5C46] border border-[#D1E0D5]"
              >
                #{ab}
              </span>
            ))}
            {activity.nature.map((nat, idx) => (
              <span
                key={`nat-${idx}`}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#FDF0ED] text-[#C85A3E] border border-[#F4D0C7]"
              >
                {nat}
              </span>
            ))}
          </div>

          {/* 建議道具與媒材 (Materials) */}
          <div className="space-y-2.5">
            <h3 className="font-serif font-bold text-base text-[#1F2421] flex items-center gap-2">
              <Box className="w-4 h-4 text-[#D4A373]" />
              <span>建議材料與道具</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {activity.materials.map((mat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E2DDD5] text-xs font-medium text-[#4A443B] shadow-2xs"
                >
                  📦 {mat}
                </span>
              ))}
            </div>
          </div>

          {/* 活動進行方式 (字體大小、間距、行距統一規範，各項目間距拉開) */}
          <div id="activity-gameplay-section" className="space-y-3">
            <h3 className="font-serif font-bold text-base text-[#1F2421] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E07A5F]" />
              <span>活動進行方式</span>
            </h3>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#EAE6DF] shadow-xs">
              {renderGameplayContent(activity.gameplay, activity.steps)}
            </div>
          </div>

          {/* 備註與變形玩法 (僅於使用者提供時呈現) */}
          {activity.notes && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FDF6E9] border border-[#F4E1BA] space-y-2.5">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#A07026] flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#D4A373]" />
                <span>備註與變形玩法</span>
              </h3>
              <p className="text-sm sm:text-[15px] text-[#5C4827] leading-relaxed sm:leading-7 whitespace-pre-line font-normal">
                {activity.notes}
              </p>
            </div>
          )}

          {/* 延伸思考與提問引導 (僅於使用者提供時呈現) */}
          {activity.reflectionQuestions && activity.reflectionQuestions.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EEF3EF] border border-[#D1E0D5] space-y-2.5">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#3E5C46] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#4D6A56]" />
                <span>延伸思考與引導提問</span>
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#2A4432] leading-relaxed sm:leading-7">
                {activity.reflectionQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-[#D1E0D5]/60">
                    <span className="text-[#4D6A56] font-bold shrink-0">{idx + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* 底部按鈕 (刪除鍵盤提示，確定完成改為返回) */}
        <div className="px-5 sm:px-6 py-3.5 bg-white border-t border-[#EAE6DF] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1F2421] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#343B37] transition-all active:scale-95 shadow-xs cursor-pointer"
          >
            返回
          </button>
        </div>

      </div>
    </div>
  );
};
