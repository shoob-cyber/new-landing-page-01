'use client';

import { useEffect, useRef } from 'react';
import './TimelineBar.css';

const SECTIONS = [
  { id: 'home', label: '00', pct: 0 },
  { id: 'work', label: '01', pct: 16 },
  { id: 'services', label: '02', pct: 35 },
  { id: 'process', label: '03', pct: 54 },
  { id: 'about', label: '04', pct: 70 },
  { id: 'contact', label: '06', pct: 90 }
];

export default function TimelineBar() {
  const lineRef = useRef(null);
  const thumbRef = useRef(null);
  const timecodeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      const pct = (progress * 100).toFixed(2);

      if (lineRef.current) lineRef.current.style.width = `${pct}%`;
      if (thumbRef.current) thumbRef.current.style.left = `${pct}%`;

      if (timecodeRef.current) {
        // 2:00 runtime = 120 seconds * 24fps = 2880 frames
        const totalFrames = Math.floor(progress * 2880);
        const mm = String(Math.floor(totalFrames / (24 * 60))).padStart(2, '0');
        const ss = String(Math.floor((totalFrames % (24 * 60)) / 24)).padStart(2, '0');
        const ff = String(totalFrames % 24).padStart(2, '0');
        timecodeRef.current.textContent = `00:${mm}:${ss}:${ff}`;
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleTrackClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(clickX / rect.width, 1));
    const targetY = ratio * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const jumpTo = (e, id) => {
    e.stopPropagation();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="timeline-bar" aria-label="Page scroll timeline">
      <div className="timeline-track-wrap" onClick={handleTrackClick}>
        <div className="timeline-track">
          <div ref={lineRef} className="timeline-playhead-line" />
          <div ref={thumbRef} className="timeline-playhead-thumb" />
        </div>

        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className="timeline-tick"
            style={{ left: `${s.pct}%` }}
            title={`Jump to ${s.id}`}
            aria-label={`Jump to ${s.id}`}
            onClick={(e) => jumpTo(e, s.id)}
          />
        ))}
      </div>

      <div ref={timecodeRef} className="timeline-timecode" aria-hidden="true">
        00:00:00:00
      </div>
    </aside>
  );
}
