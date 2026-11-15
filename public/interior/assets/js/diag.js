/* ============================================================
   Mazra'a — visual diagnosis: questions, satellite checks, rules
   One question per screen, one picture per choice, audio on every screen.
   ============================================================ */
(function () {
  D.diag = {
    problems: [
      { id: 'rain', pic: 'rainLate', label: m('Late rain', 'Pluie tardive', 'مطر متأخر', 'شتا متأخرة'), sub: m('I sowed and nothing came', 'J’ai semé et rien ne lève', 'بذرت ولم ينبت شيء', 'زرعت وما طلع والو') },
      { id: 'erosion', pic: 'erosion', label: m('Soil washing away', 'Le sol s’en va', 'التربة تنجرف', 'التراب كيمشي'), sub: m('Water takes my soil', 'L’eau emporte mon sol', 'الماء يحمل ترابي', 'الما كيدي التراب ديالي') },
      { id: 'plants', pic: 'yellowAll', label: m('Weak or yellow plants', 'Plantes faibles ou jaunes', 'نباتات ضعيفة أو صفراء', 'نباتات ضعيفة ولا صفراء'), sub: m('Small, pale, yellow', 'Petites, pâles, jaunes', 'صغيرة، باهتة، صفراء', 'صغار، باهتين، صفرين') },
      { id: 'heat', pic: 'heatCold', label: m('Heat or cold damage', 'Dégâts de chaleur ou de froid', 'ضرر الحرارة أو البرد', 'ضرر السخانة ولا البرد'), sub: m('Leaves burnt or frosted', 'Feuilles brûlées ou gelées', 'أوراق محروقة أو متجمدة', 'وراق محروقين ولا مجمدين') }
    ],

    followups: {
      rain: [
        {
          id: 'soil', q: m('Is the soil still dry when you dig 10 cm?', 'Le sol est-il encore sec à 10 cm ?', 'هل التربة ما زالت جافة على عمق 10 سم؟', 'التراب مازال ناشف ملي تحفر 10 سم؟'),
          opts: [
            { id: 'dry', pic: 'soilDry', label: m('Yes, dry', 'Oui, sec', 'نعم، جاف', 'إيه، ناشف') },
            { id: 'moist', pic: 'soilMoist', label: m('No, still moist', 'Non, encore humide', 'لا، ما زال رطبًا', 'لا، مازال رطب') }
          ]
        },
        {
          id: 'sprout', q: m('Did the plants come up, then dry out?', 'Les plantes ont-elles levé puis séché ?', 'هل نبتت النباتات ثم جفّت؟', 'النباتات طلعت ومن بعد نشفو؟'),
          opts: [
            { id: 'yes', pic: 'drySprout', label: m('Yes, they dried', 'Oui, elles ont séché', 'نعم، جفّت', 'إيه، نشفو') },
            { id: 'no', pic: 'stayGreen', label: m('No, they stayed green', 'Non, restées vertes', 'لا، بقيت خضراء', 'لا، بقاو خضر') }
          ]
        }
      ],
      erosion: [
        {
          id: 'gully', q: m('Do you see small channels in the field?', 'Voyez-vous de petits ravins ?', 'هل ترى قنوات صغيرة في الحقل؟', 'كتشوف قنوات صغار فالأرض؟'),
          opts: [
            { id: 'yes', pic: 'gullyYes', label: m('Yes, small channels', 'Oui, des ravins', 'نعم، قنوات صغيرة', 'إيه، قنوات صغار') },
            { id: 'no', pic: 'gullyNo', label: m('No channels', 'Pas de ravins', 'لا توجد قنوات', 'ما كاينش قنوات') }
          ]
        },
        {
          id: 'slope', q: m('Is your field on a slope or flat?', 'Votre champ est-il en pente ou plat ?', 'هل حقلك في ميل أم مستوٍ؟', 'الأرض ديالك فالميل ولا مستوية؟'),
          opts: [
            { id: 'slope', pic: 'slopeField', label: m('On a slope', 'En pente', 'في ميل', 'فالميل') },
            { id: 'flat', pic: 'flatField', label: m('Flat', 'Plat', 'مستوٍ', 'مستوية') }
          ]
        },
        {
          id: 'brown', q: m('After heavy rain, does the water leave brown?', 'Après une grosse pluie, l’eau part-elle brune ?', 'بعد مطر غزير، هل يخرج الماء بنيًا؟', 'من بعد شتا قوية، الما كيخرج بني؟'),
          opts: [
            { id: 'yes', pic: 'brownWater', label: m('Yes, brown', 'Oui, brune', 'نعم، بني', 'إيه، بني') },
            { id: 'no', pic: 'clearWater', label: m('No, clear', 'Non, claire', 'لا، صافٍ', 'لا، صافي') }
          ]
        }
      ],
      plants: [
        {
          id: 'where', q: m('Are the leaves yellow all over, or only the lowest?', 'Les feuilles sont-elles jaunes partout ou seulement en bas ?', 'هل الأوراق صفراء كلها أم السفلى فقط؟', 'الوراق صفرين كاملين ولا غير اللي تحت؟'),
          opts: [
            { id: 'all', pic: 'yellowAll', label: m('All over', 'Partout', 'كلها', 'كاملين') },
            { id: 'bottom', pic: 'yellowBottom', label: m('Only the lowest', 'Seulement en bas', 'السفلى فقط', 'غير اللي تحت') }
          ]
        },
        {
          id: 'stunt', q: m('Are the plants also small and thin?', 'Les plantes sont-elles aussi petites et fines ?', 'هل النباتات أيضًا صغيرة ورقيقة؟', 'النباتات زادة صغار ورقيقين؟'),
          opts: [
            { id: 'yes', pic: 'stuntYes', label: m('Yes, small and thin', 'Oui, petites', 'نعم، صغيرة', 'إيه، صغار') },
            { id: 'no', pic: 'stuntNo', label: m('No, normal size', 'Non, taille normale', 'لا، حجمها عادي', 'لا، عاديين') }
          ]
        }
      ],
      heat: [
        {
          id: 'when', q: m('Did it happen after hot days or cold nights?', 'Cela est-il arrivé après des jours chauds ou des nuits froides ?', 'هل حدث بعد أيام حارة أم ليالٍ باردة؟', 'وقع من بعد أيام سخونين ولا ليالي باردين؟'),
          opts: [
            { id: 'heat', pic: 'heatWave', label: m('After hot days', 'Après jours chauds', 'بعد أيام حارة', 'من بعد أيام سخونين') },
            { id: 'cold', pic: 'coldNight', label: m('After cold nights', 'Après nuits froides', 'بعد ليالٍ باردة', 'من بعد ليالي باردين') }
          ]
        },
        {
          id: 'how', q: m('Are the leaves burnt at the top, or wilted?', 'Les feuilles sont-elles brûlées en haut ou flétries ?', 'هل الأوراق محروقة من الأعلى أم ذابلة؟', 'الوراق محروقين من الفوق ولا ذابلين؟'),
          opts: [
            { id: 'burnt', pic: 'leafBurnt', label: m('Burnt at the top', 'Brûlées en haut', 'محروقة من الأعلى', 'محروقين من الفوق') },
            { id: 'wilted', pic: 'leafWilt', label: m('Wilted in the afternoon', 'Flétries l’après-midi', 'ذابلة بعد الزوال', 'ذابلين فالعشية') }
          ]
        }
      ]
    },

    soil: {
      pic: 'soilDark',
      opts: [
        { id: 'dark', pic: 'soilDark', label: m('Dark and crumbly', 'Sombre et grumeleux', 'داكنة ومتفتتة', 'غامق ومفتت'), hint: m('It breaks into small pieces', 'Elle se casse en petits morceaux', 'تتفتت إلى قطع صغيرة', 'كيتفكك لقطع صغار') },
        { id: 'pale', pic: 'soilPale', label: m('Pale and hard', 'Pâle et dure', 'فاتحة وصلبة', 'فاتح وقاسح'), hint: m('It is dusty and crusty', 'Elle est poussiéreuse et croûtée', 'مغبرة ومتقشرة', 'مغبر وقاشر') }
      ]
    },
    water: {
      opts: [
        { id: 'rain', pic: 'waterRain', label: m('Rain only', 'Pluie seulement', 'المطر فقط', 'غير الشتا') },
        { id: 'well', pic: 'waterWell', label: m('Well', 'Puits', 'بئر', 'بير') },
        { id: 'irr', pic: 'waterIrr', label: m('Irrigation', 'Irrigation', 'سقي', 'السقي') }
      ]
    },

    checks: {
      rain: [
        { label: m('Autumn rain delay', 'Retard de la pluie', 'تأخر أمطار الخريف', 'تأخر شتا الخريف'), value: '+21 ' + m('days', 'j', 'يومًا', 'يوم'), src: 'NASA POWER' },
        { label: m('Longest dry spell', 'Plus longue sécheresse', 'أطول فترة جفاف', 'أطول فترة جفاف'), value: '38 ' + m('days', 'j', 'يومًا', 'يوم'), src: 'NASA POWER' },
        { label: m('Plant greenness', 'Vigueur des plantes', 'اخضرار النبات', 'خضرة النباتات'), value: 'NDVI 0.42', src: 'MODIS' }
      ],
      erosion: [
        { label: m('Field slope', 'Pente du champ', 'ميل الحقل', 'ميل الأرض'), value: '18 %', src: 'SRTM' },
        { label: m('Heaviest rain, 1 h', 'Pluie max en 1 h', 'أغزر مطر في ساعة', 'أقوى شتا فساعة'), value: '42 mm', src: 'GPM IMERG' },
        { label: m('Bare months', 'Mois de sol nu', 'أشهر التربة العارية', 'شهور التراب العاري'), value: '4 / 12', src: 'MODIS NDVI' }
      ],
      plants: [
        { label: m('Greenness now / last year', 'Vigueur cette année / l’an dernier', 'الاخضرار الآن / العام الماضي', 'الخضرة دابا / العام اللي فات'), value: '0.42 / 0.49', src: 'MODIS' },
        { label: m('Soil moisture, top 5 cm', 'Humidité du sol, 5 cm', 'رطوبة التربة، 5 سم', 'رطوبة التراب، 5 سم'), value: '0.18', src: 'SMAP' },
        { label: m('Heat days above 35 °C', 'Jours > 35 °C', 'أيام فوق 35 °م', 'أيام فوق 35 °م'), value: '28', src: 'NASA POWER' }
      ],
      heat: [
        { label: m('Heat days above 35 °C', 'Jours > 35 °C', 'أيام فوق 35 °م', 'أيام فوق 35 °م'), value: '+28', src: 'NASA POWER' },
        { label: m('July maximum', 'Maximum de juillet', 'أقصى يوليوز', 'أقصى يوليوز'), value: '38.6 °C', src: 'NASA POWER' },
        { label: m('July greenness drop', 'Baisse du NDVI en juillet', 'انخفاض NDVI في يوليوز', 'نزول NDVI فـيوليوز'), value: '−0.14', src: 'MODIS' }
      ]
    }
  };

  /* ---------- rules: answers -> causes + proposed solutions ---------- */
  D.diagnose = function (a) {
    var f = a.follow || {};
    var causes = [], sols = [];
    var add = function (t, d, conf, ev) { causes.push({ t: t, d: d, conf: conf, ev: ev }); };
    var sol = function (id) { if (sols.indexOf(id) < 0) sols.push(id); };

    if (a.problem === 'rain') {
      if (f.soil === 'dry') {
        add(m('The first useful rain comes about three weeks later', 'La première pluie utile arrive trois semaines plus tard', 'أول مطر مفيد يأتي متأخرًا نحو ثلاثة أسابيع', 'أول شتا مفيدة كتجي متأخرة بحال 3 سيمانات'),
          m('At 10 cm your soil is still dry, so the seed cannot start.', 'À 10 cm le sol est encore sec : la graine ne peut pas démarrer.', 'على عمق 10 سم التربة جافة، فلا تستطيع البذرة البدء.', 'فـ10 سم التراب ناشف، فالزريعة ما كتقدرش تبدأ.'),
          3, m('NASA POWER: first 20 mm moved from 12 Oct to 2 Nov', 'NASA POWER : les 20 premiers mm passent du 12 oct. au 2 nov.', 'NASA POWER: أول 20 مم انتقلت من 12 أكتوبر إلى 2 نونبر', 'NASA POWER: أول 20 مم مشاو من 12 أكتوبر لـ2 نونبر'));
        add(m('The wheat cycle no longer matches the rain', 'Le cycle du blé ne correspond plus à la pluie', 'دورة القمح لم تعد تطابق المطر', 'دورة القمح ما بقاتش كتوافق الشتا'), '', 2, '');
        sol('waitRain'); sol('sowWindow');
      } else {
        add(m('Rain is late, but your soil still holds moisture', 'La pluie est tardive, mais le sol garde de l’humidité', 'المطر متأخر، لكن التربة تحتفظ بالرطوبة', 'الشتا متأخرة، ولكن التراب مازال فيه الرطوبة'), '', 2, '');
        sol('sowWindow');
      }
      if (f.sprout === 'yes') {
        add(m('A false start: the seedlings died in the long dry spell', 'Un faux départ : les plantules ont séché', 'بداية خاطئة: ماتت البادرات في الجفاف', 'بداية خايبة: الشتلات ماتو فالجفاف'),
          m('The plant came up, then had no water for several weeks.', 'La plante a levé puis a manqué d’eau plusieurs semaines.', 'نبتت ثم لم تجد ماءً لأسابيع.', 'طلعت ومن بعد ما لقاوش الما لسيمانات.'),
          3, m('NASA POWER: longest autumn dry spell now 38 days', 'NASA POWER : sécheresse d’automne jusqu’à 38 jours', 'NASA POWER: أطول جفاف خريفي 38 يومًا', 'NASA POWER: أطول جفاف فالخريف 38 يوم'));
        sol('mulch');
      }
      sol('barley');
    }

    if (a.problem === 'erosion') {
      if (f.gully === 'yes') {
        add(m('Water is cutting small channels in your field', 'L’eau creuse de petits ravins', 'الماء يحفر قنوات صغيرة في حقلك', 'الما كيحفر قنوات صغار فالأرض'),
          m('Once a channel starts, each storm makes it deeper.', 'Une fois commencé, chaque orage l’agrandit.', 'بمجرد أن تبدأ القناة، كل عاصفة تعمقها.', 'ملي كتبدا القناة، كل عاصفة كتزيد كتحفرها.'),
          3, m('SRTM: 18 % slope · GPM: 42 mm in one hour', 'SRTM : pente 18 % · GPM : 42 mm en 1 h', 'SRTM: ميل 18% · GPM: 42 مم في ساعة', 'SRTM: ميل 18% · GPM: 42 مم فساعة'));
        sol('gullyFix');
      }
      if (f.slope === 'slope') {
        add(m('The slope sends the rainwater down fast', 'La pente fait descendre l’eau vite', 'الميل ينزل ماء المطر بسرعة', 'الميل كينزل ما الشتا بسرعة'),
          '', 3, m('SRTM slope 18 %: above the erosion threshold', 'Pente SRTM 18 % : au-dessus du seuil d’érosion', 'ميل SRTM 18%: فوق عتبة الانجراف', 'ميل SRTM 18%: فوق حد الانجراف'));
        sol('stoneBunds'); sol('contourPlough');
      } else if (f.slope === 'flat') {
        add(m('Water stands on the flat and washes the surface', 'L’eau stagne et lave la surface', 'الماء يتجمع ويغسل السطح', 'الما كيتجمع وكيغسل السطح'), '', 2, '');
        sol('stripCrop');
      }
      if (f.brown === 'yes') {
        add(m('The brown water is your topsoil leaving', 'L’eau brune, c’est votre terre qui part', 'الماء البني هو ترابك العلوي يرحل', 'الما البني هو التراب اللي كيمشي'),
          m('Topsoil carries the organic matter and the seed.', 'La terre de surface porte la matière organique et la semence.', 'التربة السطحية تحمل المادة العضوية والبذور.', 'التراب الفوقاني كياخد المادة العضوية والزريعة.'),
          3, m('GPM IMERG heavy-rain days, 2005–2025', 'Jours de forte pluie GPM, 2005–2025', 'أيام الأمطار الغزيرة GPM، 2005–2025', 'أيام الشتا القوية GPM، 2005–2025'));
        sol('mulch');
      }
      sol('cover');
    }

    if (a.problem === 'plants') {
      if (f.where === 'all') {
        add(m('The soil is poor: little organic matter and few nutrients', 'Le sol est pauvre : peu de matière organique', 'التربة فقيرة: مادة عضوية قليلة', 'التراب فقير: مادة عضوية قليلة'),
          '', 2, m('Your soil answer (pale, hard) + global soil layer, medium confidence', 'Votre réponse (sol pâle, dur) + couche mondiale, confiance moyenne', 'جوابك (تربة فاتحة وصلبة) + الطبقة العالمية، ثقة متوسطة', 'جوابك (تراب فاتح وقاسح) + الطبقة العالمية، ثقة متوسطة'));
        add(m('There is no legume in the rotation to bring nitrogen', 'Aucune légumineuse dans la rotation pour apporter de l’azote', 'لا توجد بقوليات في الدورة لتوفير الآزوت', 'ما كاينش قطاني فالدورة باش تجيب الآزوت'), '', 3, '');
        sol('legume'); sol('compost');
      } else if (f.where === 'bottom') {
        add(m('Nitrogen runs short while the grain fills', 'L’azote manque au remplissage du grain', 'الآزوت ينقص عند امتلاء الحبة', 'الآزوت كينقص ملي كتعمر الحبة'),
          m('Yellow lowest leaves first is the classic sign.', 'Les feuilles basses jaunes d’abord : signe classique.', 'اصفرار الأوراق السفلى أولًا علامة كلاسيكية.', 'اصفرار الوراق اللي تحت هو العلامة.'),
          3, '');
        sol('legume'); sol('compost');
      }
      if (f.stunt === 'yes') {
        add(m('Pests or disease are possible — satellites cannot see this', 'Ravageurs ou maladie possibles — invisibles au satellite', 'آفات أو مرض محتمل — لا تراه السواتل', 'حشرات ولا مرض ممكن — الساتلات ما كتشوفهمش'),
          m('Small and thin plants with yellow leaves can also be a root problem.', 'Des plantes petites et fines peuvent être un problème racinaire.', 'النباتات الصغيرة والرقيقة قد تكون مشكلة جذور.', 'النباتات الصغار قد تكون مشكلة فالجذور.'),
          1, m('Not visible from space: needs a field visit', 'Invisible depuis l’espace : visite nécessaire', 'غير مرئي من الفضاء: يحتاج زيارة', 'ما كيتشافش من الفضاء: محتاج زيارة'));
        sol('checkTech');
      }
      sol('cover');
    }

    if (a.problem === 'heat') {
      if (f.when === 'cold') {
        add(m('Late cold nights after sowing', 'Nuits froides tardives après le semis', 'ليالٍ باردة متأخرة بعد البذر', 'ليالي باردين متأخرين من بعد الزريعة'),
          m('Young plants can be burnt by one cold night.', 'Une seule nuit froide peut brûler les jeunes plants.', 'ليلة باردة واحدة تحرق النباتات الصغيرة.', 'ليلة باردة وحدة كتحرق النباتات الصغار.'),
          2, m('NASA POWER: minimum temperature, last frost date', 'NASA POWER : température minimale, dernière gelée', 'NASA POWER: الحرارة الدنيا وتاريخ آخر صقيع', 'NASA POWER: الحرارة الدنيا وتاريخ آخر صقيع'));
        sol('sowWindow'); sol('barley');
      } else {
        add(m('Hot spells are more frequent than 20 years ago', 'Les vagues de chaleur sont plus fréquentes', 'موجات الحر أكثر من 20 سنة مضت', 'موجات السخانة كتر من 20 سنة'),
          '', 3, m('NASA POWER: +28 heat days above 35 °C since 2005', 'NASA POWER : +28 jours > 35 °C depuis 2005', 'NASA POWER: +28 يومًا فوق 35 °م منذ 2005', 'NASA POWER: +28 يوم فوق 35 °م من 2005'));
        add(m('Flowering falls in the hottest weeks', 'La floraison tombe dans les semaines les plus chaudes', 'الإزهار يقع في أسخن الأسابيع', 'الإزهار كيطيح فأسخن السيمانات'), '', 2, '');
        sol('barley'); sol('mulch');
        if (a.water !== 'rain') sol('drip'); else sol('windbreak');
      }
      if (f.how === 'wilted') {
        add(m('Afternoon wilting: the water balance is short', 'Flétrissement l’après-midi : bilan hydrique déficitaire', 'ذبول بعد الزوال: رصيد الماء ناقص', 'الذبول فالعشية: الما ما كافيش'), '', 2, '');
      }
    }

    if (a.soil === 'pale') sol('compost');
    if (a.soil === 'pale' && a.problem !== 'plants') sol('cover');
    if (a.water === 'rain') sols = sols.filter(function (s) { return s !== 'drip'; });
    if (sols.length > 4) sols = sols.slice(0, 4);
    if (causes.length > 4) causes = causes.slice(0, 4);

    var nuance = (a.problem === 'plants' && f.stunt === 'yes') || (a.problem === 'heat' && f.when === 'cold');
    return { causes: causes, sols: sols, confirm: !nuance };
  };
})();
