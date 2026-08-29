import React, { useState, useEffect, useRef } from 'react';
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
  Eye,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Clock,
  Check,
  X,
  PhoneCall,
  Flame,
  ArrowRight,
  Globe,
  Radio,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { INITIAL_TEAM, INITIAL_COURSES, INITIAL_GIFTS, HOURLY_ROUTINE } from '../data/initialData';

// Image Upload Picker from Gallery or Real Camera
const ImageUploadPicker = ({ currentImage, onImageSelected, label = "Shifokor Fotosurati" }) => {
  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2 pt-1">
      <label className="block text-slate-300 font-bold text-xs">
        {label}:
      </label>

      {/* Hidden File Inputs for Gallery & Camera */}
      <input 
        type="file" 
        accept="image/*" 
        ref={galleryRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={cameraRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* Upload Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => galleryRef.current?.click()}
          className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-teal-500/20 border border-slate-700 hover:border-teal-400 text-teal-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer active:scale-95"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>🖼️ Galereyadan Yuklash</span>
        </button>

        <button
          type="button"
          onClick={() => cameraRef.current?.click()}
          className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-400 text-cyan-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer active:scale-95"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>📸 Kameradan Olish</span>
        </button>
      </div>

      {/* Selected Image Preview */}
      {currentImage ? (
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-teal-500/30 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center space-x-2.5 min-w-0">
            <img 
              src={currentImage} 
              alt="Tanlangan rasm" 
              className="w-12 h-12 rounded-lg object-cover border border-teal-400/40 flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="text-xs text-emerald-300 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Rasm biriktirildi</span>
              </span>
              <span className="text-[10px] text-slate-400 truncate block">Haqiqiy fotosurat saqlandi</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onImageSelected('')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 border border-slate-700 text-xs font-semibold cursor-pointer"
            title="Rasmni o'chirish"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="text-[10px] text-slate-500 italic text-center py-1">
          Galereyadan fayl tanlang yoki kamerani yoqing
        </div>
      )}
    </div>
  );
};

// Platform indicator badge
const PlatformBadge = ({ platform = 'both' }) => {
  if (platform === 'web') {
    return (
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 inline-flex items-center space-x-1">
        <Globe className="w-2.5 h-2.5" />
        <span>Faqat Sayt</span>
      </span>
    );
  }
  if (platform === 'bot') {
    return (
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-300 inline-flex items-center space-x-1">
        <Bot className="w-2.5 h-2.5" />
        <span>Faqat Bot</span>
      </span>
    );
  }
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 inline-flex items-center space-x-1">
      <Radio className="w-2.5 h-2.5" />
      <span>Sayt & Bot</span>
    </span>
  );
};

// 3-Way Target Platform Selector Component
const PlatformSelector = ({ value = 'both', onChange }) => {
  return (
    <div className="space-y-1.5 pt-1">
      <label className="block text-slate-300 font-bold text-xs">
        Qayerda ko'rinsin / o'zgarsin? (Platforma):
      </label>
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: 'both', label: '🔄 Ikkalasida ham', sub: 'Sayt + Telegram Bot' },
          { id: 'web', label: '🌐 Faqat Saytda', sub: 'Web-versiya' },
          { id: 'bot', label: '🤖 Faqat Botda', sub: 'Telegram Bot' }
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`p-2 rounded-xl text-xs text-center border transition-all cursor-pointer ${
              value === opt.id
                ? 'bg-teal-500/25 border-teal-400 text-teal-200 font-bold shadow-md shadow-teal-500/15'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="leading-tight">{opt.label}</div>
            <div className="text-[9px] text-slate-500 mt-0.5">{opt.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function AdminPanelDashboard() {
  // --- 1. PIN CODE SECURITY (0189) ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('sokinqalb_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handlePinSubmit = (e) => {
    if (e) e.preventDefault();
    if (pinInput === '0189') {
      setIsAuthenticated(true);
      localStorage.setItem('sokinqalb_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
      setTimeout(() => setPinError(false), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sokinqalb_admin_auth');
    setPinInput('');
  };

  // --- 2. ADMIN TABS ---
  const [activeAdminTab, setActiveAdminTab] = useState('courses');

  // --- 3. COURSES STATE & CRUD ---
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_courses_list');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    category: 'course',
    price: '',
    price_usd: 0,
    price_uzs: 0,
    badge: 'Yangi Kurs',
    duration: '1 oy',
    description: '',
    lessons_count: 5,
    target_platform: 'both' // 'both' | 'web' | 'bot'
  });

  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseFormData({
      title: '',
      category: 'course',
      price: '10$ (~128 000 so\'m)',
      price_usd: 10,
      price_uzs: 128000,
      badge: 'Amaliy Dastur',
      duration: '1 oy',
      description: 'Bag\'ibekov Furqatning chuqur psixoterapevtik video-darsligi.',
      lessons_count: 5,
      target_platform: 'both'
    });
    setShowCourseModal(true);
  };

  const handleOpenEditCourse = (course) => {
    setEditingCourse(course);
    setCourseFormData({
      title: course.title || '',
      category: course.category || 'course',
      price: course.price || '',
      price_usd: course.price_usd || 0,
      price_uzs: course.price_uzs || 0,
      badge: course.badge || 'Premium',
      duration: course.duration || '1 oy',
      description: course.description || '',
      lessons_count: course.lessons_count || (course.lessons?.length || 5),
      target_platform: course.target_platform || 'both'
    });
    setShowCourseModal(true);
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!courseFormData.title.trim()) return;

    let updatedCourses;
    if (editingCourse) {
      updatedCourses = courses.map(c => {
        if (c.id === editingCourse.id) {
          return {
            ...c,
            ...courseFormData,
            is_free: courseFormData.price_usd === 0 || courseFormData.price.toLowerCase().includes('bepul')
          };
        }
        return c;
      });
    } else {
      const newCourseItem = {
        id: Date.now(),
        course_key: `course_${Date.now()}`,
        ...courseFormData,
        is_free: courseFormData.price_usd === 0 || courseFormData.price.toLowerCase().includes('bepul'),
        author: "Psixoterapevt Bag'ibekov Furqat",
        features: ["To'liq video-darsliklar", "Amaliy nafas mashqlari", "Klinik tavsiyalar"],
        lessons: [
          { id: 1, title: "1-Dars: Ong osti bloklarini ochish", type: "video", duration: "18:00" },
          { id: 2, title: "2-Dars: Tana psixosomatikasini yechish", type: "video", duration: "22:30" }
        ]
      };
      updatedCourses = [newCourseItem, ...courses];
    }

    setCourses(updatedCourses);
    localStorage.setItem('sokinqalb_courses_list', JSON.stringify(updatedCourses));
    setShowCourseModal(false);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Rostdan ham ushbu kursni o'chirmoqchimisiz?")) {
      const updated = courses.filter(c => c.id !== id);
      setCourses(updated);
      localStorage.setItem('sokinqalb_courses_list', JSON.stringify(updated));
    }
  };

  // --- 4. GIFTS & REFERRAL REWARDS CRUD ---
  const [gifts, setGifts] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_referral_gifts');
    return saved ? JSON.parse(saved) : INITIAL_GIFTS;
  });
  const [editingGift, setEditingGift] = useState(null);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftFormData, setGiftFormData] = useState({
    title: '',
    required_friends: 1,
    reward_course_key: '1usd',
    description: '',
    target_platform: 'both' // 'both' | 'web' | 'bot'
  });

  const handleOpenAddGift = () => {
    setEditingGift(null);
    setGiftFormData({
      title: '1$ Kurs (1 ta darslik)',
      required_friends: 1,
      reward_course_key: '1usd',
      description: '1 ta do\'stingizni taklif qiling va 1$ lik video-darslikni bepul oching!',
      target_platform: 'both'
    });
    setShowGiftModal(true);
  };

  const handleOpenEditGift = (gift) => {
    setEditingGift(gift);
    setGiftFormData({
      title: gift.title || '',
      required_friends: gift.required_friends || 1,
      reward_course_key: gift.reward_course_key || '1usd',
      description: gift.description || '',
      target_platform: gift.target_platform || 'both'
    });
    setShowGiftModal(true);
  };

  const handleSaveGift = (e) => {
    e.preventDefault();
    if (!giftFormData.title.trim()) return;

    let updatedGifts;
    if (editingGift) {
      updatedGifts = gifts.map(g => g.id === editingGift.id ? { ...g, ...giftFormData } : g);
    } else {
      const newGiftItem = {
        id: Date.now(),
        gift_key: `gift_${Date.now()}`,
        ...giftFormData
      };
      updatedGifts = [...gifts, newGiftItem];
    }

    setGifts(updatedGifts);
    localStorage.setItem('sokinqalb_referral_gifts', JSON.stringify(updatedGifts));
    setShowGiftModal(false);
  };

  const handleDeleteGift = (id) => {
    if (window.confirm("Ushbu sovg'a/mukofotni o'chirmoqchimisiz?")) {
      const updated = gifts.filter(g => g.id !== id);
      setGifts(updated);
      localStorage.setItem('sokinqalb_referral_gifts', JSON.stringify(updated));
    }
  };

  // --- 5. TEAM MEMBERS CRUD ---
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_team_members');
    return saved ? JSON.parse(saved) : INITIAL_TEAM;
  });
  const [editingMember, setEditingMember] = useState(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [memberFormData, setMemberFormData] = useState({
    name: '',
    title: '',
    experience: '',
    methodology: '',
    photo_url: '',
    directions: '',
    target_platform: 'both' // 'both' | 'web' | 'bot'
  });

  const handleOpenAddMember = () => {
    setEditingMember(null);
    setMemberFormData({
      name: '',
      title: 'Yetakchi Psixoterapevt',
      experience: '8 yillik tajriba',
      methodology: 'Xitoy Kapsulasi va Fransiya Neyro-Lampasi orqali davolash.',
      photo_url: '/furqat_hero.png',
      directions: 'Psixosomatika, Vahima, Oilaviy munosabatlar',
      target_platform: 'both'
    });
    setShowMemberModal(true);
  };

  const handleOpenEditMember = (member) => {
    setEditingMember(member);
    setMemberFormData({
      name: member.name || '',
      title: member.title || '',
      experience: member.experience || '',
      methodology: member.methodology || '',
      photo_url: member.photo_url || member.avatar_url || '',
      directions: Array.isArray(member.directions) ? member.directions.join(', ') : (member.directions || ''),
      target_platform: member.target_platform || 'both'
    });
    setShowMemberModal(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!memberFormData.name.trim()) return;

    const dirsArray = memberFormData.directions.split(',').map(s => s.trim()).filter(Boolean);

    let updatedTeam;
    if (editingMember) {
      updatedTeam = team.map(m => {
        if (m.id === editingMember.id) {
          return {
            ...m,
            ...memberFormData,
            directions: dirsArray
          };
        }
        return m;
      });
    } else {
      const newDoc = {
        id: Date.now(),
        member_key: `doc_${Date.now()}`,
        ...memberFormData,
        avatar_url: memberFormData.photo_url,
        directions: dirsArray,
        achievements: ["1,500+ muvaffaqiyatli bemorlar", "4.9 / 5.0 mijozlar bahosi"]
      };
      updatedTeam = [...team, newDoc];
    }

    setTeam(updatedTeam);
    localStorage.setItem('sokinqalb_team_members', JSON.stringify(updatedTeam));
    setShowMemberModal(false);
  };

  const handleDeleteMember = (id) => {
    if (window.confirm("Rostdan ham ushbu shifokorni jamoa ro'yxatidan o'chirmoqchimisiz?")) {
      const updated = team.filter(m => m.id !== id);
      setTeam(updated);
      localStorage.setItem('sokinqalb_team_members', JSON.stringify(updated));
    }
  };

  // --- 6. DAILY ROUTINE TASKS CRUD ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_hourly_routine');
    return saved ? JSON.parse(saved) : HOURLY_ROUTINE;
  });
  const [editingTask, setEditingTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    time: '08:00',
    title: '',
    benefit: '',
    description: '',
    target_platform: 'both' // 'both' | 'web' | 'bot'
  });

  const handleOpenAddTask = () => {
    setEditingTask(null);
    setTaskFormData({
      time: '08:00',
      title: '',
      benefit: 'Miyani tetiklashtiradi va energiya beradi.',
      description: '3 daqiqalik chuqur nafas va minnatdorlik amaliyoti.',
      target_platform: 'both'
    });
    setShowTaskModal(true);
  };

  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setTaskFormData({
      time: task.time || '',
      title: task.title || '',
      benefit: task.benefit || '',
      description: task.description || '',
      target_platform: task.target_platform || 'both'
    });
    setShowTaskModal(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!taskFormData.title.trim()) return;

    let updatedTasks;
    if (editingTask) {
      updatedTasks = tasks.map(t => t.id === editingTask.id ? { ...t, ...taskFormData } : t);
    } else {
      const newTaskItem = {
        id: `task_${Date.now()}`,
        ...taskFormData,
        category: 'morning'
      };
      updatedTasks = [...tasks, newTaskItem];
    }

    setTasks(updatedTasks);
    localStorage.setItem('sokinqalb_hourly_routine', JSON.stringify(updatedTasks));
    setShowTaskModal(false);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Ushbu kunlik vazifani o'chirmoqchimisiz?")) {
      const updated = tasks.filter(t => t.id !== id);
      setTasks(updated);
      localStorage.setItem('sokinqalb_hourly_routine', JSON.stringify(updated));
    }
  };

  // --- 7. RECEIPTS & STATS ---
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);
  const [newReceiptForm, setNewReceiptForm] = useState({
    userName: '',
    phone: '',
    course: '💎 Stress va Psixosomatikani Yechish',
    amount: '100$',
    paymentMethod: 'Click',
    receiptImage: ''
  });

  const [receipts, setReceipts] = useState(() => {
    const saved = localStorage.getItem('sokinqalb_receipts_v2');
    return saved ? JSON.parse(saved) : [
      { 
        id: 101, 
        userName: "Alisher Vohidov", 
        phone: "+998 90 123 45 67", 
        course: "💎 Stress va Psixosomatikani Yechish", 
        amount: "100$ (~1 280 000 so'm)", 
        paymentMethod: "Click Up",
        transactionId: "CLK-892314981",
        status: "pending", 
        time: "10 daqiqa oldin",
        receiptImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80"
      },
      { 
        id: 102, 
        userName: "Nodira Karimova", 
        phone: "+998 93 987 65 43", 
        course: "🔬 Xitoy Davolash Kapsulasi (10 seans)", 
        amount: "350$ (~4 480 000 so'm)", 
        paymentMethod: "Payme",
        transactionId: "PAY-478129032",
        status: "approved", 
        time: "1 soat oldin",
        receiptImage: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80"
      },
      { 
        id: 103, 
        userName: "Javohir Toshpo'latov", 
        phone: "+998 97 555 12 34", 
        course: "🌟 10$ Kurs (3 ta video-darslik)", 
        amount: "10$ (~128 000 so'm)", 
        paymentMethod: "Uzum Bank",
        transactionId: "UZM-112938475",
        status: "pending", 
        time: "35 daqiqa oldin",
        receiptImage: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&auto=format&fit=crop&q=80"
      }
    ];
  });

  const handleApproveReceipt = (id) => {
    const updated = receipts.map(r => r.id === id ? { ...r, status: 'approved' } : r);
    setReceipts(updated);
    localStorage.setItem('sokinqalb_receipts_v2', JSON.stringify(updated));
    if (selectedReceipt?.id === id) {
      setSelectedReceipt({ ...selectedReceipt, status: 'approved' });
    }
  };

  const handleDeleteReceipt = (id) => {
    if (window.confirm("Ushbu to'lov chekini o'chirmoqchimisiz?")) {
      const updated = receipts.filter(r => r.id !== id);
      setReceipts(updated);
      localStorage.setItem('sokinqalb_receipts_v2', JSON.stringify(updated));
      if (selectedReceipt?.id === id) {
        setSelectedReceipt(null);
      }
    }
  };

  const handleSaveNewReceipt = (e) => {
    e.preventDefault();
    if (!newReceiptForm.userName.trim()) return;
    const newReceiptItem = {
      id: Date.now(),
      ...newReceiptForm,
      transactionId: `MAN-${Date.now().toString().slice(-6)}`,
      status: 'approved',
      time: 'Hozirgina'
    };
    const updated = [newReceiptItem, ...receipts];
    setReceipts(updated);
    localStorage.setItem('sokinqalb_receipts_v2', JSON.stringify(updated));
    setShowAddReceiptModal(false);
  };

  // --- PIN CODE AUTHENTICATION VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="py-12 sm:py-24 max-w-md mx-auto px-4 w-full animate-scale-up">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-teal-500/40 shadow-2xl bg-slate-900/95 text-center space-y-6">
          
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-400/40 text-teal-300 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">Admin Panelga Kirish</h2>
            <p className="text-xs text-slate-400">
              Boshqaruv tizimiga kirish uchun maxsus 4 xonali PIN kodni kiriting
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-5">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN Kod (0189)"
                className="w-full text-center tracking-[0.6em] text-2xl font-mono py-3.5 px-4 rounded-2xl bg-slate-950/90 border border-teal-500/40 text-teal-300 placeholder-slate-600 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-bold mt-2 animate-bounce">
                  ❌ Noto'g'ri PIN kod! Qaytadan urinib ko'ring.
                </p>
              )}
            </div>

            {/* Numeric Keypad for Quick Mobile / Desktop Access */}
            <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'OK'].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    if (key === 'C') {
                      setPinInput('');
                    } else if (key === 'OK') {
                      handlePinSubmit();
                    } else {
                      if (pinInput.length < 4) setPinInput(prev => prev + key);
                    }
                  }}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-teal-500/20 text-white font-bold text-base border border-slate-700/80 hover:border-teal-400/40 active:scale-95 transition-all cursor-pointer"
                >
                  {key}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white glowing-button flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/25 active:scale-95 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Tizimga Kirish</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD VIEW ---
  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 w-full animate-fade-in">
      
      {/* Top Header & Logout */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-teal-500/30 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shadow-md shadow-teal-500/20">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-white">Sokin Qalb Boshqaruv Paneli</h2>
            <p className="text-xs text-teal-300 font-semibold">Tizim administratori rejimi faol</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Chiqish (Logout)</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs - 100% Mobile Responsive Horizontal Scroll */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2.5 w-full max-w-full touch-pan-x px-0.5">
          {[
            { id: 'courses', label: 'Kurslar & Seanslar', count: courses.length, icon: BookOpen, emoji: '💎' },
            { id: 'gifts', label: 'Sovg\'alar & Referral', count: gifts.length, icon: Gift, emoji: '🎁' },
            { id: 'team', label: 'Shifokorlar', count: team.length, icon: Users, emoji: '👨‍⚕️' },
            { id: 'tasks', label: 'Kunlik Reja', count: tasks.length, icon: Clock, emoji: '⏰' },
            { id: 'receipts', label: 'To\'lov Cheklari', count: receipts.length, icon: CreditCard, emoji: '💳' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAdminTab(tab.id)}
                className={`flex-shrink-0 whitespace-nowrap px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 sm:space-x-2 transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md shadow-teal-500/25 ring-1 ring-teal-300/50'
                    : 'glass-card text-slate-300 hover:text-white border-white/[0.08] hover:bg-slate-800/80'
                }`}
              >
                <span>{tab.emoji}</span>
                <span className="hidden xs:inline">{tab.label}</span>
                <span className="xs:hidden">{tab.label.split(' ')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-teal-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. COURSES MANAGEMENT TAB */}
      {/* ========================================================================= */}
      {activeAdminTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Kurslar va Seanslar Katalogi</h3>
              <p className="text-xs text-slate-400">Saytdagi barcha 1$, 10$, 50$, 150$, 350$, 500$ lik kurs va seanslarni boshqaring</p>
            </div>
            <button
              onClick={handleOpenAddCourse}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Kurs Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses.map((course) => (
              <div key={course.id} className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between space-y-4 bg-slate-900/90 shadow-lg hover:border-teal-500/30 transition-all">
                <div className="space-y-3 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full badge-teal">
                      {course.badge || (course.is_free ? "🎁 BEPUL" : "💎 PULLIK")}
                    </span>
                    <PlatformBadge platform={course.target_platform} />
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <h4 className="font-bold text-white text-sm sm:text-base leading-snug break-words">
                      {course.title}
                    </h4>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-teal-950/80 border border-teal-500/40 text-teal-300 font-black text-xs sm:text-sm shadow-sm break-all">
                      {course.price}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed break-words line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-2 border-t border-slate-800 pt-3">
                  <button
                    onClick={() => handleOpenEditCourse(course)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-teal-500/20 text-teal-300 border border-slate-700 hover:border-teal-400 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Tahrirlash</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-300 border border-slate-700 hover:border-rose-400 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>O'chirish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GIFTS & REFERRAL REWARDS TAB */}
      {/* ========================================================================= */}
      {activeAdminTab === 'gifts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Sovg'alar & Taklif Tizimi Mukofotlari</h3>
              <p className="text-xs text-slate-400">1 do'st taklif qilganda 1$ kurs ochiladi, 3 ta do'stda 10$ kurs, 5 ta do'stda 50$ kurs va yangi sovg'alar</p>
            </div>
            <button
              onClick={handleOpenAddGift}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Sovg'a Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {gifts.map((gift) => (
              <div key={gift.id} className="glass-panel p-5 rounded-2xl border border-teal-500/25 flex flex-col justify-between space-y-4 bg-slate-900/90 shadow-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300">
                      👥 {gift.required_friends} ta do'st taklifiga
                    </span>
                    <PlatformBadge platform={gift.target_platform} />
                  </div>
                  <h4 className="font-bold text-white text-base leading-snug">{gift.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{gift.description}</p>
                  {gift.reward_course_key && (
                    <div className="text-[11px] text-teal-400 font-mono">
                      Bog'langan kurs kodi: {gift.reward_course_key}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-2 border-t border-slate-800 pt-3">
                  <button
                    onClick={() => handleOpenEditGift(gift)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-teal-500/20 text-teal-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Tahrirlash</span>
                  </button>
                  <button
                    onClick={() => handleDeleteGift(gift.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>O'chirish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TEAM MEMBERS TAB */}
      {/* ========================================================================= */}
      {activeAdminTab === 'team' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Shifokorlar va Psixoterapevtlar</h3>
              <p className="text-xs text-slate-400">Mutaxassislar ma'lumoti, tajribasi va qabul sohalarini boshqaring</p>
            </div>
            <button
              onClick={handleOpenAddMember}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Shifokor Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {team.map((member) => (
              <div key={member.id} className="glass-panel p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between space-y-4 bg-slate-900/90 shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={member.photo_url || member.avatar_url || "/furqat_hero.png"} 
                        alt={member.name}
                        className="w-12 h-12 rounded-xl object-cover border border-teal-500/30"
                      />
                      <div>
                        <h4 className="font-bold text-white text-base">{member.name}</h4>
                        <p className="text-xs text-teal-300 font-semibold">{member.title}</p>
                      </div>
                    </div>
                    <PlatformBadge platform={member.target_platform} />
                  </div>
                  <p className="text-xs text-slate-400 font-mono">📅 {member.experience}</p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{member.methodology}</p>
                </div>

                <div className="flex items-center justify-end space-x-2 border-t border-slate-800 pt-3">
                  <button
                    onClick={() => handleOpenEditMember(member)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-teal-500/20 text-teal-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Tahrirlash</span>
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>O'chirish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DAILY ROUTINE TASKS TAB */}
      {/* ========================================================================= */}
      {activeAdminTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Kunlik Psixologik Intizom Vazifalari</h3>
              <p className="text-xs text-slate-400">07:00, 09:30, 13:30 kabi kunlik amaliyotlar jadvalini tahrirlang</p>
            </div>
            <button
              onClick={handleOpenAddTask}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Vazifa Qo'shish</span>
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.08] flex items-center justify-between gap-4 bg-slate-900/90 shadow-md">
                <div className="flex items-start space-x-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-teal-300 border border-slate-700">
                    {task.time}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-white text-sm sm:text-base">{task.title}</h4>
                      <PlatformBadge platform={task.target_platform} />
                    </div>
                    <p className="text-xs text-teal-200/90 font-medium mt-0.5">{task.benefit}</p>
                    <p className="text-xs text-slate-400 mt-1">{task.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => handleOpenEditTask(task)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-teal-500/20 text-teal-300 border border-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-300 border border-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. RECEIPTS TAB */}
      {/* ========================================================================= */}
      {activeAdminTab === 'receipts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">To'lov Cheklari & Skrinshotlari ({receipts.length} ta)</h3>
              <p className="text-xs text-slate-400">Click, Payme, Uzum orqali yuborilgan haqiqiy to'lov cheklarini ko'ring va tasdiqlang</p>
            </div>
            <button
              onClick={() => setShowAddReceiptModal(true)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white glowing-button flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Chek Qo'shish</span>
            </button>
          </div>

          <div className="space-y-3">
            {receipts.map((r) => (
              <div 
                key={r.id} 
                className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/90 shadow-lg hover:border-teal-500/30 transition-all"
              >
                {/* Left: Receipt Preview Image & Details */}
                <div className="flex items-start sm:items-center space-x-3.5 min-w-0 w-full md:w-auto">
                  {/* Clickable Receipt Thumbnail */}
                  <div 
                    onClick={() => setSelectedReceipt(r)}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-teal-400/40 cursor-pointer group flex-shrink-0 shadow-md bg-slate-950"
                    title="To'liq chekni ochish uchun bosing"
                  >
                    <img 
                      src={r.receiptImage || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80"} 
                      alt="To'lov cheki" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 flex items-center justify-center transition-all">
                      <Eye className="w-5 h-5 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Transaction Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <h4 className="font-bold text-white text-sm sm:text-base truncate">{r.userName}</h4>
                      <span className="text-xs text-slate-400 font-mono">({r.phone})</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-slate-800 text-teal-300 border border-slate-700 font-mono">
                        {r.paymentMethod || "Click"}
                      </span>
                    </div>

                    <p className="text-xs text-teal-300 font-medium mt-0.5">
                      {r.course} — <b className="text-white text-sm">{r.amount}</b>
                    </p>

                    <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono mt-1">
                      <span>🕒 {r.time}</span>
                      {r.transactionId && <span>🆔 {r.transactionId}</span>}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-800 pt-2.5 md:pt-0">
                  <button
                    onClick={() => setSelectedReceipt(r)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-teal-500/20 text-teal-300 border border-slate-700 hover:border-teal-400 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Chekni Ko'rish</span>
                  </button>

                  {r.status === 'approved' ? (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-500/40 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tasdiqlangan</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApproveReceipt(r.id)}
                      className="px-4 py-2 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      Tasdiqlash & Kursni Ochish
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteReceipt(r.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-300 border border-slate-700 cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL-SCREEN RECEIPT LIGHTBOX MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-teal-500/40 max-w-xl w-full bg-slate-900/98 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">To'lov Skrinshoti & Hujjati</span>
                <h4 className="font-bold text-white text-base sm:text-lg">
                  {selectedReceipt.userName} — {selectedReceipt.amount}
                </h4>
              </div>
              <button 
                onClick={() => setSelectedReceipt(null)} 
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Receipt Image Display */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-teal-500/30 bg-slate-950 max-h-[380px] flex items-center justify-center group">
              <img 
                src={selectedReceipt.receiptImage || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80"} 
                alt="To'lov cheki skrinshoti" 
                className="w-full max-h-[380px] object-contain"
              />
            </div>

            {/* Receipt Summary Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 font-medium">
              <div>
                <span className="text-slate-500 block text-[10px]">Mijoz:</span>
                <span className="text-white font-bold">{selectedReceipt.userName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Telefon:</span>
                <span className="text-teal-300 font-mono font-bold">{selectedReceipt.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Kurs / Seans:</span>
                <span className="text-white">{selectedReceipt.course}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">To'lov Tizimi:</span>
                <span className="text-amber-300 font-mono">{selectedReceipt.paymentMethod || "Click"}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleDeleteReceipt(selectedReceipt.id)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 flex items-center space-x-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>O'chirish</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
                >
                  Yopish
                </button>
                {selectedReceipt.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => handleApproveReceipt(selectedReceipt.id)}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
                  >
                    Tasdiqlash & Kursni Ochish
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ADD RECEIPT MODAL */}
      {showAddReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 max-w-lg w-full bg-slate-900/98 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base">Yangi To'lov Cheki Qo'shish</h4>
              <button onClick={() => setShowAddReceiptModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewReceipt} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Mijoz Ismi:</label>
                  <input
                    type="text"
                    required
                    value={newReceiptForm.userName}
                    onChange={e => setNewReceiptForm({ ...newReceiptForm, userName: e.target.value })}
                    placeholder="Alisher Vohidov"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Telefon Raqami:</label>
                  <input
                    type="text"
                    required
                    value={newReceiptForm.phone}
                    onChange={e => setNewReceiptForm({ ...newReceiptForm, phone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">To'lov Summasi:</label>
                  <input
                    type="text"
                    required
                    value={newReceiptForm.amount}
                    onChange={e => setNewReceiptForm({ ...newReceiptForm, amount: e.target.value })}
                    placeholder="100$ (~1 280 000 so'm)"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">To'lov Tizimi:</label>
                  <select
                    value={newReceiptForm.paymentMethod}
                    onChange={e => setNewReceiptForm({ ...newReceiptForm, paymentMethod: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Click Up">Click Up</option>
                    <option value="Payme">Payme</option>
                    <option value="Uzum Bank">Uzum Bank</option>
                    <option value="Karta / Bank">Karta / Bank</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Tanlangan Kurs / Xizmat:</label>
                <input
                  type="text"
                  required
                  value={newReceiptForm.course}
                  onChange={e => setNewReceiptForm({ ...newReceiptForm, course: e.target.value })}
                  placeholder="💎 Stress va Psixosomatikani Yechish"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              {/* Receipt Image Upload (Gallery & Camera) */}
              <ImageUploadPicker
                label="To'lov Cheki Skrinshoti (Galereya yoki Kamera)"
                currentImage={newReceiptForm.receiptImage}
                onImageSelected={(imgData) => setNewReceiptForm({ ...newReceiptForm, receiptImage: imgData })}
              />

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReceiptModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white glowing-button cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS FOR ADD / EDIT */}
      {/* ========================================================================= */}

      {/* COURSE MODAL */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 max-w-lg w-full bg-slate-900/95 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base">
                {editingCourse ? "Kursni Tahrirlash" : "Yangi Kurs Qo'shish"}
              </h4>
              <button onClick={() => setShowCourseModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Kurs Nomi:</label>
                <input
                  type="text"
                  required
                  value={courseFormData.title}
                  onChange={e => setCourseFormData({ ...courseFormData, title: e.target.value })}
                  placeholder="Masalan: Panik Atakani Yengish Kursi"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              {/* Target Platform Selector (Sayt / Bot / Ikkalasida) */}
              <PlatformSelector 
                value={courseFormData.target_platform} 
                onChange={(val) => setCourseFormData({ ...courseFormData, target_platform: val })} 
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Narxi (Matn):</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.price}
                    onChange={e => setCourseFormData({ ...courseFormData, price: e.target.value })}
                    placeholder="10$ (~128 000 so'm)"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Narxi USD ($):</label>
                  <input
                    type="number"
                    value={courseFormData.price_usd}
                    onChange={e => setCourseFormData({ ...courseFormData, price_usd: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Nishon (Badge):</label>
                <input
                  type="text"
                  value={courseFormData.badge}
                  onChange={e => setCourseFormData({ ...courseFormData, badge: e.target.value })}
                  placeholder="1 Do'st = Bepul / Premium / VIP"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Tavsif (Description):</label>
                <textarea
                  rows="3"
                  value={courseFormData.description}
                  onChange={e => setCourseFormData({ ...courseFormData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white glowing-button cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GIFT MODAL */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 max-w-lg w-full bg-slate-900/95 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base">
                {editingGift ? "Sovg'ani Tahrirlash" : "Yangi Sovg'a Qo'shish"}
              </h4>
              <button onClick={() => setShowGiftModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGift} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Sovg'a Nomi:</label>
                <input
                  type="text"
                  required
                  value={giftFormData.title}
                  onChange={e => setGiftFormData({ ...giftFormData, title: e.target.value })}
                  placeholder="1$ Kurs / 10$ Kurs / Xitoy Kapsulasi Seansi"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              {/* Target Platform Selector (Sayt / Bot / Ikkalasida) */}
              <PlatformSelector 
                value={giftFormData.target_platform} 
                onChange={(val) => setGiftFormData({ ...giftFormData, target_platform: val })} 
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kerakli do'stlar soni:</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={giftFormData.required_friends}
                    onChange={e => setGiftFormData({ ...giftFormData, required_friends: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Ochiladigan kurs kodi:</label>
                  <input
                    type="text"
                    value={giftFormData.reward_course_key}
                    onChange={e => setGiftFormData({ ...giftFormData, reward_course_key: e.target.value })}
                    placeholder="1usd, 10usd, 50usd, session"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Sovg'a Tavsifi:</label>
                <textarea
                  rows="3"
                  value={giftFormData.description}
                  onChange={e => setGiftFormData({ ...giftFormData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGiftModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white glowing-button cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEAM MEMBER MODAL */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 max-w-lg w-full bg-slate-900/95 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base">
                {editingMember ? "Shifokor Ma'lumotlarini Tahrirlash" : "Yangi Shifokor Qo'shish"}
              </h4>
              <button onClick={() => setShowMemberModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Ism Sharif:</label>
                <input
                  type="text"
                  required
                  value={memberFormData.name}
                  onChange={e => setMemberFormData({ ...memberFormData, name: e.target.value })}
                  placeholder="Masalan: Bag'ibekov Furqat"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              {/* Target Platform Selector (Sayt / Bot / Ikkalasida) */}
              <PlatformSelector 
                value={memberFormData.target_platform} 
                onChange={(val) => setMemberFormData({ ...memberFormData, target_platform: val })} 
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Lavozim / Unvon:</label>
                  <input
                    type="text"
                    value={memberFormData.title}
                    onChange={e => setMemberFormData({ ...memberFormData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Ish Tajribasi:</label>
                  <input
                    type="text"
                    value={memberFormData.experience}
                    onChange={e => setMemberFormData({ ...memberFormData, experience: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* Doctor Photo Picker (Gallery & Real Camera) */}
              <ImageUploadPicker
                label="Shifokor Fotosurati (Galereya yoki Real Kamera)"
                currentImage={memberFormData.photo_url}
                onImageSelected={(imgData) => setMemberFormData({ ...memberFormData, photo_url: imgData })}
              />

              <div>
                <label className="block text-slate-300 font-bold mb-1">Metodika va Yondashuv:</label>
                <textarea
                  rows="3"
                  value={memberFormData.methodology}
                  onChange={e => setMemberFormData({ ...memberFormData, methodology: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white glowing-button cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TASK MODAL */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 max-w-lg w-full bg-slate-900/95 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base">
                {editingTask ? "Vazifani Tahrirlash" : "Yangi Kunlik Vazifa"}
              </h4>
              <button onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Vaqti (HH:MM):</label>
                  <input
                    type="text"
                    required
                    value={taskFormData.time}
                    onChange={e => setTaskFormData({ ...taskFormData, time: e.target.value })}
                    placeholder="07:00"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-300 font-bold mb-1">Vazifa Sarlavhasi:</label>
                  <input
                    type="text"
                    required
                    value={taskFormData.title}
                    onChange={e => setTaskFormData({ ...taskFormData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* Target Platform Selector (Sayt / Bot / Ikkalasida) */}
              <PlatformSelector 
                value={taskFormData.target_platform} 
                onChange={(val) => setTaskFormData({ ...taskFormData, target_platform: val })} 
              />

              <div>
                <label className="block text-slate-300 font-bold mb-1">Foydasi (Benefit):</label>
                <input
                  type="text"
                  value={taskFormData.benefit}
                  onChange={e => setTaskFormData({ ...taskFormData, benefit: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Ko'rsatma va Yo'riqnoma:</label>
                <textarea
                  rows="3"
                  value={taskFormData.description}
                  onChange={e => setTaskFormData({ ...taskFormData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white glowing-button cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
