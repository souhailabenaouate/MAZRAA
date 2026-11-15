/* ============================================================
   Mazra'a — app shell: routing, home, menu, Gharss, audio, offline
   ============================================================ */
(function () {
  var S = window.S = {
    route: 'home', goals: [], cons: { water: 'rain', equip: 'hand', market: 'local' },
    scen: { hot: 0, dry: 0 }, chosen: null, saved: [], diag: null,
    queue: [], online: navigator.onLine !== false, lastSync: '12 Nov', alertFilter: 'all',
    farm: 'F-0142'
  };
  try {
    var raw = localStorage.getItem('maz.state');
    if (raw) Object.assign(S, JSON.parse(raw));
  } catch (e) {}
  S.diag = S.diag || null;
  S.saved = S.saved || [];
  S.queue = S.queue || [];

  D.save = function () {
    try { localStorage.setItem('maz.state', JSON.stringify({ goals: S.goals, cons: S.cons, chosen: S.chosen, saved: S.saved, queue: S.queue, diag: S.diag, scen: S.scen })); } catch (e) {}
  };

  /* ---------- helpers ---------- */
  window.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var ICONS = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    home: '<path d="M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-4v-6H10v6H6a2 2 0 0 1-2-2z"/>',
    mic: '<path d="M12 4a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3z"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 3H4z"/><path d="M10 21h4"/>',
    speaker: '<path d="M4 10v4h3l4 4V6L7 10H4z"/><path d="M15 9a4 4 0 0 1 0 6M18 7a7 7 0 0 1 0 10"/>',
    arrow: '<path d="M5 12h13M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H6M11 6l-6 6 6 6"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    camera: '<path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="4"/>',
    download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
    share: '<path d="M8 12l8-5M8 12l8 5"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="6" r="2.6"/><circle cx="18" cy="18" r="2.6"/>',
    print: '<path d="M7 8V4h10v4M7 16H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 12h10v8H7z"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v5M12 18h.01"/>',
    water: '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
    leaf: '<path d="M5 19c0-8 5-13 15-14 1 10-4 15-12 15H5z"/><path d="M5 19c4-4 8-6 12-7"/>',
    soil: '<path d="M3 10h18M3 15h18M3 20h18"/><path d="M8 10V4M16 10V4"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chart: '<path d="M4 20V9M10 20V5M16 20v-8M22 20H2"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'
  };
  window.icon = function (name, cls) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ic ' + (cls || '') + '" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  };

  /* landing-page logo: transparent mark + MAZRA'A wordmark */
  window.brand = function (size, sub) {
    return '<span class="brand"><img class="brand-mark" src="assets/img/logo-mark.png" alt="" style="height:' + (size || 38) + 'px">' +
      '<span class="brand-txt"><span class="brand-word">MAZRA\'A</span>' + (sub ? '<span class="brand-sub">' + sub + '</span>' : '') + '</span></span>';
  };

  window.toast = function (msg) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove('show'); }, 2600);
  };

  /* audio lives in assets/js/audio.js */

  /* ---------- language ---------- */
  window.applyLang = function () {
    var html = document.documentElement;
    html.lang = D.lang === 'dz' ? 'ar' : D.lang;
    html.dir = (D.lang === 'ar' || D.lang === 'dz') ? 'rtl' : 'ltr';
  };
  window.switchLang = function (id) {
    var wasMenu = !!document.querySelector('.drawer');
    setLang(id); applyLang();
    // the chat restarts in the new language instead of keeping old replies
    if (window.GHARSS) window.GHARSS.history.length = 0;
    App.render();
    if (wasMenu) openMenu();
  };

  /* ---------- routing ---------- */
  var App = window.App = {};
  App.go = function (r) {
    S.route = r;
    if (window.AUDIO) AUDIO.stop();
    closeOverlays();
    location.hash = '#/' + r;
    App.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  App.render = function () {
    applyLang();
    try { if (window.parent !== window) window.parent.history.replaceState(null, '', '/app#/' + S.route); } catch (e) {}
    var app = document.getElementById('app');
    if (S.route === 'dashboard') {
      document.body.classList.add('db-mode');
      app.innerHTML = '';
      if (window.Dash) Dash.render();
      return;
    }
    document.body.classList.remove('db-mode');
    var body = (window.Screens && Screens[S.route]) ? Screens[S.route]() : Screens.home();
    app.innerHTML = topbar() + body + bottombar();
    afterRender();
  };
  window.addEventListener('hashchange', function () {
    var r = (location.hash || '').replace('#/', '') || 'home';
    S.route = r;
    App.render();
  });

  function afterRender() {
    if (window.Screens && Screens.after) Screens.after();
  }

  /* one delegated handler for app, menu, chat, drawer and dashboard */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act],[data-go]');
    if (!el) return;
    if (window.Account && Account.handle(el.dataset.act, el)) return;
    if (el.dataset.go) { App.go(el.dataset.go); return; }
    var inDb = el.closest('.db') || el.closest('.drawer-db');
    if (inDb && window.Dash && Dash.act) { Dash.act(el.dataset.act, el.dataset.arg, el); return; }
    act(el.dataset.act, el.dataset.arg, el);
  });
  App.after = afterRender;

  function act(a, arg, el) {
    if (a === 'wxRefresh') { if (window.WEATHER) WEATHER.load(true); App.render(); }
    else if (a === 'menu') openMenu();
    else if (a === 'chat') openChat();
    else if (a === 'close') closeOverlays();
    else if (a === 'lang') switchLang(arg);
    else if (a === 'print') window.print();
    else if (a === 'wa') shareWhatsApp();
    else if (a === 'toast') toast(arg || '');
    else if (a === 'saveQueue') {
      S.queue.push({ kind: arg || 'report', date: '13 Nov', status: 'waiting' }); D.save(); App.render();
      toast(t('queued'));
    } else if (a === 'sync') {
      if (!S.queue.length) { toast(t('sent')); return; }
      S.queue.forEach(function (q) { q.status = 'sent'; });
      S.online = true; toast(t('sent')); App.render();
    } else if (a === 'online') {
      S.online = !S.online; App.render();
      toast(S.online ? t('online') : t('offline'));
    } else if (window.Screens && Screens.act) {
      Screens.act(a, arg, el);
    }
  }
  window.act = act;

  function topbar() {
    return '<header class="topbar">' +
      '<button class="icon-btn" data-act="menu" aria-label="' + esc(t('menu')) + '">' + icon('menu') + '</button>' +
      '<div class="brandline">' + brand(40) + '</div>' +
      '<button class="status ' + (S.online ? '' : 'off') + '" data-act="online" title="' + esc(t('online')) + '"><i class="dot"></i><span class="status-txt">' + esc(S.online ? t('online') : t('offline')) + '</span></button>' +
      (window.Account ? Account.button() : '') +
      '</header>';
  }

  function bottombar() {
    var on = S.route;
    return '<nav class="bottom" aria-label="' + esc(t('home')) + '"><div class="bottom-inner">' +
      '<button class="bbtn ' + (on === 'home' ? 'active' : '') + '" data-go="home">' + icon('home') + '<span>' + esc(t('home')) + '</span></button>' +
      '<button class="bbtn gharss" data-act="chat" aria-label="' + esc(t('gharss')) + '"><img src="assets/img/gharss.svg" alt="" width="58" height="58"></button>' +
      '<button class="bbtn ' + (on === 'alerts' ? 'active' : '') + '" data-go="alerts">' + icon('bell') + '<span>' + esc(t('alerts')) + '</span></button>' +
      '</div></nav>';
  }

  /* ---------- overlays ---------- */
  window.closeOverlays = function () {
    var r = document.getElementById('overlay-root');
    r.innerHTML = '';
    document.body.style.overflow = '';
  };

  function menuItem(n, go, label, desc) {
    return '<button class="menu-item ' + (S.route === go ? 'active' : '') + '" data-go="' + go + '">' +
      '<span class="menu-num">' + n + '</span><span class="menu-txt"><span class="menu-title">' + esc(label) + '</span>' +
      '<span class="menu-desc">' + esc(desc) + '</span></span></button>';
  }

  window.openMenu = function () {
    var r = document.getElementById('overlay-root');
    var langBtns = D.langs.map(function (l) {
      return '<button data-act="lang" data-arg="' + l.id + '" class="' + (D.lang === l.id ? 'on' : '') + '" lang="' + l.id + '">' + l.label + '</button>';
    }).join('');
    r.innerHTML = '<div class="scrim" data-act="close"></div>' +
      '<aside class="drawer" role="dialog" aria-modal="true" aria-label="' + esc(t('menu')) + '">' +
      '<div class="drawer-head"><div>' + brand(44) + '<div class="tiny">' + esc(tx(D.farm.commune)) + ' · ' + esc(t('farmerApp')) + '</div></div>' +
      '<button class="icon-btn bare" data-act="close" style="margin-inline-start:auto" aria-label="' + esc(t('close')) + '">' + icon('close') + '</button></div>' +
      '<div class="drawer-body">' +
      menuItem(1, 'diagnose', t('diagnose'), t('problemQ')) +
      menuItem(2, 'status', t('myFarm'), t('lightsSub')) +
      menuItem(3, 'rotations', t('rotations'), t('rotSub')) +
      menuItem(4, 'report', t('report'), t('reportSub')) +
      menuItem(5, 'alerts', t('alerts'), t('alertTrend')) +
      menuItem(6, 'problem', t('reportProblem'), t('problemHelp')) +
      menuItem(7, 'dashboard', t('dashboard'), t('signedIn')) +
      '<div class="divider"></div>' +
      '<div class="eyebrow" style="padding:0 10px 6px">' + esc(t('seeAll')) + '</div>' +
      menuItem(8, 'priorities', t('priorities'), t('prioritiesQ')) +
      menuItem(9, 'calendar', t('calendar'), t('calSub')) +
      menuItem(10, 'learn', t('learn'), t('learnSub')) +
      '</div>' +
      '<div class="drawer-foot"><div class="lang-switch" role="group" aria-label="' + esc(t('language')) + '">' + langBtns + '</div>' +
      '<button class="btn block mt14" data-act="chat" style="min-height:52px">' + icon('mic', 'ic') + esc(t('askGharss')) + '…</button></div>' +
      '</aside>';
    document.body.style.overflow = 'hidden';
  };

  /* ---------- Gharss chat ---------- */
  var CHAT = [];
  window.GHARSS = { history: CHAT };

  function chatIntro() {
    return tx(m(
      "Salam. I am the Mazra'a assistant. I only use the data already in this app.",
      "Salam. Je suis l’assistante de Mazra'a. Je n’utilise que les données de l’application.",
      'سلام. أنا مساعد مزرعة الذكي. أستعمل فقط بيانات هذا التطبيق.',
      'سلام. أنا المساعد ديال مزرعة. كنخدم غير بالداتا اللي فهاد التطبيق.'
    ));
  }

  var QUICK = [
    { id: 'sow', label: m('When to sow?', 'Quand semer ?', 'متى أبذر؟', 'إمتى نزرع؟') },
    { id: 'crop', label: m('Why this crop?', 'Pourquoi cette culture ?', 'لماذا هذا المحصول؟', 'علاش هاد المحصول؟') },
    { id: 'light', label: m('What is this light?', 'Que veut dire ce feu ?', 'ماذا يعني هذا الضوء؟', 'شنو كيعني هاد الضو؟') },
    { id: 'sure', label: m('How sure are we?', 'Quelle confiance ?', 'ما مدى الثقة؟', 'شحال الثقة؟') },
    { id: 'ndvi', label: 'NDVI?', },
    { id: 'tech', label: m('Ask my technician', 'Demander au technicien', 'اسأل تقنيي', 'سول التقني') }
  ];

  window.openChat = function () {
    if (!CHAT.length) CHAT.push({ who: 'bot', text: chatIntro(), src: tx(D.evidenceBase.power) });
    var r = document.getElementById('overlay-root');
    r.innerHTML = '<div class="scrim" data-act="close"></div>' +
      '<section class="chat-sheet" role="dialog" aria-modal="true" aria-label="' + esc(t('gharss')) + '">' +
      '<div class="chat-head"><img src="assets/img/gharss.svg" alt="" width="48" height="48" style="border-radius:50%;border:2px solid #fff;background:#FBF7F1">' +
      '<div style="flex:1"><div class="h3">' + esc(t('gharss')) + '</div><div class="tiny">' + esc(tx(m('AI assistant', 'Assistante IA', 'مساعد ذكي', 'مساعد ذكي'))) + ' · ' + esc(S.online ? t('online') : t('offline')) + '</div></div>' +
      audioBtn(chatIntro(), 'small') +
      '<button class="icon-btn bare" data-act="close" aria-label="' + esc(t('close')) + '">' + icon('close') + '</button></div>' +
      '<div class="chat-body" id="chat-body"></div>' +
      '<div class="chat-quick" id="chat-quick">' + QUICK.map(function (q) {
        return '<button data-q="' + q.id + '">' + esc(tx(q.label)) + '</button>';
      }).join('') + '</div>' +
      '<div class="chat-input"><button class="mic-round" id="chat-mic" aria-label="' + esc(t('listen')) + '">' + icon('mic') + '</button>' +
      '<input id="chat-in" dir="' + (D.lang === 'ar' ? 'rtl' : 'ltr') + '" lang="' + D.lang + '" placeholder="' + esc(t('askGharss')) + '…" aria-label="' + esc(t('askGharss')) + '">' +
      '<button class="send" id="chat-send" aria-label="' + esc(t('next')) + '">' + icon('arrow') + '</button></div>' +
      '</section>';
    document.body.style.overflow = 'hidden';
    paintChat();
    document.getElementById('chat-send').onclick = function () {
      var v = document.getElementById('chat-in').value.trim();
      if (!v) return;
      document.getElementById('chat-in').value = '';
      askGharss(v);
    };
    document.getElementById('chat-in').addEventListener('keydown', function (e) { if (e.key === 'Enter') document.getElementById('chat-send').click(); });
    document.querySelectorAll('[data-q]').forEach(function (b) {
      b.onclick = function () { askGharss(b.textContent, b.dataset.q); };
    });
    document.getElementById('chat-mic').onclick = voiceInput;
  };

  function paintChat() {
    var body = document.getElementById('chat-body');
    if (!body) return;
    body.innerHTML = CHAT.map(function (m) {
      if (m.who === 'me') return '<div class="msg me">' + esc(m.text) + '</div>';
      return '<div class="msg bot">' + esc(m.text) + (m.src ? '<span class="src">' + esc(m.src) + '</span>' : '') +
        '<div class="msg-audio">' + audioBtn(m.text, 'small') + '<span class="tiny">' + esc(t('listen')) + '</span></div></div>';
    }).join('');
    body.scrollTop = body.scrollHeight;
  }

  function voiceInput() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast(t('idk') + ' · ' + t('askGharss')); return; }
    var rec = new SR();
    rec.lang = (D.langs.filter(function (l) { return l.id === D.lang; })[0] || D.langs[0]).speech;
    rec.interimResults = false;
    rec.onresult = function (e) { askGharss(e.results[0][0].transcript); };
    rec.onerror = function () { toast(t('idk')); };
    rec.start();
    toast('…');
  }

  window.askGharss = function (text, id) {
    CHAT.push({ who: 'me', text: text });
    paintChat();
    setTimeout(function () {
      var answer = botAnswer(id, text);
      CHAT.push(answer);
      paintChat();
      // Gharss reads the reply aloud in the chosen language when a recording exists
      if (window.AUDIO && (AUDIO.fileFor(answer.text) || AUDIO.fileFor(answer.text, 'ar') || AUDIO.fileFor(answer.text, 'en')))
        speakText(answer.text);
    }, 420);
  };

  function botAnswer(id, text) {
    var low = (text || '').toLowerCase();
    // typed questions, Arabic or English, route to the same answers as the picture buttons
    if (!id) {
      var src = text || '';
      if (/[\u0600-\u06FF]/.test(src)) {
        if (/متى|أبذر|ابذر|نزرع|زريعة|زرع/.test(src)) id = 'sow';
        else if (/محصول|دورة|فول|قمح|شعير/.test(src)) id = 'crop';
        else if (/ضو|أضواء/.test(src)) id = 'light';
        else if (/ثقة|متأكد|دقيق/.test(src)) id = 'sure';
        else if (/ndvi|اخضرار|أخضر/i.test(src)) id = 'ndvi';
        else if (/تقني|مهندس|خبير/.test(src)) id = 'tech';
        else if (/ماء|سقي|بئر|مطر|جفاف|عطش/.test(src)) id = 'water';
        else if (/أصفر|اصفر|صفراء|اصفرار/.test(src)) id = 'yellow';
        else if (/سعر|ثمن|أثمنة/.test(src)) id = 'price';
      } else {
        if (/sow|seed|plant|when/.test(low)) id = 'sow';
        else if (/crop|rotation|why/.test(low)) id = 'crop';
        else if (/light|colour|color/.test(low)) id = 'light';
        else if (/sure|confidence|accurate/.test(low)) id = 'sure';
        else if (/ndvi|green/.test(low)) id = 'ndvi';
        else if (/tech|expert|helper/.test(low)) id = 'tech';
        else if (/water|rain|dry/.test(low)) id = 'water';
        else if (/yellow|leaf/.test(low)) id = 'yellow';
        else if (/price|market|sell/.test(low)) id = 'price';
      }
    }
    var rot = D.rotations.filter(function (r) { return r.id === (S.chosen || 'resilient'); })[0];
    var L = tx(D.lights[0].say);
    var ans;
    if (id === 'sow') {
      ans = tx(m('Rain now comes about three weeks later. Wait for 20 mm, check 10 cm down, then sow. The sowing window for ' + tx(D.farm.commune) + ' is open on the app.',
        'La pluie arrive trois semaines plus tard. Attendez 20 mm, vérifiez à 10 cm, puis semez. La fenêtre est dans l’app.',
        'المطر يأتي متأخرًا نحو ثلاثة أسابيع. انتظر 20 مم، تحقق على 10 سم، ثم ابذر. النافذة في التطبيق.',
        'الشتا كتجي متأخرة بحال 3 سيمانات. تسنى 20 مم، شوف 10 سم، ومن بعد زرع. النافذة فالتطبيق.'));
    } else if (id === 'crop') {
      ans = tx(rot.why) + ' ' + tx(m('This is a possible direction, not a decision. It still needs local review.', 'C’est une direction possible, pas une décision. À valider localement.', 'هذا اتجاه ممكن، ليس قرارًا. يحتاج مراجعة محلية.', 'هادي اتجاه ممكن، ماشي قرار. محتاجة مراجعة محلية.'));
    } else if (id === 'light' || low.indexOf('light') > -1 || low.indexOf('ضو') > -1) {
      ans = tx(m('Water: ', 'Eau : ', 'الماء: ', 'الما: ')) + L + '\n' +
        tx(m('Heat: 28 days above 35 °C, more than 20 years ago.', 'Chaleur : 28 jours > 35 °C, plus qu’il y a 20 ans.', 'الحرارة: 28 يومًا فوق 35 °م، أكثر من قبل 20 سنة.', 'السخانة: 28 يوم فوق 35 °م، كتر من 20 سنة.'));
    } else if (id === 'sure' || low.indexOf('sure') > -1 || low.indexOf('ثقة') > -1) {
      ans = tx(m('Medium confidence. POWER rain is reliable; NDVI is 250 m and misses small plots. Satellites do not see disease, practices or prices.',
        'Confiance moyenne. La pluie POWER est fiable ; NDVI à 250 m rate les petites parcelles. Les satellites ne voient ni maladies, ni pratiques, ni prix.',
        'ثقة متوسطة. مطر POWER موثوق؛ NDVI بدقة 250 م يفوّت القطع الصغيرة. السواتل لا ترى الأمراض ولا الممارسات ولا الأسعار.',
        'ثقة متوسطة. شتا POWER موثوقة؛ NDVI بـ250 م كيفوت القطع الصغار. الساتلات ما كتشوفوش الأمراض ولا الممارسات ولا الأثمنة.'));
    } else if (id === 'ndvi' || low.indexOf('ndvi') > -1) {
      ans = tx(m('NDVI is how green your plants look from space. 0.42 now, 0.49 last year. It is an average of a 250 m square, not your whole field.',
        'Le NDVI, c’est la verdure vue de l’espace. 0,42 cette année, 0,49 l’an dernier. C’est une moyenne sur 250 m.',
        'NDVI هو مدى اخضرار نباتاتك من الفضاء. 0.42 الآن و0.49 العام الماضي. متوسط مربع 250 م.',
        'NDVI هو شحال خضر النباتات من الفضاء. 0.42 دابا و0.49 العام اللي فات. متوسط مربع 250 م.'));
    } else if (id === 'tech' || low.indexOf('tech') > -1) {
      ans = tx(m('Open “Report a problem” and send a photo or a voice note. Your technician answers by voice note.',
        'Ouvrez « Signaler un problème » et envoyez une photo ou un vocal. Le technicien répond par vocal.',
        'افتح «الإبلاغ عن مشكلة» وأرسل صورة أو رسالة صوتية. يجيبك التقني برسالة صوتية.',
        'حل «بلغ على مشكل» وصيفط تصويرة ولا رسالة صوتية. التقني كيجاوبك برسالة صوتية.'));
    } else if (id === 'water' || low.indexOf('water') > -1 || low.indexOf('eau') > -1) {
      ans = tx(m('Autumn rain is 21 days later and the longest dry spell is 38 days. Mulch and early sowing save the most water.',
        'La pluie d’automne est 21 jours plus tard et la sécheresse dure 38 jours. Paillage et semis précoce économisent l’eau.',
        'أمطار الخريف متأخرة 21 يومًا وأطول جفاف 38 يومًا. التغطية والبذر المبكر يوفران الماء.',
        'شتا الخريف متأخرة 21 يوم وأطول جفاف 38 يوم. التغطية والزريعة البكرية كيوفرو الما.'));
    } else if (id === 'yellow' || low.indexOf('yellow') > -1 || low.indexOf('صفر') > -1 || low.indexOf('jaune') > -1) {
      ans = tx(m('Yellow leaves can be nitrogen, water or disease. The satellite cannot separate them. Open the diagnosis, then show the leaves to your technician.',
        'Des feuilles jaunes : azote, eau ou maladie. Le satellite ne peut pas séparer. Faites le diagnostic puis montrez au technicien.',
        'الأوراق الصفراء قد تكون آزوتًا أو ماءً أو مرضًا. الساتل لا يفرّق. اعمل التشخيص ثم أرِ التقني.',
        'الوراق الصفرين يقدرو يكونو آزوت ولا ما ولا مرض. الساتل ما كيفرقش. دير التشخيص ووري التقني.'));
    } else if (id === 'price' || low.indexOf('price') > -1 || low.indexOf('سعر') > -1 || low.indexOf('prix') > -1) {
      ans = tx(m('I do not know prices. That is not in the app data. Ask your technician or your cooperative.', 'Je ne connais pas les prix. Ce n’est pas dans les données de l’app.', 'لا أعرف الأسعار. ليست في بيانات التطبيق.', 'ما نعرفش الأثمنة. ماشي فالداتا ديال التطبيق.'));
    } else {
      ans = tx(m('I do not know that from the app data. I can explain the lights, the sowing window, NDVI or the rotations — or you can ask your technician.',
        'Je ne le sais pas à partir des données de l’app. Je peux expliquer les feux, la fenêtre de semis, le NDVI ou les rotations — ou demandez au technicien.',
        'لا أعرف ذلك من بيانات التطبيق. أستطيع شرح الأضواء أو نافذة البذر أو NDVI أو الدورات — أو اسأل تقنيك.',
        'ما نعرفش هادشي من داتا التطبيق. نقدر نشرح الضواو ولا نافذة الزريعة ولا NDVI ولا الدورات — ولا سول التقني.'));
    }
    return { who: 'bot', text: ans, src: tx(D.evidenceBase.power) + (S.online ? '' : ' · ' + t('offline')) };
  }

  function shareWhatsApp() {
    var txt = 'Mazra\'a — ' + tx(D.farm.commune) + ': ' + tx(D.lights[0].say) + ' ' + tx(D.lights[3].say);
    var url = 'https://wa.me/?text=' + encodeURIComponent(txt);
    window.open(url, '_blank');
  }
  window.shareWhatsApp = shareWhatsApp;

  /* ---------- home ---------- */
  window.homeScreen = function () {
    var L = D.lights;
    var chips = L.slice(0, 3).map(function (l, i) {
      return '<button class="alert-chip ' + (l.state === 'bad' ? 'bad' : '') + '" data-go="alerts"><i class="d"></i>' + esc(tx(l.name)) + '</button>';
    }).join('');
    var queue = S.queue.filter(function (q) { return q.status !== 'sent'; }).length;
    return '<main class="screen stack">' +
      '<div class="hero"><div><h1>' + esc(greeting()) + '</h1>' +
      '<span class="where">' + icon('leaf') + esc(tx(D.farm.commune)) + ' · ' + D.farm.area + ' ha</span></div></div>' +

      (window.WEATHER ? WEATHER.card() : '') +

      '<div class="tiles">' +
      tile('diagnose', 'primary', 'leaf', t('diagnose')) +
      tile('status', 'farm', 'chart', t('myFarm')) +
      tile('rotations', '', 'soil', t('rotations')) +
      tile('problem', 'report', 'camera', t('report')) +
      '</div>' +

      (queue ? '<button class="queue-strip" data-act="sync" style="text-align:start">' + icon('share') + esc(t('queue')) + ' · ' + queue + '</button>' : '') +

      '<div class="row-between"><span class="eyebrow">' + esc(t('alerts')) + '</span><button class="btn ghost tinybtn" data-go="alerts">' + esc(t('seeAll')) + '</button></div>' +
      '<div class="strip">' + chips + '</div>' +
      '</main>';
  };

  function tile(go, cls, ic, title) {
    return '<button class="tile ' + cls + '" data-go="' + go + '"><span class="t-ic">' + icon(ic) + '</span>' +
      '<span class="t-arrow">' + icon('arrow') + '</span>' +
      '<span><span class="t-title">' + esc(title) + '</span></span></button>';
  }

  function greeting() {
    return tx(m('Salam, farmer', 'Salam, agriculteur', 'السلام، أيها الفلاح', 'السلام، أيها الفلاح'));
  }
  window.tile = tile;

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var r = (location.hash || '').replace('#/', '') || 'home';
    S.route = r;
    if (window.WEATHER) WEATHER.init();
    App.render();
  });
  window.addEventListener('online', function () { S.online = true; App.render(); });
  window.addEventListener('offline', function () { S.online = false; App.render(); });

  if (!window.Screens) window.Screens = {};
})();
