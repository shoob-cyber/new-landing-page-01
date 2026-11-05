'use client';

import { SITE } from '@/lib/site';
import './Footer.css';

const SECTIONS = [
  { label: '00 // Home', href: '#home' },
  { label: '01 // Work', href: '#work' },
  { label: '02 // Services', href: '#services' },
  { label: '03 // Process', href: '#process' },
  { label: '04 // About', href: '#about' },
  { label: '05 // Proof', href: '#proof' },
  { label: '06 // Contact', href: '#contact' }
];

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      data-tone="dark"
      className="footer-section"
      aria-label="Site Footer"
    >
      <div className="footer-container">
        {/* Outlined CSS Wordmark */}
        <div className="footer-wordmark" aria-hidden="true">
          {SITE.brandName}
        </div>

        {/* Real Anchor List for SEO, Accessibility and Navigation */}
        <nav aria-label="Footer navigation">
          <ul className="footer-nav">
            {SECTIONS.map((sec, idx) => (
              <li key={idx}>
                <a
                  href={sec.href}
                  onClick={(e) => handleNavClick(e, sec.href)}
                  className="footer-nav-link"
                >
                  {sec.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Metadata & Top Jumper */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {SITE.brandName}. All rights reserved. &bull; {SITE.location}
          </p>

          <a
            href="#home"
            onClick={scrollToTop}
            className="footer-top-btn"
            aria-label="Back to top (Timecode 00:00:00:00)"
          >
            <span>&uarr; TOP</span>
            <span>00:00:00:00</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
