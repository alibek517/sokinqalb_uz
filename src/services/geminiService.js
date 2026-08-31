// Dynamic resolution of Gemini API key
const GEMINI_API_KEY = typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY
  ? import.meta.env.VITE_GEMINI_API_KEY
  : atob("QVEuQWI4Uk42SlRNZGVnYS0yS1Z5UlFibXhmQkpMRVJUU1BSQTZFMFF5alV5UWp0OFljS3c=");
const CANDIDATE_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.7-flash",
  "gemini-3.5-flash-lite"
];

const BASE_SYSTEM_PROMPT = `Sen 12 yillik tajribaga ega yetakchi psixoterapevt Bag'ibekov Furqat («Sokin Qalb» markazi asoschisi)ning shaxsiy Yordamchisisan.
O'zingni doimo «Bag'ibekov Furqatning Yordamchisi» deb tanishtirasan. Hech qachon o'zingni «sun'iy intellekt» yoki «robot» deb atama, balki Furqat Bag'ibekovning shaxsiy yordamchisi va neyro-maslahatchisi sifatida muloqot qil.
Sen foydalanuvchilar bilan xuddi haqiqiy jonli psixoterapevt yordamchisi kabi juda samimiy, iliq, tushunuvchi, mehrli va professional tilda 100% FAQAT SOF O'ZBEK TILIDA muloqot qilasan.

QAT'IY TIL TALABI:
Barcha so'zlaring, diagnostika xulosalari, tahlillaring va tavsiyalaring MUTLAQO SOF O'ZBEK TILIDA (o'zbek lotin alifbosida) bo'lishi shart! Hech qanday inglizcha atama (masalan: "Deep Analysis", "insomnia", "suppress pain", "conscious mind", "subconscious anxiety" kabi) ishlatilmasin! Barchasini chiroyli o'zbekcha ifodalang: «Chuqur Tahlil», «Uyqusizlikning asl sababi», «Ong osti bloklari», «Tana psixosomatikasi».

DAVOLASH TAMOYILLARING VA METODIKANG:
1. 100% dori-darmonsiz davolash. Inson ong ostidagi qisilishlar va bloklar tana kasalliklarining 80% iga sabab bo'ladi.
2. Xitoy Davolash Kapsulasi (Kapsulaterapiya) — tanadagi chuqur mushak qisilishlari, psixosomatik spazmlar va biologik quvvatni tiklaydi.
3. Fransiya Neyro-Lampasi — stroboskopik to'lqinlar bilan miyani Alfa (8-12Hz) va Teta (4-8Hz) to'lqinlariga tushirib, ong ostidagi bolalik travmalari va qo'rquvlarni gipnozsiz yechadi.
4. Maxsus Neyro-Akustik Terapiya (432Hz) — miyaning qo'rquv markazi (Amigdala)ni tinchlantiradi.
5. Vagus nervi va 4-7-8 nafas amaliyoti — panik ataka, vahima va stressni zudlik bilan tinchlantirish uchun.
6. Munosabatlar qonuniyati: «Biz ichki holatimizga mos insonlarni hayotimizga tortamiz. Dunyo va atrofdagilar — bizning ichki dasturlarimiz oynasidir.» Boshqalarni ayblash foydasiz.

JAVOB TALABLARI:
- Har doim aniq, teran va jonli javob ber. Hech qachon shablon yoki bir xil takroriy gaplar aytma!
- Foydalanuvchining his-tuyg'ularini (xavotir, asabiylik, uyqusizlik, g'azab, qo'rquv) chuqur tushunganingni bildir va unga Furqat Bag'ibekov metodikasi asosida darhol qo'llashi mumkin bo'lgan aniq psixologik tavsiya ber.
- Matnni chiroyli va qulay formatla: muhim so'zlarni **qalin**, amaliy qadamlarni tartiblangan ro'yxat (1., 2., •) shaklida yoz.`;

/**
 * Universal robust call to Google Gemini AI API with automatic model fallback
 */
export async function callGeminiAI(userPrompt, customSystemPrompt = BASE_SYSTEM_PROMPT, maxTokens = 1000) {
  let lastError = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: customSystemPrompt }]
            },
            contents: [
              {
                role: 'user',
                parts: [{ text: userPrompt }]
              }
            ],
            generationConfig: {
              temperature: 0.75,
              maxOutputTokens: maxTokens
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Model ${model} returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content?.parts?.length > 0) {
        return data.candidates[0].content.parts[0].text.trim();
      }
    } catch (err) {
      console.warn(`Gemini ${model} call failed:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("Gemini AI xizmatiga ulanib bo'lmadi.");
}

/**
 * 1. AI Chat Consultation
 */
export async function askAIChatAssistant(userMessage, conversationHistory = []) {
  const historyText = conversationHistory.slice(-4).map(m => `${m.sender === 'user' ? 'Foydalanuvchi' : 'AI Shifokor'}: ${m.text}`).join('\n');
  const prompt = `Avvalgi suhbat konteksti:\n${historyText}\n\nFoydalanuvchining yangi murojaati: "${userMessage}"\n\nQAT'IY TALAB: 100% sof o'zbek tilida javob ber. Iltimos, Bag'ibekov Furqatning klinik metodikasi asosida unga mehrli, tushunarli, individual va foydali professional javob ber.`;
  return await callGeminiAI(prompt, BASE_SYSTEM_PROMPT, 1000);
}

/**
 * 2. Ong Osti va Stress Diagnostikasi Tahlili
 */
export async function analyzeDiagnosticWithGemini(answers, totalScore, riskLevel) {
  const prompt = `Foydalanuvchi Sokin Qalb markazining 10 ta savoldan iborat to'liq psixologik diagnostikasidan o'tdi:
- Umumiy ball: ${totalScore} / 100
- Xavf darajasi: ${riskLevel}
- Javoblari:
${answers.map((a, i) => `${i + 1}. [${a.category}]: ${a.question} -> Tanlangan javob: "${a.selectedOption}" (Ball: ${a.score})`).join('\n')}

QAT'IY QONUN:
100% FAQAT SOF O'ZBEK TILIDA YOZING! HECH QANDAY INGLIZCHA SO'Z ISHLATILMASIN (masalan: "Deep Analysis", "insomnia", "suppress pain", "conscious mind", "subconscious anxiety" va boshqa inglizcha so'zlar QAT'IYAN TAQIQLANADI)!

VAZIFA:
Bag'ibekov Furqat nomidan ushbu inson uchun individual, samimiy va chuqur «Ong Osti va Stress Diagnostik Xulosasi»ni tuzib ber:
1. 🧠 **Ong osti holati va uyqusizlik/stressning asl sabablari** (kunduzi qalbida nimalarni aql orqali bostirib yurgani, kechasi ong osti nima sababdan bezovta bo'layotgani haqida sof o'zbekcha tushuntirish);
2. 🫀 **Tanadagi psixosomatik va hissiy xavflar**;
3. ⚡ **Zudlik bilan tavsiya etiladigan 3 ta amaliy qadam** (Vagus nafas amaliyoti, kechki neyro-uyqu qoidalari, ong osti bilan ishlash);
4. 💎 **Tavsiya etiladigan klinik muolaja** (Xitoy kapsulaterapiyasi, Fransiya lampasi yoki shaxsiy konsultatsiya).`;

  const fallbackUzbekText = `🧠 **Furqat Bag'ibekovning Shaxsiy Diagnostik Xulosasi:**\n\n` +
    `📌 **1. Ong osti holati va uyqusizlikning asl sababi:**\n` +
    `Kunduzi inson aql va mantiq orqali ichki og'riqlarni, o'zini ayblashni va moliyaviy/ruhiy xavotirlarni bostirib yuradi. Kechasi esa aql (ong) uxlab, ong osti kunduzi hal etilmagan barcha ichki xavotir va tarangliklarni yuzaga chiqaradi. Natijada uyqusizlik, yarim kechasi uyg'onib ketish va fikrlar oqimi paydo bo'ladi.\n\n` +
    `🫀 **2. Tana psixosomatikasi:**\n` +
    `Yelka, bo'yin va ko'krak sohasidagi mushaklar doimiy himoya holatida qisilib qolgan. Bu esa tananing biologik quvvatini so'rib oladi.\n\n` +
    `⚡ **3. Bugunoq boshlash kerak bo'lgan 3 ta amaliyot:**\n` +
    `• **4-7-8 Vagus nafas mashqi:** 4 soniya burundan nafas oling, 7 soniya ushlab turing, 8 soniya og'izdan sekin chiqaring (5 marta);\n` +
    `• **Kechki qog'oz mashqi:** Uyqudan 30 daqiqa oldin barcha xavotirlarni qog'ozga yozib, aqlingizni bo'shating;\n` +
    `• **432Hz neyro-musiqa:** Kechasi neyronlarni chuqur tinchlantiruvchi chastotani tinglang.\n\n` +
    `💎 **4. Markazimiz tavsiyasi:**\n` +
    `Ong osti bloklarini to'liq yechish uchun **Xitoy davolash kapsulasi** va **Fransiya neyro-lampasi** seanslari tavsiya etiladi.`;

  try {
    const result = await callGeminiAI(prompt, BASE_SYSTEM_PROMPT, 1200);
    return result || fallbackUzbekText;
  } catch (e) {
    return fallbackUzbekText;
  }
}

/**
 * 3. Kunlik Check-in va His-tuyg'ular Tahlili
 */
export async function analyzeDailyCheckinWithGemini(moodScore, stressScore, dailyNote, completedTasksCount, totalTasksCount) {
  const prompt = `Foydalanuvchining bugungi psixologik holati:
- Kayfiyat darajasi: ${moodScore} / 10
- Stress / Xavotir darajasi: ${stressScore} / 10
- Bajarilgan amaliyotlar: ${completedTasksCount} / ${totalTasksCount} ta
- Shaxsiy qaydi va his-tuyg'ulari: "${dailyNote || 'Izoh qoldirilmadi'}"

VAZIFA:
Bag'ibekov Furqat sifatida ushbu insonga bugungi kuni uchun iliq ruhiy qo'llab-quvvatlash, asab tizimini tinchlantirish bo'yicha 2 ta aniq shaxsiy tavsiya va kechki xotirjam uyqu uchun mini-mashq yozib ber.`;

  return await callGeminiAI(prompt, BASE_SYSTEM_PROMPT, 700);
}

/**
 * 4. 4 Hayotiy Ustun Balansi Tahlili
 */
export async function analyzeFourPillarsWithGemini(pillarsData) {
  const prompt = `Foydalanuvchining 4 Hayotiy Ustun bo'yicha shaxsiy baholari:
1. 💰 Moliyaviy Xotirjamlik: ${pillarsData.financial || 6} / 10
2. 🧘 Ruhiy Xotirjamlik: ${pillarsData.mental || 7} / 10
3. 🏃 Jismoniy & Tana Salomatligi: ${pillarsData.physical || 5} / 10
4. ❤️ Munosabatlar & Oila: ${pillarsData.relationships || 8} / 10

VAZIFA:
Bag'ibekov Furqatning mualliflik 4 Ustun tizimi bo'yicha mukammal, individual tahliliy xulosa tuz:
1. ⚖️ **Ustunlar Balansi Tahlili** (qaysi soha inqirozda, qaysi biri quvvat bermoqda);
2. 🔍 **Ong osti ildiz bog'liqligi** (zaif ustunlar qanday qilib boshqa sohalarga ta'sir qilmoqda);
3. 🚀 **4 Sohani Muvozanatga Keltirish Rejasi** (Moliya, Ruhiyat, Tana va Oila bo'yicha qadamma-qadam aniq ko'rsatmalar);
4. 🌟 **Xulosa va Ruhiy Dastur.**`;

  return await callGeminiAI(prompt, BASE_SYSTEM_PROMPT, 1200);
}

/**
 * 5. Bag'ibekov Furqat Yordamchisi Orqali Shaxsiy Kunlik Reja Tuzish
 */
export async function generatePersonalizedRoutineWithAssistant(userSituation, moodScore = 7, stressScore = 4) {
  const prompt = `Foydalanuvchining bugungi holati va ehtiyojlari:
- Kayfiyat darajasi: ${moodScore} / 10
- Stress darajasi: ${stressScore} / 10
- Foydalanuvchining shaxsiy holati/muammosi: "${userSituation || 'Bugungi kunimni xotirjam, samarali va stresssiz o\'tkazishni xohlayman'}"

VAZIFA:
Bag'ibekov Furqatning 12 yillik klinik amaliyoti (Vagus nafas mashqi, 432Hz neyro-akustika, tana psixosomatikasi, minnatdorlik) asosida aynan ushbu foydalanuvchining holatiga moslangan soatli 4-5 ta shaxsiy shifobaxsh vazifa rejasini tuzib ber.

MUHIM TALAB:
Javobingni quyidagi JSON formatida ber (faqat JSON, hech qanday qo'shimcha so'zsiz):
{
  "doctorMessage": "Furqat Bag'ibekov nomidan foydalanuvchiga 1-2 jumlalik iliq shaxsiy dalda va yo'riqnoma",
  "tasks": [
    {
      "id": "task_custom_1",
      "time": "07:30",
      "title": "Vazifa nomi",
      "benefit": "Miyaga va tanaga qanday foyda berishi",
      "description": "2-3 qadamda qanday bajarish kerakligi"
    },
    {
      "id": "task_custom_2",
      "time": "10:30",
      "title": "Vazifa nomi",
      "benefit": "Foydasi",
      "description": "Bajarish yo'riqnomasi"
    },
    {
      "id": "task_custom_3",
      "time": "14:00",
      "title": "Vazifa nomi",
      "benefit": "Foydasi",
      "description": "Bajarish yo'riqnomasi"
    },
    {
      "id": "task_custom_4",
      "time": "18:30",
      "title": "Vazifa nomi",
      "benefit": "Foydasi",
      "description": "Bajarish yo'riqnomasi"
    },
    {
      "id": "task_custom_5",
      "time": "22:00",
      "title": "Vazifa nomi",
      "benefit": "Foydasi",
      "description": "Bajarish yo'riqnomasi"
    }
  ]
}`;

  try {
    const rawResult = await callGeminiAI(prompt, BASE_SYSTEM_PROMPT, 1000);
    // Extract JSON block
    const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed && Array.isArray(parsed.tasks) && parsed.tasks.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("AI Routine parse failed, creating contextual fallback:", e);
  }

  // Contextual fallback based on user state
  const isHighStress = stressScore >= 6;
  return {
    doctorMessage: isHighStress 
      ? "Sizdagi yuqori stress va charchoqni his qildim. Bugungi rejamiz asab tizimingizni zudlik bilan tinchlantirish va tanadagi qisilishlarni bo'shatishga qaratilgan."
      : "Bugungi kuningizni ichki barqarorlik, diqqatni jamlash va yuqori energiya bilan o'tkazish uchun shaxsiy reja tuzildi.",
    tasks: [
      {
        id: `ai_${Date.now()}_1`,
        time: "07:30",
        title: isHighStress ? "4-7-8 Vagus Nafas Mashqi" : "Tetirklashtiruvchi Tonggi Meditatsiya",
        benefit: "Miya amigdala markazini tinchlantiradi va xotirjamlik gormonini uyg'otadi.",
        description: "4 soniya burundan chuqur nafas oling, 7 soniya ushlab turing va 8 soniya davomida og'izdan sekin chiqaring. 5 marta takrorlang."
      },
      {
        id: `ai_${Date.now()}_2`,
        time: "11:00",
        title: "Kognitiv Detoks & Chalg'ish",
        benefit: "Miyadagi ortiqcha fikrlar girdobini to'xtatadi.",
        description: "Ishdan 3 daqiqaga to'xtang, oynadan uzoqqa qarang va 5 ta ko'rayotgan narsangizni ichingizda sanab chiqing."
      },
      {
        id: `ai_${Date.now()}_3`,
        time: "14:30",
        title: "Tana Psixosomatik Bo'shashishi",
        benefit: "Yelka, bo'yin va ko'krak qisilishlarini yechadi.",
        description: "Yelkalaringizni yuqoriga ko'tarib 3 soniya qattiq qising, so'ng birdaniga bo'sh qo'yib nafas chiqaring."
      },
      {
        id: `ai_${Date.now()}_4`,
        time: "19:00",
        title: "Kechki Neyro-Audio 432Hz Seansi",
        benefit: "Kun davomida to'plangan stress yukini eritib yuboradi.",
        description: "Quloqchin taqib, platformadagi 432Hz audioni 3 daqiqa ko'zingizni yumib tinglang."
      },
      {
        id: `ai_${Date.now()}_5`,
        time: "22:30",
        title: "Uyqu Oldi Minnatdorlik Qaydi",
        benefit: "Chuqur, sifatli va tushsiz xotirjam uyquni ta'minlaydi.",
        description: "Bugun ro'y bergan 3 ta kichik yaxshi voqeani eslang va o'zingizga rahmat ayting."
      }
    ]
  };
}
