
import React from 'react';
import { useAppContext } from '../context/AppContext';

const Footer: React.FC = () => {
  const { settings } = useAppContext();

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-black tracking-tighter mb-4 inline-flex items-center gap-2">
              <span className="text-black bg-[#FFD700] px-2 py-0.5 rounded">KK</span>
              <span style={{ color: settings.accentColor }}>{settings.siteName.toUpperCase()}</span>
            </div>
            <p className="text-white/40 text-sm max-w-sm">
              우리는 제품의 본질을 꿰뚫는 비주얼로 시장의 판도를 바꾸는 <br />
              크리에이티브 에이전시 꾸미스튜디오입니다.
            </p>
          </div>

          <div className="flex gap-4">
            <a 
              href={settings.instagramUrl} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a 
              href={settings.youtubeUrl} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-white/30 gap-4">
          <p>© 2024 KK OUMI STUDIO. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
