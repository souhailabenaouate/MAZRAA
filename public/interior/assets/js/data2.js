/* ============================================================
   Mazra'a — rotations, scoring, calendar, learn cards, alerts
   ============================================================ */
(function () {
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  D.criteria = [
    { id: 'water', w: 0.18, label: m('Water use', 'Eau utilisée', 'استهلاك الماء', 'استهلاك الما'), from: m('crop sheet + rain, dry spells, heat', 'fiche culture + pluie, sécheresses, chaleur', 'بطاقة المحصول + المطر والجفاف والحرارة', 'بطاقة المحصول + الشتا والجفاف والسخانة') },
    { id: 'nitrogen', w: 0.15, label: m('Nitrogen added', 'Azote apporté', 'الآزوت المضاف', 'الآزوت'), from: m('crop sheet (legumes)', 'fiche culture (légumineuses)', 'بطاقة المحصول (البقوليات)', 'بطاقة المحصول (القطاني)') },
    { id: 'erosion', w: 0.18, label: m('Erosion reduced', 'Érosion réduite', 'تقليل الانجراف', 'تقليل الانجراف'), from: m('cover + roots vs slope and heavy rain', 'couverture + racines vs pente et pluies', 'التغطية والجذور مقابل الميل والأمطار', 'التغطية والجذور مقابل الميل والشتا') },
    { id: 'cover', w: 0.14, label: m('Soil covered', 'Sol couvert', 'تغطية التربة', 'تغطية التراب'), from: m('NDVI months with plants', 'mois avec NDVI de végétation', 'أشهر فيها نبات', 'شهور فيها نبات') },
    { id: 'organic', w: 0.12, label: m('Organic matter', 'Matière organique', 'المادة العضوية', 'المادة العضوية'), from: m('crop sheet + cover crops', 'fiche culture + couverture', 'بطاقة المحصول + التغطية', 'بطاقة المحصول + التغطية') },
    { id: 'pest', w: 0.08, label: m('Pest cycle broken', 'Cycle des ravageurs cassé', 'كسر دورة الآفات', 'قطع دورة الحشرات'), from: m('crop sheet + farmer (not satellites)', 'fiche + agriculteur (pas satellite)', 'البطاقة + الفلاح (ليست السواتل)', 'البطاقة + الفلاح (ماشي الساتلات)') },
    { id: 'forage', w: 0.05, label: m('Forage value', 'Valeur fourragère', 'قيمة العلف', 'قيمة العلف'), from: m('crop sheet + farmer', 'fiche + agriculteur', 'البطاقة + الفلاح', 'البطاقة + الفلاح') },
    { id: 'market', w: 0.10, label: m('Market suitability', 'Adapté au marché', 'ملاءمة السوق', 'ملاءمة السوق'), from: m('crop sheet + farmer', 'fiche + agriculteur', 'البطاقة + الفلاح', 'البطاقة + الفلاح') }
  ];

  D.baseWeights = { water: 0.18, nitrogen: 0.15, erosion: 0.18, cover: 0.14, organic: 0.12, pest: 0.08, forage: 0.05, market: 0.10 };

  D.rotations = [
    {
      id: 'current', conf: 3, needsIrrigation: false, sens: { water: 1.05, heat: 1 },
      name: m('Your current rotation', 'Votre rotation actuelle', 'دورتك الحالية', 'الدورة اللي عندك دابا'),
      chain: ['wheat', 'wheat', 'fallow'],
      v: { water: 55, nitrogen: 40, erosion: 45, cover: 45, organic: 42, pest: 40, forage: 40, market: 88 },
      why: m('It is what you know, and it costs the least. But two wheats in a row take water and leave the soil bare in autumn.',
        'C’est ce que vous connaissez et ce qui coûte le moins. Mais deux blés de suite prennent de l’eau et laissent le sol nu en automne.',
        'هي ما تعرفه وأقل تكلفة. لكن قمحين متتابعين يستهلكان الماء ويتركان التربة عارية في الخريف.',
        'هي اللي كتعرف وأرخص. ولكن جوج قمح مورا بعضهم كياكلو الما وكيخليو التراب عاري فالخريف.'),
      benefits: [m('Low cost', 'Coût faible', 'تكلفة منخفضة', 'تكلفة ضعيفة'), m('You know the work', 'Travail connu', 'عمل تعرفه', 'الخدمة كتعرفها')],
      risks: [m('Soil loss on a slope', 'Perte de sol sur pente', 'فقدان التربة على الميل', 'ضياع التراب فالميل'), m('Late rain hurts it most', 'Sensible au retard de pluie', 'يتضرر كثيرًا بتأخر المطر', 'كتضرها الشتا المتأخرة')],
      gaps: m('Disease, local prices and labour are not visible from space.', 'Maladies, prix locaux et main-d’œuvre invisibles depuis l’espace.', 'الأمراض والأسعار المحلية والعمالة غير مرئية من الفضاء.', 'الأمراض والأثمنة المحلية والخدامة ما كيتشافوش من الفضاء.')
    },
    {
      id: 'improved', conf: 3, needsIrrigation: false, sens: { water: 0.9, heat: 0.85 },
      name: m('Improved rotation', 'Rotation améliorée', 'دورة محسّنة', 'دورة محسّنة'),
      chain: ['wheat', 'fava', 'barley'],
      v: { water: 62, nitrogen: 92, erosion: 62, cover: 66, organic: 68, pest: 82, forage: 60, market: 78 },
      why: m('The fava bean puts nitrogen back in the soil, so the next wheat needs less. It still needs a good autumn rain.',
        'La fève rend de l’azote au sol, le blé suivant en a besoin de moins. Il faut encore une bonne pluie d’automne.',
        'الفول يعيد الآزوت إلى التربة، فيحتاج القمح التالي أقل. لكنه يحتاج مطر خريف جيد.',
        'الفول كيرجع الآزوت للتراب، فالقمح اللي موراه كيحتاج أقل. ولكن كيحتاج شتا خريف مزيانة.'),
      benefits: [m('Nitrogen for free', 'Azote gratuit', 'آزوت مجاني', 'آزوت بلاش'), m('Breaks the pest cycle', 'Casse le cycle des ravageurs', 'يكسر دورة الآفات', 'كيقطع دورة الحشرات'), m('More feed', 'Plus de fourrage', 'علف أكثر', 'علف أكثر')],
      risks: [m('Needs autumn rain', 'Besoin de pluie d’automne', 'يحتاج مطر الخريف', 'كيحتاج شتا الخريف'), m('Fava can get disease', 'La fève peut être malade', 'الفول قد يمرض', 'الفول يقدر يمرض')],
      gaps: m('Local fava prices and seed availability are not in the satellites.', 'Prix locaux de la fève et semences absents des satellites.', 'أسعار الفول المحلية وتوفر البذور ليست في السواتل.', 'أثمنة الفول المحلية وتوفر الزريعة ماشي فالسواتلات.')
    },
    {
      id: 'resilient', conf: 2, needsIrrigation: false, sens: { water: 0.45, heat: 0.5 },
      name: m('Resilient rotation', 'Rotation résiliente', 'دورة مرنة', 'دورة قوية'),
      chain: ['barley', 'chickpea', 'cover'],
      v: { water: 94, nitrogen: 78, erosion: 90, cover: 94, organic: 88, pest: 80, forage: 58, market: 56 },
      why: m('Barley and chickpea drink less, and the cover crop keeps the soil covered when the heavy rain comes.',
        'L’orge et le pois chiche boivent moins, et la couverture protège le sol quand les grosses pluies arrivent.',
        'الشعير والحمص يشربان أقل، ومحصول التغطية يحمي التربة عند الأمطار الغزيرة.',
        'الشعير والحمص كيشربو أقل، ومحصول التغطية كيحمي التراب ملي كتجي الشتا القوية.'),
      benefits: [m('Least water', 'Moins d’eau', 'أقل ماء', 'أقل ما'), m('Strong against erosion', 'Fort contre l’érosion', 'قوي ضد الانجراف', 'قوي ضد الانجراف'), m('Soil covered in autumn', 'Sol couvert en automne', 'التربة مغطاة في الخريف', 'التراب مغطى فالخريف')],
      risks: [m('Lower income in year one', 'Revenu plus faible la 1re année', 'دخل أقل في السنة الأولى', 'دخل أقل فالعام الأول'), m('Chickpea market is narrow', 'Marché du pois chiche étroit', 'سوق الحمص ضيق', 'سوق الحمص ضيق')],
      gaps: m('Chickpea prices, seed and technique support are not visible from space.', 'Prix du pois chiche, semences et appui technique invisibles.', 'أسعار الحمص والبذور والدعم التقني غير مرئية.', 'أثمنة الحمص والزريعة والدعم التقني ما كيتشافوش.')
    }
  ];

  D.weightsFor = function (goals) {
    var w = Object.assign({}, D.baseWeights);
    goals = goals || [];
    if (goals.indexOf('water') > -1) { w.water += 0.16; w.market -= 0.04; w.forage -= 0.02; }
    if (goals.indexOf('earn') > -1) { w.market += 0.14; w.forage += 0.05; w.water -= 0.04; }
    if (goals.indexOf('soil') > -1) { w.organic += 0.11; w.nitrogen += 0.06; w.cover += 0.04; w.pest -= 0.02; }
    if (goals.indexOf('erosion') > -1) { w.erosion += 0.14; w.cover += 0.06; w.market -= 0.03; }
    var tot = 0;
    Object.keys(w).forEach(function (k) { w[k] = Math.max(0.01, w[k]); tot += w[k]; });
    Object.keys(w).forEach(function (k) { w[k] = w[k] / tot; });
    return w;
  };

  D.scoreRot = function (rot, weights, scen, cons) {
    var v = Object.assign({}, rot.v);
    var s = scen || { hot: 0, dry: 0 };
    var sens = rot.sens || { water: 1, heat: 1 };
    v.water = clamp(v.water - (s.dry * 0.85 + s.hot * 6.5) * sens.water, 0, 100);
    v.market = clamp(v.market - s.hot * 0.25 - s.dry * 0.12, 0, 100);
    v.forage = clamp(v.forage - s.dry * 0.28 - s.hot * 0.2, 0, 100);
    v.erosion = clamp(v.erosion + s.hot * 0.15 - s.dry * 0.1, 0, 100);
    var sum = 0, tw = 0;
    Object.keys(weights).forEach(function (k) { sum += (v[k] || 0) * weights[k]; tw += weights[k]; });
    var score = sum / (tw || 1);
    if (cons) {
      if (cons.water === 'rain' && rot.needsIrrigation) score -= 14;
      if (cons.equip === 'hand' && rot.id === 'resilient') score -= 0;
    }
    return Math.round(clamp(score, 0, 100));
  };

  D.confFor = function (rot, scen) {
    var s = scen || { hot: 0, dry: 0 };
    var c = rot.conf;
    if (s.hot > 1.5 || s.dry > 15) c -= 1;
    return clamp(c, 1, 3);
  };

  D.months = [
    m('J', 'J', 'ينا', 'ينا'), m('F', 'F', 'فبر', 'فبر'), m('M', 'M', 'مار', 'مار'),
    m('A', 'A', 'أبر', 'أبر'), m('M', 'M', 'ماي', 'ماي'), m('J', 'J', 'يون', 'يون'),
    m('J', 'J', 'يول', 'يول'), m('A', 'A', 'غشت', 'غشت'), m('S', 'S', 'شتن', 'شتن'),
    m('O', 'O', 'أكت', 'أكت'), m('N', 'N', 'نون', 'نون'), m('D', 'D', 'دجن', 'دجن')
  ];
  D.calendarStatus = ['grow', 'grow', 'grow', 'vuln', 'vuln', 'vuln', 'bare', 'bare', 'bare', 'bare', 'vuln', 'grow'];

  D.learn = [
    {
      id: 'nitrogen', pic: 'legume',
      title: m('Nitrogen-fixing crops', 'Cultures fixatrices d’azote', 'المحاصيل المثبتة للآزوت', 'المحاصيل اللي كتثبت الآزوت'),
      text: m('Fava and chickpea take nitrogen from the air and put it in the soil. The next cereal needs less fertiliser, and the soil keeps more life.',
        'La fève et le pois chiche prennent l’azote de l’air et le mettent dans le sol. La céréale suivante a besoin de moins d’engrais.',
        'الفول والحمص يأخذان الآزوت من الهواء ويضعانه في التربة. الحبوب التالية تحتاج سمادًا أقل.',
        'الفول والحمص كياخدو الآزوت من الهوا وكيحطوه فالتراب. الحبوب اللي موراهم كتحتاج سماد أقل.'),
      crops: m('Fava · Chickpea', 'Fève · Pois chiche', 'فول · حمص', 'فول · حمص')
    },
    {
      id: 'cover', pic: 'coverCrop',
      title: m('Cover crops', 'Cultures de couverture', 'محاصيل التغطية', 'محاصيل التغطية'),
      text: m('A low cover of vetch or oats keeps the rain from hitting bare soil. Roots hold the soil, and the cover is cut before it makes seed.',
        'Une couverture de vesce ou d’avoine empêche la pluie de frapper le sol nu. Les racines tiennent le sol.',
        'غطاء منخفض من البيقية أو الشوفان يمنع المطر من ضرب التربة العارية. الجذور تمسك التربة.',
        'غطاء صغير من البيقية ولا الشوفان كيمنع الشتا باش ما تضربش التراب العاري. الجذور كتمسك التراب.'),
      crops: m('Vetch · Oats · Clover', 'Vesce · Avoine · Trèfle', 'بيقية · شوفان · برسيم', 'بيقية · شوفان · برسيم')
    },
    {
      id: 'deep', pic: 'oliveGrove',
      title: m('Deep-rooting crops', 'Cultures à racines profondes', 'محاصيل بجذور عميقة', 'محاصيل بجذور غارقة'),
      text: m('Chickpea and olive send roots deep, so they reach water that wheat cannot. They also open the soil so the next rain goes in instead of running off.',
        'Le pois chiche et l’olivier descendent loin, atteignent l’eau que le blé ne peut pas prendre, et ouvrent le sol.',
        'الحمص والزيتون يمدان جذورهما بعيدًا فيصلان إلى ماء لا يصله القمح، ويفتحان التربة.',
        'الحمص والزيتون كيمدو الجذور ديالهم بعيد وكيوصلو للما اللي القمح ما كيوصلش ليه.'),
      crops: m('Chickpea · Olive', 'Pois chiche · Olivier', 'حمص · زيتون', 'حمص · زيتون')
    },
    {
      id: 'drought', pic: 'barleyField',
      title: m('Drought-tolerant crops', 'Cultures tolérantes à la sécheresse', 'محاصيل تتحمل الجفاف', 'محاصيل كتحمل الجفاف'),
      text: m('Barley finishes its cycle earlier than wheat, so it escapes the hottest weeks. With late autumn rain, that difference can save the harvest.',
        'L’orge termine plus tôt que le blé, donc elle évite les semaines les plus chaudes.',
        'الشعير ينهي دورته قبل القمح، فيتجنب أسخن الأسابيع.',
        'الشعير كيكمل دورتو قبل القمح، فكيتجنب السيمانات السخونة.'),
      crops: m('Barley · Chickpea', 'Orge · Pois chiche', 'شعير · حمص', 'شعير · حمص')
    }
  ];

  D.alerts = [
    {
      id: 'heat', kind: 'heat', state: 'warn',
      title: m('Heat spells are more frequent', 'Les vagues de chaleur sont plus fréquentes', 'موجات الحرارة أكثر تكرارًا', 'موجات السخانة كتر'),
      text: m('July now has about 8 more days above 35 °C than in 2005. Water early in the morning and keep the soil covered.',
        'Juillet compte environ 8 jours de plus au-dessus de 35 °C qu’en 2005. Arrosez tôt le matin et couvrez le sol.',
        'يوليوز فيه نحو 8 أيام أكثر فوق 35 °م مقارنة بـ2005. اسقِ في الصباح الباكر وحافظ على تغطية التربة.',
        'يوليوز فيه بحال 8 أيام كتر فوق 35 °م من 2005. سقي بالصبح بكري وغطي التراب.'),
      date: m('This week', 'Cette semaine', 'هذا الأسبوع', 'هاد السيمانة')
    },
    {
      id: 'dry', kind: 'dry', state: 'warn',
      title: m('Dry spells last longer', 'Les sécheresses durent plus longtemps', 'فترات الجفاف تطول', 'فترات الجفاف كتطول'),
      text: m('The longest dry spell in autumn went from 21 days in 2005 to about 38 days now. Sow only after 20 mm of rain.',
        'La plus longue sécheresse d’automne est passée de 21 jours en 2005 à environ 38 jours.',
        'أطول فترة جفاف خريفي انتقلت من 21 يومًا في 2005 إلى نحو 38 يومًا.',
        'أطول فترة جفاف فالخريف مشات من 21 يوم فـ2005 لـ38 يوم.'),
      date: m('Ongoing trend', 'Tendance en cours', 'اتجاه مستمر', 'اتجاه مستمر')
    },
    {
      id: 'storm', kind: 'storm', state: 'bad',
      title: m('Heavy rain possible on bare soil', 'Pluies intenses possibles sur sol nu', 'أمطار غزيرة ممكنة على تربة عارية', 'شتا قوية ممكنة على تراب عاري'),
      text: m('With 18 % slope and fields bare in October, one strong storm can carry soil away. Stone bunds and cover reduce the loss.',
        'Avec 18 % de pente et des champs nus en octobre, une forte averse peut emporter le sol.',
        'مع ميل 18% وحقول عارية في أكتوبر، عاصفة قوية واحدة قد تحمل التربة.',
        'بميل 18% وأراضي عارية فأكتوبر، عاصفة قوية وحدة تقدر تدي التراب.'),
      date: m('Trend from historical data', 'Tendance historique', 'اتجاه من بيانات تاريخية', 'اتجاه من داتا تاريخية')
    },
    {
      id: 'plants', kind: 'dry', state: 'warn',
      title: m('Plants stress earlier in summer', 'Les plantes stressent plus tôt', 'النباتات تُجهد أبكر', 'النباتات كتتعيا بكري'),
      text: m('The NDVI curve drops sooner in July than it did 20 years ago. The crop is most fragile in April–June.',
        'La courbe NDVI baisse plus tôt en juillet qu’il y a 20 ans. La culture est fragile d’avril à juin.',
        'منحنى NDVI ينخفض أبكر في يوليوز. المحصول أكثر هشاشة من أبريل إلى يونيو.',
        'منحنى NDVI كينزل بكري فـيوليوز. المحصول هشاش من أبريل حتى يونيو.'),
      date: m('Seasonal pattern', 'Schéma saisonnier', 'نمط موسمي', 'نمط موسمي')
    }
  ];

  D.neighbors = {
    total: 10, min: 5,
    counts: { current: 2, improved: 3, resilient: 5 },
    zone: m('Farms near you, similar slope and same main crop', 'Fermes proches, pente et culture similaires', 'مزارع قريبة، ميل ومحصول مشابهان', 'ضيعات قريبة، ميل ومحصول بحال بحال')
  };
})();
