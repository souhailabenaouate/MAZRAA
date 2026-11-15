import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGS, applyDir } from '../i18n'
import Icon from './Icon'

/* Compact language dropdown: English, Français, العربية, الدارجة */
export default function LangMenu() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const cur = LANGS.find(l => l.code === i18n.language) ?? LANGS[1]
  const set = (c: string) => { i18n.changeLanguage(c); localStorage.setItem('lang', c); applyDir(c); setOpen(false) }
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} aria-label="Language" aria-expanded={open}
        className="flex items-center gap-1.5 rounded-2xl border border-line bg-card px-3 py-2.5 text-sm font-bold text-brown hover:bg-cream/20">
        <Icon name="globe" className="h-5 w-5" /><span className="hidden sm:inline">{cur.label}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <ul className="absolute end-0 top-12 z-40 w-40 overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
            {LANGS.map(l => (
              <li key={l.code}>
                <button onClick={() => set(l.code)}
                  className={`block w-full px-4 py-3 text-start font-bold hover:bg-cream/20 ${l.code === cur.code ? 'bg-sage/25' : ''}`}>{l.label}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
