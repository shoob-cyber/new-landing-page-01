'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { SITE } from '@/lib/site';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import LazyMount from '@/components/ui/LazyMount';
import './Hero.css';

const GhostFibers = dynamic(() => import('@/components/react-bits/GhostFibers'), { ssr: false });
const TechText = dynamic(() => import('@/components/react-bits/TechText'), { ssr: false });

export default function Hero({ onOpenShowreel }) {
  const timecodeRef = useRef(null);
  const heroRef = useRef(null);
  const { matches: isMobile } = useMediaQuery('(max-width: 767px)');

  // 24fps live timecode HUD while hero is visible
  useEffect(() => {
    let frameId;
    let frameCount = 0;
    let lastTime = performance.now();
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });

    if (heroRef.current) observer.observe(heroRef.current);

    const interval = 1000 / 24; // 24fps

    const tick = (now) => {
      if (isVisible && now - lastTime >= interval) {
        lastTime = now;
        frameCount = (frameCount + 1) % (24 * 60 * 60);

        const totalSeconds = Math.floor(frameCount / 24);
        const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const ss = String(totalSeconds % 60).padStart(2, '0');
        const ff = String(frameCount % 24).padStart(2, '0');

        if (timecodeRef.current) {
          timecodeRef.current.textContent = `REC [${hh}:${mm}:${ss}:${ff}]`;
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      data-tone="dark"
      className="hero-section"
      aria-label="Introduction and Showreel"
    >
      {/* Visually hidden h1 for accessibility and SEO */}
      <h1 className="sr-only">
        {SITE.brandName} &mdash; {SITE.role}
      </h1>

      {/* Fallback gradient */}
      <div className="hero-gradient-fallback" aria-hidden="true" />

      {/* WebGL GhostFibers background */}
      <div className="hero-bg-layer" aria-hidden="true">
        <LazyMount
          style={{ width: '100%', height: '100%' }}
          fallback={<div className="hero-gradient-fallback" />}
        >
          {isMobile ? (
            <GhostFibers
              glowColor="#F3EFE6"
              secondaryColor="#C5A880"
              lineColor="#D9D2C3"
              gradient="depth"
              layers={1}
              threads={36}
              dpr={1.25}
              mouseInteraction={false}
              particles={0.25}
              density={0.8}
              sparkle={0.3}
              glow={0.7}
              brightness={0.9}
              vignette={0.4}
              grain={0.06}
            />
          ) : (
            <GhostFibers
              glowColor="#F3EFE6"
              secondaryColor="#C5A880"
              lineColor="#D9D2C3"
              gradient="depth"
              layers={2}
              threads={56}
              density={0.85}
              fiberStyle="dots"
              twist={1.2}
              waves={1}
              volume={0.7}
              depthOfField={0.85}
              hoverEffect="focus"
              particles={0.4}
              sparkle={0.4}
              glow={0.8}
              brightness={0.95}
              vignette={0.35}
              grain={0.07}
            />
          )}
        </LazyMount>
      </div>

      <div className="hero-bottom-fade" aria-hidden="true" />

      {/* Main hero content */}
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          <span>{SITE.hero.eyebrow}</span>
        </div>

        {/* TechText canvas wordmark */}
        <div className="hero-wordmark-wrap">
          <TechText
            text={SITE.brandName}
            fontWeight={700}
            fontSize={280}
            letterSpacing={-0.05}
            color="#FAF8F5"
            accentColor="#F3EFE6"
            reveal="letter"
            intro="metrics"
            introDuration={2.4}
            specks={14}
            selection
            labels
            draggable
            clickKick
            sweep
            guides={false}
          />
        </div>

        <p className="hero-tagline">{SITE.hero.tagline}</p>

        <div className="hero-cta-row">
          <button
            type="button"
            className="btn-primary"
            onClick={onOpenShowreel}
            aria-label="Watch Showreel Video"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>{SITE.hero.primaryCta}</span>
          </button>

          <a
            href="#contact"
            onClick={scrollToContact}
            className="btn-secondary"
          >
            <span>{SITE.hero.secondaryCta}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="hero-hud" aria-hidden="true">
        <div ref={timecodeRef} className="hero-hud-timecode">
          REC [00:00:00:00]
        </div>
        <div className="hero-hud-scroll">
          <span>SCROLL</span>
          <span className="hero-hud-line" />
        </div>
      </div>
    </section>
  );
}
