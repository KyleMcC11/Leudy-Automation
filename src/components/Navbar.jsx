import { useState } from 'react'
import { BUSINESS_NAME, BUSINESS_SHORT } from '../config.js'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

// Plain-text wordmark (the requirements document asks for a simple
// wordmark, no icon box): full name on desktop, short form on phones.
function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)}>
          <span className="wordmark-full">{BUSINESS_NAME}</span>
          <span className="wordmark-short">{BUSINESS_SHORT}</span>
        </a>

        <nav
          id="primary-nav"
          className={`nav-links ${open ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <a className="btn btn-book nav-cta" href="#book">
            Book a call
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
