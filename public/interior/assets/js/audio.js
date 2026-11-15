/* ============================================================
   Mazra'a — audio engine
   Plays pre-recorded clips in the chosen language (Arabic / English),
   falls back to the device voice only when one exists for that language.
   ============================================================ */
(function () {
  var AUD = window.AUD = window.AUD || [];
  var FILES = window.AUDIO_FILES || {};
  window.AUDIO_FILES = FILES;

  var audio = null, audioBtnEl = null, warned = false;

  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ' ').trim(); }
  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36);
  }
  function langTable(lang) {
    if (!FILES[lang]) FILES[lang] = {};
    return FILES[lang];
  }
  function fileFor(text, lang) {
    var t = norm(text);
    if (!t) return null;
    return langTable(lang || D.lang)[hash(t)] || null;
  }

  function mark(btn, on) {
    if (!btn) return;
    btn.classList.toggle('on', !!on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  function stop() {
    if (audio) { try { audio.pause(); } catch (e) {} audio = null; }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    mark(audioBtnEl, false);
    audioBtnEl = null;
  }

  function playFile(src, btn) {
    stop();
    var a = new Audio(src);
    audio = a;
    audioBtnEl = btn;
    mark(btn, true);
    a.addEventListener('ended', function () { mark(btn, false); audio = null; });
    a.addEventListener('error', function () { mark(btn, false); audio = null; });
    var p = a.play();
    if (p && p.catch) p.catch(function () { mark(btn, false); });
    return a;
  }

  /* ---------- device voices (fallback only) ---------- */
  function voices() {
    if (!('speechSynthesis' in window)) return [];
    return window.speechSynthesis.getVoices() || [];
  }
  // Darija is spoken with the Moroccan Arabic voice, French with the French one
  var VOICE_LANG = { ar: 'ar', dz: 'ar', fr: 'fr', en: 'en' };
  function voiceFor(lang) {
    var list = voices();
    if (!list.length) return null;
    var want = VOICE_LANG[lang] || 'en';
    var best = null, bestScore = -1;
    list.forEach(function (v) {
      var l = String(v.lang || '').toLowerCase();
      if (l.slice(0, 2) !== want) return;
      var s = 1;
      if (want === 'ar' && (l === 'ar-ma' || l === 'ar-sa')) s += (lang === 'dz' && l === 'ar-ma') ? 4 : 2;
      if (want === 'fr' && l === 'fr-fr') s += 2;
      if (want === 'en' && l === 'en-us') s += 2;
      if (/natural|neural|google|premium/i.test(v.name)) s += 2;
      if (v.localService) s += 1;
      if (s > bestScore) { bestScore = s; best = v; }
    });
    return best;
  }
  function noVoice() {
    var msg = {
      ar: 'لا يوجد صوت عربي مثبت على هذا الجهاز، والتسجيل غير متوفر لهذه الجملة.',
      dz: 'ما كاينش صوت عربي مثبت فهاد الجهاز، والتسجيل ما كاينش لهاد الجملة.',
      fr: 'Aucune voix française n’est installée sur cet appareil, et aucun enregistrement n’existe pour cette phrase.',
      en: 'No voice for this language is installed on this device, and no recording exists for this sentence.'
    }[D.lang] || 'No voice for this language is installed on this device.';
    if (window.toast) toast(msg);
  }

  function chunks(text) {
    var parts = norm(text).replace(/([.!?؟。])\s*/g, '$1|').split('|').filter(function (x) { return x.trim(); });
    var out = [], buf = '';
    parts.forEach(function (p) {
      if ((buf + p).length > 170) { if (buf) out.push(buf); buf = p; }
      else buf += ' ' + p;
    });
    if (buf.trim()) out.push(buf);
    return out.length ? out : [norm(text)];
  }

  function tts(text, btn) {
    if (!('speechSynthesis' in window)) { noVoice(); return false; }
    var list = voices();
    if (!list.length) {
      // voices can arrive late on some browsers
      window.speechSynthesis.addEventListener('voiceschanged', function () { tts(text, btn); }, { once: true });
      setTimeout(function () { if (!voices().length) noVoice(); }, 350);
      return false;
    }
    var v = voiceFor(D.lang);
    if (!v) { noVoice(); return false; }
    stop();
    audioBtnEl = btn;
    mark(btn, true);
    var parts = chunks(text), i = 0;
    (function next() {
      if (i >= parts.length) { mark(btn, false); return; }
      var u = new SpeechSynthesisUtterance(parts[i++]);
      u.voice = v; u.lang = v.lang; u.rate = 0.95;
      u.onend = next;
      u.onerror = function () { mark(btn, false); };
      window.speechSynthesis.speak(u);
    })();
    return true;
  }

  window.audioBtn = function (text, cls) {
    AUD.push(text);
    return '<button class="speak ' + (cls || '') + '" data-audio="' + (AUD.length - 1) + '" aria-label="' + esc(t('listen')) + '" title="' + esc(t('listen')) + '">' + icon('speaker') + '</button>';
  };

  // A message written in another language (old chat, a pasted sentence) still has a clip.
  function otherLangFile(text) {
    var t = norm(text);
    if (!t) return null;
    var order = /[\u0600-\u06FF]/.test(t) ? ['ar', 'dz'] : ['fr', 'en'];
    for (var i = 0; i < order.length; i++) {
      var src = langTable(order[i])[hash(t)];
      if (src) return src;
    }
    return null;
  }

  window.speakText = function (text, btn) {
    var src = fileFor(text) || otherLangFile(text);
    if (src) { playFile(src, btn || null); return true; }
    return tts(text, btn || null);
  };

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-audio]');
    if (!b) return;
    var txt = AUD[+b.dataset.audio];
    if (!txt) return;
    if (audio && audioBtnEl === b && !audio.paused) { stop(); return; }
    speakText(txt, b);
  });

  window.AUDIO = {
    hash: hash,
    fileFor: fileFor,
    speak: window.speakText,
    stop: stop,
    files: FILES,
    voiceFor: voiceFor,
    voices: voices,
    count: function () { return Object.keys(langTable(D.lang)).length; },
    test: function () {
      return window.speakText(tx(D.weather.line));
    }
  };
})();
