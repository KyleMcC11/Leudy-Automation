import { BUSINESS_NAME, BUSINESS_TAGLINE, EMAIL, LINKEDIN_URL } from '../config.js'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          <strong>{BUSINESS_NAME}</strong> — {BUSINESS_TAGLINE}
        </p>

        <nav className="footer-nav" aria-label="Footer">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#book">Book a call</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy</a>
        </nav>

        <div className="footer-contact">
          {EMAIL && <a href={`mailto:${EMAIL}`}>{EMAIL}</a>}
          {LINKEDIN_URL && (
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
        </div>

        <p className="footer-copy">
          © {year} {BUSINESS_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
