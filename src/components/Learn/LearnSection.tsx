// src/components/Learn/LearnSection.tsx
import { useState, Suspense, lazy, type JSX } from 'react'
import LearnModal from './LearnModal'

// lazy-load demos
const ClosureDemo = lazy(() => import('./Javascript/ClosureDemo'))
const AsyncDemo = lazy(() => import('./Javascript/AsyncDemo'))

export default function LearnSection(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<'closures' | 'async' | null>(null)

  const openDemo = (key: 'closures' | 'async') => {
    setActive(key)
    setOpen(true)
  }

  return (
    <section id="learn" className="section center-rail">
      <h2 className="section-title">Learn — quick interactive concepts</h2>
      <div className="section-subtitle">Small, focused demos you can run without leaving the site</div>

      <div className="grid grid-auto-fit" style={{ marginTop: 12 }}>
        <div className="card">
          <h3>Closures (JavaScript)</h3>
          <p style={{ color: 'var(--muted)' }}>How functions remember scope — create counters and see the state persist.</p>
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary" onClick={() => openDemo('closures')}>Try closures</button>
          </div>
        </div>

        <div className="card">
          <h3>Promises & async/await</h3>
          <p style={{ color: 'var(--muted)' }}>Compare Promise.all, Promise.race and sequential async/await with simulated requests.</p>
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary" onClick={() => openDemo('async')}>Try async demo</button>
          </div>
        </div>

        {/* Add more cards for other topics later */}
      </div>

      <Suspense fallback={<div style={{ marginTop: 12 }}>Loading demo…</div>}>
        <LearnModal open={open} onClose={() => setOpen(false)} title={active === 'closures' ? 'Closures — interactive demo' : active === 'async' ? 'Promises & async/await — interactive demo' : ''}>
          {active === 'closures' && <ClosureDemo />}
          {active === 'async' && <AsyncDemo />}
        </LearnModal>
      </Suspense>
    </section>
  )
}
