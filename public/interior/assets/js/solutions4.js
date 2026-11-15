/* ============================================================
   Mazra'a — solutions catalogue, part 4 (heat, water, and the expert)
   ============================================================ */
(function () {
  D.sol = D.sol || {};
  Object.assign(D.sol, {

    drip: {
      id: 'drip', pic: 'dripLine', when: 'now', conf: 3, rot: 'improved', needsWell: true,
      title: m('Water only at flowering, if you have a well', 'Arrosez seulement à la floraison, si vous avez un puits', 'اسقِ فقط عند الإزهار إن كان لديك بئر', 'سقي غير فالإزهار إلا عندك بير'),
      why: m('One watering at flowering protects the grain. Watering before that mostly evaporates in the July heat.',
        'Un arrosage à la floraison protège le grain. Avant, l’eau s’évapore surtout.',
        'سقية واحدة عند الإزهار تحمي الحبة. قبل ذلك يتبخر الماء في حرارة يوليوز.',
        'سقية وحدة فالإزهار كتحمي الحبة. قبل هادشي الما كيتبخر فسخانة يوليوز.'),
      ev: m('NASA POWER July maximum 38.6 °C + SMAP top-soil moisture. Crop sheet: flowering is the sensitive stage.',
        'NASA POWER max juillet 38,6 °C + SMAP. Fiche : la floraison est le stade sensible.',
        'NASA POWER أقصى يوليوز 38.6 °م + SMAP. البطاقة: الإزهار هو الطور الحساس.',
        'NASA POWER أقصى يوليوز 38.6 °م + SMAP. البطاقة: الإزهار هو المرحلة الحساسة.'),
      steps: [
        {
          pic: 'waterWell', t: m('Check what the well gives', 'Vérifiez le débit du puits', 'تحقق من عطاء البئر', 'شوف البير شحال كيعطي'),
          d: m('Enough for one pass only? Then save it for flowering.',
            'Assez pour un seul passage ? Gardez-le pour la floraison.',
            'يكفي لمرة واحدة؟ احفظه للإزهار.',
            'كافي لمرة وحدة؟ خليه للإزهار.')
        },
        {
          pic: 'dripLine', t: m('Use a drip line or a small furrow', 'Goutte-à-goutte ou petit sillon', 'قطرات أو خط صغير', 'قطرات ولا خط صغير'),
          d: m('Water at the base of the plants, early morning, never at midday.',
            'Arrosez au pied, tôt le matin, jamais à midi.',
            'اسقِ عند الساق، صباحًا باكرًا، لا في الظهيرة.',
            'سقي عند الساق، بالصبح بكري، ماشي فالنص النهار.')
        },
        {
          pic: 'stopWater', t: m('Stop after flowering', 'Arrêtez après la floraison', 'توقف بعد الإزهار', 'وقف من بعد الإزهار'),
          d: m('A second pass is usually wasted water and money.',
            'Un deuxième passage est de l’eau et de l’argent perdus.',
            'المرة الثانية ماء ومال ضائعان عادة.',
            'المرة الثانية ما وفلوس كيضيعو.')
        }
      ]
    },

    windbreak: {
      id: 'windbreak', pic: 'windbreak', when: 'next', conf: 2, rot: 'resilient',
      title: m('Plant a line of trees against heat and wind', 'Plantez une ligne d’arbres contre la chaleur', 'ازرع صف أشجار ضد الحرارة والريح', 'زرع صف ديال الشجر ضد السخانة والريح'),
      why: m('A tree line cuts the wind that dries the soil, and gives shade to the edge of the field.',
        'Une ligne d’arbres coupe le vent qui sèche le sol et donne de l’ombre.',
        'صف الأشجار يقطع الريح التي تجفف التربة ويعطي ظلًا.',
        'صف الشجر كيقطع الريح اللي كتنشف التراب وكيعطي الظل.'),
      ev: m('NASA POWER heat days and wind. Tree lines are a long-term measure: benefits grow for 15 years.',
        'NASA POWER jours chauds et vent. Mesure de long terme : les bénéfices grandissent 15 ans.',
        'NASA POWER أيام الحرارة والريح. إجراء طويل الأمد: الفائدة تنمو 15 سنة.',
        'NASA POWER أيام السخانة والريح. حل طويل الأمد: الفائدة كتنمو 15 عام.'),
      steps: [
        {
          pic: 'windbreak', t: m('Choose the windy side', 'Choisissez le côté venteux', 'اختر الجهة المعرضة للريح', 'ختار الجهة اللي فيها الريح'),
          d: m('Usually the side the dry wind comes from in summer.',
            'En général le côté d’où vient le vent sec en été.',
            'عادة الجهة التي تأتي منها الريح الجافة صيفًا.',
            'عادة الجهة اللي كتجي منها الريح الناشفة فالصيف.')
        },
        {
          pic: 'treeGuard', t: m('Plant every 5–6 m', 'Plantez tous les 5–6 m', 'ازرع كل 5–6 م', 'زرع كل 5–6 م'),
          d: m('Olive or carob, planted at the start of the rainy season.',
            'Olivier ou caroubier, au début de la saison des pluies.',
            'زيتون أو خروب، في بداية موسم الأمطار.',
            'زيتون ولا خروب، فبداية موسم الشتا.')
        },
        {
          pic: 'treeGuard', t: m('Protect the young trees', 'Protégez les jeunes arbres', 'احمِ الأشجار الصغيرة', 'حمي الشجر الصغار'),
          d: m('A small stone ring keeps the water and stops the animals.',
            'Un petit cercle de pierres garde l’eau et écarte les animaux.',
            'حلقة حجرية صغيرة تحفظ الماء وتمنع الحيوانات.',
            'حلقة ديال الحجر كتمسك الما وكتمنع الحيوانات.')
        }
      ]
    },

    checkTech: {
      id: 'checkTech', pic: 'photoLeaves', when: 'now', conf: 1, rot: null,
      title: m('Show the leaves to your technician', 'Montrez les feuilles à votre technicien', 'أرِ الأوراق لتقنيك', 'وري الوراق للتقني ديالك'),
      why: m('Small, thin plants with yellow leaves can be disease, insects or roots. No satellite can see that.',
        'Des plantes petites et jaunes peuvent être maladie, insectes ou racines. Aucun satellite ne le voit.',
        'النباتات الصغيرة الصفراء قد تكون مرضًا أو حشرات أو جذورًا. لا ساتل يرى ذلك.',
        'النباتات الصغار والصفرين يقدرو يكونو مرض ولا حشرات ولا مشكل فالجذور. ما كاين ساتل كيشوف هادشي.'),
      ev: m('This is a farmer observation, not a satellite fact. It is labelled that way in your report.',
        'C’est une observation d’agriculteur, pas un fait satellite. C’est indiqué dans votre rapport.',
        'هذه ملاحظة فلاح، ليست حقيقة ساتل. مذكورة كذلك في تقريرك.',
        'هادي ملاحظة ديال فلاح، ماشي حقيقة ديال الساتل. مكتوبة هكاك فالتقرير ديالك.'),
      steps: [
        {
          pic: 'photoLeaves', t: m('Take three photos', 'Prenez trois photos', 'التقط ثلاث صور', 'صور 3 تصاور'),
          d: m('One of the whole field, one of a yellow plant, one of the underside of a leaf.',
            'Le champ entier, une plante jaune, le dessous d’une feuille.',
            'الحقل كله، نبات أصفر، وأسفل ورقة.',
            'الأرض كاملة، نبتة صفراء، وتحت الورقة.')
        },
        {
          pic: 'voiceNote', t: m('Record a short voice note', 'Enregistrez un message vocal', 'سجّل رسالة صوتية قصيرة', 'سجل رسالة صوتية قصيرة'),
          d: m('Say when it started and if it is spreading. No typing needed.',
            'Dites quand ça a commencé et si ça s’étend. Pas de saisie.',
            'قل متى بدأ وهل ينتشر. بدون كتابة.',
            'قول إمتى بدا وواش كينتاشر. بلا كتابة.')
        },
        {
          pic: 'sendReport', t: m('Send it from the app', 'Envoyez depuis l’app', 'أرسلها من التطبيق', 'صيفطها من التطبيق'),
          d: m('Your technician answers with a voice note or a validation.',
            'Votre technicien répond par vocal ou validation.',
            'يجيبك تقنيك برسالة صوتية أو تحقق.',
            'التقني كيجاوبك برسالة صوتية ولا تحقق.')
        }
      ]
    }

  });

  /* graceful aliases for illustrations */
  if (!window.picNames || window.picNames.indexOf('spreadCompost') < 0) { /* noop */ }
})();
