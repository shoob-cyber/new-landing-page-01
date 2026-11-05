'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import Faq from '@/components/ui/Faq';
import { SITE } from '@/lib/site';
import './Proof.css';

export default function Proof() {
  return (
    <section
      id="proof"
      data-tone="dark"
      className="proof-section"
      aria-label="Client Testimonials and FAQ"
    >
      <div className="proof-container">
        {/* Chapter 05: Kind Words */}
        <SectionHeading
          chapter="05"
          label="TESTIMONIALS"
          title="Kind Words"
          sub="Feedback from creative directors, brand founders, and channel producers."
        />

        {/* 3 Testimonials */}
        <div className="testimonials-grid">
          {SITE.testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-quote-mark" aria-hidden="true">&ldquo;</div>
              <p className="testimonial-quote">
                {t.quote}
              </p>
              <div className="testimonial-author-wrap">
                <span className="testimonial-author">{t.author}</span>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos / Brands as plain text in --line */}
        <div className="client-logos-row" aria-label="Brands and Clients">
          {SITE.clientLogos.map((logo, idx) => (
            <span key={idx} className="client-logo-item">
              {logo}
            </span>
          ))}
        </div>

        {/* Dedicated FAQ Heading & Accordion Block */}
        <div className="proof-faq-divider" aria-hidden="true" />

        <SectionHeading
          chapter="06"
          label="QUESTIONS"
          title="FAQ's"
          sub="Straight answers on turnaround speeds, revision cycles, raw footage ingestion, and monthly retainers."
        />

        <Faq />
      </div>
    </section>
  );
}
