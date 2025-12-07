import React, { useEffect, useRef, useState } from 'react'
import DarkModeToggle from './components/DarkModeToggle'
import ContactForm from './components/ContactForm'
import TechTiles from './components/Learn/TechTiles'
import TechModal from './components/Learn/TechModal'

type Project = {
  id: number
  title: string
  desc: string
  tech: string[]
  url: string
}

const projects: Project[] = [
  { id: 1, title: 'Ask Bruce', desc: 'An AI-powered personal assistant that helps address customer queries.', tech: ['React','Typescript', 'Node.js', 'PostgreSQL', 'Python', 'Redis'], url: '#' },
  { id: 2, title: 'Call Copilot', desc: 'A tool to assist with call management and automation.', tech: ['React', 'Typescript', 'Node.js', 'PostgreSQL', 'Python', 'Redis'], url: '#' },
  { id: 3, title: 'Genesys Integration', desc: 'Integrated with the Genesys platform for enhanced customer experience.', tech: ['React', 'Typescript'], url: '#' },
  { id: 4, title: 'Personal Budget Tracker', desc: 'A simple and intuitive tool to monitor and manage personal expenses.', tech: ['React', 'Typescript', 'Firebase'], url: '#' }
]

const App: React.FC = () => {
  // Learn modal state (modal-first pattern)
  const [techOpen, setTechOpen] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | undefined>(undefined)

  const openTechModal = (techId: string) => {
    setSelectedTech(techId)
    setTechOpen(true)
  }

  const closeTechModal = () => {
    setTechOpen(false)
    // keep selectedTech for a moment or clear immediately if you prefer
    // setSelectedTech(undefined)
  }

  return (
    <div className="site-wrapper">
      <div className="content-inner">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          {/* Tech overview tiles - clicking opens the modal */}
          <TechTiles onOpenTech={openTechModal} />
          {/* Modal controller (loads topics -> demos inside) */}
          <TechModal open={techOpen} onClose={closeTechModal} techId={selectedTech} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App

/* -------------------- Header -------------------- */
function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header" role="banner">
      <div className="header-inner center-rail">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="brand">Amarjeet Singh</div>
          <nav className="nav" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#learn">Learn</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <DarkModeToggle />
          </div>

          <button
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(s => !s)}
            title={open ? 'Close menu' : 'Open menu'}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="mobile-menu" style={{ maxHeight: open ? '260px' : '0px' }}>
        <div className="mobile-menu-inner center-rail">
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="#learn" onClick={() => setOpen(false)}>Learn</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </div>
    </header>
  )
}

/* -------------------- Hero -------------------- */
function Hero() {
  const frameRef = useRef<HTMLDivElement | null>(null)

  // subtle parallax on scroll
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          const center = rect.top + rect.height / 2
          const distanceFromCenter = center - viewportHeight / 2
          const maxOffset = 18 // px maximum translate
          const offset = Math.max(-maxOffset, Math.min(maxOffset, -distanceFromCenter * 0.02))
          el.style.transform = `translateY(${offset}px)`
          ticking = false
        })
        ticking = true
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="hero section center-rail" aria-labelledby="hero-heading">
      <div>
        <div className="kicker">Frontend • React • TypeScript</div>
        <h1 id="hero-heading" className="hero-title">Hello, I'm Amarjeet — I build fast, accessible web apps</h1>
        <p className="hero-lead">I create pragmatic front-ends with clear UX, reliable performance and maintainable code. I help teams ship features that users actually enjoy using.</p>
        <div className="actions">
          <a className="btn btn-primary" href="#projects">View projects</a>
          <a className="btn btn-secondary" href="#contact">Get in touch</a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="photo-frame parallax" ref={frameRef} aria-hidden={false}>
          <div className="frame">
            <img
              src="/portrait.jpg"
              alt="Amarjeet Singh"
              onError={(e) => {
                const img = e.currentTarget
                const parent = img.parentElement
                if (parent) {
                  parent.innerHTML = `<div class="fallback"><div style="font-size:0.95rem;color:var(--muted)">Portrait</div><div style="margin-top:8px;font-weight:700;color:var(--text)">Amarjeet Singh</div></div>`
                }
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- About -------------------- */
function About() {
  return (
    <section id="about" className="section center-rail">
      <h2 className="section-title">About me</h2>
      <p style={{ color: 'var(--text)', maxWidth: 'var(--measure)' }}>
        I have 4+ years of experience building web applications — focusing on React, Redux, TypeScript and performance. I value readable code, accessible interfaces, and practical designs that stand the test of time.
      </p>

      <div className="grid grid-auto-fit" style={{ marginTop: '1rem' }}>
        <div className="main-card">
          <h3>Experience</h3>
          <p>Frontend developer in e-commerce, dashboards, and education tech. Hands-on with production delivery and performance tuning.</p>
        </div>

        <div className="main-card">
          <h3>Skills</h3>
          <p>React, TypeScript, Redux, Node.js, CSS, PostgreSQL, Redis</p>
        </div>

        <div className="main-card">
          <h3>Approach</h3>
          <p>Readable code, accessible interfaces, and practical designs. I prefer pragmatic, testable solutions that scale.</p>
        </div>
      </div>
    </section>
  )
}

/* -------------------- Projects -------------------- */
function Projects() {
  return (
    <section id="projects" className="section center-rail">
      <h2 className="section-title">Selected projects</h2>
      <div className="section-subtitle">A small selection of work — responsive and maintainable</div>
      <div className="grid grid-auto-fit grid-projects" style={{ marginTop: '1rem' }}>
        {projects.map(p => (
          <article key={p.id} className="main-card" style={{ minHeight: '140px' }}>
            <h3>{p.title}</h3>
            <p style={{ color: 'var(--text)' }}>{p.desc}</p>
            <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {p.tech.map(t => <span key={t} className="tag" style={{ marginRight: 8 }}>{t}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* -------------------- Contact -------------------- */
function Contact() {
  return (
    <section id="contact" className="section center-rail">
      <div className="contact-grid">
        <div>
          <div className="contact-hero">Let’s build something meaningful together.</div>
          <p className="contact-copy">If you have a product idea, need frontend expertise, or want to improve an existing app’s performance — I’ll help ship it quickly with clean, maintainable code.</p>
          <ul style={{ color: 'var(--text)' }}>
            <li>• Fast, accessible React + TypeScript apps</li>
            <li>• Practical design + component systems</li>
            <li>• Performance and developer experience</li>
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

/* -------------------- Footer -------------------- */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>© {new Date().getFullYear()} Amarjeet Singh. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="https://github.com/singhamarjeetjs-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.singhamarjeet.co.in/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
