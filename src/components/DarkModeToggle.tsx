import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
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
    <button
      aria-label="Toggle dark mode"
      onClick={() => setIsDark((s) => !s)}
      className="px-3 py-2 rounded-md border text-sm bg-white dark:bg-slate-800"
      style={{ borderColor: '#e6eef8' }}
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  )
}
