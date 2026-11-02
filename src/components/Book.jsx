import { useEffect, useState } from 'react'
import { BOOKINGS_URL } from '../config.js'

const STEP_TITLES = [
  'About you',
  'The process',
  'Microsoft 365',
  'Timing',
  'Pick a time',
]

const COMPANY_SIZES = ['1 to 49', '50 to 199', '200 to 500', '500+']
const INDUSTRIES = [
  'Healthcare',
  'Professional services',
  'Manufacturing',
  'Government / public sector',
  'Education',
  'Non-profit',
  'Technology',
  'Retail',
  'Finance',
  'Construction',
  'Other',
]
const PROBLEMS = [
  'Manual data entry',
  'Approvals stuck in email',
  'Errors and rework',
  'No visibility or reporting',
  'Compliance or audit risk',
  'Other',
]
const PEOPLE_COUNTS = ['1 to 5', '6 to 20', '21 to 100', '100+']
const HOURS_OPTIONS = ['Under 5', '5 to 20', '20 to 50', '50+', 'Not sure']
const TOOLS = [
  'Outlook',
  'Teams',
  'SharePoint',
  'OneDrive',
  'Excel',
  'Power Apps',
  'Power Automate',
  'Power BI',
  'Dataverse',
  'Dynamics 365',
  'Not sure',
]
const PLANS = [
  'Business Basic',
  'Business Standard',
  'Business Premium',
  'E3',
  'E5',
  'Government plan',
  'Not sure',
]
const MANAGERS = [
  'In-house IT',
  'Outside IT provider',
  'No one dedicated',
  'Not sure',
]
const TIMINGS = [
  'As soon as possible',
  '1 to 3 months',
  '3 to 6 months',
  'Just exploring',
]
const ROLES = ['I decide', 'I recommend', 'Gathering information']
const SOURCES = ['Referral', 'LinkedIn', 'Search', 'Event', 'Other']

const INITIAL_FORM = {
  fullName: '',
  workEmail: '',
  jobTitle: '',
  phone: '',
  companyName: '',
  companyWebsite: '',
  companySize: '',
  industry: '',
  countryState: '',
  processName: '',
  howToday: '',
  biggestProblem: [],
  peopleCount: '',
  hoursPerWeek: '',
  success: '',
  tools: [],
  plan: '',
  otherSystems: '',
  m365Manager: '',
  timing: '',
  decisionRole: '',
  hearAbout: '',
  anythingElse: '',
  consent: false,
  website: '', // honeypot
}

const DRAFT_KEY = 'lag-book-draft'

function loadDraft() {
  try {
    const saved = window.localStorage.getItem(DRAFT_KEY)
    if (!saved) return INITIAL_FORM
    return { ...INITIAL_FORM, ...JSON.parse(saved) }
  } catch {
    return INITIAL_FORM
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function Book() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(loadDraft)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    try {
      const draft = { ...form }
      delete draft.website
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    } catch {
      // Draft saving is a convenience; the form still works without it.
    }
  }, [form])

  function set(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  function toggle(field, value) {
    setForm((current) => {
      const list = current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value]
      return { ...current, [field]: list }
    })
  }

  function validateStep(currentStep) {
    const next = {}
    if (currentStep === 0) {
      if (!form.fullName.trim()) next.fullName = 'Please enter your full name.'
      if (!form.workEmail.trim()) next.workEmail = 'Please enter your work email.'
      else if (!isValidEmail(form.workEmail.trim()))
        next.workEmail = 'Please enter a valid email address.'
      if (!form.jobTitle.trim()) next.jobTitle = 'Please enter your job title.'
      if (!form.companyName.trim()) next.companyName = 'Please enter your company name.'
      if (!form.companySize) next.companySize = 'Please choose a company size.'
      if (!form.industry) next.industry = 'Please choose an industry.'
      if (!form.countryState.trim())
        next.countryState = 'Please enter your country and state or province.'
    }
    if (currentStep === 1) {
      if (!form.processName.trim())
        next.processName = 'Please name the process you want to improve.'
      if (!form.howToday.trim())
        next.howToday = 'Please describe how it works today.'
      if (form.biggestProblem.length === 0)
        next.biggestProblem = 'Please choose at least one problem.'
      if (!form.peopleCount) next.peopleCount = 'Please choose how many people touch this process.'
      if (!form.hoursPerWeek) next.hoursPerWeek = 'Please choose roughly how many hours a week it takes.'
    }
    if (currentStep === 2) {
      if (form.tools.length === 0)
        next.tools = 'Please choose at least one tool, or "Not sure".'
    }
    if (currentStep === 3) {
      if (!form.timing) next.timing = 'Please choose when you want this solved.'
      if (!form.decisionRole) next.decisionRole = 'Please choose your role in the decision.'
      if (!form.consent)
        next.consent = 'Please agree to be contacted about this request.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function next() {
    if (validateStep(step)) {
      setStatus({ type: 'idle', message: '' })
      setStep((current) => current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function back() {
    setStatus({ type: 'idle', message: '' })
    setStep((current) => Math.max(0, current - 1))
  }

  async function submit(event) {
    event.preventDefault()
    if (!validateStep(3)) return
    setSubmitting(true)
    setStatus({ type: 'idle', message: '' })
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json().catch(() => ({}))
      if (response.status === 501) {
        setStatus({
          type: 'error',
          message:
            'Thanks — but this intake form is not connected to Ben\u2019s inbox yet. Your answers are still saved in this browser, so nothing is lost: please try again once the connection is set up (see README.md), or use the contact form below instead.',
        })
        return
      }
      if (!response.ok) throw new Error(data.error || 'Submission failed.')
      setSubmitted(true)
      setStep(4)
      try {
        window.localStorage.removeItem(DRAFT_KEY)
      } catch {
        // Ignore.
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus({
        type: 'error',
        message:
          'Sorry, your answers could not be sent right now. They are still saved in this browser — please try again shortly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  function fieldError(name) {
    return errors[name] ? (
      <p className="field-error" role="alert">
        {errors[name]}
      </p>
    ) : null
  }

  function textField(name, label, options = {}) {
    return (
      <div className="field">
        <label htmlFor={`book-${name}`}>
          {label}
          {options.required ? ' *' : ''}
        </label>
        <input
          id={`book-${name}`}
          type={options.type || 'text'}
          autoComplete={options.autoComplete}
          placeholder={options.placeholder}
          value={form[name]}
          onChange={(event) => set(name, event.target.value)}
        />
        {fieldError(name)}
      </div>
    )
  }

  function textAreaField(name, label, hint, required = false) {
    return (
      <div className="field">
        <label htmlFor={`book-${name}`}>
          {label}
          {required ? ' *' : ''}
        </label>
        {hint && <p className="field-hint">{hint}</p>}
        <textarea
          id={`book-${name}`}
          rows="4"
          value={form[name]}
          onChange={(event) => set(name, event.target.value)}
        />
        {fieldError(name)}
      </div>
    )
  }

  function selectField(name, label, options, required = false) {
    return (
      <div className="field">
        <label htmlFor={`book-${name}`}>
          {label}
          {required ? ' *' : ''}
        </label>
        <select
          id={`book-${name}`}
          value={form[name]}
          onChange={(event) => set(name, event.target.value)}
        >
          <option value="">Choose…</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {fieldError(name)}
      </div>
    )
  }

  function checkboxGroup(name, label, options) {
    return (
      <fieldset className="field">
        <legend>
          {label} *
        </legend>
        {options.map((option) => (
          <label key={option} className="check-label">
            <input
              type="checkbox"
              checked={form[name].includes(option)}
              onChange={() => toggle(name, option)}
            />
            {option}
          </label>
        ))}
        {fieldError(name)}
      </fieldset>
    )
  }

  return (
    <section id="book" className="section book-section" aria-labelledby="book-title">
      <div className="container book-inner">
        <div className="book-main">
          <p className="section-eyebrow">Book a call</p>
          <h2 id="book-title" className="section-title">
            Book a free process audit
          </h2>
          <p className="section-lead">
            About 5 minutes, then pick a time for a 30-minute call.
          </p>
          <p className="book-warning">
            Please don&rsquo;t include passwords, patient data, or other
            personal information.
          </p>

          <ol className="book-progress" aria-label="Intake progress">
            {STEP_TITLES.map((title, index) => (
              <li
                key={title}
                className={
                  index === step
                    ? 'current'
                    : index < step || submitted
                      ? 'done'
                      : ''
                }
                aria-current={index === step ? 'step' : undefined}
              >
                <span>{index + 1}</span> {title}
              </li>
            ))}
          </ol>

          {step < 4 && (
            <form
              className="book-form"
              onSubmit={step === 3 ? submit : (event) => event.preventDefault()}
              noValidate
            >
              {step === 0 && (
                <>
                  <h3>Step 1 — About you</h3>
                  {textField('fullName', 'Full name', { required: true, autoComplete: 'name' })}
                  {textField('workEmail', 'Work email', { required: true, type: 'email', autoComplete: 'email' })}
                  {textField('jobTitle', 'Job title', { required: true })}
                  {textField('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
                  {textField('companyName', 'Company name', { required: true })}
                  {textField('companyWebsite', 'Company website')}
                  {selectField('companySize', 'Company size', COMPANY_SIZES, true)}
                  {selectField('industry', 'Industry', INDUSTRIES, true)}
                  {textField('countryState', 'Country and state or province', { required: true })}
                </>
              )}

              {step === 1 && (
                <>
                  <h3>Step 2 — The process</h3>
                  {textField('processName', 'Which process or workflow do you want to improve?', { required: true })}
                  {textAreaField(
                    'howToday',
                    'How does it work today?',
                    'Who does what, which tools, where it gets stuck.',
                    true,
                  )}
                  {checkboxGroup('biggestProblem', 'What\u2019s the biggest problem?', PROBLEMS)}
                  {selectField('peopleCount', 'How many people touch this process?', PEOPLE_COUNTS, true)}
                  {selectField('hoursPerWeek', 'Roughly how many hours a week does it take, across everyone?', HOURS_OPTIONS, true)}
                  {textAreaField('success', 'What would success look like?')}
                </>
              )}

              {step === 2 && (
                <>
                  <h3>Step 3 — Microsoft 365</h3>
                  {checkboxGroup('tools', 'Which tools does your team use today?', TOOLS)}
                  {selectField('plan', 'Which Microsoft 365 plan do you have?', PLANS)}
                  {textField('otherSystems', 'Other systems this needs to connect to (e.g. ERP, CRM, HR)')}
                  {selectField('m365Manager', 'Who manages your Microsoft 365?', MANAGERS)}
                </>
              )}

              {step === 3 && (
                <>
                  <h3>Step 4 — Timing</h3>
                  {selectField('timing', 'When do you want this solved?', TIMINGS, true)}
                  {selectField('decisionRole', 'Your role in the decision', ROLES, true)}
                  {selectField('hearAbout', 'How did you hear about us?', SOURCES)}
                  {textAreaField('anythingElse', 'Anything else we should know?')}
                  <div className="field">
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(event) => set('consent', event.target.checked)}
                      />
                      I agree to be contacted about this request (see the{' '}
                      <a href="#privacy">privacy policy</a>). *
                    </label>
                    {fieldError('consent')}
                  </div>
                </>
              )}

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="book-website">Website</label>
                <input
                  id="book-website"
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) => set('website', event.target.value)}
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

              <div className="book-nav">
                {step > 0 && (
                  <button className="btn btn-secondary" type="button" onClick={back}>
                    Back
                  </button>
                )}
                {step < 3 && (
                  <button className="btn btn-primary" type="button" onClick={next}>
                    Next
                  </button>
                )}
                {step === 3 && (
                  <button className="btn btn-book" type="submit" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Submit answers'}
                  </button>
                )}
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="book-step5">
              <h3>Step 5 — Pick a time</h3>
              <p>
                Thanks — your answers are in
                {submitted ? ', and Ben has them' : ''}. Pick a 30-minute
                slot below.
              </p>
              {BOOKINGS_URL ? (
                <>
                  <iframe
                    title="Microsoft Bookings calendar — 30-minute process audit"
                    src={BOOKINGS_URL}
                    height="600"
                  />
                  <p>
                    Bookings puts the meeting on Ben&rsquo;s calendar with a
                    Teams link and sends you the invite.
                  </p>
                </>
              ) : (
                <p className="book-pending">
                  The booking calendar will appear here once Ben supplies his
                  Microsoft Bookings link. In the meantime, Ben will follow
                  up on the answers you sent to arrange a time — and if you
                  leave before picking a time, he still has your answers.
                </p>
              )}
              <p className="book-thanks">
                Thank you. Here&rsquo;s what happens next: Ben reviews your
                process, then you talk through it on a 30-minute call and
                find out what it costs you today.
              </p>
            </div>
          )}
        </div>

        <aside className="book-side" aria-label="What happens next">
          <h3>What happens next</h3>
          <ol>
            <li>Ben gets your answers by email.</li>
            <li>You pick a time for a 30-minute call.</li>
            <li>The call lands on Ben&rsquo;s calendar with a Teams link.</li>
            <li>
              On the call, you look at one workflow and estimate what it
              costs you today.
            </li>
          </ol>
          <p>
            If you leave before picking a time, Ben still has your answers
            and can follow up.
          </p>
          <p className="book-warning">
            Please don&rsquo;t include passwords, patient data, or other
            personal information.
          </p>
        </aside>
      </div>
    </section>
  )
}

export default Book
