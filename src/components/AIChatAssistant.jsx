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
  ArrowRight,
  RefreshCcw,
  CheckCircle2
} from 'lucide-react';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';

// High-End Rich Markdown & Typography Formatter for AI Responses
function FormattedMessage({ text, isUser }) {
  if (isUser) {
    return <div className="text-xs sm:text-sm font-medium leading-relaxed text-white whitespace-pre-wrap">{text}</div>;
  }

  const lines = text.split('\n');

  const renderInlineFormatted = (str) => {
    const parts = [];
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    let lastIndex = 0;

    while ((match = boldRegex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={match.index} className="text-teal-300 font-bold">
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }
    return parts.length > 0 ? parts : str;
  };

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-100">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Section Title Banner
        if ((trimmed.startsWith('💡') || trimmed.startsWith('💊') || trimmed.startsWith('🎶') || trimmed.startsWith('🫀') || trimmed.startsWith('❤️') || trimmed.startsWith('🌙') || trimmed.startsWith('💼') || trimmed.startsWith('💎') || trimmed.startsWith('👨‍⚕️')) && trimmed.includes('**')) {
          return (
            <div key={idx} className="pb-1.5 pt-0.5 border-b border-teal-500/25 text-sm sm:text-base font-black text-white flex items-center space-x-1.5">
              <span>{renderInlineFormatted(trimmed)}</span>
            </div>
          );
        }

        // Bullet / Ordered List Item
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || /^\d+\./.test(trimmed)) {
          const isOrdered = /^\d+\./.test(trimmed);
          const prefix = isOrdered ? trimmed.match(/^\d+\./)[0] : '•';
          const content = trimmed.replace(/^[•\-\d+\.]\s*/, '');
          
          return (
            <div key={idx} className="flex items-start space-x-2 pl-1 py-0.5">
              {isOrdered ? (
                <span className="text-[11px] font-bold text-teal-400 bg-teal-950/80 px-1.5 py-0.5 rounded border border-teal-500/30 flex-shrink-0 mt-0.5">
                  {prefix}
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0 shadow-[0_0_8px_#2dd4bf]" />
              )}
              <div className="flex-1 text-slate-200">
                {renderInlineFormatted(content)}
              </div>
            </div>
          );
        }

        // Highlight Quotes (starts with *)
        if (trimmed.startsWith('*«') || trimmed.startsWith('«')) {
          return (
            <div key={idx} className="my-1.5 p-2.5 rounded-xl bg-teal-950/30 border-l-2 border-teal-400 text-teal-200/90 text-xs sm:text-sm italic">
              {renderInlineFormatted(trimmed)}
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-slate-200">
            {renderInlineFormatted(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

import { askAIChatAssistant } from '../services/geminiService';

export default function AIChatAssistant({ onOpenConsultModal }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Assalomu alaykum! Men Sokin Qalb markazining Gemini AI asosidagi virtual psixologik yordamchisiman. Sizni qiynayotgan xavotir, asabiylik, uyqusizlik, tana qisilishlari, munosabatlar yoki Bag'ibekov Furqatning davolash metodikasi bo'yicha qanday savolingiz bor?",
      time: "Hozir"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (query) => {
    const text = query.toLowerCase().trim();

    // 1. Fransiya Neyro-Lampasi
    if (text.includes('lampa') || text.includes('fransiya') || text.includes('nur') || text.includes('stroboskop')) {
      return "💡 **Fransiya Neyro-Lampasi qanday ishlaydi?**\n\nFransiya neyro-lampasi maxsus chastotali stroboskopik yorug'lik to'lqinlari orqali ko'z orqali miya neyronlariga ta'sir qiladi. U miyani chuqur **Alfa (8-12 Hz)** va **Teta (4-8 Hz)** to'lqinlariga tushiradi.\n\n• **Gipnozsiz va Dori-Darmonsiz:** Ong ostidagi eski qo'rquvlar va bolalik travmalari xavfsiz bartaraf etiladi;\n• **Neyron Relaksatsiya:** 15 daqiqada 8 soatlik chuqur uyqu darajasidagi ruhiy yengillik beradi;\n• **Ildiz Bloklarini Yechish:** Surunkali vahima va stress o'choqlarini ildizidan tozalaydi.";
    }

    // 2. Xitoy Davolash Kapsulasi
    if (text.includes('kapsula') || text.includes('xitoy') || text.includes('kapsulaterapiya') || text.includes('spazm')) {
      return "💊 **Xitoy Davolash Kapsulasi (Kapsulaterapiya) haqida:**\n\nInson ruhiy stressga tushganda, barcha hissiyotlar tanada mushak qisilishlari (psixosomatik bloklar) ko'rinishida qotib qoladi.\n\n• **Chuqur Termik & Infraqizil Terapiya:** Bo'yin, yelka va orqa mushaklaridagi spazmlarni yechadi;\n• **Biologik Quvvat Tiklanishi:** Qon aylanishi va immunitetni 100% tiklab, charchoqni yo'qotadi;\n• **Klinik Natija:** Birinchi seansdanoq tanada yengillik va qanot paydo bo'lgandek tuyg'u hosil bo'ladi.";
    }

    // 3. Neyro-Akustik Musiqa / 432Hz
    if (text.includes('musiqa') || text.includes('akustika') || text.includes('432') || text.includes('audio') || text.includes('ovoz')) {
      return "🎶 **432Hz Maxsus Neyro-Akustik Terapiya:**\n\n432Hz chastotadagi binaural tovushlar miyaning xavotir markazi bo'lgan **Amigdala** faolligini pasaytiradi.\n\n• **Neyronlararo Muvozanat:** Miyaning o'ng va chap yarim sharlarini garmoniyaga keltiradi;\n• **Ichki Xotirjamlik:** Vahima, bezovtalik va yurak tez urishini zudlik bilan tinchlantiradi;\n• **Seanslarda Qo'llanilishi:** Kapsula va Lampa muolajalari aynan shu musiqiy chastota ostida o'tadi.";
    }

    // 4. Panik Ataka / Vahima / Qo'rquv / Stress
    if (text.includes('panik') || text.includes('vahima') || text.includes('qorquv') || text.includes('yurak') || text.includes('havo') || text.includes('stress')) {
      return "🫀 **Panik ataka va kuchli vahima paytida zudlik bilan yordam:**\n\n1. **4-7-8 Vagus nafas mashqi:** 4 soniya burundan chuqur nafas oling, 7 soniya ushlab turing, 8 soniya davomida og'izdan sekin chiqaring. 5 marta takrorlang.\n2. **Tana teginishini his qiling:** Oyoqlaringiz yerga mahkam tegib turganini, kaftlaringizni ishqalab issiqlikni his qiling.\n3. **Xotirjam bo'ling:** Panik ataka yurakka mutlaqo zarar yetkazmaydi, bu shunchaki miyaning xato xavf signalidir.\n\nIldizidan butunlay qutulish uchun Bag'ibekov Furqat bilan shaxsiy qabulga yozilishni tavsiya qilamiz.";
    }

    // 5. Munosabatlar / Er-Xotin / Oilaviy muammolar / Ayblash
    if (text.includes('munosabat') || text.includes('er') || text.includes('xotin') || text.includes('oila') || text.includes('sevgi') || text.includes('ayblash') || text.includes('xafa')) {
      return "❤️ **Munosabatlar Psixologiyasi va Ichki Dasturlar:**\n\nFurqat Bag'ibekovning mualliflik qonuniga ko'ra:\n*«Biz ichki holatimizga mos insonlarni hayotimizga tortamiz. Dunyo va odamlar bizning ichki dasturlarimiz oynasidir.»*\n\n• **Boshqalarni ayblash foydasiz:** Atrofdagilarni o'zgartirishga urinish faqat quvvatni sarflaydi;\n• **Dasturni o'zgartirish:** Ichingizdagi Qutqaruvchi, Ona yoki Qurbon rollarini tozalaganingizda munosabatlar o'z-o'zidan iziga tushadi;\n• **Natija:** Oilada mehr, hurmat va chuqur tushunish qaror topadi.";
    }

    // 6. Uyqu / Charchoq / Depressiya
    if (text.includes('uyqu') || text.includes('charchoq') || text.includes('depressiya') || text.includes('holsiz')) {
      return "🌙 **Uyqusizlik va Surunkali Charchoq sabablari:**\n\nKo'pincha miya neyronlari yuqori stress tufayli **Beta-to'lqin**da qotib qoladi va kechasi o'chmaydi. Natijada inson 8 soat uxlasa ham charchab uyg'onadi.\n\n• **Delta To'lqinga O'tish:** Sokin Qalb metodikasi miyani shifobaxsh Delta to'lqiniga qaytaradi;\n• **Tiklanish:** 3-5 kun ichida uyqu chuqurlashadi va tongda energiya bilan uyg'onasiz.";
    }

    // 7. Moliyaviy Bloklar / Pul
    if (text.includes('moliya') || text.includes('pul') || text.includes('qashshoq') || text.includes('kambag')) {
      return "💼 **Moliyaviy Xotirjamlik va Ong Osti:**\n\nMoliyaviy qiyinchiliklar ko'pincha pulning kamligida emas, balki ong ostidagi qashshoqlik qo'rquvi, pulga nisbatan aybdorlik hissi yoki o'z qadrini past baholash bilan bog'liq.\n\n• **Ichki Cheklovlarni Yechish:** Moliyaviy qo'rquvlarni bartaraf etish;\n• **Barqaror O'sish:** Daromadni xotirjamlik va ishonch bilan oshirish imkoni yaratiladi.";
    }

    // 8. Narxlar / Kurslar / To'lov
    if (text.includes('narx') || text.includes('qancha') || text.includes('kurs') || text.includes('seans') || text.includes('tolov') || text.includes('pul')) {
      return "💎 **Dasturlar va Seanslar Narxlari:**\n\n• **$0 (Bepul):** Diagnostika testi va Bepul Kirish video-darslari;\n• **$1 - $50:** Mini-kurslar («G'azabni Boshqarish», «Ichki Bolalik Travmasi»);\n• **$150:** «30 Kunlik To'liq Transformatsiya» mualliflik kursi;\n• **$350 - $500:** Apparatli 3 Seans Kompleks (Konsultatsiya + Xitoy Kapsulasi + Fransiya Lampasi);\n• **$1,200:** VIP Tog' Retreati (Barchasi ichida).\n\n«Kurslar» bo'limida to'g'ridan-to'g'ri ro'yxatdan o'tishingiz mumkin.";
    }

    // 9. Shaxsiy Qabul / Konsultatsiyaga Yozilish / Furqat Bag'ibekov
    if (text.includes('konsultatsiya') || text.includes('qabul') || text.includes('yozilish') || text.includes('furqat') || text.includes('boglanish') || text.includes('aloqa')) {
      return "👨‍⚕️ **Bag'ibekov Furqat Qabuliga Yozilish:**\n\nShaxsiy qabulda 12 yillik klinik tajriba asosida sizning holatingiz individual tahlil qilinadi, Xitoy kapsulasi va Fransiya lampasi seanslari belgilanadi.\n\nQabulga yozilish uchun pastdagi **«Jonli Qabulga Yozilish»** tugmasini bosing yoki admin bilan bog'laning: @sokinqalb_admin";
    }

    // 10. Salomlashish
    if (text.includes('salom') || text.includes('assalom') || text.includes('qalesiz') || text.includes('rahmat')) {
      return "Assalomu alaykum! Sizga yordam berishdan mamnunman. Qanday ruhiy yoki psixosomatik holat sizni bezovta qilmoqda? Savolingizni yozing, birgalikda tahlil qilamiz.";
    }

    return `Savolingiz uchun tashakkur! «${query}» holati insonning ong osti dasturlari va asab tizimi bilan uzviy bog'liq.\n\nBag'ibekov Furqat metodikasiga ko'ra, har qanday ruhiy taranglik va asabiylikni dori-darmonsiz, chuqur ong osti relaksatsiyasi va maxsus apparatlar (Xitoy kapsulasi, Fransiya lampasi) yordamida to'liq davolash mumkin.\n\nSizni aynan nima ko'proq asabiylashtirmoqda yoki qanday holat bezovta qilmoqda? Yozing, batafsil yechimini ko'rib chiqamiz.`;
  };

  const handleSendMessage = async (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setInputText('');
    setIsTyping(true);

    try {
      // Live Google Gemini AI Call
      const botReply = await askAIChatAssistant(textToSend, currentHistory);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn("Gemini AI fallback triggered:", err);
      const fallbackReply = generateAIResponse(textToSend);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: fallbackReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickTopics = [
    { label: "💡 Fransiya Lampasi", query: "Fransiya neyro-lampasi nima va qanday ishlaydi?" },
    { label: "💊 Xitoy Kapsulasi", query: "Xitoy davolash kapsulasi nima?" },
    { label: "🫀 Panik Ataka", query: "Panik ataka va vahimani qanday to'xtatish mumkin?" },
    { label: "❤️ Munosabatlar", query: "Munosabatlardagi xafagarchilik va ichki dasturlar haqida ma'lumot bering" },
    { label: "💎 Kurs Narxlari", query: "Kurslar va seanslar narxi qancha?" },
    { label: "👨‍⚕️ Shaxsiy Qabul", query: "Bag'ibekov Furqat qabuliga qanday yozilish mumkin?" }
  ];

  return (
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
          <div className="glass-panel rounded-2xl sm:rounded-3xl border border-white/[0.08] shadow-2xl flex flex-col h-[540px] sm:h-[600px] overflow-hidden w-full bg-slate-900/90">
            
            {/* Chat Messages Log — Internal Scroll ONLY */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-3.5 sm:p-6 overflow-y-auto space-y-4 scroll-smooth"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start space-x-2.5 sm:space-x-3.5 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    m.sender === 'user' 
                      ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-indigo-500/20' 
                      : 'bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 border border-teal-500/40 text-teal-300 shadow-teal-500/15'
                  }`}>
                    {m.sender === 'user' ? <User className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>

                  <div className={`max-w-[88%] sm:max-w-[84%] rounded-2xl p-3.5 sm:p-5 leading-relaxed shadow-xl ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-tr-none shadow-teal-600/20 border border-teal-400/30'
                      : 'glass-card border border-teal-500/20 text-slate-100 rounded-tl-none bg-slate-950/70'
                  }`}>
                    <FormattedMessage text={m.text} isUser={m.sender === 'user'} />
                    <div className={`text-[9px] sm:text-[10px] mt-2 font-mono ${m.sender === 'user' ? 'text-teal-100 text-right' : 'text-slate-400'}`}>
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 text-teal-400 text-xs font-medium italic bg-teal-950/40 p-2 rounded-xl border border-teal-500/20 w-fit">
                  <Bot className="w-4 h-4 animate-spin text-teal-300" />
                  <span>AI tahlil qilmoqda...</span>
                </div>
              )}
            </div>

            {/* Quick Topic Chips - Concise, Clean & Stylish */}
            <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/70 overflow-x-auto no-scrollbar flex items-center space-x-2">
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider whitespace-nowrap pl-0.5 flex-shrink-0 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-teal-400" />
                <span>Mavzular:</span>
              </span>
              {quickTopics.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.query)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-teal-500/20 text-slate-200 hover:text-teal-300 border border-slate-700/70 hover:border-teal-400/50 text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 shadow-sm flex-shrink-0"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-900/95 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Savolingizni yozing (masalan: Fransiya lampasi qanday ishlaydi?)..."
                className="flex-1 bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold hover:opacity-90 disabled:opacity-40 transition-opacity flex-shrink-0 cursor-pointer shadow-md shadow-teal-500/20"
                aria-label="Yuborish"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>

          </div>
        </div>

        {/* Right: Doctor Portrait Free-Standing & Seamlessly Blended with Background */}
        <div className="lg:col-span-4 space-y-6 w-full flex flex-col items-center justify-center">
          
          {/* Frameless Seamless Doctor Portrait with Ambient Backlight */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center justify-center select-none group">
            
            {/* Ambient Halo Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] h-[320px] sm:h-[420px] bg-gradient-to-tr from-teal-500/30 via-cyan-500/20 to-indigo-500/25 blur-[95px] -z-10 rounded-full pointer-events-none animate-pulse-glow" />

            {/* Natural Portrait - No Frame, Soft Bottom Blend */}
            <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden flex items-end justify-center">
              <img 
                src="/furqat_ai_chat.jpg" 
                alt="Bag'ibekov Furqat" 
                className="w-full h-full object-cover object-top filter contrast-[1.03] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:scale-103 transition-transform duration-700"
              />
              {/* Bottom Canvas Gradient Blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1726] via-[#0e1726]/30 to-transparent pointer-events-none" />
            </div>

            {/* Seamless Doctor Info Beneath */}
            <div className="text-center mt-2 space-y-1 z-10">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-[10px] sm:text-xs font-bold mb-1 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Onlayn Psixoterapevt</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
                Bag'ibekov Furqat
              </h3>
              <p className="text-xs text-teal-200/90 font-medium">
                Bosh Psixoterapevt • Sokin Qalb Asoschisi
              </p>
            </div>
          </div>

          {/* Direct Consultation Booking Button */}
          <div className="w-full max-w-[340px] sm:max-w-[380px]">
            <button
              onClick={() => onOpenConsultModal("Bag'ibekov Furqat")}
              className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-2 shadow-xl shadow-teal-500/25 active:scale-95 border border-teal-400/30 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-teal-100" />
              <span>Jonli Qabulga Yozilish</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
