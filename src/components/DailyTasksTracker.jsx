import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  Volume2, 
  Play, 
  Pause, 
  Smile, 
  Sparkles,
  Award,
  Save,
  Check,
  Music,
  Sunrise,
  Droplets,
  Activity,
  Footprints,
  Moon,
  Bot,
  RefreshCw,
  RotateCcw,
  Wand2,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOURLY_ROUTINE } from '../data/initialData';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';
import { 
  analyzeDailyCheckinWithGemini,
  generatePersonalizedRoutineWithAssistant 
} from '../services/geminiService';

export default function DailyTasksTracker() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_daily_tasks');
    return saved ? JSON.parse(saved) : HOURLY_ROUTINE.map(t => ({ ...t, isDone: false }));
  });

  const [moodScore, setMoodScore] = useState(() => {
    return parseInt(localStorage.getItem('sokinqalb_mood_score') || '7');
  });
  const [stressScore, setStressScore] = useState(() => {
    return parseInt(localStorage.getItem('sokinqalb_stress_score') || '4');
  });
  const [dailyNote, setDailyNote] = useState(() => {
    return localStorage.getItem('sokinqalb_daily_note') || '';
  });

  // AI Routine generator state
  const [situationText, setSituationText] = useState('');
  const [isGeneratingRoutine, setIsGeneratingRoutine] = useState(false);
  const [doctorRoutineMessage, setDoctorRoutineMessage] = useState(() => {
    return localStorage.getItem('sokinqalb_doctor_routine_msg') || '';
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioTimer, setAudioTimer] = useState(180); // 3 minutes
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [geminiFeedback, setGeminiFeedback] = useState(() => {
    return localStorage.getItem('sokinqalb_gemini_daily_feedback') || '';
  });
  const [isAnalyzingCheckin, setIsAnalyzingCheckin] = useState(false);

  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);

  // Real 432Hz Binaural Beat Web Audio Synthesizer
  const start432HzAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // 432Hz universal harmony + 436Hz binaural theta wave (4Hz difference)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, ctx.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(436, ctx.currentTime);

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(216, ctx.currentTime);

      // Smooth volume ramp
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      subOsc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      subOsc.start();

      oscillatorsRef.current = [osc1, osc2, subOsc];
      gainNodeRef.current = gainNode;
    } catch (e) {
      console.error("Audio Web API error:", e);
    }
  };

  const stop432HzAudio = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
      }
      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
        oscillatorsRef.current = [];
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
        audioCtxRef.current = null;
      }, 550);
    } catch (e) {
      console.error("Stop audio error:", e);
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stop432HzAudio();
      setIsPlayingAudio(false);
    } else {
      start432HzAudio();
      setIsPlayingAudio(true);
      setAudioTimer(180);
    }
  };

  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioTimer(prev => {
          if (prev <= 1) {
            stop432HzAudio();
            setIsPlayingAudio(false);
            return 180;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAudio, audioTimer]);

  useEffect(() => {
    return () => {
      stop432HzAudio();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('sokinqalb_daily_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (taskId) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const nextState = !t.isDone;
        if (nextState) {
          try {
            confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
          } catch (e) {}
        }
        return { ...t, isDone: nextState };
      }
      return t;
    });
    setTasks(updated);
  };

  // Generate Personalized Routine with Bag'ibekov Furqatning Yordamchisi
  const handleGenerateCustomRoutine = async (customSituation = null) => {
    const textToUse = customSituation || situationText || dailyNote;
    setIsGeneratingRoutine(true);
    try {
      const result = await generatePersonalizedRoutineWithAssistant(
        textToUse,
        moodScore,
        stressScore
      );

      if (result && Array.isArray(result.tasks) && result.tasks.length > 0) {
        const formattedTasks = result.tasks.map((t, idx) => ({
          ...t,
          id: t.id || `custom_task_${idx}`,
          isDone: false
        }));
        setTasks(formattedTasks);
        setDoctorRoutineMessage(result.doctorMessage || '');
        localStorage.setItem('sokinqalb_daily_tasks', JSON.stringify(formattedTasks));
        localStorage.setItem('sokinqalb_doctor_routine_msg', result.doctorMessage || '');

        try {
          confetti({ particleCount: 55, spread: 60, origin: { y: 0.5 } });
        } catch (e) {}
      }
    } catch (err) {
      console.warn("Generate routine error:", err);
    } finally {
      setIsGeneratingRoutine(false);
    }
  };

  const handleResetToDefaultRoutine = () => {
    const defaultTasks = HOURLY_ROUTINE.map(t => ({ ...t, isDone: false }));
    setTasks(defaultTasks);
    setDoctorRoutineMessage('');
    localStorage.setItem('sokinqalb_daily_tasks', JSON.stringify(defaultTasks));
    localStorage.removeItem('sokinqalb_doctor_routine_msg');
  };

  const handleSaveCheckin = async () => {
    localStorage.setItem('sokinqalb_mood_score', moodScore.toString());
    localStorage.setItem('sokinqalb_stress_score', stressScore.toString());
    localStorage.setItem('sokinqalb_daily_note', dailyNote);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    setIsAnalyzingCheckin(true);
    try {
      const feedback = await analyzeDailyCheckinWithGemini(
        moodScore,
        stressScore,
        dailyNote,
        completedCount,
        tasks.length
      );
      setGeminiFeedback(feedback);
      localStorage.setItem('sokinqalb_gemini_daily_feedback', feedback);
    } catch (err) {
      console.warn("Gemini checkin analysis failed:", err);
    } finally {
      setIsAnalyzingCheckin(false);
    }
  };

  const completedCount = tasks.filter(t => t.isDone).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const getTaskIcon = (idx) => {
    const icons = [
      <Sunrise className="w-5 h-5" />,
      <Droplets className="w-5 h-5" />,
      <Activity className="w-5 h-5" />,
      <Footprints className="w-5 h-5" />,
      <Moon className="w-5 h-5" />
    ];
    const gradients = [
      "from-amber-400 to-orange-500 shadow-orange-500/25",
      "from-cyan-400 to-blue-500 shadow-cyan-500/25",
      "from-teal-400 to-emerald-500 shadow-emerald-500/25",
      "from-emerald-400 to-green-600 shadow-green-500/25",
      "from-indigo-400 to-purple-600 shadow-purple-500/25"
    ];
    const safeIdx = idx % icons.length;

    return (
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradients[safeIdx]} flex items-center justify-center text-slate-950 shadow-md flex-shrink-0`}>
        {icons[safeIdx]}
      </div>
    );
  };

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 w-full">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-teal-400" />
          <span>Klinik Reabilitatsiya Tartibi</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Kunlik Psixologik Intizom & Reja
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
          Bag'ibekov Furqatning kun davomida asab tizimini bosqichma-bosqich tinchlantirish va tiklash jadvali
        </p>
      </div>

      {/* AI Personalized Routine Generator Card */}
      <div className="glass-panel p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-teal-500/35 shadow-2xl bg-slate-900/95 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-teal-300 font-bold text-sm sm:text-base">
              <Wand2 className="w-5 h-5 text-teal-400 animate-pulse" />
              <span>Bag'ibekov Furqatning Yordamchisidan Bugun Uchun Shaxsiy Reja Olish</span>
            </div>
            <p className="text-xs text-slate-300">
              Bugungi ruhiy va jismoniy holatingizni yozing — Yordamchi aynan sizning holatingizga mos individual shifobaxsh soatli jadval tuzib beradi.
            </p>
          </div>

          <button
            onClick={() => handleGenerateCustomRoutine()}
            disabled={isGeneratingRoutine}
            className="py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-2 shadow-lg shadow-teal-500/25 active:scale-95 cursor-pointer disabled:opacity-50 flex-shrink-0"
          >
            {isGeneratingRoutine ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-teal-200" />
                <span>Yordamchi Reja Tuzmoqda...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>🎯 Menga Mos Shaxsiy Reja Tuzish</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Situation Selector Chips */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Tezkor holatni tanlang yoki o'z so'zingiz bilan yozing:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "😫 Kuchli Charchoq & Stress", text: "Bugun kuchli charchoq, asabiy taranglik va ichki zo'riqish his qilyapman." },
              { label: "🤯 Ortiqcha Fikrlar & Vahima", text: "Miyamda ortiqcha xavotirli fikrlar to'xtamayapti, tinchlanish zarur." },
              { label: "⚡ Yuqori Energiya & Intizom", text: "Bugun diqqatimni jamlab, samarali va kuchli intizom bilan ishlashni xohlayman." },
              { label: "🌙 Uyqusizlik & Tana Qisilishi", text: "Yaxshi uxlay olmadim, yelka va bel mushaklarim qisilib turibdi." }
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSituationText(preset.text);
                  handleGenerateCustomRoutine(preset.text);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700 text-xs font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex gap-2">
            <input
              type="text"
              value={situationText}
              onChange={(e) => setSituationText(e.target.value)}
              placeholder="Masalan: Bugun muhim suhbat oldidan ichimda qo'rquv bor, tinchlanishim kerak..."
              className="flex-1 p-2.5 sm:p-3 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-400"
            />
            {doctorRoutineMessage && (
              <button
                type="button"
                onClick={handleResetToDefaultRoutine}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700 cursor-pointer whitespace-nowrap"
                title="Birlamchi standart rejani tiklash"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Standart Rejaga Qaytish</span>
              </button>
            )}
          </div>
        </div>

        {/* Doctor Note from AI after generation */}
        {doctorRoutineMessage && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 text-teal-200 text-xs sm:text-sm flex items-start space-x-2.5 animate-fade-in shadow-inner">
            <HeartHandshake className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-teal-300 block mb-0.5">Furqat Bag'ibekov Yo'riqnomasi:</span>
              <p className="leading-relaxed">{doctorRoutineMessage}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-start">
        
        {/* Left 2 Cols: Hourly Routine Tasks */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full">
          
          {/* Progress Summary Banner */}
          <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 shadow-xl">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20 flex-shrink-0">
                <Flame className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-bold text-white truncate">Bugungi Shaxsiy Intizom</h3>
                <p className="text-[11px] sm:text-xs text-teal-300">
                  {completedCount} / {tasks.length} ta amaliyot bajarildi
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="text-right">
                <span className="text-xl sm:text-3xl font-black text-white">{progressPercent}%</span>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                <div 
                  className="w-full h-full rounded-full border-4 border-teal-400 absolute top-[-4px] left-[-4px] transition-all"
                  style={{ clipPath: `polygon(0 0, 100% 0, 100% ${progressPercent}%, 0 ${progressPercent}%)` }}
                />
                <Award className="w-4 h-4 text-teal-300" />
              </div>
            </div>
          </div>

          {/* Task Items List */}
          <div className="space-y-3">
            {tasks.map((task, idx) => (
              <div
                key={task.id || idx}
                onClick={() => toggleTask(task.id)}
                className={`glass-card p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer border transition-all flex items-start space-x-3.5 sm:space-x-4 ${
                  task.isDone
                    ? 'border-teal-500/40 bg-teal-950/20 text-slate-300'
                    : 'border-white/[0.06] hover:border-teal-500/30 text-white bg-slate-900/80'
                }`}
              >
                {/* 3D Task Icon */}
                {getTaskIcon(idx)}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap mb-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold font-mono bg-slate-800/90 text-teal-300 border border-slate-700">
                      {task.time}
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-400">
                      {task.benefit}
                    </span>
                  </div>

                  <h4 className={`text-xs sm:text-base font-bold leading-snug ${
                    task.isDone ? 'line-through text-slate-400' : 'text-white'
                  }`}>
                    {task.title}
                  </h4>

                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {/* Custom Checkbox */}
                <button
                  type="button"
                  className={`mt-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center border transition-colors flex-shrink-0 cursor-pointer ${
                    task.isDone
                      ? 'bg-teal-400 border-teal-400 text-slate-950 font-bold'
                      : 'border-slate-600 hover:border-teal-400 text-transparent'
                  }`}
                  aria-label="Vazifani belgilash"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Right 1 Col: Daily Check-in & Audio Player */}
        <div className="space-y-4 sm:space-y-6 w-full">
          
          {/* Custom Tasks Portrait (O'ng Tarafda) */}
          <div className="flex justify-center">
            <FurqatDoctorPortrait imageSrc="/furqat_tasks.jpg" size="compact" direction="right" />
          </div>

          {/* Daily Check-in Widget */}
          <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/[0.08] space-y-4 shadow-xl bg-slate-900/90">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Smile className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">Kunlik Holat Check-in</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Bugun</span>
            </div>

            {/* Mood Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Ichki Kayfiyat:</span>
                <span className="text-teal-300">{moodScore} / 10 {moodScore >= 8 ? '😌 A\'lo' : moodScore >= 5 ? '😐 O\'rtacha' : '😔 Past'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={moodScore}
                onChange={(e) => setMoodScore(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Stress Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Stress / Xavotir Darajasi:</span>
                <span className={stressScore >= 7 ? 'text-rose-400' : stressScore >= 4 ? 'text-amber-400' : 'text-emerald-400'}>
                  {stressScore} / 10 {stressScore >= 7 ? '🔥 Yuqori' : stressScore >= 4 ? '⚠️ O\'rtacha' : '🌿 Xotirjam'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stressScore}
                onChange={(e) => setStressScore(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Note Area */}
            <div className="space-y-1.5">
              <label className="text-[11px] sm:text-xs font-bold text-slate-300">Bugungi Qisqa His-tuyg'ularingiz:</label>
              <textarea
                rows="3"
                value={dailyNote}
                onChange={(e) => setDailyNote(e.target.value)}
                placeholder="Bugun sizni nima xotirjam qildi yoki nima bezovta qildi?.."
                className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-400 resize-none"
              />
            </div>

            <button
              onClick={handleSaveCheckin}
              disabled={isAnalyzingCheckin}
              className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-1.5 shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isAnalyzingCheckin ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-teal-200" />
                  <span>Yordamchi Tahlil Qilmoqda...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Muvaffaqiyatli Saqlandi!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Holatni Saqlash & Tahlil Olish</span>
                </>
              )}
            </button>

            {/* Furqat Assistant Daily Feedback Box */}
            {geminiFeedback && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-teal-500/30 space-y-2 animate-fade-in shadow-inner">
                <div className="flex items-center space-x-2 text-teal-300 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Bag'ibekov Furqatning Yordamchisi Tavsiyasi:</span>
                </div>
                <div className="text-slate-200 text-[11px] sm:text-xs leading-relaxed whitespace-pre-wrap">
                  {geminiFeedback}
                </div>
              </div>
            )}
          </div>

          {/* Audio Player Widget — Real 432Hz Harmonic Synthesizer */}
          <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/30 space-y-3 bg-slate-900/90 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs sm:text-sm font-bold text-white">432Hz Neyro-Audio Amaliyot</h4>
              </div>
              {isPlayingAudio && (
                <div className="flex items-center space-x-1">
                  <span className="w-1 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
                </div>
              )}
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              Miya neyronlarini tinchlantiruvchi, Vagus nervini faollashtiruvchi 432Hz va 436Hz Teta to'lqinli garmonik audio meditatsiya.
            </p>

            {/* Audio Timer & Visualizer */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-500/20 flex items-center justify-between">
              <div className="flex items-center space-x-2 font-mono text-xs text-indigo-300">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {Math.floor(audioTimer / 60)}:{(audioTimer % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-500">(3 daqiqa)</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isPlayingAudio ? 'bg-emerald-500/20 text-emerald-300 animate-pulse' : 'bg-slate-800 text-slate-400'
              }`}>
                {isPlayingAudio ? 'Tinglanmoqda 🌿' : 'To\'xtatilgan'}
              </span>
            </div>

            <button
              onClick={handleToggleAudio}
              className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Audioni To'xtatish</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>432Hz Teta To'lqinni Tinglash</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
