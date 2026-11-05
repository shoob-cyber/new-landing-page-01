'use client';

import './StatementBandB.css';

export default function StatementBandB() {
  return (
    <aside
      data-tone="dark"
      className="statement-band-b"
      aria-label="Artistic Philosophy Statement"
    >
      <div className="statement-b-inner">
        {/* Editorial Eyebrow with Timeline Tracks */}
        <div className="statement-b-eyebrow" aria-hidden="true">
          <span className="track-pill">V1 // NARRATIVE</span>
          <span className="eyebrow-divider" />
          <span className="eyebrow-text">DIRECTOR&apos;S PHILOSOPHY</span>
          <span className="eyebrow-divider" />
          <span className="track-pill">A1 // SFX & RHYTHM</span>
        </div>

        {/* 1-Line Creative Combination of DM Sans Bold & Playfair Display */}
        <div className="statement-b-headline-wrap">
          <p className="statement-b-headline">
            <span className="word-playfair">Story</span>
            <span className="word-dmsans">FIRST.</span>
            <span className="word-separator">&bull;</span>
            <span className="word-playfair">Software</span>
            <span className="word-dmsans">SECOND.</span>
          </p>
        </div>

        {/* Audio Waveform Creative Graphic */}
        <div className="waveform-bar-graphic" aria-hidden="true">
          {[12, 28, 45, 18, 62, 85, 40, 70, 95, 50, 32, 78, 100, 65, 42, 88, 55, 30, 72, 90, 48, 22, 58, 35].map((h, i) => (
            <span
              key={i}
              className="waveform-bar"
              style={{
                height: `${h}%`,
                animationDelay: `${(i * 0.08).toFixed(2)}s`
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
