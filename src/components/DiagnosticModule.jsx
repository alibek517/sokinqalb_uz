import React, { useState, useEffect } from 'react';
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
  Check,
  Bot,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DIAGNOSTIC_QUESTIONS } from '../data/initialData';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';
import { analyzeDiagnosticWithGemini } from '../services/geminiService';

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
  const [geminiAnalysis, setGeminiAnalysis] = useState(() => {
    return localStorage.getItem('sokinqalb_gemini_diag_analysis') || '';
  });
  const [isAnalyzingGemini, setIsAnalyzingGemini] = useState(false);

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

  const calculateFinalResults = async (allAnswers) => {
    let totalScore = 0;
    let riskCount = 0;

    const formattedAnswersForAI = [];
    Object.entries(allAnswers).forEach(([qId, opt]) => {
      totalScore += opt.score;
      if (opt.risk > 0) riskCount += opt.risk;
      const questionObj = DIAGNOSTIC_QUESTIONS.find(q => q.id === parseInt(qId));
      formattedAnswersForAI.push({
        category: questionObj?.category || 'Umumiy',
        question: questionObj?.question || '',
        selectedOption: opt.text,
        score: opt.score
      });
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

    // Trigger Deep Gemini AI Analysis
    setIsAnalyzingGemini(true);
    try {
      const aiResponse = await analyzeDiagnosticWithGemini(
        formattedAnswersForAI,
        totalScore,
        hasRisk ? 'Yuqori / O\'rtacha Hissiy Zo\'riqish' : 'Xavfsiz / Barqaror'
      );
      setGeminiAnalysis(aiResponse);
      localStorage.setItem('sokinqalb_gemini_diag_analysis', aiResponse);
    } catch (err) {
      console.warn("Gemini diag analysis error:", err);
    } finally {
      setIsAnalyzingGemini(false);
    }
  };

  const handleRetake = () => {
    localStorage.removeItem('sokinqalb_diagnostic_result');
    localStorage.removeItem('sokinqalb_gemini_diag_analysis');
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    setSavedResult(null);
    setGeminiAnalysis('');
  };

  const currentQ = DIAGNOSTIC_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / DIAGNOSTIC_QUESTIONS.length) * 100);

  return (
    <div className="py-8 sm:py-16 max-w-6xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 w-full">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <Brain className="w-3.5 h-3.5 text-teal-400" />
          <span>Klinik Ong Osti Testi</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ong Osti va Stress Diagnostikasi
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
          Bag'ibekov Furqatning 10 ta maxsus klinik savoli orqali ichki holatingiz, psixosomatik spazmlar va stress darajangizni aniqlang
        </p>
      </div>

      {/* Main Container: Doctor Portrait on Left + Diagnostic / Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Furqat Doctor Portrait & Clinical Guidance */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          <div className="w-full flex justify-center">
            <FurqatDoctorPortrait 
              imageSrc="/furqat_diagnostic.jpg" 
              size="wide" 
              direction="left" 
            />
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-teal-500/20 bg-slate-900/80 text-center space-y-1.5 max-w-[380px] w-full">
            <div className="flex items-center justify-center space-x-1.5 text-teal-300 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Furqat Bag'ibekov Yo'riqnomasi:</span>
            </div>
            <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
              "Har bir savolga his-tuyg'ularingizga quloq solib, o'zingizga 100% rostgo'y javob bering. Shunda ong ostidagi haqiqiy sabab aniqlanadi."
            </p>
          </div>
        </div>

        {/* Right Column: Active Quiz or Results Screen */}
        <div className="lg:col-span-7 w-full">
          
          {!isCompleted ? (
            /* ACTIVE QUIZ CARD */
            <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6 sm:space-y-8 animate-fade-in w-full bg-slate-900/90">
              
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
                      className={`w-full p-3.5 sm:p-5 rounded-xl sm:rounded-2xl text-left transition-all flex items-center justify-between group border cursor-pointer ${
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
                    className="text-xs text-slate-400 hover:text-white font-medium flex items-center space-x-1 cursor-pointer"
                  >
                    <span>← Oldingi savol</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* RESULTS CARD */
            <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-teal-500/30 shadow-2xl space-y-6 sm:space-y-8 animate-scale-up w-full bg-slate-900/90">
              
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

              {/* Furqat Assistant Clinical Analysis Section */}
              <div className="glass-card p-5 sm:p-7 rounded-2xl border border-teal-500/30 bg-slate-950/80 space-y-3">
                <div className="flex items-center space-x-2 text-teal-300 font-bold text-sm sm:text-base">
                  <Bot className="w-5 h-5 text-teal-400" />
                  <span>Bag'ibekov Furqatning Yordamchisi Xulosasi:</span>
                </div>

                {isAnalyzingGemini ? (
                  <div className="py-6 flex flex-col items-center justify-center space-y-2 text-teal-300 text-xs">
                    <RefreshCw className="w-6 h-6 animate-spin text-teal-400" />
                    <span>Bag'ibekov Furqatning Yordamchisi javoblaringizni tahlil qilmoqda...</span>
                  </div>
                ) : geminiAnalysis ? (
                  <div className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {geminiAnalysis}
                  </div>
                ) : (
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {savedResult?.summaryText}
                  </p>
                )}
              </div>

              {/* Action CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('tasks')}
                  className="py-3.5 sm:py-4 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 active:scale-95 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Kunlik Sokinlik Rejasiga O'tish</span>
                </button>
                <button
                  onClick={() => onOpenConsultModal("Bag'ibekov Furqat")}
                  className="py-3.5 sm:py-4 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-white bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-500/40 flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-indigo-300" />
                  <span>Furqat Bag'ibekov Qabuliga Yozilish</span>
                </button>
              </div>

              {/* Retake test button */}
              <div className="text-center pt-2">
                <button
                  onClick={handleRetake}
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-teal-300 transition-colors cursor-pointer"
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
