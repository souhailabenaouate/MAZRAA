import { useTheme } from '../lib/theme'
import Icon from './Icon'
export default function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button onClick={toggle} aria-label="Theme" className="rounded-2xl border border-line bg-card p-2.5 text-brown hover:bg-cream/20">
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  )
}
