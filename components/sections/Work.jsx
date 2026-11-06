'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PROJECTS, getFilteredProjects } from '@/lib/projects';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SectionHeading from '@/components/ui/SectionHeading';
import './Work.css';

const BounceCards = dynamic(() => import('@/components/react-bits/BounceCards'), { ssr: false });

const FILTERS = [
  { id: 'all', label: 'All Projects (22)' },
  { id: 'shorts', label: 'Shorts & Reels' },
  { id: 'ads', label: 'Commercials & Ads' },
  { id: 'long-form', label: 'Narrative & Showreel' }
];

export default function Work({ onSelectProject }) {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('pan'); // 'pan' or 'grid'
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

  const filteredItems = useMemo(() => {
    return getFilteredProjects(filter);
  }, [filter]);

  // Featured 5 projects for BounceCards interactive fan
  const bounceProjects = useMemo(() => {
    const picks = [
      'solid-design',
      'taakh-product',
      'overld-brand',
      'eery-drinks',
      'personal-instagram-edits'
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
    if (project) onSelectProject(project, triggerRef);
  };

  // Split projects into two continuous pan rows for rich variety
  const half = Math.ceil(filteredItems.length / 2);
  const row1 = filteredItems.slice(0, half);
  const row2 = filteredItems.slice(half);

  // Duplicate for seamless infinite loop
  const loopRow1 = [...row1, ...row1, ...row1];
  const loopRow2 = [...row2, ...row2, ...row2];

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
          sub="Explore 22 commercial films, retention-engineered vertical edits, and narrative campaigns."
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
              containerWidth={isMobile ? 320 : isTablet ? 480 : 640}
              containerHeight={isMobile ? 220 : 320}
              cardSize={isMobile ? 140 : isTablet ? 180 : 220}
              spread={isMobile ? 55 : isTablet ? 80 : 100}
              rotation={10}
              arc={0}
              pushDistance={isMobile ? 110 : 160}
              hoverScale={1.08}
              bounciness={0.65}
              animationDelay={0.3}
              animationStagger={0.06}
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
                <span className="explore-badge">Vault // 22+ Edits</span>
              </div>
              <span className="explore-arrow-wrap" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Toolbar: Category Filter Chips & View Mode Toggle */}
        <div className="work-toolbar">
          <div className="work-filters" role="group" aria-label="Filter projects by category">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="filter-chip"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="view-mode-toggle">
            <button
              type="button"
              className={`mode-btn ${viewMode === 'pan' ? 'active' : ''}`}
              onClick={() => setViewMode('pan')}
              aria-label="Smooth pan rail view"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="10" rx="2" />
                <path d="M12 7v10M7 7v10M17 7v10" />
              </svg>
              <span>Pan Reel</span>
            </button>

            <button
              type="button"
              className={`mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Complete grid view"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Full Grid ({filteredItems.length})</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: Smooth Left-to-Right Continuous Panning Rails */}
        {viewMode === 'pan' && (
          <div className="work-pan-showcase" aria-label="Continuous video cards pan">
            <div className="pan-hint">
              <span className="pan-hint-dot" />
              <span>Hover any card to pause &bull; Click to play in high definition</span>
            </div>

            {/* Rail 1: Panning Left to Right */}
            <div className="pan-rail-track track-reverse">
              <div className="pan-rail-inner">
                {loopRow1.map((item, idx) => (
                  <div
                    key={`r1-${item.id}-${idx}`}
                    className="pan-video-card"
                    onClick={() => handleCardClick(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleCardClick(item);
                    }}
                    aria-label={`Play ${item.title}`}
                  >
                    <div className="pan-thumb-wrapper">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="pan-thumb-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`;
                        }}
                      />
                      <div className="pan-card-badge">{item.badge || 'VIDEO'}</div>
                      <div className="pan-card-time">{item.runtime}</div>

                      {/* Play Button Overlay on Hover */}
                      <div className="pan-play-overlay">
                        <div className="pan-play-circle">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                        <span className="pan-play-label">WATCH CUT</span>
                      </div>
                    </div>

                    <div className="pan-card-info">
                      <h4 className="pan-card-title">{item.title}</h4>
                      <p className="pan-card-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rail 2: Panning Right to Left */}
            <div className="pan-rail-track track-forward">
              <div className="pan-rail-inner">
                {loopRow2.map((item, idx) => (
                  <div
                    key={`r2-${item.id}-${idx}`}
                    className="pan-video-card"
                    onClick={() => handleCardClick(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleCardClick(item);
                    }}
                    aria-label={`Play ${item.title}`}
                  >
                    <div className="pan-thumb-wrapper">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="pan-thumb-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`;
                        }}
                      />
                      <div className="pan-card-badge">{item.badge || 'REEL'}</div>
                      <div className="pan-card-time">{item.runtime}</div>

                      {/* Play Button Overlay on Hover */}
                      <div className="pan-play-overlay">
                        <div className="pan-play-circle">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                        <span className="pan-play-label">WATCH CUT</span>
                      </div>
                    </div>

                    <div className="pan-card-info">
                      <h4 className="pan-card-title">{item.title}</h4>
                      <p className="pan-card-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Complete Variety Grid */}
        {viewMode === 'grid' && (
          <div className="work-full-grid" role="list">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                role="listitem"
                className="grid-video-card"
                onClick={() => handleCardClick(item)}
              >
                <div className="grid-thumb-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="grid-thumb-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`;
                    }}
                  />
                  <div className="pan-card-badge">{item.badge || 'PROJECT'}</div>
                  <div className="pan-card-time">{item.runtime}</div>

                  <div className="grid-play-overlay">
                    <div className="pan-play-circle">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <span className="pan-play-label">PLAY REEL</span>
                  </div>
                </div>

                <div className="grid-card-info">
                  <div className="grid-meta-row">
                    <span className="grid-cat">{item.category.toUpperCase()}</span>
                    <span>&bull;</span>
                    <span className="grid-year">{item.year}</span>
                  </div>
                  <h4 className="grid-card-title">{item.title}</h4>
                  <p className="grid-card-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
