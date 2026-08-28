import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Gift, 
  CreditCard, 
  Bot, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Sparkles, 
  Upload,
  Copy,
  Eye
} from 'lucide-react';
import { INITIAL_TEAM, INITIAL_COURSES, REFERRAL_REWARDS } from '../data/initialData';

export default function AdminPanelDashboard() {
  const [activeAdminTab, setActiveAdminTab] = useState('stats');

  // Team state
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_team_members');
    return saved ? JSON.parse(saved) : INITIAL_TEAM;
  });
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    title: '',
    experience: '',
    directions: '',
    methodology: '',
    photo_url: ''
  });

  // Courses state
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_courses_list');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    price: '',
    is_free: false,
    description: '',
    lessons_count: 5
  });

  // Gifts state
  const [gifts, setGifts] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_referral_gifts');
    return saved ? JSON.parse(saved) : REFERRAL_REWARDS;
  });
  const [showAddGift, setShowAddGift] = useState(false);
  const [newGift, setNewGift] = useState({
    title: '',
    required_friends: 5,
    description: ''
  });

  // Receipts state
  const [receipts, setReceipts] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_receipts');
    return saved ? JSON.parse(saved) : [
      { id: 101, userName: "Alisher Vohidov", phone: "+998 90 123 45 67", course: "💎 Stress va Psixosomatikani Yechish", amount: "100$", status: "pending", time: "10 daqiqa oldin" },
      { id: 102, userName: "Nodira Karimova", phone: "+998 93 987 65 43", course: "🔬 Xitoy Davolash Kapsulasi (10 seans)", amount: "350$", status: "approved", time: "1 soat oldin" },
    ];
  });

  // AI Post generator state
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Handlers for Team
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name) return;
    const updated = [
      ...team,
      {
        id: Date.now(),
        member_key: `doc_${Date.now()}`,
        name: newMember.name,
        title: newMember.title || "Klinik Psixoterapevt",
        experience: newMember.experience || "5 yillik tajriba",
        avatar_url: newMember.photo_url || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80",
        directions: newMember.directions ? newMember.directions.split(',').map(s => s.trim()) : ["Klinik psixoterapiya"],
        methodology: newMember.methodology || "Bag'ibekov Furqatning neyro-texnologiyalari va kapsulaterapiya amaliyoti.",
        achievements: ["1,000+ muvaffaqiyatli seanslar"]
      }
    ];
    setTeam(updated);
    localStorage.setItem('sokinqalb_team_members', JSON.stringify(updated));
    setShowAddMember(false);
    setNewMember({ name: '', title: '', experience: '', directions: '', methodology: '', photo_url: '' });
  };

  const handleDeleteMember = (id) => {
    if (!window.confirm("Rostdan ham ushbu mutaxassisni o'chirmoqchimisiz?")) return;
    const updated = team.filter(m => m.id !== id);
    setTeam(updated);
    localStorage.setItem('sokinqalb_team_members', JSON.stringify(updated));
  };

  // Handlers for Courses
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title) return;
    const updated = [
      ...courses,
      {
        id: Date.now(),
        course_key: `c_${Date.now()}`,
        title: newCourse.title,
        price: newCourse.is_free ? "0 so'm (Bepul)" : newCourse.price || "100$",
        is_free: newCourse.is_free,
        description: newCourse.description || "Mualliflik psixoterapiya kursi",
        lessons_count: parseInt(newCourse.lessons_count) || 5,
        lessons: [
          { title: "1-Dars: Nazariy asoslar va tana tahlili", duration: "18 daq" },
          { title: "2-Dars: Amaliy nafas va mushak bo'shatish", duration: "25 daq" }
        ]
      }
    ];
    setCourses(updated);
    localStorage.setItem('sokinqalb_courses_list', JSON.stringify(updated));
    setShowAddCourse(false);
    setNewCourse({ title: '', price: '', is_free: false, description: '', lessons_count: 5 });
  };

  const handleDeleteCourse = (id) => {
    if (!window.confirm("Ushbu kursni o'chirmoqchimisiz?")) return;
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    localStorage.setItem('sokinqalb_courses_list', JSON.stringify(updated));
  };

  // Handlers for Gifts
  const handleAddGift = (e) => {
    e.preventDefault();
    if (!newGift.title) return;
    const updated = [
      ...gifts,
      {
        id: Date.now(),
        gift_key: `g_${Date.now()}`,
        title: newGift.title,
        required_friends: parseInt(newGift.required_friends) || 5,
        description: newGift.description || "Maxsus sovg'a"
      }
    ];
    setGifts(updated);
    localStorage.setItem('sokinqalb_referral_gifts', JSON.stringify(updated));
    setShowAddGift(false);
    setNewGift({ title: '', required_friends: 5, description: '' });
  };

  const handleDeleteGift = (id) => {
    const updated = gifts.filter(g => g.id !== id);
    setGifts(updated);
    localStorage.setItem('sokinqalb_referral_gifts', JSON.stringify(updated));
  };

  // Receipts approve
  const handleApproveReceipt = (id) => {
    const updated = receipts.map(r => r.id === id ? { ...r, status: 'approved' } : r);
    setReceipts(updated);
    localStorage.setItem('sokinqalb_receipts', JSON.stringify(updated));
    alert("✅ To'lov cheki tasdiqlandi va kurs foydalanuvchiga ochildi!");
  };

  // AI Post generate
  const handleGenerateAiPost = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedPost(
        `🌿 **SOKIN QALB — ICHKI XOTIRJAMLIK SIRI** ✨\n\nKo'pincha inson o'zini doimiy asabiylik va charchoq ichida topadi. Buning sababi — miya neyronlarining ortiqcha yuklanishi va tana psixosomatik qisilishidir.\n\n💡 **Furqat Bag'ibekov tavsiyasi:**\n1. Kuniga 3 marta 4-7-8 Vagus nafas mashqini bajaring.\n2. Tana mushaklarini bo'shatish orqali ong osti bloklarini tozalang.\n\n👉 Bepul diagnostikadan o'tish uchun: https://sokinqalb.uz\n\n#SokinQalb #Psixoterapiya #FurqatBagibekov`
      );
      setIsGenerating(false);
    }, 1000);
  };

  const getDoctorPhoto = (member) => {
    if (member.member_key === 'furqat') return '/furqat_bagibekov.png';
    if (member.member_key === 'dilfuza') return '/dilfuza_muminova.png';
    if (member.member_key === 'temur') return '/temur_baydjanov.png';
    return member.photo_url || member.avatar_url || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80";
  };

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10 w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 sm:pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full badge-indigo text-[10px] sm:text-xs font-bold mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Markaz Boshqaruv Paneli</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sokin Qalb Admin Dashboard
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
          {[
            { id: 'stats', label: '📊 Statistika' },
            { id: 'team', label: '👥 Jamoa' },
            { id: 'courses', label: '📚 Kurslar' },
            { id: 'gifts', label: '🎁 Sovg\'alar' },
            { id: 'receipts', label: '💳 Cheklar' },
            { id: 'aipost', label: '🤖 AI Post' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                activeAdminTab === tab.id
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-black shadow-md shadow-teal-500/20'
                  : 'glass-card text-slate-300 hover:text-white border-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. STATS TAB */}
      {activeAdminTab === 'stats' && (
        <div className="space-y-6 sm:space-y-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            
            <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-teal-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">Jami Foydalanuvchilar</span>
                <Users className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">15,420</div>
              <div className="text-[10px] sm:text-xs text-teal-400 mt-1 font-semibold">+142 ta bugun</div>
            </div>

            <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-cyan-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">Klinik Diagnostikalar</span>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">8,930</div>
              <div className="text-[10px] sm:text-xs text-cyan-400 mt-1 font-semibold">94% yakunlangan</div>
            </div>

            <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">Tasdiqlangan Savdolar</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl sm:text-3xl font-black text-white mt-2 truncate">48,200,000 so'm</div>
              <div className="text-[10px] sm:text-xs text-emerald-400 mt-1 font-semibold">320 ta xarid</div>
            </div>

            <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">Xavfli Holatlar</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-2">18 ta</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold">Tezkor konsultatsiya talab</div>
            </div>

          </div>
        </div>
      )}

      {/* 2. TEAM MANAGEMENT TAB */}
      {activeAdminTab === 'team' && (
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white">Psixoterapevtlar Jamoasi ({team.length} ta)</h3>
            <button
              onClick={() => setShowAddMember(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-white glowing-button flex items-center space-x-1.5 shadow-md shadow-teal-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {team.map((m) => (
              <div key={m.id} className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/[0.08] space-y-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src={getDoctorPhoto(m)} 
                    alt={m.name} 
                    className="w-12 h-12 rounded-xl object-cover object-top border border-slate-700" 
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm sm:text-base truncate">{m.name}</h4>
                    <p className="text-xs text-teal-300 truncate">{m.experience}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">{m.methodology}</p>
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => handleDeleteMember(m.id)}
                    className="p-1.5 text-rose-400 hover:bg-rose-950/40 rounded-lg text-xs flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>O'chirish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add member modal */}
          {showAddMember && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4">
              <div className="glass-panel max-w-md w-full rounded-2xl p-5 space-y-4 border border-teal-500/30">
                <h4 className="font-bold text-white text-base">Yangi Mutaxassis Qo'shish</h4>
                <form onSubmit={handleAddMember} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Ism va Familiya"
                    value={newMember.name}
                    onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Unvoni / Mutaxassisligi"
                    value={newMember.title}
                    onChange={e => setNewMember({ ...newMember, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Tajriba (masalan: 10 yillik tajriba)"
                    value={newMember.experience}
                    onChange={e => setNewMember({ ...newMember, experience: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <textarea
                    rows="2"
                    placeholder="Davolash metodikasi haqida..."
                    value={newMember.methodology}
                    onChange={e => setNewMember({ ...newMember, methodology: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs resize-none"
                  />
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddMember(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl font-bold text-xs text-white glowing-button"
                    >
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. COURSES MANAGEMENT TAB */}
      {activeAdminTab === 'courses' && (
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white">Kurslar va Seanslar ({courses.length} ta)</h3>
            <button
              onClick={() => setShowAddCourse(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-white glowing-button flex items-center space-x-1.5 shadow-md shadow-teal-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Kurs Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {courses.map((c) => (
              <div key={c.id} className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/[0.08] space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full badge-teal">{c.price}</span>
                  <button
                    onClick={() => handleDeleteCourse(c.id)}
                    className="text-rose-400 hover:text-rose-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base">{c.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>
              </div>
            ))}
          </div>

          {/* Add course modal */}
          {showAddCourse && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4">
              <div className="glass-panel max-w-md w-full rounded-2xl p-5 space-y-4 border border-teal-500/30">
                <h4 className="font-bold text-white text-base">Yangi Kurs / Seans Qo'shish</h4>
                <form onSubmit={handleAddCourse} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Kurs yoki Seans Nomi"
                    value={newCourse.title}
                    onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Narxi (masalan: 100$ yoki Bepul)"
                    value={newCourse.price}
                    onChange={e => setNewCourse({ ...newCourse, price: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <textarea
                    rows="2"
                    placeholder="Kurs tavsifi..."
                    value={newCourse.description}
                    onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs resize-none"
                  />
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCourse(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl font-bold text-xs text-white glowing-button"
                    >
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. GIFTS MANAGEMENT TAB */}
      {activeAdminTab === 'gifts' && (
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white">Referral Sovg'alari ({gifts.length} ta)</h3>
            <button
              onClick={() => setShowAddGift(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-white glowing-button flex items-center space-x-1.5 shadow-md shadow-teal-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Sovg'a</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {gifts.map((g) => (
              <div key={g.id} className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/[0.08] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-teal-300">
                    {g.required_friends} ta do'st
                  </span>
                  <button
                    onClick={() => handleDeleteGift(g.id)}
                    className="text-rose-400 hover:text-rose-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base">{g.title}</h4>
                <p className="text-xs text-slate-400">{g.description}</p>
              </div>
            ))}
          </div>

          {/* Add gift modal */}
          {showAddGift && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4">
              <div className="glass-panel max-w-md w-full rounded-2xl p-5 space-y-4 border border-teal-500/30">
                <h4 className="font-bold text-white text-base">Yangi Sovg'a Qo'shish</h4>
                <form onSubmit={handleAddGift} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Sovg'a Nomi"
                    value={newGift.title}
                    onChange={e => setNewGift({ ...newGift, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Kerakli do'stlar soni"
                    value={newGift.required_friends}
                    onChange={e => setNewGift({ ...newGift, required_friends: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddGift(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl font-bold text-xs text-white glowing-button"
                    >
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. RECEIPTS TAB */}
      {activeAdminTab === 'receipts' && (
        <div className="space-y-4 w-full">
          <h3 className="text-lg sm:text-xl font-bold text-white">Kelib Tushgan To'lov Cheklari ({receipts.length} ta)</h3>
          
          <div className="space-y-3">
            {receipts.map((r) => (
              <div key={r.id} className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-white text-sm sm:text-base">{r.userName}</h4>
                    <span className="text-xs text-slate-400 font-mono">({r.phone})</span>
                  </div>
                  <p className="text-xs text-teal-300 mt-0.5">{r.course} — <b className="text-white">{r.amount}</b></p>
                  <span className="text-[10px] text-slate-500 font-mono">{r.time}</span>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  {r.status === 'approved' ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tasdiqlangan</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApproveReceipt(r.id)}
                      className="px-4 py-2 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/20 active:scale-95"
                    >
                      Tasdiqlash & Kursni Ochish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. AI POST GENERATOR TAB */}
      {activeAdminTab === 'aipost' && (
        <div className="space-y-4 max-w-3xl glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.08]">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">Telegram & Instagram uchun</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">Avtomatlashtirilgan AI Psixologik Post Yaratuvchi</h3>
            <p className="text-xs text-slate-400">Furqat Bag'ibekov klinik yondashuvi asosida tayyor professional postlarni 1 soniyada yarating.</p>
          </div>

          <button
            onClick={handleGenerateAiPost}
            disabled={isGenerating}
            className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-2 shadow-md shadow-teal-500/20 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? "Post yaratilmoqda..." : "Yangi Shifobaxsh Post Yaratish"}</span>
          </button>

          {generatedPost && (
            <div className="space-y-3 pt-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                {generatedPost}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedPost);
                  alert("✅ Post matni nusxalandi!");
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 flex items-center space-x-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Postni Nusxalash</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
