'use client';

import dynamic from 'next/dynamic';
import SectionHeading from '@/components/ui/SectionHeading';
import Counter from '@/components/ui/Counter';
import { SITE } from '@/lib/site';
import './About.css';

const ProfileCard = dynamic(() => import('@/components/react-bits/ProfileCard'), { ssr: false });

export default function About() {
  const goToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      data-tone="dark"
      className="about-section"
      aria-label="Behind the Cut - Professional Background"
    >
      <div className="about-container">
        <SectionHeading
          chapter="04"
          label="ABOUT"
          title="Behind the Cut"
          sub="Videographer & Video Editor crafting high-pace reels and commercial campaigns with rhythm, SFX, and precision color."
        />

        <div className="about-grid">
          {/* Column 1: Interactive ProfileCard */}
          <div className="about-card-col">
            <ProfileCard
              name={SITE.brandName}
              title={SITE.role}
              handle="sahabuddin.seikh28"
              status="Available for Projects"
              statusColor="#F3EFE6"
              contactText="Let's Work !"
              avatarUrl="/portrait.png"
              iconUrl="/pattern.svg"
              backdropColor="#141515"
              theme="dark"
              holo={0.6}
              glare={0.55}
              tiltStrength={12}
              parallax={8}
              radius={18}
              onContactClick={goToContact}
              className="profile-card--grade"
            />

            {/* Quick Contact & CV Info Card */}
            <div className="about-contact-quick">
              <div className="quick-item">
                <span className="quick-label">FULL NAME</span>
                <span className="quick-val">{SITE.fullName}</span>
              </div>
              <div className="quick-item">
                <span className="quick-label">EMAIL</span>
                <a href={`mailto:${SITE.email}`} className="quick-link">
                  {SITE.email}
                </a>
              </div>
              <div className="quick-item">
                <span className="quick-label">DIRECT PHONE</span>
                <a href={`tel:${SITE.phone}`} className="quick-link">
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Bio, Verified Agency Track Record & Toolkit */}
          <div className="about-info-col">
            <div className="about-bio-wrap">
              {SITE.bio.map((paragraph, idx) => (
                <p key={idx} className="about-bio">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Verified Career Experience Timeline */}
            <div className="about-exp-block">
              <div className="exp-block-header">
                <span className="exp-block-tag">EXPERIENCE // TRACK RECORD</span>
                <h4 className="exp-block-title">Agency &amp; Commercial Timeline</h4>
              </div>

              <div className="exp-list">
                {SITE.experience.map((exp, idx) => (
                  <div key={idx} className="exp-card">
                    <div className="exp-card-head">
                      <div className="exp-card-titles">
                        <span className="exp-company">{exp.company}</span>
                        <span className="exp-role">{exp.role}</span>
                      </div>
                      <span className="exp-period">{exp.period}</span>
                    </div>
                    <ul className="exp-bullets">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Core Software */}
            <div className="about-tools-wrap">
              <span className="about-tools-label">SOFTWARE &amp; TECHNICAL CAPABILITIES</span>
              <div className="about-tools-list">
                {SITE.tools.map((tool, idx) => {
                  const isObj = typeof tool === 'object';
                  const name = isObj ? tool.name : tool;
                  const badge = isObj ? tool.badge : null;
                  const role = isObj ? tool.role : null;
                  const color = isObj ? tool.color : '#F3EFE6';
                  return (
                    <div
                      key={idx}
                      className="about-tool-card"
                      style={{ '--tool-accent': color }}
                    >
                      {badge && (
                        <span className="about-tool-badge" style={{ borderColor: color, color }}>
                          {badge}
                        </span>
                      )}
                      <div className="about-tool-meta">
                        <span className="about-tool-name">{name}</span>
                        {role && <span className="about-tool-role">{role}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats Row */}
            <div className="about-stats-row">
              {SITE.stats.map((stat, idx) => (
                <div key={idx} className="stat-item">
                  <div className="stat-value">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
