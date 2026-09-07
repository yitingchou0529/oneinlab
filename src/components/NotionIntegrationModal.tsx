import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Copy, 
  Check, 
  Code2, 
  Download, 
  Upload, 
  FileJson, 
  Layers, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Activity } from '../types';

interface NotionIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: Activity[];
  onImportActivities?: (imported: Activity[]) => void;
  onDownloadSingleFile: () => void;
}

export const NotionIntegrationModal: React.FC<NotionIntegrationModalProps> = ({
  isOpen,
  onClose,
  activities,
  onImportActivities,
  onDownloadSingleFile,
}) => {
  const [activeTab, setActiveTab] = useState<'mapping' | 'api' | 'json'>('mapping');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(activities, null, 2);

  // 複製 JSON
  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // 下載 JSON 檔案
  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activities-notion-schema-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 匯入自訂 JSON
  const handleApplyImport = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importJsonText);
      if (!Array.isArray(parsed)) {
        throw new Error('匯入格式必須是活動物件的陣列 [ { ... } ]');
      }
      if (parsed.length === 0) {
        throw new Error('活動陣列不可為空');
      }
      if (!parsed[0].title || !parsed[0].category) {
        throw new Error('資料缺少必填欄位 (title, category)');
      }

      if (onImportActivities) {
        onImportActivities(parsed as Activity[]);
        setImportSuccess(true);
        setTimeout(() => {
          setImportSuccess(false);
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      setImportError(err.message || 'JSON 解析失敗，請確認語法是否正確');
    }
  };

  // Notion API 串接程式碼範例
  const notionApiSnippet = `// 範例：使用 Notion 官方 SDK (@notionhq/client) 串接你的活動資料庫
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function fetchActivitiesFromNotion() {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ property: "活動名稱", direction: "ascending" }],
  });

  return response.results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      title: props["活動名稱"]?.title?.[0]?.plain_text || "未命名活動",
      summary: props["一句話亮點"]?.rich_text?.[0]?.plain_text || "",
      category: props["分類"]?.select?.name || "破冰",
      targetAudience: props["已帶領過團體性質"]?.multi_select?.map((x: any) => x.name) || [],
      groupSize: props["建議人數"]?.select?.name || props["建議人數"]?.rich_text?.[0]?.plain_text || "5人以上",
      nature: props["性質"]?.multi_select?.map((x: any) => x.name) || [],
      intensity: props["活動強度"]?.select?.name || "中強度",
      depth: props["深度"]?.select?.name || "適中",
      abilities: props["能力"]?.multi_select?.map((x: any) => x.name) || [],
      duration: "15-25 分鐘",
      materials: props["道具"]?.multi_select?.map((x: any) => x.name) || ["無道具"],
      coverImage: page.cover?.external?.url || page.cover?.file?.url || "https://images.unsplash.com/...",
      steps: [],
      tips: []
    };
  });
}`;

  const handleCopyApiSnippet = () => {
    navigator.clipboard.writeText(notionApiSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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
            <div className="w-10 h-10 rounded-xl bg-[#EEF3EF] text-[#4D6A56] flex items-center justify-center border border-[#D1E0D5]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1F2421]">
                Notion Database 整合架構與 API 介面
              </h3>
              <p className="text-xs text-[#7A7368]">
                已完整對齊你的 Notion 教案庫 30 個活動、分類、強度、深度與能力屬性
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
            onClick={() => setActiveTab('mapping')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'mapping'
                ? 'border-[#1F2421] text-[#1F2421] bg-[#FAF8F5]'
                : 'border-transparent text-[#736E65] hover:text-[#1F2421]'
            }`}
          >
            1. Notion 欄位屬性對照表
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'api'
                ? 'border-[#1F2421] text-[#1F2421] bg-[#FAF8F5]'
                : 'border-transparent text-[#736E65] hover:text-[#1F2421]'
            }`}
          >
            2. Notion API 串接程式碼範例
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'json'
                ? 'border-[#1F2421] text-[#1F2421] bg-[#FAF8F5]'
                : 'border-transparent text-[#736E65] hover:text-[#1F2421]'
            }`}
          >
            3. JSON 資料匯入／匯出
          </button>
        </div>

        {/* 內容區 */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Tab 1: 欄位屬性對照 */}
          {activeTab === 'mapping' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-[#EEF3EF] border border-[#D1E0D5] rounded-xl text-xs text-[#3E5C46] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  已為你精準對照 Notion 匯出之 <code>活動資料庫.csv</code> 欄位。本前端展示網站已直接載入你所設計的 30 個活動！
                </p>
              </div>

              <div className="border border-[#E2DDD5] rounded-xl overflow-hidden bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F6F3ED] text-[#5C554B] font-semibold border-b border-[#E2DDD5]">
                    <tr>
                      <th className="py-2.5 px-4">Notion 欄位名稱</th>
                      <th className="py-2.5 px-4">前端 JSON Key</th>
                      <th className="py-2.5 px-4">Notion 類型</th>
                      <th className="py-2.5 px-4">你的資料庫實例值</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEBE3] text-[#332E27]">
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-[#1F2421]">活動名稱</td>
                      <td className="py-2.5 px-4 font-mono text-[#C85A3E]">title</td>
                      <td className="py-2.5 px-4 text-[#7A7368]">Title</td>
                      <td className="py-2.5 px-4">人體結、兩真一假、箭與靶</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-[#1F2421]">一句話亮點</td>
                      <td className="py-2.5 px-4 font-mono text-[#C85A3E]">summary</td>
                      <td className="py-2.5 px-4 text-[#7A7368]">Rich Text</td>
                      <td className="py-2.5 px-4">「自我揭露快速拉近關係」</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-[#1F2421]">分類</td>
                      <td className="py-2.5 px-4 font-mono text-[#C85A3E]">category</td>
                      <td className="py-2.5 px-4 text-[#7A7368]">Select</td>
                      <td className="py-2.5 px-4 font-medium text-[#4D6A56]">破冰、暖身、合作、藝術、競賽、模擬體驗</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-[#1F2421]">已帶領過團體性質</td>
                      <td className="py-2.5 px-4 font-mono text-[#C85A3E]">targetAudience</td>
                      <td className="py-2.5 px-4 text-[#7A7368]">Multi-select</td>
                      <td className="py-2.5 px-4">兒童, 青少年, 成人</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-[#1F2421]">建議人數</td>
                      <td className="py-2.5 px-4 font-mono text-[#C85A3E]">groupSize</td>
                      <td className="py-2.5 px-4 text-[#7A7368]">Select</td>
                      <td className="py-2.5 px-4">個人, 2~5人, 5人以上</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-[#1F2421]">性質</td>
                      <td className="py-2.5 px-4 font-mono text-[#C85A3E]">nature</td>
                      <td className="py-2.5 px-4 text-[#7A7368]">Multi-select</td>
                      <td className="py-2.5 px-4">動態, 談話性, 表達性, 合作性, 支持性, 復原力</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-[#1F2421]">活動強度</td>
                      <td className="py-2.5 px-4 font-mono text-[#C85A3E]">intensity</td>
                      <td className="py-2.5 px-4 text-[#7A7368]">Select</td>
                      <td className="py-2.5 px-4">低強度, 中強度, 高強度</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-[#1F2421]">深度</td>
                      <td className="py-2.5 px-4 font-mono text-[#C85A3E]">depth</td>
                      <td className="py-2.5 px-4 text-[#7A7368]">Select</td>
                      <td className="py-2.5 px-4">較淺, 適中, 較深入</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-[#1F2421]">能力</td>
                      <td className="py-2.5 px-4 font-mono text-[#C85A3E]">abilities</td>
                      <td className="py-2.5 px-4 text-[#7A7368]">Multi-select</td>
                      <td className="py-2.5 px-4">創意, 反應力, 合作, 溝通, 肢體, 自我覺察</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: API 串接程式碼 */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5C554B]">
                  Node.js / Express 後端自動同步腳本範例：
                </span>
                <button
                  onClick={handleCopyApiSnippet}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-white border border-[#E2DDD5] hover:bg-[#F3EFEA] text-[#1F2421] transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? '已複製程式碼' : '複製程式碼'}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-[#1E1E1E] text-neutral-200 p-4 font-mono text-xs leading-relaxed max-h-96 overflow-y-auto">
                <pre>{notionApiSnippet}</pre>
              </div>
            </div>
          )}

          {/* Tab 3: JSON 匯出入 */}
          {activeTab === 'json' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#1F2421]">當前 30 項活動完整 JSON 資料</h4>
                  <p className="text-xs text-[#7A7368]">可直接下載或複製，用於備份或遷移至其他系統</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2DDD5] bg-white hover:bg-[#F3EFEA] text-xs font-medium text-[#1F2421]"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? '已複製' : '複製 JSON'}</span>
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F2421] text-white text-xs font-medium hover:bg-[#343B37]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>下載 .json</span>
                  </button>
                </div>
              </div>

              {/* 匯入區塊 */}
              <div className="p-4 rounded-xl bg-white border border-[#EAE6DF] space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#4D6A56]" />
                  <span className="text-xs sm:text-sm font-bold text-[#1F2421]">貼上自訂 JSON 覆寫活動資料</span>
                </div>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder='貼上符合格式的活動陣列，如：[ { "id": "act-01", "title": "...", "category": "破冰" } ]'
                  className="w-full p-3 font-mono text-xs rounded-lg border border-[#E2DDD5] bg-[#FAF8F5] text-[#1F2421] focus:outline-hidden focus:ring-1 focus:ring-[#E07A5F]"
                />
                {importError && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{importError}</span>
                  </div>
                )}
                {importSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>匯入成功！即將套用變更...</span>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={handleApplyImport}
                    disabled={!importJsonText.trim()}
                    className="px-4 py-2 rounded-lg bg-[#4D6A56] hover:bg-[#3E5C46] disabled:opacity-40 text-white text-xs font-medium transition-colors"
                  >
                    套用並更新資料庫
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* 底部按鈕 */}
        <div className="px-6 py-4 bg-white border-t border-[#EAE6DF] flex items-center justify-between">
          <button
            onClick={onDownloadSingleFile}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C85A3E] hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>匯出單一離線 HTML 檔案</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1F2421] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#343B37]"
          >
            關閉說明
          </button>
        </div>

      </div>
    </div>
  );
};
