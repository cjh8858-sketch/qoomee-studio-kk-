
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { useAppContext } from '../context/AppContext';

const ChatAssistant: React.FC = () => {
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
    - 말투는 짧고 따뜻하며, 감각적인 소규모 스튜디오 사장님처럼 친근하게 말하세요.
    - 의뢰 관련 질문이 나오면 작업 종류(영상/상세페이지), 예산, 일정 등을 순차적으로 물어보세요.
    - 한국어만 사용합니다.
  `;

  useEffect(() => {
    const initChat = async () => {
      try {
        // process.env에 안전하게 접근 (브라우저 환경 고려)
        let apiKey: string | undefined;
        try {
          apiKey = process.env.API_KEY;
        } catch (e) {
          apiKey = undefined;
        }

        if (!apiKey) {
          console.log("Chat Assistant: API Key not found. Running in offline mode.");
          return;
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });
        const chat = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: { systemInstruction },
        });
        setChatSession(chat);
      } catch (err) {
        console.error("Chat Init Error:", err);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    if (!chatSession) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: "현재 상담 연결이 지연되고 있습니다. 하단의 '상담 예약하기' 버튼을 이용해주시면 감사하겠습니다! 🙏" }]);
      }, 1000);
      return;
    }

    setIsLoading(true);
    try {
      const response: GenerateContentResponse = await chatSession.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "죄송해요, 잠시 응답이 늦어졌네요. 다시 말씀해주실래요?" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "앗, 통신이 잠시 불안정하네요. 다시 한 번 말씀 부탁드려요!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[360px] md:w-[420px] h-[550px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-yellow-400/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black">KK</div>
              <div>
                <h3 className="text-sm font-bold">상담 매니저</h3>
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div><span className="text-[10px] text-white/40">온라인</span></div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-yellow-400 text-black font-bold' : 'bg-white/5 border border-white/10 text-white/90'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="메시지를 입력하세요..." className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-all" />
            <button type="submit" className="bg-yellow-400 text-black w-12 h-12 flex items-center justify-center rounded-xl hover:bg-yellow-300 transition-all"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
          </form>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-yellow-400 text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
        {isOpen ? <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
      </button>
    </div>
  );
};

export default ChatAssistant;
