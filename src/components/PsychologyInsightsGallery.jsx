import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  ZoomIn, 
  X, 
  ArrowRight, 
  HeartHandshake, 
  ShieldCheck, 
  PhoneCall,
  Brain,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function PsychologyInsightsGallery({ onOpenConsultModal, setActiveTab }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const infographics = [
    {
      id: 1,
      title: "Ichki Holat — Tashqi Dunyo",
      subtitle: "Ichki Xaos va Tashqi Voqelik O'rtasidagi Bog'liqlik",
      description: "Bizning ichki dunyomiz tashqi voqelikni yaratadi. Agar ichingizda tartibsizlik va stress bo'lsa, tashqi hayotingizda ham xuddi shunday vaziyatlar yuzaga keladi.",
      image: "/infographic_inner_chaos.jpg",
      tag: "Ong Osti Qonuniyatlari",
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-300"
    },
    {
      id: 2,
      title: "Haqiqiy O'zgarish Sening Ichingda!",
      subtitle: "Ichki Programmalarni Yangilash & Yangi Hayot",
      description: "Atrofimizda imkoniyatlar ko'p, ammo ong osti bloklari ularni ko'rishga to'sqinlik qiladi. Ichki dasturlaringizni o'zgartirsangiz, butun hayotingiz o'zgaradi.",
      image: "/infographic_inner_transformation.png",
      tag: "Transformatsiya",
      color: "from-teal-500/20 to-cyan-500/20",
      borderColor: "border-teal-500/30",
      textColor: "text-teal-300"
    },
    {
      id: 3,
      title: "Kimni Chaqirasiz? (Munosabatlar Matritsasi)",
      subtitle: "Qutqaruvchi, Qurbon va Mas'uliyat Ssenariylari",
      description: "Qanday ichki dasturda yashasangiz, hayotingizga shunday insonlar kirib keladi: Haddan tashqari mas'uliyatli bo'lsangiz mas'uliyatsiz, Qutqaruvchi bo'lsangiz qurbon tortiladi.",
      image: "/infographic_relationships_matrix.png",
      tag: "Munosabatlar Psixologiyasi",
      color: "from-indigo-500/20 to-purple-500/20",
      borderColor: "border-indigo-500/30",
      textColor: "text-indigo-300"
    }
  ];

  return (
    <section className="py-12 sm:py-20 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
        
        {/* Section Title */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5 text-teal-400" />
            <span>Mualliflik Psixologik Infografikalari</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bag'ibekov Furqatning Amaliy Psixologik Tahlillari
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Ong osti dasturlari, oilaviy munosabatlar va ichki erkinlikka erishishning ko'rgazmali tahlillari
          </p>
        </div>

        {/* 3 Visual Infographics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {infographics.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`glass-panel rounded-3xl border ${item.borderColor} overflow-hidden flex flex-col justify-between group shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-slate-900/90`}
            >
              <div>
                {/* Image Container with Zoom Badge */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Tag & Zoom Icon */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-md">
                      {item.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6 space-y-2.5">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-teal-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-4 sm:p-6 pt-0">
                <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 group-hover:text-teal-300">
                  <span>To'liq tahlilni ko'rish</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Clinic Consultation Showcase Banner (Using furqat_office_suit.jpg & furqat_office_casual.jpg) */}
        <div className="glass-panel rounded-3xl border border-teal-500/30 p-6 sm:p-10 bg-gradient-to-r from-slate-900/95 via-[#0b1526]/95 to-slate-900/95 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5 text-teal-300" />
                <span>Individual Shaxsiy Qabul</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Bag'ibekov Furqat Qabuliga Yoziling
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                12 yillik klinik tajriba asosida, shaxsiy suhbat orqali hayotingizdagi psixosomatik bloklar, 
                vahima, panik ataka va munosabatlardagi to'siqlarni 100% dori-darmonsiz ildizidan ochib beramiz.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Xitoy Kapsulasi Seansi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Fransiya Neyro-Lampasi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Ong Osti Psixodiagnostikasi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Maxsus 432Hz Neyromusiqa</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => onOpenConsultModal("Bag'ibekov Furqat")}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 active:scale-95 border border-teal-400/30"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Qabulga Yozilish</span>
                </button>
                <button
                  onClick={() => setActiveTab && setActiveTab('diagnostic')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 hover:text-white glass-card flex items-center justify-center space-x-2 active:scale-95 border border-white/10"
                >
                  <span>Bepul Diagnostika</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Photo Duo Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div 
                onClick={() => setSelectedImage({ title: "Bag'ibekov Furqat — Rasmiy Qabul", image: "/furqat_office_suit.jpg", description: "Sokin Qalb markazida shaxsiy psixoterapevtik qabul va diagnostika jarayoni." })}
                className="relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-teal-400/30 shadow-xl group cursor-pointer"
              >
                <img 
                  src="/furqat_office_suit.jpg" 
                  alt="Furqat Bag'ibekov Shaxsiy Qabul"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-[10px] sm:text-xs font-bold text-white truncate">
                  👨‍⚕️ Rasmiy Qabul
                </div>
              </div>

              <div 
                onClick={() => setSelectedImage({ title: "Bag'ibekov Furqat — Samimiy Muloqot", image: "/furqat_office_casual.jpg", description: "Mijozlar bilan ishonchli va xotirjam muhitdagi psixologik transformatsiya suhbati." })}
                className="relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-teal-400/30 shadow-xl group cursor-pointer mt-3 sm:mt-6"
              >
                <img 
                  src="/furqat_office_casual.jpg" 
                  alt="Furqat Bag'ibekov Muloqot"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-[10px] sm:text-xs font-bold text-white truncate">
                  🌿 Samimiy Muloqot
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Fullscreen High-Res Image Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-panel max-w-4xl w-full max-h-[92vh] overflow-y-auto rounded-3xl border border-teal-500/40 p-4 sm:p-6 bg-slate-900/98 shadow-2xl relative space-y-4"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">{selectedImage.title}</h3>
                {selectedImage.subtitle && (
                  <p className="text-xs text-teal-300 font-medium">{selectedImage.subtitle}</p>
                )}
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image */}
            <div className="rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center max-h-[60vh]">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="max-h-[60vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Description & Action */}
            <div className="space-y-3 pt-2">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedImage.description}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onOpenConsultModal("Bag'ibekov Furqat");
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Konsultatsiyaga Yozilish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
