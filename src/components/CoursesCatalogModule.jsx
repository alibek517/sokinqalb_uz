import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  CreditCard, 
  PhoneCall, 
  X,
  Clock,
  Video,
  Check
} from 'lucide-react';
import { INITIAL_COURSES } from '../data/initialData';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';

export default function CoursesCatalogModule({ onOpenPaymentModal, onOpenConsultModal, setActiveTab }) {
  const [courses] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_courses_list');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [filterCategory, setFilterCategory] = useState('all');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'free', label: '🌿 Bepul Kurslar' },
    { id: 'paid', label: '💎 Amaliy Kurslar' },
    { id: 'sessions', label: '🔬 Seanslar (Xitoy & Fransiya)' },
    { id: 'retreat', label: '🏔 Tog\' Retreatlari' },
  ];

  const filteredCourses = courses.filter((c) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'free') return c.is_free || c.price === "0 so'm (Bepul)";
    if (filterCategory === 'paid') return !c.is_free && !c.course_key.includes('retreat') && !c.course_key.includes('capsule');
    if (filterCategory === 'sessions') return c.course_key.includes('capsule') || c.course_key.includes('neuro');
    if (filterCategory === 'retreat') return c.course_key.includes('retreat');
    return true;
  });

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 w-full">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
          <span>Ta'lim & Davolash Dasturlari</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Kurslar, Seanslar va Tog' Retreatlari
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
          Bag'ibekov Furqatning dori-darmonsiz, tizimli psixoterapevtik video-kurslari va amaliyotlari
        </p>
      </div>

      {/* Featured Courses Banner with Custom Furqat Educator Portrait on Right (O'ng Tarafda) */}
      <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-teal-500/25 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full badge-indigo text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mualliflik Ta'lim & Transformatsiya Dasturlari</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white leading-tight">
              Ong Osti Qo'rquvlari va Panik Atakani 100% Yengish
            </h3>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Barcha video-darslar va amaliyotlar Bag'ibekov Furqatning 12 yillik klinik amaliyoti asosida ishlab chiqilgan bo'lib, chuqur ruhiy xotirjamlik va yangi tafakkur beradi.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => setFilterCategory('free')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button shadow-lg shadow-teal-500/25"
              >
                🌿 Bepul Darslardan Boshlash
              </button>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <FurqatDoctorPortrait imageSrc="/furqat_courses.jpg" size="wide" direction="right" />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              filterCategory === cat.id
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                : 'glass-card text-slate-300 hover:text-white border-white/[0.06]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-stretch">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="glass-panel rounded-2xl sm:rounded-3xl border border-white/[0.08] p-4 sm:p-6 flex flex-col justify-between group shadow-xl hover:border-teal-500/40 transition-all duration-300"
          >
            <div>
              {/* Header Badge & Price */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full badge-teal">
                  {course.is_free ? "🎁 BEPUL" : "💎 PREMIUM DASTUR"}
                </span>
                <span className="text-sm sm:text-lg font-black text-teal-300">
                  {course.price}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-xl font-bold text-white mb-2 leading-snug">
                {course.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {course.description}
              </p>

              {/* Features checklist */}
              <div className="space-y-1.5 mb-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Dastur Tarkibi ({course.lessons_count} ta dars / seans):
                </span>
                {course.lessons.map((lesson, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] text-slate-300">
                    <div className="flex items-center space-x-2 truncate">
                      <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono ml-2 flex-shrink-0">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {/* Video Preview Button */}
              <button
                onClick={() => setActiveVideoModal(course)}
                className="w-full py-2.5 rounded-xl font-semibold text-xs text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 flex items-center justify-center space-x-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-teal-300" />
                <span>Namunaviy Darsni Ko'rish</span>
              </button>

              {/* Purchase / Booking Button */}
              {course.is_free ? (
                <button
                  onClick={() => setActiveTab('diagnostic')}
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-1.5 shadow-md shadow-teal-500/20 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Bepul O'rganishni Boshlash</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenPaymentModal(course)}
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-1.5 shadow-md shadow-teal-500/20 active:scale-95"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Kursga To'lov Qilish ({course.price})</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Video Preview Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 animate-fade-in">
          <div className="glass-panel max-w-2xl w-full rounded-2xl sm:rounded-3xl border border-teal-500/30 p-4 sm:p-6 space-y-4 shadow-2xl relative animate-scale-up">
            
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">Namunaviy Darslik</span>
              <h3 className="text-base sm:text-xl font-bold text-white">{activeVideoModal.title}</h3>
            </div>

            {/* Video Player Mock */}
            <div className="aspect-video w-full rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/30 cursor-pointer group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-slate-950 ml-1" />
              </div>
              <p className="text-xs text-slate-400 mt-3">Furqat Bag'ibekov klinik video-darsligi (Treyler)</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  const course = activeVideoModal;
                  setActiveVideoModal(null);
                  if (course.is_free) {
                    setActiveTab('diagnostic');
                  } else {
                    onOpenPaymentModal(course);
                  }
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button shadow-lg shadow-teal-500/25"
              >
                {activeVideoModal.is_free ? "Diagnostikadan O'tish" : "To'liq Kursni Xarid Qilish"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
