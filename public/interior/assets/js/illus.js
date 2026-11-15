/* ============================================================
   Mazra'a — illustration library
   Flat SVG pictures in the brand palette. Everything is inline so
   the app works offline, with no image files to download.
   ============================================================ */
(function () {
  var P = {
    cream: '#E7D7C5', c2: '#F3E9DD', c3: '#FBF7F1',
    sage: '#93A78C', sage2: '#7C9375', sage3: '#5C775C', sageL: '#BFCDB2',
    brown: '#8A5A3B', brown2: '#6E4529', brownL: '#C9A882',
    dark: '#3B2A21', warn: '#B98432', bad: '#A8503F', good: '#6F8A63',
    sand: '#DCC3A4', khaki: '#D8CBA5', white: '#FFFFFF'
  };

  function wrap(inner, bg) {
    return '<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect width="200" height="140" fill="' + (bg || P.c2) + '"/>' + inner + '</svg>';
  }
  function t(x, y, s) { return 'translate(' + x + ',' + y + ') scale(' + s + ')'; }

  /* ---------- primitives ---------- */
  function leaf(x, y, rx, ry, rot, c, op) {
    return '<ellipse cx="0" cy="0" rx="' + rx + '" ry="' + ry + '" fill="' + c + '" opacity="' + (op || 1) + '" transform="translate(' + x + ',' + y + ') rotate(' + rot + ')"/>';
  }
  function plant(x, y, s, c, droop) {
    var d = droop ? 12 : 0;
    return '<g transform="' + t(x, y, s) + '">' +
      '<path d="M0 0V-20" stroke="' + c + '" stroke-width="2.4" stroke-linecap="round" fill="none" transform="rotate(' + d + ')"/>' +
      leaf(-6, -15, 8, 4, -32 - d, c) + leaf(6, -17, 8, 4, 30 - d, c) +
      leaf(-4, -24, 6.4, 3.4, -45 - d, c) + leaf(5, -25, 6.4, 3.4, 40 - d, c) +
      '</g>';
  }
  function shrub(x, y, s, c) {
    return '<g transform="' + t(x, y, s) + '">' +
      '<path d="M0 0c-7-1-11-6-10-12 1-6 6-9 11-8 1-6 6-9 11-8 5 1 8 5 8 10 5 0 9 4 9 9 0 5-4 8-9 8z" fill="' + c + '"/>' +
      '</g>';
  }
  function sun(x, y, r, c, rays) {
    var g = '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/>';
    if (rays) {
      for (var i = 0; i < 8; i++) {
        var a = (Math.PI / 4) * i, r1 = r + 4, r2 = r + 9;
        g += '<line x1="' + (x + Math.cos(a) * r1).toFixed(1) + '" y1="' + (y + Math.sin(a) * r1).toFixed(1) +
          '" x2="' + (x + Math.cos(a) * r2).toFixed(1) + '" y2="' + (y + Math.sin(a) * r2).toFixed(1) +
          '" stroke="' + c + '" stroke-width="2.6" stroke-linecap="round"/>';
      }
    }
    return g;
  }
  function cloud(x, y, s, c) {
    return '<g transform="' + t(x, y, s) + '" fill="' + (c || '#FFFDF9') + '">' +
      '<circle cx="0" cy="0" r="13"/><circle cx="16" cy="-6" r="17"/><circle cx="34" cy="2" r="12"/>' +
      '<rect x="0" y="0" width="34" height="12" rx="6"/></g>';
  }
  function rain(x, y, n, c) {
    var g = '';
    for (var i = 0; i < n; i++) {
      var px = x + (i % 6) * 13 + (i > 5 ? 6 : 0), py = y + Math.floor(i / 6) * 14;
      g += '<line x1="' + px + '" y1="' + py + '" x2="' + (px - 2) + '" y2="' + (py + 9) + '" stroke="' + (c || '#9FB6A0') + '" stroke-width="2.4" stroke-linecap="round"/>';
    }
    return g;
  }
  function ground(y, c, w) {
    return '<path d="M0 ' + y + 'h' + (w || 200) + 'v' + (140 - y) + 'H0z" fill="' + c + '"/>';
  }
  function hill(y, c) {
    return '<path d="M0 ' + y + 'c30-16 56-16 84 0 26-14 56-12 80 2 14-8 26-10 36-6v' + (140 - y) + 'H0z" fill="' + c + '"/>';
  }
  function cracks(y, c) {
    return '<g stroke="' + (c || '#B49B77') + '" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85">' +
      '<path d="M30 ' + y + 'l14 8-6 10 12 8"/><path d="M92 ' + y + 'l-8 10 10 6-4 10"/>' +
      '<path d="M150 ' + y + 'l10 8-8 8 10 8"/><path d="M60 ' + (y + 14) + 'l8 8"/>' +
      '<path d="M122 ' + (y + 12) + 'l-8 10"/></g>';
  }
  function stoneRow(x, y, n, s, c) {
    var g = '';
    for (var i = 0; i < n; i++) {
      g += '<ellipse cx="' + (x + i * 12 * s) + '" cy="' + (y + (i % 2) * 2) + '" rx="' + (6 * s) + '" ry="' + (4.2 * s) + '" fill="' + (c || '#A79A88') + '"/>';
      g += '<ellipse cx="' + (x + i * 12 * s - 1) + '" cy="' + (y - 1.2 + (i % 2) * 2) + '" rx="' + (4 * s) + '" ry="' + (2.4 * s) + '" fill="' + (c ? c : '#C0B3A0') + '" opacity=".65"/>';
    }
    return g;
  }
  function straw(x, y, n, c) {
    var g = '';
    for (var i = 0; i < n; i++) {
      var px = x + (i * 17) % 170, py = y + ((i * 7) % 18);
      g += '<line x1="' + px + '" y1="' + py + '" x2="' + (px + 11) + '" y2="' + (py - 4) + '" stroke="' + (c || '#C9A882') + '" stroke-width="2.2" stroke-linecap="round"/>';
    }
    return g;
  }
  function furrows(y, c, curve) {
    var g = '<g stroke="' + (c || '#B08A63') + '" stroke-width="2" fill="none" opacity=".7">';
    for (var i = 0; i < 5; i++) {
      var yy = y + i * 9;
      g += '<path d="M0 ' + yy + 'q50 ' + (curve || -4) + ' 100 0t100 0"/>';
    }
    return g + '</g>';
  }
  function check(c) {
    return '<g fill="none" stroke="' + (c || P.sage3) + '" stroke-width="2.4" stroke-linecap="round"><path d="M4 11l5 5L19 5"/></g>';
  }
  function cross(c) {
    return '<g fill="none" stroke="' + (c || P.bad) + '" stroke-width="2.6" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></g>';
  }

  /* ---------- scenes ---------- */
  var PICS = {};

  /* late rain: the seed is still in a dry furrow, a cloud that never rained,
     and the few sprouts that came and dried */
  PICS.rainLate = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F8EEDA"/>' +
      sun(162, 28, 17, P.warn, 1) +
      '<g stroke="#F6DDB0" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round">' +
      '<path d="M18 48q11-7 22 0t22 0"/><path d="M12 62q11-7 22 0t22 0"/></g>' +
      '<path d="M0 70h200v70H0z" fill="#DCC7A0"/>' +
      furrows(82, '#C6AC83', -4) + cracks(100, '#B08F63') +
      '<g fill="#8A5A3B" opacity=".95">' +
      '<ellipse cx="34" cy="112" rx="4" ry="2.8"/><ellipse cx="52" cy="118" rx="4" ry="2.8"/>' +
      '<ellipse cx="70" cy="112" rx="4" ry="2.8"/><ellipse cx="88" cy="120" rx="4" ry="2.8"/></g>' +
      '<path d="M30 82c2 6 2 10 0 16M52 88c2 6 2 10 0 16M70 82c2 6 2 10 0 16" stroke="#B08F63" stroke-width="1.4" opacity=".7"/>' +
      plant(122, 116, .8, '#B79A6A', 1) + plant(156, 122, .7, '#A8935F', 1) +
      '<g fill="#A8935F" opacity=".55"><ellipse cx="140" cy="128" rx="6" ry="2.6" transform="rotate(-18 140 128)"/></g>' +
      '<g opacity=".5"><ellipse cx="124" cy="34" rx="26" ry="12" fill="#C9C0AC"/><ellipse cx="110" cy="28" rx="14" ry="10" fill="#D5CDBB"/></g>' +
      '<g stroke="#9FB6A0" stroke-width="2" stroke-linecap="round" opacity=".55"><path d="M110 52l-2 8M124 54l-2 8M138 52l-2 8"/></g>'
    );
  };

  PICS.rainNormal = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' +
      cloud(52, 30, 1.1) + cloud(126, 26, .8) + rain(40, 52, 14, '#9FB6A0') +
      ground(86, '#C9C39C') +
      '<path d="M0 86c40-8 70-4 100 4 34 8 66 6 100 0v50H0z" fill="#A9B784"/>' +
      plant(38, 122, 1.15, P.sage3) + plant(78, 126, 1, P.sage2) + plant(126, 122, 1.1, P.sage3) + plant(164, 128, .9, P.sage2)
    );
  };

  /* soil washing away: rain on a slope, two gullies cut in the field,
     and the brown soil running off into a muddy puddle */
  PICS.erosion = function () {
    return wrap(
      '<rect width="200" height="140" fill="#E6EDE4"/>' + cloud(48, 16, .9) + rain(36, 32, 8, '#7F9A9F') + rain(96, 24, 4, '#7F9A9F') +
      '<path d="M0 112L94 32h106v108H0z" fill="#C9A882"/>' +
      '<path d="M0 112L94 32h26L34 140H0z" fill="#A4B78A"/>' +
      '<g fill="none" stroke-linecap="round">' +
      '<path d="M98 46c4 22 16 40 32 54 10 9 20 16 34 22" stroke="#8A5A3B" stroke-width="12" opacity=".9"/>' +
      '<path d="M64 76c6 20 18 36 34 48" stroke="#7A5638" stroke-width="8" opacity=".85"/>' +
      '<path d="M148 58c6 22 18 38 30 50" stroke="#7A5638" stroke-width="6" opacity=".7"/>' +
      '</g>' +
      '<path d="M0 128c40 0 70 4 98 12H0z" fill="#8A5A3B" opacity=".7"/>' +
      '<ellipse cx="126" cy="132" rx="62" ry="9" fill="#7A5638" opacity=".55"/>' +
      '<ellipse cx="118" cy="131" rx="32" ry="5" fill="#C9A882" opacity=".4"/>' +
      stoneRow(28, 118, 5, .6, '#B5A48D') + stoneRow(150, 104, 4, .5, '#A79A88') +
      plant(24, 108, .7, P.sage3) + plant(176, 74, .6, P.sage2) +
      '<path d="M106 116c10-4 20-4 28 0" stroke="#FBF7F1" stroke-width="2" fill="none" opacity=".45"/>'
    );
  };

  PICS.gullyYes = function () {
    return wrap(
      '<rect width="200" height="140" fill="#E9DCC8"/>' +
      '<path d="M0 40h200v100H0z" fill="#D7BE9C"/>' +
      '<path d="M0 58c40 12 70 26 100 46 24 16 50 26 100 28v8H0z" fill="#C0A17A"/>' +
      '<path d="M62 44c8 22 18 40 34 58 14 16 26 24 42 30" stroke="#8A5A3B" stroke-width="16" fill="none" stroke-linecap="round" opacity=".55"/>' +
      '<path d="M66 46c8 20 18 38 34 56" stroke="#6E4529" stroke-width="5" fill="none" stroke-linecap="round" opacity=".5"/>' +
      stoneRow(30, 52, 5, .7, '#B5A48D') + stoneRow(102, 104, 4, .6, '#B5A48D') +
      '<path d="M40 34l10-6M150 30l-9 7" stroke="#A08A6C" stroke-width="2" stroke-linecap="round"/>'
    );
  };

  PICS.gullyNo = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(172, 26, 10, '#E7C98C') +
      '<path d="M0 62h200v78H0z" fill="#D7BE9C"/>' + furrows(76, '#C3A57F', -3) +
      plant(44, 118, 1, P.sage3) + plant(96, 124, .9, P.sage2) + plant(150, 118, 1, P.sage3)
    );
  };

  PICS.brownWater = function () {
    return wrap(
      '<rect width="200" height="140" fill="#E9EEE6"/>' + cloud(70, 16, .72) + rain(58, 30, 6, '#7F9A9F') +
      '<path d="M0 54h200v86H0z" fill="#C9A882"/>' + furrows(64, '#B99B70', -4) +
      '<path d="M0 78c30 4 52 18 64 38 6 12 10 20 12 24H0z" fill="#8A5A3B"/>' +
      '<path d="M0 92c22 4 38 16 48 32 4 8 6 12 8 16H0z" fill="#6E4529"/>' +
      '<g fill="#B9895F"><circle cx="20" cy="112" r="2.8"/><circle cx="34" cy="120" r="2.2"/><circle cx="48" cy="112" r="2.6"/><circle cx="28" cy="100" r="2"/></g>' +
      '<g fill="#7A5638" opacity=".7"><path d="M14 132c7-5 15-5 22 0-7 5-15 5-22 0z"/></g>' +
      stoneRow(108, 104, 3, .6, '#B5A48D') +
      plant(120, 100, .7, P.sage3) + plant(176, 76, .6, P.sage2)
    );
  };

  /* clear runoff: the same field, but the water leaves clean instead of brown */
  PICS.clearWater = function () {
    return wrap(
      '<rect width="200" height="140" fill="#E9EEE6"/>' + cloud(70, 16, .72) + rain(58, 30, 6, '#7F9A9F') +
      '<path d="M0 54h200v86H0z" fill="#C9A882"/>' + furrows(64, '#B99B70', -4) +
      '<path d="M0 78c30 4 52 18 64 38 6 12 10 20 12 24H0z" fill="#A9C0C2"/>' +
      '<path d="M0 92c22 4 38 16 48 32 4 8 6 12 8 16H0z" fill="#8FAEB2"/>' +
      '<g fill="#FBF7F1" opacity=".75"><path d="M18 118c6-4 12-4 18 0-6 4-12 4-18 0z"/><path d="M34 130c5-3 10-3 15 0-5 3-10 3-15 0z"/></g>' +
      stoneRow(108, 104, 3, .6, '#B5A48D') +
      plant(120, 100, .7, P.sage3) + plant(176, 76, .6, P.sage2)
    );
  };

  PICS.flatField = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + cloud(60, 24, .6) +
      '<path d="M0 66h200v74H0z" fill="#CDB58F"/>' +
      '<path d="M0 66h200v10H0z" fill="#BFCFA6"/>' +
      furrows(80, '#B49B77', 0) +
      '<g stroke="#93A78C" stroke-width="2.5" fill="none"><path d="M0 118h200"/><path d="M0 128h200"/></g>' +
      plant(60, 110, .8, P.sage3) + plant(140, 112, .8, P.sage2)
    );
  };

  PICS.slopeField = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(160, 28, 11, '#E7C98C') +
      '<path d="M0 116L70 44h130v96H0z" fill="#C9A882"/>' +
      '<path d="M0 116L70 44h34L44 140H0z" fill="#93A78C" opacity=".85"/>' +
      '<g stroke="#F3E9DD" stroke-width="3" fill="none" opacity=".9"><path d="M22 120l64-64"/><path d="M54 136l62-68"/><path d="M92 138l46-52"/></g>' +
      '<path d="M104 44h34v96h-34z" fill="#B08A63" opacity=".7"/>' +
      '<path d="M120 60l16 30M120 104l16 26" stroke="#F3E9DD" stroke-width="2" opacity=".6"/>'
    );
  };

  /* weak or yellow plants: pale yellow plants next to one healthy green plant,
     so the difference is visible at a glance */
  PICS.yellowAll = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F8F3E6"/>' + sun(168, 22, 11, '#E4B45C', 1) +
      '<path d="M0 104h200v36H0z" fill="#CDB58F"/>' +
      '<g transform="translate(82,120)">' +
      '<path d="M0 0V-62" stroke="#A8935F" stroke-width="3.4" stroke-linecap="round"/>' +
      leaf(-13, -50, 15, 6.5, -28, '#C7A050') + leaf(13, -54, 15, 6.5, 28, '#D2B267') +
      leaf(-15, -64, 14, 6, -20, '#D2B267') + leaf(15, -68, 14, 6, 20, '#C7A050') +
      leaf(-12, -26, 13, 6, -34, '#C7A050') + leaf(12, -20, 13, 6, 34, '#D2B267') +
      leaf(-10, -38, 12, 5.5, -40, '#D2B267') + leaf(10, -32, 12, 5.5, 40, '#C7A050') +
      '</g>' +
      '<g transform="translate(158,126)">' +
      '<path d="M0 0V-30" stroke="#A8935F" stroke-width="2.8" stroke-linecap="round"/>' +
      leaf(-8, -24, 10, 4.6, -30, '#D2B267') + leaf(8, -28, 10, 4.6, 30, '#C7A050') +
      leaf(-7, -13, 9, 4.2, -34, '#C7A050') + leaf(7, -8, 9, 4.2, 34, '#D2B267') +
      '</g>' +
      '<g fill="#B98432" opacity=".5"><ellipse cx="124" cy="126" rx="7" ry="3.2" transform="rotate(-16 124 126)"/><ellipse cx="136" cy="132" rx="6" ry="2.8" transform="rotate(14 136 132)"/></g>'
    );
  };

  PICS.yellowBottom = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + ground(78, '#C9B389') +
      '<g transform="translate(100,130)">' +
      '<path d="M0 0V-58" stroke="' + P.sage3 + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      leaf(-10, -46, 14, 6, -28, P.sage) + leaf(10, -52, 14, 6, 28, P.sage) +
      leaf(-12, -62, 13, 6, -22, P.sage2) + leaf(12, -66, 13, 6, 22, P.sage2) +
      leaf(-8, -18, 12, 6, -34, '#C7A050') + leaf(8, -22, 12, 6, 34, '#D2B267') +
      leaf(-10, -8, 11, 5, -20, '#C7A050') +
      '</g>' +
      '<path d="M158 96h30" stroke="#B49B77" stroke-width="2" stroke-dasharray="4 5"/>'
    );
  };

  PICS.stuntYes = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + ground(70, '#D7BE9C') +
      '<g stroke="#B49B77" stroke-width="2" fill="none" stroke-dasharray="4 4">' +
      '<path d="M36 70v54"/><path d="M96 70v54"/><path d="M156 70v54"/></g>' +
      plant(36, 118, .55, '#A8935F', 1) + plant(96, 118, .6, '#B7A06B', 1) + plant(156, 118, .5, '#A8935F', 1) +
      plant(66, 108, 1.5, P.sage2) + plant(126, 108, 1.4, P.sage3)
    );
  };

  PICS.stuntNo = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + ground(64, '#C9B389') +
      plant(40, 120, 1.35, P.sage3) + plant(84, 124, 1.3, P.sage2) + plant(128, 120, 1.35, P.sage3) + plant(168, 124, 1.15, P.sage2)
    );
  };

  /* heat OR cold: the picture is split down the middle, burnt on the warm side
     and frosted on the cold side */
  PICS.heatWave = function () {
    return wrap(
      '<rect width="200" height="140" fill="#FBE0BC"/>' +
      sun(158, 26, 18, '#D9823A', 1) +
      '<g stroke="#FFF1D4" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round">' +
      '<path d="M18 48q12-8 24 0t24 0 24 0"/><path d="M12 64q12-8 24 0t24 0 24 0"/>' +
      '<path d="M28 80q12-8 24 0t24 0 24 0"/></g>' +
      '<path d="M0 104h200v36H0z" fill="#DCC3A4"/>' + cracks(112, '#BEA47D') +
      '<g transform="translate(72,132)">' +
      '<path d="M0 0V-46" stroke="#8A5A3B" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M-2 -38c-16 0-25-9-27-20 13 0 22 7 27 20z" fill="#A9652F"/>' +
      '<path d="M3 -28c14-2 23-11 25-23-14 2-23 10-25 23z" fill="#B77A3E"/>' +
      '<path d="M-2 -18c-12 2-19 9-21 18 12-2 19-9 21-18z" fill="#8A5A3B"/>' +
      '<path d="M1 -10c11 0 18 6 20 14-11 0-18-5-20-14z" fill="#A9652F"/>' +
      '</g>' +
      '<g fill="#7A4A2A" opacity=".7"><path d="M122 118c6-4 12-4 18 0-6 4-12 4-18 0z"/><path d="M146 126c5-3 10-3 15 0-5 3-10 3-15 0z"/></g>'
    );
  };

  /* the problem question covers heat AND cold: one scorched side, one frosted side */
  PICS.heatCold = function () {
    return wrap(
      '<rect width="100" height="140" fill="#FBE3C2"/>' +
      '<rect x="100" width="100" height="140" fill="#E3EBEE"/>' +
      sun(40, 30, 18, '#D9823A', 1) +
      '<path d="M0 100h100v40H0z" fill="#D9BE97"/>' + cracks(110, '#B08F63') +
      '<g transform="translate(34,130)">' +
      '<path d="M0 0V-38" stroke="#8A5A3B" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M-2 -30c-14 0-22-8-24-18 12 0 20 6 24 18z" fill="#A9652F"/>' +
      '<path d="M2 -22c12-2 20-10 22-20-12 2-20 8-22 20z" fill="#B77A3E"/>' +
      '<path d="M-2 -12c-10 2-16 8-18 16 10-2 16-8 18-16z" fill="#8A5A3B"/>' +
      '</g>' +
      '<g stroke="#FFF7E8" stroke-width="1.8" fill="none" opacity=".55"><path d="M62 64q10-6 20 0t16 0"/><path d="M62 78q10-6 20 0t16 0"/></g>' +
      '<g stroke="#7FA3AE" stroke-width="2.4" fill="none" stroke-linecap="round">' +
      '<path d="M150 24v32M136 32l28 16M164 32l-28 16"/>' +
      '<path d="M150 32l-4 5M150 32l4 5M142 37l-3 6M142 37l6 2M158 37l3 6M158 37l-6 2"/>' +
      '</g>' +
      '<path d="M100 100h100v40H100z" fill="#D9DDD8"/>' +
      '<g transform="translate(148,132)">' +
      '<path d="M0 0V-40" stroke="#7E8F86" stroke-width="3" stroke-linecap="round"/>' +
      leaf(-12, -32, 13, 6, -26, '#9FB6B8') + leaf(12, -36, 13, 6, 26, '#AFC4C4') +
      leaf(-10, -46, 12, 5.5, -20, '#AFC4C4') + leaf(10, -50, 12, 5.5, 20, '#9FB6B8') +
      '</g>' +
      '<g fill="#FFFFFF" opacity=".9"><circle cx="122" cy="112" r="2"/><circle cx="172" cy="118" r="1.8"/><circle cx="132" cy="124" r="1.6"/><circle cx="186" cy="104" r="1.6"/></g>' +
      '<path d="M100 0v140" stroke="#FBF7F1" stroke-width="3"/>'
    );
  };

  PICS.coldNight = function () {
    return wrap(
      '<rect width="200" height="140" fill="#DEE7EA"/>' +
      '<circle cx="158" cy="30" r="14" fill="#F7FAF8"/>' +
      '<circle cx="152" cy="26" r="12" fill="#DEE7EA"/>' +
      '<g stroke="#8FA6AE" stroke-width="2" fill="none" stroke-linecap="round">' +
      '<path d="M44 24v22M34 29l20 12M54 29L34 41"/></g>' +
      '<g fill="#DFE9EA"><circle cx="88" cy="20" r="2"/><circle cx="112" cy="38" r="1.7"/><circle cx="128" cy="16" r="1.8"/><circle cx="180" cy="52" r="1.6"/></g>' +
      ground(72, '#D3DCD6') +
      '<g stroke="#FBFDFB" stroke-width="2.4" opacity=".9" fill="none" stroke-linecap="round">' +
      '<path d="M0 86c26-4 46-2 68 2 26 4 48 2 72-2 22-4 40-4 60 0"/><path d="M0 120c30-4 52-2 74 2 26 4 50 2 74-2 24-4 44-4 52-2"/></g>' +
      '<g transform="translate(52,124)">' +
      '<path d="M0 0V-34" stroke="#7E8F86" stroke-width="3" stroke-linecap="round"/>' +
      leaf(-11, -26, 12, 5.5, -28, '#8FA9A4') + leaf(11, -30, 12, 5.5, 28, '#9DB6B0') +
      leaf(-9, -38, 11, 5, -34, '#9DB6B0') + leaf(9, -12, 10, 4.6, 34, '#8FA9A4') +
      '</g>' +
      '<g transform="translate(122,128)">' +
      '<path d="M0 0V-26" stroke="#7E8F86" stroke-width="2.8" stroke-linecap="round"/>' +
      leaf(-9, -20, 10, 4.6, -30, '#9DB6B0') + leaf(9, -24, 10, 4.6, 30, '#8FA9A4') +
      '</g>' +
      '<g fill="#FFFFFF" opacity=".95">' +
      '<circle cx="44" cy="90" r="2.4"/><circle cx="66" cy="84" r="2"/><circle cx="114" cy="96" r="2.2"/>' +
      '<circle cx="150" cy="88" r="2"/><circle cx="34" cy="108" r="1.8"/><circle cx="138" cy="112" r="1.8"/></g>' +
      '<g stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity=".95">' +
      '<path d="M41 86l6 6M47 86l-6 6M64 80l6 6M70 80l-6 6M111 92l6 6M117 92l-6 6"/></g>'
    );
  };

  PICS.leafBurnt = function () {
    return wrap(
      '<rect width="200" height="140" fill="#FBF0DE"/>' + sun(158, 28, 12, '#D99A45') +
      ground(96, '#DCC3A4') +
      '<g transform="translate(96,128)">' +
      '<path d="M0 0V-52" stroke="#8A5A3B" stroke-width="3" stroke-linecap="round"/>' +
      leaf(-14, -44, 14, 7, -22, '#B77A3E') + leaf(14, -48, 14, 7, 22, '#C08A3E') +
      '<path d="M-22 -50c8-6 18-6 26-2-6 8-18 10-26 2z" fill="#6E4529" opacity=".8"/>' +
      '<path d="M8 -58c8-4 16-2 20 4-8 4-16 2-20-4z" fill="#6E4529" opacity=".7"/>' +
      '</g>'
    );
  };

  PICS.leafWilt = function () {
    return wrap(
      '<rect width="200" height="140" fill="#FBF0DE"/>' + sun(158, 26, 12, '#D99A45', 1) +
      ground(100, '#DCC3A4') +
      '<g transform="translate(96,130)">' +
      '<path d="M0 0c2-20 2-34-4-48" stroke="#A8935F" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M-4 -44c-14 2-22 8-26 16 12 4 22-2 26-16z" fill="#B79A6A"/>' +
      '<path d="M-2 -38c12 4 18 12 20 20-12 2-20-6-20-20z" fill="#C7A050"/>' +
      '<path d="M2 -30c-12 6-16 14-16 22 10-2 16-10 16-22z" fill="#A8935F"/>' +
      '</g>'
    );
  };

  PICS.soilDark = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' +
      '<path d="M0 58h200v82H0z" fill="#4A342A"/>' +
      '<g fill="#3B2A21">' +
      '<circle cx="30" cy="78" r="9"/><circle cx="58" cy="96" r="7"/><circle cx="96" cy="74" r="10"/>' +
      '<circle cx="134" cy="96" r="8"/><circle cx="168" cy="76" r="9"/><circle cx="44" cy="118" r="8"/>' +
      '<circle cx="108" cy="118" r="9"/><circle cx="158" cy="120" r="7"/></g>' +
      '<g fill="#6E4E3C" opacity=".8"><circle cx="44" cy="70" r="4"/><circle cx="82" cy="108" r="4"/><circle cx="122" cy="84" r="4"/><circle cx="178" cy="108" r="3.4"/></g>' +
      '<g stroke="#93A78C" stroke-width="2" fill="none" opacity=".55"><path d="M20 62c10 8 16 12 26 14"/><path d="M150 60c8 8 16 12 24 14"/></g>' +
      '<path d="M100 62c0-14 2-22 6-30" stroke="#93A78C" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      leaf(92, 40, 10, 5, -28, P.sage) + leaf(108, 34, 9, 4.5, 26, P.sage2)
    );
  };

  PICS.soilPale = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F6F1E6"/>' +
      '<path d="M0 58h200v82H0z" fill="#D8C39C"/>' +
      '<g fill="#CBB389"><rect x="16" y="66" width="52" height="26" rx="5"/><rect x="74" y="64" width="44" height="24" rx="4"/>' +
      '<rect x="126" y="66" width="56" height="26" rx="5"/><rect x="26" y="98" width="48" height="24" rx="4"/>' +
      '<rect x="82" y="96" width="52" height="26" rx="4"/><rect x="142" y="100" width="44" height="22" rx="4"/></g>' +
      '<g stroke="#B49B77" stroke-width="2" fill="none"><path d="M8 72l10 8M60 108l8 8M118 74l10 6M158 118l8 6M30 62l6 8M92 62l8 6"/></g>' +
      '<g stroke="#E7D7C5" stroke-width="2" opacity=".8"><path d="M0 118h200"/></g>'
    );
  };

  PICS.soilDry = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F7F1E4"/>' + sun(164, 26, 11, P.warn) +
      '<path d="M0 56h200v84H0z" fill="#C9AE86"/>' + cracks(74, '#A98D65') +
      '<g stroke="#A98D65" stroke-width="2" fill="none"><path d="M14 56v84M186 56v84"/></g>' +
      '<path d="M24 56c6 10 6 18 2 26" stroke="#B99B70" stroke-width="3" fill="none"/>' +
      '<g fill="#B99B70"><circle cx="52" cy="96" r="3"/><circle cx="86" cy="112" r="2.4"/><circle cx="128" cy="94" r="3"/></g>'
    );
  };

  PICS.soilMoist = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + cloud(56, 22, .6) +
      '<path d="M0 56h200v84H0z" fill="#6E5541"/>' +
      '<g fill="#5A442F"><circle cx="40" cy="80" r="9"/><circle cx="86" cy="98" r="8"/><circle cx="134" cy="78" r="10"/><circle cx="172" cy="100" r="7"/></g>' +
      '<g stroke="#8A6C51" stroke-width="3" fill="none" opacity=".8"><path d="M20 74c10 6 18 8 28 8"/><path d="M110 70c12 8 20 10 30 10"/></g>' +
      '<g fill="#93A78C"><circle cx="60" cy="66" r="4" opacity=".85"/><circle cx="144" cy="64" r="3.4" opacity=".7"/></g>'
    );
  };

  PICS.waterRain = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + cloud(76, 32, .95) +
      rain(64, 56, 10, '#8FA9B0') +
      '<path d="M0 100c30-8 52-6 74 2 24 8 48 8 72 0 20-6 38-6 54 0v38H0z" fill="#A9B784"/>' +
      '<ellipse cx="120" cy="116" rx="30" ry="8" fill="#93A78C" opacity=".55"/>' +
      plant(38, 122, .9, P.sage3) + plant(170, 120, .85, P.sage2)
    );
  };

  PICS.waterWell = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F4EDE1"/>' +
      '<path d="M0 112h200v28H0z" fill="#C9B389"/>' +
      '<g><rect x="62" y="66" width="76" height="46" rx="6" fill="#B6A48B"/>' +
      '<g stroke="#9C8B72" stroke-width="2"><path d="M62 78h76M62 90h76M62 102h76"/></g>' +
      '<ellipse cx="100" cy="66" rx="38" ry="9" fill="#8A5A3B"/>' +
      '<ellipse cx="100" cy="66" rx="30" ry="6.4" fill="#3B2A21"/>' +
      '<path d="M70 66V38M130 66V38M66 38h68" stroke="#8A5A3B" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M100 40v14" stroke="#6E4529" stroke-width="2"/><rect x="94" y="52" width="12" height="10" rx="2" fill="#8A5A3B"/>' +
      '</g>' +
      '<path d="M162 112c0-12 6-20 14-20s14 8 14 20z" fill="#93A78C"/>'
    );
  };

  PICS.waterIrr = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(164, 24, 10, '#E7C98C') +
      '<path d="M0 78h200v62H0z" fill="#C9B389"/>' +
      '<g stroke="#6E4529" stroke-width="3" fill="none"><path d="M16 92h168"/><path d="M16 118h168"/></g>' +
      '<g fill="#7C9375">' +
      '<circle cx="40" cy="104" r="3"/><circle cx="62" cy="104" r="3"/><circle cx="84" cy="104" r="3"/><circle cx="106" cy="104" r="3"/><circle cx="128" cy="104" r="3"/><circle cx="150" cy="104" r="3"/>' +
      '</g>' +
      '<g stroke="#8FA9B0" stroke-width="2" stroke-dasharray="3 4"><path d="M40 96v-8M84 96v-8M128 96v-8"/></g>' +
      '<g>' + plant(40, 132, .8, P.sage3) + plant(84, 132, .8, P.sage2) + plant(128, 132, .8, P.sage3) + '</g>'
    );
  };

  PICS.drySprout = function () {
    return wrap(
      '<rect width="200" height="140" fill="#FBF0DE"/>' + sun(160, 26, 12, '#D99A45') +
      '<path d="M0 66h200v74H0z" fill="#C9AE86"/>' + cracks(80, '#A98D65') +
      '<g>' + plant(58, 118, .7, '#A8935F', 1) + plant(112, 122, .65, '#B7A06B', 1) + plant(158, 116, .6, '#A8935F', 1) + '</g>' +
      '<g stroke="#B99B70" stroke-width="2"><path d="M0 66h200M0 74h200"/></g>'
    );
  };

  PICS.stayGreen = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + ground(74, '#B08A63') +
      '<g>' + plant(44, 124, 1.2, P.sage3) + plant(96, 128, 1.1, P.sage2) + plant(148, 124, 1.2, P.sage3) + '</g>' +
      '<path d="M16 92c10 6 18 8 28 8" stroke="#93A78C" stroke-width="3" fill="none" opacity=".7"/>'
    );
  };

  PICS.rainGauge = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F4EDE1"/>' + cloud(60, 24, .7) + rain(46, 44, 6, '#8FA9B0') +
      '<path d="M0 106h200v34H0z" fill="#C9B389"/>' +
      '<g transform="translate(96,26)">' +
      '<path d="M-10 0h20l-3 74h-14z" fill="#7C9375" opacity=".35" stroke="#5C775C" stroke-width="2"/>' +
      '<g stroke="#5C775C" stroke-width="1.6"><path d="M-9 24h18M-9.6 40h19M-10 56h20"/></g>' +
      '<path d="M-11 60h22v14h-22z" fill="#8FA9B0" opacity=".8"/>' +
      '</g>' +
      plant(162, 108, .8, P.sage3) + plant(34, 110, .7, P.sage2)
    );
  };

  PICS.seedbed = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(168, 24, 10, '#E7C98C') +
      '<path d="M0 62h200v78H0z" fill="#8A5A3B"/>' +
      furrows(76, '#6E4529', -2) +
      '<g stroke="#DCC3A4" stroke-width="2" opacity=".65"><path d="M0 74h200"/></g>' +
      '<g fill="#C9A882"><circle cx="46" cy="86" r="3.4"/><circle cx="82" cy="88" r="3.4"/><circle cx="120" cy="86" r="3.4"/><circle cx="158" cy="88" r="3.4"/></g>'
    );
  };

  PICS.sowCal = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F4EDE1"/>' +
      '<g transform="translate(42,20)">' +
      '<rect width="116" height="100" rx="12" fill="#FFFFFF" stroke="#E0CFBB" stroke-width="2"/>' +
      '<rect width="116" height="24" rx="12" fill="#8A5A3B"/><rect y="14" width="116" height="10" fill="#8A5A3B"/>' +
      '<g fill="#E7D7C5">' +
      grid() + '</g>' +
      '<g fill="#93A78C"><rect x="46" y="52" width="16" height="12" rx="3"/><rect x="66" y="52" width="16" height="12" rx="3"/></g>' +
      '<g fill="#B98432"><rect x="26" y="52" width="16" height="12" rx="3"/></g>' +
      '<g stroke="#5C775C" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M60 86l8 6 14-16"/></g>' +
      '</g>'
    );
    function grid() {
      var g = '';
      for (var r = 0; r < 3; r++) for (var c = 0; c < 5; c++) g += '<rect x="' + (22 + c * 18) + '" y="' + (38 + r * 18) + '" width="12" height="12" rx="2" opacity=".5"/>';
      return g;
    }
  };

  PICS.seedDepth = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F7F1E4"/>' +
      '<path d="M0 24h200v116H0z" fill="#E7D7C5"/>' +
      '<path d="M0 24h200v40H0z" fill="#B08A63"/>' +
      '<g stroke="#FFFFFF" stroke-width="2" stroke-dasharray="5 5"><path d="M0 64h200"/></g>' +
      '<g fill="#DCC3A4"><circle cx="50" cy="48" r="4"/><circle cx="90" cy="50" r="4"/><circle cx="130" cy="48" r="4"/><circle cx="168" cy="50" r="4"/></g>' +
      '<g stroke="#6E4529" stroke-width="2"><path d="M50 48v18M90 50v18M130 48v18M168 50v18"/></g>' +
      '<text x="12" y="86" font-family="Segoe UI, sans-serif" font-size="11" fill="#6E4529">5 cm</text>'
    );
  };

  PICS.journal = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F4EDE1"/>' +
      '<g transform="translate(54,20)">' +
      '<rect width="96" height="104" rx="8" fill="#FBF7F1" stroke="#E0CFBB" stroke-width="2"/>' +
      '<rect x="-6" width="14" height="104" rx="5" fill="#8A5A3B"/>' +
      '<g stroke="#C9A882" stroke-width="2" stroke-linecap="round"><path d="M22 26h60M22 42h52M22 58h60M22 74h38"/></g>' +
      '<g stroke="#93A78C" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M68 88l7 6 12-14"/></g>' +
      '</g>'
    );
  };

  PICS.noBurn = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F7F1E4"/>' +
      '<path d="M0 100h200v40H0z" fill="#C9B389"/>' +
      '<g ' + t(78, 34, 1) + '>' +
      '<path d="M4 52c-8-10-4-20 4-26 2 8 8 10 10 4 4-8 0-14 0-14 12 6 18 16 18 26 0 8-6 14-16 14z" fill="#D99A45"/>' +
      '<path d="M16 50c-4-6-2-12 2-16 0 6 4 8 6 4 2-4 0-8 0-8 6 4 9 10 9 15 0 5-3 8-8 8z" fill="#F0DDB4"/>' +
      '</g>' +
      '<g transform="translate(128,40)"><circle r="20" fill="#F8E8E4"/><g transform="translate(10,10)">' + cross('#A8503F') + '</g></g>' +
      straw(20, 120, 8, '#C9A882')
    );
  };

  PICS.mulch = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(168, 24, 10, '#E7C98C') +
      '<path d="M0 62h200v78H0z" fill="#8A5A3B"/>' +
      '<path d="M0 62h200v10H0z" fill="#6E4529" opacity=".5"/>' +
      straw(8, 76, 24, '#D8B98E') + straw(20, 92, 24, '#C9A882') + straw(4, 108, 20, '#D8B98E') +
      '<g>' + plant(58, 128, .85, P.sage3) + plant(146, 132, .8, P.sage2) + '</g>'
    );
  };

  PICS.mulchRain = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + cloud(66, 24, .85) + rain(54, 46, 8, '#8FA9B0') +
      '<path d="M0 86h200v54H0z" fill="#8A5A3B"/>' + straw(6, 96, 22, '#D8B98E') + straw(14, 112, 20, '#C9A882') +
      '<path d="M0 86h200v6H0z" fill="#93A78C" opacity=".5"/>'
    );
  };

  PICS.contourLine = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' +
      '<path d="M0 132L96 24h104v108z" fill="#C9A882"/>' +
      '<g stroke="#F3E9DD" stroke-width="2.6" fill="none"><path d="M28 120c34-30 70-48 108-58"/></g>' +
      '<g stroke="#5C775C" stroke-width="2" stroke-dasharray="5 5" fill="none"><path d="M24 130c36-30 74-50 116-60"/></g>' +
      stoneRow(40, 108, 6, .75, '#B5A48D') +
      '<g transform="translate(136,92)"><path d="M0 0v-16" stroke="#6E4529" stroke-width="2.4"/><path d="M-8 0h16l-8 12z" fill="#7C9375"/></g>'
    );
  };

  PICS.stoneBunds = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + cloud(150, 22, .55) +
      '<path d="M0 132L92 28h108v104z" fill="#B08A63"/>' +
      stoneRow(28, 116, 8, .85) + stoneRow(56, 92, 7, .75) + stoneRow(82, 70, 6, .65) +
      '<g stroke="#C9A882" stroke-width="2" fill="none" opacity=".7"><path d="M20 126c30-26 60-42 96-52"/></g>' +
      plant(24, 132, .8, P.sage3) + shrub(160, 62, .8, P.sage)
    );
  };

  PICS.bundsField = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(166, 24, 10, '#E7C98C') +
      '<path d="M0 60h200v80H0z" fill="#C9B389"/>' +
      '<g stroke="#A79A88" stroke-width="6" stroke-linecap="round" opacity=".9">' +
      '<path d="M0 78c40-6 90-4 200 2"/><path d="M0 104c50-6 100-4 200 2"/><path d="M0 128c50-6 110-4 200 0"/></g>' +
      '<g>' + plant(34, 96, .7, P.sage3) + plant(88, 94, .7, P.sage2) + plant(144, 94, .7, P.sage3) +
      plant(56, 120, .7, P.sage2) + plant(120, 122, .7, P.sage3) + '</g>'
    );
  };

  PICS.checkDam = function () {
    return wrap(
      '<rect width="200" height="140" fill="#E9DCC8"/>' +
      '<path d="M0 26h200v114H0z" fill="#D7BE9C"/>' +
      '<path d="M0 40c40 14 66 34 82 60 8 14 12 26 14 40H0z" fill="#C0A17A"/>' +
      '<path d="M112 26c-6 26-16 48-34 66-12 12-24 20-38 26V26z" fill="#C9A882" opacity=".55"/>' +
      '<g transform="translate(70,72)">' +
      '<path d="M0 40c4-16 14-26 34-30 20-4 34 2 42 14" fill="none" stroke="#8A5A3B" stroke-width="10" stroke-linecap="round"/>' +
      stoneRow(4, 34, 5, .8, '#A79A88') +
      '</g>' +
      '<g>' + plant(20, 60, .7, P.sage3) + plant(168, 46, .6, P.sage2) + '</g>' +
      '<path d="M150 100c-8 8-18 12-30 14" stroke="#8FA9B0" stroke-width="3" fill="none" opacity=".7"/>'
    );
  };

  PICS.grassGully = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + cloud(56, 24, .6) +
      '<path d="M0 46h200v94H0z" fill="#C9A882"/>' +
      '<path d="M0 62c40 10 66 26 84 46 10 12 16 22 20 32H0z" fill="#A98D65"/>' +
      '<g>' + plant(34, 78, .7, P.sage3) + plant(56, 90, .7, P.sage2) + plant(76, 104, .7, P.sage3) +
      plant(44, 112, .7, P.sage2) + plant(96, 122, .7, P.sage3) + shrub(160, 60, .8, P.sage) + '</g>' +
      stoneRow(96, 118, 4, .6, '#B5A48D')
    );
  };

  PICS.contourPlough = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(168, 24, 10, '#E7C98C') +
      '<path d="M0 62h200v78H0z" fill="#B08A63"/>' +
      '<g stroke="#8A5A3B" stroke-width="3" fill="none" opacity=".8">' +
      '<path d="M0 74c40-8 90-6 200 0"/><path d="M0 88c40-8 90-6 200 0"/>' +
      '<path d="M0 102c40-8 90-6 200 0"/><path d="M0 116c40-8 90-6 200 0"/><path d="M0 130c40-8 90-6 200 0"/></g>' +
      '<g transform="translate(140,64)"><rect x="0" y="-8" width="26" height="14" rx="4" fill="#8A5A3B"/><circle cx="6" cy="8" r="6" fill="#3B2A21"/><circle cx="21" cy="8" r="6" fill="#3B2A21"/></g>'
    );
  };

  PICS.stripCrop = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(170, 22, 9, '#E7C98C') +
      '<path d="M0 56h48v84H0z" fill="#93A78C"/><path d="M64 56h48v84H64z" fill="#C9B389"/>' +
      '<path d="M128 56h48v84h-48z" fill="#7C9375"/><path d="M160 56h40v84h-40z" fill="#C9B389"/>' +
      '<g stroke="#FBF7F1" stroke-width="3"><path d="M56 56v84M120 56v84"/></g>' +
      '<g>' + plant(14, 124, .7, P.sage3) + plant(30, 128, .7, P.sage3) + plant(34, 110, .7, P.sage2) +
      plant(80, 122, .7, '#A8935F') + plant(96, 112, .7, '#A8935F') +
      plant(140, 124, .7, P.sage3) + plant(158, 114, .7, P.sage2) + plant(176, 128, .7, '#A8935F') + '</g>'
    );
  };

  PICS.legume = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + ground(96, '#8A5A3B') +
      '<g transform="translate(100,110)">' +
      '<path d="M0 0V-58" stroke="' + P.sage3 + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      leaf(-16, -44, 13, 7, -30, P.sage) + leaf(16, -50, 13, 7, 30, P.sage2) +
      leaf(-14, -62, 11, 6, -24, P.sage2) + leaf(14, -68, 11, 6, 24, P.sage) +
      '<g fill="#DCC3A4"><ellipse cx="-20" cy="-26" rx="11" ry="5" transform="rotate(-28 -20 -26)"/><ellipse cx="20" cy="-30" rx="11" ry="5" transform="rotate(28 20 -30)"/><ellipse cx="-16" cy="-12" rx="9" ry="4.4" transform="rotate(-22 -16 -12)"/></g>' +
      '</g>' +
      '<g fill="#F3E9DD" opacity=".9">' +
      '<circle cx="88" cy="118" r="3.4"/><circle cx="100" cy="124" r="3"/><circle cx="112" cy="116" r="3.6"/><circle cx="96" cy="130" r="2.8"/><circle cx="116" cy="128" r="2.6"/></g>' +
      '<g stroke="#E7D7C5" stroke-width="1.6" fill="none" opacity=".8"><path d="M100 108c-8 8-10 14-8 20M100 108c8 8 12 14 12 22"/></g>'
    );
  };

  PICS.favaField = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + cloud(58, 22, .6) +
      '<path d="M0 84h200v56H0z" fill="#8A5A3B"/>' +
      '<g>' + plant(30, 118, 1, P.sage3) + plant(72, 122, 1.05, P.sage2) + plant(116, 118, 1, P.sage3) + plant(160, 122, .95, P.sage2) + '</g>' +
      '<g fill="#DCC3A4"><ellipse cx="72" cy="96" rx="10" ry="4.4" transform="rotate(-24 72 96)"/><ellipse cx="116" cy="94" rx="10" ry="4.4" transform="rotate(24 116 94)"/></g>'
    );
  };

  PICS.compost = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(166, 22, 9, '#E7C98C') +
      '<path d="M0 104h200v36H0z" fill="#C9B389"/>' +
      '<path d="M40 104c0-26 14-42 34-42s34 16 34 42z" fill="#6E4E3C"/>' +
      '<path d="M56 104c0-18 8-28 20-28s20 10 20 28z" fill="#8A5A3B"/>' +
      '<g stroke="#FBF7F1" stroke-width="2" opacity=".35" fill="none"><path d="M48 96c8-6 18-8 28-6M60 84c6-4 14-4 20 0"/></g>' +
      '<g stroke="#93A78C" stroke-width="2" fill="none" opacity=".7"><path d="M76 54c-4-8-2-14 4-18M96 52c4-8 2-14-2-18"/></g>' +
      '<g transform="translate(146,80) rotate(12)"><rect x="0" y="0" width="6" height="34" rx="3" fill="#8A5A3B"/><path d="M-6 4h18l-3 10h-12z" fill="#8A5A3B"/></g>' +
      '<g fill="#B08A63"><circle cx="164" cy="112" r="3"/><circle cx="176" cy="118" r="2.4"/></g>'
    );
  };

  PICS.coverCrop = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + ground(70, '#8A5A3B') +
      '<g fill="#7C9375">' +
      '<circle cx="30" cy="112" r="13"/><circle cx="58" cy="104" r="14"/><circle cx="86" cy="114" r="12"/>' +
      '<circle cx="112" cy="102" r="14"/><circle cx="140" cy="112" r="13"/><circle cx="168" cy="102" r="14"/></g>' +
      '<g fill="#93A78C"><circle cx="44" cy="88" r="11"/><circle cx="100" cy="88" r="12"/><circle cx="154" cy="88" r="11"/><circle cx="74" cy="78" r="9"/><circle cx="130" cy="76" r="9"/></g>' +
      '<g stroke="#5C775C" stroke-width="2" opacity=".7"><path d="M20 94c10-4 18-4 28 0M86 92c10-4 18-4 28 0M146 92c10-4 18-4 28 0"/></g>'
    );
  };

  PICS.coverGrow = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + cloud(70, 22, .7) + rain(58, 44, 8, '#8FA9B0') +
      '<path d="M0 96h200v44H0z" fill="#6E4529"/>' +
      '<g fill="#5C775C"><circle cx="24" cy="104" r="12"/><circle cx="52" cy="98" r="14"/><circle cx="84" cy="106" r="12"/>' +
      '<circle cx="112" cy="96" r="14"/><circle cx="144" cy="106" r="12"/><circle cx="174" cy="96" r="13"/></g>' +
      '<g stroke="#FBF7F1" stroke-width="2" opacity=".6" fill="none"><path d="M30 110c6-6 14-8 22-6M118 104c6-6 14-8 22-6"/></g>'
    );
  };

  PICS.coverCut = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(166, 24, 10, '#E7C98C') +
      '<path d="M0 92h200v48H0z" fill="#8A5A3B"/>' +
      '<g fill="#93A78C"><circle cx="34" cy="104" r="11"/><circle cx="62" cy="98" r="12"/><circle cx="146" cy="102" r="11"/><circle cx="174" cy="96" r="12"/></g>' +
      '<g transform="translate(84,66)"><path d="M6 0l16 22" stroke="#6E4529" stroke-width="3" stroke-linecap="round"/><path d="M0 6a10 10 0 0 1 12-6l10 14a10 10 0 0 1-12 6z" fill="#B6A48B"/></g>' +
      '<g fill="#C9A882" opacity=".85"><circle cx="110" cy="112" r="3"/><circle cx="122" cy="118" r="2.4"/><circle cx="100" cy="120" r="2.6"/></g>'
    );
  };

  PICS.dripLine = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(166, 22, 9, '#E7C98C') +
      '<path d="M0 74h200v66H0z" fill="#8A5A3B"/>' +
      '<g stroke="#3B2A21" stroke-width="3" fill="none"><path d="M12 84h176"/></g>' +
      '<g stroke="#8FA9B0" stroke-width="2">' +
      drop(40) + drop(84) + drop(128) + drop(170) + '</g>' +
      '<g>' + plant(40, 132, .9, P.sage3) + plant(84, 132, .9, P.sage2) + plant(128, 132, .9, P.sage3) + plant(170, 132, .85, P.sage2) + '</g>' +
      '<g fill="#5C775C" opacity=".7"><circle cx="48" cy="120" r="3"/><circle cx="92" cy="120" r="3"/><circle cx="136" cy="120" r="3"/></g>'
    );
    function drop(x) { return '<path d="M' + x + ' 92v14" stroke-dasharray="3 4"/>'; }
  };

  PICS.windbreak = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(30, 28, 12, '#E7C98C') +
      '<path d="M0 96h200v44H0z" fill="#C9B389"/>' +
      '<g><path d="M40 104V62" stroke="#6E4529" stroke-width="4"/><circle cx="40" cy="54" r="18" fill="#7C9375"/><circle cx="26" cy="62" r="12" fill="#93A78C"/><circle cx="54" cy="62" r="12" fill="#5C775C"/></g>' +
      '<g><path d="M100 106V70" stroke="#6E4529" stroke-width="4"/><circle cx="100" cy="62" r="16" fill="#93A78C"/><circle cx="88" cy="70" r="10" fill="#5C775C"/><circle cx="112" cy="70" r="10" fill="#7C9375"/></g>' +
      '<g><path d="M158 104V66" stroke="#6E4529" stroke-width="4"/><circle cx="158" cy="58" r="17" fill="#7C9375"/><circle cx="146" cy="66" r="11" fill="#93A78C"/><circle cx="170" cy="66" r="11" fill="#5C775C"/></g>' +
      '<g stroke="#8FA9B0" stroke-width="2" fill="none" opacity=".6" stroke-dasharray="6 5"><path d="M0 40c20 6 34 6 52 0"/><path d="M0 52c22 6 38 6 58 0"/></g>' +
      '<g>' + plant(70, 132, .75, P.sage3) + plant(128, 130, .7, P.sage2) + plant(186, 132, .7, P.sage3) + '</g>'
    );
  };

  PICS.treeGuard = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' +
      '<path d="M0 100h200v40H0z" fill="#C9B389"/>' +
      '<g transform="translate(100,100)">' +
      '<path d="M0 0v-34" stroke="#6E4529" stroke-width="5"/>' +
      '<circle cx="0" cy="-44" r="15" fill="#93A78C"/><circle cx="-12" cy="-38" r="10" fill="#7C9375"/><circle cx="12" cy="-38" r="10" fill="#5C775C"/>' +
      '<g stroke="#B08A63" stroke-width="3"><path d="M-18 0v-22M18 0v-22M-18 -14h36M-18 -4h36"/></g>' +
      '</g>' +
      '<g stroke="#8FA9B0" stroke-width="2" fill="none" opacity=".55" stroke-dasharray="5 6"><path d="M20 58c14 4 24 4 36 0"/></g>'
    );
  };

  PICS.photoLeaves = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F4EDE1"/>' +
      '<g transform="translate(62,16)">' +
      '<rect width="76" height="110" rx="12" fill="#3B2A21"/>' +
      '<rect x="5" y="10" width="66" height="84" rx="6" fill="#93A78C"/>' +
      '<g>' + plant(26, 88, .9, '#5C775C') + plant(50, 92, .8, '#7C9375') + '</g>' +
      '<circle cx="38" cy="103" r="4" fill="#E7D7C5"/>' +
      '</g>' +
      '<g transform="translate(150,30)"><circle r="17" fill="#B98432" opacity=".18"/><path d="M-8 0h16M0-8v16" stroke="#8A5A2B" stroke-width="2.4" stroke-linecap="round"/></g>'
    );
  };

  PICS.voiceNote = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F4EDE1"/>' +
      '<circle cx="100" cy="70" r="42" fill="#93A78C" opacity=".2"/>' +
      '<circle cx="100" cy="70" r="30" fill="#7C9375"/>' +
      '<g fill="#FBF7F1"><rect x="94" y="52" width="12" height="24" rx="6"/><path d="M86 72c0 8 6 14 14 14s14-6 14-14" stroke="#FBF7F1" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M100 86v8" stroke="#FBF7F1" stroke-width="3" stroke-linecap="round"/></g>' +
      '<g stroke="#7C9375" stroke-width="2.4" stroke-linecap="round" opacity=".8"><path d="M46 58c-4 8-4 16 0 24"/><path d="M34 50c-6 12-6 28 0 40"/><path d="M154 58c4 8 4 16 0 24"/><path d="M166 50c6 12 6 28 0 40"/></g>'
    );
  };

  PICS.sendReport = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' +
      '<g transform="translate(64,24)">' +
      '<rect width="72" height="98" rx="10" fill="#FBF7F1" stroke="#E0CFBB" stroke-width="2"/>' +
      '<g stroke="#DCCDBB" stroke-width="2"><path d="M12 22h48M12 34h36M12 46h44"/></g>' +
      '<g transform="translate(22,58)"><circle r="14" fill="#93A78C"/><g transform="translate(7,7) scale(.9)">' + check('#FBF7F1') + '</g></g>' +
      '</g>' +
      '<g transform="translate(120,78)"><path d="M0 18L52 0 38 44l-9-16z" fill="#7C9375"/><path d="M52 0L27 26" stroke="#FBF7F1" stroke-width="2"/></g>' +
      '<g fill="#93A78C" opacity=".5"><circle cx="34" cy="40" r="3"/><circle cx="24" cy="60" r="2.4"/><circle cx="38" cy="76" r="2.8"/></g>'
    );
  };

  PICS.harvestBasket = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' + sun(166, 22, 9, '#E7C98C') +
      '<path d="M0 108h200v32H0z" fill="#C9B389"/>' +
      '<g stroke="#8A5A3B" stroke-width="3" fill="none"><path d="M62 58c0-20 12-32 28-32s28 12 28 32"/></g>' +
      '<path d="M52 58h96l-10 52H62z" fill="#C9A882"/>' +
      '<g stroke="#8A5A3B" stroke-width="2" opacity=".7"><path d="M60 74h98M64 90h92M68 104h84"/><path d="M76 58l6 52M100 58v52M124 58l-6 52"/></g>' +
      '<g fill="#D8CBA5"><ellipse cx="80" cy="52" rx="6" ry="9" transform="rotate(-24 80 52)"/><ellipse cx="100" cy="48" rx="6" ry="9"/><ellipse cx="120" cy="52" rx="6" ry="9" transform="rotate(24 120 52)"/></g>' +
      '<g stroke="#93A78C" stroke-width="2" fill="none"><path d="M150 108v-16M144 100c0-6 6-10 12-8"/></g>'
    );
  };

  PICS.satelliteView = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' +
      '<g transform="translate(112,18) rotate(12)">' +
      '<rect x="0" y="6" width="34" height="14" rx="3" fill="#8A5A3B"/><rect x="0" y="24" width="34" height="14" rx="3" fill="#6E4529"/>' +
      '<rect x="32" y="12" width="16" height="20" rx="5" fill="#8A5A3B"/><rect x="46" y="16" width="10" height="6" rx="2" fill="#6E4529"/>' +
      '</g>' +
      '<g stroke="#93A78C" stroke-width="2" stroke-dasharray="4 6" fill="none"><path d="M112 62L54 108M124 66l30 32"/></g>' +
      '<path d="M0 100h200v40H0z" fill="#93A78C"/>' +
      '<path d="M0 108c40-6 80-4 120 4 30 6 56 4 80 0v10H0z" fill="#7C9375" opacity=".7"/>' +
      '<g stroke="#FBF7F1" stroke-width="3" opacity=".8"><path d="M24 116h44v10H24zM96 118h52v10H96z"/></g>' +
      '<g fill="#C9A882"><rect x="24" y="116" width="44" height="4"/><rect x="96" y="118" width="52" height="4"/></g>'
    );
  };

  PICS.technician = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F4EDE1"/>' +
      '<g transform="translate(100,18)">' +
      '<circle cx="0" cy="20" r="16" fill="#B9895F"/>' +
      '<path d="M-26 24c0-10 6-18 16-20 4 8 12 12 20 12 4 0 8-1 12-4 2 4 4 8 4 12-14 6-32 6-52 0z" fill="#E7D7C5"/>' +
      '<path d="M-30 18h60c4 0 4 6 0 8-10 6-44 6-54 0-4-2-6-8-6-8z" fill="#C9A882"/>' +
      '<path d="M-28 46c6-6 16-10 28-10s22 4 28 10l-4 44h-48z" fill="#7C9375"/>' +
      '<path d="M-6 44h12l-2 24h-8z" fill="#FBF7F1"/>' +
      '<g transform="translate(26,54)"><rect width="22" height="28" rx="4" fill="#FBF7F1" stroke="#E0CFBB" stroke-width="2"/><g stroke="#93A78C" stroke-width="1.6"><path d="M5 9h12M5 15h9M5 21h11"/></g></g>' +
      '</g>' +
      '<g stroke="#93A78C" stroke-width="2" opacity=".6"><path d="M20 132h160"/></g>'
    );
  };

  PICS.money = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F4EDE1"/>' +
      '<g transform="translate(40,40)">' +
      '<rect width="120" height="62" rx="10" fill="#93A78C"/>' +
      '<rect x="8" y="8" width="104" height="46" rx="6" fill="none" stroke="#FBF7F1" stroke-width="2" opacity=".6"/>' +
      '<circle cx="60" cy="31" r="16" fill="#FBF7F1" opacity=".9"/>' +
      '<path d="M54 30c0-4 4-6 8-4 2 1 3 3 2 5-2 4-10 2-10 7 0 3 3 5 7 5" stroke="#5C775C" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '<g fill="#C9A882"><circle cx="34" cy="112" r="10"/><circle cx="56" cy="118" r="7"/></g>' +
      '<g fill="#7C9375"><circle cx="166" cy="44" r="8"/><circle cx="150" cy="34" r="5"/></g>'
    );
  };

  PICS.market = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F4EDE1"/>' +
      '<path d="M0 112h200v28H0z" fill="#C9B389"/>' +
      '<path d="M24 62h152l-12 50H36z" fill="#8A5A3B"/>' +
      '<path d="M24 62l16-24h120l16 24z" fill="#93A78C"/>' +
      '<g stroke="#FBF7F1" stroke-width="3" opacity=".8"><path d="M56 62l10-24M84 62l5-24M112 62l0-24M140 62l-5-24"/></g>' +
      '<g fill="#D8CBA5"><circle cx="66" cy="96" r="9"/><circle cx="90" cy="100" r="8"/><circle cx="116" cy="96" r="9"/><circle cx="142" cy="100" r="8"/></g>' +
      '<g fill="#7C9375"><ellipse cx="66" cy="96" rx="4" ry="6"/><ellipse cx="116" cy="96" rx="4" ry="6"/></g>'
    );
  };

  PICS.rotateArrows = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F7F1E4"/>' +
      '<g transform="translate(100,70)">' +
      '<circle r="38" fill="none" stroke="#93A78C" stroke-width="6" stroke-dasharray="46 16"/>' +
      '<path d="M36-10l10 12-14 6z" fill="#5C775C"/><path d="M-36 10l-10-12 14-6z" fill="#5C775C"/>' +
      '<g>' + plant(0, 14, 1, P.sage3) + '</g>' +
      '</g>' +
      '<g fill="#C9A882"><circle cx="30" cy="28" r="4"/><circle cx="172" cy="112" r="4"/></g>'
    );
  };

  PICS.bareSoil = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F7F1E4"/>' + sun(160, 24, 10, '#E7C98C') +
      '<path d="M0 66h200v74H0z" fill="#C9A882"/>' + furrows(80, '#B08A63', -2) +
      '<g stroke="#A98D65" stroke-width="2" fill="none"><path d="M20 110c10 6 20 8 30 8M120 100c10 6 20 8 30 8"/></g>'
    );
  };

  PICS.waterDrop = function () {
    return wrap(
      '<rect width="200" height="140" fill="#EFF3EC"/>' +
      '<g transform="translate(100,70)"><path d="M0-40C14-20 30 0 30 14c0 17-13 30-30 30S-30 31-30 14C-30 0-14-20 0-40z" fill="#8FA9B0"/><path d="M-12 18c0-8 4-16 8-22" stroke="#FBF7F1" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/></g>'
    );
  };

  PICS.shade = function () {
    return wrap(
      '<rect width="200" height="140" fill="#FBF0DE"/>' + sun(40, 30, 14, '#D99A45', 1) +
      '<path d="M0 100h200v40H0z" fill="#DCC3A4"/>' +
      '<g><path d="M120 100V50" stroke="#6E4529" stroke-width="6"/><circle cx="120" cy="38" r="24" fill="#7C9375"/><circle cx="98" cy="52" r="16" fill="#93A78C"/><circle cx="142" cy="52" r="16" fill="#5C775C"/></g>' +
      '<path d="M74 108h92l-10 26H84z" fill="#8A5A3B" opacity=".18"/>' +
      '<g>' + plant(96, 132, .8, P.sage3) + plant(126, 130, .75, P.sage2) + '</g>'
    );
  };

  PICS.checkSoil = function () {
    return wrap(
      '<rect width="200" height="140" fill="#F7F1E4"/>' +
      '<path d="M0 40h200v100H0z" fill="#8A5A3B"/>' +
      '<path d="M0 40h200v14H0z" fill="#6E4529"/>' +
      '<g stroke="#F3E9DD" stroke-width="2" stroke-dasharray="6 5"><path d="M0 84h200"/></g>' +
      '<text x="8" y="80" font-family="Segoe UI, sans-serif" font-size="10" fill="#F3E9DD">10 cm</text>' +
      '<g fill="#DCC3A4"><circle cx="64" cy="102" r="4"/><circle cx="96" cy="106" r="4"/><circle cx="128" cy="102" r="4"/></g>' +
      '<g stroke="#93A78C" stroke-width="2" fill="none" opacity=".7"><path d="M64 102c-4 8-2 14 4 18M128 102c4 8 2 14-4 18"/></g>' +
      '<g transform="translate(150,52)"><path d="M0 0c8 2 12 8 12 16" stroke="#B9895F" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="12" cy="18" r="7" fill="#B9895F"/></g>'
    );
  };

  PICS.barleyField = function () {
    var g = '';
    for (var i = 0; i < 6; i++) {
      var x = 26 + i * 30;
      g += '<g transform="translate(' + x + ',124)">' +
        '<path d="M0 0V-40" stroke="#7C9375" stroke-width="2.4" stroke-linecap="round"/>' +
        '<path d="M0 -40l-6 -8M0 -40l6 -8M0 -32l-5 -7M0 -32l5 -7" stroke="#B98432" stroke-width="2" stroke-linecap="round"/>' +
        '<ellipse cx="-4" cy="-20" rx="5" ry="2.4" fill="#93A78C" transform="rotate(-24 -4 -20)"/>' +
        '<ellipse cx="4" cy="-14" rx="5" ry="2.4" fill="#7C9375" transform="rotate(24 4 -14)"/>' +
        '</g>';
    }
    return wrap('<rect width="200" height="140" fill="#EFF3EC"/>' + sun(168, 24, 10, '#E7C98C') +
      '<path d="M0 96h200v44H0z" fill="#C9B389"/>' + g);
  };

  /* ---------- aliases ---------- */
  PICS.erosionSlope = PICS.erosion;
  PICS.gully = PICS.gullyYes;
  PICS.greenPlants = PICS.stuntNo;
  PICS.moist = PICS.soilMoist;
  PICS.dry = PICS.soilDry;
  PICS.oliveGrove = PICS.windbreak;
  PICS.disease = PICS.photoLeaves;
  PICS.spreadCompost = PICS.mulch;
  PICS.manure = PICS.compost;
  PICS.stopWater = PICS.waterWell;

  window.pic = function (name) {
    var f = PICS[name] || PICS.satelliteView;
    return f();
  };
  window.picNames = Object.keys(PICS);

  /* ---------- crop icons (40x40) ---------- */
  function cropWrap(inner) {
    return '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#F3E9DD"/>' + inner + '</svg>';
  }
  function gw() { /* wheat */ }
  var CROPS = {
    wheat: function () {
      var g = '<g stroke="#B98432" stroke-width="2" fill="none" stroke-linecap="round">';
      for (var i = 0; i < 5; i++) g += '<path d="M20 34V14" transform="rotate(' + (-16 + i * 8) + ' 20 34)"/>';
      return cropWrap(g + '</g>' +
        '<g fill="#C9A882"><g transform="translate(20,14)"><ellipse cx="-5" cy="-3" rx="4" ry="2.6" transform="rotate(-30 -5 -3)"/><ellipse cx="5" cy="-3" rx="4" ry="2.6" transform="rotate(30 5 -3)"/><ellipse cx="0" cy="-7" rx="3" ry="4"/><ellipse cx="-6" cy="3" rx="4" ry="2.6" transform="rotate(-30 -6 3)"/><ellipse cx="6" cy="3" rx="4" ry="2.6" transform="rotate(30 6 3)"/></g></g>');
    },
    barley: function () {
      var g = '<g stroke="#B98432" stroke-width="1.8" stroke-linecap="round" fill="none">';
      for (var i = 0; i < 7; i++) g += '<path d="M20 32V9" transform="rotate(' + (-24 + i * 8) + ' 20 32)"/><path d="M20 ' + (12 + i * 2.4) + 'l6-4" transform="rotate(' + (-24 + i * 8) + ' 20 32)"/>';
      return cropWrap(g + '</g><circle cx="20" cy="9" r="2.2" fill="#B98432"/>');
    },
    fava: function () {
      return cropWrap('<path d="M12 34V12" stroke="#5C775C" stroke-width="2.4" stroke-linecap="round"/>' +
        '<ellipse cx="21" cy="14" rx="8" ry="4" transform="rotate(-30 21 14)" fill="#7C9375"/>' +
        '<ellipse cx="20" cy="21" rx="9" ry="4" transform="rotate(24 20 21)" fill="#D8CBA5"/>' +
        '<ellipse cx="25" cy="19" rx="3" ry="2" fill="#8A5A3B" opacity=".55"/><ellipse cx="17" cy="24" rx="3" ry="2" fill="#8A5A3B" opacity=".55"/>');
    },
    chickpea: function () {
      return cropWrap('<path d="M20 34V16" stroke="#5C775C" stroke-width="2.2" stroke-linecap="round"/>' +
        '<path d="M20 26c-8 0-12-4-12-10 8 0 12 4 12 10z" fill="#93A78C"/>' +
        '<path d="M20 22c8 0 12-4 12-10-8 0-12 4-12 10z" fill="#7C9375"/>' +
        '<circle cx="20" cy="13" r="6" fill="#D8CBA5"/><circle cx="18.4" cy="12" r="1.6" fill="#8A5A3B" opacity=".5"/><circle cx="22" cy="14.4" r="1.4" fill="#8A5A3B" opacity=".5"/>');
    },
    cover: function () {
      return cropWrap('<g fill="#7C9375"><circle cx="14" cy="26" r="6"/><circle cx="24" cy="22" r="7"/><circle cx="28" cy="29" r="5"/><circle cx="18" cy="30" r="5"/></g><g fill="#93A78C"><circle cx="20" cy="17" r="6"/><circle cx="28" cy="14" r="4"/><circle cx="12" cy="17" r="4"/></g>');
    },
    fallow: function () {
      return cropWrap('<path d="M6 26h28v8H6z" fill="#C9A882"/><g stroke="#B08A63" stroke-width="1.6" fill="none"><path d="M8 30h24M10 24l4 4M20 22l4 4M30 24l-4 4"/></g><circle cx="14" cy="20" r="2" fill="#B08A63"/><circle cx="26" cy="19" r="1.6" fill="#B08A63"/>');
    },
    olive: function () {
      return cropWrap('<path d="M20 34V24" stroke="#6E4529" stroke-width="2.6" stroke-linecap="round"/><circle cx="20" cy="17" r="9" fill="#7C9375"/><circle cx="13" cy="22" r="6" fill="#5C775C"/><circle cx="27" cy="22" r="6" fill="#93A78C"/><g fill="#3B2A21" opacity=".5"><circle cx="17" cy="16" r="1.4"/><circle cx="23" cy="19" r="1.4"/><circle cx="20" cy="22" r="1.2"/></g>');
    }
  };
  window.cropIcon = function (name) {
    var f = CROPS[name] || CROPS.wheat;
    return f();
  };
})();
