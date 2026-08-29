import React, { useState, useEffect } from 'react';
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
  Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOURLY_ROUTINE } from '../data/initialData';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';

export default function DailyTasksTracker() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_daily_tasks');
    return saved ? JSON.parse(saved) : HOURLY_ROUTINE.map(t => ({ ...t, isDone: false }));
  });

  const [moodScore, setMoodScore] = useState(() => {
    return parseInt(localStorage.getItem('sokinqalb_mood_score') || '8');
  });

  const [stressScore, setStressScore] = useState(() => {
    return parseInt(localStorage.getItem('sokinqalb_stress_score') || '3');
  });

  const [dailyNote, setDailyNote] = useState(() => {
    return localStorage.getItem('sokinqalb_daily_note') || '';
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

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

  const handleSaveCheckin = () => {
    localStorage.setItem('sokinqalb_mood_score', moodScore.toString());
    localStorage.setItem('sokinqalb_stress_score', stressScore.toString());
    localStorage.setItem('sokinqalb_daily_note', dailyNote);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const completedCount = tasks.filter(t => t.isDone).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const getTaskIcon = (taskId) => {
    switch (taskId) {
      case 'task_1':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 shadow-md shadow-orange-500/25 flex-shrink-0">
            <Sunrise className="w-5 h-5" />
          </div>
        );
      case 'task_2':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/25 flex-shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
        );
      case 'task_3':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/25 flex-shrink-0">
            <Activity className="w-5 h-5" />
          </div>
        );
      case 'task_4':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-slate-950 shadow-md shadow-green-500/25 flex-shrink-0">
            <Footprints className="w-5 h-5" />
          </div>
        );
      case 'task_5':
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-500/25 flex-shrink-0">
            <Moon className="w-5 h-5" />
          </div>
        );
    }
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-start">
        
        {/* Left 2 Cols: Hourly Routine Tasks */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full">
          
          {/* Progress Summary Banner */}
          <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20 flex-shrink-0">
                <Flame className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-bold text-white truncate">Bugungi Intizom</h3>
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
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`glass-card p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer border transition-all flex items-start space-x-3.5 sm:space-x-4 ${
                  task.isDone
                    ? 'border-teal-500/40 bg-teal-950/15 text-slate-300'
                    : 'border-white/[0.06] hover:border-teal-500/30 text-white'
                }`}
              >
                {/* Flaticon-style 3D Task Icon */}
                {getTaskIcon(task.id)}

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

                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {/* Custom Checkbox */}
                <button
                  type="button"
                  className={`mt-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center border transition-colors flex-shrink-0 ${
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
          <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/[0.08] space-y-4 shadow-xl">
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
                className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-400 resize-none"
              />
            </div>

            <button
              onClick={handleSaveCheckin}
              className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-1.5 shadow-md shadow-teal-500/20 active:scale-95"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Muvaffaqiyatli Saqlandi!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Holatni Saqlash</span>
                </>
              )}
            </button>
          </div>

          {/* Audio Player Widget */}
          <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/20 space-y-3">
            <div className="flex items-center space-x-2">
              <Music className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs sm:text-sm font-bold text-white">Neyro-Audio Amaliyot</h4>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              Miya neyronlarini tinchlantiruvchi 432Hz chastotali maxsus sokinlik melodiyasi
            </p>

            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                isPlayingAudio
                  ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                  : 'bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-4 h-4 text-rose-400" />
                  <span>Pauza (Audioni To'xtatish)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-indigo-400" />
                  <span>Amaliyotni Tinglash (3 daqiqa)</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
