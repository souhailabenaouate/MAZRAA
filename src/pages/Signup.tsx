import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../lib/auth'
import Icon from '../components/Icon'

export default function Signup() {
  const { t } = useTranslation()
  const { signup } = useAuth()
  const nav = useNavigate()
  const [u, setU] = useState(''); const [p, setP] = useState(''); const [c, setC] = useState(''); const [show, setShow] = useState(false)
  const [role, setRole] = useState<'farmer' | 'technician'>('farmer'); const [commune, setCommune] = useState('Chefchaouen'); const [err, setErr] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!u || !p || !commune) return setErr(t('errFill'))
    if (p !== c) return setErr(t('errMatch'))
    if (signup({ username: u.trim(), password: p, role, commune }) === 'exists') return setErr(t('errExists'))
    nav('/app')
  }
  const field = 'w-full bg-transparent px-5 py-5 text-lg outline-none placeholder:opacity-50 focus:bg-sage/10'
  return (
    <>
      <form onSubmit={submit} className="space-y-5">
        <div className="fade-up overflow-hidden rounded-3xl border border-line bg-card shadow-soft" style={{ ['--d' as string]: '.5s' }}>
          <input className={field} placeholder={t('username')} value={u} onChange={e => setU(e.target.value)} autoComplete="username" />
          <div className="h-px bg-line" />
          <div className="relative">
            <input className={`${field} pe-14`} placeholder={t('password')} type={show ? 'text' : 'password'} value={p} onChange={e => setP(e.target.value)} autoComplete="new-password" />
            <button type="button" onClick={() => setShow(s => !s)} aria-label={t('showPass')} className="absolute end-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-brown"><Icon name={show ? 'eyeoff' : 'eye'} /></button>
          </div>
          <div className="h-px bg-line" />
          <input className={field} placeholder={t('confirm')} type={show ? 'text' : 'password'} value={c} onChange={e => setC(e.target.value)} autoComplete="new-password" />
          <div className="h-px bg-line" />
          <input className={field} placeholder={t('commune')} value={commune} onChange={e => setCommune(e.target.value)} />
        </div>

        <div className="fade-up grid grid-cols-2 gap-3" style={{ ['--d' as string]: '.65s' }}>
          {([['farmer', 'wheat'], ['technician', 'wrench']] as const).map(([r, e]) => (
            <button type="button" key={r} onClick={() => setRole(r)}
              className={`flex items-center justify-center gap-2 rounded-2xl border-2 p-4 text-lg font-bold transition ${role === r ? 'border-sage bg-sage/25' : 'border-line bg-card'}`}>
              <Icon name={e} className="h-6 w-6" />{t(r)}
            </button>
          ))}
        </div>

        {err && <p className="rounded-2xl bg-bad/15 p-3 font-semibold text-bad" role="alert">{err}</p>}

        <button type="submit" className="fade-up w-full rounded-2xl bg-gradient-to-r from-sage to-[#B9CCB0] py-4 text-xl font-extrabold text-[#2A1A0E] shadow-soft transition hover:brightness-95 active:scale-[0.98]" style={{ ['--d' as string]: '.8s' }}>
          {t('signup')}
        </button>
      </form>
      <p className="fade-up pt-2 text-center text-lg" style={{ ['--d' as string]: '.95s' }}>{t('haveAccount')} <Link to="/login" className="font-extrabold text-brown underline">{t('login')}</Link></p>
    </>
  )
}
