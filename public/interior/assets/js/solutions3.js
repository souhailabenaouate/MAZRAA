/* ============================================================
   Mazra'a — solutions catalogue, part 3 (soil and organic matter)
   ============================================================ */
(function () {
  D.sol = D.sol || {};
  Object.assign(D.sol, {

    legume: {
      id: 'legume', pic: 'legume', when: 'next', conf: 3, rot: 'improved',
      title: m('Put fava beans in the rotation', 'Mettez la fève dans la rotation', 'أدخل الفول في الدورة', 'دخل الفول فالدورة'),
      why: m('Fava takes nitrogen from the air and leaves it in the soil. The next cereal needs less fertiliser.',
        'La fève prend l’azote de l’air et le laisse dans le sol. La céréale suivante a besoin de moins d’engrais.',
        'الفول يأخذ الآزوت من الهواء ويتركه في التربة. الحبوب التالية تحتاج سمادًا أقل.',
        'الفول كياخد الآزوت من الهوا وكيخليه فالتراب. الحبوب اللي موراه كتحتاج سماد أقل.'),
      ev: m('Crop sheets INRA Morocco / FAO: fava fixes 60–120 kg N per hectare. Satellite data does not measure nitrogen directly.',
        'Fiches INRA / FAO : la fève fixe 60–120 kg N/ha. Le satellite ne mesure pas l’azote.',
        'بطاقات INRA / FAO: الفول يثبت 60–120 كغ آزوت/هكتار. الساتل لا يقيس الآزوت.',
        'بطاقات INRA / FAO: الفول كيثبت 60–120 كغ آزوت/هكتار. الساتل ما كيقيسش الآزوت.'),
      steps: [
        {
          pic: 'favaField', t: m('Sow fava after the first good rain', 'Semez la fève après la première bonne pluie', 'ابذر الفول بعد أول مطر جيد', 'زرع الفول من بعد أول شتا مزيانة'),
          d: m('Same window as barley, 5 cm deep, 40 cm between rows.',
            'Même fenêtre que l’orge, 5 cm de profondeur, 40 cm entre rangs.',
            'نفس نافذة الشعير، 5 سم عمقًا، 40 سم بين الخطوط.',
            'نفس نافذة الشعير، 5 سم غرق، 40 سم بين الخطوط.')
        },
        {
          pic: 'legume', t: m('Look at the roots before ploughing', 'Regardez les racines avant de labourer', 'انظر إلى الجذور قبل الحرث', 'شوف الجذور قبل الحرث'),
          d: m('Small white nodules on the roots mean nitrogen is being made.',
            'Des petits nodules blancs sur les racines : l’azote se fabrique.',
            'عقد بيضاء صغيرة على الجذور تعني أن الآزوت يُصنع.',
            'عقد بيضين صغار فالجذور كيعنيو أن الآزوت كيتصنع.')
        },
        {
          pic: 'harvestBasket', t: m('Harvest, or plough it in green', 'Récoltez, ou enfouissez vert', 'احصد أو اقلبها خضراء', 'حصد ولا قلبها خضراء'),
          d: m('Ploughing in green gives more organic matter but no harvest.',
            'Enfouir vert donne plus de matière organique mais pas de récolte.',
            'القلب الأخضر يعطي مادة عضوية أكثر بدون حصاد.',
            'القلب الأخضر كيعطي مادة عضوية كتر بلا حصاد.')
        }
      ]
    },

    compost: {
      id: 'compost', pic: 'compost', when: 'next', conf: 2, rot: 'improved',
      title: m('Bring manure or compost to the poorest strip', 'Apportez du fumier ou du compost', 'أضف السماد البلدي أو الكمبوست', 'جيب الزبل ولا الكمبوست'),
      why: m('Pale hard soil has little organic matter. Manure feeds the soil life that makes crumbly structure.',
        'Un sol pâle et dur a peu de matière organique. Le fumier nourrit la vie du sol.',
        'التربة الفاتحة الصلبة فقيرة بالمادة العضوية. السماد يغذي حياة التربة.',
        'التراب الفاتح القاسح فيه مادة عضوية قليلة. الزبل كيغذي حياة التراب.'),
      ev: m('Your soil answer (pale, hard) + global soil layer, medium confidence. No satellite measures organic matter for a single plot.',
        'Votre réponse (sol pâle, dur) + couche mondiale, confiance moyenne. Aucun satellite ne mesure la matière organique d’une parcelle.',
        'جوابك (تربة فاتحة وصلبة) + الطبقة العالمية، ثقة متوسطة. لا ساتل يقيس المادة العضوية لقطعة.',
        'جوابك (تراب فاتح وقاسح) + الطبقة العالمية، ثقة متوسطة. ما كاين ساتل كيقيس المادة العضوية ديال قطعة.'),
      steps: [
        {
          pic: 'compost', t: m('Collect manure under a cover', 'Ramassez le fumier sous abri', 'اجمع السماد تحت غطاء', 'جمع الزبل تحت غطاء'),
          d: m('Keep it out of the rain so the nitrogen is not washed away.',
            'Protégez-le de la pluie pour ne pas perdre l’azote.',
            'احمِه من المطر حتى لا يضيع الآزوت.',
            'حميه من الشتا باش الآزوت ما يمشيش.')
        },
        {
          pic: 'compost', t: m('Let it mature three months', 'Laissez mûrir trois mois', 'اتركه ينضج ثلاثة أشهر', 'خليه ينضج 3 شهور'),
          d: m('Turn it once. Ready when it smells of earth, not of manure.',
            'Retournez-le une fois. Prêt quand il sent la terre.',
            'اقلبها مرة. جاهز عندما تكون رائحته رائحة تراب لا سماد.',
            'قلبو مرة. واجد ملي كيبان فيه ريحة التراب ماشي الزبل.')
        },
        {
          pic: 'mulch', t: m('Spread 2–3 tonnes per hectare', 'Épandez 2–3 t/ha', 'انشر 2–3 أطنان للهكتار', 'فرش 2–3 طن للهكتار'),
          d: m('Before sowing, on the poorest strip first, then plough shallow.',
            'Avant le semis, sur la bande la plus pauvre, puis labourez légèrement.',
            'قبل البذر، على أفقر شريط أولًا ثم احرث سطحيًا.',
            'قبل الزريعة، على أفقر شريط الأول ثم حرث سطحي.')
        }
      ]
    },

    cover: {
      id: 'cover', pic: 'coverCrop', when: 'next', conf: 3, rot: 'resilient',
      title: m('Cover the bare season with a cover crop', 'Couvrez la saison nue avec une culture de couverture', 'غطِّ الموسم العاري بمحصول تغطية', 'غطي الموسم العاري بمحصول تغطية'),
      why: m('Your fields are usually bare for four months, right before the heavy rain. A cover protects the soil in that gap.',
        'Vos champs sont nus quatre mois, juste avant les grosses pluies. Une couverture protège le sol.',
        'حقولك عارية عادة أربعة أشهر، قبل الأمطار الغزيرة. التغطية تحمي التربة.',
        'الأرض ديالك عادة عارية 4 شهور، قبل الشتا القوية. التغطية كتحمي التراب.'),
      ev: m('MODIS NDVI: four bare months. GPM: heaviest rain falls in that period.',
        'MODIS NDVI : quatre mois nus. GPM : les plus fortes pluies tombent alors.',
        'MODIS NDVI: أربعة أشهر عارية. GPM: أغزر الأمطار في تلك الفترة.',
        'MODIS NDVI: 4 شهور عارية. GPM: أقوى الشتا فداك الوقت.'),
      steps: [
        {
          pic: 'coverGrow', t: m('Sow vetch or oats after harvest', 'Semez vesce ou avoine après la récolte', 'ابذر البيقية أو الشوفان بعد الحصاد', 'زرع البيقية ولا الشوفان من بعد الحصاد'),
          d: m('Broadcast by hand, then walk over it so the seed touches the soil.',
            'Semez à la volée puis marchez dessus pour que la graine touche le sol.',
            'انثر باليد ثم امشِ فوقه ليلامس البذر التربة.',
            'نثر باليد ومن بعد مشي فوقو باش الزريعة تلمس التراب.')
        },
        {
          pic: 'coverCrop', t: m('Let the autumn rain grow it', 'Laissez la pluie d’automne la pousser', 'دع مطر الخريف ينميها', 'خلي شتا الخريف تنميها'),
          d: m('It grows on rain only: no extra water, no extra work.',
            'Elle pousse avec la pluie seule : pas d’eau ni de travail en plus.',
            'تنمو بالمطر فقط: لا ماء إضافي ولا عمل إضافي.',
            'كتنمو بالشتا غير: لا ما زايد ولا خدمة زايدة.')
        },
        {
          pic: 'coverCut', t: m('Cut or graze before it seeds', 'Coupez ou pâturez avant la montée', 'اقطع أو ارعَ قبل البذر', 'قطع ولا رعى قبل ما تزرع'),
          d: m('Leave the cut on the ground as a mulch for the next crop.',
            'Laissez la coupe au sol comme paillage.',
            'اترك القطع على الأرض كغطاء.',
            'خلي القطع فالأرض كغطاء.')
        }
      ]
    }

  });
})();
