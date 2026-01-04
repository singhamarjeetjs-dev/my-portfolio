import { useState } from 'react'

type CaseStudy = {
  problem: string
  solution: string
  impact: string[]
  responsibilities: string[]
}

type Project = {
  id: number
  title: string
  desc: string
  tech: string[]
  isPublic?: boolean
  url?: string
  caseStudy: CaseStudy
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Ask Bruce',
    desc: 'An AI-powered assistant used to handle real customer queries at scale.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Python'],
    caseStudy: {
      problem:
        'Customer support teams were overloaded with repetitive questions, increasing response time and operational cost.',
      solution:
        'Designed and implemented a frontend-heavy AI interface backed by Node.js services and ML workflows, focusing on usability, latency, and fallback handling.',
      impact: [
        'Reduced average response time for common queries',
        'Improved agent productivity',
        'Handled thousands of queries per day in production',
      ],
      responsibilities: [
        'Frontend architecture and React component design',
        'Type-safe API integration with backend services',
        'Performance optimizations and accessibility',
      ],
    },
  },
  {
    id: 2,
    title: 'Call Copilot',
    desc: 'A tool to assist agents during live calls with contextual insights.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    caseStudy: {
      problem:
        'Agents lacked real-time context during customer calls, leading to longer handling times.',
      solution:
        'Built a responsive UI that surfaced live insights during calls, integrated with backend services and real-time data pipelines.',
      impact: [
        'Improved first-call resolution',
        'Reduced average handling time',
      ],
      responsibilities: [
        'Frontend system design',
        'State management and async data handling',
        'Collaboration with backend and product teams',
      ],
    },
  },
  {
    id: 3,
    title: 'Genesys Integration',
    desc: 'Deep integration with the Genesys platform to enhance CX workflows.',
    tech: ['React', 'TypeScript'],
    caseStudy: {
      problem:
        'Existing CX workflows were fragmented across systems.',
      solution:
        'Integrated Genesys APIs into a unified frontend experience with clean abstractions.',
      impact: [
        'Unified agent workflows',
        'Improved customer experience metrics',
      ],
      responsibilities: [
        'Frontend integration architecture',
        'Reusable component design',
      ],
    },
  },
  {
    id: 4,
    title: 'Personal Budget Tracker',
    desc: 'A personal finance tracker built as an open-source project.',
    tech: ['React', 'TypeScript', 'Firebase'],
    isPublic: true,
    url: 'https://github.com/singhamarjeetjs-dev',
    caseStudy: {
      problem:
        'Existing budgeting apps felt bloated and hard to use.',
      solution:
        'Built a minimal, intuitive budgeting app with real-time sync and clean UI.',
      impact: [
        'Simplified expense tracking',
        'Improved personal finance visibility',
      ],
      responsibilities: [
        'End-to-end design and implementation',
        'Authentication and data modeling',
      ],
    },
  },
]

export default function Projects() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <section id="projects" className="section projects">
      <div className="content">
        <h2 className="section-title">SELECTED WORK</h2>
        <p className="projects-intro">
          A mix of production systems and personal projects.
          Detailed case studies are provided where possible.
        </p>

        <div className="projects-list">
          {projects.map(project => {
            const isOpen = openId === project.id

            return (
              <article key={project.id} className="project-row">
                <div className="project-main">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>

                  <div className="project-tech">
                    {project.tech.join(' • ')}
                  </div>

                  <button
                    className="project-toggle"
                    onClick={() => toggle(project.id)}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? 'Hide case study ↑' : 'View case study ↓'}
                  </button>

                  {isOpen && (
                    <div className="case-study">
                      <div>
                        <strong>Problem</strong>
                        <p>{project.caseStudy.problem}</p>
                      </div>

                      <div>
                        <strong>Solution</strong>
                        <p>{project.caseStudy.solution}</p>
                      </div>

                      <div>
                        <strong>Impact</strong>
                        <ul>
                          {project.caseStudy.impact.map(item => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong>My Role</strong>
                        <ul>
                          {project.caseStudy.responsibilities.map(item => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      {project.isPublic && project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          View source on GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
