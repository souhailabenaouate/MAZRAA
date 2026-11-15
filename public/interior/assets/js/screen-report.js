/* ============================================================
   Mazra'a — farm report and alerts
   ============================================================ */
(function () {
  var S = window.S;
  var Screens = window.Screens = window.Screens || {};

  function backBtn(route, label) {
    return '<button class="btn ghost tinybtn" data-go="' + route + '">' + icon('arrowL') + esc(label || t('back')) + '</button>';
  }
  function lightRow(l) {
    var color = l.state === 'bad' ? 'var(--bad)' : l.state === 'warn' ? 'var(--warn)' : 'var(--good)';
    return '<div class="kv"><span><i style="display:inline-block;width:9px;height:9px;border-radius:50%;background:' + color + ';margin-inline-end:7px"></i>' + esc(tx(l.name)) + '</span>' +
      '<span style="text-align:end;max-width:66%;font-size:11.5px">' + esc(tx(l.say)) + '</span></div>';
  }

  Screens.report = function () {
    var chosen = S.chosen ? D.rotations.filter(function (r) { return r.id === S.chosen; })[0] : null;
    var goals = S.goals.map(function (g) {
      var gg = D.priorities.goals.filter(function (x) { return x.id === g; })[0];
      return esc(tx(gg.label));
    }).join(' · ') || esc(tx(m('Not chosen yet', 'Pas encore choisi', 'لم يُختر بعد', 'مازال ما تختارش')));

    var strategies = D.rotations.map(function (r) {
      return '<div class="paper-sec" style="border-top:1px dotted #E5D8C7;padding-top:8px">' +
        '<div class="row-between"><b style="font-size:13px">' + esc(tx(r.name)) + '</b>' +
        '<span class="tiny">' + esc(r.chain.map(function (c) { return tx(D.crops[c].name); }).join(' → ')) + '</span></div>' +
        '<p class="tiny mt8">' + esc(tx(r.why)) + '</p>' +
        '<p class="tiny"><b>' + esc(t('gaps')) + ':</b> ' + esc(tx(r.gaps)) + '</p></div>';
    }).join('');

    var summary = tx(m('Farm report. Part one: the four lights for water, heat, plants and erosion, and the soil health indicator. Part two: my priorities. Part three: the three rotations, with their evidence and their gaps. Part four: my choice. Part five: the data sources and their dates. End: satellites do not see practices, disease or the local market. Validate with a local expert.',
      'Rapport de ferme. Les quatre feux, mes priorités, les trois rotations avec preuves et lacunes, mon choix, les sources et le cadre des limites.',
      'تقرير المزرعة. أولًا: الأضواء الأربعة للماء والحرارة والنباتات والانجراف، ومؤشر صحة التربة. ثانيًا: أولوياتي. ثالثًا: ثلاث دورات مع أدلتها وثغراتها. رابعًا: اختياري. خامسًا: مصادر البيانات وتواريخها. وأخيرًا: السواتل لا ترى الممارسات ولا الأمراض ولا السوق المحلي. تحقق مع خبير محلي.',
      'تقرير المزرعة. أولًا: الضواو الأربعة للما والسخانة والنباتات والانجراف، ومؤشر صحة التراب. ثانيًا: الأولويات ديالي. ثالثًا: ثلاث دورات مع الأدلة والثغرات. رابعًا: الاختيار ديالي. خامسًا: مصادر الداتا والتواريخ. وأخيرًا: الساتلات ما كتشوفوش الممارسات ولا الأمراض ولا السوق المحلي.'));
    window._reportSummary = summary;

    return '<main class="screen stack">' +
      '<div class="row-between no-print">' + backBtn('rotations', t('rotations')) + audioBtn(summary) + '</div>' +
      '<div class="no-print"><h2 class="h1">' + esc(t('reportTitle')) + '</h2><p class="lead">' + esc(t('reportSub')) + '</p></div>' +

      '<div class="paper" id="print-area">' +
      '<div class="paper-head"><img class="paper-logo" src="assets/img/logo-mark.png" alt="Mazra\'a">' +
      '<div><div class="paper-title">Mazra\'a · ' + esc(t('reportTitle')) + '</div>' +
      '<div class="tiny">' + esc(tx(D.farm.name)) + ' · ' + esc(tx(D.farm.commune)) + ' · ' + D.farm.area + ' ha · 13 Nov 2026</div></div></div>' +

      '<div class="paper-sec"><h4>1 · ' + esc(t('lightsTitle')) + '</h4>' + D.lights.map(lightRow).join('') +
      '<div class="kv"><span>' + esc(t('soilHealth')) + '</span><span>' + esc(tx(D.soil.label)) + ' · ' + esc(t('confidence')) + ' ' + esc(t('medium')) + '</span></div></div>' +

      '<div class="paper-sec"><h4>2 · ' + esc(t('priorities')) + '</h4>' +
      '<p class="tiny"><b>' + esc(t('goals')) + ':</b> ' + goals + '</p>' +
      '<p class="tiny"><b>' + esc(t('limits')) + ':</b> ' + esc(t(S.cons.water === 'rain' ? 'waterRain' : S.cons.water === 'well' ? 'waterWell' : 'waterIrr')) + ' · ' +
      esc(tx(D.priorities.cons[1].opts.filter(function (o) { return o.id === S.cons.equip; })[0].label)) + '</p></div>' +

      '<div class="paper-sec"><h4>3 · ' + esc(t('rotTitle')) + '</h4>' + strategies + '</div>' +

      '<div class="paper-sec"><h4>4 · ' + esc(t('myChoice')) + '</h4>' +
      '<p class="tiny">' + (chosen ? esc(chosen.chain.map(function (c) { return tx(D.crops[c].name); }).join(' → ')) : '—') + '</p>' +
      (S.saved.length ? '<p class="tiny"><b>' + esc(t('help')) + ':</b> ' + esc(S.saved.map(function (id) { return D.sol[id] ? tx(D.sol[id].title) : ''; }).join(' · ')) + '</p>' : '') +
      '</div>' +

      '<div class="paper-sec"><h4>5 · ' + esc(t('dataDates')) + '</h4>' +
      '<p class="tiny">NASA POWER 2005–2025 · MODIS NDVI 2000–2025 · SRTM slope 30 m · GPM IMERG 2000–2025 · SMAP 2015–2025 (optional) · ' +
      esc(tx(m('crop sheets INRA Morocco, FAO, ORMVA', 'fiches INRA Maroc, FAO, ORMVA', 'بطاقات INRA المغرب وFAO وORMVA', 'بطاقات INRA المغرب وFAO وORMVA'))) + '</p>' +
      '<p class="tiny">' + esc(tx(m('7 of 10 farms near you chose the resilient rotation (example data, pilot zone).', '7 fermes sur 10 près de vous ont choisi la rotation résiliente (données d’exemple).', '7 من 10 مزارع قريبة اختارت الدورة المرنة (بيانات مثال).', '7 من 10 ضيعات قريبة ختارو الدورة القوية (داتا مثال).'))) + '</p></div>' +

      '<div class="limits"><b>6 · ' + esc(t('limits')) + '</b><br>' + esc(t('limitsBox')) + '</div>' +
      '</div>' +

      '<div class="btn-row no-print"><button class="btn" data-act="print">' + icon('download') + esc(t('downloadPdf')) + '</button>' +
      '<button class="btn secondary" data-act="wa">' + icon('share') + esc(t('shareWa')) + '</button></div>' +
      '<button class="btn ghost block no-print" data-act="reportAudio">' + icon('speaker') + esc(t('audioSummary')) + '</button>' +
      '<p class="tiny no-print" style="text-align:center">' + esc(tx(m('The PDF is generated from the same results as the screens, so the numbers always match. It works offline from saved data.', 'Le PDF vient des mêmes résultats que les écrans, donc les chiffres correspondent. Fonctionne hors ligne.', 'يُولَّد PDF من نفس النتائج، فالأرقام متطابقة. يعمل دون اتصال.', 'PDF كيتولد من نفس النتائج، فالأرقام متطابقة. كيخدم بلا شبكة.'))) + '</p>' +
      '</main>';
  };

  /* ---------------- alerts ---------------- */
  Screens.alerts = function () {
    var kinds = [{ id: 'all', label: t('filterAll') }, { id: 'heat', label: t('heat') }, { id: 'dry', label: t('dry') }, { id: 'storm', label: t('storm') }];
    var list = D.alerts.filter(function (a) { return S.alertFilter === 'all' || a.kind === S.alertFilter; });
    var chips = kinds.map(function (k) {
      return '<button class="chip ' + (S.alertFilter === k.id ? 'on' : '') + '" data-act="alertFilter" data-arg="' + k.id + '">' + esc(k.label) + '</button>';
    }).join('');
    var cards = list.map(function (a) {
      return '<article class="alert-card ' + (a.state === 'bad' ? 'bad' : '') + '">' +
        '<div class="a-top"><span class="a-ic">' + icon(a.kind === 'heat' ? 'sun' : a.kind === 'storm' ? 'alert' : 'water') + '</span>' +
        '<div style="flex:1"><div class="a-t">' + esc(tx(a.title)) + '</div><div class="tiny">' + esc(tx(a.date)) + '</div></div>' +
        audioBtn(tx(a.title) + '. ' + tx(a.text)) + '</div>' +
        '<p class="a-d">' + esc(tx(a.text)) + '</p>' +
        '<span class="tag warn">' + esc(t('alertTrend')) + '</span></article>';
    }).join('');
    return '<main class="screen stack">' +
      '<div class="row-between">' + backBtn('home', t('home')) + audioBtn(t('alertsTitle') + '. ' + t('alertNote')) + '</div>' +
      '<div><h2 class="h1">' + esc(t('alertsTitle')) + '</h2><p class="lead">' + esc(t('alertNote')) + '</p></div>' +
      '<div class="filters">' + chips + '</div>' +
      '<div class="stack">' + cards + '</div>' +
      '<div class="limits"><b>' + esc(t('alertTrend')) + ':</b> ' + esc(t('alertNote')) + ' ' + esc(tx(m('Source: NASA POWER 2005–2025, GPM IMERG, MODIS NDVI.', 'Source : NASA POWER 2005–2025, GPM IMERG, MODIS NDVI.', 'المصدر: NASA POWER 2005–2025 وGPM IMERG وMODIS NDVI.', 'المصدر: NASA POWER 2005–2025 وGPM IMERG وMODIS NDVI.'))) + '</div>' +
      '</main>';
  };

  var prevAct = Screens.act;
  Screens.act = function (a, arg, el) {
    if (prevAct) prevAct(a, arg, el);
    if (a === 'alertFilter') { S.alertFilter = arg; App.render(); }
    if (a === 'reportAudio') {
      speakText(window._reportSummary || t('reportTitle'));
    }
  };
})();
