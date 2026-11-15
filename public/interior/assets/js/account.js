/* Account menu (top right): user, language, light/dark theme, log out.
   Reads the session the React app stored (mazraa_session) and shares the 'theme' and 'lang' keys. */
(function () {
  var STR = {
    account: { en: 'Account', fr: 'Compte', ar: 'الحساب', dz: 'الحساب' },
    theme: { en: 'Theme', fr: 'Thème', ar: 'المظهر', dz: 'المظهر' },
    themeLight: { en: 'Light', fr: 'Clair', ar: 'فاتح', dz: 'فاتح' },
    themeDark: { en: 'Dark', fr: 'Sombre', ar: 'داكن', dz: 'داكن' },
    logout: { en: 'Log out', fr: 'Se déconnecter', ar: 'تسجيل الخروج', dz: 'خروج' },
    farmer: { en: 'Farmer', fr: 'Agriculteur', ar: 'فلاح', dz: 'فلاح' },
    technician: { en: 'Technician', fr: 'Technicien', ar: 'تقني', dz: 'تقني' }
  };
  Object.keys(STR).forEach(function (k) {
    ['en', 'fr', 'ar', 'dz'].forEach(function (l) { D.ui[l] = D.ui[l] || {}; D.ui[l][k] = STR[k][l]; });
  });

  var isOpen = false;
  function session() {
    try { return JSON.parse(localStorage.getItem('mazraa_session') || sessionStorage.getItem('mazraa_session') || 'null'); } catch (e) { return null; }
  }
  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }

  var IC = {
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    out: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 8l-4 4 4 4M6 12h10"/>'
  };
  function svg(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="ic" aria-hidden="true">' + IC[n] + '</svg>'; }

  function popover() {
    var u = session() || { username: '—', role: 'farmer', commune: '' };
    var langs = D.langs.map(function (l) {
      return '<button data-act="acctlang" data-arg="' + l.id + '" class="' + (D.lang === l.id ? 'on' : '') + '" lang="' + l.id + '">' + l.label + '</button>';
    }).join('');
    return '<div class="acct-pop" role="dialog" aria-label="' + esc(t('account')) + '">' +
      '<div class="acct-who"><span class="acct-av">' + svg('user') + '</span><div><div class="acct-name">' + esc(u.username) + '</div>' +
      '<div class="tiny">' + esc(t(u.role === 'technician' ? 'technician' : 'farmer')) + (u.commune ? ' · ' + esc(u.commune) : '') + '</div></div></div>' +
      '<div class="acct-row"><span class="acct-lbl">' + esc(t('language')) + '</span></div>' +
      '<div class="lang-switch acct-lang" role="group">' + langs + '</div>' +
      '<div class="acct-row"><span class="acct-lbl">' + esc(t('theme')) + '</span>' +
      '<button class="acct-theme" data-act="acctheme" aria-pressed="' + isDark() + '">' + svg(isDark() ? 'moon' : 'sun') + esc(t(isDark() ? 'themeDark' : 'themeLight')) + '</button></div>' +
      '<button class="acct-out" data-act="acctlogout">' + svg('out') + esc(t('logout')) + '</button>' +
      '</div>';
  }

  function paint() {
    document.querySelectorAll('.acct').forEach(function (w) {
      var slot = w.querySelector('.acct-slot');
      if (slot) slot.innerHTML = isOpen ? popover() : '';
      var b = w.querySelector('.acct-btn');
      if (b) b.setAttribute('aria-expanded', String(isOpen));
    });
  }

  var Account = window.Account = {
    button: function () {
      return '<div class="acct"><button class="acct-btn" data-act="acct" aria-haspopup="dialog" aria-expanded="' + isOpen + '" aria-label="' + esc(t('account')) + '">' + svg('user') + '</button>' +
        '<div class="acct-slot">' + (isOpen ? popover() : '') + '</div></div>';
    },
    close: function () { if (isOpen) { isOpen = false; paint(); } },
    theme: function () {
      var d = !isDark();
      document.documentElement.setAttribute('data-theme', d ? 'dark' : 'light');
      try { localStorage.setItem('theme', d ? 'dark' : 'light'); } catch (e) {}
      var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', d ? '#0E1C16' : '#F8F5F1');
      paint();
    },
    logout: function () {
      try { localStorage.removeItem('mazraa_session'); sessionStorage.removeItem('mazraa_session'); } catch (e) {}
      try { window.top.location.href = '/'; } catch (e) { location.href = '/'; }
    },
    /* returns true when the click was an account action */
    handle: function (a, el) {
      if (a === 'acct') { isOpen = !isOpen; paint(); return true; }
      if (a === 'acctheme') { Account.theme(); return true; }
      if (a === 'acctlogout') { Account.logout(); return true; }
      if (a === 'acctlang') { var id = el && el.dataset && el.dataset.arg; if (id) { isOpen = false; window.switchLang(id); } return true; }
      return false;
    }
  };

  document.addEventListener('click', function (e) {
    if (isOpen && !e.target.closest('.acct')) Account.close();
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') Account.close(); });
})();
