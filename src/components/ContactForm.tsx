import React, { useEffect, useRef, useState, type JSX } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgvgzqzb' // <-- replace this

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm(): JSX.Element {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const hideTimerRef = useRef<number | null>(null)

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Auto-hide toast after 3s when status is sent or error
    if (status === 'sent' || status === 'error') {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current)
      }
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
        headers: {
          Accept: 'application/json'
        }
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
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg('Network error — try again later')
    }
  }

  return (
    <>
      <form className="form-card" onSubmit={handleSubmit} aria-live="polite" noValidate>
        <label style={{ display: 'block', marginBottom: 6 }}>Your name</label>
        <input
          name="name"
          className="field"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-required
        />

        <label style={{ display: 'block', marginTop: 12, marginBottom: 6 }}>Your email</label>
        <input
          name="email"
          type="email"
          className="field"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required
        />

        <label style={{ display: 'block', marginTop: 12, marginBottom: 6 }}>Message</label>
        <textarea
          name="message"
          className="field"
          rows={5}
          placeholder="Tell me about your project..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          aria-required
        />

        <div style={{ marginTop: 12 }}>
          <button
            className="form-submit"
            type="submit"
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </form>

      {/* Toasts */}
      {status === 'sent' && (
        <div className="toast" role="status" aria-live="polite" key="success-toast">
          Message sent successfully!
        </div>
      )}

      {status === 'error' && (
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          key="error-toast"
          style={{ background: '#dc2626', color: 'white', borderColor: 'rgba(0,0,0,0.06)' }}
        >
          {errorMsg || 'Unable to send message'}
        </div>
      )}
    </>
  )
}
