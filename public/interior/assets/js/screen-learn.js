/* ============================================================
   Mazra'a — calendar, learn cards, sources & limits
   ============================================================ */
(function () {
  var S = window.S;
  var Screens = window.Screens = window.Screens || {};

  function backBtn(route, label) {
    return '<button class="btn ghost tinybtn" data-go="' + route + '">' + icon('arrowL') + esc(label || t('back')) + '</button>';
  }

  /* ---------------- bare soil & stress calendar ---------------- */
  Screens.calendar = function () {
    var bars = D.calendarStatus.map(function (st, i) {
      return '<div class="m"><div class="bar ' + (st === 'bare' ? 'bare' : st === 'vuln' ? 'vuln' : 'grow') + '"></div>' +
        '<span class="lab">' + esc(tx(D.months[i])) + '</span></div>';
    }).join('');
    var bare = D.calendarStatus.filter(function (s) { return s === 'bare'; }).length;
    var vuln = D.calendarStatus.filter(function (s) { return s === 'vuln'; }).length;
    var say = tx(m('Your fields are usually bare for four months, and the crop is most fragile in April to June and at sowing in November.',
      'Vos champs sont nus quatre mois, et la culture est fragile d’avril à juin et au semis en novembre.',
      'حقولك عادة عارية أربعة أشهر، والمحصول أكثر هشاشة من أبريل إلى يونيو وعند البذر في نونبر.',
      'الأرض ديالك عادة عارية 4 شهور، والمحصول هشاش من أبريل حتى يونيو وفوقت الزريعة فـنونبر.'));
    return '<main class="screen stack">' +
      '<div class="row-between">' + backBtn('status', t('myFarm')) + audioBtn(t('calTitle') + '. ' + t('calSub') + '. ' + say) + '</div>' +
      '<div><h2 class="h1">' + esc(t('calTitle')) + '</h2><p class="lead">' + esc(t('calSub')) + '</p></div>' +
      '<section class="card"><div class="cal">' + bars + '</div>' +
      '<div class="cal-legend">' +
      '<span><i style="background:var(--sage)"></i>' + esc(t('calGrow')) + '</span>' +
      '<span><i style="background:#C9A882"></i>' + esc(t('calBare')) + ' · ' + bare + ' ' + esc(tx(m('months', 'mois', 'أشهر', 'شهور'))) + '</span>' +
      '<span><i style="background:var(--warn)"></i>' + esc(t('calVuln')) + ' · ' + vuln + ' ' + esc(tx(m('months', 'mois', 'أشهر', 'شهور'))) + '</span>' +
      '</div>' +
      '<p class="small mt14">' + esc(say) + '</p>' +
      '<p class="tiny mt8">' + esc(tx(D.evidenceBase.ndvi)) + ' · ' + esc(tx(D.evidenceBase.power)) + ' · ' + esc(t('trendLabel')) + '</p>' +
      '</section>' +
      '<section class="card sage"><div class="row" style="gap:10px">' + icon('leaf') + '<div class="h3" style="flex:1">' + esc(t('calHint')) + '</div></div>' +
      '<button class="btn secondary tinybtn mt14" data-go="learn">' + esc(t('learn')) + icon('arrow') + '</button></section>' +
      '<section class="card"><div class="h3">' + esc(tx(m('This is a usual year', 'C’est une année habituelle', 'هذه سنة معتادة', 'هاد سنة عادية'))) + '</div>' +
      '<p class="small mt8">' + esc(tx(m('It comes from 20 years of satellite observations for your zone, not from this year’s weather. It says “usually”, never “will happen”.',
        'Elle vient de 20 ans d’observations pour votre zone, pas de la météo de cette année. On dit « habituellement », jamais « arrivera ».',
        'تأتي من 20 سنة من أرصاد السواتل لمنطقتك، لا من طقس هذه السنة. نقول «عادة» ولا نقول «سيحدث».',
        'كتجي من 20 سنة ديال أرصاد الساتلات للمنطقة ديالك، ماشي من طقس هاد العام. كنقولو «عادة»، ماشي «غادي يوقع».'))) + '</p></section>' +
      '</main>';
  };

  /* ---------------- learn cards ---------------- */
  Screens.learn = function () {
    var cards = D.learn.map(function (c, i) {
      var open = S.openLearn === c.id;
      return '<article class="learn-card" style="flex-direction:column;align-items:stretch">' +
        '<button class="learn-card" style="border:0;box-shadow:none;padding:0;background:none" data-act="openLearn" data-arg="' + c.id + '">' +
        '<span class="lc-art">' + pic(c.pic) + '</span>' +
        '<span style="flex:1;text-align:start"><span class="lc-t">' + esc(tx(c.title)) + '</span>' +
        '<span class="lc-d">' + esc(tx(c.text).slice(0, 84)) + '…</span>' +
        '<span class="lc-crops">' + esc(tx(c.crops)) + '</span></span>' +
        audioBtn(tx(c.title) + '. ' + tx(c.text), 'small') + '</button>' +
        (open ? '<p class="small mt14">' + esc(tx(c.text)) + '</p>' : '') +
        '</article>';
    }).join('');
    var open = S.openLearn && D.learn.filter(function (c) { return c.id === S.openLearn; })[0];
    return '<main class="screen stack">' +
      '<div class="row-between">' + backBtn('rotations', t('rotations')) + audioBtn(t('learnTitle') + '. ' + t('learnSub')) + '</div>' +
      '<div><h2 class="h1">' + esc(t('learnTitle')) + '</h2><p class="lead">' + esc(t('learnSub')) + '</p></div>' +
      '<div class="learn">' + cards + '</div>' +
      (open ? '<button class="btn block" data-act="askLearn" data-arg="' + open.id + '">' + icon('mic') + esc(t('askGharss')) + '</button>' : '') +
      '<p class="tiny" style="text-align:center">' + esc(tx(m('Content written from INRA Morocco, FAO and ORMVA crop sheets. Works offline.', 'Contenu tiré des fiches INRA Maroc, FAO et ORMVA. Fonctionne hors ligne.', 'محتوى من بطاقات INRA المغرب وFAO وORMVA. يعمل دون اتصال.', 'المحتوى من بطاقات INRA المغرب وFAO وORMVA. كيخدم بلا شبكة.'))) + '</p>' +
      '<div class="limits"><b>' + esc(t('limits')) + ':</b> ' + esc(t('limitsBox')) + '</div>' +
      '</main>';
  };

  /* ---------------- sources & limits ---------------- */
  Screens.sources = function () {
    var v = function (x) { return typeof x === 'string' ? x : tx(x); };
    var rows = D.sources.map(function (s) {
      return '<section class="card">' +
        '<div class="row-between"><div class="h3">' + esc(typeof s.name === 'string' ? s.name : tx(s.name)) + '</div>' + audioBtn((typeof s.name === 'string' ? s.name : tx(s.name)) + '. ' + tx(s.use)) + '</div>' +
        '<p class="small mt8">' + esc(tx(s.use)) + '</p>' +
        '<div class="kv mt8"><span>' + esc(t('resolution')) + '</span><span>' + esc(v(s.res)) + '</span></div>' +
        '<div class="kv"><span>' + esc(t('period')) + '</span><span>' + esc(v(s.period)) + '</span></div>' +
        '<div class="kv" style="border:0"><span>' + esc(t('cannotSee')) + '</span><span style="text-align:end;max-width:62%">' + esc(tx(s.cant)) + '</span></div>' +
        '</section>';
    }).join('');
    return '<main class="screen stack">' +
      '<div class="row-between">' + backBtn('home', t('home')) + audioBtn(t('sourcesLimits') + '. ' + t('limitsBox')) + '</div>' +
      '<div><h2 class="h1">' + esc(t('sourcesLimits')) + '</h2><p class="lead">' + esc(tx(m('Every number in Mazra’a comes from one of these datasets, with its date.', 'Chaque chiffre vient de ces jeux de données, avec sa date.', 'كل رقم في مزرعة يأتي من هذه المجموعات، مع تاريخه.', 'كل رقم فمزرعة كيجي من هاد المجموعات، مع التاريخ ديالو.'))) + '</p></div>' +
      rows +
      '<section class="card audio-test"><div style="flex:1;min-width:180px"><div class="h3">' + esc(tx(m('Audio', 'Audio', 'الصوت', 'الصوت'))) + '</div>' +
      '<p class="tiny mt8">' + esc(tx(D.weather.line)) + '</p></div>' +
      '<button class="btn secondary" data-act="audioTest">' + icon('speaker', 'ic') + esc(tx(m('Test the sound', 'Tester le son', 'اختبر الصوت', 'اختبر الصوت'))) + '</button></section>' +
      '<section class="card dark"><div class="h3">' + esc(t('limits')) + '</div>' +
      '<p class="small mt8">' + esc(t('limitsBox')) + '</p>' +
      '<p class="small mt8">' + esc(tx(m('Datasets that cover only the United States (Web Soil Survey, SSURGO, CDL, PRISM) are not used for Morocco. They show the pipeline could be reused for US farms.',
        'Les jeux de données américains (Web Soil Survey, SSURGO, CDL, PRISM) ne servent pas au Maroc. Ils montrent que le pipeline est réutilisable.',
        'مجموعات البيانات الأمريكية (Web Soil Survey وSSURGO وCDL وPRISM) لا تُستعمل للمغرب. تُظهر أن السلسلة قابلة لإعادة الاستخدام.',
        'مجموعات الداتا الأمريكية (Web Soil Survey وSSURGO وCDL وPRISM) ما كتستعملش للمغرب. كتوري أن السلسلة قابلة لإعادة الاستخدام.'))) + '</p></section>' +
      '<section class="card cream"><div class="h3">' + esc(tx(m('How the numbers are made', 'Comment les chiffres sont calculés', 'كيف تُحسب الأرقام', 'كيفاش كتتحسب الأرقام'))) + '</div>' +
      '<p class="small mt8">' + esc(tx(m('All datasets are brought to one grid (per commune or cell) and one time step before indicators are computed. Each indicator carries a confidence level, and the “how sure are we?” panel explains it in plain words.',
        'Tous les jeux sont ramenés à une même grille et à un même pas de temps. Chaque indicateur a un niveau de confiance expliqué simplement.',
        'تُجمع كل المجموعات على شبكة واحدة وخطوة زمنية واحدة. لكل مؤشر مستوى ثقة يُشرح ببساطة.',
        'كل المجموعات كتتجمع على شبكة وحدة وخطوة زمنية وحدة. كل مؤشر عندو مستوى ثقة كيتشرح بسهولة.'))) + '</p></section>' +
      '</main>';
  };

  var prevAct = Screens.act;
  Screens.act = function (a, arg, el) {
    if (prevAct) prevAct(a, arg, el);
    if (a === 'audioTest') {
      AUDIO.test();
    }
    if (a === 'openLearn') {
      S.openLearn = S.openLearn === arg ? null : arg;
      App.render();
    }
    if (a === 'askLearn') {
      var c = D.learn.filter(function (x) { return x.id === arg; })[0];
      openChat();
      setTimeout(function () { askGharss(tx(c.title) + ' — ' + tx(c.text)); }, 320);
    }
  };
})();
