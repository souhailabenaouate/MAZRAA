import { createContext, useContext, useState, ReactNode } from 'react'

export type User = { username: string; role: 'farmer' | 'technician'; commune: string }
type Stored = User & { password: string }
const USERS = 'mazraa_users'
const SESSION = 'mazraa_session'

function load(): Stored[] { try { return JSON.parse(localStorage.getItem(USERS) || '[]') } catch { return [] } }

type Ctx = {
  user: User | null
  signup: (u: Stored) => 'ok' | 'exists'
  login: (username: string, password: string, remember: boolean) => boolean
  logout: () => void
}
const AuthCtx = createContext<Ctx>(null as unknown as Ctx)
export const useAuth = () => useContext(AuthCtx)

// MOCK AUTH for the prototype. Replace with Supabase Auth in the backend phase.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem(SESSION) || sessionStorage.getItem(SESSION) || 'null') } catch { return null }
  })
  const start = (u: Stored, remember: boolean) => {
    const { password: _p, ...pub } = u
    ;(remember ? localStorage : sessionStorage).setItem(SESSION, JSON.stringify(pub))
    setUser(pub)
  }
  return (
    <AuthCtx.Provider value={{
      user,
      signup: u => {
        const all = load()
        if (all.some(x => x.username.toLowerCase() === u.username.toLowerCase())) return 'exists'
        localStorage.setItem(USERS, JSON.stringify([...all, u])); start(u, true); return 'ok'
      },
      login: (username, password, remember) => {
        const f = load().find(x => x.username.toLowerCase() === username.toLowerCase() && x.password === password)
        if (!f) return false
        start(f, remember); return true
      },
      logout: () => { localStorage.removeItem(SESSION); sessionStorage.removeItem(SESSION); setUser(null) }
    }}>{children}</AuthCtx.Provider>
  )
}
