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
  { id: 1, title: 'Project Alpha', desc: 'Responsive web app focused on performance and accessibility.', tech: ['React', 'Node.js'], url: '#' },
  { id: 2, title: 'Design System', desc: 'Reusable UI components and tokens for consistent design.', tech: ['TypeScript', 'Tailwind'], url: '#' },
  { id: 3, title: 'Data Dashboard', desc: 'Interactive charts and filters for business insights.', tech: ['React', 'D3'], url: '#' }
]

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col site-wrapper">
      <Header />
      <main className="flex-grow w-full py-12">
        <div className="content-inner">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App

function Header(){
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between h-20 max-w-full mx-auto">
        <div className="flex items-center gap-6 px-2">
          <div className="text-2xl font-semibold text-slate-900 dark:text-white">Amarjeet Singh</div>
          <div className="hidden lg:flex items-center gap-6">
            <a className="text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium" href="#about">About</a>
            <a className="text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium" href="#projects">Projects</a>
            <a className="text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium" href="#contact">Contact</a>
          </div>
        </div>

        <div className="flex items-center gap-4 px-2">
          <div className="hidden lg:block"><DarkModeToggle /></div>
          <div className="lg:hidden">
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <span className="text-lg text-slate-900 dark:text-slate-100">{open ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden transition-max-height overflow-hidden ${open ? 'max-h-80' : 'max-h-0'}`}>
        <nav className="px-4 py-4 border-t bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-700">
          <a className="block py-2 text-slate-900 dark:text-slate-100 hover:text-cyan-600" href="#about" onClick={() => setOpen(false)}>About</a>
          <a className="block py-2 text-slate-900 dark:text-slate-100 hover:text-cyan-600" href="#projects" onClick={() => setOpen(false)}>Projects</a>
          <a className="block py-2 text-slate-900 dark:text-slate-100 hover:text-cyan-600" href="#contact" onClick={() => setOpen(false)}>Contact</a>
          <div className="mt-3"><DarkModeToggle /></div>
        </nav>
      </div>
    </header>
  )
}

function Hero(){
  return (
    <section className="py-12 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900 dark:text-white">Hello, I'm Amarjeet — a Frontend Developer</h1>
        <p className="mt-4 text-lg text-slate-900 dark:text-slate-100 max-w-2xl">
          I build responsive, accessible, and maintainable web applications using React, TypeScript and modern tooling. I focus on clarity, performance and dependable UX.
        </p>
        <div className="mt-6 flex gap-4">
          <a className="inline-block px-6 py-3 rounded-md bg-slate-900 text-white font-medium hover:opacity-95" href="#projects">View projects</a>
          <a className="inline-block px-6 py-3 rounded-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white bg-white dark:bg-slate-800 font-medium" href="#contact">Get in touch</a>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl flex items-center justify-center card-base dark:bg-slate-800 dark:border-slate-700">
          <div className="text-center">
            <div className="text-sm text-slate-500 dark:text-slate-300">Portrait</div>
            <div className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Amarjeet Singh</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About(){
  return (
    <section id="about" className="py-12">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">About me</h2>
      <p className="mt-4 text-slate-900 dark:text-slate-100 max-w-3xl">
        I have 4+ years of experience building web applications — focusing on React, Redux, TypeScript and performance. I value readable code, accessible interfaces, and practical designs that stand the test of time.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        <div className="p-6 card-base dark:bg-slate-800 dark:border-slate-700">
          <h3 className="font-medium text-slate-900 dark:text-white">Experience</h3>
          <p className="mt-2 text-slate-900 dark:text-slate-100">Frontend developer in e-commerce, dashboards, and education tech. Hands-on with production delivery and performance tuning.</p>
        </div>

        <div className="p-6 card-base dark:bg-slate-800 dark:border-slate-700">
          <h3 className="font-medium text-slate-900 dark:text-white">Skills</h3>
          <p className="mt-2 text-slate-900 dark:text-slate-100">React, TypeScript, Redux, Node.js, Tailwind, PostgreSQL, Redis</p>
        </div>
      </div>
    </section>
  )
}

function Projects(){
  return (
    <section id="projects" className="py-12">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Selected projects</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <article key={p.id} className="p-6 card-base dark:bg-slate-800 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <h3 className="font-medium text-slate-900 dark:text-white">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map(t => (
                <span key={t} className="text-xs px-2 py-1 border rounded-md text-slate-700 dark:text-slate-200">{t}</span>
              ))}
            </div>
            <div className="mt-4">
              <a className="text-sm text-cyan-600 dark:text-cyan-400" href={p.url}>View</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact(){
  return (
    <section id="contact" className="py-12">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Let’s build something meaningful together.
          </div>
          <p className="text-slate-900 dark:text-slate-100 max-w-lg">
            If you have a product idea, need frontend expertise, or want to improve an existing app’s performance — I’ll help ship it quickly with clean, maintainable code.
          </p>
          <ul className="mt-6 text-slate-900 dark:text-slate-100 space-y-2">
            <li>• Fast, accessible React + TypeScript apps</li>
            <li>• Practical design + component systems</li>
            <li>• Performance and developer experience</li>
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <form className="w-full max-w-sm p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg" onSubmit={(e) => { e.preventDefault(); alert('Message sent (demo)') }}>
            <label className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">Your name</label>
            <input className="w-full px-3 py-3 rounded-md bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" placeholder="Your name" />

            <label className="block mt-4 mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">Your email</label>
            <input className="w-full px-3 py-3 rounded-md bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" placeholder="you@example.com" />

            <label className="block mt-4 mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">Message</label>
            <textarea className="w-full px-3 py-3 rounded-md bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" rows={5} placeholder="Tell me about your project..." />

            <div className="mt-4">
              <button type="submit" className="w-full px-4 py-3 rounded-md bg-slate-900 text-white font-medium hover:opacity-95">Send message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="border-t">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-600 dark:text-slate-300">
        <div>© {new Date().getFullYear()} Amarjeet Singh. All rights reserved.</div>
        <div className="mt-3 md:mt-0 flex gap-4">
          <a className="text-slate-700 dark:text-slate-100" href="#">GitHub</a>
          <a className="text-slate-700 dark:text-slate-100" href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
