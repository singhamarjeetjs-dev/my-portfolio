import { useEffect, useRef, useState } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgvgzqzb'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const hideTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (status === 'sent' || status === 'error') {
      hideTimerRef.current = window.setTimeout(() => {
        setStatus('idle')
        hideTimerRef.current = null
      }, 3000)
    }
  }, [status])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const payload = new FormData()
      payload.append('name', name)
      payload.append('email', email)
      payload.append('message', message)
      payload.append('_subject', `Portfolio contact: ${name}`)

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('sent')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        const body = await res.json().catch(() => ({}))
        setStatus('error')
        setErrorMsg(body?.error || 'Submission failed')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error — try again later')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="content">
        <div className="contact-grid">
          {/* LEFT COLUMN */}
          <div className="contact-content">
            <h2 className="contact-hero">
              Let’s build something meaningful together.
            </h2>

            <p className="contact-copy">
              If you’re building a product, scaling a frontend system, or
              improving performance and reliability — I can help you ship
              clean, maintainable software.
            </p>

            <ul className="contact-points">
              <li>Frontend systems with React & TypeScript</li>
              <li>Performance, accessibility & DX</li>
              <li>Pragmatic engineering with real impact</li>
            </ul>
          </div>

          {/* RIGHT COLUMN – FORM */}
          <div className="contact-form-wrapper">
            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <label className="form-label">Your name</label>
              <input
                className="field"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                required
              />

              <label className="form-label">Your email</label>
              <input
                type="email"
                className="field"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />

              <label className="form-label">Message</label>
              <textarea
                className="field"
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Tell me about your project…"
                required
              />

              <button
                className="form-submit"
                type="submit"
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* TOASTS */}
      {status === 'sent' && (
        <div className="toast" role="status">
          Message sent successfully!
        </div>
      )}

      {status === 'error' && (
        <div className="toast toast-error" role="alert">
          {errorMsg || 'Unable to send message'}
        </div>
      )}
    </section>
  )
}
