/* ============================================================
   Mazra'a — technician dashboard: KPIs, map, analytics
   ============================================================ */
(function () {
  var Dash = window.Dash = window.Dash || {};
  var S = window.S;
  Dash.state = { layer: 'rain', year: 2025, swipe: 55, scen: { hot: 0, dry: 0 }, cluster: true };

  function st() { return Dash.state; }

  /* ---------- colour helpers ---------- */
  function lerp(a, b, t) {
    var pa = hex(a), pb = hex(b);
    return 'rgb(' + pa.map(function (v, i) { return Math.round(v + (pb[i] - v) * t); }).join(',') + ')';
  }
  function hex(h) {
    h = h.replace('#', '');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function scale(v, min, max, c1, c2) {
    var t = Math.max(0, Math.min(1, (v - min) / (max - min)));
    return lerp(c1, c2, t);
  }

  function layerValue(c, layer, scen) {
    var hot = scen.hot, dry = scen.dry;
    if (layer === 'rain') return c.rain - dry * 3.2;
    if (layer === 'ndvi') return c.ndvi - dry * 0.004 - hot * 0.02;
    if (layer === 'slope') return c.slope;
    return c.soil - dry * 0.002;
  }
  function layerColor(v, layer) {
    if (layer === 'rain') return scale(v, 270, 480, '#C9A882', '#5C775C');
    if (layer === 'ndvi') return scale(v, 0.24, 0.54, '#C9A882', '#5C775C');
    if (layer === 'slope') return scale(v, 6, 27, '#93A78C', '#8A5A3B');
    return scale(v, 0.10, 0.28, '#DCC3A4', '#7C9A9C');
  }
  function layerLabel(layer) {
    return { rain: t('layerRain'), ndvi: t('layerNdvi'), slope: t('layerSlope'), soil: t('layerSoil') }[layer];
  }

  /* ---------- geometry ---------- */
  function blob(cx, cy, r, seed) {
    var pts = [], n = 10;
    function rnd(i) { var x = Math.sin(seed * 97 + i * 57.3) * 10000; return x - Math.floor(x); }
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2, rr = r * (0.76 + rnd(i) * 0.44);
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.84]);
    }
    function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
    var m0 = mid(pts[0], pts[1]);
    var d = 'M' + m0[0].toFixed(1) + ' ' + m0[1].toFixed(1);
    for (var i = 1; i <= n; i++) {
      var p = pts[i % n], q = pts[(i + 1) % n];
      var m = mid(p, q);
      d += ' Q' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' ' + m[0].toFixed(1) + ' ' + m[1].toFixed(1);
    }
    return d + 'Z';
  }
  function farmPos(f, c) {
    var k = parseInt(f.id.replace(/\D/g, ''), 10);
    var a = (k % 360) * Math.PI / 180, rr = c.r * 0.2 + (k % 7) * c.r * 0.07;
    return [c.cx + Math.cos(a) * rr, c.cy + Math.sin(a) * rr * 0.82];
  }
  function communeOf(id) { return D.communes.filter(function (c) { return c.id === id; })[0]; }

  /* ---------- KPI ---------- */
  function kpiCard(k) {
    var val = k.value, note = k.note;
    var hot = st().scen.hot, dry = st().scen.dry;
    if (k.id === 'risk') val = String(Math.min(48, Math.round(23 + hot * 5 + dry * 0.5)));
    if (k.id === 'rain') { val = String(Math.round(21 + hot * 1.5 + dry * 0.4)); note = t('trendVs'); }
    if (k.id === 'bare') { val = String(Math.min(72, Math.round(38 + dry * 0.6))); note = 'NDVI ' + (0.31 - dry * 0.002).toFixed(2); }
    if (k.id === 'waiting') val = String(Math.max(3, Math.round(9 + hot)));
    if (k.id === 'farms') val = '142';
    var arrow = k.dir === 'up' ? '▲' : k.dir === 'down' ? '▼' : '■';
    var cls = k.dir;
    return '<article class="kpi"><div class="k-lab">' + esc(t(k.label)) + '</div>' +
      '<div class="k-val">' + esc(val) + (k.unit ? '<small>' + esc(k.unit) + '</small>' : '') + '</div>' +
      '<span class="k-trend ' + cls + '">' + arrow + ' ' + esc(k.trend) + '</span>' +
      '<div class="k-note">' + esc(note) + '</div></article>';
  }

  /* ---------- map ---------- */
  function mapSvg() {
    var s = st(), scen = s.scen;
    var W = 640, H = 380;
    var farms = D.farms;
    var byCommune = {};
    farms.forEach(function (f) { (byCommune[f.commune] = byCommune[f.commune] || []).push(f); });

    var polys = D.communes.map(function (c, i) {
      var v = layerValue(c, s.layer, scen);
      var col = layerColor(v, s.layer);
      var d = blob(c.cx, c.cy, c.r, i + 3);
      return '<g class="cblob"><path d="' + d + '" fill="' + col + '" stroke="#FBF7F1" stroke-width="2.5" opacity=".92"/>' +
        '<text x="' + c.cx + '" y="' + (c.cy - c.r * 0.55) + '" text-anchor="middle" font-size="9.5" font-weight="700" fill="#3B2A21" opacity=".75">' + esc(c.name) + '</text></g>';
    }).join('');

    // contour decorations
    var contours = '';
    for (var k = 0; k < 7; k++) {
      contours += '<path d="M' + (-40 + k * 18) + ' ' + (300 + k * 12) + 'c90-40 190-50 300-18 80 24 160 22 240 4" fill="none" stroke="#C9B89F" stroke-width="1" opacity=".45"/>';
    }
    var river = '<path d="M60 40c60 50 40 110 110 150 60 34 150 30 210 80" fill="none" stroke="#9FB6A0" stroke-width="5" opacity=".55" stroke-linecap="round"/>';

    var pins = '';
    farms.forEach(function (f) {
      var c = communeOf(f.commune);
      var p = farmPos(f, c);
      var col = f.risk === 'high' ? '#A8503F' : f.risk === 'mid' ? '#B98432' : '#6F8A63';
      pins += '<g class="mpin" data-farm="' + f.id + '" tabindex="0" role="button" aria-label="' + esc(f.id) + '">' +
        '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (f.risk === 'high' ? 8 : 6.4) + '" fill="' + col + '" stroke="#FBF7F1" stroke-width="2"/>' +
        '</g>';
    });

    // clusters
    var clusters = '';
    if (s.cluster) {
      D.communes.forEach(function (c) {
        var list = byCommune[c.id] || [];
        if (list.length >= 3) {
          var high = list.filter(function (f) { return f.risk === 'high'; }).length;
          clusters += '<g class="mcluster" data-commune="' + c.id + '" tabindex="0" role="button" aria-label="' + esc(c.name) + '">' +
            '<rect x="' + (c.cx + c.r * 0.42) + '" y="' + (c.cy + c.r * 0.48) + '" width="30" height="20" rx="10" fill="#FBF7F1" stroke="#DCCDBB"/>' +
            '<text x="' + (c.cx + c.r * 0.42 + 15) + '" y="' + (c.cy + c.r * 0.48 + 14) + '" text-anchor="middle" font-size="10" font-weight="800" fill="' + (high ? '#8A3A2C' : '#5C775C') + '">' + list.length + '</text></g>';
        }
      });
    }

    var reportPins = farms.filter(function (f) { return f.reports > 0; }).map(function (f) {
      var c = communeOf(f.commune), p = farmPos(f, c);
      return '<g class="mpin" data-farm="' + f.id + '" tabindex="0"><circle cx="' + (p[0] + 9) + '" cy="' + (p[1] - 9) + '" r="5" fill="#3B2A21"/>' +
        '<circle cx="' + (p[0] + 9) + '" cy="' + (p[1] - 9) + '" r="2" fill="#FBF7F1"/></g>';
    }).join('');

    var before = D.communes.map(function (c, i) {
      var v = layerValue({ rain: c.rain + 90, ndvi: c.ndvi + 0.06, slope: c.slope, soil: c.soil + 0.03 }, s.layer, { hot: 0, dry: 0 });
      return '<path d="' + blob(c.cx, c.cy, c.r, i + 3) + '" fill="' + layerColor(v, s.layer) + '" stroke="#F6EFE4" stroke-width="1.5" opacity=".55"/>';
    }).join('');

    var clipW = (s.swipe / 100) * W;
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(t('mapHint')) + '">' +
      '<defs><clipPath id="beforeClip"><rect id="clipRect" x="0" y="0" width="' + clipW + '" height="' + H + '"/></clipPath>' +
      '<linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F7F1E7"/><stop offset="100%" stop-color="#EDE3D4"/></linearGradient></defs>' +
      '<rect width="' + W + '" height="' + H + '" fill="url(#skyGrad)"/>' + contours + river +
      '<g id="map-after">' + polys + pins + clusters + reportPins + '</g>' +
      '<g clip-path="url(#beforeClip)" opacity=".75">' + before + '</g>' +
      '<line id="swipeLine" x1="' + clipW + '" y1="0" x2="' + clipW + '" y2="' + H + '" stroke="#FBF7F1" stroke-width="3"/>' +
      '<text x="12" y="' + (H - 12) + '" font-size="10" fill="#6E5B4B">2005</text>' +
      '<text x="' + (W - 46) + '" y="' + (H - 12) + '" font-size="10" fill="#6E5B4B">' + s.year + '</text>' +
      '</svg>';
  }

  function mapPanel() {
    var s = st();
    var layers = ['rain', 'ndvi', 'slope', 'soil'].map(function (l) {
      return '<button class="lay-btn ' + (s.layer === l ? 'on' : '') + '" data-act="layer" data-arg="' + l + '">' + esc(layerLabel(l)) + '</button>';
    }).join('');
    return '<section class="panel db-map-panel">' +
      '<div class="panel-head"><h3>' + esc(t('mapLayers')) + '</h3>' +
      '<span class="tag warn" style="font-size:10px">' + esc(t('example')) + '</span>' +
      '<div class="right"><div class="map-toolbar">' + layers + '</div>' +
      '<button class="lay-btn ' + (s.cluster ? 'on' : '') + '" data-act="cluster">' + esc(tx(m('Clusters', 'Groupes', 'التجميع', 'التجميع'))) + '</button></div></div>' +
      '<div class="panel-body">' +
      '<div class="map-frame">' + mapSvg() +
      '<div class="map-overlay-ui"><span class="map-chip">' + esc(layerLabel(s.layer)) + ' · ' + s.year + '</span>' +
      '<span class="map-chip">' + esc(t('scenarioOv')) + ': +' + s.scen.hot.toFixed(1) + ' °C · −' + s.scen.dry + '%</span></div>' +
      '</div>' +
      '<div class="cropbar">' + esc(t('swipe')) +
      '<input type="range" min="0" max="100" value="' + s.swipe + '" id="swipe" aria-label="' + esc(t('swipe')) + '">' +
      '<span class="tiny">2005 / ' + s.year + '</span></div>' +
      '<div class="cropbar">' + esc(t('timeLabel')) +
      '<input type="range" min="2005" max="2025" step="1" value="' + s.year + '" id="year" aria-label="' + esc(t('timeLabel')) + '">' +
      '<b class="tiny" style="color:var(--dark)">' + s.year + '</b></div>' +
      '<div class="map-legend"><span><i style="background:#A8503F"></i>' + esc(tx(m('High risk', 'Risque élevé', 'خطر عالٍ', 'خطر عالي'))) + '</span>' +
      '<span><i style="background:#B98432"></i>' + esc(t('medium')) + '</span>' +
      '<span><i style="background:#6F8A63"></i>' + esc(t('low')) + '</span>' +
      '<span><i style="background:#3B2A21;border-radius:50%"></i>' + esc(t('reportPanel')) + '</span>' +
      '<span class="tiny">' + esc(t('mapHint')) + '</span></div>' +
      '</div></section>';
  }

  /* ---------- charts ---------- */
  function lineChart(vals, labels, color, fmt) {
    var W = 300, H = 104, pad = 6;
    var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
    var span = (max - min) || 1;
    var pts = vals.map(function (v, i) {
      var x = pad + (i / (vals.length - 1)) * (W - pad * 2);
      var y = H - pad - ((v - min) / span) * (H - pad * 2);
      return [x, y];
    });
    var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    var area = line + ' L' + (W - pad) + ' ' + H + ' L' + pad + ' ' + H + ' Z';
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' +
      '<path d="' + area + '" fill="' + color + '" opacity=".12"/>' +
      '<path d="' + line + '" fill="none" stroke="' + color + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<circle cx="' + pts[pts.length - 1][0].toFixed(1) + '" cy="' + pts[pts.length - 1][1].toFixed(1) + '" r="3.4" fill="' + color + '"/>' +
      '<text x="' + pad + '" y="' + (H - 0.5) + '">' + labels[0] + '</text>' +
      '<text x="' + (W - 26) + '" y="' + (H - 0.5) + '">' + labels[1] + '</text>' +
      '<text x="' + pad + '" y="10">' + (max + (fmt ? fmt : '')) + '</text>' +
      '</svg>';
  }
  function barChart(vals, color) {
    var W = 300, H = 96, pad = 4, n = vals.length;
    var max = Math.max.apply(null, vals), min = Math.min.apply(null, vals);
    var bw = (W - pad * 2) / n * 0.7;
    var bars = vals.map(function (v, i) {
      var h = ((v - min * 0.6) / (max - min * 0.6 || 1)) * (H - 18);
      var x = pad + (i / n) * (W - pad * 2);
      return '<rect x="' + x.toFixed(1) + '" y="' + (H - 12 - h).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(2, h).toFixed(1) + '" rx="2" fill="' + (i === n - 1 ? color : '#C9B89F') + '"/>';
    }).join('');
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + bars +
      '<text x="' + pad + '" y="' + (H - 1) + '">2005</text><text x="' + (W - 26) + '" y="' + (H - 1) + '">2025</text></svg>';
  }

  function chartPanel(title, body, note) {
    return '<section class="panel"><div class="panel-head"><h3>' + esc(title) + '</h3>' +
      '<div class="right"><span class="tag ghost" style="font-size:10px">NASA POWER</span></div></div>' +
      '<div class="panel-body">' + body + (note ? '<p class="tiny mt8">' + esc(note) + '</p>' : '') + '</div></section>';
  }

  function analytics() {
    var s = D.series;
    var yl = [String(s.years[0]), String(s.years[s.years.length - 1])];
    var rain = lineChart(s.rain, yl, '#7C9375');
    var temp = lineChart(s.tempAnom, yl, '#B98432');
    var first = lineChart(s.firstRain, yl, '#8A5A3B');
    var ndvi = lineChart(s.ndviMonth, ['J', 'D'], '#5C775C');
    var heat = barChart(s.heatDays, '#A8503F');
    var dry = barChart(s.dryMax, '#B98432');

    var riskBars = D.communes.slice(0, 8).map(function (c) {
      var tot = c.high + c.mid + c.low;
      var h = Math.round(c.high / tot * 100), m = Math.round(c.mid / tot * 100), l = 100 - h - m;
      return '<div class="br"><span>' + esc(c.name) + '</span><span class="track" style="display:flex">' +
        '<i style="width:' + h + '%;background:#A8503F"></i><i style="width:' + m + '%;background:#B98432"></i><i style="width:' + l + '%;background:#6F8A63"></i>' +
        '</span><b style="text-align:end;color:var(--dark)">' + c.high + '</b></div>';
    }).join('');

    return '<div class="db-grid">' +
      mapPanel() +
      '<div class="db-side">' +
      (Dash.alertsView ? Dash.alertsView() : '') +
      (Dash.inboxView ? Dash.inboxView() : '') +
      '</div>' +
      '<div class="db-half">' + chartPanel(tx(m('Rain per year', 'Pluie annuelle', 'المطر السنوي', 'الشتا فالعام')), rain,
        tx(m('Autumn rain delay against the 20-year average: +21 days.', 'Retard des pluies d’automne : +21 jours.', 'تأخر أمطار الخريف: +21 يومًا.', 'تأخر شتا الخريف: +21 يوم.'))) + '</div>' +
      '<div class="db-half">' + chartPanel(tx(m('First autumn rain date', 'Date de la 1re pluie d’automne', 'تاريخ أول مطر خريفي', 'تاريخ أول شتا فالخريف')), first,
        tx(m('12 October in 2005 → 2 November in 2025: later each year.', '12 octobre 2005 → 2 novembre 2025 : plus tard chaque année.', '12 أكتوبر 2005 ← 2 نونبر 2025: متأخر كل سنة.', '12 أكتوبر 2005 ← 2 نونبر 2025: متأخر كل عام.'))) + '</div>' +
      '<div class="db-third">' + chartPanel(tx(m('Heat days above 35 °C', 'Jours > 35 °C', 'أيام فوق 35 °م', 'أيام فوق 35 °م')), heat,
        tx(m('8 days in 2005, 28 days in 2025.', '8 jours en 2005, 28 en 2025.', '8 أيام في 2005 و28 في 2025.', '8 أيام فـ2005 و28 فـ2025.'))) + '</div>' +
      '<div class="db-third">' + chartPanel(tx(m('Longest dry spell', 'Plus longue sécheresse', 'أطول فترة جفاف', 'أطول فترة جفاف')), dry,
        tx(m('From 21 to 38 days in 20 years.', 'De 21 à 38 jours en 20 ans.', 'من 21 إلى 38 يومًا في 20 سنة.', 'من 21 لـ38 يوم فـ20 سنة.'))) + '</div>' +
      '<div class="db-third">' + chartPanel(tx(m('NDVI seasonal curve', 'Courbe saisonnière NDVI', 'منحنى NDVI الموسمي', 'منحنى NDVI الموسمي')), ndvi,
        tx(m('Green peak in May, stress in July, bare in August–October.', 'Pic en mai, stress en juillet, sol nu d’août à octobre.', 'ذروة في ماي، إجهاد في يوليوز، عارية من غشت إلى أكتوبر.', 'الذروة فماي، إجهاد فيوليوز، عارية من غشت لأكتوبر.'))) + '</div>' +
      '<div class="db-half">' + chartPanel(tx(m('Temperature anomaly', 'Anomalie de température', 'شذوذ الحرارة', 'شذوذ الحرارة')), temp, '+1.35 °C in 2025 vs the 2005 baseline.') + '</div>' +
      '<div class="db-half"><section class="panel"><div class="panel-head"><h3>' + esc(tx(m('Risk by commune', 'Risque par commune', 'الخطر حسب الجماعة', 'الخطر حسب الجماعة'))) + '</h3></div>' +
      '<div class="panel-body"><div class="bars-risk">' + riskBars + '</div>' +
      '<p class="tiny mt8">' + esc(tx(m('High-risk farms (red), in the selected commune.', 'Fermes à risque élevé (rouge).', 'المزارع عالية الخطر (أحمر).', 'الضيعات عالية الخطر (حمر).'))) + '</p></div></section></div>' +

      (Dash.tableView ? Dash.tableView() : '') +

      '<div class="db-full"><section class="panel"><div class="panel-head"><h3>' + esc(t('sourcesLimits')) + '</h3>' +
      '<span class="tag" style="font-size:10px">' + esc(t('confidence')) + ' · ' + esc(t('example')) + '</span></div>' +
      '<div class="panel-body">' + (Dash.sourcesView ? Dash.sourcesView() : '') + '</div></section></div>' +
      '</div>';
  }

  /* ---------- shell ---------- */
  Dash.render = function () {
    document.body.classList.add('db-mode');
    var app = document.getElementById('app');
    var s = st();
    var langBtns = D.langs.map(function (l) {
      return '<button data-act="dlang" data-arg="' + l.id + '" class="' + (D.lang === l.id ? 'on' : '') + '" lang="' + l.id + '">' + l.label + '</button>';
    }).join('');

    app.innerHTML = '<div class="db">' +
      '<header class="db-top">' +
      '<a class="brandline" href="#/home" style="text-decoration:none">' + brand(42, esc(t('dashboard'))) + '</a>' +
      '<span class="db-title">' + esc(tx(m('Chefchaouen pilot zone', 'Zone pilote de Chefchaouen', 'منطقة شفشاون التجريبية', 'منطقة شفشاون التجريبية'))) + '</span>' +
      '<span class="tag warn">' + esc(t('example')) + '</span>' +
      '<span class="spacer"></span>' +
      '<div class="seg">' + langBtns + '</div>' +
      '<button class="btn ghost tinybtn" data-act="dexport">' + esc(t('exportCsv')) + '</button>' +
      '<button class="btn ghost tinybtn" data-act="dprint">' + icon('print') + esc(t('exportPdf')) + '</button>' +
      '<button class="icon-btn bare" data-act="chat" aria-label="' + esc(t('gharss')) + '" title="' + esc(t('gharss')) + '"><img src="assets/img/gharss.svg" width="40" height="40" style="border-radius:50%;display:block;background:#FBF7F1" alt=""></button>' +
      '<button class="btn secondary tinybtn" data-act="dback">' + icon('arrowL') + esc(t('farmerApp')) + '</button>' +
      (window.Account ? Account.button() : '') +
      '</header>' +
      '<div class="db-wrap">' +
      '<div class="row-between" style="flex-wrap:wrap;gap:10px">' +
      '<div><h1 class="h1" style="font-size:24px">' + esc(tx(m('Technician control room', 'Salle de contrôle du technicien', 'غرفة تحكم التقني', 'غرفة تحكم التقني'))) + '</h1>' +
      '<p class="small">' + esc(tx(m('One source of truth: the same API feeds the farmer app and this dashboard.', 'Une seule source : la même API alimente l’app et ce tableau.', 'مصدر واحد: نفس الواجهة تغذي التطبيق وهذه اللوحة.', 'مصدر واحد: نفس الواجهة كتغذي التطبيق وهاد اللوحة.'))) + '</p></div>' +
      '<div class="map-toolbar"><span class="tiny">' + esc(t('scenarioOv')) + '</span>' +
      '<button class="lay-btn ' + (s.scen.hot ? 'on' : '') + '" data-act="dscen" data-arg="hot">+1.5 °C</button>' +
      '<button class="lay-btn ' + (s.scen.dry ? 'on' : '') + '" data-act="dscen" data-arg="dry">−15 %</button>' +
      '<button class="lay-btn" data-act="dscen" data-arg="reset">' + esc(tx(m('Reset', 'Réinitialiser', 'إعادة', 'عاود'))) + '</button></div>' +
      '</div>' +
      '<div class="kpi-row mt14">' + D.kpis.map(kpiCard).join('') + '</div>' +
      analytics() +
      '</div></div>';

    attach();
  };

  function attach() {
    var app = document.getElementById('app');
    app.querySelectorAll('.mpin').forEach(function (g) {
      g.addEventListener('click', function () { if (Dash.openDrawer) Dash.openDrawer(g.dataset.farm); });
    });
    app.querySelectorAll('.mcluster').forEach(function (g) {
      g.addEventListener('click', function () { if (Dash.filterCommune) Dash.filterCommune(g.dataset.commune); });
    });
    var sw = document.getElementById('swipe'), yr = document.getElementById('year');
    if (sw) sw.addEventListener('input', function () {
      st().swipe = +sw.value;
      var rect = document.getElementById('clipRect'), line = document.getElementById('swipeLine');
      var w = (st().swipe / 100) * 640;
      if (rect) rect.setAttribute('width', w);
      if (line) { line.setAttribute('x1', w); line.setAttribute('x2', w); }
    });
    if (yr) yr.addEventListener('input', function () { st().year = +yr.value; Dash.render(); });
    if (Dash.bindTable) Dash.bindTable();
  }

  Dash.act = function (a, arg) {
    if (a === 'layer') { st().layer = arg; Dash.render(); }
    if (a === 'cluster') { st().cluster = !st().cluster; Dash.render(); }
    if (a === 'dlang') { switchLang(arg); Dash.render(); return; }
    if (a === 'dprint') { window.print(); return; }
    if (a === 'dback') { App.go('home'); return; }
    if (a === 'chat') { openChat(); return; }
    if (a === 'dscen') {
      if (arg === 'reset') st().scen = { hot: 0, dry: 0 };
      else if (arg === 'hot') st().scen.hot = st().scen.hot ? 0 : 1.5;
      else st().scen.dry = st().scen.dry ? 0 : 15;
      Dash.render(); return;
    }
    if (a === 'dexport') { Dash.exportCsv(); return; }
    if (Dash.actMore) Dash.actMore(a, arg);
  };

  Dash.exportCsv = function () {
    var rows = [['farm', 'commune', 'crop', 'risk', 'confidence', 'slope_pct', 'ndvi', 'area_ha', 'reports', 'recommended', 'farmer_vs_satellite', 'last_report']];
    D.farms.forEach(function (f) {
      rows.push([f.id, communeOf(f.commune).name, f.crop, f.risk, f.conf, f.slope, f.ndvi, f.area, f.reports, f.rec, f.agree ? 'agree' : 'differ', f.date]);
    });
    var csv = rows.map(function (r) { return r.join(','); }).join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mazraa-farms-chefchaouen.csv';
    document.body.appendChild(a); a.click(); a.remove();
    toast(t('exportCsv') + ' ✓');
  };

  Dash.communeOf = communeOf;
  Dash.farmPos = farmPos;
  Dash.mapSvg = mapSvg;
})();
