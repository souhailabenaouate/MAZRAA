/* ============================================================
   Mazra'a — farmer app data
   All values are illustrative for the Chefchaouen pilot zone.
   ============================================================ */
window.m = function (en, fr, ar, dz) { return { en: en, fr: fr, ar: ar, dz: dz }; };
D = window.D || {};

D.farm = {
  id: 'MA-CHA-0142',
  name: m('Farm 0142', 'Ferme 0142', 'المزرعة 0142', 'الضيعة 0142'),
  commune: m('Chefchaouen', 'Chefchaouen', 'شفشاون', 'شفشاون'),
  area: 1.8,
  temp: 19,
  rainYear: 344,
  rainAvg: 612,
  delayDays: 21,
  ndvi: 0.42,
  slope: 18
};

D.weather = {
  temp: 19,
  line: m(
    'Autumn rain arrives about 3 weeks later than 20 years ago.',
    'La pluie d’automne arrive environ 3 semaines plus tard qu’il y a 20 ans.',
    'أمطار الخريف تصل متأخرة نحو ثلاثة أسابيع عن ما كان قبل 20 سنة.',
    'شتا الخريف كتجي متأخرة بحال 3 سيمانات على 20 سنة اللي فاتو.'
  ),
  season: m('Autumn 2026 · 344 mm since September', 'Automne 2026 · 344 mm depuis septembre', 'خريف 2026 · 344 مم منذ شتنبر', 'خريف 2026 · 344 مم من شتنبر')
};

D.crops = {
  wheat: { name: m('Wheat', 'Blé', 'قمح', 'قمح'), icon: 'wheat' },
  barley: { name: m('Barley', 'Orge', 'شعير', 'شعير'), icon: 'barley' },
  fava: { name: m('Fava bean', 'Fève', 'فول', 'فول'), icon: 'fava' },
  chickpea: { name: m('Chickpea', 'Pois chiche', 'حمص', 'حمص'), icon: 'chickpea' },
  cover: { name: m('Cover crop', 'Culture de couverture', 'محصول تغطية', 'محصول تغطية'), icon: 'cover' },
  fallow: { name: m('Fallow (bare)', 'Jachère', 'أرض بور', 'أرض خالية'), icon: 'fallow' },
  olive: { name: m('Olive', 'Olivier', 'زيتون', 'زيتون'), icon: 'olive' }
};

D.lights = [
  {
    id: 'water', state: 'warn', val: m('+21 days', '+21 j', '+21 يومًا', '+21 يوم'),
    name: m('Water', 'Eau', 'الماء', 'الما'),
    say: m('Autumn rain is late and dry spells are getting longer.',
      'La pluie d’automne est tardive et les sécheresses s’allongent.',
      'أمطار الخريف متأخرة وفترات الجفاف تطول.',
      'شتا الخريف متأخرة وفترات الجفاف كتطول.'),
    src: 'NASA POWER · 2005–2025'
  },
  {
    id: 'heat', state: 'warn', val: m('28 days', '28 jours', '28 يومًا', '28 يوم'),
    name: m('Heat', 'Chaleur', 'الحرارة', 'السخانة'),
    say: m('Hot spells are more frequent than 20 years ago.',
      'Les vagues de chaleur sont plus fréquentes qu’il y a 20 ans.',
      'موجات الحرارة أكثر تكرارًا من 20 سنة مضت.',
      'موجات السخانة كتر من 20 سنة اللي فاتو.'),
    src: 'NASA POWER · 2005–2025'
  },
  {
    id: 'plants', state: 'warn', val: m('NDVI 0.42', 'NDVI 0,42', 'NDVI 0.42', 'NDVI 0.42'),
    name: m('Plants', 'Plantes', 'النباتات', 'النباتات'),
    say: m('Plants look greener than last year, but they stress in July.',
      'Les plantes sont plus vertes que l’an dernier, mais stressent en juillet.',
      'النباتات تبدو أكثر خضرة من العام الماضي، لكنها تُجهد في يوليوز.',
      'النباتات خضر أكثر من العام اللي فات، ولكن كتتعيا فـ يوليوز.'),
    src: 'MODIS NDVI · 2000–2025'
  },
  {
    id: 'erosion', state: 'bad', val: m('18% slope', 'pente 18 %', 'ميل 18%', 'ميل 18%'),
    name: m('Erosion', 'Érosion', 'الانجراف', 'الانجراف'),
    say: m('Steep slope plus heavy rain: the risk of losing soil is high.',
      'Pente forte et pluies intenses : le risque de perdre du sol est élevé.',
      'ميل قوي وأمطار غزيرة: خطر فقدان التربة مرتفع.',
      'ميل قوي وشتا قوية: خطر ضياع التراب عالي.'),
    src: 'SRTM · GPM IMERG'
  }
];

D.soil = {
  score: 0.55,
  conf: 2,
  label: m('Medium', 'Moyenne', 'متوسطة', 'متوسطة'),
  say: m('Your soil is pale and hard, with little organic matter. The global soil layer agrees, at medium confidence.',
    'Votre sol est pâle et dur, avec peu de matière organique. La couche mondiale des sols confirme, avec une confiance moyenne.',
    'تربتك فاتحة وصلبة، وفقيرة في المادة العضوية. طبقة التربة العالمية تتفق بثقة متوسطة.',
    'التراب ديالك فاتح وقاسح، وفقير فالمادة العضوية. طبقة التراب العالمية كتوافق بثقة متوسطة.'),
  src: m('Your answers + global soil layer', 'Vos réponses + couche mondiale des sols', 'أجوبتك + طبقة التربة العالمية', 'أجوبتك + طبقة التراب العالمية')
};

D.priorities = {
  goals: [
    { id: 'water', label: m('Save water', 'Économiser l’eau', 'توفير الماء', 'نوفر الما'), pic: 'waterDrop' },
    { id: 'earn', label: m('Earn more', 'Gagner plus', 'كسب أكثر', 'نربح أكثر'), pic: 'money' },
    { id: 'soil', label: m('Improve the soil', 'Améliorer le sol', 'تحسين التربة', 'نحسن التراب'), pic: 'soilDark' },
    { id: 'erosion', label: m('Protect from erosion', 'Protéger de l’érosion', 'الحماية من الانجراف', 'نحمي من الانجراف'), pic: 'stoneBunds' }
  ],
  cons: [
    {
      id: 'water', label: m('Water available', 'Eau disponible', 'الماء المتوفر', 'الما المتوفر'),
      opts: [
        { id: 'rain', label: m('Rain only', 'Pluie seulement', 'المطر فقط', 'غير الشتا') },
        { id: 'well', label: m('Well', 'Puits', 'بئر', 'بير') },
        { id: 'irr', label: m('Irrigation', 'Irrigation', 'سقي', 'السقي') }
      ]
    },
    {
      id: 'equip', label: m('Equipment', 'Équipement', 'العُدّة', 'العدة'),
      opts: [
        { id: 'hand', label: m('Hand tools', 'Outils à main', 'أدوات يدوية', 'عدة يد') },
        { id: 'animal', label: m('Animal', 'Animal', 'حيوان', 'حيوان') },
        { id: 'tractor', label: m('Tractor', 'Tracteur', 'تراكتور', 'طراكتور') }
      ]
    },
    {
      id: 'market', label: m('Market', 'Marché', 'السوق', 'السوق'),
      opts: [
        { id: 'local', label: m('Local market', 'Marché local', 'السوق المحلي', 'السوق المحلي') },
        { id: 'livestock', label: m('Livestock', 'Élevage', 'الماشية', 'المواشي') },
        { id: 'both', label: m('Both', 'Les deux', 'كلاهما', 'بجوج') }
      ]
    }
  ]
};

D.sources = [
  {
    name: 'NASA POWER', use: m('Rain, temperature, heat days, dry spells, autumn rain delay, scenario shifts', 'Pluie, température, jours de chaleur, sécheresses, retard des pluies, scénarios', 'المطر والحرارة وأيام الحرارة وفترات الجفاف وتأخر الأمطار والسيناريوهات', 'الشتا والسخانة وأيام السخانة وفترات الجفاف وتأخر الشتا والسيناريوهات'),
    res: '0.5° × 0.625°', period: '2005–2025',
    cant: m('Does not see the field itself, the soil, or farm practices.', 'Ne voit ni le champ, ni le sol, ni les pratiques.', 'لا يرى الحقل نفسه ولا التربة ولا الممارسات.', 'ما كيشوفش الضيعة ولا التراب ولا الممارسات.')
  },
  {
    name: 'MODIS / Landsat NDVI', use: m('Vegetation health, bare-soil periods, plant stress', 'Santé de la végétation, périodes de sol nu, stress des plantes', 'صحة الغطاء النباتي وفترات التربة العارية وإجهاد النبات', 'صحة النبات وفترات الأرض العارية وإجهاد النباتات'),
    res: '250 m / 30 m', period: '2000–2025',
    cant: m('Cannot tell a disease from a drought, or see under clouds.', 'Ne distingue pas une maladie d’une sécheresse, ni sous les nuages.', 'لا يفرّق بين المرض والجفاف، ولا يرى تحت السحب.', 'ما كيفرقش بين المرض والجفاف، وما كيشوفش تحت السحاب.')
  },
  {
    name: 'SRTM', use: m('Slope and erosion risk', 'Pente et risque d’érosion', 'الميل وخطر الانجراف', 'الميل وخطر الانجراف'),
    res: '30 m', period: '2000 (single date)',
    cant: m('A single old snapshot: it does not follow new terraces or gullies.', 'Une seule image ancienne : ne suit pas les nouvelles terrasses.', 'صورة واحدة قديمة: لا تتابع المصاطب الجديدة.', 'تصويرة وحدة قديمة: ما كتتبعش المصاطب الجديدة.')
  },
  {
    name: 'GPM / IMERG', use: m('Heavy rain and storm erosion', 'Pluies intenses et érosion', 'الأمطار الغزيرة والانجراف', 'الشتا القوية والانجراف'),
    res: '0.1° / 30 min', period: '2000–2025',
    cant: m('Smoothed over a wide cell: a single storm can be underestimated.', 'Lissé sur une grande maille : une seule averse peut être sous-estimée.', 'ناعم على خلية واسعة: قد تُقلَّل عاصفة واحدة.', 'مْنَعّم على خلية كبيرة: يقدر يقلل عاصفة وحدة.')
  },
  {
    name: 'SMAP (optional)', use: m('Soil moisture and sowing windows', 'Humidité du sol et fenêtres de semis', 'رطوبة التربة ونوافذ البذر', 'رطوبة التراب ونوافذ الزريعة'),
    res: '9 km', period: '2015–2025',
    cant: m('Only the top 5 cm, and coarse for a small plot.', 'Seulement les 5 premiers cm, grossier pour une petite parcelle.', 'أول 5 سم فقط، وخشن لقطعة صغيرة.', 'غير 5 سم اللولين، وخشن لقطعة صغيرة.')
  },
  {
    name: m('Global soil layer (not NASA)', 'Couche mondiale des sols (non NASA)', 'طبقة التربة العالمية (ليست NASA)', 'طبقة التراب العالمية (ماشي NASA)'),
    use: m('Soil health indicator, with your soil answers', 'Indicateur de santé du sol, avec vos réponses', 'مؤشر صحة التربة مع أجوبتك', 'مؤشر صحة التراب مع أجوبتك'),
    res: '250 m', period: 'static',
    cant: m('Generalized: it does not know your plot.', 'Généralisée : ne connaît pas votre parcelle.', 'معمّمة: لا تعرف قطعتك.', 'معممة: ما كتعرفش القطعة ديالك.')
  },
  {
    name: m('Crop sheets: INRA, FAO, ORMVA', 'Fiches cultures : INRA, FAO, ORMVA', 'بطاقات المحاصيل: INRA وFAO وORMVA', 'بطاقات المحاصيل: INRA وFAO وORMVA'),
    use: m('Water need, nitrogen, roots, cover, season, suitability', 'Besoin en eau, azote, racines, couverture, saison', 'حاجة الماء والآزوت والجذور والتغطية والموسم', 'حاجة الما والآزوت والجذور والتغطية والموسم'),
    res: m('Documents', 'Documents', 'وثائق', 'وثائق'), period: '2018–2024',
    cant: m('Not local prices, not this year’s market.', 'Pas les prix locaux, ni le marché de cette année.', 'ليست الأسعار المحلية ولا سوق هذه السنة.', 'ماشي الأثمنة المحلية ولا سوق هاد العام.')
  }
];

D.evidenceBase = {
  power: m('NASA POWER 2005–2025', 'NASA POWER 2005–2025', 'NASA POWER 2005–2025', 'NASA POWER 2005–2025'),
  ndvi: m('MODIS NDVI 2000–2025', 'MODIS NDVI 2000–2025', 'MODIS NDVI 2000–2025', 'MODIS NDVI 2000–2025'),
  srtm: m('SRTM slope 30 m', 'Pente SRTM 30 m', 'ميل SRTM 30 م', 'ميل SRTM 30 م'),
  gpm: m('GPM IMERG 2000–2025', 'GPM IMERG 2000–2025', 'GPM IMERG 2000–2025', 'GPM IMERG 2000–2025')
};
