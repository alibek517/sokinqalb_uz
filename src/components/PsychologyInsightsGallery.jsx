import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  CheckCircle2, 
  Filter 
} from 'lucide-react';

export default function PsychologyInsightsGallery({ onOpenConsultModal, setActiveTab }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const infographics = [
    {
      id: 1,
      category: "mindset",
      title: "Ichki Holat — Tashqi Dunyo",
      subtitle: "Ichki Xaos va Tashqi Voqelik O'rtasidagi Bog'liqlik",
      description: "Bizning ichki dunyomiz tashqi voqelikni yaratadi. Agar ichingizda tartibsizlik va stress bo'lsa, tashqi hayotingizda ham xuddi shunday vaziyatlar yuzaga keladi.",
      image: "/infographic_inner_chaos.jpg",
      tag: "Ong Osti Qonuniyatlari",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-300"
    },
    {
      id: 2,
      category: "transformation",
      title: "Haqiqiy O'zgarish Sening Ichingda!",
      subtitle: "Ichki Programmalarni Yangilash & Yangi Hayot",
      description: "Atrofimizda imkoniyatlar ko'p, ammo ong osti bloklari ularni ko'rishga to'sqinlik qiladi. Ichki dasturlaringizni o'zgartirsangiz, butun hayotingiz o'zgaradi.",
      image: "/infographic_inner_transformation.png",
      tag: "Transformatsiya",
      borderColor: "border-teal-500/30",
      textColor: "text-teal-300"
    },
    {
      id: 3,
      category: "relationships",
      title: "Kimni Chaqirasiz? (Munosabatlar Matritsasi)",
      subtitle: "Qutqaruvchi, Qurbon va Mas'uliyat Ssenariylari",
      description: "Qanday ichki dasturda yashasangiz, hayotingizga shunday insonlar kirib keladi: Haddan tashqari mas'uliyatli bo'lsangiz mas'uliyatsiz, Qutqaruvchi bo'lsangiz qurbon tortiladi.",
      image: "/infographic_relationships_matrix.png",
      tag: "Munosabatlar",
      borderColor: "border-indigo-500/30",
      textColor: "text-indigo-300"
    },
    {
      id: 4,
      category: "relationships",
      title: "O'z Programmamizning Aksi",
      subtitle: "Magnit Qonuni: Ichki Dastur va Erkakning Dasturi",
      description: "Biz ichki holatimizga mos keladigan odamlarni hayotimizga tortamiz. Dunyo va odamlar bizning ichki dasturlarimizning oynasidir. Bu haqiqat.",
      image: "/infographic_magnet_mirror.png",
      tag: "Moslik Qonuni",
      borderColor: "border-cyan-500/30",
      textColor: "text-cyan-300"
    },
    {
      id: 5,
      category: "mindset",
      title: "Ayblashning Befoydaligi",
      subtitle: "Tanqid va Xafagarchilik Illuziyasidan Chiqish",
      description: "Erkaklarni tanqid qilish, ulardan xafa bo'lish yoki ularni 'yomon' deb atashning ma'nosi yo'q. Bu shunchaki vaqtinchalik 'og'riq qoldiruvchi' vosita va sizning shaxsiy illyuziyangiz.",
      image: "/infographic_blaming_useless.png",
      tag: "Ruhiy Yetuklik",
      borderColor: "border-pink-500/30",
      textColor: "text-pink-300"
    }
  ];

  const categories = [
    { id: 'all', label: 'Barchasi (5 ta Dars)' },
    { id: 'mindset', label: '🧠 Ong Osti Qonunlari' },
    { id: 'relationships', label: '❤️ Munosabatlar Psixologiyasi' },
    { id: 'transformation', label: '✨ Shaxsiy O\'zgarish' }
  ];

  const filteredInfographics = infographics.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section className="py-12 sm:py-20 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Section Title */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5 text-teal-400" />
            <span>Mualliflik Psixologik Infografikalari</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bag'ibekov Furqatning Amaliy Psixologik Darslari
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Ong osti dasturlari, oilaviy munosabatlar va ichki erkinlikka erishishning ko'rgazmali infografikalari
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                    : 'glass-card text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Infographics Grid — Full Uncropped Poster View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredInfographics.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`glass-panel rounded-3xl border ${item.borderColor} overflow-hidden flex flex-col justify-between group shadow-2xl hover:scale-[1.02] hover:border-teal-400/60 transition-all duration-300 cursor-pointer bg-slate-900/95`}
            >
              <div>
                {/* Poster Image Container — 100% Full View Without Cropping */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950/80 flex items-center justify-center p-2 border-b border-white/[0.06]">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-contain rounded-2xl group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  
                  {/* Floating Tag & Quick Zoom Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-teal-300 border border-teal-500/30 shadow-lg">
                      {item.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-950/85 backdrop-blur-md border border-teal-400/40 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform shadow-lg">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 space-y-1.5">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-teal-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-4 sm:p-5 pt-0">
                <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 group-hover:text-teal-300">
                  <span>To'liq kattalashtirib o'qish</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* React Portal to document.body: 100% Guaranteed Absolute Monitor Screen Center */}
      {selectedImage && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 0 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-panel max-w-lg sm:max-w-xl w-full max-h-[88vh] rounded-3xl border border-teal-400/50 p-4 sm:p-6 bg-[#0b1322] shadow-[0_0_80px_rgba(0,0,0,0.95)] relative flex flex-col justify-between overflow-hidden animate-scale-up space-y-3"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 flex-shrink-0">
              <div className="min-w-0 pr-2">
                <h3 className="text-sm sm:text-lg font-black text-white truncate">{selectedImage.title}</h3>
                {selectedImage.subtitle && (
                  <p className="text-[11px] sm:text-xs text-teal-300 font-medium truncate">{selectedImage.subtitle}</p>
                )}
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex-shrink-0 cursor-pointer"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image Container — Centered & Scaled to Fit */}
            <div className="rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center flex-1 max-h-[44vh] sm:max-h-[50vh] border border-white/[0.06] p-1">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="max-h-[42vh] sm:max-h-[48vh] w-auto max-w-full object-contain rounded-xl drop-shadow-md"
              />
            </div>

            {/* Description & Action */}
            <div className="space-y-2.5 pt-1 flex-shrink-0">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/90 p-2.5 sm:p-3 rounded-xl border border-white/[0.05] max-h-24 overflow-y-auto">
                {selectedImage.description}
              </p>
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[10px] sm:text-[11px] text-teal-400/80 font-medium hidden sm:inline">
                  ✨ Sokin Qalb Mualliflik Metodikasi
                </span>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onOpenConsultModal("Bag'ibekov Furqat");
                  }}
                  className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 active:scale-95 border border-teal-400/30 ml-auto cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Konsultatsiyaga Yozilish</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
