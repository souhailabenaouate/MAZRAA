import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from '../components/Logo'
import LangMenu from '../components/LangMenu'
import ThemeToggle from '../components/ThemeToggle'

/* Hanging satellites (like the lamps in the reference), a pulsing sun and a swaying plant */
function Decor({ plant }: { plant: boolean }) {
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMin meet" className="pointer-events-none absolute inset-0 mx-auto h-full w-full max-w-lg" aria-hidden>
      {/* sun with slow rays (top right) */}
      <g className="drop-in" style={{ ['--d' as string]: '.5s' }}>
        <g className="rays" opacity=".5">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="337" y="22" width="6" height="14" rx="3" className="fill-cream" transform={`rotate(${i * 30} 340 70)`} />
          ))}
        </g>
        <circle cx="340" cy="70" r="26" className="sun fill-cream" opacity=".95" />
      </g>

      {/* big hanging satellite (left) */}
      <g className="drop-in" style={{ ['--d' as string]: '0s' }}>
        <g className="swing">
          <line x1="70" y1="-10" x2="70" y2="120" stroke="#FFF8EE" strokeWidth="3" opacity=".8" />
          <rect x="22" y="120" width="34" height="14" rx="3" className="fill-cream" />
          <rect x="84" y="120" width="34" height="14" rx="3" className="fill-cream" />
          <rect x="52" y="112" width="36" height="30" rx="7" fill="#FFF8EE" />
          <circle cx="70" cy="127" r="6" className="fill-brown" />
        </g>
      </g>

      {/* small hanging satellite (center) */}
      <g className="drop-in" style={{ ['--d' as string]: '.25s' }}>
        <g className="swing" style={{ ['--d' as string]: '-1.6s' }}>
          <line x1="205" y1="-10" x2="205" y2="62" stroke="#FFF8EE" strokeWidth="3" opacity=".7" />
          <rect x="178" y="62" width="20" height="9" rx="2" className="fill-cream" opacity=".85" />
          <rect x="212" y="62" width="20" height="9" rx="2" className="fill-cream" opacity=".85" />
          <rect x="192" y="57" width="26" height="20" rx="5" fill="#FFF8EE" opacity=".9" />
          <circle cx="205" cy="67" r="4" className="fill-brown" />
        </g>
      </g>

      {/* plant in a pot (bottom right) */}
      <g style={{ opacity: plant ? 0.42 : 0, transition: 'opacity .6s ease' }}>
        <path d="M300 262 h56 a28 22 0 0 1 -56 0Z" className="fill-cream" />
        <g className="sway" style={{ ['--d' as string]: '0s' }}><path d="M328 254 C300 235 300 205 318 188 C326 214 332 232 328 254Z" className="fill-cream" /></g>
        <g className="sway" style={{ ['--d' as string]: '.7s' }}><path d="M328 254 C352 232 366 206 352 180 C338 204 332 230 328 254Z" className="fill-cream" /></g>
        <g className="sway" style={{ ['--d' as string]: '1.3s' }}><path d="M328 254 C326 228 330 196 340 168 C348 198 340 232 328 254Z" className="fill-cream" /></g>
      </g>
    </svg>
  )
}

export default function AuthFrame() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const signup = pathname.startsWith('/signup')
  return (
    <main className="min-h-full overflow-x-hidden">
      {/* header is shared by login + sign up, so it stays put while the form swaps */}
      <header className={`auth-hdr relative transition-[height] duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] ${signup ? 'h-60' : 'h-72'}`}>
        <Decor plant={!signup} />

        <div className="relative z-20 mx-auto flex max-w-3xl items-center justify-between px-4 pt-[calc(0.75rem+env(safe-area-inset-top))]">
          <Link to="/" className="rounded-2xl bg-bg/85 px-3 py-1 backdrop-blur"><Logo size={34} /></Link>
          <div className="flex items-center gap-1.5"><LangMenu /><ThemeToggle /></div>
        </div>

        <h1 key={pathname} className="title-swap absolute inset-x-0 bottom-14 z-10 text-center text-4xl font-extrabold text-[#FFF8EE] sm:text-5xl">{signup ? t('signup') : t('login')}</h1>

        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[-1px] h-14 w-full sm:h-20" aria-hidden>
          <path d="M0 120 C220 30 620 0 980 44 S1340 96 1440 36 V120 Z" fill="rgb(var(--bg))" />
        </svg>
      </header>

      <div key={pathname} data-dir={signup ? 'fwd' : 'back'} className="auth-body page-swap relative z-10 mx-auto w-full max-w-md space-y-5 px-5 pb-12 pt-2">
        <Outlet />
      </div>
    </main>
  )
}
