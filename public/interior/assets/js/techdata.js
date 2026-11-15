/* ============================================================
   Mazra'a — technician dashboard data (pilot zone, illustrative)
   ============================================================ */
(function () {
  var years = [];
  for (var y = 2005; y <= 2025; y++) years.push(y);

  D.series = {
    years: years,
    rain: [612, 588, 545, 601, 478, 522, 495, 560, 432, 505, 468, 538, 410, 492, 455, 470, 398, 415, 382, 361, 344],
    tempAnom: [0.20, 0.30, 0.35, 0.40, 0.38, 0.50, 0.55, 0.60, 0.52, 0.70, 0.75, 0.80, 0.78, 0.90, 0.95, 1.00, 1.05, 1.10, 1.20, 1.25, 1.35],
    firstRain: [285, 288, 290, 287, 295, 300, 296, 305, 302, 310, 308, 312, 315, 318, 312, 320, 325, 322, 328, 330, 332],
    heatDays: [8, 9, 10, 9, 12, 13, 15, 14, 17, 18, 20, 19, 22, 23, 21, 24, 25, 26, 27, 26, 28],
    dryMax: [21, 22, 24, 23, 26, 25, 28, 27, 30, 29, 32, 31, 34, 33, 31, 35, 34, 36, 37, 36, 38],
    ndviMonth: [0.32, 0.36, 0.45, 0.55, 0.62, 0.48, 0.33, 0.28, 0.26, 0.29, 0.33, 0.30],
    bareShare: [58, 55, 52, 50, 47, 45, 43, 44, 42, 41, 40, 39, 40, 38, 39, 37, 38, 37, 38, 37, 38]
  };

  D.communes = [
    { id: 'chefchaouen', name: 'Chefchaouen', cx: 214, cy: 150, r: 58, rain: 344, ndvi: 0.42, slope: 16, soil: 0.20, delay: 21, high: 5, mid: 8, low: 14 },
    { id: 'babtaza', name: 'Bab Taza', cx: 150, cy: 96, r: 48, rain: 372, ndvi: 0.38, slope: 22, soil: 0.18, delay: 19, high: 6, mid: 5, low: 9 },
    { id: 'derdara', name: 'Derdara', cx: 276, cy: 92, r: 44, rain: 410, ndvi: 0.47, slope: 24, soil: 0.24, delay: 17, high: 2, mid: 6, low: 11 },
    { id: 'tanouate', name: 'Tanouate', cx: 336, cy: 162, r: 52, rain: 318, ndvi: 0.31, slope: 19, soil: 0.14, delay: 25, high: 7, mid: 4, low: 8 },
    { id: 'tassift', name: 'Tassift', cx: 126, cy: 208, r: 46, rain: 395, ndvi: 0.44, slope: 12, soil: 0.22, delay: 18, high: 2, mid: 5, low: 10 },
    { id: 'brikcha', name: 'Brikcha', cx: 200, cy: 262, r: 54, rain: 288, ndvi: 0.29, slope: 14, soil: 0.12, delay: 27, high: 6, mid: 7, low: 7 },
    { id: 'bnidarkoul', name: 'Bni Darkoul', cx: 300, cy: 246, r: 48, rain: 352, ndvi: 0.40, slope: 9, soil: 0.25, delay: 20, high: 1, mid: 4, low: 12 },
    { id: 'ouedlaou', name: 'Oued Laou', cx: 400, cy: 106, r: 46, rain: 468, ndvi: 0.50, slope: 21, soil: 0.27, delay: 14, high: 2, mid: 5, low: 13 }
  ];

  D.farms = [
    { id: 'F-0142', commune: 'babtaza', crop: 'wheat', risk: 'high', conf: 2, slope: 18, ndvi: 0.38, area: 1.8, reports: 3, rec: 'resilient', agree: false, date: '12 Nov', chosen: null },
    { id: 'F-0151', commune: 'chefchaouen', crop: 'wheat', risk: 'mid', conf: 3, slope: 12, ndvi: 0.45, area: 1.2, reports: 1, rec: 'improved', agree: true, date: '9 Nov', chosen: 'improved' },
    { id: 'F-0163', commune: 'derdara', crop: 'olive', risk: 'low', conf: 3, slope: 22, ndvi: 0.52, area: 2.4, reports: 0, rec: 'current', agree: true, date: '2 Nov', chosen: 'current' },
    { id: 'F-0170', commune: 'tanouate', crop: 'barley', risk: 'high', conf: 2, slope: 26, ndvi: 0.31, area: 1.5, reports: 2, rec: 'resilient', agree: false, date: '11 Nov', chosen: null },
    { id: 'F-0184', commune: 'tassift', crop: 'fava', risk: 'mid', conf: 3, slope: 9, ndvi: 0.49, area: 0.9, reports: 1, rec: 'improved', agree: true, date: '7 Nov', chosen: 'improved' },
    { id: 'F-0192', commune: 'brikcha', crop: 'wheat', risk: 'high', conf: 1, slope: 15, ndvi: 0.35, area: 3.1, reports: 4, rec: 'current', agree: true, date: '13 Nov', chosen: null },
    { id: 'F-0201', commune: 'bnidarkoul', crop: 'chickpea', risk: 'low', conf: 2, slope: 8, ndvi: 0.55, area: 1.1, reports: 0, rec: 'resilient', agree: true, date: '1 Nov', chosen: 'resilient' },
    { id: 'F-0212', commune: 'ouedlaou', crop: 'wheat', risk: 'mid', conf: 3, slope: 10, ndvi: 0.44, area: 0.8, reports: 1, rec: 'improved', agree: true, date: '6 Nov', chosen: null },
    { id: 'F-0227', commune: 'babtaza', crop: 'wheat', risk: 'high', conf: 3, slope: 19, ndvi: 0.33, area: 2.2, reports: 2, rec: 'resilient', agree: false, date: '12 Nov', chosen: null },
    { id: 'F-0233', commune: 'chefchaouen', crop: 'fava', risk: 'mid', conf: 3, slope: 11, ndvi: 0.47, area: 1.4, reports: 0, rec: 'improved', agree: true, date: '5 Nov', chosen: 'improved' },
    { id: 'F-0248', commune: 'derdara', crop: 'wheat', risk: 'mid', conf: 2, slope: 16, ndvi: 0.41, area: 1.6, reports: 1, rec: 'current', agree: true, date: '3 Nov', chosen: 'current' },
    { id: 'F-0255', commune: 'tanouate', crop: 'barley', risk: 'high', conf: 2, slope: 24, ndvi: 0.30, area: 1.9, reports: 3, rec: 'resilient', agree: true, date: '10 Nov', chosen: 'resilient' },
    { id: 'F-0264', commune: 'tassift', crop: 'olive', risk: 'low', conf: 3, slope: 20, ndvi: 0.53, area: 2.8, reports: 0, rec: 'current', agree: true, date: '30 Oct', chosen: 'current' },
    { id: 'F-0271', commune: 'brikcha', crop: 'wheat', risk: 'high', conf: 1, slope: 17, ndvi: 0.34, area: 2.5, reports: 2, rec: 'resilient', agree: false, date: '13 Nov', chosen: null },
    { id: 'F-0286', commune: 'bnidarkoul', crop: 'wheat', risk: 'mid', conf: 3, slope: 13, ndvi: 0.43, area: 1.3, reports: 1, rec: 'improved', agree: true, date: '8 Nov', chosen: null },
    { id: 'F-0294', commune: 'ouedlaou', crop: 'fava', risk: 'low', conf: 2, slope: 7, ndvi: 0.50, area: 1.0, reports: 0, rec: 'improved', agree: true, date: '4 Nov', chosen: 'improved' },
    { id: 'F-0303', commune: 'babtaza', crop: 'barley', risk: 'mid', conf: 3, slope: 21, ndvi: 0.39, area: 1.7, reports: 1, rec: 'resilient', agree: true, date: '9 Nov', chosen: null },
    { id: 'F-0311', commune: 'chefchaouen', crop: 'wheat', risk: 'high', conf: 2, slope: 14, ndvi: 0.32, area: 2.0, reports: 2, rec: 'resilient', agree: false, date: '12 Nov', chosen: null }
  ];

  D.kpis = [
    { id: 'farms', label: 'kpiFarms', value: '142', trend: '12', dir: 'up', note: 'Pilot zone · 8 communes' },
    { id: 'risk', label: 'kpiRisk', value: '23', trend: '5', dir: 'down', note: 'Slope + bare autumn fields' },
    { id: 'waiting', label: 'kpiWaiting', value: '9', trend: '3', dir: 'up', note: 'Awaiting your decision' },
    { id: 'reports', label: 'kpiReports', value: '17', trend: '4', dir: 'warn', note: 'Last 7 days' },
    { id: 'rain', label: 'kpiRain', value: '21', unit: 'd', trend: '9', dir: 'down', note: 'vs 20-year average' },
    { id: 'bare', label: 'kpiBare', value: '38', unit: '%', trend: 'NDVI 0.31', dir: 'flat', note: 'October, 4-year mean' }
  ];

  D.inbox = [
    { id: 'i1', type: 'validation', farm: 'F-0142', conf: 2, text: m('Late rain + erosion reported · Resilient rotation suggested', 'Pluie tardive + érosion · rotation résiliente proposée', 'مطر متأخر + انجراف · دورة مرنة مقترحة', 'شتا متأخرة + انجراف · دورة قوية مقترحة'), time: '12 Nov · 09:20' },
    { id: 'i2', type: 'report', farm: 'F-0192', conf: 1, text: m('Photo: yellow leaves at the bottom of the field', 'Photo : feuilles jaunes en bas du champ', 'صورة: أوراق صفراء أسفل الحقل', 'تصويرة: وراق صفرين تحت الأرض'), time: '13 Nov · 07:45' },
    { id: 'i3', type: 'validation', farm: 'F-0271', conf: 1, text: m('Low confidence: farm borders two grid cells', 'Confiance faible : la ferme touche deux mailles', 'ثقة ضعيفة: المزرعة بين خليتين', 'ثقة ضعيفة: الضيعة بين جوج خلايا'), time: '13 Nov · 06:10' },
    { id: 'i4', type: 'report', farm: 'F-0255', conf: 2, text: m('Voice note: gully deeper after the last storm', 'Vocal : ravin plus profond après l’orage', 'رسالة صوتية: القناة تعمقت بعد العاصفة', 'رسالة صوتية: القناة غرقت كتر من بعد العاصفة'), time: '10 Nov · 18:02' },
    { id: 'i5', type: 'validation', farm: 'F-0311', conf: 2, text: m('Farmer and satellite disagree on plant stress', 'Agriculteur et satellite en désaccord', 'الفلاح والساتل مختلفان حول إجهاد النبات', 'الفلاح والساتل مختلفين على إجهاد النباتات'), time: '12 Nov · 15:38' },
    { id: 'i6', type: 'report', farm: 'F-0170', conf: 3, text: m('Report: soil washed from the top of the plot', 'Signalement : sol emporté en haut de la parcelle', 'تبليغ: تربة منجرفة من أعلى القطعة', 'تبليغ: تراب مشى من فوق القطعة'), time: '11 Nov · 11:12' }
  ];

  D.journal = {
    'F-0142': [
      { d: '12 Nov', t: m('Reported late rain and erosion, photo attached', 'Pluie tardive et érosion signalées, photo jointe', 'بلغ عن مطر متأخر وانجراف مع صورة', 'بلغ على شتا متأخرة وانجراف مع تصويرة'), tag: 'report' },
      { d: '08 Nov', t: m('Field walk: soil dry at the top, gullies at the bottom', 'Parcours : sol sec en haut, ravins en bas', 'جولة: تربة جافة في الأعلى وقنوات في الأسفل', 'جولة: التراب ناشف لفوق وقنوات لتحت'), tag: 'walk' },
      { d: '09 Nov', t: m('Satellite: NDVI 0.38, below the commune mean', 'Satellite : NDVI 0,38, sous la moyenne', 'الساتل: NDVI 0.38 أقل من المتوسط', 'الساتل: NDVI 0.38 أقل من المتوسط'), tag: 'sat' }
    ],
    'F-0192': [
      { d: '13 Nov', t: m('Photo: yellow lower leaves, no voice note', 'Photo : feuilles basses jaunes', 'صورة: أوراق سفلى صفراء', 'تصويرة: وراق تحت صفرين'), tag: 'report' },
      { d: '05 Nov', t: m('Recommended improved rotation, not validated', 'Rotation améliorée recommandée, non validée', 'دورة محسنة موصى بها، غير محققة', 'دورة محسنة موصى بها، مازال ما تحققتش'), tag: 'rec' }
    ]
  };
})();
