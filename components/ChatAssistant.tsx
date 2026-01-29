
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { useAppContext } from '../context/AppContext';

const ChatAssistant: React.FC = () => {
  const { settings } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: '반가워요! 꾸미스튜디오입니다. 😊 브랜드에 활력을 불어넣을 준비가 되셨나요? 어떤 점이 궁금하신가요?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemInstruction = `
    당신은 "꾸미스튜디오(Kkoumi Studio)"의 대표이자 상담 매니저입니다.
    
    [성격 및 스타일]
    - 대형 에이전시가 아닌, 감각적인 1인 혹은 소규모 크리에이티브 스튜디오 사장님처럼 말하세요.
    - 말투는 짧고, 따뜻하며, 자신감이 넘쳐야 합니다.
    - 긴 문단은 피하고, 한 번에 하나의 질문만 던지세요.
    - 딱딱한 기업형 극존칭이나 비즈니스 용어보다는 친근하고 전문적인 느낌을 유지하세요.
    - 한국어만 사용합니다.
    - 본인이 AI임을 밝히지 마세요.

    [상담 및 의뢰 로직]
    - 사용자가 "의뢰하고 싶다"거나 "상담받고 싶다"는 의사를 밝히면 반드시 아래 양식으로 답변하세요:
      "감사합니다 😊 어떤 작업이 필요하신가요?
      1) 제품 홍보 영상
      2) 상세페이지 / 스토리
      3) 둘 다
      4) 아직 고민 중"
    - 그 다음 답변을 기다리고, 하나씩 순서대로 '목적 -> 예산 -> 일정 -> 연락처'를 물어보세요.

    [서비스 요약]
    - 제품 홍보 영상: 15초의 마법, 감각적 연출.
    - 상세페이지: 팔리는 스토리와 비주얼.
    - 브랜드 기획: 브랜드의 첫인상을 결정하는 컨설팅.
  `;

  useEffect(() => {
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const chat = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: systemInstruction,
          },
        });
        setChatSession(chat);
      } catch (err) {
        console.error("Chat Init Error:", err);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading || !chatSession) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response: GenerateContentResponse = await chatSession.sendMessage({ message: userMessage });
      const assistantMessage = response.text || "잠시 연결 상태가 고르지 못하네요. 다시 말씀해주실래요?";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "앗, 잠시 오류가 있었나 봐요. 다시 한 번 말씀 부탁드려요!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[360px] md:w-[420px] h-[600px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-yellow-400/20 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black shadow-lg">KK</div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">상담 매니저</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-white/40 font-medium">온라인</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                  ? 'bg-yellow-400 text-black font-semibold rounded-tr-none' 
                  : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-yellow-400/60 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-400/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-400/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="궁금한 점을 물어보세요!"
              className="flex-grow bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400/50 focus:bg-white/15 transition-all text-white placeholder:text-white/20"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-yellow-400 text-black w-12 h-12 flex items-center justify-center rounded-xl hover:bg-yellow-300 disabled:opacity-30 disabled:hover:bg-yellow-400 transition-all shadow-lg active:scale-90"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-yellow-400 text-black rounded-full shadow-[0_10px_30px_rgba(255,215,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group relative"
      >
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse flex items-center justify-center text-[8px] font-bold text-white">1</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChatAssistant;
