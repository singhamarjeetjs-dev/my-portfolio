// src/components/Learn/TechTiles.tsx
import { TECHS, type Tech } from '../../data/learnData'

type Props = {
  onOpenTech: (techId: string) => void
}

export default function TechTiles({ onOpenTech }: Props) {
  return (
    <section id="learn" className="section center-rail">
      <h2 className="section-title">Learn — Technologies</h2>
      <div className="section-subtitle">Pick a technology to explore topics and try demos</div>

      <div className="grid grid-auto-fit" style={{ marginTop: 12 }}>
        {TECHS.map((t: Tech) => (
          <button
            key={t.id}
            onClick={() => onOpenTech(t.id)}
            className="main-card"
            style={{ textAlign: 'left', cursor: 'pointer' }}
            aria-label={`Open ${t.title} learning topics`}
          >
            <div style={{ fontWeight: 800 }}>{t.title}</div>
            <div style={{ color: 'var(--muted)', marginTop: 6 }}>{t.subtitle}</div>
            <div style={{ color: 'var(--muted)', marginTop: 8, fontSize: 14 }}>{t.description}</div>
          </button>
        ))}
      </div>
    </section>
  )
}
