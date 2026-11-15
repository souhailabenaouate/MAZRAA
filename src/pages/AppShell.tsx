import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import Logo from '../components/Logo'

/* The interior (diagnosis, my farm, rotations, report, alerts, dashboard, GHARS...) is the app in
   /public/interior. It runs in its own frame so its styles never clash with the landing/login, and it
   reads the same session, language ('lang') and theme ('theme') from localStorage.
   Its top bar has the logo and the account menu (language, theme, log out). */
export default function AppShell() {
  const { user } = useAuth()
  const [ready, setReady] = useState(false)
  // keep a deep link such as /app#/alerts; the interior reports its route back via history.replaceState
  const [src] = useState(() => `/interior/index.html${window.location.hash}`)
  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="app-enter fixed inset-0 bg-bg">
      <iframe title="MAZRA'A" src={src} allow="microphone; clipboard-write; geolocation"
        onLoad={() => setReady(true)}
        className={`h-full w-full border-0 transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`} />
      {/* splash while the app loads: same logo as the landing, fades away */}
      <div aria-hidden={ready} className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5 bg-bg transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <div className="anim-floaty"><Logo size={84} showName={false} /></div>
        <span className="text-2xl font-extrabold tracking-wide text-brown">MAZRA'A</span>
      </div>
    </div>
  )
}
