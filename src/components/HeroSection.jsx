import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu,
  Eye,
  Music,
  ShieldCheck,
  Award,
  Users,
  Star,
  PhoneCall,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';
import PsychologyInsightsGallery from './PsychologyInsightsGallery';

export default function HeroSection({ setActiveTab, onOpenConsultModal }) {
  return (
    <div className="relative overflow-hidden pt-4 sm:pt-10 pb-12 sm:pb-24 w-full">
      
      {/* Ambient background light reflections */}
      <div className="absolute top-10 left-1/4 w-[300px] sm:w-[650px] h-[300px] sm:h-[650px] bg-gradient-to-tr from-teal-500/20 via-cyan-500/15 to-transparent blur-[120px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-transparent blur-[140px] -z-10 pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Hero Layout: 2 Columns on Large Screens (Text on Left, Furqat Photo on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Hero Copy & Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full badge-teal text-[10px] sm:text-xs font-bold shadow-lg shadow-teal-500/15">
                <Sparkles className="w-4 h-4 text-teal-300 flex-shrink-0 animate-pulse" />
                <span className="truncate">Bag'ibekov Furqatning 12 Yillik Mualliflik Metodikasi</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Sog'lom Ong <br />
              <span className="bg-gradient-to-r from-teal-200 via-cyan-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
                Sog'lom Hayot
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              100% dori-darmonsiz, surunkali stress, panik ataka, vahima va tana psixosomatik qisilishlarini 
              <b className="text-teal-300"> Xitoy davolash kapsulasi</b>, <b className="text-cyan-300">Fransiya neyro-lampasi</b> va <b className="text-indigo-300">neyro-akustik musiqa</b> bilan ildizidan davolash markazi.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full pt-2">
              <button
                onClick={() => setActiveTab('diagnostic')}
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold text-xs sm:text-base text-white glowing-button flex items-center justify-center space-x-2 sm:space-x-3 shadow-xl shadow-teal-500/25 active:scale-95 border border-teal-300/30"
              >
                <span>Bepul Diagnostika</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold text-xs sm:text-base text-slate-200 glass-card hover:text-white flex items-center justify-center space-x-2 active:scale-95 border border-white/10"
              >
                <span>Kurslar va Seanslar</span>
              </button>
            </div>

            {/* Micro Feature highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/[0.08] text-center lg:text-left">
              <div>
                <div className="text-xs sm:text-sm font-bold text-teal-300">🇨🇳 Xitoy Kapsulasi</div>
                <div className="text-[10px] sm:text-xs text-slate-400">Tana spazmini yechish</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-cyan-300">🇫🇷 Neyro-Lampa</div>
                <div className="text-[10px] sm:text-xs text-slate-400">Ong osti muloqoti</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-indigo-300">🎶 Neyro-Musiqa</div>
                <div className="text-[10px] sm:text-xs text-slate-400">432Hz neyron tinchlik</div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder Furqat Bag'ibekov Photo with Asymmetrical Organic Frame & Nameplate (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pb-4 sm:pb-0">
            <FurqatDoctorPortrait 
              imageSrc="/furqat_hero.png" 
              size="wide" 
              direction="right" 
              isFramed={true} 
              showName={true} 
            />
          </div>

        </div>

        {/* 3 Pillars of Clinical Methodology */}
        <div className="mt-14 sm:mt-24">
          <div className="text-center mb-6 sm:mb-12">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full badge-indigo text-[10px] sm:text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Innovatsion Apparatlar Kompleksi</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Klinik Davolash Metodikasi Asoslari
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
              Xalqaro zamonaviy apparatlar orqali inson ong ostidagi chuqur travma va bloklarni ildizidan bartaraf etish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* 1. China Capsule */}
            <div className="glass-card p-5 sm:p-8 rounded-[2rem_1rem_2rem_1rem] relative overflow-hidden group border border-teal-500/20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300 mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Xitoy Texnologiyasi</div>
              <h3 className="text-base sm:text-xl font-bold text-white mb-2 leading-snug">Davolash Kapsulasi (Kapsulaterapiya)</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Tanadagi surunkali mushak qisilishlarini, psixosomatik bloklarni va taranglikni 
                chuqur relaksatsiya orqali butunlay bo'shatadi va tabiiy biologik quvvatni tiklaydi.
              </p>
            </div>

            {/* 2. France Neuro-Lamp */}
            <div className="glass-card p-5 sm:p-8 rounded-[1rem_2rem_1rem_2rem] relative overflow-hidden group border border-cyan-500/20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Fransiya Texnologiyasi</div>
              <h3 className="text-base sm:text-xl font-bold text-white mb-2 leading-snug">Fransiya Neyro-Lampasi</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Ko'zga yo'naltirilgan maxsus stroboskopik to'lqinlar orqali miyani alfa va teta to'lqinlariga 
                tushirib, insonning ong osti bilan to'g'ridan-to'g'ri xavfsiz muloqot o'rnatadi.
              </p>
            </div>

            {/* 3. Neuro-acoustic Music */}
            <div className="glass-card p-5 sm:p-8 rounded-[2rem_1rem_2rem_1rem] relative overflow-hidden group border border-indigo-500/20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Music className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Neyro-Akustika</div>
              <h3 className="text-base sm:text-xl font-bold text-white mb-2 leading-snug">Maxsus Neyro-Akustik Terapiya</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Surunkali vahima, depressiv psixoz va qo'rquvlarning asl ildizini ochib, miya neyronlarini 
                to'liq tinchlantiradi va yangi sog'lom ruhiy dasturlarni mustahkamlaydi.
              </p>
            </div>

          </div>
        </div>

        {/* Live Metrics Counter Bar */}
        <div className="mt-10 sm:mt-16 glass-panel rounded-3xl p-4 sm:p-8 border border-teal-500/20 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="flex items-center justify-center space-x-1 text-2xl sm:text-4xl font-black text-teal-300">
                <span>15,400+</span>
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Mijozlar</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-cyan-300">12 Yil</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Tajriba</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-indigo-300">89%</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Natija</div>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1 text-2xl sm:text-4xl font-black text-emerald-300">
                <span>4.95</span>
                <Star className="w-4 h-4 fill-emerald-400 text-emerald-400 inline ml-1" />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Baholash</div>
            </div>
          </div>
        </div>

        {/* Psychology Insights & Visual Infographics Gallery */}
        <PsychologyInsightsGallery 
          onOpenConsultModal={onOpenConsultModal} 
          setActiveTab={setActiveTab} 
        />

      </div>
    </div>
  );
}
