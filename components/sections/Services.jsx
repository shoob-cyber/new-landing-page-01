'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import GradeCompare from '@/components/ui/GradeCompare';
import { SITE } from '@/lib/site';
import './Services.css';

export default function Services() {
  const [s1, s2, s3, s4] = SITE.services;

  return (
    <section
      id="services"
      data-tone="dark"
      className="services-section"
      aria-label="Video Editing Services"
    >
      <div className="services-container">
        <SectionHeading
          chapter="02"
          label="SERVICES"
          title="What I Do"
          sub="Precision editing workflows tailored for commercial scale, viral organic reach, and cinematic immersion."
        />

        <div className="services-bento">
          {/* Card 1: Long-form editing */}
          <div className="service-card card-half">
            <div>
              <div className="service-card-header">
                <span className="service-index">{s1.id}</span>
                <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <polygon points="10 8 15 10 10 12" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <h3 className="service-title" style={{ marginTop: '16px' }}>{s1.title}</h3>
              <p className="service-desc">{s1.description}</p>
            </div>
            <div className="service-tags">
              {s1.tags.map((tag, i) => (
                <span key={i} className="service-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Card 2: Shorts and Reels */}
          <div className="service-card card-half">
            <div>
              <div className="service-card-header">
                <span className="service-index">{s2.id}</span>
                <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="6" y="2" width="12" height="20" rx="3" />
                  <line x1="10" y1="18" x2="14" y2="18" />
                  <path d="M12 6v6l3-2" />
                </svg>
              </div>
              <h3 className="service-title" style={{ marginTop: '16px' }}>{s2.title}</h3>
              <p className="service-desc">{s2.description}</p>
            </div>
            <div className="service-tags">
              {s2.tags.map((tag, i) => (
                <span key={i} className="service-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Card 3: Color grading (Wide, containing GradeCompare) */}
          <div className="service-card card-wide">
            <div>
              <div className="service-card-header">
                <span className="service-index">{s3.id}</span>
                <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" stroke="none" opacity="0.4" />
                </svg>
              </div>
              <h3 className="service-title" style={{ marginTop: '16px' }}>{s3.title}</h3>
              <p className="service-desc">{s3.description}</p>

              {/* Interactive RAW vs GRADED viewer */}
              <div className="grade-compare-container">
                <GradeCompare />
              </div>
            </div>
            <div className="service-tags">
              {s3.tags.map((tag, i) => (
                <span key={i} className="service-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Card 4: Motion and sound */}
          <div className="service-card card-narrow">
            <div>
              <div className="service-card-header">
                <span className="service-index">{s4.id}</span>
                <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M2 10v4" />
                  <path d="M6 6v12" />
                  <path d="M10 3v18" />
                  <path d="M14 8v8" />
                  <path d="M18 5v14" />
                  <path d="M22 10v4" />
                </svg>
              </div>
              <h3 className="service-title" style={{ marginTop: '16px' }}>{s4.title}</h3>
              <p className="service-desc">{s4.description}</p>
            </div>
            <div className="service-tags">
              {s4.tags.map((tag, i) => (
                <span key={i} className="service-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
