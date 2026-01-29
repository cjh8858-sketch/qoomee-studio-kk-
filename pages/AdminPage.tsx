
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Portfolio } from '../types';

const AdminPage: React.FC = () => {
  const { portfolios, settings, addPortfolio, updatePortfolio, deletePortfolio, updateSettings } = useAppContext();
  const [activeTab, setActiveTab] = useState<'list' | 'settings' | 'instagram'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [form, setForm] = useState<Omit<Portfolio, 'id'>>({
    title: '',
    category: '제품 홍보 영상',
    thumbnail: '',
    images: [],
    videoUrl: '',
    summary: '',
    description: '',
    tags: [],
    projectDate: new Date().toISOString().split('T')[0],
    isPublic: true
  });

  const [imageInput, setImageInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const resetForm = () => {
    setForm({ 
      title: '', category: '제품 홍보 영상', thumbnail: '', images: [], 
      videoUrl: '', summary: '', description: '', tags: [], 
      projectDate: new Date().toISOString().split('T')[0], isPublic: true 
    });
    setEditingId(null);
    setImageInput('');
    setTagInput('');
  };

  const handleEdit = (p: Portfolio) => {
    setEditingId(p.id);
    setForm({ ...p });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updatePortfolio({ ...form, id: editingId });
    } else {
      addPortfolio({
        ...form,
        id: Math.random().toString(36).substr(2, 9)
      });
    }
    resetForm();
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setForm({ ...form, images: [...form.images, imageInput.trim()] });
      setImageInput('');
    }
  };

  const removeImage = (idx: number) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (idx: number) => {
    setForm({ ...form, tags: form.tags.filter((_, i) => i !== idx) });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <aside className="lg:w-64 space-y-4">
            <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] px-4 mb-6">Dashboard</h2>
            <button 
              onClick={() => setActiveTab('list')}
              className={`w-full text-left px-6 py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs ${activeTab === 'list' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-white/40 hover:bg-white/5'}`}
            >
              PORTFOLIO MANAGER
            </button>
            <button 
              onClick={() => setActiveTab('instagram')}
              className={`w-full text-left px-6 py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs ${activeTab === 'instagram' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-white/40 hover:bg-white/5'}`}
            >
              INSTA FEED
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-6 py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs ${activeTab === 'settings' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-white/40 hover:bg-white/5'}`}
            >
              SITE IDENTITY
            </button>
          </aside>

          <main className="flex-grow">
            {activeTab === 'list' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="bg-black/40 p-8 md:p-12 rounded-[40px] border border-white/5 shadow-2xl">
                  <h3 className="text-2xl font-black mb-8">{editingId ? '프로젝트 수정' : '새 프로젝트 등록'}</h3>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">프로젝트 제목 *</label>
                        <input 
                          type="text" required value={form.title}
                          onChange={e => setForm({...form, title: e.target.value})}
                          placeholder="프로젝트명을 입력하세요"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">카테고리 *</label>
                        <select 
                          value={form.category}
                          onChange={e => setForm({...form, category: e.target.value as any})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 text-white"
                        >
                          <option value="제품 홍보 영상">제품 홍보 영상</option>
                          <option value="행사 영상">행사 영상</option>
                          <option value="상세페이지">상세페이지</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">썸네일 이미지 URL *</label>
                        <input 
                          type="url" required value={form.thumbnail}
                          onChange={e => setForm({...form, thumbnail: e.target.value})}
                          placeholder="https://..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">영상 임베드/링크 URL (선택)</label>
                        <input 
                          type="url" value={form.videoUrl}
                          onChange={e => setForm({...form, videoUrl: e.target.value})}
                          placeholder="유튜브 또는 인스타 영상 링크"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">작업 갤러리 이미지 추가</label>
                      <div className="flex gap-4">
                        <input 
                          type="url" value={imageInput}
                          onChange={e => setImageInput(e.target.value)}
                          placeholder="이미지 URL 입력"
                          className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                        />
                        <button type="button" onClick={addImage} className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all">추가</button>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-4">
                        {form.images.map((img, idx) => (
                          <div key={idx} className="relative group w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                            <button onClick={() => removeImage(idx)} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">삭제</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">한 줄 요약 *</label>
                      <input 
                        type="text" required value={form.summary}
                        onChange={e => setForm({...form, summary: e.target.value})}
                        placeholder="포트폴리오 카드에 노출될 짧은 설명"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">상세 설명 *</label>
                      <textarea 
                        rows={6} required value={form.description}
                        onChange={e => setForm({...form, description: e.target.value})}
                        placeholder="상세 모달에 노출될 긴 설명 (줄바꿈 가능)"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all resize-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">태그 추가</label>
                        <div className="flex gap-4">
                          <input 
                            type="text" value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            placeholder="엔터 또는 클릭으로 추가"
                            className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                          />
                          <button type="button" onClick={addTag} className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all">추가</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {form.tags.map((tag, idx) => (
                            <span key={idx} className="bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                              #{tag}
                              <button onClick={() => removeTag(idx)} className="text-white/40 hover:text-white">&times;</button>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">작업일</label>
                          <input 
                            type="date" value={form.projectDate}
                            onChange={e => setForm({...form, projectDate: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 text-white"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">공개 여부</label>
                          <button 
                            type="button"
                            onClick={() => setForm({...form, isPublic: !form.isPublic})}
                            className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all ${form.isPublic ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}
                          >
                            {form.isPublic ? 'PUBLIC' : 'PRIVATE'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-8">
                      <button type="submit" className="flex-grow py-5 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 transition-all text-lg shadow-[0_20px_40px_rgba(255,215,0,0.1)]">
                        {editingId ? '프로젝트 수정 완료' : '새 프로젝트 등록하기'}
                      </button>
                      {editingId && (
                        <button type="button" onClick={resetForm} className="px-12 py-5 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
                          취소
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center px-4">
                    <h3 className="text-2xl font-black">등록된 프로젝트 ({portfolios.length})</h3>
                    <p className="text-white/30 text-xs uppercase tracking-widest font-bold">Manage & Edit</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {portfolios.map(p => (
                      <div key={p.id} className="bg-black/40 p-6 rounded-[32px] border border-white/5 flex items-center gap-8 group hover:border-white/20 transition-all">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-800 border border-white/10 shrink-0">
                          <img src={p.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[9px] font-black text-yellow-400 uppercase tracking-widest px-3 py-1 bg-yellow-400/10 rounded-full">{p.category}</span>
                            {!p.isPublic && <span className="text-[9px] font-black text-red-400 uppercase tracking-widest px-3 py-1 bg-red-400/10 rounded-full">PRIVATE</span>}
                          </div>
                          <h4 className="font-black text-xl truncate tracking-tight">{p.title}</h4>
                          <p className="text-white/30 text-xs mt-1 truncate">{p.summary}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-yellow-400 hover:text-black rounded-xl transition-all">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </button>
                          <button onClick={() => deletePortfolio(p.id)} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Keeping existing tabs as they were but styled consistently */}
            {activeTab === 'instagram' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-yellow-400/10 p-10 rounded-[40px] border border-yellow-400/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center font-black">A</div>
                    <h3 className="text-2xl font-black text-yellow-400 tracking-tight">자동 연동 모드</h3>
                  </div>
                  <p className="text-white/60 mb-8 leading-relaxed font-light">
                    외부 위젯 서비스를 활용하여 인스타그램 피드를 실시간으로 연동할 수 있습니다. <br />
                    1. Elfsight 또는 Behold.so에서 인스타그램 위젯을 생성하세요. <br />
                    2. 발급받은 <b>Widget ID</b>를 아래에 입력하세요.
                  </p>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">Instagram Widget ID</label>
                    <input 
                      type="text" 
                      value={settings.instagramWidgetId || ''}
                      onChange={e => updateSettings({...settings, instagramWidgetId: e.target.value})}
                      placeholder="예: 7904b786-82f5-4852-..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-black/40 p-10 rounded-[40px] border border-white/5 space-y-12 animate-in fade-in duration-500">
                <h3 className="text-2xl font-black tracking-tight">사이트 아이덴티티 설정</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">사이트 이름</label>
                    <input 
                      type="text" value={settings.siteName}
                      onChange={e => updateSettings({...settings, siteName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">포인트 컬러</label>
                    <div className="flex gap-4">
                      <input 
                        type="color" value={settings.accentColor}
                        onChange={e => updateSettings({...settings, accentColor: e.target.value})}
                        className="h-14 w-20 bg-transparent cursor-pointer rounded-xl overflow-hidden border border-white/10"
                      />
                      <input 
                        type="text" value={settings.accentColor}
                        onChange={e => updateSettings({...settings, accentColor: e.target.value})}
                        className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
