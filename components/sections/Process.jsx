'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/ui/SectionHeading';
import { SITE } from '@/lib/site';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const CLIPS_CONFIG = [
  { step: '01', track: 'V1', left: 2, width: 20, time: 'Day 0', title: 'Brief & References', desc: 'Narrative targets, visual references, and pacing benchmarks.' },
  { step: '02', track: 'V2', left: 21, width: 20, time: 'Day 1', timeEnd: 41, title: 'Assembly & Selects', desc: 'Multicam sync, sound sync, and pulling the strongest story takes.' },
  { step: '03', track: 'A1', left: 40, width: 22, time: 'Days 2–3', timeEnd: 62, title: 'Rough Cut & Rhythm', desc: 'Sculpting pacing, tension, narrative rhythm, and initial draft.' },
  { step: '04', track: 'V1', left: 61, width: 20, time: 'Days 4–5', timeEnd: 81, title: 'Fine Cut, Sound & Grade', desc: 'DaVinci color science, Foley SFX, motion graphics, and audio mastering.' },
  { step: '05', track: 'A1', left: 80, width: 18, time: 'Day 6', timeEnd: 98, title: 'Review & Delivery', desc: 'Client review notes incorporated, master ProRes / 4K multi-platform export.' }
];

export default function Process() {
  const containerRef = useRef(null);
  const playheadRef = useRef(null);
  const mobilePlayheadRef = useRef(null);
  const [passedSteps, setPassedSteps] = useState([true, false, false, false, false]);

  useEffect(() => {
    const el = containerRef.current;
    const playhead = playheadRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPassedSteps([true, true, true, true, true]);
      if (playhead) playhead.style.left = '100%';
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress; // 0 to 1
          const pct = p * 100;

          if (playhead) {
            playhead.style.left = `${pct}%`;
          }

          if (mobilePlayheadRef.current) {
            mobilePlayheadRef.current.style.height = `${pct}%`;
          }

          // Check which clips are passed
          const newPassed = CLIPS_CONFIG.map((c) => pct >= c.left);
          setPassedSteps(newPassed);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      data-tone="dark"
      className="process-section"
      aria-label="Editing Process and Workflow"
    >
      <div className="process-container">
        <SectionHeading
          chapter="03"
          label="PROCESS"
          title="How We Work"
          sub="An NLE timeline view of how raw footage progresses from initial ingestion to final color grade and master delivery."
        />

        {/* NLE Desktop Timeline */}
        <div className="nle-timeline-wrap" aria-label="NLE Timeline Interface">
          <div className="nle-ruler" aria-hidden="true">
            <span className="nle-ruler-time">00:00:00:00</span>
            <span className="nle-ruler-time">00:01:00:00</span>
            <span className="nle-ruler-time">00:02:00:00</span>
            <span className="nle-ruler-time">00:03:00:00</span>
            <span className="nle-ruler-time">00:04:00:00</span>
            <span className="nle-ruler-time">00:05:00:00</span>
            <span className="nle-ruler-time">00:06:00:00</span>
          </div>

          <div className="nle-tracks">
            {/* Scrubbing Playhead */}
            <div ref={playheadRef} className="nle-playhead" aria-hidden="true">
              <div className="nle-playhead-cap" />
            </div>

            {/* Track V1 */}
            <div className="nle-track-row">
              <span className="nle-track-label">V1</span>
              <div className="nle-track-lane">
                {/* Clip 01 */}
                <div
                  className={`nle-clip ${passedSteps[0] ? 'passed' : ''}`}
                  style={{ left: `${CLIPS_CONFIG[0].left}%`, width: `${CLIPS_CONFIG[0].width}%` }}
                >
                  <div className="nle-clip-header">
                    <span className="nle-clip-step">01 // {CLIPS_CONFIG[0].time}</span>
                  </div>
                  <h4 className="nle-clip-title">{CLIPS_CONFIG[0].title}</h4>
                  <p className="nle-clip-desc">{CLIPS_CONFIG[0].desc}</p>
                </div>

                {/* Clip 04 */}
                <div
                  className={`nle-clip ${passedSteps[3] ? 'passed' : ''}`}
                  style={{ left: `${CLIPS_CONFIG[3].left}%`, width: `${CLIPS_CONFIG[3].width}%` }}
                >
                  <div className="nle-clip-header">
                    <span className="nle-clip-step">04 // {CLIPS_CONFIG[3].time}</span>
                  </div>
                  <h4 className="nle-clip-title">{CLIPS_CONFIG[3].title}</h4>
                  <p className="nle-clip-desc">{CLIPS_CONFIG[3].desc}</p>
                </div>
              </div>
            </div>

            {/* Track V2 */}
            <div className="nle-track-row">
              <span className="nle-track-label">V2</span>
              <div className="nle-track-lane">
                {/* Clip 02 */}
                <div
                  className={`nle-clip ${passedSteps[1] ? 'passed' : ''}`}
                  style={{ left: `${CLIPS_CONFIG[1].left}%`, width: `${CLIPS_CONFIG[1].width}%` }}
                >
                  <div className="nle-clip-header">
                    <span className="nle-clip-step">02 // {CLIPS_CONFIG[1].time}</span>
                  </div>
                  <h4 className="nle-clip-title">{CLIPS_CONFIG[1].title}</h4>
                  <p className="nle-clip-desc">{CLIPS_CONFIG[1].desc}</p>
                </div>
              </div>
            </div>

            {/* Track A1 */}
            <div className="nle-track-row">
              <span className="nle-track-label">A1</span>
              <div className="nle-track-lane">
                {/* Clip 03 */}
                <div
                  className={`nle-clip ${passedSteps[2] ? 'passed' : ''}`}
                  style={{ left: `${CLIPS_CONFIG[2].left}%`, width: `${CLIPS_CONFIG[2].width}%` }}
                >
                  <div className="nle-clip-header">
                    <span className="nle-clip-step">03 // {CLIPS_CONFIG[2].time}</span>
                  </div>
                  <h4 className="nle-clip-title">{CLIPS_CONFIG[2].title}</h4>
                  <p className="nle-clip-desc">{CLIPS_CONFIG[2].desc}</p>
                </div>

                {/* Clip 05 */}
                <div
                  className={`nle-clip ${passedSteps[4] ? 'passed' : ''}`}
                  style={{ left: `${CLIPS_CONFIG[4].left}%`, width: `${CLIPS_CONFIG[4].width}%` }}
                >
                  <div className="nle-clip-header">
                    <span className="nle-clip-step">05 // {CLIPS_CONFIG[4].time}</span>
                  </div>
                  <h4 className="nle-clip-title">{CLIPS_CONFIG[4].title}</h4>
                  <p className="nle-clip-desc">{CLIPS_CONFIG[4].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stepper for < 768px */}
        <div className="process-mobile-stepper" aria-label="Process Steps">
          <div className="process-mobile-track" aria-hidden="true" />
          <div ref={mobilePlayheadRef} className="process-mobile-playhead" aria-hidden="true" />

          {CLIPS_CONFIG.map((c, i) => (
            <div key={c.step} className={`process-mobile-step ${passedSteps[i] ? 'passed' : ''}`}>
              <div className="process-mobile-node">{c.step}</div>
              <div className="process-mobile-card">
                <span className="nle-clip-step">{c.time}</span>
                <h4 className="nle-clip-title" style={{ margin: '6px 0 8px' }}>{c.title}</h4>
                <p className="nle-clip-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
