import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  CheckCircle2, 
  PhoneCall, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Star,
  Check
} from 'lucide-react';
import { INITIAL_TEAM } from '../data/initialData';

export default function TeamHubModule({ onOpenConsultModal }) {
  const [teamMembers] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_team_members');
    return saved ? JSON.parse(saved) : INITIAL_TEAM;
  });

  const getDoctorPhoto = (member) => {
    if (member.member_key === 'furqat') return '/furqat_bagibekov.png';
    if (member.member_key === 'dilfuza') return '/dilfuza_muminova.png';
    if (member.member_key === 'temur') return '/temur_baydjanov.png';
    return member.photo_url || member.avatar_url || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80";
  };

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 w-full">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-teal-400" />
          <span>Professional Psixoterapevtlar</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Sokin Qalb Mutaxassislari Jamoasi
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
          Bag'ibekov Furqat boshchiligidagi yuqori toifali klinik psixoterapevtlar va neyropsixologlar
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-stretch">
        {teamMembers.map((member) => (
          <div 
            key={member.id}
            className="glass-panel rounded-3xl border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between group shadow-xl hover:border-teal-500/40 transition-all duration-300 bg-[#0d1627]/90"
          >
            <div className="space-y-5">
              
              {/* Doctor Photo Window - Crystal Clear, Tall Aspect Ratio, No Dark Text Overlay */}
              <div className="relative h-[340px] sm:h-[400px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/[0.06] shadow-inner">
                <img 
                  src={getDoctorPhoto(member)} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-103 transition-transform duration-700"
                />
                
                {/* Floating Experience Badge on Top Corner */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 border border-teal-500/30 shadow-lg">
                    {member.experience}
                  </span>
                </div>
              </div>

              {/* Doctor Title & Bio Details - Placed Cleanly Below the Photo */}
              <div className="space-y-4">
                
                {/* Name and Designation */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug group-hover:text-teal-200 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-300 font-semibold leading-relaxed">
                    {member.title}
                  </p>
                </div>

                {/* Methodology Breakdown */}
                <div className="space-y-1.5 pt-1 border-t border-slate-800">
                  <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider block">
                    🔬 Davolash Metodikasi
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-white/[0.05]">
                    {member.methodology}
                  </p>
                </div>

                {/* Directions / Specialization */}
                <div className="space-y-1.5">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    🎯 Asosiy Yo'nalishlari
                  </span>
                  <div className="space-y-1.5">
                    {member.directions.slice(0, 3).map((dir, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-[11px] sm:text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{dir}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-1.5">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    🏆 Erishilgan Natijalar
                  </span>
                  <div className="space-y-1">
                    {member.achievements.slice(0, 2).map((ach, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-[11px] sm:text-xs text-slate-400">
                        <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5 fill-amber-400" />
                        <span className="leading-snug">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Action Button */}
            <div className="pt-5 mt-4 border-t border-slate-800">
              <button
                onClick={() => onOpenConsultModal(member.name)}
                className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 active:scale-95 border border-teal-400/30"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Konsultatsiyaga Yozilish</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
