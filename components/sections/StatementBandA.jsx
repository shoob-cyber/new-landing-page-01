'use client';

import dynamic from 'next/dynamic';
import './StatementBandA.css';

const ScrollFloat = dynamic(() => import('@/components/react-bits/ScrollFloat'), { ssr: false });

export default function StatementBandA() {
  return (
    <aside
      data-tone="light"
      className="statement-band-a"
      aria-label="Editorial Film Statement"
    >
      {/* 35mm Film Sprocket Perforation - Top */}
      <div className="film-sprockets top" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={`top-${i}`} className="sprocket-hole" />
        ))}
      </div>

      <div className="statement-container">
        {/* Premiere Pro Tool Elements Bar */}
        <div className="premiere-toolbar" aria-hidden="true">
          <div className="tool-chip active">
            {/* Razor Tool (C) */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M4 4l16 16M4 8l12 12M8 4l12 12" />
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            <span>RAZOR [C]</span>
          </div>

          <div className="tool-divider" />

          <div className="tool-chip desktop-only">
            {/* Selection Tool (V) */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="3 3 10 21 14 14 21 10 3 3" />
            </svg>
            <span>SELECT [V]</span>
          </div>

          <div className="tool-divider desktop-only" />

          <div className="tool-chip desktop-only">
            {/* Ripple Edit (B) */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 6v12M17 6v12M11 9l-4 3 4 3M13 9l4 3-4 3" />
            </svg>
            <span>RIPPLE [B]</span>
          </div>

          <div className="tool-divider desktop-only" />

          <div className="tool-meta">
            <span className="rec-dot" />
            <span className="mono-timecode">00:01:24:18</span>
            <span className="badge-fps">24 FPS</span>
          </div>
        </div>

        {/* Guaranteed 1-Line Statement across Mobile and Desktop */}
        <div className="statement-single-line">
          <ScrollFloat
            as="h2"
            effect="float"
            splitBy="chars"
            fromColor="#8E8A82"
            containerClassName="statement-scroll-float"
            textClassName="statement-text-a"
          >
            EVERY CUT HAS A REASON.
          </ScrollFloat>
        </div>

        {/* Film metadata sub-strip */}
        <div className="film-meta-sub" aria-hidden="true">
          <span>SCENE 01</span>
          <span>&bull;</span>
          <span>TAKE 03</span>
          <span>&bull;</span>
          <span>SHOBU // 4K DCI</span>
        </div>
      </div>

      {/* 35mm Film Sprocket Perforation - Bottom */}
      <div className="film-sprockets bottom" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={`bot-${i}`} className="sprocket-hole" />
        ))}
      </div>
    </aside>
  );
}
