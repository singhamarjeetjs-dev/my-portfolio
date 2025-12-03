import React, { useState } from 'react'
import DarkModeToggle from './components/DarkModeToggle'

type Project = {
  id: number
  title: string
  desc: string
  tech: string[]
  url: string
}

const projects: Project[] = [
  { id: 1, title: 'Ask Bruce', desc: 'An AI-powered personal assistant that helps to address the customer queries.', tech: ['React','Typescript', 'Node.js', 'PostgreSQL', 'Python', 'Redis'], url: '#' },
  { id: 2, title: 'Call Copilot', desc: 'A tool to assist with call management and automation.', tech: ['React', 'Typescript', 'Node.js', 'PostgreSQL', 'Python', 'Redis'], url: '#' },
  { id: 3, title: 'Genesys Intergration', desc: 'Integrated with Genesys platform for enhanced customer experience.', tech: ['React', 'Typescript'], url: '#' },
  { id: 4, title: 'Personal Budget Tracker', desc: '', tech: ['React', 'Typescript', 'Firebase'], url: '#' }
]

const App: React.FC = () => {
  return (
    <div className="site-wrapper">
      <div className="content-inner">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App

function Header(){
  const [open, setOpen] = useState(false)

  return (
    <header className="header" role="banner">
      <div className="header-inner center-rail">
        <div style={{display: 'flex', alignItems:'center', gap: '20px'}}>
          <div className="brand">Amarjeet Singh</div>
          <nav className="nav" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          {/* Toggle visible on desktop and mobile; on mobile it's placed before menu */}
          <div style={{display: 'inline-flex', alignItems: 'center'}}>
            <DarkModeToggle />
          </div>

          {/* Menu button for mobile */}
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
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </div>
    </header>
  )
}

function Hero(){
  return (
    <section className="hero section center-rail" aria-labelledby="hero-heading">
      <div>
        <h1 id="hero-heading" className="hero-title">Hello, I'm Amarjeet — a Frontend Developer</h1>
        <p className="hero-lead">I build responsive, accessible, and maintainable web applications using React, TypeScript and modern tooling. I focus on clarity, performance and dependable UX.</p>
        <div className="actions">
          <a className="btn btn-primary" href="#projects">View projects</a>
          <a className="btn btn-secondary" href="#contact">Get in touch</a>
        </div>
      </div>

      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className="portrait" role="img" aria-label="Portrait placeholder">
          <div style={{textAlign:'center'}}>
            <div style={{fontSize: '0.9rem', color: 'var(--muted)'}}>Portrait</div>
            <div style={{marginTop: '8px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)'}}>Amarjeet Singh</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About(){
  return (
    <section id="about" className="section center-rail">
      <h2 className="section-title">About me</h2>
      <p style={{color: 'var(--text)', maxWidth: 'var(--measure)'}}>I have 4+ years of experience building web applications — focusing on React, Redux, TypeScript and performance. I value readable code, accessible interfaces, and practical designs that stand the test of time.</p>

      <div className="grid grid-auto-fit" style={{marginTop: '1rem'}}>
        <div className="card">
          <h3>Experience</h3>
          <p>Frontend developer in e-commerce, dashboards, and education tech. Hands-on with production delivery and performance tuning.</p>
        </div>

        <div className="card">
          <h3>Skills</h3>
          <p>React, TypeScript, Redux, Node.js, CSS, PostgreSQL, Redis</p>
        </div>

        <div className="card">
          <h3>Approach</h3>
          <p>Readable code, accessible interfaces, and practical designs. I prefer pragmatic, testable solutions that scale.</p>
        </div>
      </div>
    </section>
  )
}

function Projects(){
  return (
    <section id="projects" className="section center-rail">
      <h2 className="section-title">Selected projects</h2>
      <div className="grid grid-auto-fit grid-projects" style={{marginTop: '1rem'}}>
        {projects.map(p => (
          <article key={p.id} className="card" style={{minHeight:'140px'}}>
            <h3>{p.title}</h3>
            <p style={{color:'var(--text)'}}>{p.desc}</p>
            <div style={{marginTop:'12px'}}>
              {p.tech.map(t => <span key={t} className="tag" style={{marginRight:8}}>{t}</span>)}
            </div>
            <div style={{marginTop:'12px'}}><a className="link" href={p.url}>View</a></div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact(){
  return (
    <section id="contact" className="section center-rail">
      <div className="contact-grid">
        <div>
          <div className="contact-hero">Let’s build something meaningful together.</div>
          <p className="contact-copy">If you have a product idea, need frontend expertise, or want to improve an existing app’s performance — I’ll help ship it quickly with clean, maintainable code.</p>
          <ul style={{color:'var(--text)'}}>
            <li>• Fast, accessible React + TypeScript apps</li>
            <li>• Practical design + component systems</li>
            <li>• Performance and developer experience</li>
          </ul>
        </div>

        <div style={{display:'flex', justifyContent:'center'}}>
          <form className="form-card" onSubmit={(e) => { e.preventDefault(); alert('Message sent (demo)') }}>
            <label style={{display:'block', marginBottom:6}}>Your name</label>
            <input className="field" placeholder="Your name" />

            <label style={{display:'block', marginTop:12, marginBottom:6}}>Your email</label>
            <input className="field" placeholder="you@example.com" />

            <label style={{display:'block', marginTop:12, marginBottom:6}}>Message</label>
            <textarea className="field" rows={5} placeholder="Tell me about your project..." />

            <div style={{marginTop:12}}>
              <button className="form-submit" type="submit">Send message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="footer" role="contentinfo">
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display:'flex', justifyContent:'space-between', alignItems:'center', gap: 12}}>
        <div>© {new Date().getFullYear()} Amarjeet Singh. All rights reserved.</div>
        <div style={{display:'flex', gap:12}}>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
