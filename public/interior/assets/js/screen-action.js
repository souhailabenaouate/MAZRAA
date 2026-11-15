/* ============================================================
   Mazra'a — report a problem, field walk
   ============================================================ */
(function () {
  var S = window.S;
  var Screens = window.Screens = window.Screens || {};

  function backBtn(route, label) {
    return '<button class="btn ghost tinybtn" data-go="' + route + '">' + icon('arrowL') + esc(label || t('back')) + '</button>';
  }

  /* ---------------- report a problem ---------------- */
  var CATS = [
    { id: 'plants', label: 'catPlants', pic: 'yellowAll' },
    { id: 'soil', label: 'catSoil', pic: 'soilPale' },
    { id: 'water', label: 'catWater', pic: 'waterRain' },
    { id: 'other', label: 'catOther', pic: 'satelliteView' }
  ];

  Screens.problem = function () {
    if (!S.problemDraft) S.problemDraft = { cat: null, photo: false, voice: false, sent: false, offline: false };
    var d = S.problemDraft;
    var cats = CATS.map(function (c) {
      return '<button class="choice ' + (d.cat === c.id ? 'sel' : '') + '" data-act="probCat" data-arg="' + c.id + '">' +
        '<span class="c-art" style="width:52px;height:52px;border-radius:14px;overflow:hidden">' + pic(c.pic) + '</span>' +
        '<span class="c-name">' + esc(t(c.label)) + '</span></button>';
    }).join('');

    var queue = S.queue.filter(function (q) { return q.status !== 'sent'; });
    var queueList = queue.length ? '<section class="card"><div class="h3">' + esc(t('queue')) + ' · ' + queue.length + '</div>' +
      '<div class="stack-sm mt14">' + queue.map(function (q) {
        return '<div class="row-between" style="font-size:12.5px"><span>' + esc(q.kind === 'problem' ? t('reportProblem') : t('walk')) + ' · ' + esc(q.date) + '</span>' +
          '<span class="tag warn">' + esc(t('waiting')) + '</span></div>';
      }).join('') + '</div>' +
      '<button class="btn secondary tinybtn mt14" data-act="sync">' + icon('share') + esc(t('sent')) + '</button></section>' : '';

    var result = '';
    if (d.sent) {
      result = '<div class="result-banner ' + (d.offline ? 'warn' : '') + '"><span class="ic">' + icon(d.offline ? 'alert' : 'check') + '</span>' +
        '<div style="flex:1"><div class="h3">' + esc(d.offline ? t('queue') : t('sentTech')) + '</div>' +
        '<div class="small">' + esc(d.offline ? t('queued') : t('matchSat')) + '</div></div>' + audioBtn(t('sentTech')) + '</div>' +
        '<div class="card sage"><div class="row" style="gap:10px">' + icon(d.offline ? 'alert' : 'check') + '<div style="flex:1">' +
        '<div class="h3">' + esc(d.offline ? t('diffSat') : t('matchSat')) + '</div>' +
        '<p class="small mt8">' + esc(tx(m('Satellite for this point, 13 Nov: NDVI 0.38 (below the commune mean), 3 weeks without rain, slope 18 %.',
          'Satellite pour ce point, 13 nov. : NDVI 0,38 (sous la moyenne), 3 semaines sans pluie, pente 18 %.',
          'الساتل لهذه النقطة، 13 نونبر: NDVI 0.38 (أقل من المتوسط)، 3 أسابيع بلا مطر، ميل 18%.',
          'الساتل لهاد النقطة، 13 نونبر: NDVI 0.38 (أقل من المتوسط)، 3 سيمانات بلا شتا، ميل 18%.'))) + '</p></div></div></div>';
    }

    return '<main class="screen stack">' +
      '<div class="row-between">' + backBtn('home', t('home')) + audioBtn(t('problemCat') + '. ' + t('problemHelp')) + '</div>' +
      '<div><h2 class="h1">' + esc(t('reportProblem')) + '</h2><p class="lead">' + esc(t('problemHelp')) + '</p></div>' +
      result +
      '<div class="pic-grid" style="grid-template-columns:1fr 1fr">' +
      '<button class="pic-btn ' + (d.photo ? 'sel' : '') + '" data-act="takePhoto"><span class="pic-art">' + pic('photoLeaves') + '</span>' +
      '<span class="pic-label"><span class="pic-txt">' + esc(t('problemPhoto')) + '</span><span class="check">' + icon('check') + '</span></span></button>' +
      '<button class="pic-btn ' + (d.voice ? 'sel' : '') + '" data-act="recordVoice"><span class="pic-art">' + pic('voiceNote') + '</span>' +
      '<span class="pic-label"><span class="pic-txt">' + esc(t('problemVoice')) + '</span><span class="check">' + icon('check') + '</span></span></button>' +
      '</div>' +
      '<section class="card"><div class="row-between"><div class="h3">' + esc(t('problemCat')) + '</div>' + audioBtn(t('problemCat')) + '</div>' +
      '<div class="choice-grid mt14" style="grid-template-columns:repeat(4,1fr);gap:8px">' + cats + '</div></section>' +
      '<section class="card"><div class="row" style="gap:10px">' + icon('soil') +
      '<div style="flex:1"><div class="h3">' + esc(tx(m('Farm position', 'Position de la ferme', 'موقع المزرعة', 'موقع الضيعة'))) + '</div>' +
      '<div class="tiny">35.1689° N, 5.2697° W · ' + esc(tx(D.farm.commune)) + ' · ' + esc(tx(m('taken with one tap', 'prise en un geste', 'بلمسة واحدة', 'بضغطة وحدة'))) + '</div></div>' +
      '<span class="tag sage">GPS</span></div></section>' +
      '<button class="btn lg block" data-act="sendProblem" ' + (d.cat ? '' : 'disabled') + '>' + icon('share') + esc(t('sentTech')) + '</button>' +
      (d.cat ? '' : '<p class="tiny" style="text-align:center">' + esc(t('problemCat')) + '</p>') +
      queueList +
      '<div class="limits"><b>' + esc(t('limits')) + ':</b> ' + esc(tx(m('Your report is a farmer observation, not a satellite fact. It is stored in your farm journal and compared with the satellite for the same place and date.',
        'Votre signalement est une observation d’agriculteur, pas un fait satellite. Il est comparé au satellite au même endroit.',
        'تبليغك ملاحظة فلاح، ليس حقيقة ساتل. يُقارن بالساتل لنفس المكان والتاريخ.',
        'التبليغ ديالك ملاحظة ديال فلاح، ماشي حقيقة ديال الساتل. كيتقارن بالساتل لنفس المكان والتاريخ.'))) + '</div>' +
      '</main>';
  };

  /* ---------------- field walk ---------------- */
  var WALK = [
    { q: m('Go to the top of your field. Is the soil dry?', 'Allez en haut du champ. Le sol est-il sec ?', 'اذهب إلى أعلى الحقل. هل التربة جافة؟', 'سير لفوق الأرض. التراب ناشف؟'), pic: 'soilDry' },
    { q: m('Go to the bottom. Is there water pooling?', 'Allez en bas. L’eau stagne-t-elle ?', 'اذهب إلى الأسفل. هل يتجمع الماء؟', 'سير لتحت. الما كيتجمع؟'), pic: 'waterRain' },
    { q: m('Look at the slope. Do you see small gullies?', 'Regardez la pente. Voyez-vous des ravins ?', 'انظر إلى الميل. هل ترى قنوات صغيرة؟', 'شوف الميل. كتشوف قنوات صغار؟'), pic: 'gullyYes' },
    { q: m('Look at the plants. Are the leaves yellow?', 'Regardez les plantes. Les feuilles sont-elles jaunes ?', 'انظر إلى النباتات. هل الأوراق صفراء؟', 'شوف النباتات. الوراق صفرين؟'), pic: 'yellowAll', idk: true },
    { q: m('Is the soil cracked or crusty?', 'Le sol est-il fissuré ou croûté ?', 'هل التربة متشققة أو متقشرة؟', 'التراب مشقق ولا قاشر؟'), pic: 'soilPale' }
  ];

  Screens.walk = function () {
    if (!S.walk) S.walk = { i: 0, ans: {}, done: false };
    var w = S.walk;
    if (w.done) {
      var yes = Object.keys(w.ans).filter(function (k) { return w.ans[k] === 'yes'; }).length;
      return '<main class="screen stack">' +
        '<div class="row-between">' + backBtn('status', t('myFarm')) + audioBtn(t('walkSaved')) + '</div>' +
        '<div class="result-banner"><span class="ic">' + icon('check') + '</span><div style="flex:1">' +
        '<div class="h3">' + esc(t('walkSaved')) + '</div>' +
        '<div class="small">' + esc(tx(m('Five answers, saved with date and position in your farm journal.', 'Cinq réponses, enregistrées avec date et position.', 'خمسة أجوبة، حُفظت بالتاريخ والموقع.', 'خمسة أجوبة، تحفظو بالتاريخ والموقع.'))) + '</div></div></div>' +
        '<section class="card"><div class="h3">' + esc(tx(m('Your walk matches the satellite', 'Votre parcours correspond au satellite', 'جولتك تطابق الساتل', 'جولتك كتوافق الساتل'))) + '</div>' +
        '<p class="small mt8">' + esc(tx(m('Dry soil at the top, gullies on the slope and yellow leaves agree with SMAP moisture, SRTM slope and NDVI for 12 November.',
          'Sol sec en haut, ravins et feuilles jaunes concordent avec SMAP, SRTM et NDVI du 12 novembre.',
          'تربة جافة في الأعلى وقنوات وأوراق صفراء تتفق مع SMAP وSRTM وNDVI ليوم 12 نونبر.',
          'تراب ناشف لفوق وقنوات ووراق صفرين كيوافقو SMAP وSRTM وNDVI ديال 12 نونبر.'))) + '</p>' +
        '<p class="tiny mt8">' + esc(tx(m('Your walk is a farmer observation. It fills the gap satellites cannot see.', 'Votre parcours est une observation d’agriculteur. Il comble ce que le satellite ne voit pas.', 'جولتك ملاحظة فلاح. تملأ ما لا تراه السواتل.', 'جولتك ملاحظة ديال فلاح. كتعمر اللي ما كيشوفوهش الساتلات.'))) + '</p></section>' +
        '<div class="card cream"><div class="tiny">' + yes + ' / 5 → ' + esc(tx(m('reported to your technician and shown on the dashboard map.', 'transmis au technicien et affiché sur la carte.', 'أُرسل إلى تقنيك ويظهر على الخريطة.', 'تصيفط للتقني وكيبان فالخريطة.'))) + '</div></div>' +
        '<div class="btn-row"><button class="btn" data-go="status">' + esc(t('myFarm')) + '</button>' +
        '<button class="btn secondary" data-go="rotations">' + esc(t('rotations')) + '</button></div></main>';
    }
    var step = WALK[w.i];
    var pct = Math.round((w.i) / WALK.length * 100);
    function opt(v, label) {
      return '<button class="btn ' + (v === 'yes' ? '' : 'secondary') + ' block" data-act="walkAns" data-arg="' + v + '">' + esc(label) + '</button>';
    }
    return '<main class="screen stack">' +
      '<div class="row-between">' + backBtn('status', t('myFarm')) + audioBtn(tx(step.q)) + '</div>' +
      '<div><span class="eyebrow">' + esc(t('walkStep', { n: w.i + 1, m: WALK.length })) + '</span>' +
      '<div class="progress mt8"><i class="done" style="flex:' + (w.i) + '"></i><i class="now" style="flex:' + (WALK.length - w.i) + '"></i></div></div>' +
      '<section class="q-card"><div class="q-text">' + esc(tx(step.q)) + '</div>' +
      '<div class="pic-grid" style="grid-template-columns:1fr"><div class="pic-btn" style="border:0">' +
      '<span class="pic-art">' + pic(step.pic) + '</span></div></div>' +
      '<div class="stack-sm mt18">' + opt('yes', tx(m('Yes', 'Oui', 'نعم', 'إيه'))) +
      opt('no', tx(m('No', 'Non', 'لا', 'لا'))) +
      (step.idk ? opt('idk', t('idk')) : '') + '</div></section>' +
      '<div class="btn-row"><button class="btn ghost" data-act="walkPhoto">' + icon('camera') + esc(t('problemPhoto')) + '</button>' +
      '<button class="btn ghost" data-act="walkSkip">' + esc(t('skip')) + '</button></div>' +
      '<p class="tiny" style="text-align:center">' + esc(tx(m('Works offline. Your answers are saved in your farm journal.', 'Fonctionne hors ligne. Vos réponses sont enregistrées.', 'يعمل دون اتصال. أجوبتك محفوظة.', 'كيخدم بلا شبكة. الأجوبة ديالك محفوظة.'))) + '</p>' +
      '</main>';
  };

  var prevAct = Screens.act;
  Screens.act = function (a, arg, el) {
    if (prevAct) prevAct(a, arg, el);
    if (a === 'probCat') { S.problemDraft.cat = arg; App.render(); }
    if (a === 'takePhoto') {
      S.problemDraft.photo = true; App.render();
      toast(t('problemPhoto') + ' ✓');
    }
    if (a === 'recordVoice') {
      S.problemDraft.voice = true; App.render();
      speakText(tx(m('Voice note recorded. It will be sent with your report.', 'Message vocal enregistré. Il sera envoyé avec le signalement.', 'سُجلت الرسالة الصوتية. ستُرسل مع تبليغك.', 'تسجلت الرسالة الصوتية. غادي تتصيفط مع التبليغ.')));
    }
    if (a === 'sendProblem') {
      var d = S.problemDraft;
      d.sent = true;
      d.offline = !S.online;
      if (d.offline) { S.queue.push({ kind: 'problem', date: '13 Nov', status: 'waiting' }); }
      D.save(); App.render();
      toast(d.offline ? t('queued') : t('sentTech'));
    }
    if (a === 'walkAns') {
      S.walk.ans[S.walk.i] = arg;
      advanceWalk();
    }
    if (a === 'walkSkip') advanceWalk();
    if (a === 'walkPhoto') { toast(t('problemPhoto') + ' ✓'); }

    function advanceWalk() {
      S.walk.i++;
      if (S.walk.i >= WALK.length) {
        S.walk.done = true;
        S.queue.push({ kind: 'walk', date: '13 Nov', status: S.online ? 'sent' : 'waiting' });
        D.save();
        App.render();
        speakText(t('walkSaved'));
        return;
      }
      App.render();
    }
  };
})();
