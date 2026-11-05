'use client';

import { SITE } from '@/lib/site';
import './Faq.css';

export default function Faq() {
  const faqs = SITE.faqs || [];

  return (
    <div className="faq-section-wrap" aria-label="Frequently Asked Questions">
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details key={index} className="faq-item">
            <summary className="faq-summary">
              <span className="faq-question-text">{faq.q}</span>
              <svg className="faq-chevron" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="faq-content">
              <p style={{ margin: 0 }}>{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
