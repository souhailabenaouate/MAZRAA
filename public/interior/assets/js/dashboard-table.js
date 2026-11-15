/* ============================================================
   Mazra'a — dashboard: farm table, drawer, inbox, alerts, sources
   ============================================================ */
(function () {
  var Dash = window.Dash = window.Dash || {};
  var S = window.S;
  Dash.tstate = { q: '', commune: 'all', crop: 'all', risk: 'all', sort: 'risk', dir: -1 };

  var RISK_ORDER = { high: 3, mid: 2, low: 1 };
  var cropName = function (k) { return D.crops[k] ? tx(D.crops[k].name) : k; };

  function filtered() {
    var s = Dash.tstate;
    var list = D.farms.filter(function (f) {
      if (s.commune !== 'all' && f.commune !== s.commune) return false;
      if (s.crop !== 'all' && f.crop !== s.crop) return false;
      if (s.risk !== 'all' && f.risk !== s.risk) return false;
      if (s.q) {
        var q = s.q.toLowerCase();
        var cname = Dash.communeOf(f.commune).name.toLowerCase();
        if (f.id.toLowerCase().indexOf(q) < 0 && cname.indexOf(q) < 0 && f.crop.indexOf(q) < 0) return false;
      }
      return true;
    });
    list.sort(function (a, b) {
      var k = s.sort, va, vb;
      if (k === 'risk') { va = RISK_ORDER[a.risk]; vb = RISK_ORDER[b.risk]; }
      else if (k === 'commune') { va = Dash.communeOf(a.commune).name; vb = Dash.communeOf(b.commune).name; }
      else if (k === 'crop') { va = a.crop; vb = b.crop; }
      else { va = a[k]; vb = b[k]; }
      if (va < vb) return -1 * s.dir;
      if (va > vb) return 1 * s.dir;
      return 0;
    });
    return list;
  }

  function confBars(n) {
    return '<span class="conf-bars">' + [1, 2, 3].map(function (i) {
      return '<i class="' + (i <= n ? 'on' : '') + '" style="height:' + (4 + i * 3) + 'px"></i>';
    }).join('') + '</span>';
  }

  function rowsHtml() {
    var list = filtered();
    if (!list.length) return '<tr><td colspan="9" class="empty">' + esc(t('noResults')) + '</td></tr>';
    return list.map(function (f) {
      return '<tr data-open="' + f.id + '">' +
        '<td><b>' + esc(f.id) + '</b><div class="tiny">' + esc(tx(m('name hidden until consent', 'nom masqué sans accord', 'الاسم مخفي دون موافقة', 'الاسم مخفي بلا موافقة'))) + '</div></td>' +
        '<td>' + esc(Dash.communeOf(f.commune).name) + '</td>' +
        '<td>' + esc(cropName(f.crop)) + '</td>' +
        '<td><span class="risk-pill ' + f.risk + '">' + esc(t(f.risk === 'high' ? 'high' : f.risk === 'mid' ? 'medium' : 'low')) + '</span></td>' +
        '<td>' + confBars(f.conf) + '</td>' +
        '<td>' + f.slope + ' %</td>' +
        '<td>' + f.ndvi.toFixed(2) + '</td>' +
        '<td>' + f.reports + '</td>' +
        '<td>' + esc(tx(D.rotations.filter(function (r) { return r.id === f.rec; })[0].name)) + '</td></tr>';
    }).join('');
  }

  Dash.tableView = function () {
    var s = Dash.tstate;
    var opts = function (id, list, cur, allLabel) {
      return '<select id="' + id + '" class="chip" style="padding:7px 9px;font-size:11.5px" aria-label="' + esc(allLabel) + '">' +
        '<option value="all">' + esc(allLabel) + '</option>' +
        list.map(function (o) { return '<option value="' + esc(o.v) + '"' + (cur === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>'; }).join('') + '</select>';
    };
    var th = function (key, label) {
      var on = s.sort === key;
      return '<th data-sort="' + key + '">' + esc(label) + (on ? '<span class="arw"> ' + (s.dir > 0 ? '▲' : '▼') + '</span>' : '') + '</th>';
    };
    return '<div class="db-full"><section class="panel">' +
      '<div class="panel-head"><h3>' + esc(t('farms')) + ' · ' + filtered().length + '</h3>' +
      '<span class="tag ghost" style="font-size:10px">' + esc(tx(m('names hidden in cooperative view', 'noms masqués en vue coopérative', 'الأسماء مخفية في العرض التعاوني', 'الأسماء مخفية فالعرض التعاوني'))) + '</span>' +
      '<div class="right">' +
      '<input id="farm-q" class="chip" style="padding:8px 10px;min-width:150px" placeholder="' + esc(t('search')) + '" value="' + esc(s.q) + '" aria-label="' + esc(t('search')) + '">' +
      opts('f-commune', D.communes.map(function (c) { return { v: c.id, l: c.name }; }), s.commune, t('commune')) +
      opts('f-crop', Object.keys(D.crops).map(function (k) { return { v: k, l: tx(D.crops[k].name) }; }), s.crop, t('crop')) +
      opts('f-risk', [{ v: 'high', l: t('high') }, { v: 'mid', l: t('medium') }, { v: 'low', l: t('low') }], s.risk, t('risk')) +
      '</div></div>' +
      '<div class="table-wrap"><table class="dt"><thead><tr>' +
      th('id', tx(m('Farm', 'Ferme', 'المزرعة', 'الضيعة'))) + th('commune', t('commune')) + th('crop', t('crop')) +
      th('risk', t('risk')) + '<th>' + esc(t('confidence')) + '</th>' + th('slope', tx(m('Slope', 'Pente', 'الميل', 'الميل'))) +
      th('ndvi', 'NDVI') + th('reports', t('reportPanel')) + th('rec', t('recommended')) +
      '</tr></thead><tbody id="farm-body">' + rowsHtml() + '</tbody></table></div>' +
      '<div class="panel-body" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">' +
      '<span class="tiny">' + esc(tx(m('Tap a row to open the farm card. Every value carries its source and period.', 'Touchez une ligne. Chaque valeur a sa source et sa période.', 'المس سطرًا. كل قيمة لها مصدرها وفترتها.', 'قيس سطر. كل قيمة عندها مصدرها وفترتها.'))) + '</span>' +
      '<button class="act" data-act="dexport" style="margin-inline-start:auto">' + esc(t('exportCsv')) + '</button>' +
      '<button class="act" data-act="dprint">' + esc(t('exportPdf')) + '</button></div>' +
      '</section></div>';
  };

  /* ---------- drawer ---------- */
  Dash.openDrawer = function (id) {
    var f = D.farms.filter(function (x) { return x.id === id; })[0];
    if (!f) return;
    var c = Dash.communeOf(f.commune);
    var rot = D.rotations.filter(function (r) { return r.id === f.rec; })[0];
    var journal = D.journal[f.id] || [
      { d: f.date, t: m('Report received and compared with the satellite for the same place.', 'Signalement reçu et comparé au satellite.', 'تم استلام التبليغ ومقارنته بالساتل.', 'توصلنا بالتبليغ وقارناه بالساتل.'), tag: 'report' }
    ];
    var lights = [
      { n: m('Water', 'Eau', 'الماء', 'الما'), s: f.risk === 'high' ? 'bad' : f.risk === 'mid' ? 'warn' : 'ok', v: (f.risk === 'high' ? '+25' : f.risk === 'mid' ? '+21' : '+14') + ' ' + tx(m('days', 'j', 'يومًا', 'يوم')) },
      { n: m('Heat', 'Chaleur', 'الحرارة', 'السخانة'), s: f.risk === 'high' ? 'warn' : 'ok', v: '+28 ' + tx(m('days', 'j', 'أيام', 'أيام')) },
      { n: m('Plants', 'Plantes', 'النباتات', 'النباتات'), s: f.ndvi < 0.36 ? 'bad' : f.ndvi < 0.45 ? 'warn' : 'ok', v: 'NDVI ' + f.ndvi.toFixed(2) },
      { n: m('Erosion', 'Érosion', 'الانجراف', 'الانجراف'), s: f.slope > 18 ? 'bad' : f.slope > 12 ? 'warn' : 'ok', v: f.slope + ' %' }
    ];

    var html = '<div class="scrim" data-act="close"></div>' +
      '<aside class="drawer-db" role="dialog" aria-modal="true" aria-label="' + esc(f.id) + '">' +
      '<div class="dh"><div style="flex:1"><div class="row" style="gap:6px"><b style="font-size:17px">' + esc(f.id) + '</b>' +
      '<span class="risk-pill ' + f.risk + '">' + esc(t(f.risk === 'high' ? 'high' : f.risk === 'mid' ? 'medium' : 'low')) + '</span>' +
      '<span class="tag ghost" style="font-size:10px">' + esc(t('confidence')) + ' ' + confBars(f.conf) + '</span></div>' +
      '<div class="tiny mt8">' + esc(c.name) + ' · ' + esc(cropName(f.crop)) + ' · ' + f.area + ' ha · ' + esc(t('lastReport')) + ' ' + esc(f.date) + '</div></div>' +
      '<button class="icon-btn bare" data-act="dclose" aria-label="' + esc(t('close')) + '">' + icon('close') + '</button></div>' +
      '<div class="db-body">' +

      '<div class="db-note"><b>' + esc(tx(m('Farm name hidden', 'Nom de la ferme masqué', 'اسم المزرعة مخفي', 'اسم الضيعة مخفي'))) + '</b> — ' +
      esc(tx(m('shown only if the farmer agrees. This card is visible to the technician and the cooperative.', 'affiché seulement avec l’accord du fermier. Visible par le technicien et la coopérative.', 'يُعرض فقط بموافقة الفلاح. يظهر للتقني والتعاونية.', 'كيبان غير بموافقة الفلاح. كيبان للتقني والتعاونية.'))) + '</div>' +

      '<section class="panel"><div class="panel-head"><h3>' + esc(t('lights')) + '</h3><div class="right"><span class="tag ghost" style="font-size:10px">POWER · NDVI · SRTM</span></div></div>' +
      '<div class="panel-body"><div class="lights">' + lights.map(function (l) {
        return '<div class="light ' + (l.s === 'bad' ? 'bad' : l.s === 'warn' ? 'warn' : '') + '"><span class="l-top"><span class="l-dot"></span>' +
          '<span class="l-name">' + esc(tx(l.n)) + '</span></span><span class="l-say">' + esc(l.v) + '</span>' +
          '<span class="l-src">NASA POWER 2005–2025</span></div>';
      }).join('') + '</div>' +
      '<p class="tiny mt8">' + esc(tx(m('Soil health: medium (your answers + global soil layer).', 'Santé du sol : moyenne (vos réponses + couche mondiale).', 'صحة التربة: متوسطة (أجوبتك + الطبقة العالمية).', 'صحة التراب: متوسطة (أجوبتك + الطبقة العالمية).'))) + '</p></div></section>' +

      '<section class="panel"><div class="panel-head"><h3>' + esc(t('recommended')) + '</h3></div><div class="panel-body">' +
      D.rotations.map(function (r) {
        var w = D.weightsFor([]);
        var sc = D.scoreRot(r, w, { hot: 0, dry: 0 }, null);
        return '<div class="row-between" style="padding:6px 0;border-bottom:1px dotted #EDE2D4">' +
          '<span style="font-size:12.5px">' + esc(tx(r.name)) + '<div class="tiny">' + esc(r.chain.map(cropName).join(' → ')) + '</div></span>' +
          '<b style="font-family:var(--serif);font-size:18px;color:' + (r.id === f.rec ? 'var(--sage-3)' : 'var(--dark)') + '">' + sc + '</b></div>';
      }).join('') +
      '<p class="tiny mt8">' + esc(tx(m('Scores use equal weights here; in the farmer app they follow the farmer’s priorities.', 'Scores à poids égaux ici ; dans l’app ils suivent les priorités.', 'النتائج بأوزان متساوية هنا؛ في التطبيق تتبع أولويات الفلاح.', 'النتائج بأوزان متساوية هنا؛ فالتطبيق كتتبع أولويات الفلاح.'))) + '</p></div></section>' +

      '<section class="panel"><div class="panel-head"><h3>' + esc(tx(m('Farmer vs satellite', 'Agriculteur vs satellite', 'الفلاح مقابل الساتل', 'الفلاح مقابل الساتل'))) + '</h3></div>' +
      '<div class="panel-body"><div class="result-banner ' + (f.agree ? '' : 'warn') + '"><span class="ic">' + icon(f.agree ? 'check' : 'alert') + '</span>' +
      '<div><div class="h3">' + esc(t(f.agree ? 'agrees' : 'differs')) + '</div>' +
      '<p class="tiny mt8">' + esc(tx(m('Field report 12 Nov · NDVI 0.38 · dry spell 38 days · slope 18 %. Satellites see an average; the farmer sees the field.',
        'Signalement du 12 nov. · NDVI 0,38 · sécheresse 38 j · pente 18 %. Le satellite voit une moyenne.',
        'تبليغ 12 نونبر · NDVI 0.38 · جفاف 38 يومًا · ميل 18%. الساتل يرى متوسطًا.',
        'تبليغ 12 نونبر · NDVI 0.38 · جفاف 38 يوم · ميل 18%. الساتل كيشوف متوسط.'))) + '</p></div></div></div></section>' +

      '<section class="panel"><div class="panel-head"><h3>' + esc(t('history')) + '</h3></div><div class="panel-body">' +
      journal.map(function (j) {
        return '<div class="inbox-item" style="margin-bottom:6px"><span class="tag ' + (j.tag === 'sat' ? 'ghost' : j.tag === 'report' ? 'warn' : 'sage') + '" style="font-size:9.5px">' + esc(j.tag.toUpperCase()) + '</span>' +
          '<div style="flex:1"><div class="ib-t">' + esc(tx(j.t)) + '</div></div><span class="ib-time">' + esc(j.d) + '</span></div>';
      }).join('') + '</div></section>' +

      '<div class="db-note"><b>' + esc(t('actions')) + '</b><br>' + esc(tx(m('Approve, comment or correct the recommendation the farmer received. Nothing is decided for the farmer.', 'Approuvez, commentez ou corrigez. Rien n’est décidé à la place du fermier.', 'وافق أو علّق أو صحح. لا شيء يُقرر مكان الفلاح.', 'وافق ولا علق ولا صحح. ما كاين والو كيتقرر بلاصة الفلاح.'))) + '</div>' +
      '<div class="actions-row">' +
      '<button class="act primary" data-act="dapprove" data-arg="' + f.id + '">' + icon('check') + esc(t('approve')) + '</button>' +
      '<button class="act" data-act="dtoast" data-arg="' + esc(t('comment')) + '">' + esc(t('comment')) + '</button>' +
      '<button class="act" data-act="dtoast" data-arg="' + esc(t('correct')) + '">' + esc(t('correct')) + '</button>' +
      '<button class="act" data-act="dtoast" data-arg="' + esc(t('replyVoice')) + '">' + icon('mic') + esc(t('replyVoice')) + '</button>' +
      '<button class="act" data-act="dtoast" data-arg="' + esc(t('schedule')) + '">' + icon('list') + esc(t('schedule')) + '</button>' +
      '</div></div></aside>';

    var root = document.getElementById('overlay-root');
    root.innerHTML = html;
    document.body.style.overflow = 'hidden';
  };

  /* ---------- alerts panel ---------- */
  Dash.alertsView = function () {
    var bad = D.farms.filter(function (f) { return f.risk === 'high'; }).slice(0, 3);
    return '<section class="panel"><div class="panel-head"><h3>' + esc(t('alertsPanel')) + '</h3>' +
      '<div class="right"><span class="tag warn" style="font-size:10px">' + esc(t('alertTrend')) + '</span></div></div>' +
      '<div class="panel-body"><div class="stack-sm">' +
      D.alerts.slice(0, 3).map(function (a, i) {
        return '<div class="inbox-item" data-open="' + (bad[i] ? bad[i].id : 'F-0142') + '">' +
          '<span class="a-ic" style="background:' + (a.state === 'bad' ? '#F8E8E4' : '#FBF0DE') + ';color:' + (a.state === 'bad' ? '#8A3A2C' : '#8A5A2B') + '">' +
          icon(a.kind === 'heat' ? 'sun' : a.kind === 'storm' ? 'alert' : 'water') + '</span>' +
          '<div style="flex:1"><div class="ib-t">' + esc(tx(a.title)) + '</div>' +
          '<div class="ib-d">' + esc(bad[i] ? bad[i].id : 'F-0142') + ' · ' + esc(tx(a.date)) + '</div></div>' +
          '<span class="ib-time">' + (i === 0 ? '+6' : i === 1 ? '+4' : '+9') + '</span></div>';
      }).join('') + '</div>' +
      '<button class="act mt14" data-act="dtoast" data-arg="' + esc(t('alertsPanel')) + '">' + esc(txo()) + '</button></div></section>';
    function txo() { return tx(m('Notify the affected farms', 'Prévenir les fermes concernées', 'إشعار المزارع المتأثرة', 'إشعار الضيعات المتأثرة')); }
  };

  /* ---------- inbox ---------- */
  Dash.inboxView = function () {
    var items = D.inbox.slice(0, 5);
    return '<section class="panel"><div class="panel-head"><h3>' + esc(t('inbox')) + '</h3>' +
      '<div class="right"><span class="chip on" style="font-size:10px;padding:4px 8px">' + esc(t('validation')) + ' · 9</span></div></div>' +
      '<div class="panel-body"><div class="stack-sm">' + items.map(function (it) {
        return '<button class="inbox-item" data-open="' + it.farm + '">' +
          '<span class="tag ' + (it.type === 'validation' ? 'sage' : 'warn') + '" style="font-size:9px">' + esc(it.type === 'validation' ? 'VALID' : 'REPORT') + '</span>' +
          '<span style="flex:1;text-align:start"><span class="ib-t">' + esc(tx(it.text)) + '</span>' +
          '<span class="ib-d">' + esc(it.farm) + ' · ' + esc(t('confidence')) + ' ' + esc(t(it.conf === 3 ? 'high' : it.conf === 2 ? 'medium' : 'low')) + '</span></span>' +
          '<span class="ib-time">' + esc(it.time) + '</span></button>';
      }).join('') + '</div></div></section>';
  };

  /* ---------- sources ---------- */
  Dash.sourcesView = function () {
    return '<div class="table-wrap"><table class="dt" style="min-width:640px"><thead><tr>' +
      '<th>' + esc(t('sourceLabel')) + '</th><th>' + esc(t('period')) + '</th><th>' + esc(t('resolution')) + '</th><th>' + esc(t('cannotSee')) + '</th>' +
      '</tr></thead><tbody>' + D.sources.map(function (s) {
        return '<tr><td><b>' + esc(typeof s.name === 'string' ? s.name : tx(s.name)) + '</b><div class="tiny">' + esc(tx(s.use)) + '</div></td>' +
          '<td>' + esc(typeof s.period === 'string' ? s.period : tx(s.period)) + '</td><td>' + esc(typeof s.res === 'string' ? s.res : tx(s.res)) + '</td><td class="tiny">' + esc(tx(s.cant)) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="db-note mt14"><b>' + esc(t('limits')) + ':</b> ' + esc(t('limitsBox')) + ' ' +
      esc(tx(m('US-only datasets (Web Soil Survey, SSURGO, CDL, PRISM) are not used for Morocco; they show the pipeline is portable.',
        'Les jeux américains (Web Soil Survey, SSURGO, CDL, PRISM) ne servent pas au Maroc ; ils montrent la portabilité.',
        'المجموعات الأمريكية لا تُستعمل للمغرب؛ تُظهر قابلية النقل.',
        'المجموعات الأمريكية ما كتستعملش للمغرب؛ كتوري قابلية النقل.'))) + '</p>';
  };

  /* ---------- wire table + drawer ---------- */
  function bindTable() {
    var body = document.getElementById('farm-body');
    if (!body) return;
    body.querySelectorAll('[data-open]').forEach(function (tr) {
      tr.addEventListener('click', function () { Dash.openDrawer(tr.dataset.open); });
    });
    var q = document.getElementById('farm-q');
    if (q) q.addEventListener('input', function () {
      Dash.tstate.q = q.value;
      body.innerHTML = rowsHtml();
      body.querySelectorAll('[data-open]').forEach(function (tr) {
        tr.addEventListener('click', function () { Dash.openDrawer(tr.dataset.open); });
      });
    });
    ['f-commune', 'f-crop', 'f-risk'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('change', function () {
        Dash.tstate[id === 'f-commune' ? 'commune' : id === 'f-crop' ? 'crop' : 'risk'] = el.value;
        Dash.render();
      });
    });
    document.querySelectorAll('[data-sort]').forEach(function (th) {
      th.addEventListener('click', function () {
        var k = th.dataset.sort;
        if (Dash.tstate.sort === k) Dash.tstate.dir *= -1; else { Dash.tstate.sort = k; Dash.tstate.dir = k === 'risk' ? -1 : 1; }
        Dash.render();
      });
    });
    document.querySelectorAll('.inbox-item[data-open], .db-body [data-open]').forEach(function (el) {
      el.addEventListener('click', function () { Dash.openDrawer(el.dataset.open); });
    });
  }
  Dash.bindTable = bindTable;

  Dash.filterCommune = function (id) {
    Dash.tstate.commune = id;
    Dash.render();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  Dash.actMore = function (a, arg) {
    if (a === 'dclose') {
      document.getElementById('overlay-root').innerHTML = '';
      document.body.style.overflow = '';
    }
    if (a === 'dapprove') {
      var f = D.farms.filter(function (x) { return x.id === arg; })[0];
      if (f) f.approved = true;
      toast(t('approve') + ' · ' + arg);
      document.getElementById('overlay-root').innerHTML = '';
      document.body.style.overflow = '';
    }
    if (a === 'dtoast') { toast(arg || ''); }
  };
})();
