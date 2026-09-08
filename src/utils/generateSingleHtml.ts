import { Activity } from '../types';
import { INQUIRY_TOOLKIT, ART_MATERIALS } from '../data/inquiryQuestions';

/**
 * 產生完全獨立、零外在依賴、內嵌 HTML+CSS+JS 的 Single File HTML 檔案內容
 * 包含首頁三大入口 (引導問句庫、藝術媒材表、活動教案庫) 與獨立切換分頁
 */
export function generateSingleFileHtml(activities: Activity[]): string {
  const jsonActivities = JSON.stringify(activities, null, 2);
  const jsonInquiries = JSON.stringify(INQUIRY_TOOLKIT, null, 2);
  const jsonMaterials = JSON.stringify(ART_MATERIALS, null, 2);

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>活動教案與引導資料庫 (首頁入口・44項教案版)</title>
  <meta name="description" content="溫暖木質簡約文青風的活動教案資料庫，具備首頁三大模組入口：引導問句庫、藝術媒材表與活動教案庫。" />

  <!-- Google 字體：思源宋體與黑體 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&family=Noto+Serif+TC:wght@500;600;700&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN 支援 -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['"Noto Serif TC"', 'Georgia', 'serif'],
            sans: ['"Noto Sans TC"', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <style>
    body {
      font-family: 'Noto Sans TC', system-ui, sans-serif;
      background-color: #F9F8F6;
      color: #1F2421;
    }
    
    .card-lift {
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
    }
    .card-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 25px -5px rgba(31, 36, 33, 0.08), 0 8px 10px -6px rgba(31, 36, 33, 0.04);
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #F4F1EA;
    }
    ::-webkit-scrollbar-thumb {
      background: #D5CFC5;
      border-radius: 9999px;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-[#E07A5F]/20 selection:text-[#1F2421]">

  <!-- 頂部導航與標題 -->
  <header class="border-b border-[#E8E4DC] bg-[#FAF8F5]/95 backdrop-blur-md sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
      <div class="flex items-center gap-3 cursor-pointer" onclick="switchView('home')">
        <div class="w-10 h-10 rounded-xl bg-[#1F2421] text-[#EFECE6] flex items-center justify-center font-serif font-bold text-lg shadow-xs shrink-0">
          活
        </div>
        <div>
          <h1 class="text-lg sm:text-xl font-serif font-bold tracking-tight text-[#1F2421]">
            活動教案與引導資料庫
          </h1>
          <p class="text-xs text-[#736E65] mt-0.5">引導問句庫・藝術媒材表・44項教案型錄</p>
        </div>
      </div>

      <!-- 導航分頁按鈕 -->
      <nav class="flex items-center gap-1 bg-[#EFECE6] p-1 rounded-xl border border-[#E2DDD5] self-start md:self-center overflow-x-auto max-w-full">
        <button
          id="nav-home"
          onclick="switchView('home')"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap bg-white text-[#1F2421] shadow-2xs"
        >
          首頁
        </button>
        <button
          id="nav-inquiry"
          onclick="switchView('inquiry')"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap text-[#6B6357] hover:text-[#1F2421]"
        >
          💬 引導問句庫
        </button>
        <button
          id="nav-materials"
          onclick="switchView('materials')"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap text-[#6B6357] hover:text-[#1F2421]"
        >
          🎨 藝術媒材表
        </button>
        <button
          id="nav-activities"
          onclick="switchView('activities')"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap text-[#6B6357] hover:text-[#1F2421]"
        >
          📚 活動教案庫 (${activities.length})
        </button>
      </nav>

      <!-- 右側按鈕 -->
      <div class="flex items-center gap-2">
        <button
          id="btn-surprise"
          onclick="pickRandomActivity()"
          class="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#4A443B] border border-[#E2DDD5] hover:bg-[#F3EFEA]"
        >
          🎲 隨機挑選
        </button>
      </div>
    </div>
  </header>

  <!-- 主內容容器 -->
  <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">

    <!-- ==========================================
         VIEW 1: 首頁 (三大選項卡片)
         ========================================== -->
    <section id="view-home" class="space-y-10 py-2">
      <!-- 迎賓 Banner -->
      <div class="rounded-3xl p-8 sm:p-12 bg-[#EFECE6] border border-[#E2DDD5] space-y-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#4D6A56] border border-[#D5CFC5]">
          ✨ 表達性藝術與團體引導・全方位教案庫
        </span>
        <h2 class="font-serif font-bold text-3xl sm:text-4xl text-[#1F2421]">
          為帶領者量身打造的心靈對話與體驗引導資源庫
        </h2>
        <p class="text-xs sm:text-sm text-[#5C554B] max-w-2xl leading-relaxed">
          請選擇你今天想探索的單元。包含焦點解決與敘事問句庫、12 種表達性藝術媒材指南，以及 44 個經過實務驗證的團體教案。
        </p>
      </div>

      <!-- 三大選項卡片 -->
      <div class="space-y-4">
        <h3 class="font-serif font-bold text-xl sm:text-2xl text-[#1F2421]">請選擇欲瀏覽的功能模組</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
          
          <!-- 選項 1: 引導問句庫 -->
          <div
            onclick="switchView('inquiry')"
            class="card-lift bg-white rounded-3xl border border-[#E8E4DC] hover:border-[#D5CFC5] p-7 sm:p-8 flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-2xl bg-[#FDF0ED] text-[#E07A5F] flex items-center justify-center text-xl">
                  💬
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF0ED] text-[#C85A3E]">
                  3 大對話學派
                </span>
              </div>
              <div>
                <h4 class="font-serif font-bold text-2xl text-[#1F2421]">引導問句庫</h4>
                <p class="text-xs sm:text-sm text-[#5C554B] mt-1.5 leading-relaxed">
                  收錄焦點解決短期治療、敘事治療、ORID 焦點討論法核心提問句，支援一鍵複製提問。
                </p>
              </div>
              <ul class="text-xs text-[#665E52] space-y-1.5 pt-2 border-t border-[#F2EEE9]">
                <li>• 奇蹟問句、例外問句、評量問句</li>
                <li>• 外化問題、尋求特殊意義事件</li>
                <li>• ORID 四層次深度焦點反思提問</li>
              </ul>
            </div>
            <div class="pt-6 mt-6 border-t border-[#F2EEE9] text-xs font-bold text-[#E07A5F] flex items-center justify-between">
              <span>進入問句庫查閱 →</span>
            </div>
          </div>

          <!-- 選項 2: 藝術媒材表 -->
          <div
            onclick="switchView('materials')"
            class="card-lift bg-white rounded-3xl border border-[#E8E4DC] hover:border-[#D5CFC5] p-7 sm:p-8 flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-2xl bg-[#EEF3EF] text-[#4D6A56] flex items-center justify-center text-xl">
                  🎨
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF3EF] text-[#3E5C46]">
                  12 種表達媒材
                </span>
              </div>
              <div>
                <h4 class="font-serif font-bold text-2xl text-[#1F2421]">藝術媒材表</h4>
                <p class="text-xs sm:text-sm text-[#5C554B] mt-1.5 leading-relaxed">
                  彙整常用表達性藝術媒材的物理特性、心理投射意涵與帶領者安全邊界指引。
                </p>
              </div>
              <ul class="text-xs text-[#665E52] space-y-1.5 pt-2 border-t border-[#F2EEE9]">
                <li>• 水彩渲染、粉蠟筆直覺塗鴉、報紙</li>
                <li>• 輕黏土、軟陶、毛根揉捏與觸覺回饋</li>
                <li>• 面具創作、JEANSFRAME 舊物重塑</li>
              </ul>
            </div>
            <div class="pt-6 mt-6 border-t border-[#F2EEE9] text-xs font-bold text-[#4D6A56] flex items-center justify-between">
              <span>查看藝術媒材指南 →</span>
            </div>
          </div>

          <!-- 選項 3: 活動教案庫 -->
          <div
            onclick="switchView('activities')"
            class="card-lift bg-white rounded-3xl border border-[#E8E4DC] hover:border-[#D5CFC5] p-7 sm:p-8 flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-2xl bg-[#FDF6E9] text-[#D4A373] flex items-center justify-center text-xl">
                  📚
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF6E9] text-[#A07026]">
                  44 項完整教案
                </span>
              </div>
              <div>
                <h4 class="font-serif font-bold text-2xl text-[#1F2421]">活動教案庫</h4>
                <p class="text-xs sm:text-sm text-[#5C554B] mt-1.5 leading-relaxed">
                  破冰、暖身、合作、藝術與模擬體驗。具備即時搜尋與多維度強度人數篩選。
                </p>
              </div>
              <ul class="text-xs text-[#665E52] space-y-1.5 pt-2 border-t border-[#F2EEE9]">
                <li>• 兩真一假、人體結、六格畫、面具創作</li>
                <li>• 步驟式帶領說明與帶領者心法秘訣</li>
                <li>• 結合反思提問引導與道具清單</li>
              </ul>
            </div>
            <div class="pt-6 mt-6 border-t border-[#F2EEE9] text-xs font-bold text-[#A07026] flex items-center justify-between">
              <span>瀏覽 44 個活動教案 →</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ==========================================
         VIEW 2: 引導問句庫
         ========================================== -->
    <section id="view-inquiry" class="hidden space-y-6">
      <div class="flex items-center justify-between">
        <button onclick="switchView('home')" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C554B] hover:text-[#1F2421]">
          ← 返回首頁選項
        </button>
        <button onclick="switchView('activities')" class="text-xs font-medium text-[#C85A3E] hover:underline">
          前往活動教案庫 →
        </button>
      </div>

      <div class="rounded-2xl p-6 bg-[#FDF0ED] border border-[#F4D0C7]">
        <h2 class="font-serif font-bold text-2xl text-[#1F2421]">帶領者引導問句庫</h2>
        <p class="text-xs sm:text-sm text-[#5C554B] mt-1">包含焦點解決短期治療、敘事治療、ORID 焦點討論法與活動延伸提問引導心法。</p>
      </div>

      <div id="inquiry-cards-container" class="space-y-6">
        <!-- JS 動態插入 -->
      </div>
    </section>

    <!-- ==========================================
         VIEW 3: 藝術媒材表
         ========================================== -->
    <section id="view-materials" class="hidden space-y-6">
      <div class="flex items-center justify-between">
        <button onclick="switchView('home')" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C554B] hover:text-[#1F2421]">
          ← 返回首頁選項
        </button>
        <button onclick="switchView('activities')" class="text-xs font-medium text-[#4D6A56] hover:underline">
          前往活動教案庫 →
        </button>
      </div>

      <div class="rounded-2xl p-6 bg-[#EEF3EF] border border-[#D1E0D5]">
        <h2 class="font-serif font-bold text-2xl text-[#1F2421]">常用藝術媒材指南表</h2>
        <p class="text-xs sm:text-sm text-[#5C554B] mt-1">12 種表達性藝術媒材的物理特性、安全邊界與推薦搭配教案。</p>
      </div>

      <div id="materials-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- JS 動態插入 -->
      </div>
    </section>

    <!-- ==========================================
         VIEW 4: 活動教案庫
         ========================================== -->
    <section id="view-activities" class="hidden space-y-6">
      <div class="flex items-center justify-between">
        <button onclick="switchView('home')" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C554B] hover:text-[#1F2421]">
          ← 返回首頁選項
        </button>
        <div class="flex items-center gap-2 text-xs">
          <button onclick="switchView('inquiry')" class="text-[#C85A3E] hover:underline">💬 問句庫</button>
          <span>•</span>
          <button onclick="switchView('materials')" class="text-[#4D6A56] hover:underline">🎨 媒材表</button>
        </div>
      </div>

      <!-- 搜尋與篩選面板 -->
      <div class="bg-white rounded-2xl border border-[#E8E4DC] p-5 space-y-4">
        <input
          id="search-input"
          type="text"
          placeholder="搜尋活動名稱、亮點、道具或能力關鍵字..."
          class="w-full px-4 py-2.5 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs sm:text-sm"
        />

        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs text-[#7A7368]">
            <span class="font-medium">活動分類：</span>
            <span>共 <strong id="results-count" class="text-[#1F2421]">${activities.length}</strong> 項活動</span>
          </div>
          <div id="category-pills" class="flex items-center gap-2 overflow-x-auto pb-1">
            <!-- JS 產生分類按鈕 -->
          </div>
        </div>

        <div class="pt-2 border-t border-[#F0ECE4] flex flex-wrap items-center gap-3 text-xs">
          <select id="filter-groupsize" class="px-2.5 py-1.5 rounded-lg border border-[#E2DDD5] bg-[#FAF8F5]">
            <option value="all">建議人數：全部</option>
            <option value="個人">個人 (1人)</option>
            <option value="2~5人">2~5人 (小組)</option>
            <option value="5人以上">5人以上 (大團體)</option>
          </select>

          <select id="filter-intensity" class="px-2.5 py-1.5 rounded-lg border border-[#E2DDD5] bg-[#FAF8F5]">
            <option value="all">活動強度：全部</option>
            <option value="低強度">低強度</option>
            <option value="中強度">中強度</option>
            <option value="高強度">高強度</option>
          </select>

          <select id="filter-depth" class="px-2.5 py-1.5 rounded-lg border border-[#E2DDD5] bg-[#FAF8F5]">
            <option value="all">深度：全部</option>
            <option value="較淺">較淺</option>
            <option value="適中">適中</option>
            <option value="較深入">較深入</option>
          </select>

          <button id="btn-reset-filters" class="ml-auto text-xs text-[#C85A3E] hover:underline">
            重設篩選
          </button>
        </div>
      </div>

      <!-- 活動卡片網格 -->
      <div id="activities-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <!-- JS 動態插入卡片 -->
      </div>
      <div id="no-results" class="hidden py-16 text-center bg-white rounded-2xl border border-[#EAE6DF] max-w-md mx-auto">
        <div class="text-3xl mb-2">🍃</div>
        <h3 class="font-serif font-bold text-lg text-[#1F2421]">無符合條件的活動</h3>
        <p class="text-xs text-[#736E65] mt-1">請嘗試放寬人數、強度或重設搜尋關鍵字。</p>
      </div>
    </section>

  </main>

  <!-- 詳情彈窗 -->
  <div id="activity-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden flex items-center justify-center p-3 sm:p-6">
    <div class="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl sm:rounded-3xl border border-[#E2DDD5] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
      <div class="px-5 py-3.5 bg-white border-b border-[#EAE6DF] flex items-center justify-between">
        <span id="modal-category-badge" class="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EEF3EF] text-[#4D6A56]">
          分類
        </span>
        <button id="btn-close-modal" class="px-3 py-1 bg-[#FAF8F5] hover:bg-[#EFECE6] rounded-lg text-xs font-medium border border-[#E2DDD5]">
          關閉 (Esc)
        </button>
      </div>
      <div id="modal-content-body" class="overflow-y-auto flex-1">
        <!-- JS 填入 -->
      </div>
    </div>
  </div>

  <footer class="mt-16 border-t border-[#E8E4DC] bg-[#FAF8F5] py-8 text-xs text-[#7A7368] text-center">
    活動教案與引導資料庫（共 44 項教案・單一檔案完全離線版）
  </footer>

  <!-- 腳本 -->
  <script>
    const activities = ${jsonActivities};
    const inquiryToolkit = ${jsonInquiries};
    const artMaterials = ${jsonMaterials};
    const categories = ['全部', '破冰', '暖身', '合作', '藝術', '模擬體驗'];

    let currentView = 'home';
    let currentCategory = '全部';
    let searchQuery = '';
    let selectedGroupSize = 'all';
    let selectedIntensity = 'all';
    let selectedDepth = 'all';

    function switchView(viewName) {
      currentView = viewName;
      ['home', 'inquiry', 'materials', 'activities'].forEach(v => {
        const el = document.getElementById('view-' + v);
        if (el) el.classList.toggle('hidden', v !== viewName);
        
        const navEl = document.getElementById('nav-' + v);
        if (navEl) {
          if (v === viewName) {
            navEl.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap bg-white text-[#1F2421] shadow-2xs';
          } else {
            navEl.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap text-[#6B6357] hover:text-[#1F2421]';
          }
        }
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 渲染引導問句庫
    function renderInquiry() {
      const container = document.getElementById('inquiry-cards-container');
      container.innerHTML = inquiryToolkit.map(sec => \`
        <div class="bg-white rounded-3xl border border-[#EAE6DF] p-6 sm:p-8 space-y-4">
          <div class="border-b border-[#F0ECE4] pb-3 flex items-center justify-between">
            <div>
              <h3 class="font-serif font-bold text-xl text-[#1F2421]">\${sec.title}</h3>
              <p class="text-xs text-[#7A7368] mt-0.5">\${sec.subtitle}</p>
            </div>
            \${sec.fullContent ? \`
              <button onclick="copyText('\${sec.fullContent.replace(/'/g, "\\\\'").replace(/\\n/g, '\\\\n')}', this)" class="text-xs px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E2DDD5] text-[#7A7368] hover:text-[#1F2421]">
                複製指南全文
              </button>
            \` : ''}
          </div>
          \${sec.intro ? '<div class="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] text-xs sm:text-sm text-[#5C554B] leading-relaxed whitespace-pre-line">' + sec.intro + '</div>' : ''}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            \${sec.items.map(item => \`
              <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-2">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-1 rounded-md text-xs font-bold bg-[#EFECE6] text-[#4A443B]">\${item.type}</span>
                  <button onclick="copyText('\${item.question.replace(/'/g, "\\\\'")}', this)" class="text-[11px] px-2 py-0.5 rounded bg-white border border-[#E2DDD5] text-[#7A7368] hover:text-[#1F2421]">
                    複製
                  </button>
                </div>
                <p class="text-sm font-medium text-[#1F2421]">\${item.question}</p>
                \${item.description ? '<p class="text-xs text-[#7A7368] pt-1 border-t border-[#EAE6DF]">💡 ' + item.description + '</p>' : ''}
              </div>
            \`).join('')}
          </div>
          \${sec.conclusion ? '<div class="p-4 rounded-2xl bg-[#F5F8F5] border border-[#DCE5DC] text-xs sm:text-sm text-[#47604E] leading-relaxed whitespace-pre-line space-y-1"><div class="font-bold text-xs text-[#2F4E38]">💡 帶領心法與實務建議</div><div>' + sec.conclusion + '</div></div>' : ''}
        </div>
      \`).join('');
    }

    // 渲染藝術媒材表
    function renderMaterials() {
      const container = document.getElementById('materials-cards-container');
      container.innerHTML = artMaterials.map((mat, idx) => \`
        <div class="bg-white rounded-3xl border border-[#EAE6DF] p-6 flex flex-col justify-between space-y-3">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-2xl">\${mat.icon}</span>
              <span class="text-[11px] px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E2DDD5]">#\${idx + 1}</span>
            </div>
            <h4 class="font-serif font-bold text-lg text-[#1F2421]">\${mat.name}</h4>
            <p class="text-xs text-[#5C554B] leading-relaxed">\${mat.desc}</p>
          </div>
          \${mat.suitableActivities ? \`
            <div class="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] text-xs">
              <span class="font-semibold text-[#4D6A56]">推薦教案：</span>
              <p class="text-[#332E27] mt-0.5">\${mat.suitableActivities}</p>
            </div>
          \` : ''}
        </div>
      \`).join('');
    }

    // 活動卡片與篩選
    const grid = document.getElementById('activities-grid');
    const pillsContainer = document.getElementById('category-pills');
    const searchInput = document.getElementById('search-input');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    const modal = document.getElementById('activity-modal');
    const modalContent = document.getElementById('modal-content-body');
    const modalCategoryBadge = document.getElementById('modal-category-badge');

    function renderPills() {
      pillsContainer.innerHTML = '';
      categories.forEach(cat => {
        const count = cat === '全部' ? activities.length : activities.filter(a => a.category === cat).length;
        const btn = document.createElement('button');
        btn.className = 'shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ' +
          (currentCategory === cat ? 'bg-[#1F2421] text-white shadow-xs' : 'bg-white text-[#524B42] border border-[#E2DDD5] hover:bg-[#F3EFEA]');
        btn.innerHTML = cat + ' <span class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/10">' + count + '</span>';
        btn.onclick = () => {
          currentCategory = cat;
          renderPills();
          applyFilters();
        };
        pillsContainer.appendChild(btn);
      });
    }

    function applyFilters() {
      const filtered = activities.filter(act => {
        if (currentCategory !== '全部' && act.category !== currentCategory) return false;
        if (selectedGroupSize !== 'all' && act.groupSize !== selectedGroupSize) return false;
        if (selectedIntensity !== 'all' && act.intensity !== selectedIntensity) return false;
        if (selectedDepth !== 'all' && act.depth !== selectedDepth) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const inTitle = act.title.toLowerCase().includes(q);
          const inSummary = act.summary.toLowerCase().includes(q);
          const inCat = act.category.toLowerCase().includes(q);
          const inMat = act.materials.some(m => m.toLowerCase().includes(q));
          const inAb = act.abilities.some(a => a.toLowerCase().includes(q));
          if (!inTitle && !inSummary && !inCat && !inMat && !inAb) return false;
        }
        return true;
      });

      resultsCount.textContent = filtered.length;
      grid.innerHTML = '';

      if (filtered.length === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
        filtered.forEach(act => {
          const card = document.createElement('article');
          card.className = 'card-lift bg-white rounded-2xl border border-[#EAE6DF] overflow-hidden cursor-pointer flex flex-col justify-between';
          card.onclick = () => openModal(act);

          card.innerHTML = \`
            <div class="relative w-full aspect-16/10 bg-[#EFECE6] overflow-hidden">
              <img src="\${act.coverImage}" alt="\${act.title}" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#1F2421]">
                \${act.category}
              </span>
              <span class="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md text-[11px] font-medium bg-black/40 text-white">
                \${act.intensity}・\${act.depth}
              </span>
              <span class="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md text-[11px] bg-black/40 text-white">
                👥 \${act.groupSize}
              </span>
            </div>

            <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div class="space-y-1.5">
                <h3 class="font-serif font-bold text-base sm:text-lg text-[#1F2421] hover:text-[#C85A3E] transition-colors">
                  \${act.title}
                </h3>
                <p class="text-xs sm:text-sm text-[#5C554B] line-clamp-2 leading-relaxed">
                  \${act.summary}
                </p>
              </div>

              <div class="flex flex-wrap gap-1">
                \${act.abilities.slice(0, 3).map(a => '<span class="px-2 py-0.5 rounded text-[10px] bg-[#F4F0E8] text-[#4A443B]">#' + a + '</span>').join('')}
              </div>

              <div class="pt-3 border-t border-[#F0ECE4] flex items-center justify-between text-xs text-[#7A7368]">
                <span>⏱️ \${act.duration}</span>
                <span>👥 \${act.groupSize}</span>
              </div>
            </div>
          \`;

          grid.appendChild(card);
        });
      }
    }

    function openModal(act) {
      modalCategoryBadge.textContent = act.category;

      const stepsHtml = act.steps.map(s => \`
        <div class="p-4 rounded-xl bg-white border border-[#EAE6DF] space-y-1.5 shadow-2xs">
          <div class="flex items-center justify-between font-bold text-sm text-[#1F2421]">
            <span>\${s.stepNumber}. \${s.title}</span>
            <span class="text-xs text-[#7A7368] font-normal">\${s.duration || ''}</span>
          </div>
          <p class="text-xs sm:text-sm text-[#4D453A] leading-relaxed sm:leading-6">\${s.description}</p>
        </div>
      \`).join('');

      const tipsHtml = act.tips.map(t => '<li>' + t + '</li>').join('');
      const qHtml = (act.reflectionQuestions || []).map(q => '<li class="bg-white/70 p-2.5 rounded-lg border border-[#D1E0D5]/50">' + q + '</li>').join('');

      modalContent.innerHTML = \`
        <div class="relative w-full h-48 sm:h-56 bg-[#E2DDD5] overflow-hidden">
          <img src="\${act.coverImage}" alt="\${act.title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/30 to-black/30"></div>
          <div class="absolute bottom-3 left-6">
            <h2 class="font-serif font-bold text-2xl text-[#1F2421]">\${act.title}</h2>
          </div>
        </div>

        <div class="p-6 space-y-5">
          <p class="italic text-sm text-[#3E3830] bg-[#F4F0E8] p-3 rounded-xl border border-[#EAE6DF]">
            “\${act.summary}”
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-white border border-[#E8E4DC] text-xs">
            <div>⏱️ 時間：<strong>\${act.duration}</strong></div>
            <div>👥 人數：<strong>\${act.groupSize}</strong></div>
            <div>🔥 強度：<strong>\${act.intensity}</strong></div>
            <div>🎯 深度：<strong>\${act.depth}</strong></div>
          </div>

          <div>
            <div class="text-xs font-bold text-[#7A7368] mb-1.5">📦 建議材料與道具：</div>
            <div class="flex flex-wrap gap-1.5">
              \${act.materials.map(m => '<span class="px-2.5 py-1 rounded-lg bg-white border border-[#E2DDD5] text-xs">' + m + '</span>').join('')}
            </div>
          </div>

          <div class="space-y-2.5">
            <div class="font-serif font-bold text-sm text-[#1F2421]">✨ 引導步驟 (Step-by-Step)</div>
            <div class="space-y-3.5">\${stepsHtml}</div>
          </div>

          \${act.tips.length > 0 ? \`
            <div class="p-4 rounded-xl bg-[#FDF6E9] border border-[#F4E1BA] space-y-1.5 text-xs sm:text-sm">
              <div class="font-bold text-[#A07026]">💡 帶領者心法秘訣</div>
              <ul class="list-disc pl-5 space-y-1 text-[#5C4827]">\${tipsHtml}</ul>
            </div>
          \` : ''}

          \${act.reflectionQuestions && act.reflectionQuestions.length > 0 ? \`
            <div class="p-4 rounded-xl bg-[#EEF3EF] border border-[#D1E0D5] space-y-1.5 text-xs sm:text-sm">
              <div class="font-bold text-[#3E5C46]">❓ 反思提問引導 (ORID / 焦點解決)</div>
              <ul class="space-y-1.5 text-[#2A4432]">\${qHtml}</ul>
            </div>
          \` : ''}
        </div>
      \`;

      modal.classList.remove('hidden');
    }

    function copyText(str, btn) {
      navigator.clipboard.writeText(str);
      const original = btn.textContent;
      btn.textContent = '已複製✓';
      setTimeout(() => btn.textContent = original, 1500);
    }

    function pickRandomActivity() {
      switchView('activities');
      const random = activities[Math.floor(Math.random() * activities.length)];
      openModal(random);
    }

    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      applyFilters();
    };

    document.getElementById('filter-groupsize').onchange = (e) => {
      selectedGroupSize = e.target.value;
      applyFilters();
    };
    document.getElementById('filter-intensity').onchange = (e) => {
      selectedIntensity = e.target.value;
      applyFilters();
    };
    document.getElementById('filter-depth').onchange = (e) => {
      selectedDepth = e.target.value;
      applyFilters();
    };

    document.getElementById('btn-reset-filters').onclick = () => {
      currentCategory = '全部';
      searchQuery = '';
      selectedGroupSize = 'all';
      selectedIntensity = 'all';
      selectedDepth = 'all';
      searchInput.value = '';
      document.getElementById('filter-groupsize').value = 'all';
      document.getElementById('filter-intensity').value = 'all';
      document.getElementById('filter-depth').value = 'all';
      renderPills();
      applyFilters();
    };

    document.getElementById('btn-close-modal').onclick = () => modal.classList.add('hidden');
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    };

    window.onkeydown = (e) => {
      if (e.key === 'Escape') modal.classList.add('hidden');
    };

    renderInquiry();
    renderMaterials();
    renderPills();
    applyFilters();
  </script>
</body>
</html>`;
}
