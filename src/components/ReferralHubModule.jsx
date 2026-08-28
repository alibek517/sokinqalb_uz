import React, { useState, useEffect } from 'react';
import { 
  Gift, 
  Share2, 
  Copy, 
  Check, 
  Users, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Send,
  RefreshCw,
  Info,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { REFERRAL_REWARDS } from '../data/initialData';
import FurqatDoctorPortrait from './FurqatDoctorPortrait';

export default function ReferralHubModule({ setActiveTab }) {
  // Real referral state: initialized from localStorage
  const [friendsCount, setFriendsCount] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_real_referral_count');
    return saved !== null ? parseInt(saved) : 0;
  });

  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);

  // Generate unique personal referral code for the user
  const [referralCode] = useState(() => {
    let code = localStorage.getItem('sokinqalb_user_ref_code');
    if (!code) {
      code = 'ref_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('sokinqalb_user_ref_code', code);
    }
    return code;
  });

  const botUsername = "sokin_qalb_rasmiy";
  const webReferralLink = `https://sokinqalb.uz/?${referralCode}`;
  const telegramBotReferralLink = `https://t.me/${botUsername}?start=${referralCode}`;

  const shareText = "🌿 Sokin Qalb — Psixoterapevt Bag'ibekov Furqatning dori-darmonsiz ichki xotirjamlik va stressni davolash platformasi. Bepul diagnostikadan o'ting va shaxsiy tavsiyalar oling:";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(telegramBotReferralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(telegramBotReferralLink)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + telegramBotReferralLink)}`;
    window.open(url, '_blank');
  };

  const handleCheckSync = () => {
    setIsSyncing(true);
    setSyncMessage(null);
    setTimeout(() => {
      setIsSyncing(false);
      const current = parseInt(localStorage.getItem('sokinqalb_real_referral_count') || '0');
      setFriendsCount(current);
      setSyncMessage(
        current > 0 
          ? `✅ Sinxronlandi: Jami ${current} ta do'stingiz taklif havolangiz orqali qo'shilgan!`
          : "ℹ️ Hozircha yangi qo'shilgan do'stlar qayd etilmadi. Havolangizni Telegram va WhatsApp orqali ko'proq yaqinlaringizga ulashing."
      );
      setTimeout(() => setSyncMessage(null), 5000);
    }, 1000);
  };

  return (
    <div className="py-8 sm:py-16 max-w-6xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 w-full">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full badge-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5 text-teal-400" />
          <span>Sokin Sovg'alar & Taklif Tizimi</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Do'stlaringizga Sokinlik Ulashing
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
          Yaqinlaringizni platforma va Telegram botimizga taklif qiling hamda Furqat Bag'ibekovning pullik kurs va seanslarini mutlaqo bepul oching
        </p>
      </div>

      {/* Referral Link & Stats Banner with Custom Furqat Gifts Portrait on Left (Chap Tarafda) */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-slate-800 pb-6">
          
          {/* Left: Custom Gifts Portrait */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <FurqatDoctorPortrait imageSrc="/furqat_gifts.jpg" size="wide" direction="left" />
          </div>

          {/* Right: Real Referral Action and Counter */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Sizning Shaxsiy Taklif Havolangiz:
                </span>
                <span className="text-[10px] text-slate-400 font-mono">ID: {referralCode}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={telegramBotReferralLink}
                  className="flex-1 p-3 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-teal-300 font-mono text-xs sm:text-sm focus:outline-none min-w-0 select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-3 sm:px-6 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-1.5 flex-shrink-0 shadow-md shadow-teal-500/20 active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Nusxalandi!" : "Nusxa Olish"}</span>
                </button>
              </div>
            </div>

            {/* Direct Sharing Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={handleShareTelegram}
                className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegramda Ulashish</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsAppda Ulashish</span>
              </button>
            </div>

            {/* Real Invited Counter Card */}
            <div className="glass-card p-4 rounded-xl sm:rounded-2xl border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase block">
                  Taklif qilingan haqiqiy do'stlar
                </span>
                <span className="text-xs text-slate-300">
                  Do'stingiz havola orqali botga a'zo bo'lganda bu yerda aks etadi
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-3xl sm:text-4xl font-black text-teal-300">
                  {friendsCount} ta
                </div>
                <button
                  onClick={handleCheckSync}
                  disabled={isSyncing}
                  className="inline-flex items-center space-x-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-300 hover:text-white transition-all disabled:opacity-50"
                  title="Haqiqiy statusni yangilash"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-teal-400' : ''}`} />
                  <span>{isSyncing ? "Tekshirilmoqda..." : "Yangilash"}</span>
                </button>
              </div>
            </div>

            {/* Real sync feedback toast */}
            {syncMessage && (
              <div className="p-3 rounded-xl bg-slate-900/90 border border-teal-500/40 text-xs text-teal-200 animate-fade-in flex items-start space-x-2">
                <Info className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>{syncMessage}</span>
              </div>
            )}

          </div>

        </div>

        {/* How it Works - 3 Real Steps */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/50 border border-white/[0.05] space-y-3">
          <div className="flex items-center space-x-2 text-teal-300 font-bold text-xs sm:text-sm uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Sovg'alarni olish qanday ishlaydi?</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04] space-y-1">
              <div className="font-bold text-white flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-[10px]">1</span>
                <span>Havolangizni yuboring</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Yuqoridagi shaxsiy havolangizni Telegram yoki WhatsApp orqali do'stlaringiz va yaqinlaringizga ulashing.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04] space-y-1">
              <div className="font-bold text-white flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-[10px]">2</span>
                <span>Do'stingiz botga qo'shiladi</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Do'stingiz ushbu havola orqali botimizga kirib, start bosganida tizim sizning hisobingizga avtomatik +1 ball yozadi.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04] space-y-1">
              <div className="font-bold text-white flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-[10px]">3</span>
                <span>Sovg'alarni bepul oching</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Har bir bosqichdagi do'stlar soniga yetishingiz bilan pullik darslik va konsultatsiyalar avtomatik bepul ochiladi!
              </p>
            </div>
          </div>
        </div>

        {/* Reward Tiers Grid */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-white">Sovg'alar Bosqichlari:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {REFERRAL_REWARDS.map((reward) => {
              const isUnlocked = friendsCount >= reward.required_friends;
              
              return (
                <div
                  key={reward.id}
                  className={`glass-card p-4 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    isUnlocked
                      ? 'border-emerald-500/40 bg-emerald-950/15 text-white shadow-lg shadow-emerald-500/10'
                      : 'border-white/[0.06] text-slate-400'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                        {reward.required_friends} ta do'st
                      </span>
                      {isUnlocked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-500" />
                      )}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {reward.title}
                    </h4>

                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      {reward.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    {isUnlocked ? (
                      <button
                        onClick={() => {
                          try {
                            confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
                          } catch (e) {}
                          alert(`🎉 Tabriklaymiz! «${reward.title}» sovg'asi hisobingizga biriktirildi.`);
                        }}
                        className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-md shadow-emerald-500/20 active:scale-95"
                      >
                        🎁 Sovg'ani Olish
                      </button>
                    ) : (
                      <div className="text-[11px] text-slate-400 text-center font-medium bg-slate-900/70 py-2 rounded-xl border border-white/[0.04]">
                        Yana <b className="text-teal-300">{Math.max(0, reward.required_friends - friendsCount)}</b> ta do'st kerak
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
