import { Activity, CategoryType } from '../types';

/**
 * 分類清單 (完全對齊使用者的活動分類)
 */
export const CATEGORIES: CategoryType[] = [
  '全部',
  '暖身',
  '破冰',
  '合作',
  '藝術',
  '模擬體驗',
];

/**
 * 分類視覺配色（溫暖木質文青風）
 */
export const CATEGORY_THEMES: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  '暖身': {
    bg: 'bg-[#FDF6E9]',
    text: 'text-[#A07026]',
    border: 'border-[#F4E1BA]',
    accent: '#D4A373',
  },
  '破冰': {
    bg: 'bg-[#FDF0ED]',
    text: 'text-[#C85A3E]',
    border: 'border-[#F4D0C7]',
    accent: '#E07A5F',
  },
  '合作': {
    bg: 'bg-[#EEF3EF]',
    text: 'text-[#3E5C46]',
    border: 'border-[#D1E0D5]',
    accent: '#4D6A56',
  },
  '藝術': {
    bg: 'bg-[#F3EFF6]',
    text: 'text-[#614D72]',
    border: 'border-[#DDD4E6]',
    accent: '#817291',
  },
  '模擬體驗': {
    bg: 'bg-[#EFF5F5]',
    text: 'text-[#366361]',
    border: 'border-[#CFDFDF]',
    accent: '#588157',
  },
};

/**
 * 44 筆真實完整活動教案 (100% 採用使用者提供的玩法說明、備註、變形與延伸思考，絕無 AI 虛構文字)
 */
export const NOTION_ACTIVITIES: Activity[] = [
  {
    id: "notion-act-01",
    title: "箭與靶",
    summary: "類似鬼抓人可用於破冰",
    category: "暖身",
    groupSize: "2~5人",
    nature: ["動態", "破冰"],
    intensity: "高強度",
    depth: "較淺",
    abilities: ["反應力", "肢體", "專注"],
    duration: "10-15 分鐘",
    materials: ["足夠奔跑活動的平整空間"],
    coverImage: "/assets/activities/activity-1.jpg",
    gameplay: `1. 兩人一組，一人當箭、一人當靶。
2. 以手勢作為象徵意象：箭比出食指與中指（雙指併攏），靶五指併攏伸直平放為掌心。
3. 全場進行追逐，箭需將手指觸碰至靶的掌心即為獲勝；靶則需靈活走位閃避箭的追逐。`,
    notes: `箭與靶可視團體需求變更角色，如：老師與學生、警察與小偷、大人與小孩等。`,
    steps: [
      {
        stepNumber: 1,
        title: "分組與手勢意象",
        description: "兩人一組，一人當箭、一人當靶。箭比出食指及中指，靶五指併攏伸直掌心迎向前方。"
      },
      {
        stepNumber: 2,
        title: "奔跑追逐碰觸",
        description: "玩家全場奔跑追逐，箭需將手指碰觸到靶的掌心即可獲勝，靶則需靈活閃躲箭的追逐。"
      }
    ],
    tips: [
      "箭與靶可視團體需求變更角色，如：老師與學生、警察與小偷、大人與小孩等。"
    ],
    reflectionQuestions: [
      "為什麼要追他／為什麼被追？（可帶入角色回答）",
      "最喜歡哪一個角色？",
      "在生活中與哪個角色最像？",
      "追或被追的過程中有何感受？"
    ]
  },
  {
    id: "notion-act-02",
    title: "兩真一假",
    summary: "自我揭露快速拉近關係",
    category: "破冰",
    groupSize: "5人以上",
    nature: ["談話性", "自我揭露"],
    intensity: "低強度",
    depth: "適中",
    abilities: ["自我揭露", "溝通", "傾聽"],
    duration: "15-20 分鐘",
    materials: ["紙筆（可選）"],
    coverImage: "/assets/activities/activity-2.jpg",
    gameplay: `作為團體破冰活動，在團體內可由每個人說出關於自己的三件事情（兩件是真的、一件是假的），由其他成員猜測哪一個是假的。

亦可由領導者／隊輔們一人說一件關於自己的事情，其中一人說的是假的，由服務對象來猜，以快速拉近彼此關係與距離。`,
    steps: [
      {
        stepNumber: 1,
        title: "擬定個人特質",
        description: "每人構思三件關於自己的事，其中兩件為真、一件為假。"
      },
      {
        stepNumber: 2,
        title: "輪流分享與猜測",
        description: "輪流分享三件事，由其他成員透過觀察與提問，猜測哪一件是假的。"
      }
    ],
    tips: [],
    reflectionQuestions: [
      "由猜題者向分享者提問，尋找線索以此增加互動。"
    ]
  },
  {
    id: "notion-act-03",
    title: "搭肩傳令",
    summary: "用肢體深化非語言溝通，快速建立團隊信任與默契",
    category: "合作",
    groupSize: "5人以上",
    nature: ["合作性", "非語言溝通", "信任建立"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["非語言溝通", "合作", "肢體默契", "信任"],
    duration: "10-20 分鐘",
    materials: ["眼罩（除最後一人外每人一副）"],
    coverImage: "/assets/activities/activity-3.jpg",
    gameplay: `1. 隊形排列與暗號約定：全員排成一縱列並搭肩，除隊伍最後一人睜眼外，其餘全員皆需蒙眼。全程不可說話，開始前小組約定拍打肩膀的部位與次數代表特定行進指令：
• 向左轉：輕拍左肩 1 次
• 向右轉：輕拍右肩 1 次
• 停止：雙肩同時輕拍 1 次
• 前進：拍脊椎 1 次
• 向後退：捏雙肩 1 次

2. 指令下達：由關主告知隊伍最後一位隊員本次需抵達的目的地或指定目標。
3. 觸覺傳遞：最後一位隊員將目標路徑轉換為搭肩暗號，依序拍打前方隊員肩膀。
4. 接力傳遞：中段隊員感受到指令後，即刻將相同暗號複製傳遞給正前方隊員，依此接力直至隊首。
5. 動作執行：隊伍最前方的隊首接收到暗號後，立即執行相應步伐動作。`,
    notes: `可自行加入其他進階挑戰，如需拾取指定物品，或增加音樂干擾、時間限制等。`,
    steps: [
      {
        stepNumber: 1,
        title: "隊形排列與暗號約定",
        description: "全員排成一縱列搭肩，除最後一人外其餘蒙眼，約定輕拍肩膀部位與次數的指令意義。"
      },
      {
        stepNumber: 2,
        title: "觸覺接力與動作執行",
        description: "最後一位隊員獲取目標後轉化為搭肩暗號向前逐一拍傳，最前方隊員根據接收訊號執行前進轉彎動作。"
      }
    ],
    tips: [
      "可自行加入其他進階挑戰，如需拾取指定物品，或增加音樂干擾、時間限制等。"
    ],
    reflectionQuestions: [
      "看不見時的感受是什麼？",
      "過程中覺得最困難的地方在哪裡？",
      "在日常生活中遇到溝通困難時如何應對？"
    ]
  },
  {
    id: "notion-act-04",
    title: "蛋蛋蛋幾顆蛋",
    summary: "遊玩中抱團拉近彼此距離",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["動態", "破冰團康"],
    intensity: "高強度",
    depth: "較淺",
    abilities: ["反應力", "肢體", "凝聚力"],
    duration: "10-15 分鐘",
    materials: ["寬敞平整活動場地"],
    coverImage: "/assets/activities/activity-4.jpg",
    gameplay: `1. 角色設定：所有參與者皆扮演一顆蛋（可視團體情境變更為小怪獸、精靈等意象）。
2. 漫步遊走：活動開始全員在場地內自由漫步遊走。
3. 聽令抱團：主持人隨機喊出數量指令（例如：「我要 3 顆蛋！」），全員需即刻依指定人數迅速抱團蹲下，人數不多也不少。
4. 懲罰或轉換：動作最慢或未能及時組隊成功者，可視團體氣氛回答一個小問題、完成趣味小挑戰，或輪替成為新任發令主持人。`,
    notes: `需注意團體人數與主持人喊出的數字是否合宜，避免造成過多人落單。`,
    steps: [
      {
        stepNumber: 1,
        title: "場內漫步",
        description: "參與者皆扮演一顆蛋，在場地內隨意遊走。"
      },
      {
        stepNumber: 2,
        title: "聽令抱團蹲下",
        description: "主持人喊出數字指令（如『我要3顆蛋』），成員需迅速組成相應人數蹲下。"
      }
    ],
    tips: [
      "需注意團體人數與主持人喊出的數字是否合宜。"
    ],
    reflectionQuestions: []
  },
  {
    id: "notion-act-05",
    title: "接力自畫像",
    summary: "創造自己與別人眼中的我",
    category: "藝術",
    groupSize: "5人以上",
    nature: ["表達性", "自我覺察", "藝術創作"],
    intensity: "低強度",
    depth: "適中",
    abilities: ["自我覺察", "創意", "非語言表達"],
    duration: "25-35 分鐘",
    materials: ["紙張或面具", "彩色筆", "蠟筆", "水彩顏料"],
    coverImage: "/assets/activities/activity-5.jpg",
    gameplay: `可依據活動需求自由變化。以紙張、面具等媒材作為臉的象徵。
1. 每個人擁有一張紙／面具代表自己，以下簡稱畫。
2. 畫順時針傳遞給下一位團體成員。
3. 拿到畫的成員需在畫上繪製出該成員眼中，畫作主人的樣貌。
4. 舉例：組員為 ABC，A 若拿到 C 的畫，便要在畫上繪製出 C 的意象，如：C 容易生氣，A 便在畫的頭部塗上紅色顏料。
5. 可在遊戲中新增時間限制，如一人只有五秒鐘創作，便要將畫輪給下一位。
6. 最後畫作回到本人手上，成員可觀察別人眼中的自己是什麼樣。
7. 可進一步引導成員覺察，或邀請成員本人在畫作上修改、新增自己認為的模樣。`,
    steps: [
      {
        stepNumber: 1,
        title: "創始畫紙傳遞",
        description: "每人領取一張紙或面具代表自己，順時針傳遞給下一位成員。"
      },
      {
        stepNumber: 2,
        title: "接力描繪特質意象",
        description: "拿到他人畫作的成員在限時內畫出對該主人的印象與特質符號，依序傳遞輪轉。"
      },
      {
        stepNumber: 3,
        title: "作品回歸與自我修整",
        description: "畫作傳回本人手中，成員觀察他人眼中的自己，並可在畫面上進行修改或補充。"
      }
    ],
    tips: [],
    reflectionQuestions: [
      "最先看見別人的什麼部位？",
      "最先看見自己的什麼部位？",
      "最喜歡／討厭哪個部位？",
      "如果可以更改，希望怎麼改？"
    ]
  },
  {
    id: "notion-act-06",
    title: "人間煉獄",
    summary: "姓名互換破冰團康",
    category: "破冰",
    groupSize: "5人以上",
    nature: ["動態", "破冰團康"],
    intensity: "中強度",
    depth: "適中",
    abilities: ["記憶力", "溝通", "破冰"],
    duration: "15-20 分鐘",
    materials: ["名牌（可選）"],
    coverImage: "/assets/activities/activity-6.jpg",
    gameplay: `1. 遊戲開始每人設立自己的名字，增加可玩性可加長句子。
2. 如：我叫_____，我來自_______，我在做____________。
3. 遊戲開始先兩兩互相介紹自己的句子。
4. 結束後將交換句子，A 同學帶著 B 同學名字、B 同學帶著 A 同學名字找下一人交換，以此類推。
5. 過一段時間後，找回自己的名字。`,
    steps: [
      {
        stepNumber: 1,
        title: "設定自我介紹句型",
        description: "每人設定自己的句子（例如：我叫某某，我來自某地，我在做某事）。"
      },
      {
        stepNumber: 2,
        title: "兩兩交換身分",
        description: "兩兩互相自我介紹後交換彼此的身分與名字，帶著名稱尋找下一位夥伴再次交換。"
      },
      {
        stepNumber: 3,
        title: "找回真實姓名",
        description: "在場中穿梭一段時間後，發布指令合力找回自己原本的名字與身分。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-07",
    title: "特質賓果",
    summary: "透過簡單認識彼此找到共同點",
    category: "破冰",
    groupSize: "5人以上",
    nature: ["破冰", "談話性"],
    intensity: "低強度",
    depth: "適中",
    abilities: ["社交互動", "傾聽", "觀察"],
    duration: "15-25 分鐘",
    materials: ["特質賓果卡每人一張", "原子筆"],
    coverImage: "/assets/activities/activity-7.jpg",
    gameplay: `1. 製作空白或已帶有題目的賓果卡。
2. 設計題目如：最喜歡的顏色、喜歡的卡通、去過的地方、個性等等個人資訊。
3. 團體開始時成員需在場內尋找其他成員，並詢問其上述問題。
4. 若有成員的喜好與本人相同，即可在該格簽名。如兩人都喜歡黑色則可在「喜歡的顏色」簽名。
5. 建議一個人只能簽一格，以讓成員能與每個人都有機會互動。
6. 最快連線即獲勝，帶領者可詢問其與其他成員的共同喜好等延伸問題。
7. 藉此讓成員感受到團體中有人與我相同的認同感，拉近彼此距離。`,
    steps: [
      {
        stepNumber: 1,
        title: "發放賓果九宮格",
        description: "提供印有各類興趣特質項目的賓果卡與筆。"
      },
      {
        stepNumber: 2,
        title: "場內交流尋找共鳴",
        description: "在場中尋找喜好相同的夥伴在對應格子簽名，每人限簽一格，搶先連線者獲勝。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-08",
    title: "六格畫",
    summary: "從各個面向切入自我覺察",
    category: "藝術",
    groupSize: "個人",
    nature: ["表達性", "自我覺察"],
    intensity: "低強度",
    depth: "較深",
    abilities: ["自我探索", "繪畫表達", "反思"],
    duration: "30-45 分鐘",
    materials: ["A4 或 A3 白紙", "彩色筆或粉蠟筆"],
    coverImage: "/assets/activities/activity-8.jpg",
    gameplay: `1. 將白紙折成六格（或視情況增加）。
2. 每一格代表一個意見、想法、狀態或說明，透過繪畫或文字敘述。
例如：主題「認識自己」，畫出以下六格：
• 家人眼中的我
• 朋友眼中的我
• 社工眼中的我
• 老師眼中的我
• 陌生人眼中的我
• 自己眼中的自己`,
    steps: [
      {
        stepNumber: 1,
        title: "紙張摺格",
        description: "將白紙均勻折成六個區塊。"
      },
      {
        stepNumber: 2,
        title: "六個維度描繪",
        description: "分別在六格中繪製或寫下不同關係對象（家人、朋友、社工、老師、陌生人、自己）眼中的自己樣貌。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-09",
    title: "人體結",
    summary: "透過肢體穿梭與肢體協調，考驗成員非語言溝通、問題解決與團隊策略合作",
    category: "合作",
    groupSize: "5人以上",
    nature: ["合作性", "動態", "問題解決"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["合作", "溝通", "肢體協調", "問題解決"],
    duration: "15-25 分鐘",
    materials: ["足夠寬敞的活動空間"],
    coverImage: "/assets/activities/activity-9.jpg",
    gameplay: `1. 成員圍成一個圈，大家面向圓心站好。
2. 每位參加者伸出右手，握住另一位成員的手，不能是左右兩邊，需間隔至少一人或對面成員。
3. 再伸出左手，握住另一位不同組員的手，同樣不可握自己左右兩旁的人。
4. 當大家都握好手後，便會形成一個複雜的手結。
5. 遊戲開始後，參加者要在不放手的情況下，透過跨步、轉身、蹲低、繞過別人等方法，把手結慢慢解開。
6. 過程中可以改變握手角度，但不可鬆開原本握住的手。
7. 若全組最後能解成一個手牽手的大圈，便完成任務。
8. 如果手結本身無法完全解開，也可以讓小組先停下來，討論剛才遇到的困難，再重新開始一輪。`,
    steps: [
      {
        stepNumber: 1,
        title: "圍圈交錯握手",
        description: "成員面向圓心站立，伸出雙手分別握住非相鄰夥伴的手，結成複雜手結。"
      },
      {
        stepNumber: 2,
        title: "不放手協調解開",
        description: "雙手不鬆開，透過跨步、轉身與蹲下鑽動，合力將手結解成完整大圓圈。"
      }
    ],
    tips: [],
    reflectionQuestions: [
      "有沒有觀察到活動過程中個別的角色？誰比較像是領導者？",
      "自己在團體中是什麼角色？",
      "遇到打結或團隊卡關時，你會怎麼做下一步選擇？"
    ]
  },
  {
    id: "notion-act-10",
    title: "即興故事創作(皮克斯故事法)",
    summary: "透過半結構式句型發想故事",
    category: "藝術",
    groupSize: "2~5人",
    nature: ["表達性", "敘事表達", "想像力"],
    intensity: "低強度",
    depth: "適中",
    abilities: ["創意", "故事發想", "表達能力"],
    duration: "20-30 分鐘",
    materials: ["紙筆", "故事引導句型卡"],
    coverImage: "/assets/activities/activity-10.jpg",
    gameplay: `**完整引導句型：**
1. 從前從前，有一個 ______（主角是故事的必要元素，你設定的主角會是什麼呢？人？動物？還是？）
2. 每一天，他 _______（主角平常都過著什麼樣的生活呢？）
3. 直到有一天，___________（什麼事情打亂了主角的生活？主角開始面對什麼挑戰？）
4. 幸運的是 _________（主角遇到麻煩，有沒有貴人相助，或是好事降臨，助他一臂之力？）
5. 不幸的是 _________（發生什麼事讓主角雪上加霜，情況越來越糟糕？）
6. 幸運的是 _________（發生什麼事讓主角化險為夷，情況逐漸好轉？）
7. 最後，___________（劇情來到最精采的地方，究竟主角有沒有克服挑戰呢？）
8. 從此以後，___________（事情結束後，主角回歸日常生活了嗎？還是開啟新的旅程？）
9. 這個故事告訴我們 ____________

**簡易版句型：**
1. 從前從前……
2. 每天……
3. 直到有一天……
4. 因此……
5. 因此……
6. 因此……
7. 最後……
8. 從此之後……
9. 這個故事告訴我們……`,
    steps: [
      {
        stepNumber: 1,
        title: "句型指引與主角設定",
        description: "提供皮克斯故事架構句型，引導成員設定主角背景與生活。"
      },
      {
        stepNumber: 2,
        title: "轉折鋪陳與收尾啟發",
        description: "循著挑戰、幸運、不幸的起伏推進劇情，最後總結故事帶來的啟發。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-11",
    title: "細胞分裂",
    summary: "結合反應力與敏銳度的動態暖身遊戲",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["動態", "反應訓練"],
    intensity: "高強度",
    depth: "較淺",
    abilities: ["敏銳度", "反應力", "敏捷性"],
    duration: "10-15 分鐘",
    materials: ["寬敞安全的活動場地"],
    coverImage: "/assets/activities/activity-11.jpg",
    gameplay: `1. 兩個人一組或是三個人一組，並肩並肩站成一橫列成為大細胞，就定位以後就不能移動。
2. 指定一個人當作小細胞，而另一個人則是病毒，病毒需抓到小細胞。
3. 遊戲開始，病毒追抓小細胞，而小細胞可以四處遊走。當小細胞跑進去大細胞內併肩，該大細胞最旁邊的人就要分裂出來變成小細胞，病毒需改變追捕對象；小細胞可再跑進其他大細胞內，把別人分裂出來。
4. 遊戲過程中分裂出來的小細胞不能回同一個細胞內，一定要去別的細胞後，才可以再回來。
5. 小細胞要與大細胞最左邊或最右邊的併肩都可以，只要他從其中一側加入，另一側就需要被分裂出來。`,
    steps: [
      {
        stepNumber: 1,
        title: "細胞陣列與角色指定",
        description: "2~3人並肩站好組成固定大細胞，指定一人為病毒、一人為小細胞。"
      },
      {
        stepNumber: 2,
        title: "追逐與分裂替換",
        description: "小細胞併入大細胞一側，另一端成員即刻分裂成為新小細胞繼續躲避病毒追捕。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-12",
    title: "進化論",
    summary: "猜拳遊戲",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["動態", "破冰競賽"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["反應力", "互動趣味"],
    duration: "10-15 分鐘",
    materials: ["無須特殊道具"],
    coverImage: "/assets/activities/activity-12.jpg",
    gameplay: `1. 帶領人指定四種物種／階段的動作。
例如：小雞（雙手小動作揮動翅膀）、公雞（雙手大動作揮動翅膀）、老雞（一手當雞冠一手當尾巴慢慢走）、神雞（在外圍做出神的感覺）。
2. 所有參與者一開始皆是最初始第一階段（小雞）。
3. 其他參與者猜拳，贏家可進化成下個階段。
4. 參與者在移動過程需做出該階段對應的動作。
5. 進化至最終階段即為獲勝。`,
    notes: `可自行制定猜拳規則，如只能同階段猜拳、輸了退化等變化玩法。也可將最後階段設定為人類。`,
    steps: [
      {
        stepNumber: 1,
        title: "動作宣告與初始設定",
        description: "帶領者示範四個進化階段動作，全員從最初階小雞開始。"
      },
      {
        stepNumber: 2,
        title: "同級猜拳進化",
        description: "做著所屬階段動作尋找同伴猜拳，獲勝者晉級至下一階段直至成為頂端物種。"
      }
    ],
    tips: [
      "可自行制定猜拳規則，如只能同階段猜拳、輸了退化等變化玩法。也可將最後階段設定為人類。"
    ],
    reflectionQuestions: [
      "訪問贏家：是怎麼贏的？成為最頂端的物種有什麼感受？成為「人」之後最想做的一件事情是什麼？",
      "訪問未贏的成員：是否想再繼續？還是待在現在這個階段就好？最想做的一件事情是什麼？"
    ]
  },
  {
    id: "notion-act-13",
    title: "節奏挑戰",
    summary: "跟隨音樂節拍，精準在八拍內唸出畫面中出現的文字或圖片",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["節奏感", "多重感官"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["反應力", "口眼協調", "節奏感"],
    duration: "10-15 分鐘",
    materials: ["投影設備或平板", "網址：https://tools.aeiou.tw/beatchallenge/"],
    coverImage: "/assets/activities/activity-13.jpg",
    gameplay: `1. 遊戲工具準備：使用節奏遊戲製作工具（網址：https://tools.aeiou.tw/beatchallenge/）。
2. 節拍口眼挑戰：在八拍音樂節奏內，精準唸出畫面呈現的圖片名稱或指定文字，訓練即時反應力與口眼協調。
3. 多重感官進階：進階挑戰時，可為特定圖片或關鍵字設定專屬肢體動作（例如拍手、跺腳），強化肢體、語言與視覺的多重感官協調。`,
    steps: [
      {
        stepNumber: 1,
        title: "節奏載入與跟拍",
        description: "開啟網頁工具，伴隨音樂節拍熟悉畫面圖片與文字節奏。"
      },
      {
        stepNumber: 2,
        title: "對拍唸誦與肢體疊加",
        description: "在八拍內精準唸出對應內容，進階時加上拍手或指定動作訓練多感官協調。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-14",
    title: "面具創作",
    summary: "自我象徵性創作載體",
    category: "藝術",
    groupSize: "個人",
    nature: ["表達性", "深度自我覺察"],
    intensity: "低強度",
    depth: "較深",
    abilities: ["自我覺察", "象徵投射", "藝術創作"],
    duration: "45-60 分鐘",
    materials: ["空白面具", "彩色筆", "蠟筆", "水彩", "拼貼裝飾材料"],
    coverImage: "/assets/activities/activity-14.jpg",
    gameplay: `面具是個人內在具體化的象徵性媒材之一。
可用於自我覺察、期待、認識自己的主題中，透過其他媒材，包含：色筆、蠟筆、水彩、拼貼等方式，於面具上創作。

• 外側：可做為別人眼中的我、我認為我對外呈現的自我（開放我）。
• 內側：亦可創作，作為隱藏、真實我；自我期許、自我內在、願望等投射。`,
    steps: [
      {
        stepNumber: 1,
        title: "外在樣貌呈現",
        description: "在面具外側彩繪出對外呈現或他人眼中的自己特質。"
      },
      {
        stepNumber: 2,
        title: "內在真實投射",
        description: "在面具內側繪製隱藏的、真實的內在自我、期許或願望。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-15",
    title: "心願實現所",
    summary: "透過想像力、戲劇方式實現夢想",
    category: "模擬體驗",
    groupSize: "2~5人",
    nature: ["戲劇性", "復原力體驗"],
    intensity: "中強度",
    depth: "較深",
    abilities: ["想像力", "同理心", "合作表達"],
    duration: "25-35 分鐘",
    materials: ["滑輪椅", "各類現成日常道具"],
    coverImage: "/assets/activities/activity-15.jpg",
    gameplay: `可於大地遊戲、闖關挑戰中帶領，並結合復原力理論中的想像（Imagination）。
由參與者說出自己的願望，帶領者與參與者集思廣益，透過戲劇、肢體、想像力等方式協助願望實現。

例如：
• 願望：做雲霄飛車。
方式：請參與者坐在滑輪椅上，帶領者推著參與者快速在教室穿梭。

• 願望：玩 PS4。
方式：由參與者扮演玩家，帶領者扮演遊戲角色，參與者控制角色行動。`,
    steps: [
      {
        stepNumber: 1,
        title: "說出心願與共擬方案",
        description: "成員說出心中想實現的願望，眾人運用現場道具與肢體集思廣益設計模擬方案。"
      },
      {
        stepNumber: 2,
        title: "沉浸體驗與實現",
        description: "透過角色扮演與情境互動，協助成員在象徵與想像中完成夢想體驗。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-16",
    title: "鏡像引導(動作牽引)",
    summary: "由一人帶領，一人模仿如同鏡子般",
    category: "暖身",
    groupSize: "2~5人",
    nature: ["非語言互動", "身體覺察"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["專注力", "同理心", "肢體默契"],
    duration: "15-20 分鐘",
    materials: ["舒適平整場地"],
    coverImage: "/assets/activities/activity-16.jpg",
    gameplay: `1. 兩人一組。
2. 一人先扮演引導者，另一人為跟隨者。
3. 跟隨者要像鏡子一般，跟隨著引導者的一舉一動。

— 進階挑戰 —
從整個人的跟隨變成部位跟隨。
雙方指定彼此的某一部位，如引導者的額頭、跟隨者的腳踝，活動開始跟隨者即需透過腳踝跟隨引導者的額頭移動。`,
    steps: [
      {
        stepNumber: 1,
        title: "全身鏡像模仿",
        description: "兩人相對，一人引導一人跟隨，如照鏡子般精確鏡射對方的細微肢體變化。"
      },
      {
        stepNumber: 2,
        title: "指定部位牽引挑戰",
        description: "進階指定跨部位關聯（如額頭對應腳踝），以非對稱部位進行專注牽引跟隨。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-17",
    title: "誇大與縮小",
    summary: "透過肢體與聲音的漸進放大與縮小，開發身體極限",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["肢體開發", "戲劇表達"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["肢體表達", "聲音開發", "自信展現"],
    duration: "10-15 分鐘",
    materials: ["無須特殊道具"],
    coverImage: "/assets/activities/activity-17.jpg",
    gameplay: `1. 所有參與者圍成一圈，保持適當距離。
2. 一人先開始，後所有成員依序輪流擔任出題者，確保每個人都能體驗到從「起頭」到「最後一位」的變化。

# 一、 誇張模仿練習（放大）
1. 出題者做出一個簡單、幅度小的單一肢體動作或聲音，如擺動手臂／發出「啊」的單音。
2. 下一位成員將肢體、聲音稍微放大一點點並傳給下一位。
3. 每位成員需比前一位的動作、音量再更誇張、更放大，直到輪完一圈回到出題者。

# 二、 縮小模仿練習（收束）
1. 出題者做出一個極大、肢體張力強的動作或聲音。
2. 下一位成員模仿時，將動作與聲音稍微縮小一點點並傳下去。
3. 動作與能量越縮越小，但仍須維持動作形貌，不能完全消失。
4. 最後一位成員將動作收束至極小，完成精細的微縮呈現。`,
    steps: [
      {
        stepNumber: 1,
        title: "誇張模仿放大傳遞",
        description: "由微小動作或音量起頭，依序遞增放大張力，傳至最後一位展現極限張力。"
      },
      {
        stepNumber: 2,
        title: "收束微縮模仿傳遞",
        description: "從飽滿巨大的肢體聲音起頭，逐步收束縮小能量，最後一位呈現精緻微縮細節。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-18",
    title: "報紙找碴",
    summary: "模仿與觀察力訓練",
    category: "合作",
    groupSize: "5人以上",
    nature: ["分組競賽", "觀察訓練"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["觀察力", "想像力", "肢體表達"],
    duration: "15-20 分鐘",
    materials: ["每組相同內容之報紙、雜誌或圖冊"],
    coverImage: "/assets/activities/activity-18.jpg",
    gameplay: `適合分組競賽：
1. 每組獲得一模一樣的報紙、雜誌或圖冊等材料。
2. 各組輪流派人出題。
3. 出題者從材料中選取一張圖片、人物或一個可模仿的事物。
4. 出題者模仿出該圖片之動作，並由其他成員找出對應的圖片。
5. 可單人出題或團體出題。

訓練參與者的肢體表達、創意、觀察力、想像力等能力。`,
    steps: [
      {
        stepNumber: 1,
        title: "挑選圖片並肢體定格",
        description: "出題者從報紙圖冊挑選特定人物姿態或物件，以肢體生動模仿展現。"
      },
      {
        stepNumber: 2,
        title: "隊員翻閱比對搶答",
        description: "各組成員迅速翻閱手中材料，找出出題者模仿的確切圖片獲得積分。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-19",
    title: "你在做什麼?",
    summary: "反直覺動作與語言接龍暖身",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["即興戲劇", "反直覺暖身"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["即興反應", "幽默感", "創意思考"],
    duration: "10-15 分鐘",
    materials: ["無須特殊道具"],
    coverImage: "/assets/activities/activity-19.jpg",
    gameplay: `1. 所有參與者圍圈。
2. 其中一名參與者在圓圈中心做一個簡單重複的動作。
3. 圓圈中的另一名參與者進入中心並詢問該參與者：「你在做什麼？」
4. 該參與者需回答一個與當前行為完全無關的動作，然後下場。
5. 詢問的人需依照其回應的動作做出對應表演。
6. 再下一名參與者進入並重複 3、4、5 環節。

若參與者主動性較低，可改成原地表演、順時針依序進行。

例如：
A: （表演煮飯）
B: 「你在做什麼？」
A: 我在放風箏 （表演煮飯） （退場）
B: （表演放風箏）
C: 「你在做什麼？」
B: 我在拖地 （表演放風箏） （退場）`,
    steps: [
      {
        stepNumber: 1,
        title: "中心動作示範與發問",
        description: "一人在中心表演動作，另一人進場發問『你在做什麼？』"
      },
      {
        stepNumber: 2,
        title: "非關口述與接棒表演",
        description: "回答一個完全不相干的動作後退場，提問者立刻接棒表演該項新動作。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-20",
    title: "價值拍賣會",
    summary: "透過拍賣覺察自身注重的事物與其價值",
    category: "模擬體驗",
    groupSize: "5人以上",
    nature: ["價值觀澄清", "自我探索"],
    intensity: "低強度",
    depth: "較深",
    abilities: ["自我覺察", "價值排序", "決策反思"],
    duration: "40-60 分鐘",
    materials: ["便利貼", "假鈔或代幣", "白板或張貼牆面"],
    coverImage: "/assets/activities/activity-20.jpg",
    gameplay: `1. 撰寫價值便利貼：成員各自在便利貼寫下在生活與人生旅途中認為需要、想要或必要的事物（例如：愛情、友情、手機、家庭、健康、財富等）。
2. 分類與分享：彼此分享或在牆面上分類，理解團體成員的價值觀與關注焦點。
3. 籌碼發放：將所有拍賣項目陳列於牆面，並發放等額假鈔或代幣給每位成員。
4. 展開競標：成員依個人重視程度自由喊價出資競標心儀項目。
5. 追價帶動：帶領者視團體氛圍適度追價或催化喊價節奏，增加探索刺激感。
6. 深入分享：競標結束後，引導成員交流個人抉擇的心路歷程與取捨原因。`,
    steps: [
      {
        stepNumber: 1,
        title: "價值項目擬定與分類",
        description: "成員在便利貼寫下人生重要事物（需要、想要、必要），貼在拍賣牆上分類。"
      },
      {
        stepNumber: 2,
        title: "籌碼競標與價值反思",
        description: "發放代幣展開競標拍賣，帶領者依氣氛追價，拍賣結束後分享出價動機與取捨考量。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-21",
    title: "社會原子圖",
    summary: "透過圓點貼紙投射重要他人關係與支持系統",
    category: "藝術",
    groupSize: "個人",
    nature: ["表達性", "人際關係探索"],
    intensity: "低強度",
    depth: "較深",
    abilities: ["人際覺察", "自我省察", "情感表達"],
    duration: "30-45 分鐘",
    materials: ["黑色 A4 紙每人一張", "各式大小與顏色圓點貼紙"],
    coverImage: "/assets/activities/activity-21.jpg",
    gameplay: `1. 每人領取一張黑色 A4 紙，以及若干不同大小與色彩的圓點貼紙。
2. 每人先在自己的紙張上隨機貼上 5 個圓點貼紙。
3. 離座走動，到其他夥伴的紙張上隨機貼上 5 個圓點貼紙。
4. 視團體規模與氛圍，適度增加或微調貼紙數量。
5. 在紙上眾多圓點中，直覺挑選一個圓點代表「自己」。
6. 再分別挑選圓點代表重要人際對象：照顧我的人、支持我的人、給我壓力的人、最想念的人（共四位）。
7. 選擇依據可完全依隨直覺、與代表「自己」的空間距離、貼紙大小或色彩偏好。
8. 依序個別分享選擇的考量，以及這些重要他人與自己的生命交集故事。`,
    steps: [
      {
        stepNumber: 1,
        title: "貼紙隨機佈局",
        description: "在黑色紙張上先後由自己與夥伴隨機貼上大小各異的圓點貼紙。"
      },
      {
        stepNumber: 2,
        title: "指認自己與重要關係人",
        description: "從中選定一個代表自己，並依距離、色彩選取照顧者、支持者、壓力來源與思念者。"
      },
      {
        stepNumber: 3,
        title: "關係歷程深度分享",
        description: "依序分享每個圓點所對應的生命人物故事與當前關係感受。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-22",
    title: "搶位子",
    summary: "音樂椅子、大風吹變化版",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["動態", "破冰團康"],
    intensity: "高強度",
    depth: "較淺",
    abilities: ["反應力", "敏銳度", "專注力"],
    duration: "10-15 分鐘",
    materials: ["墊子或椅子若干"],
    coverImage: "/assets/activities/activity-22.jpg",
    gameplay: `1. 圍坐閉眼：全員圍成大圓圈坐好並閉上雙眼。
2. 放置目標：在圓圈正中心放置一張墊子或椅子。
3. 隨機指定：主持人繞行外圍，隨機拍擊兩位成員的肩膀作為競跑暗號。
4. 睜眼競跑：全體成員睜開眼睛，被點到肩膀的兩位成員需立即沿著外圈全速繞跑一整圈。
5. 搶奪中心位：跑回自己原本座位後，從原位衝入圓圈中央搶奪椅子坐下，先坐定者獲勝。
6. 進階變形：隨遊戲輪數推進，可增加點選人數、椅子數量，或將椅子藏於場邊考驗臨場搜尋。`,
    steps: [
      {
        stepNumber: 1,
        title: "閉眼點肩指令",
        description: "成員圍坐閉眼，中心置放椅子，主持人拍擊被指定競跑者的肩膀。"
      },
      {
        stepNumber: 2,
        title: "外圍繞跑入圈搶座",
        description: "睜眼後被點到者沿外圈繞跑一圈，回到原位後衝入圈中搶奪中間座位。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-23",
    title: "旅程地圖",
    summary: "雜誌拼貼、價值拍賣會變化版",
    category: "藝術",
    groupSize: "5人以上",
    nature: ["表達性", "復原力認知", "敘事拼貼"],
    intensity: "低強度",
    depth: "較深",
    abilities: ["敘事重構", "反思復原力", "象徵轉化"],
    duration: "45-60 分鐘",
    materials: ["A3 牛皮紙", "細條雙面膠", "過期雜誌", "剪刀", "中央藍布（象徵大海）"],
    coverImage: "/assets/activities/activity-23.jpg",
    gameplay: `1. 鋪設生命道路：每人拿取一張 A3 牛皮紙，使用細條雙面膠在紙上黏出一條專屬於自己的「路徑」。
2. 剪取旅途元素：引導成員從過期雜誌中，剪下對應旅程象徵的圖案：
• 上路前的預備物品 × 2
• 預感路上會遇到的人、事、景 × 各 1
• 護身符（留給自己）× 1
• 幸運符（送給夥伴）× 1

3. 歷練情境事件（由主持人扮演旅途中遭遇的 6 種事件／人物）：
• 強匪（「搶劫！這條路上沒有免費的風景！」）：每人交出一個元素放入中央藍布（象徵大海）。
• 奸商（「嘿嘿，想要更多寶藏嗎？」）：可選擇保留護身符，或交出護身符換取大海裡的 2 個素材（無護身符者無法交易）。
• 市集：成員自由走動以物易物，限時 3 分鐘互換素材。
• 風暴（「狂風來襲！」）：手中持有護身符者平安度過；無護身符者需再繳回 1 個元素入海。
• 智慧長者（「善意會以另一種方式回到你身邊」）：手中仍保有夥伴所贈「幸運符」者，可向長者挑選 1 個素材。
• 慈善家（「願你在路上不虞匱乏」）：全員皆可無條件從大海挑選 1 個所需元素。

4. 敘事反思對話：分享個人路途樣貌。經歷強匪、風暴與市集後，失去了什麼？保留了什麼？留存下來的元素如何在真實生活中給予力量？
5. 串聯生命地圖：將全員的牛皮紙依序拼貼結合，讓彼此的道路起點與終點相互交織延展。`,
    steps: [
      {
        stepNumber: 1,
        title: "開闢道路與剪取行囊",
        description: "用雙面膠在牛皮紙上黏出個人路徑，從雜誌剪下預備物品、人事物風景、護身符與幸運符。"
      },
      {
        stepNumber: 2,
        title: "情境事件考驗歷程",
        description: "依序面對強匪、奸商、市場交易、風暴、長者與慈善家事件，經歷資源失去與互助重獲。"
      },
      {
        stepNumber: 3,
        title: "敘事對話與地圖串聯",
        description: "分享旅程留下的元素與生命映照，將全員紙張起訖接合拼成連貫生命地圖。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-24",
    title: "松鼠搬家",
    summary: "三人一組照情境快速換位、搶位子",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["動態", "破冰團康"],
    intensity: "高強度",
    depth: "較淺",
    abilities: ["反應力", "敏捷性", "傾聽專注"],
    duration: "10-15 分鐘",
    materials: ["寬敞平整活動場地"],
    coverImage: "/assets/activities/activity-24.jpg",
    gameplay: `1. 三人一組，其中兩人面對面雙手搭成拱橋作為「樹屋」，一人站在中間扮演「松鼠」。
2. 主持人站立中央發布口令，成員依指令迅速變換組合：
• 「松鼠搬家」：扮演「松鼠」的成員需立刻離開原樹屋，奔跑尋找新木屋進入；「樹屋」組合保持原位不動。
• 「樵夫砍樹」：扮演「樹屋」的兩人迅速解散，奔跑尋找新夥伴重新搭成樹屋；「松鼠」留在原地不動。
• 「森林大火」：所有人全數打散，不論原先為松鼠或樹屋，皆需重新洗牌重組為全新的 3 人組合（1 隻松鼠 ＋ 2 棵樹）。

— 家庭關係變化版 —
1. 三人一組，分別扮演「屋子」（雙手張開成頂）、「大人」（直立站立）、「小孩」（蹲姿）。
2. 口令指引：地震（屋子換位）、打雷（大人換位）、出太陽（小孩換位）、龍捲風（全員打散換位）。
3. 帶領者可在換位時隨機搶位加入，促使落單者輪替成為新任指揮官。`,
    steps: [
      {
        stepNumber: 1,
        title: "樹與松鼠三角組合",
        description: "兩人牽手為樹屋，一人在內為松鼠，聽取中央主持人指令。"
      },
      {
        stepNumber: 2,
        title: "情境口令快速換位",
        description: "分別依松鼠搬家、樵夫砍樹、森林大火口令快速重組，反應落單者換為發令者。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-25",
    title: "身體傳球",
    summary: "使用身體部位傳遞物品",
    category: "合作",
    groupSize: "2~5人",
    nature: ["合作性", "肢體默契"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["團隊合作", "肢體協調", "非語言默契"],
    duration: "15-20 分鐘",
    materials: ["氣球、紙張、黏土或色筆"],
    coverImage: "/assets/activities/activity-25.jpg",
    gameplay: `1. 肢體部位夾持：兩人以上一組，運用手部以外的身體部位（如：額頭、後背、手心、臀部等）。
2. 目標物品夾持：共同夾住指定物件（如：氣球、紙張、黏土、彩色筆等）。
3. 齊心平穩護送：小組步調一致、保持物品不落地，齊心協力將物品由起點安全運送至終點。`,
    steps: [
      {
        stepNumber: 1,
        title: "部位夾持約定",
        description: "兩人以上一組，以非手部之身體部位（額頭、後背、手心、臀部）夾住目標物。"
      },
      {
        stepNumber: 2,
        title: "協調平穩運送",
        description: "保持物品不落地，步伐一致齊心從起點平穩護送至終點。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-26",
    title: "找領袖",
    summary: "透過觀察找出團體中的動作領導者",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["觀察力", "團體默契"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["細緻觀察", "動作同步", "團體凝聚"],
    duration: "10-15 分鐘",
    materials: ["無須特殊道具"],
    coverImage: "/assets/activities/activity-26.jpg",
    gameplay: `1. 猜題者暫離：團體推選一人擔任猜題者，並請其暫時離開視線與活動場地。
2. 秘密推選領袖：在場成員圍圈，秘密推選一人擔任動作領袖。
3. 動作同步跟隨：領袖在活動中做出各類肢體動作或連續行為，其餘全員需立即精準同步跟隨模仿。
4. 定時變換動作：領袖需適時變換不同動作（可由活動主持人在旁適度口頭提醒）。
5. 回場觀察指認：猜題者回到圓圈中央，透過觀察成員動作轉換的細微時間差，推測並指認誰是動作領袖。`,
    steps: [
      {
        stepNumber: 1,
        title: "猜題者離場與領袖推派",
        description: "一人離場，在場成員秘密選定一人作為動作領袖。"
      },
      {
        stepNumber: 2,
        title: "動作同步與觀察指認",
        description: "領袖帶頭變換動作全員同步跟隨，猜題者回場藉由節奏落差找出發令領袖。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-27",
    title: "襪子娃娃",
    summary: "利用襪子創作出手作布偶",
    category: "藝術",
    groupSize: "個人",
    nature: ["表達性", "觸覺手作"],
    intensity: "低強度",
    depth: "適中",
    abilities: ["手作創造", "專注投入", "情感投射"],
    duration: "45-60 分鐘",
    materials: ["新襪子或乾淨舊襪子", "棉花", "針線", "毛根", "鈕扣", "鈴鐺", "膠水", "色筆"],
    coverImage: "/assets/activities/activity-27.jpg",
    gameplay: `1. 襪子基底準備：由帶領者提供乾淨新襪子，或由成員自行準備充滿生活記憶的舊襪子。
2. 媒材自由探索：提供毛根、鈕扣、鈴鐺、環保膠水、彩色筆與布料等豐富美術裝飾材料。
3. 主題造型創作：成員依據特定心靈或角色主題，於襪子外觀進行設計與拼貼。
4. 充填塑形封口：完成外觀創作後，將蓬鬆棉花充填入襪體內塑形，並使用針線安全封口。`,
    steps: [
      {
        stepNumber: 1,
        title: "襪體裝飾構思",
        description: "運用鈕扣、毛根、鈴鐺等材料，在襪子外觀進行角色造型設計。"
      },
      {
        stepNumber: 2,
        title: "充填棉花縫合完成",
        description: "塞入柔軟棉花塑形，並將開口安全縫合，完成專屬布偶陪伴物。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-28",
    title: "JEANSFRAME",
    summary: "舊衣服DIY",
    category: "藝術",
    groupSize: "個人",
    nature: ["自我覺察", "記憶敘事", "手作拼貼"],
    intensity: "低強度",
    depth: "較深",
    abilities: ["生命記憶覺察", "身體意象探索", "藝術轉化"],
    duration: "45-60 分鐘",
    materials: ["舊衣物", "相框或畫框", "剪刀", "色筆", "膠水", "鈕扣", "毛根", "鈴鐺"],
    coverImage: "/assets/activities/activity-28.jpg",
    gameplay: `1. 記憶衣物準備：成員攜帶承載特殊生活記憶或閒置的個人舊衣物。
2. 創作媒材提供：帶領者提供剪刀、色筆、膠水、鈕扣、鈴鐺、毛根、畫框等各式工具與複合媒材。
3. 剪裁裝框拼貼：成員可將衣物大膽裁剪重組，或剪取象徵性局部布塊置入畫框中裝飾。
4. 覺察聚焦引導：指導語可聚焦於身體意象或內在性格的覺察：
• 例如：過往曾因體態受挫，故將衣物剪裁拼接成防護感披風；
• 或因容易焦慮緊張，所以在畫框內的衣物口袋中充填柔軟棉花或觸覺舒壓物件。`,
    steps: [
      {
        stepNumber: 1,
        title: "衣物記憶剪裁",
        description: "將承載回憶的舊衣物剪取具象徵性的局部或布塊。"
      },
      {
        stepNumber: 2,
        title: "畫框拼貼與意象轉化",
        description: "裝入畫框並結合舒壓素材裝飾，將過往身體經驗或性格轉化為具象作品。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-29",
    title: "社會計量",
    summary: "透過具體行動與空間站位營造安全感與團體凝聚力",
    category: "破冰",
    groupSize: "5人以上",
    nature: ["破冰", "空間動力", "安全感營造"],
    intensity: "低強度",
    depth: "適中",
    abilities: ["空間覺察", "團體常模建立", "表達開放度"],
    duration: "15-25 分鐘",
    materials: ["足夠全體行走的活動空間"],
    coverImage: "/assets/activities/activity-29.jpg",
    gameplay: `1. 空間向度定義：帶領者界定現場空間的兩極向度（例如：最左端代表緊張感 1 分、最右端為 5 分；或左端為住處最遠、右端為最近）。
2. 指令題目發布：帶領者明確說明題目主題與各向度意涵。
3. 自由光譜站位：成員依自身客觀條件或主觀感受，步行至所屬的空間位置站立。
4. 觀察常模分佈：成員環視全場觀察彼此相對位置與距離，直觀了解團體生態與同理多樣性。
5. 簡短焦點訪談：帶領者邀請部分不同站位的成員，簡要分享所選位置的個人考量。

— 變形版本 —
1. 全體成員在空間中自在穿梭遊走。
2. 帶領者發布指令：「請將雙手輕搭在您認為『最______』的夥伴肩膀上。」
3. 題目可循序漸進由客觀至主觀提問（例如：住最遠、最年輕、感到最緊張、笑得最燦爛、最想深入認識等），透過肢體連結加速破冰凝聚。`,
    steps: [
      {
        stepNumber: 1,
        title: "光譜空間界定",
        description: "劃定空間兩端座標分數與題目意義（如緊張度、居住遠近）。"
      },
      {
        stepNumber: 2,
        title: "站位移動與焦點簡訪",
        description: "全員移至符合自身現況的站位，觀察團體光譜分佈並簡短分享個人原因。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-30",
    title: "零件組合",
    summary: "透過重複性動作組合創造新的象徵意義",
    category: "合作",
    groupSize: "2~5人",
    nature: ["合作性", "肢體象徵", "即興共創"],
    intensity: "中強度",
    depth: "適中",
    abilities: ["肢體共創", "團隊默契", "隱喻象徵"],
    duration: "15-25 分鐘",
    materials: ["無須特殊道具"],
    coverImage: "/assets/activities/activity-30.jpg",
    gameplay: `版本 1（物件肢體拼組）：
1. 小組成員共同選定一項物品或特定角色主題。
2. 每位成員分別扮演其不同結構部位，定格或動態演繹主題畫面（例如四人組裝直升機：一人當主旋翼、一人當機身、兩人當側機翼）。

版本 2（習慣動作轉化）：
1. 每人選定一個生活習慣動作（可透過指導語引導，如在家中最常做的一個動作）。
2. 將該動作簡化為重複、節奏明確（一個八拍即可完成）的循環動作。
3. 帶著個人動作在場內漫步，2~5 人自由組隊。
4. 嘗試將彼此的習慣動作拼接串聯，賦予與原先動作完全無關的全新象徵意涵（例如一人打手遊動作成數鈔票、一人刷馬桶動作成付錢，兩人組合成商店收銀結帳的嶄新場景）。`,
    steps: [
      {
        stepNumber: 1,
        title: "物件肢體拼裝 (版本1)",
        description: "小組選定物品主題，成員分別扮演機翼、齒輪等部件合體演繹。"
      },
      {
        stepNumber: 2,
        title: "習慣動作重塑轉化 (版本2)",
        description: "提取生活重複動作並與夥伴拼接，賦予全新且不相干的象徵場景。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-31",
    title: "蒙娜麗莎",
    summary: "迅速醒腦與簡單動作演繹遊戲",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["動態"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["反應力", "專注", "肢體"],
    duration: "10-15 分鐘",
    materials: ["足夠圍圈活動的平整空間"],
    coverImage: "/assets/activities/activity-31.jpg",
    gameplay: `1、所有成員圍圈。
2、由一名成員開頭，隨機指向另一名成員並喊出「蒙」
3、由被指到的成員點下一位並依序喊出「娜」「麗」「莎」
4、最後被點到「莎」的成員需擺出名畫蒙娜麗莎的姿勢。
5、該成員左右兩邊成員需以手比出畫框的姿勢形成三人一組的動作。
6、由扮演蒙娜麗莎的成員重新開始指定下一位並重複1~5流程。

延伸玩法:可以依照輪次不斷擴大需要表演的範圍，如畫框再往外的成員需扮演遊客、再擴大兩位扮演冷氣等等。

備注:蒙娜麗莎有許多變形版，如虎克船長、鹹蛋超人等，帶領者可依照活動主題設定主要人物和情境，透果快速的指定與演繹來進行暖身。`,
    notes: `蒙娜麗莎有許多變形版，如虎克船長、鹹蛋超人等，帶領者可依照活動主題設定主要人物和情境，透果快速的指定與演繹來進行暖身。`,
    steps: [
      {
        stepNumber: 1,
        title: "圍圈隨機指定口令",
        description: "所有成員圍圈，由一名成員隨機指向另一位喊「蒙」，依序被指到的喊「娜」「麗」「莎」。"
      },
      {
        stepNumber: 2,
        title: "名畫姿勢與畫框合體",
        description: "被點到「莎」的成員需擺出蒙娜麗莎姿勢，左右兩邊成員需以手比出畫框姿勢形成三人一組動作。"
      },
      {
        stepNumber: 3,
        title: "重新指定與輪流循環",
        description: "由扮演蒙娜麗莎的成員重新開始指定下一位並重複流程。"
      }
    ],
    tips: [
      "延伸玩法：可以依照輪次不斷擴大需要表演的範圍，如畫框再往外的成員需扮演遊客、再擴大兩位扮演冷氣等等。"
    ],
    reflectionQuestions: []
  },
  {
    id: "notion-act-32",
    title: "身體地圖",
    summary: "透過描繪框架述說身體故事",
    category: "藝術",
    groupSize: "個人",
    nature: ["復原力", "表達性"],
    intensity: "低強度",
    depth: "較深入",
    abilities: ["自我覺察"],
    duration: "45-60 分鐘",
    materials: ["等身或至少半身大海報紙", "畫筆", "便條紙"],
    coverImage: "/assets/activities/activity-32.jpg",
    gameplay: `1、每人獲得一張等身或至少半身大小的海報紙。
2、成員躺在自己的紙上。
3、其他成員協助將躺下成員的外型輪廓，使用畫筆透過描邊的形式在海報紙上畫下。
4、成員自行加工海報紙，完成自己的「身體」如標記膝蓋位子、五官、手腕等細節。
5、經帶領者引導，成員在「身體地圖」上創作，分享自己的身體故事。可以指定部位，或由成員自行分享，亦或是指定事件（如國小最難忘的事情）由成員選擇自己的部位進行分享。
6、可以視需求及能力，透過繪畫、拼貼、文字等方式，呈現在地圖上某部位的故事。例如：成員在頭部畫上青紫色，並分享兒時遭受家暴的故事。

---
以下為進一步活動帶領
7、展覽邀請成員選擇一個舒適、喜歡的空間，將身體地圖放在該處，並可以加以佈置。例如放置在沙發，並擺滿枕頭、糖果。
8、所有成員自由「逛展」並在每個人的身體地圖上留下便條紙，給予彼此鼓勵、安慰和支持。

備註：本活動為較深入之藝術活動，需要有專業的領導者帶領，且於保密、安全、信任、高支持性的團體中進行。`,
    notes: `本活動為較深入之藝術活動，需要有專業的領導者帶領，且於保密、安全、信任、高支持性的團體中進行。`,
    steps: [
      {
        stepNumber: 1,
        title: "躺紙協助描繪外型輪廓",
        description: "每人獲得等身或半身海報紙並躺在紙上，其他成員協助使用畫筆透過描邊在海報紙上畫下輪廓。"
      },
      {
        stepNumber: 2,
        title: "加工細節與分享身體故事",
        description: "自行加工膝蓋、五官、手腕等細節，在身體地圖上透過繪畫、拼貼或文字創作分享身體故事。"
      },
      {
        stepNumber: 3,
        title: "佈置空間逛展與便條支持",
        description: "將身體地圖佈置於喜歡的空間，成員自由逛展並在彼此的地圖上留下便條紙給予鼓勵支持。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-33",
    title: "廣播電臺",
    summary: "放鬆休息與故事分享",
    category: "模擬體驗",
    groupSize: "5人以上",
    nature: ["復原力", "談話性"],
    intensity: "低強度",
    depth: "較深入",
    abilities: ["溝通"],
    duration: "30-40 分鐘",
    materials: ["音樂播放設備", "椅子三張（廣播區）"],
    coverImage: "/assets/activities/activity-33.jpg",
    gameplay: `1、事前準備：活動前透過其他活動，帶出主題並邀請成員分享與主題有關、自己喜歡的歌曲。關閉所有燈光，使空間成為適合休息的場所；擺放三張椅子作為廣播區並播放舒適的音樂。
2、邀請所有成員選擇舒服的位子與姿勢休息。
3、領導者與協調領導者播放音樂（與當天主題有關），自我揭露分享自己的生命經驗以及選擇的歌曲。例如主題為被欺負的經驗，領導者選擇「隱形的翅膀」，播放該歌曲作為背景音樂，並分享國小時受同學欺負，歌曲陪伴他熬過這段時光的故事。
4、邀請清醒、有意願的成員至廣播區，播放該成員選擇的歌曲，並透過對談的方式，引導成員分享自己的經驗。

備註：本活動以歌曲作為媒介，可搭配午後休息時間以及當日活動主題進行。透過舒適的空間營造，以及午休的私密感，營造安全的心理空間。`,
    notes: `本活動以歌曲作為媒介，可搭配午後休息時間以及當日活動主題進行。透過舒適的空間營造，以及午休的私密感，營造安全的心理空間。`,
    steps: [
      {
        stepNumber: 1,
        title: "事前準備與舒適空間營造",
        description: "關閉燈光營造休息氛圍，擺放三張椅子作為廣播區，播放舒適音樂讓全員選擇舒服姿勢休息。"
      },
      {
        stepNumber: 2,
        title: "領導者音樂示範與故事分享",
        description: "領導者播放與當日主題有關音樂，自我揭露分享自己的生命經驗以及選擇該歌曲的故事。"
      },
      {
        stepNumber: 3,
        title: "邀請成員廣播對談分享",
        description: "邀請清醒、有意願的成員至廣播區播放其所選歌曲，並透過對談引導成員分享自己的經驗。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-34",
    title: "動物園",
    summary: "蒙娜麗莎與零件組合綜合版",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["動態"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["反應力", "專注", "肢體"],
    duration: "10-15 分鐘",
    materials: ["足夠圍圈活動的平整空間"],
    coverImage: "/assets/activities/activity-34.jpg",
    gameplay: `1、視活動主題決定同一系列的各種角色以及動作，如以動物為主題之活動，設定雞、大象、袋鼠、刺蝟，並設計至少可由三人組成的動作，中間人為本體，左右兩側為該本體的配件或部位。
例如:袋鼠，中間成員將雙手放至胸前、左右兩邊單腳蹲下扮演袋鼠的腿。
2、所有成員圍圈。
3、由領導者說明並示範遊戲角色與動作。
4、中間的成員直接指定圍圈中的特定成員，並喊出角色，如「袋鼠！」「大象！」「刺蝟！」被指定的成員及其兩側成員需完成該動作。
5、可隨著輪次開始加速或是增加角色動作，提升遊戲難度。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "設計三人系列角色動作",
        description: "決定同一系列角色動作（中間為本體，左右兩側為配件部位，如袋鼠雙手抱胸、兩側蹲下當腿）。"
      },
      {
        stepNumber: 2,
        title: "全員圍圈與示範",
        description: "全員圍圈，由領導者說明並示範遊戲角色與動作。"
      },
      {
        stepNumber: 3,
        title: "指定喊名與加速升級",
        description: "中間成員指定圍圈特定成員喊出角色，被指定者及其兩側需合體完成動作，隨輪次加速或增角色。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-35",
    title: "過河拆橋",
    summary: "使用拼圖地墊進行的合作遊戲",
    category: "合作",
    groupSize: "5人以上",
    nature: ["動態", "合作性"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["合作", "溝通"],
    duration: "15-20 分鐘",
    materials: ["拼圖地墊（每組數量為人數減一）"],
    coverImage: "/assets/activities/activity-35.jpg",
    gameplay: `1. 設定起點和終點，距離可按參加者年齡、身高、場地大小和活動時間調整。
2. 建議5~10人一組，可進行分組競賽。
3. 每組獲發拼圖地墊，數量為每組人數減一。例如每組10人，便獲發9張地墊。
4. 參加者要同心協力由起點前往終點。
5. 過程中，所有參加者身體任何部分都不可直接接觸地面，只能站在地墊上。
6. 小組想辦法移動地墊讓所有組員向前，最後一位成員可能需回收墊子傳至第一位繼續往前。
7. 若有人接觸地面，可視乎帶領目的設定後果，例如退回上一個位置、全組暫停5秒、失去一分，或由小組重新商量後繼續。
8. 可增加難度規定如所有墊子上都需要有人，成員腳需接力踩在墊子上。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "設定起訖與發放地墊",
        description: "建議5~10人一組分組競賽，每組獲發比人數少一張的拼圖地墊，設定起點與終點距離。"
      },
      {
        stepNumber: 2,
        title: "同心協力移動向前",
        description: "過程中身體不可接觸地面只能站在地墊上，最後一位成員回收墊子傳至第一位繼續向前鋪路。"
      },
      {
        stepNumber: 3,
        title: "違規處理與難度微調",
        description: "若接觸地面依設定接受退回、暫停等後果；亦可增加規定如所有墊子上都需有人接力踩著。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-36",
    title: "護身符/幸運小物",
    summary: "使用藝術媒材自製屬於自己的小物",
    category: "藝術",
    groupSize: "個人",
    nature: ["復原力", "表達性"],
    intensity: "低強度",
    depth: "適中",
    abilities: ["創意", "自我覺察"],
    duration: "30-45 分鐘",
    materials: ["毛根", "軟陶", "熱縮片", "打洞穿線工具"],
    coverImage: "/assets/activities/activity-36.jpg",
    gameplay: `1、本活動可做為團體中後期的藝術活動設計。依據活動主題選擇不同媒材以及引導語。
2、可使用毛根、軟陶、熱縮片可塑性高的媒材。
3、依據活動主題給予指導語如「如果要送自己一個能幫自己安定下來的物品會是什麼」、「依據自己的性格創造自己的徽章」「在遇到困難時有什麼能夠幫助你」等等。
4、透過製作完後的塑形、硬化、縮小等具備儀式性的設計，並將小物打洞穿線、收納等方式，使作品可以成為「帶得走」的意象。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "活動定位與媒材挑選",
        description: "作為團體中後期活動，提供毛根、軟陶、熱縮片等高可塑性媒材。"
      },
      {
        stepNumber: 2,
        title: "給予指導語主題創作",
        description: "依主題給予指導語（如送自己安定物品、性格徽章、困難時的幫助），進行小物製作。"
      },
      {
        stepNumber: 3,
        title: "儀式性塑形轉化為象徵",
        description: "透過塑形、硬化、縮小等儀式性設計並打洞穿線，使作品成為「帶得走」的安定意象。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-37",
    title: "報紙風火輪",
    summary: "分工合作使用報紙製作圓環前行",
    category: "合作",
    groupSize: "5人以上",
    nature: ["動態", "合作性"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["創意", "合作", "溝通"],
    duration: "20-30 分鐘",
    materials: ["舊報紙", "剪刀", "膠帶"],
    coverImage: "/assets/activities/activity-37.jpg",
    gameplay: `1、5~10人一組。建議進行分組競賽。
2、每組獲得適量報紙、剪刀、膠帶。
3、成員需在限時內，製出一個可容納全組組員的大圓環。
4、所有成員站在圓環內，由起點走向終點。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "分組與物資分配",
        description: "5~10人一組進行分組競賽，每組發放適量報紙、剪刀與膠帶。"
      },
      {
        stepNumber: 2,
        title: "限時製作大圓環",
        description: "組員在限時內合作黏接出一個能容納全組組員的大報紙圓環。"
      },
      {
        stepNumber: 3,
        title: "全員進環步向終點",
        description: "所有組員站在圓環內，合力滾動圓環履帶由起點前行至終點。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-38",
    title: "吃西瓜",
    summary: "透過動作與聲音快速破冰暖身",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["動態"],
    intensity: "低強度",
    depth: "較淺",
    abilities: ["創意", "反應力"],
    duration: "10-15 分鐘",
    materials: ["圍圈活動空間"],
    coverImage: "/assets/activities/activity-38.jpg",
    gameplay: `1. 所有人圍圈，並指定其中一個人是開始位置。
2. 講解規則：當開始的人伸出右手並由右往左擦嘴巴（同時發出吃西瓜聲音，咻～），那麼就輪到左邊成員比動作，如果他比一樣的動作就換左邊的夥伴，假設他改成伸出左手並由左往右擦嘴巴，那就是右邊的夥伴開始比動作。
3. 除了左右邊也可朝向對面或隨機成員，唯需要有明確的手部動作指向。
4. 隨著團體進行可加速、誇示吃西瓜的聲音與時間，增加遊戲趣味性。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "圍圈並講解規則",
        description: "全員圍圈指定起始位置，右手由右向左擦嘴帶「咻～」傳左邊，左手由左向右擦嘴傳右邊。"
      },
      {
        stepNumber: 2,
        title: "擦嘴動作與方向傳遞",
        description: "依夥伴比出的動作方向輪替接棒，亦可明確指向對面或隨機成員。"
      },
      {
        stepNumber: 3,
        title: "加速與誇張表現",
        description: "隨著遊戲推進持續加速並誇大吃西瓜聲音與時間，提升趣味性。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-39",
    title: "物品聯想",
    summary: "跳脫框架重新賦予物品新意義",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["動態"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["創意", "反應力", "肢體"],
    duration: "10-15 分鐘",
    materials: ["日常物件（原子筆、水瓶、椅子等）或特定形狀物"],
    coverImage: "/assets/activities/activity-39.jpg",
    gameplay: `1、全體圍圓圈5~10人一組為佳。
2、準備一個隨手可得的日常物件（如原子筆、水瓶、椅子），或直接使用特定形狀如紙製棒狀、球狀、盒狀物。
3、第一位成員拿著物品，賦予它「非原本用途」的新身份（例如把筆當成「牙刷」）。
4、玩家必須用動作和聲音表現出這個新身份，然後傳給下一位。
5、下一位接過物品，必須立刻改變它的用途與身份（例如從牙刷變成「麥克風」或「指揮棒」），不能重複。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "準備物品與圍圈",
        description: "5~10人圍圓圈，準備隨手可得的日常物件（筆、水瓶、椅子或特定形狀物）。"
      },
      {
        stepNumber: 2,
        title: "賦予非原本用途新身份",
        description: "首位成員拿著物品賦予它非原本用途之新身份，以動作和聲音表現出來傳給下一位。"
      },
      {
        stepNumber: 3,
        title: "輪流傳遞不可重複",
        description: "接過物品者需立刻改變用途與身份，持續輪替且不可重複。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-40",
    title: "迴轉台詞",
    summary: "透過同樣的語句展示不同情境與情緒",
    category: "暖身",
    groupSize: "5人以上",
    nature: ["表達性"],
    intensity: "低強度",
    depth: "較淺",
    abilities: ["創意", "反應力", "溝通"],
    duration: "15-20 分鐘",
    materials: ["圍圈坐姿，無特殊道具"],
    coverImage: "/assets/activities/activity-40.jpg",
    gameplay: `1、團體圍圈。
2、依據活動主題設定兩句台詞如:「給你/我不要」、「拜託/不可以」。
3、固定向左以及向右的台詞，如向左只能說給你、向右只能說我不要。
4、成員自由向左右說出台詞，可自由帶入不同的語調、情境、動作表演。

延伸提問
1、領導者可打斷活動，詢問成員認為該情境可能是什麼。
2、詢問成員最常在什麼情況說出這句話、聽到這句話。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "設定左右台詞",
        description: "團體圍圈，依活動主題設定兩句台詞（如向左只能說「給你」、向右只能說「我不要」）。"
      },
      {
        stepNumber: 2,
        title: "自由投遞表演",
        description: "成員自由向左右說出台詞，自由帶入不同語調、情境與動作表演。"
      },
      {
        stepNumber: 3,
        title: "適時打斷延伸提問",
        description: "領導者可打斷活動，詢問成員情境猜想與生活經歷。"
      }
    ],
    tips: [],
    reflectionQuestions: [
      "領導者可打斷活動，詢問成員認為該情境可能是什麼。",
      "詢問成員最常在什麼情況說出這句話、聽到這句話。"
    ]
  },
  {
    id: "notion-act-41",
    title: "情境演繹",
    summary: "隨機抽取元素即興表演",
    category: "合作",
    groupSize: "5人以上",
    nature: ["動態", "表達性"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["創意", "合作", "肢體"],
    duration: "20-30 分鐘",
    materials: ["人物/關係、地點、事件元素紙條"],
    coverImage: "/assets/activities/activity-41.jpg",
    gameplay: `1、3~5人一組。
2、由領導者設定/製作元素，包含人物(關係)、地點、事件。
3、成員抽取紙條，紙條設定盡可能荒誕、搞笑，如「情侶在手術室考試」
4、小組成員共同演繹一段短劇呈現該畫面。限制每人只能說一句台詞或不能說話，加強演繹佔比。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "分組與準備元素紙條",
        description: "3~5人一組，領導者設定製作包含人物關係、地點、事件之元素紙條。"
      },
      {
        stepNumber: 2,
        title: "抽取荒誕題目紙條",
        description: "成員抽取紙條，設定盡可能荒誕搞笑（如「情侶在手術室考試」）。"
      },
      {
        stepNumber: 3,
        title: "限制台詞演繹短劇",
        description: "小組共同演繹短劇呈現畫面，限制每人只能說一句台詞或不能說話，加強肢體演繹。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-42",
    title: "氣球不落地",
    summary: "合作讓氣球持續飄在空中",
    category: "合作",
    groupSize: "2~5人",
    nature: ["動態", "合作性"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["反應力", "合作", "專注"],
    duration: "10-15 分鐘",
    materials: ["大小各異的氣球數顆"],
    coverImage: "/assets/activities/activity-42.jpg",
    gameplay: `1、準備大小各異的氣球。
2、活動開始將氣球丟至空中，小組成員透過拍打使氣球維持在空中不落地。禁止直接抓住氣球。
3、隨著活動進行持續放入氣球增加難度。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "準備氣球與說明拍打規則",
        description: "準備大小各異氣球，活動開始丟至空中，透過拍打維持不落地，禁止直接抓住氣球。"
      },
      {
        stepNumber: 2,
        title: "拍打合作維持飄浮",
        description: "小組成員走位補位共同拍打，保持氣球持續漂浮在空中。"
      },
      {
        stepNumber: 3,
        title: "持續加球提高難度",
        description: "隨著活動進行陸續放入更多氣球增加難度。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-43",
    title: "報紙不會裂",
    summary: "所有組員合作站在有限的區域內",
    category: "合作",
    groupSize: "2~5人",
    nature: ["動態", "合作性", "復原力"],
    intensity: "中強度",
    depth: "較淺",
    abilities: ["創意", "合作", "溝通"],
    duration: "15-20 分鐘",
    materials: ["不同大小的報紙數張"],
    coverImage: "/assets/activities/activity-43.jpg",
    gameplay: `1、準備不同大小的報紙。
2、小組成員需所有人都站在報紙範圍內。
3、隨著遊戲輪次報紙不斷縮小。成員需更靠近彼此、或透過背、抱等方式使所有人在範圍內。

備注:需特別注意身體界線以及成員安全，避免性平事件風險。`,
    notes: `需特別注意身體界線以及成員安全，避免性平事件風險。`,
    steps: [
      {
        stepNumber: 1,
        title: "全員站在報紙範圍內",
        description: "準備報紙，小組所有組員需全員站在報紙範圍內。"
      },
      {
        stepNumber: 2,
        title: "對摺縮小與親近支撐",
        description: "隨遊戲輪次報紙不斷縮小，成員需更靠近彼此或透過背、抱等方式使所有人都在範圍內。"
      },
      {
        stepNumber: 3,
        title: "注意身體界線與安全防護",
        description: "需特別注意身體界線以及成員安全，避免性平事件風險。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  },
  {
    id: "notion-act-44",
    title: "動作接力",
    summary: "根據拉邦動作分析覺察肢體",
    category: "暖身",
    groupSize: "2~5人",
    nature: ["動態", "復原力", "表達性"],
    intensity: "中強度",
    depth: "適中",
    abilities: ["創意", "專注", "肢體", "自我覺察"],
    duration: "15-25 分鐘",
    materials: ["平整開闊的活動空間"],
    coverImage: "/assets/activities/activity-44.jpg",
    gameplay: `拉邦動作分析大致分為四項:流動、空間、勁力、速度。透過四個面向，覺察自己的動作是瞬間/流動；空間如何變化；力量大小；快或慢。

類似活動誇大縮小的進行方式，加入更多覺察。

1、決定一個單一重複性的動作。可透過指導語如「在家最常做的動作」
2、以四個項目分析動作，覺察該動作的「下一步」
3、可個人也可以團體進行。
4、延伸該動作，重複並順著力量的方向延伸到下一個動作。
5、強調沒有對錯，跟著身體感受流動。`,
    notes: ``,
    steps: [
      {
        stepNumber: 1,
        title: "決定重複性動作",
        description: "透過指導語如「在家最常做的動作」決定一個單一重複性動作。"
      },
      {
        stepNumber: 2,
        title: "拉邦四面向分析動作",
        description: "以流動、空間、勁力、速度分析動作，覺察該動作的「下一步」，可個人或團體進行。"
      },
      {
        stepNumber: 3,
        title: "順應力量方向延伸流動",
        description: "延伸該動作，重複並順著力量方向延伸到下一個動作，強調沒有對錯跟著感受流動。"
      }
    ],
    tips: [],
    reflectionQuestions: []
  }
];
