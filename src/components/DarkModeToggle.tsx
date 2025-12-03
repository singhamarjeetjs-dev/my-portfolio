import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const s = localStorage.getItem('theme')
      if (s) return s === 'dark'
      return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <label className="toggle-switch" aria-label="Toggle dark mode" title={isDark ? 'Switch to light' : 'Switch to dark'}>
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(s => !s)}
        aria-checked={isDark}
      />
      <span className="switch" role="switch" aria-checked={isDark}>
        <span className="knob" />
      </span>
      <span className="label" aria-hidden="true">{isDark ? 'Dark' : 'Light'}</span>
    </label>
  )
}
