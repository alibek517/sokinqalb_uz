import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  PhoneCall, 
  Brain, 
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';

export default function AIChatAssistant({ onOpenConsultModal }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Assalomu alaykum! Men Sokin Qalb markazining virtual psixologik yordamchisiman. Sizni qiynayotgan xavotir, uyqusizlik, tana qisilishlari yoki Furqat Bag'ibekovning davolash metodikasi bo'yicha qanday savolingiz bor?",
      time: "Hozir"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Clinical response generator
    setTimeout(() => {
      let botReply = "Savolingiz uchun rahmat. Bag'ibekov Furqatning klinik metodikasiga ko'ra, inson ong ostidagi qisilishlar tana kasalliklarining 80% iga sabab bo'ladi. Xitoy Kapsulaterapiyasi va Fransiya neyro-lampasi orqali bu bloklarni 100% dori-darmonsiz to'liq yechish mumkin.";
      
      const lower = textToSend.toLowerCase();
      if (lower.includes('panik') || lower.includes('vahima') || lower.includes('qorquv')) {
        botReply = "Panik ataka va to'satdan qo'rquv paytida miya amigdala qismi xavf signalini yoqadi. Hozir 4 soniya burundan chuqur nafas oling, 7 soniya ushlab turing va 8 soniya davomida og'izdan sekin chiqaring. Bu Vagus nervini tinchlantiradi. Ildizini davolash uchun esa Furqat Bag'ibekov bilan shaxsiy konsultatsiyaga yozilishni tavsiya qilamiz.";
      } else if (lower.includes('narx') || lower.includes('qancha') || lower.includes('pul') || lower.includes('kurs')) {
        botReply = "Sokin Qalb platformasida 1$ dan 500$ gacha bo'lgan amaliy darsliklar, Xitoy Kapsulasi bilan apparatli seanslar hamda eksklyuziv Tog' Retreatlari mavjud. «Kurslar va Seanslar» bo'limida barcha narxlar bilan tanishishingiz mumkin.";
      } else if (lower.includes('uyqu') || lower.includes('charchoq')) {
        botReply = "Uyqusizlik ko'pincha miya neyronlarining beta-to'lqinda qotib qolishidan yuzaga keladi. Fransiya neyro-lampasi yordamida miyani 15 daqiqada chuqur teta va delta uyqu to'lqinlariga tushirish mumkin.";
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const suggestedQuestions = [
    "Xitoy kapsulasi qanday ishlaydi?",
    "Fransiya neyro-lampasi nima?",
    "Panik ataka va vahimani to'xtatish",
    "Kurslar va seanslar narxi qancha?",
    "Shaxsiy konsultatsiyaga yozilish"
  ];  return (
    <div className="py-8 sm:py-16 max-w-6xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 w-full">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>24/7 Virtual Psixologik Hamroh</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Sokin Qalb AI Psixolog
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
          Furqat Bag'ibekovning klinik metodikasi va tamoyillari asosida real vaqtda maslahat oling
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left: Chat Container */}
        <div className="lg:col-span-8 space-y-4 w-full">
          <div className="glass-panel rounded-2xl sm:rounded-3xl border border-white/[0.08] shadow-2xl flex flex-col h-[520px] sm:h-[580px] overflow-hidden w-full">
            
            {/* Chat Messages Log */}
            <div className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start space-x-2 sm:space-x-3 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                    m.sender === 'user' 
                      ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white' 
                      : 'bg-teal-500/20 border border-teal-500/40 text-teal-300'
                  }`}>
                    {m.sender === 'user' ? <User className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>

                  <div className={`max-w-[85%] rounded-xl sm:rounded-2xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-tr-none shadow-md'
                      : 'glass-card border border-white/[0.08] text-slate-200 rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-wrap">{m.text}</div>
                    <div className={`text-[9px] sm:text-[10px] mt-1.5 ${m.sender === 'user' ? 'text-teal-200 text-right' : 'text-slate-500'}`}>
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1.5 text-teal-400 text-xs font-medium italic">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                  <span>AI javob tayyorlamoqda...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Question Chips */}
            <div className="p-2 sm:p-3 border-t border-slate-800/80 bg-slate-950/40 overflow-x-auto no-scrollbar flex items-center space-x-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
                Savollar:
              </span>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-slate-900/90 text-teal-300 border border-teal-500/25 hover:border-teal-400 hover:bg-slate-800 transition-all whitespace-nowrap flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-slate-950/70 flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Savolingiz yoki holatingizni yozing..."
                className="flex-1 p-2.5 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-400 min-w-0"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 sm:p-3.5 rounded-xl font-bold text-white glowing-button flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-500/20 active:scale-95"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

          </div>

          {/* Book direct specialist action */}
          <div className="text-center">
            <button
              onClick={() => onOpenConsultModal("Bag'ibekov Furqat")}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm text-teal-300 hover:text-teal-200 font-bold hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Jonli psixoterapevt bilan shaxsiy konsultatsiya belgilash</span>
            </button>
          </div>
        </div>

        {/* Right: Custom Furqat AI Psychologist Portrait on Right (O'ng Tarafda) */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <FurqatDoctorPortrait imageSrc="/furqat_ai_chat.jpg" size="wide" direction="right" />
        </div>

      </div>

    </div>
  );
}
