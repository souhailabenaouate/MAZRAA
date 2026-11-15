import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from '../components/Logo'
import LangMenu from '../components/LangMenu'
import ThemeToggle from '../components/ThemeToggle'
import Icon from '../components/Icon'
import SkyScene from '../components/SkyScene'
import { CountUp, Reveal, useInView } from '../lib/anim'

/* Animated stat: ring draws itself, a dot orbits it, the number counts up */
function StatRing({ n, label, delay }: { n: number; label: string; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.5)
  const C = 2 * Math.PI * 50
  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative h-24 w-24 sm:h-36 sm:w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" className="stroke-ink/15" strokeWidth="9" />
          <circle cx="60" cy="60" r="50" fill="none" className="stroke-sage" strokeWidth="9" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={inView ? 0 : C}
            style={{ transition: `stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1) ${delay}ms` }} />
        </svg>
        <svg viewBox="0 0 120 120" className="orbit absolute inset-0 h-full w-full"><circle cx="60" cy="6" r="5" className="fill-brown" /></svg>
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold sm:text-5xl"><CountUp to={n} ms={1800} /></span>
      </div>
      <p className="max-w-[9rem] text-center text-sm font-semibold opacity-90 sm:text-base">{label}</p>
    </div>
  )
}

export default function Welcome() {
  const { t } = useTranslation()
  const words = t('heroTitle').split(' ')
  const features = [
    { e: 'tap' as const, t: 'f1t', d: 'f1d', card: 'bg-sage/30 border-sage/50', icon: 'bg-sage/60' },
    { e: 'satellite' as const, t: 'f2t', d: 'f2d', card: 'bg-cream/50 border-cream', icon: 'bg-cream' },
    { e: 'rotate' as const, t: 'f3t', d: 'f3d', card: 'bg-brown/25 border-brown/40', icon: 'bg-brown/40' }
  ]
  return (
    <div className="relative min-h-full overflow-x-hidden">
      <div className="sky-fixed pointer-events-none fixed inset-0 z-0" aria-hidden />
      <SkyScene />

      {/* Header: transparent logo + name left; language, theme and "Se connecter" right */}
      <header className="sticky top-0 z-30 border-b border-line/50 bg-bg/55 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6">
          <Logo size={44} />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LangMenu />
            <ThemeToggle />
            <Link to="/login" className="whitespace-nowrap rounded-2xl bg-sage px-3 py-2.5 text-sm font-extrabold text-[#3A2210] shadow-soft transition hover:brightness-95 active:scale-95 sm:px-5 sm:text-base">{t('loginTop')}</Link>
          </div>
        </div>
      </header>

      {/* Hero: the sentence, then Get started in the middle */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-64px)] max-w-4xl flex-col items-center justify-center gap-10 px-5 pb-16 text-center">
        <h1 className="text-5xl font-extrabold leading-[1.08] sm:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <span key={i} className={`word ${i === words.length - 1 ? 'text-brown' : ''}`} style={{ ['--d' as string]: `${200 + i * 110}ms` }}>
              {w}{i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>
        <div className="fade-up" style={{ ['--d' as string]: `${300 + words.length * 110}ms` }}>
          <Link to="/signup" className="btn-primary glow !rounded-full !px-10 !py-5 text-2xl">
            {t('getStarted')} <Icon name="arrow" className="nudge h-7 w-7 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      {/* Three taps: palette shades, animated */}
      <section id="how" className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Reveal><h2 className="mb-8 text-center text-3xl font-extrabold sm:text-4xl">{t('howTitle')}</h2></Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={i * 150}>
              <div className={`group h-full space-y-3 rounded-3xl border p-6 shadow-soft backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg ${f.card}`}>
                <span className={`anim-floaty flex h-16 w-16 items-center justify-center rounded-2xl text-ink transition group-hover:rotate-6 group-hover:scale-110 ${f.icon}`} style={{ animationDelay: `${i * 0.5}s` }} aria-hidden><Icon name={f.e} className="h-8 w-8" /></span>
                <h3 className="text-xl font-extrabold">{t(f.t)}</h3>
                <p className="text-lg opacity-85">{t(f.d)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Animated rings (facts about the prototype) */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-3 gap-2 rounded-3xl border border-brown/30 bg-brown/20 p-5 shadow-soft backdrop-blur-sm sm:p-10">
            <StatRing n={20} label={t('stat1')} delay={0} />
            <StatRing n={4} label={t('stat2')} delay={250} />
            <StatRing n={3} label={t('stat3')} delay={500} />
          </div>
        </Reveal>
      </section>

      {/* Call to action */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-sage/50 bg-sage/25 p-8 text-center backdrop-blur-sm sm:p-12">
            <h2 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">{t('ctaTitle')}</h2>
            <p className="text-lg opacity-85">{t('ctaSub')}</p>
            <Link to="/signup" className="btn-primary glow !rounded-full text-xl">{t('getStarted')} <Icon name="arrow" className="nudge h-6 w-6 rtl:rotate-180" /></Link>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 border-t border-line/60 bg-bg/60 px-4 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))] text-center text-sm opacity-80 backdrop-blur-sm">
        <p>{t('disclaimer')}</p>
        <p className="mt-1">{t('challenge')}</p>
      </footer>
    </div>
  )
}
