import { Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import AuthFrame from './pages/AuthFrame'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AppShell from './pages/AppShell'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route element={<AuthFrame />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/app/*" element={<AppShell />} />
    </Routes>
  )
}
