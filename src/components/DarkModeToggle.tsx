import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
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
    <button
      aria-label="Toggle dark mode"
      onClick={() => setIsDark((prev) => !prev)}
      className="theme-toggle"
    >
      {/* Icon wrapper */}
      <div className="theme-toggle-thumb">
        {isDark ? '🌙' : '☀️'}
      </div>
    </button>
  )
}
