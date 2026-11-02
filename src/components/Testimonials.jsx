const TESTIMONIALS = [
  {
    quote:
      'Before Ben\u2019s app, our J1 requests lived in email threads and spreadsheets. Now every request has an owner and a status, and nothing gets lost.',
    name: 'Kathy, Supervisor',
  },
  {
    quote:
      'Ben took a process we\u2019d put up with for years and turned it into something our team actually likes using. Requests that took 30 days now take 5.',
    name: 'Mike, solution user',
  },
  {
    quote:
      'Tracking ATI and RFI requests used to mean chasing people for updates. Now we can see where every request stands at a glance, and deadlines don\u2019t slip.',
    name: 'Paul, staffer',
  },
  {
    quote:
      'Ben understood the deadlines and accountability behind our requests from the first conversation. The tracker Ben built made our reporting far easier.',
    name: 'Andy, supervisor',
  },
  {
    quote:
      'Our clinic referral process went from paper and phone calls to a simple app. Referrals move faster, and staff always know what happens next.',
    name: 'Ezra, Product Owner',
  },
  {
    quote:
      'Ben built the referral app around how our clinic actually works, not the other way round. Staff picked it up with almost no training.',
    name: 'Sarah, supervisor',
  },
  {
    quote:
      'Ben listens first: the right questions up front, working screens early, and quick changes whenever our needs shifted.',
    name: 'Mo, Project stakeholder',
  },
  {
    quote:
      'We didn\u2019t need to buy new software. Ben built everything inside the Microsoft 365 we already had, which kept IT happy and costs down.',
    name: 'Jason, IT Specialist',
  },
  {
    quote:
      'Ben left us with clear documentation and trained our team, so we can make small changes ourselves without calling for help.',
    name: 'Warren, Project stakeholder',
  },
  {
    quote:
      'Ben delivered on time, communicated clearly, and kept supporting us after launch. I\u2019d recommend Ben to any team buried in manual processes.',
    name: 'Derek, solution user',
  },
]

function Testimonials() {
  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <p className="section-eyebrow">Testimonials</p>
        <h2 id="testimonials-title" className="section-title">
          What clients say.
        </h2>
        <p className="section-lead">
          First names only, as approved. Every quote is from DND Health
          Services.
        </p>
        <div className="testimonial-list">
          {TESTIMONIALS.map((item) => (
            <figure className="testimonial" key={item.quote}>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                {item.name}, DND Health Services
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
