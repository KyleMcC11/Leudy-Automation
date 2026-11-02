function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <p className="section-eyebrow">About</p>
        <h2 id="about-title" className="section-title">
          One person, not an agency.
        </h2>
        <p className="about-lead">
          I&rsquo;m Ben Leudy, founder of Leudy Automation Group. With 4+
          years on Microsoft Power Platform, I build custom Microsoft 365
          apps and automated workflows that replace spreadsheets, email
          chains, and paper forms.
        </p>
        <div className="about-inner">
          <div className="about-copy">
            <p>
              I started Leudy Automation Group because I kept seeing capable
              teams lose hours every week to manual work: copying data
              between spreadsheets, chasing approvals by email, and tracking
              requests on paper.
            </p>
            <p>
              I served six years in the military, working across operations,
              administration, and mechanical engineering, and I&rsquo;ve
              spent the last 4+ years working on Microsoft Power Platform,
              including 2+ years as a solution consultant and lead developer.
              Along the way I built Power Apps and Power Automate solutions
              for DND Health Services departments, including an
              administrative requests workflow and database used by more
              than 500 people, a workflow for tracking, managing, and
              responding to ATI and RFI requests, and a clinic patient
              referral solution now being rolled out to 33 Canadian Armed
              Forces clinics across Canada.
            </p>
            <p>
              That work taught me to build for people who are busy, work
              under real deadlines, and have no time to learn complicated
              software. Everything I build runs inside your own Microsoft
              365, so there&rsquo;s no new software to buy, your data stays
              in your tenant, and your IT team stays in control.
            </p>
            <p>
              I start every project by listening to how your team actually
              works, show you working screens early, and finish with training
              and documentation so you&rsquo;re never stuck depending on me.
            </p>
            <ul className="about-direct">
              <li>
                You deal directly with the person writing the automation —
                no hand-offs and no junior bench.
              </li>
              <li>
                Working screens early, so you can steer before the build is
                finished.
              </li>
              <li>
                Training and documentation at handover, so your team can
                make small changes themselves.
              </li>
            </ul>
            <p>
              I work remotely with businesses of any size worldwide, with a
              focus on the USA.
            </p>
          </div>

          <aside className="about-side" aria-labelledby="experience-title">
            <h3 id="experience-title">Experience</h3>
            <ul>
              <li>
                4+ years of hands-on Microsoft Power Platform experience,
                including 2+ years as a Power Platform solution consultant
                and lead developer
              </li>
              <li>
                Delivered request-management, request-tracking, and referral
                systems for DND Health Services departments
              </li>
              <li>
                Six years of military service in operations, administrative
                roles, and mechanical engineering
              </li>
            </ul>
            <h3>Certifications</h3>
            <p>
              Currently pursuing Microsoft Power Platform certification
              (PL-200 is the first target).
            </p>
            <p>
              Held: B.Eng Mechanical Engineering; PMP certification.
            </p>
            <p className="about-note">
              A photo of Ben goes here once he supplies a headshot.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default About
