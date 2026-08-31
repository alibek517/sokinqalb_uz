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
  Check,
  Music,
  FileText,
  Download,
  Paperclip,
  ChevronRight,
  ChevronLeft
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
  const [activeLessonModalCourse, setActiveLessonModalCourse] = useState(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

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

  const activeLesson = activeLessonModalCourse?.lessons?.[activeLessonIndex] || activeLessonModalCourse?.lessons?.[0];

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

      {/* Featured Courses Banner */}
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
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button shadow-lg shadow-teal-500/25 cursor-pointer"
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
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
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
                  Dastur Tarkibi ({course.lessons?.length || course.lessons_count || 3} ta dars / seans):
                </span>
                {course.lessons?.map((lesson, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] text-slate-300">
                    <div className="flex items-center space-x-2 truncate">
                      {lesson.type === 'video' ? <Video className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" /> :
                       lesson.type === 'audio' ? <Music className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /> :
                       lesson.type === 'document' ? <FileText className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> :
                       <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />}
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono ml-2 flex-shrink-0">{lesson.duration || 'Tayyor'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {/* Learning / Lessons Player Button */}
              <button
                onClick={() => {
                  setActiveLessonModalCourse(course);
                  setActiveLessonIndex(0);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-teal-300 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 flex items-center justify-center space-x-1.5 transition-all shadow-sm cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>🎓 Darslarni O'rganish ({course.lessons?.length || 0} ta dars)</span>
              </button>

              {/* Purchase / Booking Button */}
              {course.is_free ? (
                <button
                  onClick={() => setActiveTab('diagnostic')}
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-1.5 shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Bepul Diagnostikadan Boshlash</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenPaymentModal(course)}
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-1.5 shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Kursga To'lov Qilish ({course.price})</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* FULL INTERACTIVE LMS COURSE LEARNING CENTER & MEDIA PLAYER MODAL */}
      {/* ========================================================================= */}
      {activeLessonModalCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="glass-panel max-w-4xl w-full rounded-2xl sm:rounded-3xl border border-teal-500/40 p-4 sm:p-6 space-y-5 shadow-2xl relative animate-scale-up bg-slate-900/95 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase tracking-wider">
                  <BookOpen className="w-3 h-3" />
                  <span>Sokin Qalb Ta'lim Platformasi</span>
                </div>
                <h3 className="text-base sm:text-xl font-black text-white">
                  {activeLessonModalCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLessonModalCourse(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Course Player Layout: Sidebar + Main Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: Lesson Playlist (4 cols on desktop) */}
              <div className="lg:col-span-4 space-y-2 order-2 lg:order-1">
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between px-1">
                  <span>Darslar Mundarijasi</span>
                  <span className="text-[10px] text-teal-400 font-mono">{activeLessonIndex + 1} / {activeLessonModalCourse.lessons?.length || 1}</span>
                </div>

                <div className="space-y-2 max-h-60 lg:max-h-96 overflow-y-auto pr-1">
                  {activeLessonModalCourse.lessons?.map((lesson, idx) => {
                    const isActive = activeLessonIndex === idx;
                    const isVideo = lesson.type === 'video';
                    const isAudio = lesson.type === 'audio';
                    const isDoc = lesson.type === 'document';
                    return (
                      <button
                        key={lesson.id || idx}
                        type="button"
                        onClick={() => setActiveLessonIndex(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center space-x-2.5 cursor-pointer ${
                          isActive
                            ? 'bg-teal-500/20 border-teal-400/80 text-white shadow-md shadow-teal-500/10'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          isActive ? 'bg-teal-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isVideo ? <Video className="w-3.5 h-3.5" /> :
                           isAudio ? <Music className="w-3.5 h-3.5" /> :
                           isDoc ? <FileText className="w-3.5 h-3.5" /> :
                           <span>{idx + 1}</span>}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold truncate leading-tight">{lesson.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{lesson.duration || 'Tayyor'}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Media Player Stage (8 cols on desktop) */}
              <div className="lg:col-span-8 space-y-4 order-1 lg:order-2">
                {activeLesson ? (
                  <div className="space-y-3">
                    
                    {/* Media Viewer Area */}
                    <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                      {activeLesson.type === 'video' && (
                        <div className="aspect-video w-full bg-black/90 flex items-center justify-center relative">
                          {(activeLesson.mediaData || activeLesson.mediaUrl) ? (
                            <video
                              src={activeLesson.mediaData || activeLesson.mediaUrl}
                              controls
                              playsInline
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="text-center p-6 space-y-3">
                              <div className="w-14 h-14 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
                                <Play className="w-7 h-7 fill-indigo-400 ml-1" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white">Furqat Bag'ibekov: Video-Darslik</div>
                                <p className="text-xs text-slate-400 mt-1">Ushbu darslik administrator tomonidan tez orada yuklanadi.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeLesson.type === 'audio' && (
                        <div className="p-6 bg-gradient-to-br from-slate-900 to-amber-950/40 space-y-4 text-center">
                          <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                            <Music className="w-7 h-7" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{activeLesson.title}</div>
                            <p className="text-xs text-slate-400 mt-0.5">Ovozli psixoterapevtik amaliyot (432Hz chastotada)</p>
                          </div>
                          {(activeLesson.mediaData || activeLesson.mediaUrl) && (
                            <audio
                              src={activeLesson.mediaData || activeLesson.mediaUrl}
                              controls
                              className="w-full mt-2"
                            />
                          )}
                        </div>
                      )}

                      {activeLesson.type === 'document' && (
                        <div className="p-6 bg-gradient-to-br from-slate-900 to-emerald-950/40 space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-white truncate">{activeLesson.fileName || activeLesson.title}</div>
                              <div className="text-xs text-slate-400">{activeLesson.fileSize || 'PDF / Word Hujjat'}</div>
                            </div>
                          </div>
                          {(activeLesson.mediaData || activeLesson.mediaUrl) ? (
                            <a
                              href={activeLesson.mediaData || activeLesson.mediaUrl}
                              download={activeLesson.fileName || 'darslik_qollanma'}
                              className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
                            >
                              <Download className="w-4 h-4" />
                              <span>📥 Hujjat Faylini Yuklab Olish ({activeLesson.fileSize || 'Fayl'})</span>
                            </a>
                          ) : (
                            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                              Hujjat tayyorlanmoqda va markaz tomonidan biriktiriladi.
                            </div>
                          )}
                        </div>
                      )}

                      {activeLesson.type === 'text' && (
                        <div className="p-6 bg-slate-900/90 space-y-2">
                          <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">📝 Matnli Darslik</div>
                          <div className="text-sm font-bold text-white">{activeLesson.title}</div>
                        </div>
                      )}
                    </div>

                    {/* Lesson Description & Guidelines */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-teal-300">💡 Dars Ko'rsatmasi & Tavsiyalar:</div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeLesson.description || "Ushbu darsda ko'rsatilgan amaliyotlarni to'liq bajarib, kun davomida nafas mashqlarini takrorlang."}
                      </p>
                      {activeLesson.actionTask && (
                        <div className="p-2.5 rounded-xl bg-teal-950/50 border border-teal-500/30 text-xs text-teal-200 font-semibold flex items-center space-x-2 mt-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                          <span>Uy vazifasi: {activeLesson.actionTask}</span>
                        </div>
                      )}
                    </div>

                    {/* Pagination Navigation */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        disabled={activeLessonIndex === 0}
                        onClick={() => setActiveLessonIndex(prev => Math.max(0, prev - 1))}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 border transition-all cursor-pointer ${
                          activeLessonIndex === 0
                            ? 'opacity-40 border-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Oldingi Dars</span>
                      </button>

                      <button
                        type="button"
                        disabled={activeLessonIndex === (activeLessonModalCourse.lessons?.length || 1) - 1}
                        onClick={() => setActiveLessonIndex(prev => Math.min((activeLessonModalCourse.lessons?.length || 1) - 1, prev + 1))}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 border transition-all cursor-pointer ${
                          activeLessonIndex === (activeLessonModalCourse.lessons?.length || 1) - 1
                            ? 'opacity-40 border-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-teal-500/20 border-teal-500/40 text-teal-200 hover:bg-teal-500/30'
                        }`}
                      >
                        <span>Keyingi Dars</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-400 text-xs">Darslik topilmadi</div>
                )}
              </div>

            </div>

            {/* Modal Bottom CTA */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-3 flex-wrap gap-2">
              <div className="text-xs text-slate-400">
                Savollaringiz bo'lsa: <span className="text-teal-300 font-bold">@sokinqalb_admin</span>
              </div>
              <div className="flex items-center space-x-2">
                {!activeLessonModalCourse.is_free && (
                  <button
                    onClick={() => {
                      const course = activeLessonModalCourse;
                      setActiveLessonModalCourse(null);
                      onOpenPaymentModal(course);
                    }}
                    className="px-4 py-2 rounded-xl font-bold text-xs text-white glowing-button cursor-pointer"
                  >
                    To'liq Kursga A'zo Bo'lish
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveLessonModalCourse(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 cursor-pointer"
                >
                  Yopish
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
