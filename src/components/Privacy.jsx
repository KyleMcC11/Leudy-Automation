function Privacy() {
  return (
    <section id="privacy" className="section" aria-labelledby="privacy-title">
      <div className="container privacy-inner">
        <p className="section-eyebrow">Privacy policy</p>
        <h2 id="privacy-title" className="section-title">
          Privacy, in plain language.
        </h2>
        <p>
          Leudy Automation Group collects only what you send through the
          forms on this site: the contact form (name, email, company, and
          what you want to automate) and the project intake questionnaire
          (the company and process details you enter, plus whether you
          agreed to be contacted).
        </p>
        <p>
          That information goes to Ben — by email, and, once it is
          connected, through Ben&rsquo;s own Power Automate flow into his
          SharePoint lead tracker. It is not stored on the developer&rsquo;s
          accounts, and it is not sold or shared with anyone else. The
          intake form also keeps a draft of your answers in your own
          browser (local storage) so a refresh or a Back button doesn&rsquo;t
          lose them; that draft is cleared when your answers are sent
          successfully, and you can clear it yourself by clearing your
          browser&rsquo;s site data.
        </p>
        <p>
          No analytics tool is configured on this site yet. If one is added
          later, it will be a privacy-friendly one, and this policy will be
          updated to name it. This site sets no advertising cookies.
        </p>
        <p>
          If you want your information corrected or deleted, use the contact
          form on this page and say so. This is a simple policy for a small
          business site, not legal advice.
        </p>
      </div>
    </section>
  )
}

export default Privacy
