'use client';

import { useState, useEffect, useRef } from 'react';
import './GradeCompare.css';

export default function GradeCompare({ before, after, initialPos = 55 }) {
  const [pos, setPos] = useState(initialPos);
  const containerRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || animatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReduced) {
            setPos(55);
            return;
          }

          // Auto-sweep once from 0 to 100 and settle at 55
          const startTime = performance.now();
          const duration = 1400; // ms

          const sweep = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Sine wave pattern: 0 -> 100 -> 55
            let currentVal;
            if (progress < 0.5) {
              // 0 to 100 in first half
              const p = progress / 0.5;
              currentVal = p * 100;
            } else {
              // 100 to 55 in second half
              const p = (progress - 0.5) / 0.5;
              currentVal = 100 - p * 45;
            }

            setPos(currentVal);

            if (progress < 1) {
              requestAnimationFrame(sweep);
            } else {
              setPos(55);
            }
          };

          requestAnimationFrame(sweep);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setPos(Number(e.target.value));
  };

  const renderContent = (isAfter = false) => {
    const src = isAfter ? after || before : before;
    if (src) {
      return (
        <img
          src={src}
          alt={isAfter ? 'Graded color view' : 'Raw log color view'}
          className="grade-frame-content"
          loading="lazy"
        />
      );
    }

    return (
      <div className="grade-mock-scene">
        <div className="grade-mock-sky" />
        <div className="grade-mock-sun" />
        <div className="grade-mock-mountain" />
        <div className="grade-mock-mountain-2" />
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="grade-compare"
      style={{ '--p': `${pos}%` }}
    >
      {/* RAW bottom layer */}
      <div className="grade-layer raw" aria-hidden="true">
        {renderContent(false)}
      </div>

      {/* GRADED top layer (clipped) */}
      <div className="grade-layer graded" aria-hidden="true">
        {renderContent(true)}
      </div>

      {/* Text badges */}
      <div className="grade-chip raw">RAW (LOG)</div>
      <div className="grade-chip graded">GRADED</div>

      {/* Draggable Divider */}
      <div className="grade-divider-line" aria-hidden="true">
        <div className="grade-divider-handle">
          <svg viewBox="0 0 24 24">
            <path d="M8 7l-5 5 5 5V7zm8 0v10l5-5-5-5z" />
          </svg>
        </div>
      </div>

      {/* Native Range Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={handleChange}
        className="grade-slider-input"
        aria-label="Reveal color grade"
      />
    </div>
  );
}
