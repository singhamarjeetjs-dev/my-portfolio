import React, { useState } from 'react'
import DarkModeToggle from './components/DarkModeToggle'
// import TechTiles from './components/Learn/TechTiles'
// import TechModal from './components/Learn/TechModal'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

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
        <main style={{display: 'flex', flexDirection: 'column', gap: '3rem'}}>
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
          {/* <a href="#learn" onClick={() => setOpen(false)}>Learn</a> */}
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </div>
    </header>
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
