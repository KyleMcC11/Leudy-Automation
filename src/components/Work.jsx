const RESULTS = [
  { value: '30 → 5 days', label: 'Request turnaround, J1 requests workflow' },
  { value: '500+ people', label: 'Using the requests system' },
  { value: '33 clinics', label: 'Clinic patient referral solution rolling out to' },
  { value: '10+ hours', label: 'Saved per person per week, across the work' },
]

const CASES = [
  {
    title: 'J1 requests workflow',
    client: 'DND Health Services departments',
    results: 'Request turnaround cut from 30 days to 5 days; 500+ people using the system.',
    problem:
      'Requests lived in email threads and spreadsheets. Nothing had a clear owner or status, and requests got lost.',
    built:
      'A request-tracking app and database: every request has an owner and a status, approvals are tracked in one place, and the team can see what needs attention.',
  },
  {
    title: 'ATI and RFI request tracking',
    client: 'DND Health Services departments',
    results: 'Deadlines stopped slipping; reporting became far easier.',
    problem:
      'Tracking ATI and RFI requests meant chasing people for updates, and nobody could see where a request stood or what was due.',
    built:
      'A tracker for managing and responding to ATI and RFI requests, with a clear view of every request, its status, and its deadline.',
  },
  {
    title: 'Clinic patient referral',
    client: 'DND Health Services departments',
    results: 'Referral solution rolling out to 33 clinics; referrals move faster.',
    problem:
      'Clinic referrals ran on paper and phone calls. Referrals were slow, and staff were never quite sure what happened next.',
    built:
      'A simple referral app built around how the clinic actually works, so referrals move faster and staff always know the next step.',
  },
]

function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <p className="section-eyebrow">Work</p>
        <h2 id="work-title" className="section-title">
          Proof it works.
        </h2>
        <p className="section-lead">
          Clients are named only as DND Health Services departments. No
          specific people, units, locations, or systems are named, and no
          real personnel or patient information is shown.
        </p>

        <dl className="results-strip">
          {RESULTS.map((result) => (
            <div key={result.label}>
              <dt>{result.value}</dt>
              <dd>{result.label}</dd>
            </div>
          ))}
        </dl>

        <div className="case-list">
          {CASES.map((item) => (
            <article className="case-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="case-client">{item.client}</p>
              <p className="case-results">
                <strong>Result:</strong> {item.results}
              </p>
              <p>
                <strong>The problem:</strong> {item.problem}
              </p>
              <p>
                <strong>Action:</strong> {item.built}
              </p>
            </article>
          ))}
        </div>
        <p className="case-note">
          Screenshots are not shown here: Ben supplies real screenshots with
          fake or blurred data before launch.
        </p>
      </div>
    </section>
  )
}

export default Work
