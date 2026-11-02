const STEPS = [
  {
    number: '01',
    title: 'Free 30-minute process audit',
    text: 'We look at one workflow and estimate what it costs you today.',
  },
  {
    number: '02',
    title: 'Discovery Sprint',
    text: 'Two weeks to a design, a fixed-price build proposal, and optionally a working prototype.',
  },
  {
    number: '03',
    title: 'Build',
    text: 'Weekly demos, so you see progress and steer early.',
  },
  {
    number: '04',
    title: 'Support retainer',
    text: 'Ongoing fixes, enhancements, and new automations.',
  },
]

function HowItWorks() {
  return (
    <div className="how-strip" aria-labelledby="how-title">
      <h3 id="how-title">How it works</h3>
      <ol className="how-list">
        {STEPS.map((step) => (
          <li key={step.number}>
            <span className="how-number" aria-hidden="true">
              {step.number}
            </span>
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default HowItWorks
