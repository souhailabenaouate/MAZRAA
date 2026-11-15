/* ============================================================
   Mazra'a — visual diagnosis screens
   ============================================================ */
(function () {
  var S = window.S;
  var Screens = window.Screens = window.Screens || {};

  function flow() {
    if (!S.diagFlow) S.diagFlow = { phase: 'problems', i: 0, follow: {} };
    return S.diagFlow;
  }

  function picBtn(picName, label, hint, val, selected) {
    return '<button class="pic-btn ' + (selected ? 'sel' : '') + '" data-opt="' + val + '">' +
      '<span class="pic-art">' + pic(picName) + '</span>' +
      '<span class="pic-label"><span><span class="pic-txt">' + esc(label) + '</span>' +
      (hint ? '<span class="hint">' + esc(hint) + '</span>' : '') + '</span>' +
      '<span class="check">' + icon('check') + '</span></span></button>';
  }

  function head(step, total, q, sub) {
    var pct = total ? Math.round((step - 1) / total * 100) : 0;
    return '<div class="flow-head">' +
      '<button class="btn ghost tinybtn" data-act="diagBack">' + icon('arrowL') + esc(t('back')) + '</button>' +
      '<div class="progress" aria-hidden="true">' + [0, 1, 2, 3, 4].map(function (i) {
        return '<i class="' + (i < step - 1 ? 'done' : i === step - 1 ? 'now' : '') + '"></i>';
      }).join('') + '</div>' +
      '<div class="row-between mt14"><span class="q-step">' + esc(t('stepOf', { n: step, m: total })) + '</span>' +
      audioBtn(q.replace(/[.،]\s*$/, '') + (sub ? '. ' + sub : ''), 'small') + '</div>' +
      '<h2 class="q-text">' + esc(q) + '</h2>' + (sub ? '<p class="q-help">' + esc(sub) + '</p>' : '') +
      '</div>';
  }

  Screens.diagnose = function () {
    var f = flow();
    if (f.phase === 'problems') return problems(f);
    if (f.phase === 'follow') return follow(f);
    if (f.phase === 'soil') return soil(f);
    if (f.phase === 'water') return water(f);
    if (f.phase === 'check') return check(f);
    return result(f);
  };

  function problems(f) {
    var total = 4;
    return '<main class="screen stack">' +
      head(1, total, t('problemQ'), t('problemHelp')) +
      '<div class="pic-grid">' + D.diag.problems.map(function (p) {
        return picBtn(p.pic, tx(p.label), tx(p.sub), p.id, f.problem === p.id);
      }).join('') + '</div>' +
      '<button class="btn secondary block" data-act="diagIdk">' + icon('user', 'ic') + esc(t('idk')) + '</button>' +
      '<p class="tiny" style="text-align:center">' + esc(tx(m('You can stop at any time. Nothing is sent without you.', 'Vous pouvez arrêter à tout moment. Rien n’est envoyé sans vous.', 'يمكنك التوقف في أي وقت. لا يُرسل شيء بدونك.', 'تقدر توقف فاي وقت. ما كيتصيفط والو بلايك.'))) + '</p>' +
      '</main>';
  }

  function follow(f) {
    var list = D.diag.followups[f.problem] || [];
    var q = list[f.i];
    var total = 1 + list.length + 2;
    return '<main class="screen stack">' +
      head(2 + f.i, total, tx(q.q), '') +
      '<div class="pic-grid' + (q.opts.length === 2 ? '' : '') + '">' + q.opts.map(function (o) {
        return picBtn(o.pic, tx(o.label), '', o.id, f.follow[q.id] === o.id);
      }).join('') + '</div>' +
      '<button class="btn ghost block" data-act="diagSkip">' + esc(t('skip')) + '</button>' +
      '</main>';
  }

  function soil(f) {
    var total = 1 + (D.diag.followups[f.problem] || []).length + 2;
    return '<main class="screen stack">' +
      head(2 + (D.diag.followups[f.problem] || []).length, total, t('soilQ'), tx(m('Take a handful at 10 cm. Look at the colour and how it breaks.', 'Prenez une poignée à 10 cm. Regardez la couleur et la cassure.', 'خذ حفنة على عمق 10 سم. انظر إلى اللون وكيف يتفتت.', 'خد حفنة فـ10 سم. شوف اللون وكيفاش كيتفكك.'))) +
      '<div class="pic-grid">' + D.diag.soil.opts.map(function (o) {
        return picBtn(o.pic, tx(o.label), tx(o.hint), o.id, f.soil === o.id);
      }).join('') + '</div>' +
      '<button class="btn ghost block" data-act="diagSkip">' + esc(t('skip')) + '</button>' +
      '</main>';
  }

  function water(f) {
    var total = 1 + (D.diag.followups[f.problem] || []).length + 2;
    return '<main class="screen stack">' +
      head(3 + (D.diag.followups[f.problem] || []).length, total, t('waterQ'), '') +
      '<div class="pic-grid" style="grid-template-columns:1fr 1fr">' +
      picBtn('waterRain', t('waterRain'), esc(tx(m('No well, no pump', 'Pas de puits ni de pompe', 'لا بئر ولا مضخة', 'لا بير ولا مضخة'))), 'rain', f.water === 'rain') +
      picBtn('waterWell', t('waterWell'), esc(tx(m('A well, for drinking water', 'Un puits, pour l’eau potable', 'بئر لماء الشرب', 'بير لما الشرب'))), 'well', f.water === 'well') +
      '</div>' +
      '<div class="pic-grid" style="grid-template-columns:1fr">' +
      picBtn('waterIrr', t('waterIrr'), esc(tx(m('A drip line or a canal', 'Goutte-à-goutte ou canal', 'قطرات أو قناة', 'قطرات ولا قناة'))), 'irr', f.water === 'irr') +
      '</div>' +
      '<button class="btn ghost block" data-act="diagSkip">' + esc(t('skip')) + '</button>' +
      '</main>';
  }

  function check(f) {
    var rows = D.diag.checks[f.problem] || [];
    return '<main class="screen stack">' +
      '<div class="checking">' +
      '<div class="sat-orbit">' + pic('satelliteView') + '</div>' +
      '<h2 class="q-text" style="text-align:center">' + esc(t('checking')) + '</h2>' +
      '<div class="check-list" id="checks">' + rows.map(function (r) {
        return '<div class="check-row"><span class="tick">' + icon('check') + '</span>' +
          '<span>' + esc(tx(r.label)) + '<span class="srcname">' + esc(r.src) + '</span></span>' +
          '<span class="val">' + esc(r.value) + '</span></div>';
      }).join('') + '</div>' +
      '<p class="tiny">' + esc(t('trendLabel')) + '</p>' +
      '</div></main>';
  }

  function result(f) {
    var ans = { problem: f.problem, follow: f.follow, soil: f.soil, water: f.water };
    if (!S.diagResult || S.diagResult.key !== JSON.stringify(ans)) {
      S.diagResult = D.diagnose(ans);
      S.diagResult.key = JSON.stringify(ans);
    }
    var res = S.diagResult;
    S.diag = ans;
    D.save();

    var banner = res.confirm
      ? '<div class="result-banner"><span class="ic">' + icon('check') + '</span><div><div class="h3">' + esc(t('satConfirm')) + '</div><div class="small">' + esc(summaryLine(f)) + '</div></div>' + audioBtn(summaryLine(f)) + '</div>'
      : '<div class="result-banner warn"><span class="ic">' + icon('alert') + '</span><div><div class="h3">' + esc(t('satNuance')) + '</div><div class="small">' + esc(tx(m('What you see in the field is real. The satellite sees a 250 m average and cannot see disease.', 'Ce que vous voyez est réel. Le satellite voit une moyenne de 250 m et ne voit pas les maladies.', 'ما تراه في الحقل حقيقي. الساتل يرى متوسط 250 م ولا يرى الأمراض.', 'اللي كتشوف فالأرض حقيقي. الساتل كيشوف متوسط 250 م وما كيشوفش الأمراض.'))) + '</div></div>' + audioBtn(t('satNuance')) + '</div>';

    var answers = '<div class="wrap">' +
      '<span class="tag sage">' + esc(tx(D.diag.problems.filter(function (p) { return p.id === f.problem; })[0].label)) + '</span>' +
      (f.soil ? '<span class="tag">' + esc(f.soil === 'dark' ? t('soilDark') : t('soilPale')) + '</span>' : '') +
      (f.water ? '<span class="tag">' + esc(t(f.water === 'rain' ? 'waterRain' : f.water === 'well' ? 'waterWell' : 'waterIrr')) + '</span>' : '') +
      '</div>';

    var causes = res.causes.map(function (c, i) {
      return '<div class="cause"><span class="rank">' + (i + 1) + '</span><div style="flex:1">' +
        '<div class="c-t">' + esc(tx(c.t)) + '</div>' +
        (c.d ? '<div class="c-d">' + esc(tx(c.d)) + '</div>' : '') +
        (c.ev ? '<div class="c-ev">' + esc(tx(c.ev)) + '</div>' : '') +
        '<div class="mt8"><span class="conf dot-' + c.conf + '">' + esc(t('confidence')) + ': ' + esc(t(c.conf === 3 ? 'high' : c.conf === 2 ? 'medium' : 'low')) + '</span></div>' +
        '</div></div>';
    }).join('');

    var sols = res.sols.map(function (id, i) {
      var s = D.sol[id];
      if (!s) return '';
      var open = S.openSol === id;
      var steps = open ? '<div class="steps mt14">' + s.steps.map(function (st, j) {
        return '<div class="step"><span class="s-art">' + pic(st.pic) + '</span>' +
          '<div style="flex:1"><div class="row" style="gap:7px"><span class="s-num">' + (j + 1) + '</span>' +
          '<span class="s-t">' + esc(tx(st.t)) + '</span></div>' +
          '<div class="s-d">' + esc(tx(st.d)) + '</div></div>' +
          audioBtn(tx(st.t) + '. ' + tx(st.d), 'small') + '</div>';
      }).join('') + '</div>' : '';
      return '<article class="solution">' +
        '<div class="solution-head"><span class="solution-thumb">' + pic(s.pic) + '</span>' +
        '<div style="flex:1"><div class="solution-num">' + esc(t('help')) + ' · ' + esc(t(s.when === 'now' ? 'thisSeason' : 'nextSeason')) + '</div>' +
        '<div class="solution-title">' + esc(tx(s.title)) + '</div>' +
        '<div class="solution-why">' + esc(tx(s.why)) + '</div>' +
        '<div class="solution-meta"><span class="tag sage">' + esc(t('confidence')) + ' ' + esc(t(s.conf === 3 ? 'high' : s.conf === 2 ? 'medium' : 'low')) + '</span>' +
        '<span class="tag ghost">' + s.steps.length + ' ' + esc(tx(m('steps', 'étapes', 'خطوات', 'خطوات'))) + '</span></div></div>' +
        audioBtn(tx(s.title) + '. ' + tx(s.why), 'small') + '</div>' +
        '<div class="solution-body">' +
        '<div class="solution-actions"><button class="btn secondary tinybtn" data-act="toggleSol" data-arg="' + s.id + '">' +
        esc(open ? t('hideSteps') : t('openSteps')) + '</button>' +
        '<button class="btn ghost tinybtn" data-act="saveSol" data-arg="' + s.id + '">' + icon('plus') + esc(S.saved.indexOf(s.id) > -1 ? t('savedReport') : t('saveReport')) + '</button>' +
        (s.rot ? '<button class="btn ghost tinybtn" data-act="goRot" data-arg="' + s.rot + '">' + esc(t('rotations')) + '</button>' : '') +
        '</div>' + steps +
        '<div class="evidence"><b>' + esc(t('evidenceLabel')) + ':</b> ' + esc(tx(s.ev)) + '</div>' +
        '</div></article>';
    }).join('');

    return '<main class="screen stack">' +
      '<div class="row-between"><span class="eyebrow">' + esc(t('diagnose')) + '</span>' +
      '<button class="btn ghost tinybtn" data-act="restartDiag">' + esc(tx(m('Start again', 'Recommencer', 'ابدأ من جديد', 'عاود من الأول'))) + '</button></div>' +
      banner +
      '<div><div class="eyebrow">' + esc(t('answersSay')) + '</div><div class="mt8">' + answers + '</div></div>' +
      '<h3 class="h2">' + esc(t('causes')) + '</h3>' +
      '<div class="cause-list">' + causes + '</div>' +
      '<div class="row-between"><h3 class="h2">' + esc(t('help')) + '</h3>' + audioBtn(tx(m('Here are the steps that may help, in the order shown. Open each one to hear its steps.', 'Voici les étapes qui peuvent aider, dans l’ordre affiché.', 'إليك الخطوات التي قد تساعد، بالترتيب المعروض. افتح كل واحدة لتسمع خطواتها.', 'إليك الخطوات التي قد تساعد، بالترتيب المعروض. افتح كل واحدة لتسمع خطواتها.')), 'small') + '</div>' +
      sols +
      '<div class="limits"><b>' + esc(t('limits')) + ':</b> ' + esc(t('limitsBox')) + '</div>' +
      '<div class="btn-row"><button class="btn" data-go="priorities">' + esc(t('priorities')) + '</button>' +
      '<button class="btn secondary" data-go="status">' + esc(t('myFarm')) + '</button></div>' +
      '<button class="btn ghost block" data-go="rotations">' + esc(t('compareRot')) + icon('arrow') + '</button>' +
      '<button class="btn ghost block" data-act="chat">' + icon('mic') + esc(t('askGharss')) + '</button>' +
      '</main>';
  }

  function summaryLine(f) {
    if (f.problem === 'rain') return tx(m('Autumn rain arrives 21 days later than 20 years ago, and your soil is dry at sowing depth.',
      'La pluie d’automne arrive 21 jours plus tard et votre sol est sec à la profondeur de semis.',
      'أمطار الخريف متأخرة 21 يومًا وتربتك جافة في عمق البذر.',
      'شتا الخريف متأخرة 21 يوم وترابك ناشف فعمق الزريعة.'));
    if (f.problem === 'erosion') return tx(m('18 % slope and heavy rain days confirm the soil loss you see.',
      '18 % de pente et des pluies intenses confirment la perte de sol.',
      'ميل 18% وأيام أمطار غزيرة تؤكد فقدان التربة.',
      'ميل 18% وأيام شتا قوية كيأكدو ضياع التراب.'));
    if (f.problem === 'plants') return tx(m('NDVI is lower than last year (0.42 vs 0.49), and your soil answer says low organic matter.',
      'Le NDVI est plus bas que l’an dernier (0,42 vs 0,49) et votre sol est pauvre.',
      'NDVI أقل من العام الماضي (0.42 مقابل 0.49)، وجوابك يقول مادة عضوية قليلة.',
      'NDVI أقل من العام اللي فات (0.42 مقابل 0.49)، وجوابك كيقول مادة عضوية قليلة.'));
    return tx(m('28 heat days above 35 °C and an earlier July NDVI drop.',
      '28 jours > 35 °C et une baisse du NDVI plus tôt en juillet.',
      '28 يومًا فوق 35 °م وانخفاض NDVI أبكر في يوليوز.',
      '28 يوم فوق 35 °م ونزول NDVI بكري فـيوليوز.'));
  }

  /* ---------- interactions ---------- */
  function choose(val, kind) {
    var f = flow();
    if (kind === 'problem') {
      f.problem = val; f.i = 0; f.follow = {}; f.phase = 'follow';
      if (!(D.diag.followups[val] || []).length) f.phase = 'soil';
    } else if (kind === 'follow') {
      var list = D.diag.followups[f.problem];
      f.follow[list[f.i].id] = val;
      if (f.i + 1 < list.length) f.i++; else f.phase = 'soil';
    } else if (kind === 'soil') {
      f.soil = val; f.phase = 'water';
    } else if (kind === 'water') {
      f.water = val; f.phase = 'check';
    }
    D.save();
    App.render();
  }

  Screens.after = function () {
    var f = S.diagFlow;
    var app = document.getElementById('app');
    if (!app) return;
    app.querySelectorAll('[data-opt]').forEach(function (b) {
      b.onclick = function () {
        var kind = 'problem';
        if (f.phase === 'follow') kind = 'follow';
        else if (f.phase === 'soil') kind = 'soil';
        else if (f.phase === 'water') kind = 'water';
        choose(b.dataset.opt, kind);
      };
    });
    if (f && f.phase === 'check' && document.getElementById('checks')) {
      var rows = document.querySelectorAll('#checks .check-row');
      rows.forEach(function (r, i) { setTimeout(function () { r.classList.add('in'); }, 260 + i * 420); });
      clearTimeout(window._diagTimer);
      window._diagTimer = setTimeout(function () {
        f.phase = 'result'; App.render();
        var s = document.querySelector('.result-banner');
        if (s && 'speechSynthesis' in window) speakText(s.textContent.trim().slice(0, 180));
      }, 2200 + rows.length * 420);
    }
    app.querySelectorAll('[data-goal]').forEach(function (b) {
      b.onclick = function () { window.act('goal', b.dataset.goal, b); };
    });
    app.querySelectorAll('[data-con]').forEach(function (b) {
      b.onclick = function () { window.act('con', b.dataset.con + ':' + b.dataset.arg, b); };
    });
    if (Screens.rotationsAfter && S.route === 'rotations') Screens.rotationsAfter();
  };

  Screens.act = function (a, arg) {
    var f = flow();
    if (a === 'diagBack') {
      if (f.phase === 'problems') return App.go('home');
      if (f.phase === 'follow') {
        if (f.i > 0) f.i--; else f.phase = 'problems';
      } else if (f.phase === 'soil') {
        f.phase = (D.diag.followups[f.problem] || []).length ? 'follow' : 'problems';
        f.i = Math.max(0, (D.diag.followups[f.problem] || []).length - 1);
      } else if (f.phase === 'water') f.phase = 'soil';
      else if (f.phase === 'result') f.phase = 'water';
      return App.render();
    }
    if (a === 'diagSkip') {
      if (f.phase === 'follow') {
        f.i = 0;
        f.phase = 'soil';
      } else if (f.phase === 'soil') f.phase = 'water';
      else if (f.phase === 'water') f.phase = 'check';
      return App.render();
    }
    if (a === 'diagIdk') {
      openChat();
      setTimeout(function () { askGharss(tx(m('I do not know what my problem is. Help me look.', 'Je ne sais pas quel est mon problème. Aidez-moi à regarder.', 'لا أعرف ما مشكلتي. ساعدني في النظر.', 'ما عرفتش شنو المشكل ديالي. عاوني نشوف.'))); }, 300);
      return;
    }
    if (a === 'restartDiag') {
      S.diagFlow = { phase: 'problems', i: 0, follow: {} };
      S.diagResult = null; S.openSol = null;
      return App.render();
    }
    if (a === 'toggleSol') {
      S.openSol = S.openSol === arg ? null : arg;
      return App.render();
    }
    if (a === 'saveSol') {
      if (S.saved.indexOf(arg) < 0) S.saved.push(arg);
      D.save(); toast(t('savedReport')); App.render();
      return;
    }
    if (a === 'goRot') {
      S.prefRot = arg; return App.go('rotations');
    }
  };
})();
