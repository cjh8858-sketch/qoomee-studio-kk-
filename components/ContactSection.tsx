
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const ContactSection: React.FC = () => {
  const { settings } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '둘 다 (영상 + 상세페이지)',
    budget: '',
    deadline: '',
    message: '',
    honeypot: '' // Spam protection (Honeypot)
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Honeypot check: If the hidden field is filled, it's likely a bot.
    if (formData.honeypot) {
      console.warn("Spam detected.");
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    // 2. Web3Forms Configuration
    const accessKey = "4ecfa2ed-c859-4058-8eb5-fa5d021c31af"; 
    const recipientEmail = "cjh8858@gmail.com";

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          to: recipientEmail,
          subject: "[꾸미스튜디오] 상담 예약 문의",
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
          // Extra requested fields
          budget: formData.budget || '미지정',
          deadline: formData.deadline || '미지정',
          service_type: formData.serviceType,
          // Helper for Web3Forms to show correct labels in email
          _message: `성함/업체명: ${formData.name}\n이메일: ${formData.email}\n서비스: ${formData.serviceType}\n예산: ${formData.budget || '미지정'}\n마감일: ${formData.deadline || '미지정'}\n문의내용: ${formData.message}`
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        // Reset form on success
        setFormData({ 
          name: '', 
          email: '', 
          serviceType: '둘 다 (영상 + 상세페이지)', 
          budget: '', 
          deadline: '', 
          message: '', 
          honeypot: '' 
        });
        // Auto-clear success message after 7 seconds
        setTimeout(() => setStatus('idle'), 7000);
      } else {
        throw new Error(result.message || '전송 실패');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
      // Auto-clear error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Visual background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          
          <div className="lg:sticky lg:top-32">
            <span className="text-yellow-400 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Let's Work Together</span>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter">
              함께 빛나는 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">프로젝트</span>를 <br />
              만듭니다
            </h2>
            <p className="text-white/50 text-lg md:text-xl mb-12 max-w-md leading-relaxed font-light">
              브랜드의 가치를 시각적으로 증명할 준비가 되셨나요? <br />
              지금 바로 문의를 남겨주세요. 24시간 내 답변드립니다.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Direct Call</p>
                  <p className="text-xl font-bold">010-3321-8330</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Inquiry Email</p>
                  <p className="text-xl font-bold">{settings.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-400/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <form onSubmit={handleSubmit} className="relative bg-black border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl space-y-7">
              {/* Honeypot Field for Spam Protection */}
              <input 
                type="text" 
                name="honeypot" 
                style={{ display: 'none' }} 
                value={formData.honeypot} 
                onChange={e => setFormData({...formData, honeypot: e.target.value})} 
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/40 ml-1">성함 / 업체명 *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="예: 꾸미주식회사 홍길동"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-yellow-400 transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/40 ml-1">이메일 주소 *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="example@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-yellow-400 transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/40 ml-1">원하는 서비스 *</label>
                <div className="relative">
                  <select 
                    value={formData.serviceType}
                    onChange={e => setFormData({...formData, serviceType: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-yellow-400 text-white appearance-none cursor-pointer"
                  >
                    <option className="bg-neutral-900" value="제품 홍보 영상">제품 홍보 영상</option>
                    <option className="bg-neutral-900" value="상세페이지 디자인">상세페이지 디자인</option>
                    <option className="bg-neutral-900" value="둘 다 (영상 + 상세페이지)">둘 다 (영상 + 상세페이지)</option>
                    <option className="bg-neutral-900" value="브랜드 컨설팅">브랜드 컨설팅</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/40 ml-1">예산 (선택)</label>
                  <input 
                    type="text" 
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                    placeholder="예: 500만원 내외"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-yellow-400 transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/40 ml-1">희망 마감일 (선택)</label>
                  <input 
                    type="text" 
                    value={formData.deadline}
                    onChange={e => setFormData({...formData, deadline: e.target.value})}
                    placeholder="예: 12월 말까지"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-yellow-400 transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/40 ml-1">상세 문의 내용 *</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="프로젝트의 목적과 참고할만한 레퍼런스를 적어주시면 더욱 정확한 상담이 가능합니다."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-yellow-400 transition-all resize-none placeholder:text-white/20"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 bg-yellow-400 text-black font-black rounded-2xl transition-all text-xl shadow-[0_15px_30px_rgba(255,215,0,0.2)] active:scale-95 flex items-center justify-center gap-3 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-300'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>전송 중...</span>
                  </>
                ) : '상담 예약하기'}
              </button>

              {/* Status Notifications */}
              {status === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center animate-in fade-in zoom-in duration-300">
                  <p className="text-green-400 font-bold leading-relaxed">✨ 접수 완료! <br className="md:hidden" /> 입력하신 이메일로 확인 메일이 발송되었습니다.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center animate-in fade-in zoom-in duration-300">
                  <p className="text-red-400 font-bold">❌ 전송 실패. <br className="md:hidden" /> 잠시 후 다시 시도해주세요.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
