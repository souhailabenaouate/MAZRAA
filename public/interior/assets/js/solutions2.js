/* ============================================================
   Mazra'a — solutions catalogue, part 2 (water and soil on slopes)
   ============================================================ */
(function () {
  D.sol = D.sol || {};
  Object.assign(D.sol, {

    stoneBunds: {
      id: 'stoneBunds', pic: 'stoneBunds', when: 'now', conf: 3, rot: 'resilient',
      title: m('Lay contour stone bunds across the slope', 'Placez des cordons de pierres en courbe de niveau', 'ضع حواجز حجرية على منحنيات المستوى', 'حط حواجز ديال الحجر على خط الاستواء'),
      why: m('On an 18 % slope, every storm carries soil downhill. A stone line slows the water and lets it soak in.',
        'Sur une pente de 18 %, chaque orage emporte le sol. Une ligne de pierres ralentit l’eau et la fait s’infiltrer.',
        'على ميل 18%، كل عاصفة تحمل التربة. صف من الحجر يبطئ الماء ويجعله يتسرب.',
        'فميل 18%، كل عاصفة كتدي التراب. صف ديال الحجر كيبطئ الما وكيخليه يدخل للتراب.'),
      ev: m('SRTM slope 18 % + GPM 42 mm/h. Contour bunds are standard SWC practice in the Rif (INRA / FAO).',
        'Pente SRTM 18 % + GPM 42 mm/h. Cordons pierreux : pratique CES courante au Rif (INRA / FAO).',
        'ميل SRTM 18% + GPM 42 مم/س. الحواجز الحجرية ممارسة معتمدة في الريف (INRA / FAO).',
        'ميل SRTM 18% + GPM 42 مم/س. الحواجز الحجرية ممارسة معروفة فالريف (INRA / FAO).'),
      steps: [
        {
          pic: 'contourLine', t: m('Find the contour line', 'Trouvez la courbe de niveau', 'اعثر على خط الاستواء', 'لقى خط الاستواء'),
          d: m('Use a water level or a tube of water. The line must stay at the same height.',
            'Utilisez un niveau à eau. La ligne doit rester à la même hauteur.',
            'استعمل ميزان الماء. يجب أن يبقى الخط بنفس الارتفاع.',
            'خدم ميزان الما. الخط خاصو يبقى فنفس الارتفاع.')
        },
        {
          pic: 'stoneBunds', t: m('Lay stones along the line', 'Posez les pierres le long de la ligne', 'ضع الحجارة على الخط', 'حط الحجر على الخط'),
          d: m('A line 30 cm high is enough. Leave a small gap every few metres for the water.',
            'Une ligne de 30 cm suffit. Laissez un petit passage pour l’eau.',
            'خط بارتفاع 30 سم يكفي. اترك فتحة صغيرة للماء.',
            'خط بـ30 سم كافي. خلي فتحة صغيرة للما.')
        },
        {
          pic: 'bundsField', t: m('Repeat every 15–20 m', 'Répétez tous les 15–20 m', 'أعد كل 15–20 م', 'عاود كل 15–20 م'),
          d: m('Add one line each year. Do not plough across them.',
            'Ajoutez une ligne par an. Ne labourez pas dessus.',
            'أضف خطًا كل سنة. لا تحرث فوقها.',
            'زيد خط كل عام. ما تحرثش فوقهم.')
        }
      ]
    },

    gullyFix: {
      id: 'gullyFix', pic: 'checkDam', when: 'now', conf: 3, rot: 'resilient',
      title: m('Stop the gully with a small stone check dam', 'Bloquez le ravin avec un petit barrage en pierres', 'أوقف القناة بسد حجري صغير', 'وقف القناة بسد صغير ديال الحجر'),
      why: m('A channel grows deeper with every storm. One small dam stops it and keeps the soil above it.',
        'Un ravin s’agrandit à chaque orage. Un petit barrage l’arrête et garde le sol.',
        'القناة تتعمق مع كل عاصفة. سد صغير يوقفها ويحفظ التربة فوقها.',
        'القناة كتغرق مع كل عاصفة. سد صغير كيوقفها وكيحفظ التراب اللي فوقها.'),
      ev: m('GPM heavy-rain days + SRTM slope. Check dams are the first measure in gully control (FAO).',
        'GPM jours de forte pluie + SRTM. Les petits barrages sont la première mesure (FAO).',
        'أيام الأمطار الغزيرة GPM + SRTM. السدود الصغيرة أول إجراء لمكافحة الأخاديد (FAO).',
        'أيام الشتا القوية GPM + SRTM. السدود الصغار أول حل للقنوات (FAO).'),
      steps: [
        {
          pic: 'gullyYes', t: m('Start at the head of the gully', 'Commencez en tête du ravin', 'ابدأ من رأس القناة', 'بدا من راس القناة'),
          d: m('The highest point where the water enters your field.',
            'Le point le plus haut où l’eau entre dans le champ.',
            'أعلى نقطة يدخل منها الماء إلى حقلك.',
            'أعلى نقطة كيدخل منها الما للأرض.')
        },
        {
          pic: 'checkDam', t: m('Build a stone wall 50 cm high', 'Construisez un mur de pierres de 50 cm', 'ابنِ جدارًا حجريًا بارتفاع 50 سم', 'بني حيط ديال الحجر بـ50 سم'),
          d: m('Key the stones into both banks, with a small spillway in the middle.',
            'Ancrez les pierres dans les berges, avec un petit déversoir au milieu.',
            'ثبّت الحجارة في الضفتين مع مفيض صغير في الوسط.',
            'ثبت الحجر فالجوج جهات وخلي مفيض صغير فالوسط.')
        },
        {
          pic: 'grassGully', t: m('Plant grass behind it', 'Plantez de l’herbe derrière', 'ازرع العشب خلفه', 'زرع الحشيش موراه'),
          d: m('Grass holds the trapped soil and makes the dam stronger each year.',
            'L’herbe tient le sol piégé et renforce le barrage.',
            'العشب يمسك التربة المحتجزة ويقوي السد.',
            'الحشيش كيمسك التراب وكيقوي السد كل عام.')
        }
      ]
    },

    contourPlough: {
      id: 'contourPlough', pic: 'contourPlough', when: 'next', conf: 3, rot: 'current',
      title: m('Plough across the slope, not up and down', 'Labourez en travers de la pente', 'احرث عرض الميل لا صعودًا', 'حرث عرض الميل ماشي طالع هابط'),
      why: m('Ploughing up and down makes small channels that carry soil away. Across the slope, each furrow holds water.',
        'Labourer dans le sens de la pente crée des rigoles. En travers, chaque sillon retient l’eau.',
        'الحرث صعودًا وهبوطًا يصنع قنوات تحمل التربة. العرضي، كل خط يحتفظ بالماء.',
        'الحرث طالع هابط كيدير قنوات كتدي التراب. عرضي، كل خط كيمسك الما.'),
      ev: m('SRTM slope + GPM heavy rain. Contour tillage is a low-cost first step (FAO).',
        'SRTM + GPM. Le labour en courbe est une première étape peu coûteuse (FAO).',
        'SRTM + GPM. الحرث الكنتوري خطوة أولى رخيصة (FAO).',
        'SRTM + GPM. الحرث الكنتوري خطوة أولى رخيصة (FAO).'),
      steps: [
        {
          pic: 'contourPlough', t: m('Plough along the contour', 'Labourez suivant la courbe', 'احرث على الكنتور', 'حرث على الكنتور'),
          d: m('Same line as the stone bunds, so water stops at every furrow.',
            'Même ligne que les cordons, l’eau s’arrête à chaque sillon.',
            'نفس خط الحواجز، فيتوقف الماء عند كل خط.',
            'نفس خط الحواجز، فالما كتحبس فكل خط.')
        },
        {
          pic: 'mulch', t: m('Keep the residue on top', 'Gardez les résidus', 'اترك البقايا', 'خلي البقايا'),
          d: m('A covered furrow holds far more water than a bare one.',
            'Un sillon couvert retient beaucoup plus d’eau.',
            'الخط المغطى يحتفظ بماء أكثر بكثير.',
            'الخط المغطى كيمسك ما بزاف كتر.')
        },
        {
          pic: 'soilDark', t: m('Go deeper only every three years', 'Approfondissez tous les trois ans', 'عمّق كل ثلاث سنوات فقط', 'غرق كل 3 سنين غير'),
          d: m('Deep ploughing destroys the structure you are trying to build.',
            'Le labour profond détruit la structure que vous construisez.',
            'الحرث العميق يهدم البنية التي تبنيها.',
            'الحرث الغارق كيهدم البنية اللي كتبني.')
        }
      ]
    },

    stripCrop: {
      id: 'stripCrop', pic: 'stripCrop', when: 'next', conf: 2, rot: 'improved',
      title: m('Alternate strips of cereal and legume', 'Alternez bandes de céréale et de légumineuse', 'بادل شرائط الحبوب والبقول', 'بدل شرائط الحبوب والقطاني'),
      why: m('On a flat field the water stands. Alternating strips slow it down and add nitrogen at the same time.',
        'Sur un champ plat, l’eau stagne. Les bandes ralentissent l’eau et apportent de l’azote.',
        'في الحقل المستوي يتجمع الماء. الشرائط تبطئه وتضيف الآزوت.',
        'فالأرض المستوية الما كيتجمع. الشرائط كتبطئو وكيزيدو الآزوت.'),
      ev: m('MODIS NDVI cover months + SRTM. Strip cropping is recommended for flat plots (INRA / FAO).',
        'MODIS NDVI + SRTM. Les bandes sont recommandées sur terrain plat (INRA / FAO).',
        'MODIS NDVI + SRTM. الشرائط موصى بها في الأرض المستوية (INRA / FAO).',
        'MODIS NDVI + SRTM. الشرائط موصى بها فالأرض المستوية (INRA / FAO).'),
      steps: [
        {
          pic: 'stripCrop', t: m('Make strips about 10 m wide', 'Faites des bandes de 10 m', 'اعمل شرائط بعرض 10 م', 'دير شرائط بعرض 10 م'),
          d: m('Across the direction the water runs.',
            'Perpendiculairement au sens de l’eau.',
            'عموديًا على اتجاه جريان الماء.',
            'عكس اتجاه جريان الما.')
        },
        {
          pic: 'favaField', t: m('Put fava next to the cereal', 'Mettez la fève à côté de la céréale', 'ضع الفول بجانب الحبوب', 'حط الفول حدا الحبوب'),
          d: m('The legume strip feeds the cereal strip next season.',
            'La bande de fève nourrit la bande de céréale.',
            'شريط الفول يغذي شريط الحبوب.',
            'شريط الفول كيغذي شريط الحبوب.')
        },
        {
          pic: 'rotateArrows', t: m('Swap the strips next year', 'Inversez les bandes l’an prochain', 'بادل الشرائط العام القادم', 'بدل الشرائط العام الجاي'),
          d: m('Alternating years is what breaks the pest cycle.',
            'L’alternance des années casse le cycle des ravageurs.',
            'تبديل السنوات هو ما يكسر دورة الآفات.',
            'تبديل السنين هو اللي كيقطع دورة الحشرات.')
        }
      ]
    }

  });
})();
