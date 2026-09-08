import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertCircle, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { AppView } from '../types';

interface ContactPageProps {
  onBackToHome: () => void;
  onNavigate?: (view: AppView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('教案交流與回饋');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const recipientEmail = 'yitingchou0529@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDirectMailto = () => {
    const mailSubject = encodeURIComponent(`【玩藝所】${subject || '交流與回饋'}`);
    const mailBody = encodeURIComponent(
      `您好，我是 ${name || '訪客'}：\n\n${message || '（請在此輸入您想交流的內容）'}\n\n聯絡信箱：${email || '未填寫'}`
    );
    window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('請填寫完整稱呼、Email 與訊息內容');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `【玩藝所聯絡表單】${subject} - ${name}`,
          姓名或稱呼: name,
          回信電子郵件: email,
          主題分類: subject,
          詳細留言內容: message,
          _template: 'table'
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || '寄送服務暫時無法回應');
      }
    } catch (err: any) {
      console.warn('Form submit fallback:', err);
      // 若受網路環境或擋廣告外掛阻擋，給予友善提示與 mailto 備選
      setStatus('error');
      setErrorMessage(
        err?.message || '系統連線異常，您也可以點擊下方「開啟郵件軟體寄信」或直接寄件給我們！'
      );
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('教案交流與回饋');
    setMessage('');
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="space-y-6 sm:space-y-8 py-4 sm:py-6 max-w-4xl mx-auto">
      
      {/* 頂部導航 */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5C554B] hover:text-[#1F2421] transition-colors group w-fit cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-[#E2DDD5] flex items-center justify-center group-hover:-translate-x-0.5 transition-transform shadow-2xs">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span>返回首頁</span>
      </button>

      {/* 主標題區塊 */}
      <div className="rounded-3xl p-7 sm:p-9 bg-white border border-[#E8E4DC] shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#FDF0ED] text-[#C85A3E] border border-[#F4D0C7]">
          <Mail className="w-3.5 h-3.5" />
          <span>聯絡作者與交流</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#1F2421]">
          聯絡我們
        </h2>
        <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed max-w-2xl">
          無論是教案設計探討、團體帶領實務交流，或是平台使用上的任何回饋，都十分歡迎您填寫表單或直接寄信交流。
        </p>
      </div>

      {/* 雙欄主內容 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 左側：聯絡資訊與說明 */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* 信箱資訊卡片 */}
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-[#1F2421] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>電子郵件信箱</span>
            </h3>
            
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-1">
              <span className="text-[11px] text-[#8A847A] font-medium block">作者信箱</span>
              <p className="text-xs sm:text-sm font-mono font-medium text-[#1F2421] break-all select-all">
                {recipientEmail}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#5C554B] hover:text-[#1F2421] border border-[#E2DDD5] transition-colors cursor-pointer active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">已複製信箱！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8A847A]" />
                    <span>複製電子郵件</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDirectMailto}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#5C554B] hover:text-[#1F2421] border border-[#E2DDD5] transition-colors cursor-pointer active:scale-[0.98]"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#8A847A]" />
                <span>以本機郵件軟體開啟</span>
              </button>
            </div>
          </div>

        </div>

        {/* 右側：在線填寫表單 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-[#E8E4DC] p-6 sm:p-8 shadow-xs">
            
            {status === 'success' ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-[#1F2421]">
                    訊息已成功送出！
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C554B] max-w-md mx-auto">
                    感謝您的來信，內容已送達 <strong>{recipientEmail}</strong>，我們將儘速與您聯繫。
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-medium hover:bg-[#343D36] transition-colors cursor-pointer"
                  >
                    <span>再填寫一封訊息</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="border-b border-[#F0ECE6] pb-3">
                  <h3 className="font-serif font-bold text-lg text-[#1F2421]">
                    在線傳送訊息
                  </h3>
                  <p className="text-xs text-[#7A7368] mt-0.5">
                    填寫後送出，內容將直接轉寄至作者信箱，無須離開網頁。
                  </p>
                </div>

                {status === 'error' && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">{errorMessage}</p>
                      <button
                        type="button"
                        onClick={handleDirectMailto}
                        className="text-red-700 underline font-semibold hover:text-red-900 cursor-pointer block pt-1"
                      >
                        點此直接開啟郵件軟體寄出 →
                      </button>
                    </div>
                  </div>
                )}

                {/* 姓名與稱呼 */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#1F2421]">
                    您的稱呼 / 服務單位 <span className="text-[#C85A3E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例：林老師 / OO國小輔導室 / 獨立帶領者"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs sm:text-sm text-[#1F2421] placeholder:text-[#A6A096] focus:outline-none focus:border-[#C85A3E] focus:bg-white transition-colors"
                  />
                </div>

                {/* 回信信箱 */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#1F2421]">
                    您的電子信箱 (供我們回覆) <span className="text-[#C85A3E]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="例：your.name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs sm:text-sm text-[#1F2421] placeholder:text-[#A6A096] focus:outline-none focus:border-[#C85A3E] focus:bg-white transition-colors"
                  />
                </div>

                {/* 主旨分類 */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#1F2421]">
                    聯絡主旨
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs sm:text-sm text-[#1F2421] focus:outline-none focus:border-[#C85A3E] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="教案交流與回饋">教案交流與回饋</option>
                    <option value="工作坊／培訓合作邀約">工作坊／培訓合作邀約</option>
                    <option value="帶領實務與問句諮詢">帶領實務與問句諮詢</option>
                    <option value="網站功能與錯誤回報">網站功能與錯誤回報</option>
                    <option value="其他交流事項">其他交流事項</option>
                  </select>
                </div>

                {/* 留言內容 */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#1F2421]">
                    留言內容 <span className="text-[#C85A3E]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="請輸入您想分享的心得、欲合作的活動規模、對象或任何想法..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs sm:text-sm text-[#1F2421] placeholder:text-[#A6A096] focus:outline-none focus:border-[#C85A3E] focus:bg-white transition-colors resize-y leading-relaxed"
                  />
                </div>

                {/* 送出按鈕 */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[11px] text-[#8A847A]">
                    🔒 資料僅用於回覆您的來信，絕不用於其他用途。
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1F2421] hover:bg-[#343D36] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>傳送中...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>確認送出訊息</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
