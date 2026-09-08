/**
 * 活動資料庫型別定義 (完全對齊使用者的 Notion Database 欄位結構)
 */

export type AppView = 'home' | 'inquiry' | 'materials' | 'activities' | 'about';

export interface SearchResultItem {
  id: string;
  type: 'activity' | 'inquiry' | 'material';
  typeLabel: string;
  title: string;
  snippet: string;
  category?: string;
  badge?: string;
  originalData: any;
}

export type CategoryType = 
  | '全部'
  | '破冰'
  | '暖身'
  | '合作'
  | '藝術'
  | '模擬體驗';

export type TargetAudience = 'all' | '兒童' | '青少年' | '成人';

export type IntensityLevel = 'all' | '低強度' | '中強度' | '高強度';

export type DepthLevel = 'all' | '較淺' | '適中' | '較深' | '較深入';

export type GroupSizeOption = 'all' | '個人' | '2~5人' | '5人以上';

export interface ActivityStep {
  stepNumber: number;
  title: string;
  duration?: string;
  description: string;
}

export interface Activity {
  /** 唯一識別碼 */
  id: string;
  /** 活動名稱 (Notion: 活動名稱) */
  title: string;
  /** 一句話亮點 (Notion: 一句話亮點) */
  summary: string;
  /** 活動分類 (Notion: 分類) */
  category: Exclude<CategoryType, '全部'>;
  /** 已帶領過團體性質 (Notion: 已帶領過團體性質，選填) */
  targetAudience?: string[];
  /** 建議人數文字 (Notion: 建議人數，如 個人, 2~5人, 5人以上) */
  groupSize: string;
  /** 性質類型 (Notion: 性質，如 動態, 談話性, 表達性, 合作性, 支持性, 復原力) */
  nature: string[];
  /** 活動強度 (Notion: 活動強度，如 低強度, 中強度, 高強度) */
  intensity: '低強度' | '中強度' | '高強度';
  /** 深度 (Notion: 深度，如 較淺, 適中, 較深) */
  depth: '較淺' | '適中' | '較深' | '較深入';
  /** 核心能力標籤 (Notion: 能力，如 創意, 反應力, 合作, 溝通, 肢體, 自我覺察) */
  abilities: string[];
  /** 預估活動時間 */
  duration: string;
  /** 所需道具媒材 */
  materials: string[];
  /** 使用者原創玩法說明 (進行方式) */
  gameplay?: string;
  /** 備註說明 (若有) */
  notes?: string;
  /** 詳細引導步驟 (Step-by-step) */
  steps: ActivityStep[];
  /** 帶領者秘訣與心法 */
  tips: string[];
  /** 活動後反思引導問題 (融入 ORID 或焦點解決/敘事治療問句) */
  reflectionQuestions?: string[];
  /** 封面縮圖 */
  coverImage: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: CategoryType;
  selectedAudience?: TargetAudience;
  selectedGroupSize: GroupSizeOption;
  selectedIntensity: IntensityLevel;
  selectedDepth: DepthLevel;
  selectedNature: string;
  selectedAbility: string;
  sortBy: 'default' | 'title' | 'intensity';
}

/** 引導問句資料結構 (Notion 頁面：引導問句) */
export interface InquiryQuestion {
  category: string;
  type: string;
  question: string;
  description?: string;
}
