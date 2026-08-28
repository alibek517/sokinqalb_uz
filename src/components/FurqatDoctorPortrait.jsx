import React from 'react';
import { Sparkles } from 'lucide-react';

export default function FurqatDoctorPortrait({ 
  imageSrc = "/furqat_hero.png",
  className = "", 
  size = "normal", // "normal" | "compact" | "wide"
  direction = "right", // "right" | "left"
  isFramed = false, // true on Bosh Sahifa (HeroSection), false on other pages
  showName = false  // true on Bosh Sahifa
}) {
  const heightClass = size === "compact" 
    ? "h-[320px] sm:h-[400px]" 
    : size === "wide" 
    ? "h-[420px] sm:h-[540px]" 
    : "h-[380px] sm:h-[460px]";

  // --- 1. HERO SECTION (BOSH SAHIFA): Asymmetrical Organic Frame + Floating Nameplate ---
  if (isFramed) {
    return (
      <div className={`w-full max-w-[380px] sm:max-w-[420px] relative select-none group ${className}`}>
        
        {/* Backlight Ambient Glow Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[340px] sm:h-[460px] bg-gradient-to-tr from-teal-500/35 via-cyan-500/25 to-indigo-500/25 blur-[85px] -z-10 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Asymmetrical Custom Organic Outer Frame (Bir tomoni ko'proq, bir tomoni kamroq) */}
        <div 
          className="relative p-[3px] bg-gradient-to-tr from-teal-400/60 via-cyan-400/40 to-indigo-500/50 shadow-2xl shadow-teal-500/20 group-hover:shadow-teal-500/35 transition-all duration-500 overflow-hidden"
          style={{
            borderRadius: "3.8rem 1.3rem 4.8rem 1.7rem",
          }}
        >
          {/* Inner Image Mask Container */}
          <div 
            className="relative h-[420px] sm:h-[540px] w-full overflow-hidden bg-gradient-to-b from-[#111e33] to-[#0a101d]"
            style={{
              borderRadius: "3.7rem 1.2rem 4.7rem 1.6rem",
            }}
          >
            <img 
              src={imageSrc} 
              alt="Bag'ibekov Furqat" 
              className="w-full h-full object-cover object-top filter contrast-[1.04] group-hover:scale-103 transition-transform duration-700"
            />
            {/* Subtle bottom shadow vignette so portrait integrates gracefully */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Floating Nameplate for Bosh Sahifa */}
        {showName && (
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 w-[88%] sm:w-[82%]">
            <div className="glass-panel px-4 py-2.5 rounded-2xl border border-teal-400/40 shadow-xl shadow-slate-950/60 text-center backdrop-blur-xl flex flex-col items-center justify-center space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-black text-white tracking-wide uppercase">
                  Bag'ibekov Furqat
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-teal-300 font-semibold">
                Psixoterapevt • Transformator
              </span>
            </div>
          </div>
        )}

      </div>
    );
  }

  // --- 2. BOSHQA SAHIFALAR (OTHER PAGES): Frameless, Nameless, Seamlessly Blended with Canvas ---
  return (
    <div className={`w-full max-w-[380px] relative select-none group flex items-center justify-center ${className}`}>
      
      {/* Backlight Ambient Glow Halo */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[360px] h-[300px] sm:h-[420px] bg-gradient-to-tr ${
        direction === 'left' 
          ? 'from-indigo-500/30 via-teal-500/25 to-cyan-400/25' 
          : 'from-teal-500/30 via-cyan-500/25 to-indigo-500/25'
      } blur-[80px] -z-10 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      
      {/* Seamless Portrait with Soft Transparent Bottom Gradient Mask (No Harsh Border/Frame, No Name Text) */}
      <div className={`relative ${heightClass} w-full flex items-end justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]`}>
        <img 
          src={imageSrc} 
          alt="Bag'ibekov Furqat" 
          className="w-full h-full object-cover object-top filter contrast-[1.03] drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] group-hover:scale-103 transition-transform duration-700 rounded-3xl"
        />
        {/* Soft bottom color transition matching page canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1726]/90 via-transparent to-transparent opacity-90 pointer-events-none" />
      </div>

    </div>
  );
}
