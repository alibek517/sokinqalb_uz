import React, { useState } from 'react';
import { 
  Compass, 
  DollarSign, 
  Heart, 
  Brain, 
  Users, 
  Sparkles, 
  Activity, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { FOUR_PILLARS } from '../data/initialData';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';

export default function FourPillarsModule({ setActiveTab }) {
  const [pillarScores, setPillarScores] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_pillar_scores');
    return saved ? JSON.parse(saved) : {
      financial: 6,
      mental: 7,
      physical: 5,
      relationships: 8
    };
  });

  const handleScoreChange = (key, val) => {
    const updated = {
      ...pillarScores,
      [key]: parseInt(val)
    };
    setPillarScores(updated);
    localStorage.setItem('sokinqalb_pillar_scores', JSON.stringify(updated));
  };

  const calculateOverallBalance = () => {
    const values = Object.values(pillarScores);
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round((sum / (values.length * 10)) * 100);
  };

  const balanceScore = calculateOverallBalance();

  // Find lowest pillar
  const pillarEntries = Object.entries(pillarScores);
  pillarEntries.sort((a, b) => a[1] - b[1]);
  const weakestPillarKey = pillarEntries[0][0];

  const pillarDetails = {
    financial: {
      name: "Moliyaviy Xotirjamlik",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
      advice: "Moliya sohasidagi zo'riqish ong ostidagi qashshoqlik qo'rquvi bilan bog'liq. Furqat Bag'ibekovning «Moliyaviy Bloklarni Yechish» seanslari orqali ichki erkinlikka erishing."
    },
    mental: {
      name: "Ruhiy Xotirjamlik",
      icon: Brain,
      color: "from-cyan-500 to-blue-500",
      advice: "Ortiqcha fikrlar va kechagi kun pushaymonligini to'xtatish uchun har kuni 4-7-8 Vagus nafas mashqini bajaring va Neyro-lampali seanslardan foydalaning."
    },
    physical: {
      name: "Jismoniy & Salomatlik",
      icon: Heart,
      color: "from-rose-500 to-amber-500",
      advice: "Tanadagi spazmlar, yelka va bel og'riqlari psixosomatik bloklar oqibatidir. Xitoy Kapsulasi tanangizdagi surunkali taranglikni 100% yengillashtiradi."
    },
    relationships: {
      name: "Munosabatlar & Oila",
      icon: Users,
      color: "from-indigo-500 to-purple-500",
      advice: "Yaqinlar bilan tushunmovchiliklar o'z ichki chegaralaringizni tiklay olmaslikdan kelib chiqadi. Dilfuza Muminovaning oilaviy konsultatsiyalari munosabatlarni yangilaydi."
    }
  };

  return (
    <div className="py-8 sm:py-16 max-w-6xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10 w-full">
      
      {/* Module Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-teal-400" />
          <span>Hayotiy Muvozanat Gidroli</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Inson Hayotining 4 Asosiy Ustuni
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
          Bag'ibekov Furqatning yaxlit psixosomatik konsepsiyasi: Moliya, Ruhiyat, Tana va Munosabatlar balansi
        </p>
      </div>

      {/* Balance Index Hero Gauge */}
      <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">
            Umumiy Hayotiy Balans Indeksi
          </span>
          <h3 className="text-xl sm:text-3xl font-extrabold text-white">
            {balanceScore >= 80 ? "Yuqori Garmoniya va Xotirjamlik 🌿" : balanceScore >= 50 ? "O'rtacha Muvozanat (Tiklash Zarur) ⚖️" : "Disbalans va Kuchli Stress ⚠️"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
            Qaysi sohada ball past bo'lsa, o'sha soha sizning barcha quvvatingizni so'rib oladi.
          </p>
        </div>

        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="text-center">
            <div className="text-3xl sm:text-5xl font-black text-teal-300">
              {balanceScore}%
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase mt-0.5">Balans Ko'rsatkichi</div>
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-500/10 border border-teal-400/30 flex items-center justify-center text-teal-300">
            <Award className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>
      </div>

      {/* 4 Interactive Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {Object.entries(FOUR_PILLARS).map(([key, data]) => {
          const score = pillarScores[key] || 5;
          const config = pillarDetails[key];
          const Icon = config.icon;

          return (
            <div key={key} className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/[0.06] space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-300 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">{data.title}</h4>
                    <p className="text-[11px] text-slate-400">{data.aspects.slice(0, 2).join(' • ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-2xl font-black text-teal-300">{score}</span>
                  <span className="text-xs text-slate-500">/10</span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Zaif (1)</span>
                  <span>O'rtacha (5)</span>
                  <span>Ideal (10)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={score}
                  onChange={(e) => handleScoreChange(key, e.target.value)}
                  className="w-full h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Status bar description */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                {score >= 8 ? (
                  <span className="text-emerald-300">✅ Ushbu ustun mustahkam va sizga ichki quvvat bag'ishlaydi.</span>
                ) : score >= 5 ? (
                  <span className="text-amber-300">⚠️ O'rtacha holat: davriy stresslar ushbu sohani zaiflashtirmoqda.</span>
                ) : (
                  <span className="text-rose-300">🚨 O'tkir e'tibor talab etiladi: quvvatingiz aynan shu yerdan oqib ketmoqda.</span>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Tailored AI Clinical Advice with Custom Furqat Pillars Portrait on Left (Chap Tarafda) */}
      <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-teal-500/30 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left: Custom Pillars Portrait */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <FurqatDoctorPortrait imageSrc="/furqat_pillars.jpg" size="wide" direction="left" />
          </div>

          {/* Right: Advice & CTAs */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center space-x-2 text-teal-300 font-bold text-sm sm:text-base">
              <Sparkles className="w-5 h-5" />
              <span>Eng Zaif Ustun Bo'yicha Furqat Bag'ibekov Tavsiyasi:</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-base sm:text-xl font-bold text-white">
                👉 {pillarDetails[weakestPillarKey].name}ni Tiklash
              </h4>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-white/10">
                {pillarDetails[weakestPillarKey].advice}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('team')}
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-2 shadow-lg shadow-teal-500/20 active:scale-95"
              >
                <span>Mutaxassis Qabuliga Yozilish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-200 glass-card hover:text-white flex items-center space-x-2 active:scale-95"
              >
                <span>Shifobaxsh Kurslarni Ko'rish</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
