'use client';

import dynamic from 'next/dynamic';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/ui/ContactForm';
import LazyMount from '@/components/ui/LazyMount';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SITE } from '@/lib/site';
import './Contact.css';

const GhostFibers = dynamic(() => import('@/components/react-bits/GhostFibers'), { ssr: false });
const BlurText = dynamic(() => import('@/components/react-bits/BlurText'), { ssr: false });

export default function Contact() {
  const { matches: isMobile } = useMediaQuery('(max-width: 767px)');

  return (
    <section
      id="contact"
      data-tone="dark"
      className="contact-section"
      aria-label="Contact and Inquiries"
    >
      {/* Background Gradient fallback */}
      <div className="contact-bg-gradient" aria-hidden="true" />

      {/* GhostFibers (Calmer setup, desktop only) */}
      {!isMobile && (
        <div className="contact-bg-fibers" aria-hidden="true">
          <LazyMount style={{ width: '100%', height: '100%' }}>
            <GhostFibers
              glowColor="#F3EFE6"
              secondaryColor="#C5A880"
              lineColor="#D9D2C3"
              layers={1}
              threads={42}
              density={0.8}
              speed={0.28}
              flow={0.25}
              depthOfField={1}
              focusDepth={0.3}
              particles={0.3}
              sparkle={0.3}
              glow={0.7}
              brightness={0.8}
              vignette={0.5}
              hoverEffect="part"
              mouseStrength={0.8}
              pulseOnClick={false}
            />
          </LazyMount>
        </div>
      )}

      <div className="contact-container">
        <SectionHeading
          chapter="06"
          label="CONTACT"
          title="Contact"
          hoverRefold
          refoldRadius={160}
        />

        {/* Closing Line with BlurText */}
        <BlurText
          text="Have a story to tell? Let’s cut it together."
          effect="focus"
          animateBy="words"
          trigger="view"
          delay={110}
          stepDuration={0.55}
          blur={12}
          distance={0}
          fromColor="#66635D"
          color="#FAF8F5"
          focusOnHover
          className="closing-line"
        />

        {/* 3 Quick Action Buttons */}
        <div className="contact-quick-actions">
          <a
            href={`mailto:${SITE.email}`}
            className="action-btn"
            aria-label="Send direct email"
          >
            <svg className="action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Email Shobu</span>
          </a>

          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
            aria-label="Chat on WhatsApp"
          >
            <svg className="action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <a
            href={SITE.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
            aria-label="Open Linktree Portfolio"
          >
            <svg className="action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L6 8h4v6H6l6 6 6-6h-4V8h4L12 2z" />
            </svg>
            <span>Linktree / Intro</span>
          </a>
        </div>

        {/* Detailed Contact Form */}
        <ContactForm />

        {/* Socials Row */}
        <div className="contact-socials-row" aria-label="Social media profiles">
          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="YouTube Channel"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Linktree */}
          <a
            href={SITE.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Linktree Portfolio"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
