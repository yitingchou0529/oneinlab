/**
 * 引導問句資料庫與常用藝術媒材 (來自 Notion 頁面：引導問句 & 活動教案庫)
 */

export interface InquiryCategory {
  title: string;
  subtitle: string;
  items: Array<{
    type: string;
    question: string;
    description?: string;
  }>;
}

export interface ArtMaterial {
  name: string;
  icon: string;
  desc: string;
  suitableActivities?: string;
}

export const INQUIRY_TOOLKIT: InquiryCategory[] = [
  {
    title: '焦點解決短期治療',
    subtitle: '著重於「尋找解決方案與成功經驗」，激發內在資源與目標願景',
    items: [
      {
        type: '奇蹟問句',
        question: '如果今晚睡覺時奇蹟發生了，問題解決了，你明天醒來第一個會發生的變化是什麼？',
        description: '跳過困境直接描繪美好解答與微小起點。'
      },
      {
        type: '例外問句',
        question: '過去有沒有哪一次，這個狀況沒有發生，或是情況比較好的時候？當時你做了什麼？',
        description: '尋找過去成功的例外經驗，複製成功策略。'
      },
      {
        type: '評量問句',
        question: '如果 10 分代表最滿意，1 分代表最糟糕，你覺得自己現在在哪個分數？要多加 1 分需要什麼小行動？',
        description: '將抽象感受具體量化，聚焦於邁向下一分的微小行動。'
      },
      {
        type: '因應問句',
        question: '在這麼困難的情況下，你是怎麼撐過來的？是什麼力量讓你一直沒有放棄？',
        description: '肯定對方的韌性與生存智慧。'
      }
    ]
  },
  {
    title: '敘事治療',
    subtitle: '著重於「重新撰寫生命故事與重塑身分」，將人與問題分開',
    items: [
      {
        type: '外化問句',
        question: '如果把『焦慮』看作一個獨立的個體，它最近常在什麼時候來找你？它長什麼樣子？',
        description: '問題才是問題，人不是問題。'
      },
      {
        type: '解構問句',
        question: '誰告訴你『男生不能流眼淚』這件事的？這個想法是從哪裡來的？它對你有幫助嗎？',
        description: '檢視社會主流文化與主流論述對個人的束縛。'
      },
      {
        type: '尋求特殊意義事件',
        question: '有沒有哪一次，你成功抵擋了『憤怒』的控制，做出了不一樣的選擇？',
        description: '發掘閃耀時刻（Sparkling Moments），厚實支線故事。'
      }
    ]
  },
  {
    title: 'ORID 焦點討論法',
    subtitle: '結構化體驗回顧四層次：客觀、感受、意義、行動',
    items: [
      {
        type: 'O (Objective) 客觀事實',
        question: '剛剛的遊戲中發生了什麼事？印象最深的一幕或肢體動作是什麼？看到、聽到、做到了什麼？',
        description: '客觀事實層：不帶評價，回顧所見所聞。'
      },
      {
        type: 'R (Reflective) 反應感受',
        question: '在卡關或順暢的時候，你的當下心情與身體感覺是什麼？',
        description: '情緒感受層：探索直覺反應與內在觸動。'
      },
      {
        type: 'I (Interpretive) 詮釋意義',
        question: '這經驗跟你平常在學校、職場或家庭中遇到的狀況有什麼相似處？你發現了什麼？',
        description: '價值詮釋層：連結真實生活情境與省思。'
      },
      {
        type: 'D (Decisional) 決定行動',
        question: '如果下次再遇到類似的挑戰，你會試著做什麼調整？明天可以開始的第一個小行動是什麼？',
        description: '行動決策層：落實於未來生活中的行動。'
      }
    ]
  }
];

/** 常用藝術媒材表 (Notion 教案庫) */
export const ART_MATERIALS: ArtMaterial[] = [
  { name: '色筆', icon: '✏️', desc: '快速勾勒、精準線條、提供安全控制感', suitableActivities: '六格畫、接力自畫像、面具創作、襪子娃娃、JEANSFRAME' },
  { name: '水彩', icon: '🎨', desc: '流動情緒、渲染放鬆、促進情感宣洩', suitableActivities: '接力自畫像、面具創作' },
  { name: '蠟筆', icon: '🖍️', desc: '直覺塗鴉、質樸觸感、釋放本能情緒', suitableActivities: '接力自畫像、六格畫、面具創作' },
  { name: '毛根', icon: '🧶', desc: '立體塑造、空間感知、可反覆折疊高容錯', suitableActivities: '襪子娃娃、JEANSFRAME' },
  { name: '輕黏土', icon: '❤️', desc: '柔軟可塑、舒壓排遣、穩定控制感高', suitableActivities: '' },
  { name: '軟陶', icon: '🏺', desc: '細緻雕琢、定型留存、具備成果儀式感', suitableActivities: '' },
  { name: '報紙', icon: '📰', desc: '撕揉發洩、即興拼貼、低成本多文字訊息', suitableActivities: '報紙找碴' },
  { name: '雜誌', icon: '📖', desc: '意象剪貼、視覺隱喻、圖片選擇多元', suitableActivities: '旅程地圖、報紙找碴' },
  { name: '氣球', icon: '🎈', desc: '輕盈、宣洩緊張、具紓壓或破除之意向', suitableActivities: '身體傳球' },
  { name: '面具', icon: '🎭', desc: '人格投射、內外在自我對照、安全偽裝防衛機制', suitableActivities: '面具創作、接力自畫像' },
  { name: '熱縮片', icon: '🪄', desc: '縮小轉化、護身或掌控之象徵、趣味媒材', suitableActivities: '' },
  { name: '布、衣服', icon: '🧥', desc: '貼近身體記憶，具包容、防護與修補特質', suitableActivities: '襪子娃娃、JEANSFRAME' },
];
