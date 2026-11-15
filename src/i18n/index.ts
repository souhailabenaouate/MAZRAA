import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const LANGS = [
  { code: 'en', label: 'English', dir: 'ltr', speech: 'en-US' },
  { code: 'fr', label: 'Français', dir: 'ltr', speech: 'fr-FR' },
  { code: 'ar', label: 'العربية', dir: 'rtl', speech: 'ar' },
  { code: 'ary', label: 'الدارجة', dir: 'rtl', speech: 'ar' }
] as const

const fr = {
  forgot: 'Mot de passe oublié ?', forgotMsg: 'Demande à ton technicien ou à ta coopérative de le réinitialiser.', showPass: 'Afficher le mot de passe',
  heroTitle: 'Donner à l’agriculteur les yeux d’un satellite', loginTop: 'Se connecter',
  badge: 'Données NASA pour les petites fermes', h1a: 'Des données de l’espace', h1b: 'pour une agriculture plus intelligente.',
  heroSub: 'Mazra’a transforme les données satellites de la NASA en conseils simples, parlés et en images, dans ta langue.',
  getStarted: 'Commencer', howTitle: 'Trois gestes. Une réponse claire.',
  f1t: 'Montre ton problème', f1d: 'Touche une image. Pas besoin d’écrire.',
  f2t: 'Vois ta ferme', f2d: '4 feux tricolores issus des données NASA.',
  f3t: 'Compare les rotations', f3d: 'Que planter ensuite, avec les raisons.',
  stat1: 'ans de données NASA', stat2: 'langues', stat3: 'rotations comparées',
  ctaTitle: 'Prêt à regarder ta terre depuis l’espace ?', ctaSub: 'Gratuit à essayer. Ta langue. Ta ferme.',
  cardRain: 'Pluie d’automne', cardLate: '~3 semaines plus tard', cardExample: 'Données d’exemple',
  disclaimer: 'Mazra’a aide les agriculteurs et les experts locaux. Elle ne les remplace pas.', challenge: 'NASA Space Apps Challenge · Field Shift',
  slogan: 'Des données de l’espace pour une agriculture plus intelligente',
  start: 'Commencer', login: 'Se connecter', signup: 'Créer un compte', logout: 'Se déconnecter',
  username: 'Nom d’utilisateur', password: 'Mot de passe', confirm: 'Confirmer le mot de passe',
  role: 'Je suis', farmer: 'Agriculteur', technician: 'Technicien', commune: 'Commune',
  noAccount: 'Pas encore de compte ?', haveAccount: 'Déjà un compte ?', remember: 'Rester connecté',
  errFill: 'Remplis tous les champs.', errMatch: 'Les mots de passe sont différents.',
  errExists: 'Ce nom existe déjà.', errBad: 'Nom ou mot de passe incorrect.',
  home: 'Accueil', alerts: 'Alertes', menu: 'Menu', profile: 'Mon profil', theme: 'Mode clair / sombre', language: 'Langue',
  online: 'En ligne', offline: 'Hors ligne - données enregistrées',
  'm.diagnosis': 'Diagnostic visuel', 'm.status': 'Ma ferme', 'm.rotations': 'Comparer les rotations',
  'm.report': 'Rapport final', 'm.alerts': 'Alertes', 'm.problem': 'Signaler un problème', 'm.dashboard': 'Tableau de bord',
  'm.walk': 'Tour du champ',
  'd.diagnosis': 'Dis-nous ton problème', 'd.status': '4 feux', 'd.rotations': 'Que planter ensuite', 'd.report': 'Fiche PDF',
  'd.alerts': 'Gel, pluie, semis', 'd.problem': 'Photo ou message vocal', 'd.dashboard': 'Pour les techniciens', 'd.walk': 'Seulement des boutons',
  askGhars: 'Demande à GHARS', gharsSub: 'ton assistant IA',
  weatherTitle: 'Ta ferme', weatherLine: 'Pluie d’automne : environ 3 semaines plus tard qu’il y a 20 ans', source: 'Source : NASA POWER',
  hello: 'Salam ! De quoi veux-tu parler aujourd’hui ?', speak: 'Parler à GHARS', typeHere: 'Écris ou parle…',
  tileFarm: 'Ma ferme', tileRot: 'Rotations', tileReport: 'Rapport',
  alert1: 'Risque de gel possible cette semaine', alert2: 'Bonne fenêtre de semis la semaine prochaine', trend: 'Tendance, pas une prévision',
  soon: 'Bientôt', comingNext: 'Cet écran arrive à la prochaine étape.', back: 'Retour',
  q1: 'Quand semer ?', q2: 'Pourquoi cette culture ?', q3: 'Que veut dire ce feu ?', q4: 'Demander au technicien',
  a1: 'La pluie arrive plus tard qu’avant. Attends les premières pluies avant de semer. Source : NASA POWER 2005-2025. Confiance : moyenne.',
  a2: 'Avec des pluies plus tardives, une légumineuse comme la fève ajoute de l’azote au sol. Source : NASA POWER 2005-2025. Confiance : moyenne.',
  a3: 'Rouge = risque élevé d’érosion sur ta pente. Demande à ton technicien de confirmer avant de décider.',
  a4: 'D’accord, ton technicien sera prévenu. Je suis une IA : je ne remplace ni toi ni l’expert.',
  aiNote: 'Je suis GHARS, un assistant IA. Je réponds seulement avec les données de l’appli.',
  audio: 'Audio', listen: 'Écouter', close: 'Fermer'
}
const ar = {
  forgot: 'نسيت كلمة المرور؟', forgotMsg: 'اطلب من التقني أو التعاونية إعادة تعيينها.', showPass: 'إظهار كلمة المرور',
  heroTitle: 'نمنح الفلاح عيون قمر صناعي', loginTop: 'تسجيل الدخول',
  badge: 'بيانات ناسا للضيعات الصغيرة', h1a: 'من بيانات الفضاء', h1b: 'إلى فلاحة أذكى.',
  heroSub: 'مزرعة تحول بيانات أقمار ناسا إلى نصائح بسيطة، مسموعة ومصورة، بلغتك.',
  getStarted: 'ابدأ', howTitle: 'ثلاث لمسات. جواب واضح.',
  f1t: 'أظهر مشكلتك', f1d: 'المس صورة. بدون كتابة.',
  f2t: 'شاهد ضيعتك', f2d: '4 إشارات مرور من بيانات ناسا.',
  f3t: 'قارن الدورات الزراعية', f3d: 'ماذا نزرع بعد ذلك، مع الأسباب.',
  stat1: 'سنة من بيانات ناسا', stat2: 'لغات', stat3: 'دورات تتم مقارنتها',
  ctaTitle: 'مستعد لترى أرضك من الفضاء؟', ctaSub: 'مجاني للتجربة. بلغتك. لضيعتك.',
  cardRain: 'مطر الخريف', cardLate: 'متأخر ~3 أسابيع', cardExample: 'بيانات مثال',
  disclaimer: 'مزرعة تساعد الفلاحين والخبراء المحليين ولا تعوضهم.', challenge: 'NASA Space Apps Challenge · Field Shift',
  slogan: 'من بيانات الفضاء إلى فلاحة أذكى',
  start: 'ابدأ', login: 'تسجيل الدخول', signup: 'إنشاء حساب', logout: 'تسجيل الخروج',
  username: 'اسم المستخدم', password: 'كلمة المرور', confirm: 'تأكيد كلمة المرور',
  role: 'أنا', farmer: 'فلاح', technician: 'تقني', commune: 'الجماعة',
  noAccount: 'ليس لديك حساب؟', haveAccount: 'لديك حساب؟', remember: 'ابق متصلا',
  errFill: 'املأ جميع الحقول.', errMatch: 'كلمتا المرور مختلفتان.', errExists: 'هذا الاسم موجود.', errBad: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
  home: 'الرئيسية', alerts: 'تنبيهات', menu: 'القائمة', profile: 'حسابي', theme: 'الوضع الفاتح / الداكن', language: 'اللغة',
  online: 'متصل', offline: 'غير متصل - بيانات محفوظة',
  'm.diagnosis': 'تشخيص بالصور', 'm.status': 'ضيعتي', 'm.rotations': 'مقارنة الدورات الزراعية',
  'm.report': 'التقرير النهائي', 'm.alerts': 'تنبيهات', 'm.problem': 'الإبلاغ عن مشكل', 'm.dashboard': 'لوحة التحكم',
  'm.walk': 'جولة في الحقل',
  'd.diagnosis': 'قل لنا مشكلتك', 'd.status': '4 إشارات', 'd.rotations': 'ماذا نزرع بعد ذلك', 'd.report': 'ورقة PDF',
  'd.alerts': 'صقيع، مطر، زرع', 'd.problem': 'صورة أو رسالة صوتية', 'd.dashboard': 'للتقنيين', 'd.walk': 'أزرار فقط',
  askGhars: 'اسأل غرس', gharsSub: 'مساعدك الذكي',
  weatherTitle: 'ضيعتك', weatherLine: 'مطر الخريف: متأخر حوالي 3 أسابيع مقارنة مع 20 سنة', source: 'المصدر: NASA POWER',
  hello: 'سلام! على ماذا تريد أن نتحدث اليوم؟', speak: 'تحدث إلى غرس', typeHere: 'اكتب أو تحدث…',
  tileFarm: 'ضيعتي', tileRot: 'الدورات', tileReport: 'التقرير',
  alert1: 'احتمال صقيع هذا الأسبوع', alert2: 'وقت مناسب للزرع الأسبوع القادم', trend: 'اتجاه وليس توقعا',
  soon: 'قريبا', comingNext: 'هذه الشاشة تأتي في المرحلة القادمة.', back: 'رجوع',
  q1: 'متى أزرع؟', q2: 'لماذا هذا المحصول؟', q3: 'ماذا تعني هذه الإشارة؟', q4: 'اسأل التقني',
  a1: 'المطر يتأخر مقارنة مع السابق. انتظر أولى الأمطار قبل الزرع. المصدر: NASA POWER 2005-2025. الثقة: متوسطة.',
  a2: 'مع تأخر الأمطار، تضيف البقوليات مثل الفول الأزوت للتربة. المصدر: NASA POWER 2005-2025. الثقة: متوسطة.',
  a3: 'الأحمر = خطر كبير للانجراف على منحدرك. اطلب من التقني التأكد قبل القرار.',
  a4: 'حسنا، سيتم إخبار التقني. أنا ذكاء اصطناعي ولا أعوضك ولا أعوض الخبير.',
  aiNote: 'أنا غرس، مساعد ذكاء اصطناعي. أجيب فقط بمعطيات التطبيق.',
  audio: 'الصوت', listen: 'استمع', close: 'إغلاق'
}
// Darija: starting point, to be reviewed by a native speaker. Falls back to Arabic for missing keys.
const ary = {
  ...ar,
  forgot: 'نسيتي الكلمة السرية؟', forgotMsg: 'سول التقني ولا التعاونية يعاودو ليك تعيينها.',
  heroTitle: 'نعطيو للفلاح عيون ديال الساتيليت', loginTop: 'دخول',
  badge: 'معطيات ناسا للفلاحة الصغيرة', h1a: 'من معطيات الفضاء', h1b: 'لفلاحة أذكى.',
  heroSub: 'مزرعة كتحول معطيات أقمار ناسا لنصائح سهلة، مسموعة ومصورة، بدارجتك.',
  getStarted: 'بدا', howTitle: 'تلات لمسات. جواب واضح.',
  f1t: 'ورّي المشكل ديالك', f1d: 'لمس تصويرة. بلا ما تكتب.',
  f2t: 'شوف الضيعة ديالك', f2d: '4 ضوايا من معطيات ناسا.',
  f3t: 'قارن الدورات', f3d: 'شنو نزرعو من بعد، مع الأسباب.',
  stat1: 'عام من معطيات ناسا', stat2: 'لغات', stat3: 'دورات كتقارن',
  ctaTitle: 'واجد تشوف أرضك من الفضاء؟', ctaSub: 'مجاني للتجربة. بلغتك. لضيعتك.',
  cardRain: 'شتا الخريف', cardLate: 'تأخرات ~3 سيمانات', cardExample: 'معطيات مثال',
  slogan: 'من معطيات الفضاء لفلاحة أذكى',
  start: 'بدا', login: 'دخول', signup: 'سجل حسابك', username: 'سمية المستعمل', password: 'الكلمة السرية',
  hello: 'السلام! شنو بغيتي نهضرو عليه اليوم؟', askGhars: 'سول غرس',
  weatherLine: 'شتا الخريف: تأخرات تقريبا 3 سيمانات على 20 عام',
  q1: 'فوقاش نزرع؟', q2: 'علاش هاد الزرع؟', q3: 'شنو كتعني هاد الإشارة؟', q4: 'سول التقني',
  a1: 'الشتا كتجي موخرا على بكري. تسنى أولى الشتا قبل ما تزرع. المصدر: NASA POWER 2005-2025. الثقة: متوسطة.',
  alert1: 'يمكن يكون الصقيع هاد السيمانة', alert2: 'وقت مزيان للزرع السيمانة الجاية'
}

const en = {
  forgot: 'Forgot password?', forgotMsg: 'Ask your technician or cooperative to reset it for you.', showPass: 'Show password',
  heroTitle: 'Giving the farmer the eyes of a satellite', loginTop: 'Se connecter',
  badge: 'NASA data for small farms', h1a: 'From Space Data', h1b: 'to Smarter Farming.',
  heroSub: 'Mazra’a turns NASA satellite data into simple, spoken, picture-based guidance for your farm, in your language.',
  getStarted: 'Get started', howTitle: 'Three taps. One clear answer.',
  f1t: 'Show your problem', f1d: 'Touch a picture. No typing needed.',
  f2t: 'See your farm', f2d: '4 traffic lights built from NASA data.',
  f3t: 'Compare rotations', f3d: 'What to plant next, with reasons.',
  stat1: 'years of NASA data', stat2: 'languages', stat3: 'rotations compared',
  ctaTitle: 'Ready to look at your land from space?', ctaSub: 'Free to try. Your language. Your farm.',
  cardRain: 'Autumn rain', cardLate: '~3 weeks later', cardExample: 'Example data',
  disclaimer: 'Mazra’a supports farmers and local experts. It does not replace them.', challenge: 'NASA Space Apps Challenge · Field Shift',
  slogan: 'From Space Data to Smarter Farming',
  start: 'Get started', login: 'Log in', signup: 'Create account', logout: 'Log out',
  username: 'Username', password: 'Password', confirm: 'Confirm password',
  role: 'I am a', farmer: 'Farmer', technician: 'Technician', commune: 'Commune',
  noAccount: 'No account yet?', haveAccount: 'Already have an account?', remember: 'Keep me signed in',
  errFill: 'Please fill in all fields.', errMatch: 'Passwords do not match.',
  errExists: 'This username already exists.', errBad: 'Wrong username or password.',
  home: 'Home', alerts: 'Alerts', menu: 'Menu', profile: 'My profile', theme: 'Light / dark mode', language: 'Language',
  online: 'Online', offline: 'Offline - saved data',
  'm.diagnosis': 'Visual farm diagnosis', 'm.status': 'My farm status', 'm.rotations': 'Rotation comparison',
  'm.report': 'Final farm report', 'm.alerts': 'Alerts', 'm.problem': 'Report a problem', 'm.dashboard': 'Dashboard',
  'm.walk': 'Field walk',
  'd.diagnosis': 'Tell us your problem', 'd.status': '4 traffic lights', 'd.rotations': 'What to plant next', 'd.report': 'Printable PDF sheet',
  'd.alerts': 'Frost, rain, sowing', 'd.problem': 'Photo or voice note', 'd.dashboard': 'For technicians', 'd.walk': 'Tap-only checklist',
  askGhars: 'Ask GHARS', gharsSub: 'your AI assistant',
  weatherTitle: 'Your farm', weatherLine: 'Autumn rain: about 3 weeks later than 20 years ago', source: 'Source: NASA POWER',
  hello: 'Salam! What do you want to talk about today?', speak: 'Speak to GHARS', typeHere: 'Type or speak…',
  tileFarm: 'My farm', tileRot: 'Rotations', tileReport: 'Report',
  alert1: 'Frost risk possible this week', alert2: 'Good sowing window next week', trend: 'Trend, not a forecast',
  soon: 'Soon', comingNext: 'This screen comes in the next step.', back: 'Back',
  q1: 'When to sow?', q2: 'Why this crop?', q3: 'What is this light?', q4: 'Ask technician',
  a1: 'Rain now arrives later than before. Wait for the first rains before sowing. Source: NASA POWER 2005-2025. Confidence: medium.',
  a2: 'With later rains, a legume like fava bean adds nitrogen to the soil. Source: NASA POWER 2005-2025. Confidence: medium.',
  a3: 'Red = high erosion risk on your slope. Ask your technician to confirm before deciding.',
  a4: 'OK, your technician will be notified. I am an AI: I do not replace you or the expert.',
  aiNote: 'I am GHARS, an AI assistant. I only answer from the app’s data.',
  audio: 'Audio', listen: 'Listen', close: 'Close'
}

const saved = localStorage.getItem('lang') || 'fr'
i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, fr: { translation: fr }, ar: { translation: ar }, ary: { translation: ary } },
  lng: saved, fallbackLng: 'fr', interpolation: { escapeValue: false }
})

export function applyDir(code: string) {
  const l = LANGS.find(x => x.code === code) ?? LANGS[1]
  document.documentElement.dir = l.dir
  document.documentElement.lang = code === 'ary' ? 'ar' : code
}
applyDir(saved)
export default i18n
