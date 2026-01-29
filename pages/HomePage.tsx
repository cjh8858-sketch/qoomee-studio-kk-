
import React from 'react';
import Hero from '../components/Hero';
import PortfolioSection from '../components/PortfolioSection';
import ContactSection from '../components/ContactSection';
import { useAppContext } from '../context/AppContext';

const Services: React.FC = () => {
  const items = [
    {
      title: 'Cinematic Video',
      desc: '제품의 가치를 15초 만에 각인시키는 감각적인 광고 영상 제작.',
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
    },
    {
      title: 'Premium Detail Page',
      desc: '고객의 시선을 고정시키고 구매로 전환시키는 압도적인 상세페이지 디자인.',
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    },
    {
      title: 'Brand Concept',
      desc: '브랜드 고유의 아이덴티티를 확립하는 시각 언어 개발 및 컨설팅.',
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    }
  ];

  return (
    <section id="services" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-yellow-400 font-bold tracking-widest text-sm uppercase mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">SERVICES</h2>
          <div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="p-10 bg-white/5 rounded-3xl border border-white/10 hover:border-yellow-400/50 transition-all group">
              <div className="text-yellow-400 mb-8 group-hover:scale-110 transition-transform origin-left">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StudioFeed: React.FC = () => {
  const { settings } = useAppContext();
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
          <div>
            <span className="text-yellow-400 font-bold tracking-widest text-sm uppercase mb-2 block">Instagram</span>
            <h2 className="text-4xl md:text-5xl font-black">STUDIO FEED</h2>
          </div>
          <a 
            href={settings.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-yellow-400 transition-colors font-bold"
          >
            <span>@qoomee_studio 팔로우</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {settings.instagramEmbeds.map((embed, idx) => (
            <div key={idx} className="flex justify-center" dangerouslySetInnerHTML={{ __html: embed }} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StudioLog: React.FC = () => {
  const threadsUrl = "https://www.threads.net/@qoomee_studio";

  return (
    <section className="py-32 bg-neutral-950 relative overflow-hidden">
      {/* Decorative background elements for premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-14">
          <span className="text-yellow-400 font-bold tracking-widest text-xs md:text-sm uppercase mb-4 block animate-pulse">Follow Our Daily Log</span>
          <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">
            THREADS <br className="md:hidden" /> STUDIO LOG
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed px-4">
            꾸미스튜디오의 실시간 작업 비하인드와 일상적인 기록들은 <br className="hidden md:block" />
            스레드(Threads)에서 가장 빠르게 만나보실 수 있습니다.
          </p>
        </div>

        <div className="flex justify-center px-4">
          <a 
            href={threadsUrl} 
            target="_blank" 
            rel="noreferrer"
            className="group relative inline-flex items-center gap-4 px-10 md:px-14 py-5 md:py-6 bg-yellow-400 text-black rounded-full hover:scale-105 active:scale-95 transition-all font-black text-lg md:text-2xl shadow-[0_20px_50px_rgba(255,215,0,0.2)]"
          >
            <span className="relative z-10">THREADS 프로필 방문</span>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-yellow-400 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-yellow-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </a>
        </div>
        
        <div className="mt-12 text-white/20 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
          Join the conversation @qoomee_studio
        </div>
      </div>
    </section>
  );
};

const VideoChannel: React.FC = () => {
  const channelUrl = "https://youtube.com/channel/UCqnLfdsDcs7k_Z-ypcIl_hw";
  
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="text-center mb-16 max-w-2xl">
          <span className="text-yellow-400 font-bold tracking-widest text-sm uppercase mb-3 block">Featured Channel</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Our Studio Work</h2>
        </div>

        <a 
          href={channelUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full max-w-[960px] aspect-video rounded-[40px] bg-neutral-900 border border-white/5 flex flex-col items-center justify-center p-12 text-center group relative overflow-hidden transition-all duration-500 hover:border-yellow-400/30 hover:shadow-[0_0_80px_rgba(255,215,0,0.1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-24 h-24 mb-10 text-red-600 transition-transform duration-500 group-hover:scale-110 relative z-10">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-4 group-hover:text-yellow-400 transition-colors">꾸미스튜디오 YouTube</h3>
            <p className="text-white/50 text-lg md:text-xl font-light mb-8 max-w-lg mx-auto leading-relaxed">
              제품·행사 홍보 영상 / 쇼츠·릴스 제작 사례 보기
            </p>
            <div className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full group-hover:bg-yellow-400 group-hover:text-black group-hover:border-yellow-400 transition-all font-bold">
              <span>채널 바로가기</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

const Process: React.FC = () => {
  const steps = [
    { num: '01', title: '컨설팅 & 기획', desc: '브랜드 가치를 분석하고 최적의 연출 방향을 설정합니다.' },
    { num: '02', title: '촬영 & 디자인', desc: '고퀄리티 장비와 전문 인력이 완성도 높은 소스를 제작합니다.' },
    { num: '03', title: '편집 & 피드백', desc: '세밀한 후반 작업을 거쳐 최상의 결과물을 도출합니다.' },
    { num: '04', title: '최종 납품', desc: '플랫폼 최적화 규격에 맞춰 최종 파일을 전달합니다.' }
  ];

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-20 text-center uppercase tracking-tighter">WORK PROCESS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-8 border border-white/10 rounded-2xl group hover:bg-white/5 transition-all">
              <span className="absolute -top-6 left-8 text-6xl font-black text-white/5 group-hover:text-yellow-400/10 transition-colors">{step.num}</span>
              <h3 className="text-xl font-bold mb-4 relative z-10">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed relative z-10">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Services />
      <PortfolioSection />
      <StudioFeed />
      <VideoChannel />
      <StudioLog />
      <Process />
      <ContactSection />
    </div>
  );
};

export default HomePage;
