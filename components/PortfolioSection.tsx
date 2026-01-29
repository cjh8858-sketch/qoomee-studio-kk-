
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Portfolio } from '../types';

const PortfolioModal: React.FC<{ project: Portfolio; onClose: () => void }> = ({ project, onClose }) => {
  // URL 타입 체크 유틸리티
  const isImageURL = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)(\?.*)?$/i.test(url) || 
           url.includes('images.unsplash.com') || 
           url.includes('i.imgur.com');
  };

  const isInstagramURL = (url: string) => {
    return url.includes('instagram.com') || url.includes('instagr.am');
  };

  const isVideoPlatform = (url: string) => {
    return (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')) && !isInstagramURL(url);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-neutral-900 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Media Section */}
          <div className="lg:col-span-3 bg-black space-y-4 p-2">
            {project.videoUrl && (
              <div className="w-full rounded-3xl overflow-hidden bg-neutral-800">
                {isInstagramURL(project.videoUrl) ? (
                  /* 인스타그램 링크 대응 UI */
                  <div className="relative aspect-video flex flex-col items-center justify-center bg-neutral-900 group">
                    <img 
                      src={project.thumbnail} 
                      className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" 
                      alt="Instagram Preview" 
                    />
                    <div className="relative z-10 text-center px-6">
                      <div className="w-16 h-16 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </div>
                      <h4 className="text-xl font-black mb-2">Instagram Video</h4>
                      <p className="text-white/50 text-sm mb-8 font-light">인스타그램 보안 정책상 외부 앱에서 영상을 직접 재생할 수 없습니다.</p>
                      <a 
                        href={project.videoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-black rounded-full hover:bg-yellow-400 transition-all text-sm uppercase tracking-widest"
                      >
                        포스트 확인하기
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                      </a>
                    </div>
                  </div>
                ) : isVideoPlatform(project.videoUrl) ? (
                  /* 유튜브 등 일반 영상 플랫폼 */
                  <div className="aspect-video">
                    <iframe 
                      className="w-full h-full"
                      src={project.videoUrl.includes('youtube') ? project.videoUrl.replace('watch?v=', 'embed/') : project.videoUrl}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : isImageURL(project.videoUrl) ? (
                  /* 이미지 URL */
                  <img 
                    src={project.videoUrl} 
                    alt={project.title} 
                    className="w-full h-auto block"
                  />
                ) : (
                  /* 기타 URL (기본 iframe 시도) */
                  <div className="aspect-video">
                    <iframe 
                      className="w-full h-full"
                      src={project.videoUrl}
                      title={project.title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            )}
            
            {/* 추가 이미지 갤러리 */}
            {project.images.map((img, idx) => (
              <img key={idx} src={img} alt={`${project.title} ${idx}`} className="w-full rounded-3xl" />
            ))}
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 p-8 md:p-12 lg:sticky lg:top-0 h-fit">
            <span className="text-yellow-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">{project.category}</span>
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">{project.title}</h2>
            <p className="text-white/40 text-sm mb-8 font-medium">Project Date: {project.projectDate}</p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white/20 mb-3">Summary</h4>
                <p className="text-lg font-bold leading-relaxed">{project.summary}</p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white/20 mb-3">Overview</h4>
                <p className="text-white/60 leading-relaxed font-light whitespace-pre-line">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5">
              <a 
                href="#contact" 
                onClick={onClose}
                className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 transition-all text-sm uppercase tracking-widest shadow-[0_15px_30px_rgba(255,215,0,0.15)]"
              >
                상담 예약하기
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection: React.FC = () => {
  const { portfolios } = useAppContext();
  const [filter, setFilter] = useState<'전체' | '제품 홍보 영상' | '행사 영상' | '상세페이지' | '기타'>('전체');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);

  const filteredPortfolios = useMemo(() => {
    return portfolios.filter(p => {
      if (!p.isPublic) return false;
      const matchesFilter = filter === '전체' || p.category === filter;
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                            p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [portfolios, filter, search]);

  const categories: ('전체' | '제품 홍보 영상' | '행사 영상' | '상세페이지' | '기타')[] = ['전체', '제품 홍보 영상', '행사 영상', '상세페이지', '기타'];

  return (
    <section id="portfolio" className="py-24 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-yellow-400 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Selected Works</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4">PORTFOLIO</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              우리가 창조하는 결과물은 단순한 디자인을 넘어 브랜드의 가치를 시각적으로 증명하는 도구가 됩니다.
            </p>
          </div>
          
          <div className="w-full lg:w-auto space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black tracking-widest transition-all uppercase border ${
                    filter === cat 
                    ? 'bg-yellow-400 border-yellow-400 text-black shadow-[0_10px_20px_rgba(255,215,0,0.1)]' 
                    : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search Input */}
            <div className="relative group max-w-sm">
              <input 
                type="text" 
                placeholder="관심 분야나 프로젝트 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-all text-white placeholder:text-white/20"
              />
              <svg className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-400 transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
          {filteredPortfolios.length > 0 ? (
            filteredPortfolios.map((item, index) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedProject(item)}
                className="group cursor-pointer block"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[40px] bg-neutral-900 border border-white/5 mb-8 transition-all duration-500 group-hover:border-yellow-400/50 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 bg-yellow-400 text-black rounded-full flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                       <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                  </div>
                  <div className="absolute top-8 left-8">
                     <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-yellow-400 border border-yellow-400/20">
                      {item.category}
                     </span>
                  </div>
                </div>
                
                <div className="px-2">
                  <h3 className="text-2xl font-black mb-3 group-hover:text-yellow-400 transition-colors tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-lg font-light line-clamp-2 max-w-2xl leading-relaxed mb-6 group-hover:text-white/60 transition-colors">
                    {item.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-40 text-center border-2 border-dashed border-white/5 rounded-[40px]">
              <p className="text-white/20 text-xl font-bold italic tracking-widest">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <PortfolioModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default PortfolioSection;
