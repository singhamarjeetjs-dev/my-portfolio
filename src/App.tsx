import React from "react";
import DarkModeToggle from './components/DarkModeToggle'


type Project = {
  id: number;
  title: string;
  desc: string;
  tech: string[];
  url: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Project Alpha",
    desc: "Responsive web app focused on performance and accessibility.",
    tech: ["React", "Node.js"],
    url: "#",
  },
  {
    id: 2,
    title: "Design System",
    desc: "Reusable UI components and tokens for consistent design.",
    tech: ["TypeScript", "Tailwind"],
    url: "#",
  },
  {
    id: 3,
    title: "Data Dashboard",
    desc: "Interactive charts and filters for business insights.",
    tech: ["React", "D3"],
    url: "#",
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto px-6 py-12">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;

// ---------------------- Header ----------------------

function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-slate-900">
          Amarjeet Singh
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-slate-700">
          <a href="#about" className="hover:text-slate-900">
            About
          </a>
          <a href="#projects" className="hover:text-slate-900">
            Projects
          </a>
          <a href="#contact" className="hover:text-slate-900">
            Contact
          </a>
        </nav>

        <div className="md:hidden">
          <button aria-label="menu" className="p-2 rounded-md border">
            ☰
          </button>
        </div>
        <DarkModeToggle />
      </div>
    </header>
  );
}

// ---------------------- Hero Section ----------------------

function Hero() {
  return (
    <section className="py-12 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Hello, I'm Amarjeet — a Frontend Developer
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          I build responsive, accessible, and maintainable web applications
          using React, TypeScript and modern tooling.
        </p>

        <div className="mt-6 flex gap-4">
          <a
            href="#projects"
            className="inline-block px-5 py-3 rounded-md border font-medium hover:bg-slate-50"
          >
            View projects
          </a>

          <a
            href="#contact"
            className="inline-block px-5 py-3 rounded-md bg-slate-900 text-white font-medium hover:opacity-90"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div className="order-first md:order-last flex justify-center md:justify-end">
        <div className="w-56 h-56 md:w-72 md:h-72 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-50 shadow-md flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm text-slate-500">Portrait</div>
            <div className="mt-2 text-xl font-semibold">Amarjeet Singh</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------- About ----------------------

function About() {
  return (
    <section id="about" className="py-12">
      <h2 className="text-2xl font-semibold">About me</h2>

      <p className="mt-4 text-slate-600 max-w-2xl">
        I have 4+ years of experience building web applications — focusing on
        React, Redux, TypeScript and performance.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">Experience</h3>
          <p className="mt-2 text-slate-600">
            Frontend developer in e-commerce, dashboards, and education tech.
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">Skills</h3>
          <p className="mt-2 text-slate-600">
            React, TypeScript, Redux, Node.js, Tailwind, PostgreSQL, Redis
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------- Projects ----------------------

function Projects() {
  return (
    <section id="projects" className="py-12">
      <h2 className="text-2xl font-semibold">Selected projects</h2>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article
            key={p.id}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="font-medium">{p.title}</h3>

            <p className="mt-2 text-sm text-slate-600">{p.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 border rounded-md text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <a href={p.url} className="text-sm underline">
                View
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---------------------- Contact ----------------------

function Contact() {
  return (
    <section id="contact" className="py-12">
      <h2 className="text-2xl font-semibold">Contact</h2>

      <p className="mt-2 text-slate-600">
        Want to work together or have a question? Send a note.
      </p>

      <form
        className="mt-6 max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Message sent (demo)");
        }}
      >
        <input
          className="p-3 border rounded"
          placeholder="Your name"
          aria-label="name"
        />

        <input
          className="p-3 border rounded"
          placeholder="Your email"
          aria-label="email"
        />

        <textarea
          className="p-3 border rounded sm:col-span-2"
          rows={5}
          placeholder="Message"
          aria-label="message"
        ></textarea>

        <button
          type="submit"
          className="sm:col-span-2 px-4 py-3 bg-slate-900 text-white rounded"
        >
          Send message
        </button>
      </form>
    </section>
  );
}

// ---------------------- Footer ----------------------

function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-600">
        <div>© {new Date().getFullYear()} Amarjeet Singh. All rights reserved.</div>

        <div className="mt-3 md:mt-0 flex gap-4">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
