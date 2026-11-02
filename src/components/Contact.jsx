import { useState } from 'react'
import { EMAIL, LINKEDIN_URL } from '../config.js'

const INITIAL_FORM = {
  name: '',
  company: '',
  email: '',
  projectDescription: '',
  website: '', // honeypot: real visitors leave this empty
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [sending, setSending] = useState(false)

  function update(field) {
    return (event) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
      setErrors((current) => ({ ...current, [field]: '' }))
    }
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!isValidEmail(form.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (!form.projectDescription.trim())
      next.projectDescription = 'Please describe your project.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ type: 'idle', message: '' })
    if (!validate()) return

    setSending(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          projectDescription: form.projectDescription.trim(),
          website: form.website,
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (response.status === 501) {
        setStatus({
          type: 'error',
          message:
            'Thanks — but this form is not connected to an inbox yet. The site owner needs to finish the one-time email setup in README.md, then this form will send normally.',
        })
        return
      }
      if (!response.ok) {
        throw new Error(data.error || 'Submission failed.')
      }
      setStatus({
        type: 'success',
        message:
          'Message sent. Thanks for getting in touch — you should hear back soon.',
      })
      setForm(INITIAL_FORM)
    } catch {
      setStatus({
        type: 'error',
        message:
          'Sorry, that message could not be sent right now. Please try again shortly.',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section section-alt" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div className="contact-copy">
          <p className="section-eyebrow">Contact</p>
          <h2 id="contact-title" className="section-title">
            Contact
          </h2>
          <p className="section-lead">
            Start with a free process audit, or send a short general
            enquiry below.
          </p>
          <p className="contact-book">
            <a className="btn btn-book" href="#book">
              Start your free process audit
            </a>
          </p>
          <ul className="contact-details">
            {EMAIL && (
              <li>
                <strong>Email</strong>{' '}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            )}
            {LINKEDIN_URL && (
              <li>
                <strong>LinkedIn</strong>{' '}
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  Connect on LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={update('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p className="field-error" id="name-error" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={update('company')}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={update('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p className="field-error" id="email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="projectDescription">What do you want to automate? *</label>
            <textarea
              id="projectDescription"
              rows="5"
              value={form.projectDescription}
              onChange={update('projectDescription')}
              aria-invalid={Boolean(errors.projectDescription)}
              aria-describedby={
                errors.projectDescription ? 'project-error' : undefined
              }
            />
            {errors.projectDescription && (
              <p className="field-error" id="project-error" role="alert">
                {errors.projectDescription}
              </p>
            )}
          </div>

          {/* Spam honeypot: hidden from sighted users and screen readers. */}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={update('website')}
            />
          </div>

          {status.message && (
            <p
              className={`form-status form-status-${status.type}`}
              role={status.type === 'error' ? 'alert' : 'status'}
            >
              {status.message}
            </p>
          )}

          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Send enquiry'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
