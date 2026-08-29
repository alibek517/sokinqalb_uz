import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DiagnosticModule from './components/DiagnosticModule';
import DailyTasksTracker from './components/DailyTasksTracker';
import FourPillarsModule from './components/FourPillarsModule';
import TeamHubModule from './components/TeamHubModule';
import CoursesCatalogModule from './components/CoursesCatalogModule';
import ReferralHubModule from './components/ReferralHubModule';
import AIChatAssistant from './components/AIChatAssistant';
import AdminPanelDashboard from './components/AdminPanelDashboard';
import ConsultBookingModal from './components/ConsultBookingModal';
import PaymentModal from './components/PaymentModal';

const getTabFromPath = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const validTabs = ['home', 'diagnostic', 'tasks', 'pillars', 'team', 'courses', 'gifts', 'ai-chat', 'admin'];
  if (validTabs.includes(path)) return path;
  if (path === 'diagnostika') return 'diagnostic';
  if (path === 'reja') return 'tasks';
  if (path === 'kurslar') return 'courses';
  if (path === 'jamoa') return 'team';
  if (path === 'sovg\'alar' || path === 'sovgalar') return 'gifts';
  if (path === 'psixolog' || path === 'chat') return 'ai-chat';
  return 'home';
};

export default function App() {
  const [activeTab, setActiveTabState] = useState(getTabFromPath);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [consultDoctor, setConsultDoctor] = useState("Bag'ibekov Furqat");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null);

  // Synchronize Tab and URL Path with instant scroll to top
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    const newPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab }, '', newPath);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Listen for browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPath();
      setActiveTabState(tab);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Always scroll to top on initial page load / refresh
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleOpenConsult = (doctorName = "Bag'ibekov Furqat") => {
    setConsultDoctor(doctorName);
    setIsConsultOpen(true);
  };

  const handleOpenPayment = (course) => {
    setSelectedCourseForPayment(course);
    setIsPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col selection:bg-teal-500/30 selection:text-teal-200 relative overflow-x-hidden">
      
      {/* Dynamic Animated Ambient Background Orbs (Gamma Style) */}
      <div className="fixed top-12 left-1/4 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-gradient-to-tr from-teal-500/15 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none rounded-full animate-pulse-glow -z-10" />
      <div className="fixed top-1/3 right-10 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent blur-[160px] pointer-events-none rounded-full animate-pulse-glow -z-10" style={{ animationDelay: '2s' }} />
      <div className="fixed bottom-20 left-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-transparent blur-[150px] pointer-events-none rounded-full animate-pulse-glow -z-10" style={{ animationDelay: '3.5s' }} />

      {/* Top Fixed Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenConsultModal={handleOpenConsult}
      />

      {/* Main Content Viewport with Gamma-style Slide-up Smooth Entrance */}
      <main key={activeTab} className="flex-1 w-full animate-slide-up">
        {activeTab === 'home' && (
          <HeroSection 
            setActiveTab={setActiveTab} 
            onOpenConsultModal={handleOpenConsult}
          />
        )}

        {activeTab === 'diagnostic' && (
          <DiagnosticModule 
            setActiveTab={setActiveTab} 
            onOpenConsultModal={handleOpenConsult}
          />
        )}

        {activeTab === 'tasks' && (
          <DailyTasksTracker />
        )}

        {activeTab === 'pillars' && (
          <FourPillarsModule setActiveTab={setActiveTab} />
        )}

        {activeTab === 'team' && (
          <TeamHubModule onOpenConsultModal={handleOpenConsult} />
        )}

        {activeTab === 'courses' && (
          <CoursesCatalogModule 
            onOpenPaymentModal={handleOpenPayment} 
            onOpenConsultModal={handleOpenConsult}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'gifts' && (
          <ReferralHubModule setActiveTab={setActiveTab} />
        )}

        {activeTab === 'ai-chat' && (
          <AIChatAssistant onOpenConsultModal={handleOpenConsult} />
        )}

        {activeTab === 'admin' && (
          <AdminPanelDashboard />
        )}
      </main>

      {/* Luxury Modern Footer */}
      <footer className="glass-panel border-t border-white/[0.08] pt-10 sm:pt-16 pb-8 sm:pb-12 mt-16 sm:mt-28 w-full bg-[#0a101d]/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Main Footer 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Col 1: Brand Info & Mission (5 cols) */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-white p-1 overflow-hidden flex-shrink-0 border border-white/20 shadow-lg shadow-teal-500/10">
                  <img src="/logo.jpg" alt="Sokin Qalb" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight whitespace-nowrap">
                      SOKIN QALB
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 font-bold uppercase tracking-wider whitespace-nowrap">
                      Transformatsiya Markazi
                    </span>
                  </div>
                  <p className="text-xs text-teal-300/90 font-semibold tracking-wide mt-0.5">Sog'lom Ong • Sog'lom Hayot</p>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                100% dori-darmonsiz, surunkali stress, panik ataka, vahima va tana psixosomatik qisilishlarini Xitoy Kapsulasi, Fransiya neyro-lampasi va neyro-akustik musiqa bilan ildizidan davolash markazi.
              </p>
            </div>

            {/* Col 2: Navigation Links (3 cols) */}
            <div className="md:col-span-3 space-y-3 text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span>Asosiy Bo'limlar</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
                <button onClick={() => setActiveTab('diagnostic')} className="text-left hover:text-teal-300 transition-colors py-1 whitespace-nowrap">Diagnostika</button>
                <button onClick={() => setActiveTab('tasks')} className="text-left hover:text-teal-300 transition-colors py-1 whitespace-nowrap">Kunlik Reja</button>
                <button onClick={() => setActiveTab('pillars')} className="text-left hover:text-teal-300 transition-colors py-1 whitespace-nowrap">4 Ustun</button>
                <button onClick={() => setActiveTab('team')} className="text-left hover:text-teal-300 transition-colors py-1 whitespace-nowrap">Jamoa</button>
                <button onClick={() => setActiveTab('courses')} className="text-left hover:text-teal-300 transition-colors py-1 whitespace-nowrap">Kurslar</button>
                <button onClick={() => setActiveTab('gifts')} className="text-left hover:text-teal-300 transition-colors py-1 whitespace-nowrap">Sovg'alar</button>
                <button onClick={() => setActiveTab('ai-chat')} className="text-left hover:text-teal-300 transition-colors py-1 whitespace-nowrap">AI Psixolog</button>
                <button onClick={() => setActiveTab('admin')} className="text-left text-indigo-400 hover:text-indigo-300 font-bold transition-colors py-1 whitespace-nowrap">Admin Panel</button>
              </div>
            </div>

            {/* Col 3: Official Social Channels (4 cols) */}
            <div className="md:col-span-4 space-y-3 text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Rasmiy Ijtimoiy Tarmoqlar</span>
              </h4>
              
              <div className="space-y-2.5">
                {/* Telegram Channel */}
                <a
                  href="https://t.me/sokin_qalb_rasmiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-200 transition-all shadow-sm active:scale-98 group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform flex-shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.716-.962 4.084-1.362 5.753-.169.707-.493.944-.805.967-.678.051-1.192-.451-1.849-.882-1.028-.675-1.609-1.096-2.607-1.754-1.153-.76-.406-1.178.252-1.864.172-.179 3.161-2.897 3.22-3.146.007-.031.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.429-.009-1.252-.242-1.865-.441-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.664 3.498-1.524 5.831-2.529 7.001-3.015 3.332-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.094.036.309.02.476z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white whitespace-nowrap">Telegram Rasmiy Kanal</div>
                      <div className="text-[10px] text-sky-400 font-mono truncate">@sokin_qalb_rasmiy</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-sky-300 font-semibold px-2 py-0.5 rounded-md bg-sky-500/20 whitespace-nowrap flex-shrink-0 ml-2">A'zo bo'lish →</span>
                </a>

                {/* Instagram Profile */}
                <a
                  href="https://www.instagram.com/sokinqalb_tm?igsi=MTZyOGY0eDVnY25mdA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-pink-500/25 text-pink-200 transition-all shadow-sm active:scale-98 group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform flex-shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white whitespace-nowrap">Instagram Sahifa</div>
                      <div className="text-[10px] text-pink-400 font-mono truncate">@sokinqalb_tm</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-pink-300 font-semibold px-2 py-0.5 rounded-md bg-pink-500/20 whitespace-nowrap flex-shrink-0 ml-2">Kuzatish →</span>
                </a>

                {/* Administrator Contact */}
                <a
                  href="https://t.me/sokinqalb_admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:border-teal-400 transition-all shadow-sm active:scale-98 group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-xs">☎️</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white whitespace-nowrap">Markaz Administratori</div>
                      <div className="text-[10px] text-teal-400 font-mono truncate">@sokinqalb_admin</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-teal-300 font-semibold px-2 py-0.5 rounded-md bg-teal-500/20 whitespace-nowrap flex-shrink-0 ml-2">Bog'lanish →</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Status Bar */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} <b className="text-slate-300">Sokin Qalb Transformatsiya Markazi</b>. Barcha huquqlar himoyalangan.
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Toshkent, O'zbekiston</span>
              </span>
              <span>•</span>
              <span>100% Dori-darmonsiz Davolash</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Global Modals */}
      <ConsultBookingModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        selectedDoctor={consultDoctor}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        course={selectedCourseForPayment}
      />

    </div>
  );
}
