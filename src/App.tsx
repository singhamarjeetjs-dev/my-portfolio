import React, { useState } from 'react'
import DarkModeToggle from './components/DarkModeToggle'
import ContactForm from './components/ContactForm'
// import TechTiles from './components/Learn/TechTiles'
// import TechModal from './components/Learn/TechModal'
import Hero from './components/Hero'
import About from './components/About'

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
  // const [techOpen, setTechOpen] = useState(false)
  // const [selectedTech, setSelectedTech] = useState<string | undefined>(undefined)

  // const openTechModal = (techId: string) => {
  //   setSelectedTech(techId)
  //   setTechOpen(true)
  // }

  // const closeTechModal = () => {
  //   setTechOpen(false)
  //   // keep selectedTech for a moment or clear immediately if you prefer
  //   // setSelectedTech(undefined)
  // }

  return (
    <div className="site-wrapper">
      <div className="content-inner">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          {/* Tech overview tiles - clicking opens the modal
          <TechTiles onOpenTech={openTechModal} />
          {/* Modal controller (loads topics -> demos inside)
          <TechModal open={techOpen} onClose={closeTechModal} techId={selectedTech} /> */}
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
      <div className="content header-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="brand">Amarjeet Singh</div>
          <nav className="nav" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            {/* <a href="#learn">Learn</a> */}
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
            <li>Fast, accessible React + TypeScript apps</li>
            <li>Practical design + component systems</li>
            <li>Performance and developer experience</li>
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
      <div className='content footer-inner'>
        <div>© {new Date().getFullYear()} Amarjeet Singh. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="https://github.com/singhamarjeetjs-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.singhamarjeet.co.in/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
