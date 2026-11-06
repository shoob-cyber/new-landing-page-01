'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SITE } from '@/lib/site';
import './SiteNav.css';

const GooeyNav = dynamic(() => import('@/components/react-bits/GooeyNav'), { ssr: false });

const NAV_IDS = ['home', 'work', 'services', 'process', 'about', 'contact'];

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export default function SiteNav() {
  const { activeIndex, scrollToSection } = useScrollSpy(NAV_IDS);
  const { matches: isMobile, mounted } = useMediaQuery('(max-width: 768px)');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    scrollToSection('contact');
  };

  const scrollToHome = (e) => {
    e.preventDefault();
    scrollToSection('home');
  };

  if (!mounted) return null;

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header-inner">
        {/* Brand Monogram */}
        <a
          href="#home"
          onClick={scrollToHome}
          className="header-monogram-pill"
          aria-label={`Back to top, ${SITE.brandName}`}
        >
          <span className="monogram-text">{SITE.monogram}</span>
          <span className="monogram-dot" />
        </a>

        {/* GooeyNav Centerpiece */}
        <div className="header-nav-center">
          <GooeyNav
            items={NAV_ITEMS}
            activeIndex={activeIndex >= 0 ? activeIndex : 0}
            initialActiveIndex={0}
            theme="dark"
            size={isMobile ? 'sm' : 'md'}
            frame={true}
            particleCount={15}
            spread={56}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.5}
            hoverEffect={true}
            color="#F3EFE6"
            activeTextColor="#0B0C0C"
            colors={['#F3EFE6', '#D9D2C3', '#C5A880']}
            onChange={(index) => {
              if (NAV_IDS[index]) {
                scrollToSection(NAV_IDS[index]);
              }
            }}
          />
        </div>

        {/* Let's Work CTA */}
        <div className="header-action-right">
          <a
            href="#contact"
            onClick={scrollToContact}
            className="header-hire-btn"
            aria-label="Jump to contact section"
          >
            <span>Let&apos;s Work !</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
