function Problem() {
  return (
    <section id="problem" className="section problem-section" aria-labelledby="problem-title">
      <div className="container problem-inner">
        <p className="section-eyebrow">The problem</p>
        <h2 id="problem-title" className="section-title">
          Spreadsheets, email approvals, and paper forms.
        </h2>
        <p className="section-lead">
          Capable teams lose hours every week to manual work. Tell us
          which process you want to improve, and how it works today —
          who does what, which tools, where it gets stuck.
        </p>
        <ul className="problem-list">
          <li>Copying data between spreadsheets</li>
          <li>Chasing approvals by email</li>
          <li>Tracking requests on paper</li>
          <li>Requests that live in email threads, with no owner and no status</li>
        </ul>
        <p className="problem-close">
          If that sounds familiar, the work below is built for the
          Microsoft 365 you already pay for — no new software to buy.
        </p>
        <a className="btn btn-book" href="#book">
          Book a free process audit
        </a>
      </div>
    </section>
  )
}

export default Problem
