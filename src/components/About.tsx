import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('about-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section about">
      {/* Narrative — narrow & readable */}
      <div className="content">
        <h2 className="section-title">About</h2>

        <div className="about-narrative">
          <p className="about-intro">
            I’m a <strong>software engineer</strong> with over 4 years of experience building
            production-ready web applications.
          </p>

          <p>
            I specialize in frontend systems using <strong>React and TypeScript</strong>, but my work
            goes far beyond UI. I’ve built and shipped features backed by
            <strong> Node.js services, PostgreSQL and Redis</strong>, and integrated
            <strong> AI-driven solutions</strong> into real products used by customers.
          </p>

          <p>
            I care deeply about how systems are designed — from performance and accessibility
            to long-term maintainability. I prefer pragmatic solutions, clear abstractions,
            and code that teams can confidently evolve.
          </p>
        </div>
      </div>

      {/* Cards — wider, breathable */}
      <div className="content">
        <div className="about-grid">
          <div className="main-card about-card">
            <h3>What I Build</h3>
            <p>
              Frontend-heavy products such as dashboards, internal tools, e-commerce platforms,
              and AI-assisted applications — designed for scale and real users.
            </p>
          </div>

          <div className="main-card about-card">
            <h3>How I Work</h3>
            <p>
              I focus on readable code, accessibility, performance, and testable systems.
              I avoid over-engineering and optimize for clarity and impact.
            </p>
          </div>

          <div className="main-card about-card">
            <h3>Technologies</h3>
            <p>
              React, TypeScript, Redux, Node.js, PostgreSQL, Redis, REST APIs,
              modern CSS, and AI integrations — chosen based on the problem, not trends.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
