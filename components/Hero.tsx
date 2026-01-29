
import React from 'react';
import { useAppContext } from '../context/AppContext';

const Hero: React.FC = () => {
  const { settings } = useAppContext();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Fallback & Decorative Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/5 blur-[150px] rounded-full"></div>
      </div>

      {/* 3D Background - Spline */}
      <div className="absolute inset-0 z-[1] opacity-60 pointer-events-none">
        <iframe 
          src='https://my.spline.design/trafficlight-kFzLZuvXUDCkc0zskcTFimdf/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="Spline 3D Element"
          className="scale-110 md:scale-125 lg:scale-100 object-cover"
        ></iframe>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto transform translate-y-8 md:translate-y-12">
        <div className="inline-block mb-6 px-4 py-1.5 border border-yellow-400/30 rounded-full bg-yellow-400/5 backdrop-blur-sm">
          <span className="text-yellow-400 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">Premium Creative Studio</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] md:leading-[1.05]">
          VISUAL <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
            IMPACT STUDIO
          </span>
        </h1>
        
        <p className="text-base md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          꾸미스튜디오는 감각적인 영상미와 전략적인 디자인으로 <br className="hidden md:block" />
          당신의 브랜드가 시장에서 가장 밝게 빛나도록 만듭니다.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#portfolio" 
            className="w-full sm:w-auto px-10 py-5 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 hover:scale-105 transition-all text-lg shadow-[0_20px_40px_rgba(255,215,0,0.2)]"
          >
            포트폴리오 보기
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 backdrop-blur-md transition-all text-lg"
          >
            무료 상담 신청
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 hidden md:block">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
