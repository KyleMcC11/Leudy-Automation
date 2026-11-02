import { useState } from 'react'

function Roi() {
  const [hours, setHours] = useState('')
  const [cost, setCost] = useState('')

  const hoursNumber = Number(hours)
  const costNumber = Number(cost)
  const valid = hoursNumber > 0 && costNumber > 0
  const weekly = valid ? hoursNumber * costNumber : 0
  const yearly = weekly * 52

  return (
    <section id="roi" className="section" aria-labelledby="roi-title">
      <div className="container">
        <p className="section-eyebrow">A quick estimate</p>
        <h2 id="roi-title" className="section-title">
          What is manual work costing you?
        </h2>
        <p className="section-lead">
          Enter the hours a task takes each week, across everyone who touches
          it, and a rough hourly cost. This is a conversation starter, not a
          quote — actual savings depend on the process.
        </p>
        <div className="roi-inner">
          <div className="field">
            <label htmlFor="roi-hours">
              Hours per week spent on the task
            </label>
            <input
              id="roi-hours"
              type="number"
              min="0"
              step="0.5"
              inputMode="decimal"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="roi-cost">
              Average hourly cost ($)
            </label>
            <input
              id="roi-cost"
              type="number"
              min="0"
              step="1"
              inputMode="decimal"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            />
          </div>
          <div className="roi-result" aria-live="polite">
            {valid ? (
              <p>
                That task costs roughly{' '}
                <strong>${weekly.toLocaleString()} a week</strong>, or{' '}
                <strong>${yearly.toLocaleString()} a year</strong>. If that
                number surprises you, it&rsquo;s worth a free process audit.
              </p>
            ) : (
              <p>Enter both numbers to see the yearly estimate.</p>
            )}
          </div>
          {valid && (
            <a className="btn btn-book" href="#book">
              Book a free process audit
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default Roi
