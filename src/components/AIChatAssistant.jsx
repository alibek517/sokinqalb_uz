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
  RefreshCcw
} from 'lucide-react';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';

export default function AIChatAssistant({ onOpenConsultModal }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Assalomu alaykum! Men Sokin Qalb markazining virtual psixologik yordamchisiman. Sizni qiynayotgan xavotir, uyqusizlik, tana qisilishlari, munosabatlar yoki Bag'ibekov Furqatning davolash apparatlari (Xitoy kapsulasi, Fransiya lampasi) bo'yicha qanday savolingiz bor?",
      time: "Hozir"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll ONLY the inner chat messages box, NEVER the entire browser window
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
      return "💡 **Fransiya Neyro-Lampasi qanday ishlaydi?**\n\nFransiya neyro-lampasi maxsus chastotali stroboskopik yorug'lik to'lqinlari orqali ko'z orqali miya neyronlariga ta'sir qiladi. U miyani chuqur **Alfa (8-12 Hz)** va **Teta (4-8 Hz)** to'lqinlariga tushiradi.\n\nBu holatda inson ongli ravishda o'zining ong ostidagi eski qo'rquvlar, bolalik travmalari va hissiy bloklari bilan xavfsiz muloqot qiladi va ularni gipnozsiz, dori-darmonsiz bartaraf etadi.";
    }

    // 2. Xitoy Davolash Kapsulasi
    if (text.includes('kapsula') || text.includes('xitoy') || text.includes('kapsulaterapiya') || text.includes('spazm')) {
      return "💊 **Xitoy Davolash Kapsulasi (Kapsulaterapiya) haqida:**\n\nInson ruhiy stressga tushganda, barcha hissiyotlar tanada mushak qisilishlari (psixosomatik bloklar) ko'rinishida qotib qoladi. \n\nXitoy davolash kapsulasi chuqur termik, infraqizil va to'lqinli relaksatsiya orqali tanadagi barcha surunkali spazmlarni yechadi, qon aylanishini va biologik quvvatni 100% qayta tiklaydi.";
    }

    // 3. Neyro-Akustik Musiqa / 432Hz
    if (text.includes('musiqa') || text.includes('akustika') || text.includes('432') || text.includes('audio') || text.includes('ovoz')) {
      return "🎶 **432Hz Maxsus Neyro-Akustik Terapiya:**\n\n432Hz chastotadagi binaural tovushlar miyaning xavotir markazi bo'lgan 'Amigdala' faolligini pasaytiradi. U neyronlararo bog'liqlikni tiklab, insonni chuqur xotirjamlik va ichki garmoniyaga olib keladi. Barcha seanslarimiz shu neyromusiqa fonida o'tkaziladi.";
    }

    // 4. Panik Ataka / Vahima / Qo'rquv / Stress
    if (text.includes('panik') || text.includes('vahima') || text.includes('qorquv') || text.includes('yurak') || text.includes('havo') || text.includes('stress')) {
      return "🫀 **Panik ataka va kuchli vahima paytida nima qilish kerak?**\n\n1. **4-7-8 Vagus nafas mashqi:** 4 soniya burundan chuqur nafas oling, 7 soniya ushlab turing, 8 soniya davomida og'zingizdan sekin chiqaring. 5 marta takrorlang.\n2. **Tana teginishini his qiling:** Oyoqlaringiz yerga tegib turganini, kaftlaringizni bir-biriga ishqalab iliqlikni his qiling.\n3. **Bilingki, bu o'tib ketadi:** Panik ataka yurakka zarar yetkazmaydi, bu shunchaki miyaning xato xavf signalidir.\n\nIldizidan qutulish uchun Furqat Bag'ibekov bilan shaxsiy qabulga yozilishni tavsiya qilamiz.";
    }

    // 5. Munosabatlar / Er-Xotin / Oilaviy muammolar / Ayblash
    if (text.includes('munosabat') || text.includes('er') || text.includes('xotin') || text.includes('oila') || text.includes('sevgi') || text.includes('ayblash') || text.includes('xafa')) {
      return "❤️ **Munosabatlar Psixologiyasi va Ichki Dasturlar:**\n\nFurqat Bag'ibekovning mualliflik qonuniga ko'ra: *«Biz ichki holatimizga mos insonlarni hayotimizga tortamiz. Dunyo va odamlar bizning ichki dasturlarimiz oynasidir.»*\n\nBoshqalarni ayblash yoki ularni o'zgartirishga urinish foyda bermaydi. Ichki dasturlaringizni (Qutqaruvchi, Ona, Qurbon rollarini) o'zgartirsangiz, atrofingizdagi insonlarning sizga munosabati ham butunlay ijobiy tomonga o'zgaradi.";
    }

    // 6. Uyqu / Charchoq / Depressiya
    if (text.includes('uyqu') || text.includes('charchoq') || text.includes('depressiya') || text.includes('holsiz')) {
      return "🌙 **Uyqusizlik va Surunkali Charchoq sabablari:**\n\nKo'pincha miya neyronlari yuqori stress tufayli 'Beta-to'lqin'da qotib qoladi va kechasi o'chmaydi. Natijada inson 8 soat uxlasa ham charchab uyg'onadi.\n\nSokin Qalb metodikasi orqali miya neyronlari 'Delta' to'lqiniga moslanadi va 3-5 kun ichida chuqur, shifobaxsh uyqu tiklanadi.";
    }

    // 7. Moliyaviy Bloklar / Pul
    if (text.includes('moliya') || text.includes('pul') || text.includes('qashshoq') || text.includes('kambag')) {
      return "💼 **Moliyaviy Xotirjamlik va Ong Osti:**\n\nMoliyaviy qiyinchiliklar ko'pincha pulning kamligida emas, balki ong ostidagi qashshoqlik qo'rquvi, pulga nisbatan aybdorlik hissi yoki o'z qadrini past baholash bilan bog'liq.\n\nIchki bloklar yechilganda, inson pul topish va uni saqlashdagi doimiy xavotirdan xalos bo'ladi.";
    }

    // 8. Narxlar / Kurslar / To'lov
    if (text.includes('narx') || text.includes('qancha') || text.includes('kurs') || text.includes('seans') || text.includes('tolov') || text.includes('pul')) {
      return "💎 **Dasturlar va Seanslar Narxlari:**\n\n• **Bepul:** Diagnostika testi va Kirish video-darslari ($0);\n• **1$ dan 50$ gacha:** Mini-kurslar («G'azabni Boshqarish», «Ichki Bolalik Travmasi»);\n• **150$:** «30 Kunlik To'liq Transformatsiya» kursi;\n• **350$ - 500$:** Apparatli 3 Seans Kompleks (Konsultatsiya + Xitoy Kapsulasi + Fransiya Lampasi);\n• **1,200$:** VIP Tog' Retreati (Barchasi ichida).\n\n«Kurslar» bo'limida to'g'ridan-to'g'ri ro'yxatdan o'tishingiz mumkin.";
    }

    // 9. Shaxsiy Qabul / Konsultatsiyaga Yozilish / Furqat Bag'ibekov
    if (text.includes('konsultatsiya') || text.includes('qabul') || text.includes('yozilish') || text.includes('furqat') || text.includes('boglanish') || text.includes('aloqa')) {
      return "👨‍⚕️ **Bag'ibekov Furqat Qabuliga Yozilish:**\n\nShaxsiy qabulda 12 yillik klinik tajriba asosida sizning holatingiz individual tahlil qilinadi, Xitoy kapsulasi va Fransiya lampasi seanslari belgilanadi.\n\nQabulga yozilish uchun pastdagi yoki yuqoridagi **«Qabulga Yozilish»** tugmasini bosing yoki admin bilan bog'laning: @sokinqalb_admin";
    }

    // 10. Salomlashish
    if (text.includes('salom') || text.includes('assalom') || text.includes('qalesiz') || text.includes('rahmat')) {
      return "Assalomu alaykum! Sizga yordam berishdan mamnunman. Qanday ruhiy yoki psixosomatik holat sizni bezovta qilmoqda? Savolingizni yozing, birgalikda tahlil qilamiz.";
    }

    // 11. Standart tahliliy javob
    return `Savolingiz uchun tashakkur! «${query}» mavzusi insonning ong osti dasturlari va tana xotirjamligi bilan uzviy bog'liq.\n\nBag'ibekov Furqatning 12 yillik klinik metodikasiga ko'ra, har qanday ruhiy taranglik, vahima yoki munosabatlardagi inqirozni dori-darmonsiz, tizimli psixoterapiya va zamonaviy apparatlar (Xitoy kapsulasi, Fransiya lampasi) yordamida to'liq davolash mumkin.\n\nAniqroq ma'lumot olish uchun savolingizni chuqurroq yozishingiz yoki shaxsiy qabulga yozilishingiz mumkin.`;
  };

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

    setTimeout(() => {
      const botReply = generateAIResponse(textToSend);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
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
          <div className="glass-panel rounded-2xl sm:rounded-3xl border border-white/[0.08] shadow-2xl flex flex-col h-[520px] sm:h-[580px] overflow-hidden w-full bg-slate-900/90">
            
            {/* Chat Messages Log — Internal Scroll ONLY */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 scroll-smooth"
            >
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
                      : 'glass-card border border-white/[0.08] text-slate-200 rounded-tl-none bg-slate-950/60'
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
