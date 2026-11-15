/* ============================================================
   Mazra'a — live weather for the pilot zone
   Real current conditions from Open-Meteo (no API key), cached for
   30 minutes in localStorage, with an honest offline fallback.
   ============================================================ */
(function () {
  var KEY = 'mazraa.wx.v1', TTL = 30 * 60 * 1000;
  var LAT = 35.1688, LON = -5.2636, TZ = 'Africa/Casablanca';
  var W = window.WEATHER = { status: 'idle', data: null, at: 0, offline: false };

  var DEMO = {
    temp: 19, hum: 62, wind: 9, rain7: 8, code: 1, demo: true,
    days: []
  };

  function group(code) {
    code = Number(code) || 0;
    if (code === 0) return 'clear';
    if (code <= 2) return 'partly';
    if (code === 3) return 'cloudy';
    if (code === 45 || code === 48) return 'fog';
    if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return 'rain';
    if (code === 61 || code === 63 || code === 80 || code === 81) return 'rain';
    if (code === 65 || code === 66 || code === 67 || code === 82 || code >= 95) return 'heavy';
    return 'cloudy';
  }

  function label(g) {
    if (g === 'clear') return m('Clear sky', 'Ciel dégagé', 'سماء صافية', 'سما صافية');
    if (g === 'partly') return m('Some clouds', 'Quelques nuages', 'بعض السحب', 'شي سحاب');
    if (g === 'cloudy') return m('Overcast', 'Couvert', 'غائم', 'غايمة');
    if (g === 'fog') return m('Fog', 'Brouillard', 'ضباب', 'ضبابة');
    if (g === 'rain') return m('Rain', 'Pluie', 'مطر', 'شتا');
    return m('Heavy rain', 'Fortes pluies', 'مطر غزير', 'شتا قوية');
  }

  function prefix() {
    return m('Weather now', 'Météo maintenant', 'الجو الآن', 'الجو دابا');
  }

  function srcLine() {
    return m('Source Open-Meteo, live update', 'Source Open-Meteo, mise à jour directe', 'المصدر Open-Meteo، تحديث مباشر', 'المصدر Open-Meteo، تحديث مباشر');
  }

  function verdict(mm) {
    if (mm >= 20) return m('Enough rain to sow this week.', 'Assez de pluie pour semer cette semaine.', 'مطر كافٍ للبذر هذا الأسبوع.', 'شتا كافية للزريعة هاد السيمانة.');
    if (mm >= 5) return m('Close, but wait for more rain.', 'Proche, mais attendez encore de la pluie.', 'قريب، لكن انتظر مطرًا أكثر.', 'قريبة، ولكن تسنى شتا كتر.');
    return m('Not enough rain yet. Wait before sowing.', 'Pas encore assez de pluie. Attendez avant de semer.', 'لا مطر كافٍ بعد. انتظر قبل البذر.', 'مازال ما كاينش شتا كافية. تسنى قبل الزريعة.');
  }

  function rain7(d) { return Math.round((d && d.rain7) || 0); }

  /* the spoken line: only fixed wording + the condition + the verdict,
     so every combination has a recorded clip */
  function phrase() {
    var d = W.data || DEMO;
    return tx(prefix()) + '. ' + tx(label(group(d.code))) + '. ' + tx(verdict(rain7(d))) + '. ' + tx(srcLine());
  }

  function cache() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ at: W.at, data: W.data })); } catch (e) {}
  }

  function shape(j) {
    var c = j.current || {};
    var dl = j.daily || {};
    var sums = dl.precipitation_sum || [];
    var past = sums.slice(0, 7);
    var total = past.reduce(function (a, b) { return a + (Number(b) || 0); }, 0);
    var days = [];
    for (var i = 7; i < Math.min(sums.length, 10); i++) {
      days.push({
        d: (dl.time || [])[i],
        max: Math.round((dl.temperature_2m_max || [])[i]),
        min: Math.round((dl.temperature_2m_min || [])[i]),
        rain: Math.round(Number(sums[i]) || 0),
        code: (dl.weather_code || [])[i]
      });
    }
    return {
      temp: Math.round(Number(c.temperature_2m)),
      hum: Math.round(Number(c.relative_humidity_2m)),
      wind: Math.round(Number(c.wind_speed_10m)),
      precip: Number(c.precipitation) || 0,
      code: c.weather_code,
      rain7: total,
      days: days
    };
  }

  W.load = function (force) {
    if (!force && W.data && Date.now() - W.at < TTL) return;
    W.status = 'loading';
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + LAT + '&longitude=' + LON +
      '&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m' +
      '&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,weather_code' +
      '&past_days=7&forecast_days=4&timezone=' + encodeURIComponent(TZ);
    fetch(url, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (j) {
      var d = shape(j);
      if (isNaN(d.temp)) throw new Error('no temperature');
      W.data = d; W.at = Date.now(); W.status = 'ok'; W.offline = false;
      save();
      if (window.App && window.S && S.route === 'home') App.render();
    }).catch(function () {
      W.status = 'error'; W.offline = true;
      if (!W.data) { W.data = null; }
      if (window.App && window.S && S.route === 'home') App.render();
    });
  };

  W.init = function () {
    var c = cache();
    if (c && c.data) { W.data = c.data; W.at = c.at; W.status = 'ok'; }
    W.load(false);
  };

  W.phrase = phrase;

  function dayName(iso) {
    try {
      var dt = new Date(iso + 'T12:00:00');
      return dt.toLocaleDateString(D.lang === 'ar' ? 'ar-MA' : 'en-GB', { weekday: 'short' });
    } catch (e) { return ''; }
  }

  W.card = function () {
    var d = W.data || DEMO;
    var demo = !W.data;
    var g = group(d.code);
    var stamp = W.at ? new Date(W.at) : null;
    var time = stamp ? ('0' + stamp.getHours()).slice(-2) + ':' + ('0' + stamp.getMinutes()).slice(-2) : '';
    var unit = D.lang === 'ar' ? 'مم' : 'mm';
    var days = (d.days || []).map(function (x) {
      return '<div class="wx-day"><b>' + esc(dayName(x.d)) + '</b>' +
        '<div class="wx-t" dir="ltr">' + x.min + '–' + x.max + '°</div>' +
        '<div class="wx-mm">' + x.rain + ' ' + unit + '</div></div>';
    }).join('');

    return '<section class="weather wx-' + g + '" aria-label="' + esc(t('myFarm')) + '">' +
      '<div class="row-between" style="align-items:flex-start;gap:10px">' +
      '<div class="eyebrow" style="flex:1;line-height:1.6">' + esc(tx(D.farm.commune)) + ' · ' +
      esc(tx(m('now', 'maintenant', 'الآن', 'دابا'))) + '</div>' +
      audioBtn(phrase()) + '</div>' +
      '<div class="temp">' + (d.temp != null ? d.temp : '—') + '°C</div>' +
      '<p class="line">' + esc(tx(label(g))) + '</p>' +
      '<div class="chips">' +
      '<span class="tag">' + esc(tx(m('Humidity', 'Humidité', 'رطوبة', 'رطوبة'))) + ' ' + d.hum + '%</span>' +
      '<span class="tag">' + esc(tx(m('Wind', 'Vent', 'ريح', 'ريح'))) + ' ' + d.wind + (D.lang === 'ar' ? ' كم/س' : ' km/h') + '</span>' +
      '<span class="tag">' + esc(tx(m('Rain last 7 days', 'Pluie 7 derniers jours', 'أمطار آخر 7 أيام', 'شتا آخر 7 أيام'))) + ': ' + rain7(d) + ' ' + unit + '</span>' +
      '</div>' +
      '<p class="line mt8" style="font-size:13.5px">' + esc(tx(verdict(rain7(d)))) + '</p>' +
      (days ? '<div class="wx-days">' + days + '</div>' : '') +
      '<div class="wx-foot"><span class="src">' +
      esc(demo ? (W.status === 'loading'
          ? tx(m('Updating…', 'Mise à jour…', 'جارٍ تحديث الجو…', 'كيتحدث الجو…'))
          : tx(m('No connection — sample values', 'Hors ligne — valeurs d’exemple', 'لا اتصال — أرقام نموذجية', 'لا اتصال — أرقام نموذجية')))
        : tx(srcLine()) + (time ? ' · ' + time : '')) +
      '</span>' +
      '<button class="wx-refresh" data-act="wxRefresh">' + esc(W.status === 'loading' ? tx(m('Updating…', 'Mise à jour…', 'جارٍ التحديث…', 'كيتحدث…')) : tx(m('Update', 'Actualiser', 'حدّث', 'حدّث'))) + '</button></div>' +
      '</section>';
  };
})();
