import React, { useState } from 'react';
import { 
  Brain, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ShieldAlert, 
  Activity,
  Heart,
  Zap,
  CalendarCheck,
  PhoneCall,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DIAGNOSTIC_QUESTIONS } from '../data/initialData';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';

export default function DiagnosticModule({ setActiveTab, onOpenConsultModal }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(() => {
    return !!localStorage.getItem('sokinqalb_diagnostic_result');
  });
  const [savedResult, setSavedResult] = useState(() => {
    const data = localStorage.getItem('sokinqalb_diagnostic_result');
    return data ? JSON.parse(data) : null;
  });

  const handleSelectOption = (questionId, option) => {
    const updatedAnswers = {
      ...answers,
      [questionId]: option
    };
    setAnswers(updatedAnswers);

    if (currentStep < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateFinalResults(updatedAnswers);
    }
  };

  const calculateFinalResults = (allAnswers) => {
    let totalScore = 0;
    let riskCount = 0;

    Object.values(allAnswers).forEach((opt) => {
      totalScore += opt.score;
      if (opt.risk > 0) riskCount += opt.risk;
    });

    const averagePercent = Math.round((totalScore / (DIAGNOSTIC_QUESTIONS.length * 10)) * 100);
    const hasRisk = riskCount >= 4 || averagePercent < 50;

    let diagnosisLevel = "Yuqori Ichki Barqarorlik";
    let summaryText = "Sizning ruhiy va jismoniy holatingiz juda yaxshi barqaror holatda. Kichik stresslarni profilaktika va Vagus nafas mashqlari bilan oson boshqara olasiz.";

    if (averagePercent < 40 || riskCount >= 6) {
      diagnosisLevel = "Surunkali Stress va Ong Osti Bloklari";
      summaryText = "Sizda uzoq vaqt to'plangan emotsional charchoq, tana psixosomatik qisilishlari va yuqori xavotir darajasi aniqlandi. Furqat Bag'ibekovning Kapsulaterapiya va neyro-lampasi orqali chuqur tiklanish tavsiya etiladi.";
    } else if (averagePercent < 70) {
      diagnosisLevel = "O'rtacha Hissiy Taranglik & Charchoq";
      summaryText = "Kundalik vazifalar va ortiqcha fikrlar sizda hissiy zo'riqish uyg'otmoqda. Kunlik soatlik reja va 3 bosqichli video-amaliyotlar orqali barqarorlikni tiklash mumkin.";
    }

    const resultData = {
      scorePercent: averagePercent,
      riskCount,
      hasRisk,
      diagnosisLevel,
      summaryText,
      completedAt: new Date().toLocaleDateString('uz-UZ')
    };

    localStorage.setItem('sokinqalb_diagnostic_result', JSON.stringify(resultData));
    setSavedResult(resultData);
    setIsCompleted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleRetake = () => {
    localStorage.removeItem('sokinqalb_diagnostic_result');
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    setSavedResult(null);
  };

  const currentQ = DIAGNOSTIC_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / DIAGNOSTIC_QUESTIONS.length) * 100);

  return (
    <div className="py-8 sm:py-16 max-w-6xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 w-full">
      
      {/* Module Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <Brain className="w-3.5 h-3.5 text-teal-400" />
          <span>Klinik Ekspress Test</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ong Osti va Stress Diagnostikasi
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
          Bag'ibekov Furqatning 12 yillik klinik amaliyotiga asoslangan 10 ta aniqlovchi savol
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        
        {/* Left: Custom Diagnostic Portrait (Chap Tarafda) */}
        <div className="lg:col-span-4 flex justify-center lg:justify-start">
          <FurqatDoctorPortrait imageSrc="/furqat_diagnostic.jpg" size="wide" direction="left" />
        </div>

        {/* Right: Quiz / Results */}
        <div className="lg:col-span-8 w-full">
          {!isCompleted ? (
            /* QUIZ CARD */
            <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6 sm:space-y-8 animate-fade-in w-full">
              
              {/* Progress Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-teal-300 font-bold">
                    Savol {currentStep + 1} / {DIAGNOSTIC_QUESTIONS.length}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {progressPercent}% yakunlandi
                  </span>
                </div>
            
            <div className="h-2 w-full bg-slate-900/80 rounded-full overflow-hidden border border-white/[0.05]">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 rounded-full shadow-sm shadow-teal-500/50"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs font-bold text-indigo-300 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-wider">
              {currentQ.category}
            </span>
            <h3 className="text-base sm:text-2xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-2.5 sm:gap-3.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id]?.text === opt.text;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt)}
                  className={`w-full p-3.5 sm:p-5 rounded-xl sm:rounded-2xl text-left transition-all flex items-center justify-between group border ${
                    isSelected
                      ? 'bg-teal-500/20 border-teal-400 text-white shadow-md shadow-teal-500/10'
                      : 'glass-card border-white/[0.06] text-slate-200 hover:border-teal-500/40 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'border-teal-400 bg-teal-400 text-slate-950 font-bold'
                        : 'border-slate-600 group-hover:border-teal-400 text-transparent'
                    }`}>
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-xs sm:text-base font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-300 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                </button>
              );
            })}
          </div>

          {/* Step back helper */}
          {currentStep > 0 && (
            <div className="flex justify-start pt-2">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs text-slate-400 hover:text-white font-medium flex items-center space-x-1"
              >
                <span>← Oldingi savol</span>
              </button>
            </div>
          )}

        </div>
      ) : (
        /* RESULTS CARD */
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-teal-500/30 shadow-2xl space-y-6 sm:space-y-8 animate-scale-up w-full">
          
          {/* Result Header Badge */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-teal-500/10 border border-teal-400/30 text-teal-300 flex items-center justify-center mx-auto shadow-xl shadow-teal-500/15">
              <Sparkles className="w-7 h-7 sm:w-10 sm:h-10" />
            </div>
            
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-widest">
                Klinik Xulosa Tayyor
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
                {savedResult?.diagnosisLevel}
              </h3>
            </div>
          </div>

          {/* Score & Risk Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            
            {/* Score Card */}
            <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-teal-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">Ruhiy Tiklanish Ko'rsatkichi</span>
                <Activity className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-teal-300 mt-2">
                {savedResult?.scorePercent}%
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                  style={{ width: `${savedResult?.scorePercent}%` }}
                />
              </div>
            </div>

            {/* Risk Indicator Card */}
            <div className={`glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${
              savedResult?.hasRisk ? 'border-amber-500/40 bg-amber-950/10' : 'border-emerald-500/30 bg-emerald-950/10'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">Holat Darajasi</span>
                {savedResult?.hasRisk ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div className={`text-lg sm:text-2xl font-extrabold mt-2 ${savedResult?.hasRisk ? 'text-amber-300' : 'text-emerald-300'}`}>
                {savedResult?.hasRisk ? 'Hissiy Zo\'riqish Aniqlangan' : 'Optimal Ichki Balans'}
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
                {savedResult?.hasRisk ? `${savedResult.riskCount} ta xavfli belgi mavjud` : 'Barcha ko\'rsatkichlar me\'yorda'}
              </p>
            </div>

          </div>

          {/* AI Clinical Summary Description */}
          <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/[0.08] space-y-2">
            <div className="flex items-center space-x-2 text-teal-300 font-bold text-xs sm:text-sm">
              <Brain className="w-4 h-4" />
              <span>Furqat Bag'ibekov Metodikasi Bo'yicha Tavsiya:</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {savedResult?.summaryText}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => setActiveTab('tasks')}
              className="py-3.5 sm:py-4 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 active:scale-95"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Kunlik Sokinlik Rejasiga O'tish</span>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className="py-3.5 sm:py-4 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-slate-200 glass-card hover:text-white flex items-center justify-center space-x-2 active:scale-95"
            >
              <span>Tavsiya Etilgan Kurslar</span>
            </button>
          </div>

          {/* Retake test button */}
          <div className="text-center pt-2">
            <button
              onClick={handleRetake}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-teal-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Testni qayta topshirish</span>
            </button>
          </div>

          </div>
        )}

        </div>
      </div>

    </div>
  );
}
