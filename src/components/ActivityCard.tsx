import React from 'react';
import { 
  Clock, 
  Users, 
  Sparkles, 
  ArrowUpRight,
  Flame,
  Layers
} from 'lucide-react';
import { Activity } from '../types';
import { CATEGORY_THEMES } from '../data/activities';
import { ImagePlaceholder } from './ImagePlaceholder';
import { getAssetUrl } from '../utils/assets';

interface ActivityCardProps {
  activity: Activity;
  onSelect: (activity: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onSelect,
}) => {
  const theme = CATEGORY_THEMES[activity.category] || {
    bg: 'bg-[#F2EFE9]',
    text: 'text-[#4A443B]',
    border: 'border-[#E2DDD5]',
    accent: '#4A443B',
  };

  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case '高強度':
        return 'bg-red-50 text-red-700 border-red-200';
      case '中強度':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const actNum = parseInt(activity.id.replace(/\D/g, ''), 10) || 1;
  const friendlyFilename = `activity-${actNum}.jpg`;
  const reservedImgPath = getAssetUrl(activity.coverImage || `assets/activities/${friendlyFilename}`);

  return (
    <article
      id={`card-${activity.id}`}
      onClick={() => onSelect(activity)}
      className="group relative flex flex-col justify-between bg-white rounded-xl sm:rounded-2xl border border-[#EAE6DF] hover:border-[#D5CFC5] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 active:scale-[0.99]"
    >
      <div>
        {/* 卡片封面圖區 */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EFECE6]">
          <ImagePlaceholder
            src={reservedImgPath}
            alt={activity.title}
            aspectRatio="auto"
            className="w-full h-full"
            reservedFilename={friendlyFilename}
            hint={`支援 activity-${actNum}.jpg 或 activity-notion-act-${String(actNum).padStart(2, '0')}.jpg`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

          {/* 頂部類別徽章 */}
          <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 pointer-events-none">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-md shadow-xs ${theme.bg} ${theme.text} border ${theme.border}`}
            >
              {activity.category}
            </span>
          </div>

          {/* 封面底部浮動標籤（人數、強度） */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] sm:text-[11px] text-white/90 pointer-events-none">
            <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-xs px-1.5 sm:px-2 py-0.5 rounded-md">
              <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="truncate max-w-[60px] sm:max-w-none">{activity.groupSize}</span>
            </span>
            <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md font-medium border ${getIntensityBadge(activity.intensity)}`}>
              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {activity.intensity}
            </span>
          </div>
        </div>

        {/* 卡片本體內容 */}
        <div className="p-2.5 sm:p-4 space-y-1.5 sm:space-y-2">
          
          {/* 活動標題與進入箭頭 */}
          <div className="flex items-start justify-between gap-1.5">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] group-hover:text-[#E07A5F] transition-colors leading-snug line-clamp-1">
              {activity.title}
            </h3>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8A847A] group-hover:text-[#E07A5F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
          </div>

          {/* 一句話簡短介紹 (無上下引號) */}
          <p className="text-[11px] sm:text-xs text-[#5C554B] leading-normal sm:leading-relaxed line-clamp-2 h-[2rem] sm:h-[2.4rem] overflow-hidden">
            {activity.summary}
          </p>

          {/* 核心能力標籤群 */}
          {activity.abilities && activity.abilities.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {activity.abilities.slice(0, 2).map((ability, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium bg-[#F4F0E8] text-[#4A443B] border border-[#EAE6DF]"
                >
                  #{ability}
                </span>
              ))}
              {activity.abilities.length > 2 && (
                <span className="text-[10px] sm:text-[11px] text-[#8A847A] self-center">
                  +{activity.abilities.length - 2}
                </span>
              )}
            </div>
          )}

        </div>
      </div>

      {/* 卡片底部資訊列 (時間、建議人數) */}
      <div className="px-2.5 sm:px-4 py-2 border-t border-[#F0ECE4] bg-[#FAF8F5]/80 flex items-center justify-between text-[10px] sm:text-xs text-[#7A7368]">
        <span className="inline-flex items-center gap-1 font-medium text-[#4A443B]">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8A847A]" />
          <span className="truncate max-w-[70px] sm:max-w-none">{activity.duration}</span>
        </span>

        {/* 建議人數 */}
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-[#7A7368] truncate">
          <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8A847A]" />
          <span>{activity.groupSize}</span>
        </span>
      </div>

    </article>
  );
};
