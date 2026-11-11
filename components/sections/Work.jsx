'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PROJECTS } from '@/lib/projects';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SectionHeading from '@/components/ui/SectionHeading';
import './Work.css';

const BounceCards = dynamic(() => import('@/components/react-bits/BounceCards'), { ssr: false });

export default function Work({ onSelectProject }) {
  const triggerRef = useRef(null);
  const exploreBtnRef = useRef(null);
  const [isBtnGlowing, setIsBtnGlowing] = useState(false);

  useEffect(() => {
    if (!exploreBtnRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBtnGlowing(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    observer.observe(exploreBtnRef.current);
    return () => observer.disconnect();
  }, []);

  const { matches: isMobile } = useMediaQuery('(max-width: 767px)');
  const { matches: isTablet } = useMediaQuery('(max-width: 1024px)');

  // Featured 9 diverse, top-tier projects for the interactive BounceCards deck
  const bounceProjects = useMemo(() => {
    const picks = [
      'solid-design',
      'taakh-product',
      'overld-brand',
      'eery-drinks',
      'personal-instagram-edits',
      'charli-m-bakes',
      'shraddha-designs',
      'palash-resort',
      'allied-events-1'
    ];
    return picks
      .map(id => PROJECTS.find(p => p.id === id))
      .filter(Boolean);
  }, []);

  const bounceImages = useMemo(() => {
    return bounceProjects.map(p => ({
      src: p.image || `https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg`,
      alt: p.title
    }));
  }, [bounceProjects]);

  const handleCardClick = (project) => {
    if (project && onSelectProject) onSelectProject(project, triggerRef);
  };

  return (
    <section
      id="work"
      data-tone="dark"
      className="work-section"
      aria-label="Selected Work Portfolio"
    >
      <div className="work-container">
        <SectionHeading
          chapter="01"
          label="PORTFOLIO"
          title="Selected Work"
          sub="Turning raw bulk footage into high-retention, top-performing reels that convert and scale on socials."
        />

        {/* Interactive Feature Deck: BounceCards */}
        <div className="work-bounce-deck">
          <div className="bounce-deck-header">
            <span className="deck-tag">INTERACTIVE SHOWCASE</span>
            <h3 className="deck-title">Signature Cuts &amp; Brand Reels</h3>
            <p className="deck-sub">Hover to spread the deck &bull; Click any card to launch playback</p>
          </div>

          <div className="bounce-cards-wrapper">
            <BounceCards
              images={bounceImages}
              containerWidth={isMobile ? 330 : isTablet ? 560 : 760}
              containerHeight={isMobile ? 240 : isTablet ? 300 : 340}
              cardSize={isMobile ? 120 : isTablet ? 165 : 210}
              spread={isMobile ? 26 : isTablet ? 48 : 68}
              rotation={10}
              arc={0}
              pushDistance={isMobile ? 80 : isTablet ? 120 : 150}
              hoverScale={1.08}
              bounciness={0.65}
              animationDelay={0.3}
              animationStagger={0.05}
              borderWidth={3}
              borderColor="#F3EFE6"
              radius={16}
              shadow
              enableHover
              onCardClick={(index) => {
                const picked = bounceProjects[index];
                if (picked) handleCardClick(picked);
              }}
            />
          </div>

          {/* Creative Scroll-Reactive Vault Button - Bottom Right */}
          <div className="bounce-deck-cta-row">
            <Link
              href="/vault"
              ref={exploreBtnRef}
              className={`explore-vault-btn ${isBtnGlowing ? 'glow-active' : ''}`}
              aria-label="Wanna explore more? Open the full video vault"
            >
              <div className="explore-btn-content">
                <span className="explore-sparkle" aria-hidden="true">✦</span>
                <span className="explore-heading">Wanna explore more?</span>
                <span className="explore-badge">Vault // {PROJECTS.length} Edits</span>
              </div>
              <span className="explore-arrow-wrap" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
