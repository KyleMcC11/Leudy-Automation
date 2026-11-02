import HowItWorks from './HowItWorks.jsx'

const OFFERS = [
  {
    name: 'Discovery Sprint',
    bestFor: 'Any process you want automated.',
    timeline: '2 weeks',
    included: [
      'Up to four 90-minute workshops',
      'Current-state process map',
      'Prioritized requirements and user stories',
      'Solution design: screens, data model, automations, security roles',
      'Microsoft licensing assessment',
      'Fixed-price build proposal',
      'Optional working, clickable prototype',
      'You own the blueprint whether or not you build with us',
    ],
  },
  {
    name: 'Build: Starter',
    bestFor: 'One process, one team.',
    timeline: '3 to 5 weeks',
    included: [
      '1 app, up to 2 automated flows',
      'SharePoint or Dataverse data',
      'Role-based access',
      '1 training session',
    ],
  },
  {
    name: 'Build: Workflow Suite',
    bestFor: 'A process that crosses teams.',
    timeline: '6 to 10 weeks',
    included: [
      'App(s) with multi-stage approvals',
      'Teams and Outlook notifications',
      'Power BI dashboard',
      'Up to 2 integrations',
      'Admin screen',
      '2 training sessions',
    ],
  },
  {
    name: 'Build: Enterprise',
    bestFor: 'Multiple departments or business-critical systems.',
    timeline: '3 to 6 months',
    included: [
      'Dataverse',
      'Dev, test, and prod environments with a deployment pipeline',
      'Governance and security model',
      'Copilot Studio options',
      'Train-the-trainer',
    ],
  },
  {
    name: 'Support: Essentials',
    bestFor: 'Keeping things running.',
    timeline: 'Next business day response',
    included: [
      'Flow and app monitoring',
      'Bug fixes',
      'User and access changes',
    ],
  },
  {
    name: 'Support: Growth',
    bestFor: 'Steady improvement.',
    timeline: 'Same business day response',
    included: [
      'Everything in Essentials, plus:',
      'Enhancement hours',
      'Monthly roadmap call',
      'Quarterly health report',
    ],
  },
  {
    name: 'Support: Partner',
    bestFor: 'Ongoing expansion.',
    timeline: 'Within 4 business hours',
    included: [
      'Everything in Growth, plus:',
      'More hours',
      'New apps and flows',
      'Copilot and AI pilots',
      'Governance oversight',
    ],
  },
]

const EVERY_BUILD = [
  '30 days of hypercare after go-live: fixes and adjustments at no charge',
  'Solution documentation and an admin handover session',
  'Everything built in your own Microsoft tenant, owned by you',
]

const ADDONS = [
  'Prepaid hour blocks',
  'Power Platform health check (governance and security review)',
  'Half-day training workshop for makers or admins',
  'Ad-hoc hours',
]

const WHAT_WE_BUILD = [
  {
    heading: 'Build and migrate',
    items: [
      ['Legacy app migration', 'Move old Access databases, InfoPath forms, Excel macros, or outdated Power Apps onto modern Microsoft 365.'],
      ['SharePoint setup and clean-up', 'Organized SharePoint sites, lists, and permissions that your apps and team can rely on.'],
      ['Microsoft Teams integration', 'Put your apps, approvals, and alerts inside Teams, where your staff already work.'],
      ['Data migration and clean-up', 'Move years of spreadsheet data into a clean, structured list or database.'],
    ],
  },
  {
    heading: 'Data and AI',
    items: [
      ['Reporting dashboards', 'Power BI dashboards that pull live from your apps and lists, so managers stop asking for status updates.'],
      ['AI document processing', 'Use AI Builder or Copilot to read forms, invoices, and emails and file the data automatically.'],
    ],
  },
  {
    heading: 'Support and governance',
    items: [
      ['Process mapping workshop', 'A paid half-day session to map a process and find what\u2019s worth automating first.'],
      ['Power Platform governance', 'Set up environments, data policies, and security so citizen-built apps stay safe.'],
      ['Training and handover', 'Hands-on training and documentation so your team can make small changes themselves.'],
      ['Ongoing support', 'A monthly support plan for fixes, small changes, and keeping solutions up to date.'],
    ],
  },
]

function OfferCard({ offer }) {
  return (
    <article className="offer-card">
      <h3>{offer.name}</h3>
      <p className="offer-best">
        <strong>Best for:</strong> {offer.bestFor}
      </p>
      <ul>
        {offer.included.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="offer-timeline">
        <strong>Timeline:</strong> {offer.timeline}
      </p>
      <a className="btn btn-book" href="#book">
        Book a free process audit
      </a>
    </article>
  )
}

function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <p className="section-eyebrow">Services</p>
        <h2 id="services-title" className="section-title">
          Three offers, in the order you buy them.
        </h2>
        <p className="section-lead">
          Three offers, in the order a client buys them. Prices
          aren&rsquo;t listed here; they&rsquo;re discussed on a discovery
          call.
        </p>

        <HowItWorks />

        <div className="offers-list">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.name} offer={offer} />
          ))}
        </div>

        <div className="every-build">
          <h3>Every build includes</h3>
          <ul>
            {EVERY_BUILD.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="addons">
          <h3>Add-ons</h3>
          <ul>
            {ADDONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="what-we-build">
          <h3>What we build</h3>
          {WHAT_WE_BUILD.map((group) => (
            <div key={group.heading}>
              <h4>{group.heading}</h4>
              <dl>
                {group.items.map(([name, description]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd>{description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
