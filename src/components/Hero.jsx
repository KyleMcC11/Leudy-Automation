function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <p className="hero-eyebrow">
          Remote, serving clients worldwide with a focus on the USA
        </p>
        <h1 id="hero-title">
          Custom apps and automation for teams already on Microsoft 365.
        </h1>
        <p className="hero-lead">
          Leudy Automation Group builds custom Microsoft 365 apps and
          workflow automation — Power Apps, Power Automate, and SharePoint —
          for private businesses of any size. No new software to buy: the
          work replaces spreadsheets, email approvals, and paper forms, and
          it runs inside your own Microsoft 365.
        </p>
        <p className="hero-example">
          For example: a request that used to live in email threads becomes
          an app where every request has an owner and a status, and nothing
          gets lost.
        </p>
        <div className="hero-actions">
          <a className="btn btn-book" href="#book">
            Book a free process audit
          </a>
          <a className="btn btn-secondary" href="#services">
            See the services
          </a>
        </div>
        <ul className="hero-offers" aria-label="Main offers">
          <li>
            <a href="#services">Discovery Sprint</a> — two weeks to a design
            and a fixed-price build proposal.
          </li>
          <li>
            <a href="#services">Build</a> — Starter, Workflow Suite, and
            Enterprise packages, with weekly demos.
          </li>
          <li>
            <a href="#services">Support and Growth</a> — retainers that keep
            things running and keep improving them.
          </li>
        </ul>
        <p className="hero-availability">
          One senior consultant handles each project end to end —
          requirements, design, build, training, and support — with no
          hand-offs and no junior bench.
        </p>
      </div>
    </section>
  )
}

export default Hero
