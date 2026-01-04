import { useEffect, useRef } from 'react'

export default function Hero() {
  const textRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('hero-visible')
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={heroRef} className="hero-split hero-full">

      <div className="content hero-split-content hero-full-content">
        <div className="hero-left" ref={textRef}>
          <span className="hero-eyebrow">
            SOFTWARE ENGINEER · FRONTEND SPECIALIST
          </span>

          <h1 className="hero-heading">
            <span className="reveal-line">I engineer scalable products</span>
            <span className="reveal-line">with strong UX</span>
            <span className="reveal-line">and clean architecture.</span>
          </h1>

          {/* <p className="hero-description">
            I’m a software engineer with deep expertise in frontend technologies
            and hands-on experience across backend systems and data layers.
            I’ve built production applications using React and TypeScript,
            integrated AI-driven solutions, and worked with Postgres and Redis
            to deliver reliable, performant systems.
          </p> */}

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  )
}
