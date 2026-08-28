import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  CalendarCheck, 
  Compass, 
  Users, 
  BookOpen, 
  Gift, 
  MessageSquare, 
  ShieldCheck, 
  PhoneCall,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenConsultModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Bosh Sahifa', icon: Sparkles },
    { id: 'diagnostic', label: 'Diagnostika', icon: Brain },
    { id: 'tasks', label: 'Kunlik Reja', icon: CalendarCheck },
    { id: 'pillars', label: '4 Ustun', icon: Compass },
    { id: 'team', label: 'Jamoa', icon: Users },
    { id: 'courses', label: 'Kurslar', icon: BookOpen },
    { id: 'gifts', label: 'Sovg\'alar', icon: Gift },
    { id: 'ai-chat', label: 'AI Psixolog', icon: MessageSquare },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-[#0e1726]/90 backdrop-blur-2xl w-full shadow-2xl transition-all">
      <div className="max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-3 sm:gap-6">
          
          {/* Large Brand Logo & Title */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 sm:space-x-4 cursor-pointer group flex-shrink-0"
          >
            {/* Enlarged Logo Container */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white p-1 shadow-xl shadow-teal-500/20 group-hover:shadow-teal-400/50 group-hover:scale-105 transition-all flex-shrink-0 overflow-hidden border-2 border-teal-400/50 flex items-center justify-center">
              <img src="/logo.jpg" alt="Sokin Qalb Logo" className="w-full h-full object-contain rounded-xl" />
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-200 bg-clip-text text-transparent font-sans whitespace-nowrap drop-shadow-sm">
                  SOKIN QALB
                </span>
                <span className="hidden sm:inline text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 font-bold uppercase tracking-wider whitespace-nowrap">
                  Transformatsiya Markazi
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-teal-200/90 font-semibold tracking-wide whitespace-nowrap mt-0.5">
                Sog'lom Ong • Sog'lom Hayot
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs (with Larger Icons & Clearer Typography) */}
          <nav className="hidden xl:flex items-center space-x-1.5 bg-slate-900/80 p-2 rounded-2xl border border-white/10 shadow-inner backdrop-blur-md overflow-x-auto no-scrollbar max-w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer select-none ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500/35 to-cyan-500/35 text-white border border-teal-400/70 shadow-lg shadow-teal-500/30 ring-1 ring-teal-400/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isActive ? 'text-teal-300 animate-pulse' : 'text-teal-400/80'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={() => onOpenConsultModal()}
              className="flex items-center space-x-2.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white glowing-button shadow-lg shadow-teal-500/30 active:scale-95 border border-teal-300/40 whitespace-nowrap cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-teal-100 flex-shrink-0" />
              <span className="whitespace-nowrap">Qabulga Yozilish</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="xl:hidden flex items-center flex-shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-teal-500/40 focus:outline-none shadow-md"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-teal-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Frosted Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-b border-teal-500/20 px-4 pt-4 pb-6 space-y-2 max-h-[82vh] overflow-y-auto animate-fade-in bg-[#0e1726]/98 backdrop-blur-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/30 to-cyan-500/30 text-white border border-teal-400/50 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-teal-300' : 'text-teal-400/80'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenConsultModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2.5 px-4 py-3.5 rounded-2xl font-bold text-sm text-white glowing-button shadow-lg shadow-teal-500/35 border border-teal-300/40"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Qabulga Yozilish</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
