import React, { useState } from 'react';
import { CreditCard, Upload, CheckCircle2, X, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentModal({ isOpen, onClose, course }) {
  const [copied, setCopied] = useState(false);
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+998 ');

  if (!isOpen || !course) return null;

  const cardNumber = "8600 5304 1234 5678";

  const handleCopyCard = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUploadReceipt = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    // Save to receipts in localStorage
    const savedReceipts = JSON.parse(localStorage.getItem('sokinqalb_receipts') || '[]');
    const newR = {
      id: Date.now(),
      userName: userName,
      phone: userPhone,
      course: course.title,
      amount: course.price,
      status: "pending",
      time: "Hozir"
    };
    localStorage.setItem('sokinqalb_receipts', JSON.stringify([newR, ...savedReceipts]));

    setReceiptUploaded(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleClose = () => {
    setReceiptUploaded(false);
    setUserName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="glass-panel max-w-lg w-full rounded-2xl sm:rounded-3xl border border-teal-500/30 p-5 sm:p-8 space-y-4 sm:space-y-6 shadow-2xl relative animate-scale-up my-auto">
        
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {!receiptUploaded ? (
          <form onSubmit={handleUploadReceipt} className="space-y-3 sm:space-y-4">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">
                To'lov va Kursni Ochish
              </span>
              <h3 className="text-base sm:text-2xl font-extrabold text-white mt-0.5 leading-snug">
                «{course.title}»
              </h3>
              <p className="text-xl sm:text-2xl font-black text-teal-300 mt-1">
                {course.price}
              </p>
            </div>

            {/* Plastic Card Details Box */}
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] sm:text-xs">
                <span className="font-semibold text-slate-400">Plastik Karta (Click / Payme):</span>
                <span className="font-bold text-teal-300">Furqat Bag'ibekov</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-base sm:text-xl font-mono font-bold text-white tracking-wider break-all">
                  {cardNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCard}
                  className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition-all text-xs font-bold flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Nusxalandi" : "Nusxa"}</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label className="text-[11px] sm:text-xs font-bold text-slate-300">Ism va Familiyangiz:</label>
              <input
                type="text"
                required
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="To'liq ismingiz"
                className="w-full p-2.5 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm mt-1 focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] sm:text-xs font-bold text-slate-300">Telefon Raqamingiz:</label>
              <input
                type="text"
                required
                value={userPhone}
                onChange={e => setUserPhone(e.target.value)}
                className="w-full p-2.5 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm mt-1 focus:outline-none focus:border-teal-400 transition-colors font-mono"
              />
            </div>

            {/* Receipt Upload Mockup */}
            <div>
              <label className="text-[11px] sm:text-xs font-bold text-slate-300">To'lov Cheki (Skrinshot):</label>
              <div className="mt-1 border-2 border-dashed border-slate-700 hover:border-teal-400/60 rounded-xl p-3 sm:p-4 text-center cursor-pointer bg-slate-900/60 transition-colors">
                <Upload className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                <span className="text-[10px] sm:text-xs text-slate-400">To'lov cheki skrinshotini yuklash</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-white glowing-button shadow-lg shadow-teal-500/20 flex items-center justify-center space-x-1.5 active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>To'lovni Tasdiqlashga Yuborish</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-4 sm:py-6 space-y-3 sm:space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-white">
              To'lov Cheki Qabul Qilindi! 🌿
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Ma'muriyatimiz 5-15 daqiqa ichida to'lovni tasdiqlaydi va <b>«{course.title}»</b> darsliklari to'liq ochiladi.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button mt-2 shadow-md shadow-teal-500/20 active:scale-95"
            >
              Yopish
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
