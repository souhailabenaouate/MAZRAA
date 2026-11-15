import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../lib/auth'
import Icon from '../components/Icon'

export default function Login() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const nav = useNavigate()
  const [u, setU] = useState(''); const [p, setP] = useState(''); const [show, setShow] = useState(false)
  const [rem, setRem] = useState(true); const [err, setErr] = useState(''); const [forgot, setForgot] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!u || !p) return setErr(t('errFill'))
    if (!login(u.trim(), p, rem)) return setErr(t('errBad'))
    nav('/app')
  }
  return (
    <>
      <form onSubmit={submit} className="space-y-5">
        {/* one card, two stacked fields (like the reference) */}
        <div className="fade-up overflow-hidden rounded-3xl border border-line bg-card shadow-soft" style={{ ['--d' as string]: '.5s' }}>
          <input className="w-full bg-transparent px-5 py-5 text-lg outline-none placeholder:opacity-50 focus:bg-sage/10" placeholder={t('username')}
            value={u} onChange={e => setU(e.target.value)} autoComplete="username" />
          <div className="h-px bg-line" />
          <div className="relative">
            <input className="w-full bg-transparent px-5 py-5 pe-14 text-lg outline-none placeholder:opacity-50 focus:bg-sage/10" placeholder={t('password')}
              type={show ? 'text' : 'password'} value={p} onChange={e => setP(e.target.value)} autoComplete="current-password" />
            <button type="button" onClick={() => setShow(s => !s)} aria-label={t('showPass')} className="absolute end-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-brown">
              <Icon name={show ? 'eyeoff' : 'eye'} />
            </button>
          </div>
        </div>

        <label className="fade-up flex items-center gap-3 px-1 text-lg" style={{ ['--d' as string]: '.6s' }}>
          <input type="checkbox" className="h-6 w-6 accent-[rgb(var(--sage))]" checked={rem} onChange={e => setRem(e.target.checked)} />{t('remember')}
        </label>

        {err && <p className="rounded-2xl bg-bad/15 p-3 font-semibold text-bad" role="alert">{err}</p>}

        <button type="submit" className="fade-up w-full rounded-2xl bg-gradient-to-r from-sage to-[#B9CCB0] py-4 text-xl font-extrabold text-[#2A1A0E] shadow-soft transition hover:brightness-95 active:scale-[0.98]" style={{ ['--d' as string]: '.7s' }}>
          {t('login')}
        </button>
      </form>

      <div className="fade-up space-y-3 text-center" style={{ ['--d' as string]: '.85s' }}>
        <button type="button" onClick={() => setForgot(f => !f)} className="text-lg font-semibold text-brown">{t('forgot')}</button>
        {forgot && <p className="rounded-2xl bg-sage/20 p-3 text-base">{t('forgotMsg')}</p>}
        <p className="pt-4 text-lg">{t('noAccount')} <Link to="/signup" className="font-extrabold text-brown underline">{t('signup')}</Link></p>
      </div>
    </>
  )
}
