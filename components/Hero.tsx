
import React from 'react';
import { useAppContext } from '../context/AppContext';

const Hero: React.FC = () => {
  const { settings } = useAppContext();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <iframe 
          src='https://my.spline.design/trafficlight-kFzLZuvXUDCkc0zskcTFimdf/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="Spline 3D Element"
          className="scale-110 md:scale-125 lg:scale-100"
        ></iframe>
      </div>

      {/* Content Overlay - Added translate-y to shift content down overall */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto transform translate-y-16 md:translate-y-24 lg:translate-y-32">
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-tight">
          VISUAL <br />
          <span className="text-transparent border-t-0 bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            IMPACT STUDIO
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          꾸미스튜디오는 감각적인 영상미와 전략적인 상세페이지 디자인으로 <br className="hidden md:block" />
          당신의 제품이 시장에서 가장 밝게 빛나도록 만듭니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#portfolio" 
            className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:scale-105 transition-transform text-lg shadow-[0_0_30px_rgba(255,215,0,0.3)]"
          >
            포트폴리오 보기
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all text-lg"
          >
            무료 상담 신청
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
