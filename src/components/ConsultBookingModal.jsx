import React, { useState } from 'react';
import { PhoneCall, Calendar, User, MessageSquare, CheckCircle2, Sparkles, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConsultBookingModal({ isOpen, onClose, selectedDoctor = "Bag'ibekov Furqat" }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+998 ',
    doctor: selectedDoctor,
    complaint: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="glass-panel max-w-lg w-full rounded-2xl sm:rounded-3xl border border-teal-500/30 p-5 sm:p-8 space-y-4 sm:space-y-6 shadow-2xl relative animate-scale-up my-auto">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">
                Shaxsiy Qabulga Yozilish
              </span>
              <h3 className="text-base sm:text-2xl font-extrabold text-white mt-0.5">
                Klinik Psixoterapevt Qabuli
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                Ma'lumotlaringizni qoldiring, markaz ma'muriyati 5-15 daqiqa ichida siz bilan bog'lanadi.
              </p>
            </div>

            <div>
              <label className="text-[11px] sm:text-xs font-bold text-slate-300">Ism va Familiyangiz:</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ismingizni kiriting"
                className="w-full p-2.5 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm mt-1 focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] sm:text-xs font-bold text-slate-300">Telefon Raqamingiz:</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm mt-1 focus:outline-none focus:border-teal-400 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] sm:text-xs font-bold text-slate-300">Tanlangan Mutaxassis:</label>
              <select
                value={formData.doctor}
                onChange={e => setFormData({ ...formData, doctor: e.target.value })}
                className="w-full p-2.5 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm mt-1 focus:outline-none focus:border-teal-400 transition-colors"
              >
                <option value="Bag'ibekov Furqat">Bag'ibekov Furqat (Bosh psixoterapevt, 12 yillik tajriba)</option>
                <option value="Muminova Dilfuza">Muminova Dilfuza (Ayollar va oilaviy psixolog, 15 yillik tajriba)</option>
                <option value="Baydjanov Temur">Baydjanov Temur (Neyropsixolog, 10 yillik tajriba)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] sm:text-xs font-bold text-slate-300">Sizni qiynayotgan asosiy holat (Ixtiyoriy):</label>
              <textarea
                rows="2"
                value={formData.complaint}
                onChange={e => setFormData({ ...formData, complaint: e.target.value })}
                placeholder="Panik ataka, uyqusizlik yoki oilaviy stress..."
                className="w-full p-2.5 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm mt-1 focus:outline-none focus:border-teal-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-white glowing-button shadow-lg shadow-teal-500/20 flex items-center justify-center space-x-1.5 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Arizani Yuborish</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-4 sm:py-6 space-y-3 sm:space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-white">
              Arizangiz Qabul Qilindi! 🌿
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Hurmatli <b>{formData.fullName}</b>, mutaxassis <b>{formData.doctor}</b> va markaz ma'muriyati qisqa vaqt ichida siz bilan bog'lanib, qulay qabul vaqtini belgilaydi.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button mt-2 shadow-md shadow-teal-500/20 active:scale-95"
            >
              Rahmat
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
