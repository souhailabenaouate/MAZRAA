/* Full-screen animated background: satellites crossing the sky, a scanning beam over the field,
   drifting clouds, swaying sprouts and floating pollen. Pure SVG + CSS (no images). */
const SPROUTS: [number, number][] = []
for (let x = 40, i = 0; x < 1440; x += 96, i++) SPROUTS.push([x + (i % 3) * 14, 662 + (i % 4) * 9])
for (let x = 90, i = 0; x < 1440; x += 120, i++) SPROUTS.push([x + (i % 2) * 20, 748 + (i % 3) * 8])
const POLLEN = Array.from({ length: 14 }, (_, i) => ({ x: 60 + i * 100 + (i % 3) * 25, y: 700 + (i % 4) * 20, d: (i * 0.7) % 9, r: 2 + (i % 3) }))

export default function SkyScene() {
  return (
    <div className="scene-bg pointer-events-none fixed inset-0 z-0" aria-hidden>
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <g id="sprout">
            <path d="M0 0 V-22" className="stroke-brown" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0 -11 C-14 -13 -17 -27 -17 -27 C-5 -27 0 -19 0 -11Z" className="fill-sage" />
            <path d="M0 -17 C14 -19 17 -33 17 -33 C5 -33 0 -25 0 -17Z" className="fill-sage" />
          </g>
          <g id="sat">
            <rect x="-52" y="-7" width="34" height="14" rx="2" className="fill-sage" />
            <rect x="18" y="-7" width="34" height="14" rx="2" className="fill-sage" />
            <path d="M-35 -7v14M-27 -7v14M27 -7v14M35 -7v14" className="stroke-card" strokeWidth="1.2" />
            <rect x="-15" y="-11" width="30" height="22" rx="4" className="fill-brown" />
            <circle r="4.5" className="fill-cream" />
            <path d="M0 -11V-23" className="stroke-brown" strokeWidth="2" strokeLinecap="round" />
            <circle cy="-25" r="3" className="fill-brown" />
          </g>
        </defs>

        {/* sun */}
        <g className="sun"><circle cx="620" cy="190" r="86" className="fill-cream" opacity=".3" /><circle cx="620" cy="190" r="52" className="fill-cream" /></g>

        {/* clouds */}
        <g className="drift cloud"><ellipse cx="260" cy="150" rx="80" ry="20" /><ellipse cx="300" cy="132" rx="48" ry="20" /></g>
        <g className="drift cloud" style={{ animationDuration: '20s' }}><ellipse cx="1060" cy="260" rx="70" ry="17" /><ellipse cx="1092" cy="244" rx="40" ry="16" /></g>
        <g className="drift cloud" style={{ animationDuration: '24s' }}><ellipse cx="820" cy="90" rx="60" ry="14" /><ellipse cx="846" cy="78" rx="34" ry="13" /></g>

        {/* main satellite crossing the sky with a scanning beam */}
        <g>
          <animateMotion dur="42s" begin="-16s" repeatCount="indefinite" path="M-160 170 C 380 70, 1000 260, 1600 130" />
          <g className="sat" style={{ animationDuration: '5s' }}><use href="#sat" /></g>
          <polygon points="0,16 -78,430 78,430" className="cone fill-sage" opacity=".16" />
          <line x1="0" y1="16" x2="0" y2="430" className="beam stroke-sage" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="0" cy="430" rx="30" ry="7" fill="none" className="ping stroke-sage" strokeWidth="3" />
          <ellipse cx="0" cy="430" rx="30" ry="7" fill="none" className="ping stroke-sage" strokeWidth="3" style={{ ['--d' as string]: '1.2s' }} />
        </g>

        {/* second, smaller satellite going the other way */}
        <g opacity=".75">
          <animateMotion dur="64s" begin="-30s" repeatCount="indefinite" path="M1600 90 C 900 30, 320 130, -160 60" />
          <g transform="scale(.55)"><use href="#sat" /></g>
        </g>

        {/* hills */}
        <path d="M0 560 C220 500 420 520 640 560 S1080 600 1440 520 V800 H0Z" className="hill-a" />
        <path d="M0 640 C260 590 520 640 800 650 S1250 620 1440 600 V800 H0Z" className="hill-b" />
        <path d="M0 730 C300 690 700 750 1000 725 S1300 700 1440 715 V800 H0Z" className="hill-c" />

        {SPROUTS.map(([x, y], i) => (
          <use key={i} href="#sprout" x={x} y={y} className="sway" style={{ ['--d' as string]: `${(i % 7) * 0.4}s` }} />
        ))}

        {POLLEN.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} className="pollen fill-sage" style={{ ['--d' as string]: `${p.d}s` }} />
        ))}
      </svg>
    </div>
  )
}
