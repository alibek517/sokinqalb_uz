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
Sen foydalanuvchilar bilan xuddi haqiqiy jonli psixoterapevt yordamchisi kabi juda samimiy, iliq, tushunuvchi, mehrli va professional tilda sof o'zbek tilida muloqot qilasan.

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
  const prompt = `Avvalgi suhbat konteksti:\n${historyText}\n\nFoydalanuvchining yangi murojaati: "${userMessage}"\n\nIltimos, Bag'ibekov Furqatning klinik metodikasi asosida unga mehrli, tushunarli, individual va foydali professional javob ber.`;
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

VAZIFA:
Bag'ibekov Furqat nomidan ushbu inson uchun individual, chuqur va aniq «Ong Osti va Stress Diagnostik Xulosasi»ni tuzib ber:
1. 🧠 **Ong osti holati va asosiy ildiz muammosi tahlili** (qaysi bloklar uni qiynamoqda);
2. 🫀 **Tanadagi psixosomatik va hissiy xavflar**;
3. ⚡ **Zudlik bilan tavsiya etiladigan 3 ta amaliy qadam** (nafas, ong osti bilan ishlash, tartib);
4. 💎 **Tavsiya etiladigan klinik muolaja** (Xitoy kapsulasi, Fransiya lampasi yoki konsultatsiya).`;

  return await callGeminiAI(prompt, BASE_SYSTEM_PROMPT, 1200);
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
2. 🧘 Ruhiy Xotirjamlik: ${pillarsData.spiritual || 8} / 10
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
