/* ============================================================
   Mazra'a — solutions catalogue, part 1 (rain and sowing)
   ============================================================ */
(function () {
  D.sol = D.sol || {};
  Object.assign(D.sol, {

    waitRain: {
      id: 'waitRain', pic: 'rainGauge', when: 'now', conf: 3, rot: 'resilient',
      title: m('Wait for 20 mm of rain before sowing', 'Attendez 20 mm de pluie avant de semer', 'انتظر 20 مم من المطر قبل البذر', 'تسنى 20 مم ديال الشتا قبل ما تزرع'),
      why: m('Your soil is still dry 10 cm down, and autumn rain now starts about three weeks later than 20 years ago.',
        'Votre sol est sec à 10 cm, et la pluie d’automne commence trois semaines plus tard qu’il y a 20 ans.',
        'تربتك جافة على عمق 10 سم، وأمطار الخريف تبدأ متأخرة نحو ثلاثة أسابيع.',
        'التراب ديالك ناشف فـ10 سم، وشتا الخريف كتبدا متأخرة بحال 3 سيمانات.'),
      ev: m('NASA POWER 2005–2025: first 20 mm of autumn rain moved from 12 October to 2 November.',
        'NASA POWER 2005–2025 : les 20 premiers mm passent du 12 octobre au 2 novembre.',
        'NASA POWER 2005–2025: أول 20 مم انتقلت من 12 أكتوبر إلى 2 نونبر.',
        'NASA POWER 2005–2025: أول 20 مم مشاو من 12 أكتوبر لـ2 نونبر.'),
      steps: [
        {
          pic: 'rainGauge', t: m('Measure the rain', 'Mesurez la pluie', 'قِس المطر', 'قيس الشتا'),
          d: m('Put a straight tin in the field. 20 mm is about two fingers deep.',
            'Placez une boîte droite au champ. 20 mm, c’est deux doigts.',
            'ضع علبة مستقيمة في الحقل. 20 مم تعادل إصبعين.',
            'حط علبة مستقيمة فالأرض. 20 مم بحال جوج صوابع.')
        },
        {
          pic: 'seedbed', t: m('Prepare, then wait', 'Préparez, puis attendez', 'جهّز ثم انتظر', 'وجد ومن بعد تسنى'),
          d: m('One shallow pass only. Do not open the soil before the rain.',
            'Un seul passage léger. N’ouvrez pas le sol avant la pluie.',
            'مرة واحدة سطحية فقط. لا تفتح التربة قبل المطر.',
            'مرة وحدة سطحية غير. ما تحلش التراب قبل الشتا.')
        },
        {
          pic: 'sowCal', t: m('Sow two or three days after', 'Semez deux ou trois jours après', 'ابذر بعد يومين أو ثلاثة', 'زرع جوج ولا تلاتة أيام من بعد'),
          d: m('Sow when the rain has soaked 20 cm. Write the date in your journal.',
            'Semez quand la pluie a mouillé 20 cm. Notez la date.',
            'ابذر عندما يبلل المطر 20 سم. اكتب التاريخ.',
            'زرع ملي الشتا تغرق 20 سم. كتب التاريخ فدفترك.')
        }
      ]
    },

    sowWindow: {
      id: 'sowWindow', pic: 'sowCal', when: 'now', conf: 2, rot: 'improved',
      title: m('Use the sowing window, not the old date', 'Utilisez la fenêtre de semis, pas l’ancienne date', 'استعمل نافذة البذر، لا التاريخ القديم', 'خدم نافذة الزريعة، ماشي التاريخ القديم'),
      why: m('The date your father used no longer matches the rain. The window follows rain and soil moisture.',
        'La date de votre père ne correspond plus à la pluie. La fenêtre suit la pluie et l’humidité.',
        'التاريخ الذي استعمله أبوك لم يعد يطابق المطر. النافذة تتبع المطر ورطوبة التربة.',
        'التاريخ اللي كان كيخدم بيه بوك ما بقاش كيوافق الشتا. النافذة كتتبع الشتا ورطوبة التراب.'),
      ev: m('NASA POWER rain + SMAP soil moisture, sowing window 2015–2025.',
        'NASA POWER pluie + SMAP humidité, fenêtre 2015–2025.',
        'NASA POWER للمطر + SMAP للرطوبة، نافذة 2015–2025.',
        'NASA POWER للشتا + SMAP للرطوبة، نافذة 2015–2025.'),
      steps: [
        {
          pic: 'checkSoil', t: m('Check 10 cm down', 'Vérifiez à 10 cm', 'تحقق على عمق 10 سم', 'شوف على عمق 10 سم'),
          d: m('Take a handful of soil. If it holds together, the seed can start.',
            'Prenez une poignée. Si elle tient, la graine peut germer.',
            'خذ حفنة. إذا تماسكت، يمكن للبذرة أن تبدأ.',
            'خد حفنة. إلا تماسكت، الزريعة تقدر تبدأ.')
        },
        {
          pic: 'rainGauge', t: m('Follow the rain, not the date', 'Suivez la pluie, pas la date', 'اتبع المطر لا التاريخ', 'تبع الشتا ماشي التاريخ'),
          d: m('The app shows the usual window for your commune each week.',
            'L’app montre la fenêtre habituelle de votre commune.',
            'يعرض التطبيق النافذة المعتادة لجماعتك.',
            'التطبيق كيوري النافذة المعتادة للجماعة ديالك.')
        },
        {
          pic: 'journal', t: m('Write what you did', 'Notez ce que vous avez fait', 'اكتب ما فعلت', 'كتب شنو درت'),
          d: m('Your notes are compared with the satellite next season.',
            'Vos notes seront comparées au satellite la saison prochaine.',
            'تُقارن ملاحظاتك بالساتل الموسم القادم.',
            'الملاحظات ديالك كتقارن بالساتل الموسم الجاي.')
        }
      ]
    },

    barley: {
      id: 'barley', pic: 'barleyField', when: 'now', conf: 3, rot: 'resilient',
      title: m('Sow barley instead of wheat this season', 'Semez de l’orge au lieu du blé cette saison', 'ابذر شعيرًا بدل القمح هذا الموسم', 'زرع الشعير بدل القمح هاد الموسم'),
      why: m('Barley finishes earlier and drinks less. With late rain, it escapes the hottest weeks.',
        'L’orge finit plus tôt et boit moins. Avec la pluie tardive, elle évite les semaines chaudes.',
        'الشعير ينهي أبكر ويشرب أقل. مع المطر المتأخر يتجنب أسخن الأسابيع.',
        'الشعير كيكمل بكري وكيشرب أقل. مع الشتا المتأخرة كيتجنب السيمانات السخونة.'),
      ev: m('Crop sheets INRA Morocco / FAO: barley needs about 15 % less water than wheat. NASA POWER 2005–2025.',
        'Fiches INRA Maroc / FAO : l’orge demande environ 15 % d’eau en moins. NASA POWER 2005–2025.',
        'بطاقات INRA المغرب / FAO: الشعير يحتاج نحو 15% ماء أقل من القمح. NASA POWER 2005–2025.',
        'بطاقات INRA المغرب / FAO: الشعير كيحتاج بحال 15% ما أقل من القمح. NASA POWER 2005–2025.'),
      steps: [
        {
          pic: 'harvestBasket', t: m('Choose a local barley seed', 'Choisissez une semence locale d’orge', 'اختر بذور شعير محلية', 'ختار زريعة شعير محلية'),
          d: m('Ask your cooperative for the variety used on nearby farms.',
            'Demandez à la coopérative la variété des fermes voisines.',
            'اسأل تعاونيتك عن الصنف المستعمل في المزارع القريبة.',
            'سول التعاونية على الصنف اللي كيخدمو بيه الجيران.')
        },
        {
          pic: 'seedDepth', t: m('Sow a little shallower', 'Semez un peu moins profond', 'ابذر أقل عمقًا قليلًا', 'زرع شوية أقل غرق'),
          d: m('3–5 cm is enough. Deeper seed waits for more rain.',
            '3–5 cm suffisent. Plus profond, la graine attend plus de pluie.',
            '3–5 سم تكفي. الأعمق ينتظر مطرًا أكثر.',
            '3–5 سم كافيين. اللي غرق كيتسنى شتا كتر.')
        },
        {
          pic: 'harvestBasket', t: m('Harvest two to three weeks earlier', 'Récoltez deux à trois semaines plus tôt', 'احصد قبل أسبوعين إلى ثلاثة', 'حصد قبل جوج ولا تلاتة سيمانات'),
          d: m('That earlier harvest is the water you saved.',
            'Cette récolte plus tôt, c’est l’eau économisée.',
            'هذا الحصاد المبكر هو الماء الذي وفرته.',
            'هاد الحصاد البكري هو الما اللي وفرتي.')
        }
      ]
    },

    mulch: {
      id: 'mulch', pic: 'mulch', when: 'next', conf: 3, rot: 'resilient',
      title: m('Keep the straw on the soil', 'Gardez la paille sur le sol', 'اترك التبن على التربة', 'خلي التبن على التراب'),
      why: m('Bare soil loses water and washes away. A straw cover cuts evaporation and slows the rain.',
        'Un sol nu perd son eau et s’en va. La paille réduit l’évaporation et ralentit la pluie.',
        'التربة العارية تفقد الماء وتنجرف. التبن يقلل التبخر ويبطئ المطر.',
        'التراب العاري كيضيع الما وكيمشي. التبن كينقص التبخر وكيبطئ الشتا.'),
      ev: m('MODIS NDVI bare months × GPM heavy rain. FAO: residue cover of 30 % cuts soil loss sharply.',
        'MODIS NDVI mois nus × GPM. FAO : 30 % de couverture réduit fortement la perte de sol.',
        'MODIS NDVI أشهر عارية × GPM. FAO: تغطية 30% تقلل فقدان التربة بقوة.',
        'MODIS NDVI شهور عارية × GPM. FAO: تغطية 30% كتنقص ضياع التراب بزاف.'),
      steps: [
        {
          pic: 'noBurn', t: m('Do not burn the straw', 'Ne brûlez pas la paille', 'لا تحرق التبن', 'ما تحرقش التبن'),
          d: m('Burning takes the organic matter you need next year.',
            'Brûler enlève la matière organique de l’an prochain.',
            'الحرق يأخذ المادة العضوية التي تحتاجها العام القادم.',
            'الحرق كياخد المادة العضوية اللي كتحتاجها العام الجاي.')
        },
        {
          pic: 'mulch', t: m('Spread it 2–3 cm thick', 'Étalez 2–3 cm', 'انشره بسماكة 2–3 سم', 'فرشو 2–3 سم'),
          d: m('Cover the ground, not the plants. Leave the stems standing.',
            'Couvrez le sol, pas les plantes. Laissez les tiges debout.',
            'غطِّ الأرض لا النباتات. اترك السيقان قائمة.',
            'غطي الأرض ماشي النباتات. خلي السيقان واقفين.')
        },
        {
          pic: 'mulchRain', t: m('Leave it over autumn', 'Laissez-la tout l’automne', 'اتركه طوال الخريف', 'خليه طوال الخريف'),
          d: m('The rain will soak in instead of running off.',
            'La pluie s’infiltrera au lieu de ruisseler.',
            'سيتسرب المطر بدل أن يجري.',
            'الشتا غادي تدخل للتراب بدل ما تجري.')
        }
      ]
    }

  });
})();
