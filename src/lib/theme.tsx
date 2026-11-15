import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
type Ctx = { dark: boolean; toggle: () => void }
const ThemeCtx = createContext<Ctx>({ dark: false, toggle: () => {} })
export const useTheme = () => useContext(ThemeCtx)
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => {
    const s = localStorage.getItem('theme')
    return s ? s === 'dark' : window.matchMedia?.('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return <ThemeCtx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>{children}</ThemeCtx.Provider>
}
