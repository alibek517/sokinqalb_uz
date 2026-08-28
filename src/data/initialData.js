// Sokin Qalb Web App — Initial Data Layer

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    category: "Stress va Xavotir",
    question: "Oxirgi 2 haftada o'zingizda asabiylik, kuchli ichki xavotir yoki bezovtalikni qanchalik tez-tez his qildingiz?",
    options: [
      { text: "Deyarli hech qachon (Hammasi joyida)", score: 10, risk: 0 },
      { text: "Ba'zida, qiyin vaziyatlarda", score: 7, risk: 0 },
      { text: "Haftada bir necha bor", score: 4, risk: 1 },
      { text: "Har kuni, doimiy taranglikdaman", score: 1, risk: 2 }
    ]
  },
  {
    id: 2,
    category: "Uyqu Sifati",
    question: "Kechasi uxlashga yotganingizda va ertalab uyg'onganingizda o'zingizni qanday his qilasiz?",
    options: [
      { text: "Tez uxlab, ertalab tetik uyg'onaman", score: 10, risk: 0 },
      { text: "Uxlashim biroz qiyin, lekin dam olaman", score: 7, risk: 0 },
      { text: "Fikrlar ko'pligidan uxlay olmayman, charchoq sezaman", score: 4, risk: 1 },
      { text: "Surunkali uyqusizlik, tunda vahima yoki dahshatli tushlar", score: 1, risk: 2 }
    ]
  },
  {
    id: 3,
    category: "Psixosomatika va Tana",
    question: "Tanangizda sababsiz yurak tez urishi, bo'g'ilish, bosh yoki yelka qisilishlari bo'ladimi?",
    options: [
      { text: "Yo'q, tanam yengil va sog'lom", score: 10, risk: 0 },
      { text: "Faqat kuchli jismoniy charchoqda", score: 7, risk: 0 },
      { text: "Stress bo'lganda yurak qisilib, havo yetmaydi", score: 4, risk: 1 },
      { text: "Tez-tez panik ataka va tana qisilishlari bo'ladi", score: 1, risk: 2 }
    ]
  },
  {
    id: 4,
    category: "Emotsional Barqarorlik",
    question: "Kutilmagan muammo yoki arzimagan narsaga nisbatan hissiyotlaringiz qanday bo'ladi?",
    options: [
      { text: "Xotirjam va bosiqlik bilan yechim izlayman", score: 10, risk: 0 },
      { text: "Biroz asabiylashaman, keyin tinchlanaman", score: 7, risk: 0 },
      { text: "Tez jahl otiga minaman yoki yig'lab yuboraman", score: 4, risk: 1 },
      { text: "Tuyg'ularimni boshqara olmayman, apatiya yoki portlash bo'ladi", score: 1, risk: 2 }
    ]
  },
  {
    id: 5,
    category: "Ong Osti Bloklari",
    question: "O'tmishdagi xafagarchiliklar, aybdorlik hissi yoki kelajak qo'rquvi sizni qanchalik qiynaydi?",
    options: [
      { text: "O'tmishdan minnatdorman, kelajakka ishonchim komil", score: 10, risk: 0 },
      { text: "Ba'zan esga tushsa xafa bo'laman, lekin o'tib ketadi", score: 7, risk: 0 },
      { text: "Eski og'riqlar va qo'rquvlar doim ongimda aylanadi", score: 4, risk: 1 },
      { text: "Ichki bloklar hayotimni va rivojlanishimni butunlay to'sib qo'ygan", score: 1, risk: 2 }
    ]
  },
  {
    id: 6,
    category: "Hayotiy Quvvat (Energiya)",
    question: "Kun davomida o'zingizda yashashga, ishlashga va yangilik qilishga kuch-quvvat sezasizmi?",
    options: [
      { text: "Doim yuqori energiyadaman va zavqlanib yashayman", score: 10, risk: 0 },
      { text: "Kun oxirida biroz charchayman, bu tabiiy", score: 7, risk: 0 },
      { text: "Ertalabdan charchoq va lohaslik his qilaman", score: 4, risk: 1 },
      { text: "Butunlay quvvatsizman, hech narsa qilishga xohish yo'q (Burnout)", score: 1, risk: 2 }
    ]
  },
  {
    id: 7,
    category: "Munosabatlar",
    question: "Oila a'zolaringiz, yaqinlaringiz va atrofdagilar bilan munosabatingiz qanday?",
    options: [
      { text: "Iliqlik, o'zaro tushunish va hurmat ustun", score: 10, risk: 0 },
      { text: "Odatdagi yaxshi, ba'zida mayda kelishmovchiliklar bor", score: 7, risk: 0 },
      { text: "Ko'p tushunmovchiliklar, sovuqlik va xafagarchiliklar bor", score: 4, risk: 1 },
      { text: "O'tkir inqiroz, yolg'izlik va yaqinlardan begonalashish", score: 1, risk: 2 }
    ]
  },
  {
    id: 8,
    category: "O'z-o'zini Qadrlash",
    question: "O'zingizga bo'lgan ishonch va o'z qadringizni his qilishingiz darajasi qanday?",
    options: [
      { text: "O'zimni yaxshi ko'raman va xatolarimni qabul qilaman", score: 10, risk: 0 },
      { text: "Yetarlicha o'zimga ishonaman", score: 7, risk: 0 },
      { text: "O'zimni ko'p tanqid qilaman va ayblayman", score: 4, risk: 1 },
      { text: "O'zimdan nafratlanish va o'ziga ishonchsizlik kuchli", score: 1, risk: 2 }
    ]
  },
  {
    id: 9,
    category: "Moddiy Xotirjamlik",
    question: "Pul va moliyaviy holat sizda qanchalik ruhiy bosim yoki xavotir uyg'otadi?",
    options: [
      { text: "Moliyaviy xotirjamman, pulni erkin boshqaraman", score: 10, risk: 0 },
      { text: "Rejalashtirib sarflayman, jiddiy stress yo'q", score: 7, risk: 0 },
      { text: "Doim pul yetishmovchiligi xavotiri qiynaydi", score: 4, risk: 1 },
      { text: "Moliyaviy inqiroz sababli kuchli psixologik tushkunlikdaman", score: 1, risk: 2 }
    ]
  },
  {
    id: 10,
    category: "Ichki Xotirjamlik Istagi",
    question: "Hayotingizda qanday tub o'zgarish va ichki xotirjamlikka erishishni xohlaysiz?",
    options: [
      { text: "Yangi ma'naviy va shaxsiy cho'qqilarni zabt etish", score: 10, risk: 0 },
      { text: "Kundalik stressni kamaytirish va odatlarni to'g'rilash", score: 7, risk: 0 },
      { text: "Xavotir, qo'rquv va asabiylikdan butunlay qutulish", score: 4, risk: 1 },
      { text: "Klinik darajadagi chuqur shifo va yangi hayot boshlash", score: 1, risk: 2 }
    ]
  }
];

export const HOURLY_ROUTINE = [
  {
    id: "task_1",
    time: "07:00",
    title: "Tonggi Uyg'onish & Vagus Nervi Relaksatsiyasi",
    benefit: "Miya neyronlarini stressdan tozalab, kunga xotirjam energiya bag'ishlaydi.",
    description: "4-7-8 nafas mashqi: 4 soniya burun orqali chuqur nafas oling, 7 soniya ushlab turing va 8 soniya og'iz orqali sekin chiqaring. 5 marta takrorlang.",
    category: "morning",
    icon: "Sunrise"
  },
  {
    id: "task_2",
    time: "09:30",
    title: "1 Stakan Iliq Suv & Ongli Niyat Amaliyoti",
    benefit: "Miya qon aylanishini va organizm metabolizmini yaxshilaydi.",
    description: "Iliq suvni shoshilmasdan, har bir qultumini his qilib iching. Ichingizda 'Bugungi kunim xotirjamlik va barakaga to'la' deb takrorlang.",
    category: "morning",
    icon: "Droplets"
  },
  {
    id: "task_3",
    time: "13:30",
    title: "Tushlikdan Keyingi 3 Daqiqalik Tana Qisilishlarini Bo'shatish",
    benefit: "Yelka, bo'yin va ko'krak qafasidagi psixosomatik bloklarni yechadi.",
    description: "Yelkalaringizni orqaga 10 marta aylantiring, boshingizni o'ng va chapga sekin eging. Tanadagi taranglik erib ketayotganini tasavvur qiling.",
    category: "afternoon",
    icon: "Smile"
  },
  {
    id: "task_4",
    time: "17:30",
    title: "Kechki Toza Havo & 15 Daqiqalik Ongli Sayr",
    benefit: "Kun davomida to'plangan kortizol (stress gormoni)ni parchalaydi.",
    description: "Telefonni chetga surib, tabiat tovushlariga va qadamlaringiz ritmiga diqqat qarating.",
    category: "evening",
    icon: "Footprints"
  },
  {
    id: "task_5",
    time: "21:30",
    title: "Uxlashdan Oldingi Minnatdorlik & Neyro-Audio Tinglash",
    benefit: "Miyani chuqur delta to'lqinlariga tushirib, sifatli va shifobaxsh uyqu ta'minlaydi.",
    description: "Bugun ro'y bergan 3 ta yaxshi voqeani eslang va Sokin Qalb audio meditatsiyasini tinglab uyquga keting.",
    category: "night",
    icon: "Moon"
  }
];

export const INITIAL_TEAM = [
  {
    id: 1,
    member_key: "furqat",
    name: "Bag'ibekov Furqat",
    title: "Bosh Psixoterapevt, Sokin Qalb markazi asoschisi",
    experience: "12 yillik klinik tajriba",
    avatar_icon: "👨‍⚕️",
    photo_file_id: null,
    photo_url: "/furqat_bagibekov.png",
    avatar_url: "/furqat_bagibekov.png",
    directions: [
      "Kognitiv-xulq-atvor psixoterapiyasi va neyropsixologiya",
      "Chuqur somatik tana terapiyasi va psixosomatika",
      "Surunkali stress, vahima (panik ataka) va chuqur psixozlar",
      "Ong osti psixologik travmalari va ildiz bloklarini yechish"
    ],
    methodology: "💊 Xitoy Davolash Kapsulasi (Kapsulaterapiya) + 💡 Fransiya Neyro-Lampasi (stroboskopik nur) + 🎶 Maxsus Neyro-Akustik Musiqa. Ushbu uchlik ong ostidagi stress va psixoz bloklarini ildizi bilan ochishga va 100% dori-darmonsiz to'liq davolashga xizmat qiladi.",
    achievements: [
      "15,400+ muvaffaqiyatli sog'lomlashtirilgan mijozlar",
      "89% holatda 14 kunda vahima va xavotirdan to'liq xalos qilish",
      "94% mijozlarda sifatli uyqu va ruhiy immunitetni tiklash",
      "4.95 / 5.0 mijozlar mamnuniyat bahosi"
    ]
  },
  {
    id: 2,
    member_key: "dilfuza",
    name: "Muminova Dilfuza",
    title: "Yetakchi Psixoterapevt, Ayollar va Oilaviy Psixologiya Eksperti",
    experience: "15 yillik professional tajriba",
    avatar_icon: "👩‍⚕️",
    photo_file_id: null,
    photo_url: "/dilfuza_muminova.png",
    avatar_url: "/dilfuza_muminova.png",
    directions: [
      "Ayollar ruhiy salomatligi va ichki resurslarini qayta tiklash",
      "Oilaviy munosabatlar inqirozi, ajralish va xiyonat og'riqlari",
      "Tug'ruqdan keyingi depressiya va hissiy charchoq (burnout)",
      "Bolalik travmalari, qo'rquvlar va o'ziga ishonchsizlik"
    ],
    methodology: "🌿 Gestalt va Tizimli Oilaviy Terapiya + 💎 Hissiy Tozalash Texnikalari + 🎨 Integrativ Art-Terapiya. Ayollarning ichki go'zalligi va qadrini tiklashga qaratilgan nozik yondashuv.",
    achievements: [
      "12,000+ muvaffaqiyatli individual va oilaviy konsultatsiyalar",
      "Minglab oilalarni ajralish yoqasidan saqlab qolish va totuvlikka qaytarish",
      "Ko'plab ayollarga o'z qadrini bilish va baxtli hayot qurishda yo'l ko'rsatish"
    ]
  },
  {
    id: 3,
    member_key: "temur",
    name: "Baydjanov Temur",
    title: "Yetakchi Psixoterapevt, Neyropsixologik Xulq-atvor Mutaxassisi",
    experience: "10 yillik klinik tajriba",
    avatar_icon: "👨‍⚕️",
    photo_file_id: null,
    photo_url: "/temur_baydjanov.png",
    avatar_url: "/temur_baydjanov.png",
    directions: [
      "Erkaklar psixologiyasi va yuqori mas'uliyatdagi hissiy bosim",
      "Biznes, moliya va faoliyatdagi o'tkir stress va inqirozlar",
      "Nevrozlar, fobiya, vahima (panika) va uyqusizlik",
      "Agressiya, asabiylik va ichki zo'riqishni boshqarish"
    ],
    methodology: "🧠 Kognitiv-Xulq-atvor Terapiyasi (KXT / REBT) + 🫁 Vagus Nervi va Nafas Neyro-Terapiyasi + 🛡 Psixologik Immunitet strategiyasi.",
    achievements: [
      "8,500+ dori-darmonsiz sog'lomlashtirilgan mijozlar",
      "Rahbarlar va tadbirkorlarning hissiy quvvatini tiklash bo'yicha yuqori natijalar",
      "O'tkir nevroz va xavotirlarni qisqa muddatda bartaraf etish"
    ]
  }
];

export const INITIAL_COURSES = [
  {
    id: 1,
    course_key: "free",
    title: "🌿 Sokinlik Sari Ilk Qadam (Kirish Kursi)",
    category: "course",
    price: "0$ (Bepul)",
    price_usd: 0,
    price_uzs: 0,
    duration: "1 kunlik amaliyot",
    author: "Psixoterapevt Bagbekov Furqat",
    badge: "Bepul Dars",
    target: "Ichki xotirjamlikni his qilish va o'z ong osti bilan tanishishni xohlovchilar uchun.",
    features: [
      "3 ta audio-darslik va tushuntirish",
      "Vagus nervi relaksatsiya texnikasi",
      "Dastlabki stress va bloklar tahlili"
    ],
    description: "Ushbu bepul kirish darsida siz ichki xavotir va stressdan 1 daqiqada qutulishning asosiy psixologik sirlarini o'rganasiz.",
    lessons: [
      { id: 1, title: "1-Dars: Nafas orqali vahimani to'xtatish", type: "audio", duration: "7:40" },
      { id: 2, title: "2-Dars: Tana psixosomatikasi bilan tanishuv", type: "video", duration: "12:15" },
      { id: 3, title: "3-Dars: Kunlik xotirjamlik odatlari", type: "audio", duration: "9:20" }
    ]
  },
  {
    id: 2,
    course_key: "1usd",
    title: "💎 1$ Kurs (1 ta darslik)",
    category: "course",
    price: "1$ (~12 800 so'm)",
    price_usd: 1,
    price_uzs: 12800,
    duration: "1 ta eksklyuziv video-darslik",
    author: "Psixoterapevt Bagbekov Furqat",
    badge: "1 Do'st = Bepul",
    target: "Panik ataka, vahima va to'satdan yurak qisilishini tezkor to'xtatmoqchi bo'lganlar uchun.",
    features: [
      "1 ta to'liq chuqur video-darslik",
      "Nafas va tana mashqlari protokoli",
      "Qo'rquvni ongli boshqarish amaliyoti"
    ],
    description: "Tezkor psixoterapevtik texnika orqali o'tkir xavotir xurujini bir zumda to'xtatish metodikasi.",
    lessons: [
      { id: 1, title: "Panik ataka va kuchli vahimani 3 daqiqada to'xtatish", type: "video", duration: "24:30" }
    ]
  },
  {
    id: 3,
    course_key: "10usd",
    title: "🌟 10$ Kurs (3 ta darslik)",
    category: "course",
    price: "10$ (~128 000 so'm)",
    price_usd: 10,
    price_uzs: 128000,
    duration: "3 ta chuqur video-darslik",
    author: "Psixoterapevt Bagbekov Furqat",
    badge: "3 Do'st = Bepul",
    target: "Surunkali xavotir, asabiylik va psixosomatik tana qisilishlarini bartaraf etmoqchi bo'lganlar uchun.",
    features: [
      "3 ta chuqur tizimli video-darslik",
      "Ong osti xavotirlarini tozalash mashqlari",
      "Tana mushaklarini bo'shatish amaliyoti"
    ],
    description: "3 bosqichli amaliy darsliklar orqali ichki tanqidchini to'xtatish va barqaror xotirjamlikka erishish kursi.",
    lessons: [
      { id: 1, title: "1-Dars: Ong osti xavotirlari va stress ildizini aniqlash", type: "video", duration: "28:10" },
      { id: 2, title: "2-Dars: Psixosomatik bloklarni tana mashqlari bilan yechish", type: "video", duration: "32:45" },
      { id: 3, title: "3-Dars: Hissiy intellekt va ichki xotirjamlikni mustahkamlash", type: "video", duration: "25:50" }
    ]
  },
  {
    id: 4,
    course_key: "100usd",
    title: "💫 100$ Kurs (5 ta darslik + konsultatsiya)",
    category: "course",
    price: "100$ (~1 280 000 so'm)",
    price_usd: 100,
    price_uzs: 1280000,
    duration: "5 ta video + Bepul Shaxsiy Konsultatsiya",
    author: "Psixoterapevt Bagbekov Furqat",
    badge: "10 Do'st = Bepul",
    target: "Hayotida to'liq ruhiy transformatsiyaga erishish va dori-darmonsiz doimiy yashashni istovchilar uchun.",
    features: [
      "5 ta mualliflik video-darsliklari",
      "Furqat Bag'ibekov bilan 1-on-1 bepul konsultatsiya (45 daqiqa)",
      "Moliyaviy va munosabatlar bloklarini yechish",
      "1 oylik mentorlik strategiyasi"
    ],
    description: "To'liq psixologik transformatsiya kursi va Furqat Bag'ibekov bilan shaxsiy konsultatsiya.",
    lessons: [
      { id: 1, title: "1-Dars: Chuqur ruhiy transformatsiya va ichki bloklarni sindirish", type: "video", duration: "40:00" },
      { id: 2, title: "2-Dars: Moliyaviy psixologiya va ichki chegaralarni kengaytirish", type: "video", duration: "35:15" },
      { id: 3, title: "3-Dars: Psixosomatika va biologik quvvatni tiklash", type: "video", duration: "38:40" },
      { id: 4, title: "4-Dars: Toksik munosabatlardan xalos bo'lish va sog'lom chegaralar", type: "video", duration: "42:10" },
      { id: 5, title: "5-Dars: 1 Oylik shaxsiy mentorlik va doimiy xotirjamlik", type: "video", duration: "45:00" }
    ]
  },
  {
    id: 5,
    course_key: "150usd_session",
    title: "🌿 1 Seans: Konsultatsiya + Kapsulaterapiya + Fransiya Neyro-Lampasi",
    category: "session",
    price: "150$ (~1 920 000 so'm)",
    price_usd: 150,
    price_uzs: 1920000,
    duration: "1 ta to'liq kompleks klinik seans (90 daqiqa)",
    author: "Psixoterapevt Bagbekov Furqat",
    badge: "Klinik Terapiya",
    target: "Tezkor ruhiy yengillashish, ong ostidagi xavotir, qo'rquv va tana bloklarini bir seansda yechmoqchi bo'lganlar uchun.",
    features: [
      "Shaxsiy konsultatsiya va ildiz diagnostikasi",
      "Xitoydan keltirilgan davolash Kapsulasi",
      "Fransiyadan keltirilgan ko'z neyro-lampasi (stroboskop)",
      "Maxsus neyro-akustik musiqa terapiyasi"
    ],
    description: "Furqat Bag'ibekovning 12 yillik amaliyoti, Xitoy kapsulaterapiyasi va Fransiya neyro-chirog'i uyg'unlashgan jonli davolash.",
    lessons: []
  },
  {
    id: 6,
    course_key: "350usd_session",
    title: "🌿 3 Seans: 3 ta Chuqur Terapiya (Konsultatsiya + Kapsula + Fransiya Lampasi)",
    category: "session",
    price: "350$ (~4 480 000 so'm)",
    price_usd: 350,
    price_uzs: 4480000,
    duration: "3 ta tizimli kompleks klinik seans",
    author: "Psixoterapevt Bagbekov Furqat",
    badge: "Kompleks Davolash",
    target: "Surunkali stress, uzoq yillik vahima (panika), depressiv holat va psixosomatikani ildizi bilan to'liq davolash uchun.",
    features: [
      "3 ta individual psixoterapevtik konsultatsiya",
      "3 ta Xitoy Kapsulaterapiya seansi",
      "3 ta Fransiya neyro-lampasi seansi",
      "To'liq psixosomatik tiklanish kafolati"
    ],
    description: "3 seanslik kompleks terapiya orqali barcha psixosomatik va ruhiy bloklar ildizi bilan bartaraf etiladi.",
    lessons: []
  },
  {
    id: 7,
    course_key: "500usd_vip_session",
    title: "👑 VIP Seans: VIP Konsultatsiya + VIP Kapsulaterapiya & Neyro-Texnologiyalar",
    category: "session",
    price: "500$ (~6 400 000 so'm)",
    price_usd: 500,
    price_uzs: 6400000,
    duration: "VIP Individual Kompleks Transformatsiya Dasturi",
    author: "Psixoterapevt Bagbekov Furqat",
    badge: "VIP Individual",
    target: "Maksimal individual yondashuv, katta hayotiy/biznes inqirozlardan tezkor chiqish va VIP darajadagi ruhiy erkinlikni xohlovchilar uchun.",
    features: [
      "To'g'ridan-to'g'ri VIP Konsultatsiya",
      "VIP Kapsulaterapiya va Fransiya neyro-yorug'lik protokoli",
      "24/7 shaxsiy aloqa va 1 oylik to'liq psixologik hamrohlik"
    ],
    description: "VIP darajadagi ushbu individual dastur orqali shaxsiy, ruhiy va moddiy sohalardagi barcha to'siqlar butunlay bartaraf etiladi.",
    lessons: []
  },
  {
    id: 8,
    course_key: "retreat_uzb",
    title: "🏔 Retreat O'zbekiston (Tog' Bag'rida Qayta Yuklanish)",
    category: "retreat",
    price: "Boshlanish vaqtida e'lon qilinadi",
    price_usd: 0,
    price_uzs: 0,
    duration: "3 kun / 2 kecha (O'zbekiston Tog'larida Jonli)",
    author: "Psixoterapevt Bagbekov Furqat & Jamoa",
    badge: "Jonli Retreat",
    target: "Shahar shovqini va stressdan butunlay uzilib, go'zal tabiat qo'ynida ruhiy va jismoniy yangilanmoqchi bo'lganlar uchun.",
    features: [
      "Tog' bag'ridagi so'lim ekohotelda yashash",
      "Jonli psixoterapiya va tana amaliyotlari",
      "Raqamli detoks va meditatsiyalar"
    ],
    description: "O'zbekistonning so'lim tog'larida 3 kunlik to'liq yangilanish retreati.",
    lessons: []
  },
  {
    id: 9,
    course_key: "retreat_thailand",
    title: "🌴 Retreat Tailand (Tropik Okean Sohilida Sokinlik)",
    category: "retreat",
    price: "Boshlanish vaqtida e'lon qilinadi",
    price_usd: 0,
    price_uzs: 0,
    duration: "7 kun / 6 kecha (Tailand Tropik Orolida)",
    author: "Psixoterapevt Bagbekov Furqat & Xalqaro Ekspertlar",
    badge: "Xalqaro Sayohat",
    target: "Butunlay yangi muhitda o'z qalbini kashf qilish, okean energiyasi bilan to'yinish va yangi maqsadlar sari qadam tashlamoqchi bo'lganlar uchun.",
    features: [
      "Okean bo'yidagi premium villa",
      "Chuqur VIP psixoterapiya va meditatsiyalar",
      "Ekzotik sayohatlar va tanani yoshartirish"
    ],
    description: "Tailandning tropik orolida 7 kunlik unutilmas ruhiy va jismoniy transformatsiya sayohati.",
    lessons: []
  }
];

export const INITIAL_GIFTS = [
  {
    id: 1,
    gift_key: "gift_1",
    title: "1$ Kurs (1 ta darslik)",
    required_friends: 1,
    reward_course_key: "1usd",
    description: "1 ta do'stingizni taklif qiling va 1$ lik panik ataka hamda vahimaga qarshi video-darslikni bepul oching!"
  },
  {
    id: 2,
    gift_key: "gift_2",
    title: "10$ Kurs (3 ta darslik)",
    required_friends: 3,
    reward_course_key: "10usd",
    description: "3 ta do'stingizni taklif qiling va 10$ lik 3 bosqichli to'liq video-darsliklar kursini bepul oching!"
  },
  {
    id: 3,
    gift_key: "gift_3",
    title: "100$ Kurs (5 ta darslik + Konsultatsiya)",
    required_friends: 10,
    reward_course_key: "100usd",
    description: "10 ta do'stingizni taklif qiling va 100$ lik 5 ta video-darslik hamda Furqat Bag'ibekov bilan 1-on-1 bepul konsultatsiyani oching!"
  }
];

export const REFERRAL_REWARDS = INITIAL_GIFTS;

export const FOUR_PILLARS = {
  financial: {
    id: "financial",
    title: "1. Moliyaviy Xotirjamlik",
    aspects: ["Pul xavotiridan xalos bo'lish", "Kambag'allik qo'rquvini yechish", "Ong osti farovonlik dasturi"],
    description: "Moddiy sohadagi doimiy xavotir va taranglik inson ruhiyatini toliqtiradi. Moliyaviy bloklarni yechish orqali erkinlikka erishing."
  },
  mental: {
    id: "mental",
    title: "2. Ruhiy Xotirjamlik",
    aspects: ["Ortiqcha fikrlarni to'xtatish", "Vahima va panikani yengish", "Ichki sukunat va ong nazorati"],
    description: "Ruhiy barqarorlik barcha yutuqlarning poydevoridir. Tinch ong to'g'ri qarorlar qabul qilishga imkon beradi."
  },
  physical: {
    id: "physical",
    title: "3. Jismoniy & Tana Salomatligi",
    aspects: ["Tana psixosomatik qisilishlari", "Chuqur va sifatli uyqu", "Biologik quvvat va immunitet"],
    description: "Stress avvalo tanada spazm va og'riqlar ko'rinishida yig'iladi. Kapsulaterapiya mushak bloklarini to'liq bo'shatadi."
  },
  relationships: {
    id: "relationships",
    title: "4. Munosabatlar & Oila",
    aspects: ["Oila va turmush o'rtoq bilan totuvlik", "Xafagarchiliklarni kechirish", "Hissiy chegaralarni o'rnatish"],
    description: "Yaqinlar bilan samimiy va mehrli muloqot insonning eng katta quvvat manbaidir."
  }
};
