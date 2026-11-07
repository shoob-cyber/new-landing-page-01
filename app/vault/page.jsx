'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { PROJECTS, getFilteredProjects } from '@/lib/projects';
import { SITE } from '@/lib/site';
import VideoModal from '@/components/ui/VideoModal';
import GrainOverlay from '@/components/ui/GrainOverlay';
import '@/components/sections/Work.css';
import './vault.css';

const FILTERS = [
  { id: 'all', label: 'All Projects (22)' },
  { id: 'shorts', label: 'Shorts & Reels' },
  { id: 'ads', label: 'Commercials & Ads' },
  { id: 'long-form', label: 'Narrative & Showreel' }
];

export default function VaultPage() {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('pan'); // 'pan' or 'grid'
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef(null);

  const filteredItems = useMemo(() => {
    return getFilteredProjects(filter);
  }, [filter]);

  // Split into 2 rows for infinite panning rails
  const { row1, row2 } = useMemo(() => {
    const r1 = [];
    const r2 = [];
    filteredItems.forEach((item, idx) => {
      if (idx % 2 === 0) r1.push(item);
      else r2.push(item);
    });
    if (r2.length === 0 && r1.length > 0) r2.push(...r1);
    return { row1: r1, row2: r2 };
  }, [filteredItems]);

  const loopRow1 = useMemo(() => [...row1, ...row1, ...row1], [row1]);
  const loopRow2 = useMemo(() => [...row2, ...row2, ...row2], [row2]);

  const handleCardClick = useCallback((item, e = null) => {
    if (e && e.currentTarget) {
      triggerRef.current = e.currentTarget;
    }
    setSelectedProject(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const currentIdx = selectedProject ? PROJECTS.findIndex((p) => p.id === selectedProject.id) : 0;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < PROJECTS.length - 1;

  const handlePrev = useCallback(() => {
    if (currentIdx > 0) {
      setSelectedProject(PROJECTS[currentIdx - 1]);
    }
  }, [currentIdx]);

  const handleNext = useCallback(() => {
    if (currentIdx < PROJECTS.length - 1) {
      setSelectedProject(PROJECTS[currentIdx + 1]);
    }
  }, [currentIdx]);

  return (
    <div className="vault-page">
      <GrainOverlay />

      {/* Hidden Page Top Bar - Not in main navbar */}
      <header className="vault-header">
        <div className="vault-header-inner">
          <Link href="/#work" className="vault-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Portfolio</span>
          </Link>

          <div className="vault-header-title">
            <span className="vault-rec-dot" />
            <span>SHOBU // COMPLETE 22+ VIDEO ARCHIVE</span>
          </div>

          <Link href="/#contact" className="vault-contact-link">
            <span>Let&apos;s Work !</span>
          </Link>
        </div>
      </header>

      <main className="vault-content">
        {/* Vault Header Intro */}
        <div className="vault-hero">
          <div className="vault-pill">
            <span className="vault-pill-sparkle">✦</span>
            <span>UNRESTRICTED VAULT ACCESS</span>
          </div>
          <h1 className="vault-hero-title">The Complete Video Vault</h1>
          <p className="vault-hero-sub">
            Turning raw bulk footage into high-retention, top-performing reels and campaigns. Click any cut to launch full high-definition master playback.
          </p>
        </div>

        {/* Toolbar: Category Filters & View Toggle */}
        <div className="vault-toolbar">
          <div className="vault-filters" role="group" aria-label="Filter projects by category">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="vault-filter-chip"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="vault-view-toggle">
            <button
              type="button"
              className={`vault-mode-btn ${viewMode === 'pan' ? 'active' : ''}`}
              onClick={() => setViewMode('pan')}
              aria-label="Pan Reel view"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="10" rx="2" />
                <path d="M12 7v10M7 7v10M17 7v10" />
              </svg>
              <span>Pan Reel</span>
            </button>

            <button
              type="button"
              className={`vault-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Full Grid view"
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

        {/* VIEW 1: Continuous Smooth Panning Rails */}
        {viewMode === 'pan' && (
          <div className="work-pan-showcase" aria-label="Continuous video cards pan">
            <div className="pan-hint">
              <span className="pan-hint-dot" />
              <span>Hover any card to pause &bull; Click to play in high definition</span>
            </div>

            {/* Rail 1 */}
            <div className="pan-rail-track track-reverse">
              <div className="pan-rail-inner">
                {loopRow1.map((item, idx) => (
                  <div
                    key={`v-r1-${item.id}-${idx}`}
                    className="pan-video-card"
                    onClick={(e) => handleCardClick(item, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleCardClick(item, e);
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

            {/* Rail 2 */}
            <div className="pan-rail-track track-forward">
              <div className="pan-rail-inner">
                {loopRow2.map((item, idx) => (
                  <div
                    key={`v-r2-${item.id}-${idx}`}
                    className="pan-video-card"
                    onClick={(e) => handleCardClick(item, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleCardClick(item, e);
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
                key={`v-grid-${item.id}`}
                role="listitem"
                className="grid-video-card"
                onClick={(e) => handleCardClick(item, e)}
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

        {/* Bottom Callout */}
        <div className="vault-bottom-cta">
          <h3 className="vault-cta-heading">Ready to craft your next commercial campaign?</h3>
          <p className="vault-cta-sub">
            Let&apos;s engineer retention-driven cuts, pristine sound architecture, and film-grade color for your brand.
          </p>
          <Link href="/#contact" className="vault-cta-btn">
            <span>Let&apos;s Work !</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>
      </main>

      {/* Video Modal in Vault */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
        triggerRef={triggerRef}
      />
    </div>
  );
}
