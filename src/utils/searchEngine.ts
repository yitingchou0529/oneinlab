import { NOTION_ACTIVITIES } from '../data/activities';
import { INQUIRY_TOOLKIT, ART_MATERIALS } from '../data/inquiryQuestions';
import { SearchResultItem } from '../types';

/**
 * 全站搜尋引擎：整合 30 項活動教案、三大學派引導問句、常用藝術媒材
 */
export function performGlobalSearch(query: string): SearchResultItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const results: Array<SearchResultItem & { score: number }> = [];

  // 1. 搜尋活動教案 (Activities)
  NOTION_ACTIVITIES.forEach((act) => {
    let score = 0;
    const titleMatch = act.title.toLowerCase().includes(trimmed);
    const summaryMatch = act.summary.toLowerCase().includes(trimmed);
    const categoryMatch = act.category.toLowerCase().includes(trimmed);
    const natureMatch = act.nature.some((n) => n.toLowerCase().includes(trimmed));
    const abilityMatch = act.abilities.some((a) => a.toLowerCase().includes(trimmed));
    const materialMatch = act.materials.some((m) => m.toLowerCase().includes(trimmed));
    const stepMatch = act.steps.some((s) => 
      s.title.toLowerCase().includes(trimmed) || s.description.toLowerCase().includes(trimmed)
    );
    const tipMatch = act.tips.some((t) => t.toLowerCase().includes(trimmed));

    const gameplayMatch = (act.gameplay || '').toLowerCase().includes(trimmed);
    const notesMatch = (act.notes || '').toLowerCase().includes(trimmed);
    const questionsMatch = (act.reflectionQuestions || []).some((q) => q.toLowerCase().includes(trimmed));

    if (titleMatch) score += 20;
    if (summaryMatch) score += 10;
    if (categoryMatch) score += 8;
    if (natureMatch || abilityMatch) score += 6;
    if (materialMatch) score += 5;
    if (gameplayMatch || notesMatch || questionsMatch) score += 4;
    if (stepMatch || tipMatch) score += 2;

    if (score > 0) {
      results.push({
        id: `act-${act.id}`,
        type: 'activity',
        typeLabel: '活動教案',
        title: act.title,
        snippet: act.summary || act.steps[0]?.description?.slice(0, 80) || '',
        category: act.category,
        badge: act.category,
        originalData: act,
        score,
      });
    }
  });

  // 2. 搜尋引導問句庫 (Inquiry Questions)
  INQUIRY_TOOLKIT.forEach((cat, catIdx) => {
    const catMatch = cat.title.toLowerCase().includes(trimmed) || cat.subtitle.toLowerCase().includes(trimmed);

    cat.items.forEach((item, itemIdx) => {
      let score = 0;
      if (catMatch) score += 5;
      if (item.type.toLowerCase().includes(trimmed)) score += 12;
      if (item.question.toLowerCase().includes(trimmed)) score += 18;
      if (item.description && item.description.toLowerCase().includes(trimmed)) score += 8;

      if (score > 0) {
        results.push({
          id: `inq-${catIdx}-${itemIdx}`,
          type: 'inquiry',
          typeLabel: '引導問句',
          title: `【${item.type}】${item.question}`,
          snippet: `${cat.title}：${item.description || item.question}`,
          category: cat.title,
          badge: item.type,
          originalData: { ...item, categoryTitle: cat.title },
          score,
        });
      }
    });
  });

  // 3. 搜尋藝術媒材表 (Art Materials)
  ART_MATERIALS.forEach((mat, idx) => {
    let score = 0;
    if (mat.name.toLowerCase().includes(trimmed)) score += 20;
    if (mat.desc.toLowerCase().includes(trimmed)) score += 10;
    if (mat.suitableActivities && mat.suitableActivities.toLowerCase().includes(trimmed)) score += 8;

    if (score > 0) {
      results.push({
        id: `mat-${idx}`,
        type: 'material',
        typeLabel: '藝術媒材',
        title: `${mat.icon} ${mat.name}`,
        snippet: `${mat.desc} ${mat.suitableActivities ? `(適用活動: ${mat.suitableActivities})` : ''}`,
        category: '藝術媒材',
        badge: '媒材指南',
        originalData: mat,
        score,
      });
    }
  });

  // 依關聯分數排序
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 20);
}

export interface KeywordSuggestion {
  text: string;
  type: 'activity' | 'inquiry' | 'material' | 'category';
  typeLabel: string;
}

/**
 * 即時關鍵字建議：依使用者正在輸入的文字，提供關聯度高的建議清單
 */
export function getSearchSuggestions(query: string): KeywordSuggestion[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed || trimmed.length === 0) return [];

  const suggestions: KeywordSuggestion[] = [];
  const seen = new Set<string>();

  const addSuggestion = (text: string, type: KeywordSuggestion['type'], typeLabel: string) => {
    const cleanText = text.trim();
    if (!cleanText || seen.has(cleanText) || suggestions.length >= 8) return;
    seen.add(cleanText);
    suggestions.push({ text: cleanText, type, typeLabel });
  };

  // 1. 活動教案標題精準比對
  NOTION_ACTIVITIES.forEach((act) => {
    if (act.title.toLowerCase().includes(trimmed)) {
      addSuggestion(act.title, 'activity', '活動教案');
    }
  });

  // 2. 藝術媒材名稱
  ART_MATERIALS.forEach((mat) => {
    if (mat.name.toLowerCase().includes(trimmed)) {
      addSuggestion(mat.name, 'material', '藝術媒材');
    }
  });

  // 3. 引導問句類型與核心問句
  INQUIRY_TOOLKIT.forEach((cat) => {
    cat.items.forEach((item) => {
      if (item.type.toLowerCase().includes(trimmed)) {
        addSuggestion(item.type, 'inquiry', '問句類型');
      } else if (item.question.toLowerCase().includes(trimmed)) {
        addSuggestion(item.question.slice(0, 26) + '...', 'inquiry', '引導問句');
      }
    });
  });

  // 4. 活動分類與能力標籤
  NOTION_ACTIVITIES.forEach((act) => {
    if (act.category.toLowerCase().includes(trimmed)) {
      addSuggestion(act.category, 'category', '活動分類');
    }
    act.abilities.forEach((ab) => {
      if (ab.toLowerCase().includes(trimmed)) {
        addSuggestion(ab, 'category', '能力標籤');
      }
    });
  });

  return suggestions;
}
