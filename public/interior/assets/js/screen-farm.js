/* ============================================================
   Mazra'a — my farm, priorities, rotations
   ============================================================ */
(function () {
  var S = window.S;
  var Screens = window.Screens = window.Screens || {};
  Screens.home = function () { return window.homeScreen(); };

  function backBtn(route, label) {
    return '<button class="btn ghost tinybtn" data-go="' + route + '">' + icon('arrowL') + esc(label || t('back')) + '</button>';
  }

  /* ---------------- my farm status ---------------- */
  Screens.status = function () {
    var d = S.diag;
    var banner = '';
    if (d) {
      var line = d.problem === 'erosion'
        ? tx(m('The satellites confirm what you said: 18 % slope and heavy rain days.', 'Les satellites confirment : pente de 18 % et pluies intenses.', 'السواتل تؤكد: ميل 18% وأيام أمطار غزيرة.', 'الساتلات كيأكدو: ميل 18% وأيام شتا قوية.'))
        : d.problem === 'rain'
          ? tx(m('The satellites confirm what you said: rain arrives about 3 weeks later than before.', 'Les satellites confirment : la pluie arrive 3 semaines plus tard.', 'السواتل تؤكد: المطر يأتي متأخرًا نحو 3 أسابيع.', 'الساتلات كيأكدو: الشتا كتجي متأخرة بحال 3 سيمانات.'))
          : tx(m('The satellites confirm the stress you described, at medium confidence.', 'Les satellites confirment le stress décrit, confiance moyenne.', 'السواتل تؤكد الإجهاد الموصوف بثقة متوسطة.', 'الساتلات كيأكدو الإجهاد اللي وصفتي بثقة متوسطة.'));
      banner = '<div class="result-banner"><span class="ic">' + icon('check') + '</span><div style="flex:1"><div class="h3">' + esc(t('satConfirm')) + '</div><div class="small">' + esc(line) + '</div></div>' + audioBtn(line, 'small') + '</div>';
    }

    var lights = D.lights.map(function (l) {
      return '<div role="button" tabindex="0" class="light ' + (l.state === 'bad' ? 'bad' : l.state === 'warn' ? 'warn' : '') + '" data-act="lightInfo" data-arg="' + l.id + '">' +
        '<span class="l-top"><span class="l-dot"></span><span class="l-name">' + esc(tx(l.name)) + '</span>' +
        '<span style="margin-inline-start:auto">' + audioBtn(tx(l.name) + '. ' + tx(l.say)) + '</span></span>' +
        '<span class="l-say">' + esc(tx(l.say)) + '</span>' +
        '<span class="l-state">' + esc(l.state === 'bad' ? tx(m('Act soon', 'Agir vite', 'تصرّف قريبًا', 'دير حاجة دغيا')) : l.state === 'warn' ? tx(m('Be alert', 'Vigilance', 'كن حذرًا', 'رد بالك')) : tx(m('Fine', 'OK', 'جيد', 'مزيان'))) + ' · ' + esc(tx(l.val)) + '</span>' +
        '<span class="l-src">' + esc(l.src) + '</span></div>';
    }).join('');

    var soilPct = Math.round(D.soil.score * 100);
    return '<main class="screen stack">' +
      '<div class="row-between">' + backBtn('home', t('home')) +
      '<span class="tag">' + esc(t('confidence')) + ': ' + esc(t(D.soil.conf === 3 ? 'high' : D.soil.conf === 2 ? 'medium' : 'low')) + '</span></div>' +
      '<div><h2 class="h1">' + esc(t('lightsTitle')) + '</h2><p class="lead">' + esc(t('lightsSub')) + ' · ' + esc(tx(D.farm.commune)) + '</p></div>' +
      banner +
      '<div class="lights">' + lights + '</div>' +
      '<section class="card cream">' +
      '<div class="row-between"><div class="h3">' + esc(t('soilHealth')) + '</div>' + audioBtn(t('soilHealth') + '. ' + tx(D.soil.say)) + '</div>' +
      '<div class="row mt14" style="gap:10px"><span class="tag">' + esc(D.soil.label ? tx(D.soil.label) : t('medium')) + '</span>' +
      '<span class="tiny">' + esc(t('confidence')) + ': ' + esc(t('medium')) + '</span></div>' +
      '<div class="meter mt8" style="margin-top:10px"><i style="width:' + soilPct + '%"></i></div>' +
      '<p class="small mt8">' + esc(tx(D.soil.say)) + '</p>' +
      '<p class="tiny mt8">' + esc(tx(D.soil.src)) + '</p>' +
      '</section>' +
      '<section class="card">' +
      '<div class="row-between"><div class="h3">' + esc(t('whyDiffer')) + '</div>' + audioBtn(t('whyDiffer') + '. ' + t('whyDifferText'), 'small') + '</div>' +
      '<p class="small mt8">' + esc(t('whyDifferText')) + '</p>' +
      '</section>' +
      '<div class="btn-row"><button class="btn" data-go="rotations">' + esc(t('compareRot')) + '</button>' +
      '<button class="btn secondary" data-go="calendar">' + esc(t('calendar')) + '</button></div>' +
      '<button class="btn ghost block" data-go="walk">' + icon('leaf') + esc(t('walk')) + '</button>' +
      '<p class="tiny" style="text-align:center">' + esc(tx(m('Data: NASA POWER 2005–2025 · MODIS NDVI 2000–2025 · SRTM 30 m · GPM IMERG', 'Données : NASA POWER 2005–2025 · MODIS NDVI 2000–2025 · SRTM 30 m · GPM IMERG', 'البيانات: NASA POWER 2005–2025 · MODIS NDVI 2000–2025 · SRTM 30 م · GPM IMERG', 'الداتا: NASA POWER 2005–2025 · MODIS NDVI 2000–2025 · SRTM 30 م · GPM IMERG'))) + '</p>' +
      '</main>';
  };

  /* ---------------- priorities ---------------- */
  Screens.priorities = function () {
    var goals = D.priorities.goals.map(function (g) {
      var on = S.goals.indexOf(g.id) > -1;
      return '<button class="choice ' + (on ? 'sel' : '') + '" data-goal="' + g.id + '" aria-pressed="' + on + '">' +
        '<span class="c-art">' + pic(g.pic) + '</span><span class="c-name">' + esc(tx(g.label)) + '</span>' +
        '<span class="tiny">' + esc(on ? '✓ ' + t('chosen') : tx(m('Tap to add', 'Touchez pour ajouter', 'المس للإضافة', 'قيس باش تزيد'))) + '</span></button>';
    }).join('');

    var cons = D.priorities.cons.map(function (c) {
      var cur = S.cons[c.id];
      return '<section class="card">' +
        '<div class="row-between"><div class="h3">' + esc(tx(c.label)) + '</div>' + audioBtn(tx(c.label)) + '</div>' +
        '<div class="wrap mt14">' + c.opts.map(function (o) {
          return '<button class="chip ' + (cur === o.id ? 'on' : '') + '" data-con="' + c.id + '" data-arg="' + o.id + '">' + esc(tx(o.label)) + '</button>';
        }).join('') + '</div></section>';
    }).join('');

    dotGoals();
    return '<main class="screen stack">' +
      '<div class="row-between">' + backBtn('diagnose', t('diagnose')) + audioBtn(t('prioritiesQ')) + '</div>' +
      '<div><h2 class="h1">' + esc(t('priorities')) + '</h2><p class="lead">' + esc(t('prioritiesQ')) + '</p></div>' +
      '<div class="choice-grid">' + goals + '</div>' +
      '<h3 class="h2 mt8">' + esc(t('constraintsQ')) + '</h3>' + cons +
      '<div class="limits"><b>' + esc(tx(m('Why this matters', 'Pourquoi c’est important', 'لماذا هذا مهم', 'علاش هادشي مهم'))) + ':</b> ' +
      esc(tx(m('Your goals change the weights in the rotation score. A farmer who wants to save water does not get the same ranking as one who wants to earn more.',
        'Vos objectifs changent les poids du score. Un agriculteur qui veut économiser l’eau n’a pas le même classement.',
        'أهدافك تغيّر أوزان النتيجة. من يريد توفير الماء لا يحصل على نفس الترتيب.',
        'الأهداف ديالك كيبدلو الأوزان. اللي بغى يوفر الما ماشي نفس الترتيب.'))) + '</div>' +
      '<button class="btn lg block" data-go="rotations">' + esc(t('compareRot')) + icon('arrow') + '</button>' +
      '</main>';
  };

  function dotGoals() {
    if (S.goals.length > 3) S.goals = S.goals.slice(0, 3);
  }

  /* ---------------- rotations ---------------- */
  var RING = 2 * Math.PI * 27;

  function ring(score, id) {
    var off = RING * (1 - score / 100);
    return '<div class="rot-score" data-ring="' + id + '"><svg viewBox="0 0 66 66">' +
      '<circle cx="33" cy="33" r="27" fill="none" stroke="#EDE3D6" stroke-width="7"/>' +
      '<circle cx="33" cy="33" r="27" fill="none" stroke="#7C9375" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + RING.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/>' +
      '</svg><span class="num">' + score + '</span></div>';
  }

  function cropDot(key) {
    return '<span class="cropdot">' + cropIcon((D.crops[key] || D.crops.wheat).icon) + '</span>';
  }

  function rotCard(r, score, best, conf) {
    var chain = r.chain.map(function (c, i) {
      return '<div class="season">' + cropDot(c) + '<span class="s-name">' + esc(tx(D.crops[c].name)) + '</span>' +
        '<span class="s-when">' + esc(t('confidence') === 'Confidence' ? 'S' + (i + 1) : 'S' + (i + 1)) + '</span></div>';
    }).join('');
    var chosen = S.chosen === r.id;
    var benefits = r.benefits.slice(0, 3).map(function (b) { return '<span class="mini">' + esc(tx(b)) + '</span>'; }).join('');
    var risks = r.risks.slice(0, 2).map(function (b) { return '<span class="mini risk">' + esc(tx(b)) + '</span>'; }).join('');
    return '<article class="rot-card ' + (best ? 'best' : '') + '">' +
      (best ? '<span class="best-flag">' + esc(tx(m('Best for your goals', 'Meilleur pour vos objectifs', 'الأفضل لأهدافك', 'الأحسن للأهداف ديالك'))) + '</span>' : '') +
      '<div class="rot-top">' + ring(score, r.id) +
      '<div style="flex:1"><div class="rot-name">' + esc(tx(r.name)) + '</div>' +
      '<div class="rot-chain">' + r.chain.map(function (c) { return esc(tx(D.crops[c].name)); }).join(' → ') + '</div>' +
      '<div class="rot-why">' + esc(tx(r.why)) + '</div></div>' +
      audioBtn(tx(r.name) + '. ' + tx(r.why), 'small') + '</div>' +
      '<div class="seq">' + chain + '</div>' +
      '<div class="benefits">' + benefits + risks + '</div>' +
      '<div class="evidence"><b>' + esc(t('gaps')) + ':</b> ' + esc(tx(r.gaps)) + '<br><b>' + esc(t('confidence')) + ':</b> ' +
      esc(t(conf === 3 ? 'high' : conf === 2 ? 'medium' : 'low')) + ' · <span class="tag ghost" style="font-size:10px">' + esc(t('needsReview')) + '</span></div>' +
      '<div class="solution-actions"><button class="btn ' + (chosen ? 'cream' : '') + ' tinybtn" data-act="iChoose" data-arg="' + r.id + '">' +
      (chosen ? '✓ ' + esc(t('chosen')) : esc(t('iChoose'))) + '</button>' +
      '<button class="btn ghost tinybtn" data-go="problem">' + esc(t('askTech')) + '</button>' +
      '<button class="btn ghost tinybtn" data-go="learn">' + esc(t('learn')) + '</button></div>' +
      '</article>';
  }

  Screens.rotations = function () {
    var w = D.weightsFor(S.goals);
    var scen = S.scen || { hot: 0, dry: 0 };
    var rows = D.rotations.map(function (r) { return { r: r, score: D.scoreRot(r, w, scen, S.cons), conf: D.confFor(r, scen) }; });
    var best = rows.slice().sort(function (a, b) { return b.score - a.score; })[0];
    var bestName = tx(best.r.name);

    var cards = D.rotations.map(function (r) {
      var row = rows.filter(function (x) { return x.r.id === r.id; })[0];
      return rotCard(r, row.score, best.r.id === r.id && rows.length > 1, row.conf);
    }).join('');

    var chips = S.goals.length ? S.goals.map(function (g) {
      var gg = D.priorities.goals.filter(function (x) { return x.id === g; })[0];
      return '<span class="tag sage">' + esc(tx(gg.label)) + '</span>';
    }).join('') : '<span class="tag ghost">' + esc(t('priorities')) + '</span>';

    var nb = D.neighbors, total = nb.total;
    var dots = ['current', 'improved', 'resilient'].map(function (k) {
      var n = nb.counts[k];
      var labels = { current: 'Current', improved: 'Improved', resilient: 'Resilient' };
      return '<div class="row-between" style="font-size:12px"><span>' + esc(k === 'current' ? tx(D.rotations[0].name) : k === 'improved' ? tx(D.rotations[1].name) : tx(D.rotations[2].name)) + '</span>' +
        '<span class="row" style="gap:3px">' + Array.from({ length: total }).map(function (_, i) {
          return '<i style="width:9px;height:9px;border-radius:50%;display:inline-block;background:' + (i < n ? 'var(--sage-2)' : '#E7DCCC') + '"></i>';
        }).join('') + '<b style="margin-inline-start:6px">' + n + '/' + total + '</b></span></div>';
    }).join('');

    return '<main class="screen stack">' +
      '<div class="row-between">' + backBtn('status', t('myFarm')) + audioBtn(t('rotTitle') + '. ' + t('rotSub')) + '</div>' +
      '<div><h2 class="h1">' + esc(t('rotTitle')) + '</h2><p class="lead">' + esc(t('rotSub')) + '</p></div>' +
      '<div class="row-between"><div class="wrap">' + chips + '</div><button class="btn ghost tinybtn" data-go="priorities">' + esc(t('priorities')) + '</button></div>' +

      '<section class="card cream">' +
      '<div class="row-between"><div class="h3">' + esc(t('whatIf')) + '</div>' + audioBtn(t('whatIf') + '. ' + t('scenarioNote'), 'small') + '</div>' +
      '<div class="sliders mt14">' +
      '<div class="slider-row"><label for="s-hot">' + esc(t('hotter')) + '<span id="hot-val">+' + scen.hot.toFixed(1) + ' °C</span></label>' +
      '<input id="s-hot" type="range" min="0" max="3" step="0.5" value="' + scen.hot + '" aria-label="' + esc(t('hotter')) + '"></div>' +
      '<div class="slider-row"><label for="s-dry">' + esc(t('drier')) + '<span id="dry-val">−' + scen.dry + ' % ' + esc(tx(m('rain', 'pluie', 'مطر', 'شتا'))) + '</span></label>' +
      '<input id="s-dry" type="range" min="0" max="30" step="5" value="' + scen.dry + '" aria-label="' + esc(t('drier')) + '"></div>' +
      '</div>' +
      '<p class="tiny mt8">' + esc(t('scenarioNote')) + '</p>' +
      '<p class="small mt8" id="best-line" style="color:var(--sage-3);font-weight:650">' + esc(t('bestChanges', { name: bestName })) + '</p>' +
      '</section>' +

      '<div id="rot-cards" class="stack">' + cards + '</div>' +

      '<section class="card">' +
      '<div class="row-between"><div class="h3">' + esc(tx(m('Farmers like me', 'Des fermes comme la mienne', 'مزارع مثلي', 'ضيعات بحال ضيعتي'))) + '</div>' +
      audioBtn(tx(m('7 of 10 farms near you chose the resilient rotation.', '7 fermes sur 10 près de vous ont choisi la rotation résiliente.', '7 من 10 مزارع قريبة اختارت الدورة المرنة.', '7 من 10 ضيعات قريبة ختارو الدورة القوية.'))) + '</div>' +
      '<p class="small">' + esc(tx(m('7 of 10 farms near you chose the resilient rotation.', '7 fermes sur 10 près de vous ont choisi la rotation résiliente.', '7 من 10 مزارع قريبة اختارت الدورة المرنة.', '7 من 10 ضيعات قريبة ختارو الدورة القوية.'))) + '</p>' +
      '<p class="tiny">' + esc(tx(nb.zone)) + '</p>' +
      '<div class="stack-sm mt14">' + dots + '</div>' +
      '<p class="tiny mt8"><span class="tag warn">' + esc(t('example')) + '</span> ' + esc(tx(m('The counts are not NASA data. This shows what others chose, never what is best.', 'Ces chiffres ne sont pas des données NASA. Cela montre les choix des autres, jamais le meilleur.', 'هذه الأرقام ليست بيانات NASA. تعرض اختيارات الآخرين لا الأفضل.', 'هاد الأرقام ماشي داتا NASA. كتوري اختيارات الناس ماشي الأحسن.'))) + '</p>' +
      '</section>' +
      '<div class="limits"><b>' + esc(t('limits')) + ':</b> ' + esc(t('limitsBox')) + '</div>' +
      '<div class="btn-row"><button class="btn" data-go="report">' + esc(t('report')) + '</button>' +
      '<button class="btn secondary" data-go="status">' + esc(t('myFarm')) + '</button></div>' +
      '</main>';
  };

  /* live update of scores while dragging */
  window.updateRotScores = function () {
    var w = D.weightsFor(S.goals);
    var scen = S.scen;
    var rows = D.rotations.map(function (r) { return { id: r.id, r: r, score: D.scoreRot(r, w, scen, S.cons), conf: D.confFor(r, scen) }; });
    var best = rows.slice().sort(function (a, b) { return b.score - a.score; })[0];
    rows.forEach(function (row) {
      var box = document.querySelector('[data-ring="' + row.id + '"]');
      if (!box) return;
      var num = box.querySelector('.num');
      var arc = box.querySelector('circle:nth-child(2)');
      if (num) num.textContent = row.score;
      if (arc) arc.setAttribute('stroke-dashoffset', (RING * (1 - row.score / 100)).toFixed(1));
      var card = box.closest('.rot-card');
      if (card) {
        var isBest = row.id === best.id;
        card.classList.toggle('best', isBest);
        var flag = card.querySelector('.best-flag');
        if (isBest && !flag) {
          card.insertAdjacentHTML('afterbegin', '<span class="best-flag">' + esc(tx(m('Best for your goals', 'Meilleur pour vos objectifs', 'الأفضل لأهدافك', 'الأحسن للأهداف ديالك'))) + '</span>');
        } else if (!isBest && flag) flag.remove();
      }
    });
    var line = document.getElementById('best-line');
    if (line) line.textContent = t('bestChanges', { name: tx(best.r.name) });
    var hv = document.getElementById('hot-val'), dv = document.getElementById('dry-val');
    if (hv) hv.textContent = '+' + scen.hot.toFixed(1) + ' °C';
    if (dv) dv.textContent = '−' + scen.dry + ' % ' + tx(m('rain', 'pluie', 'مطر', 'شتا'));
    D.save();
  };

  Screens.rotationsAfter = function () {
    var hot = document.getElementById('s-hot'), dry = document.getElementById('s-dry');
    if (!hot || !dry) return;
    hot.addEventListener('input', function () { S.scen.hot = parseFloat(hot.value); window.updateRotScores(); });
    dry.addEventListener('input', function () { S.scen.dry = parseInt(dry.value, 10); window.updateRotScores(); });
  };

  /* actions */
  var prevAct = Screens.act;
  Screens.act = function (a, arg, el) {
    if (prevAct) prevAct(a, arg, el);
    if (a === 'iChoose') {
      S.chosen = arg; D.save(); toast(t('chosen'));
      App.go('report');
    }
    if (a === 'lightInfo') {
      var l = D.lights.filter(function (x) { return x.id === arg; })[0];
      if (l) { speakText(tx(l.name) + '. ' + tx(l.say)); toast(tx(l.name) + ' · ' + tx(l.val)); }
    }
    if (a === 'goal') {
      var i = S.goals.indexOf(arg);
      if (i > -1) S.goals.splice(i, 1); else if (S.goals.length < 3) S.goals.push(arg);
      else toast(t('prioritiesQ'));
      D.save(); App.render();
    }
    if (a === 'con') {
      var parts = (el && el.dataset.con) || arg.split(':')[0];
      S.cons[parts] = (el && el.dataset.arg) || arg.split(':')[1];
      D.save(); App.render();
    }
  };
})();
