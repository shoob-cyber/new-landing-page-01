'use client';

import dynamic from 'next/dynamic';
import './SectionHeading.css';

const FoldText = dynamic(() => import('@/components/react-bits/FoldText'), { ssr: false });

export default function SectionHeading({
  chapter,
  label,
  title,
  sub,
  hoverRefold = false,
  refoldRadius = 140,
  className = ''
}) {
  const splitBy = (title || '').length <= 14 ? 'char' : 'word';

  return (
    <div className={`section-heading ${className}`}>
      {chapter && label && (
        <div className="section-chapter">
          <span className="section-chapter-dot" />
          <span>{chapter} // {label}</span>
        </div>
      )}

      <h2 className="section-title-wrap">
        <FoldText
          text={title}
          foldStyle="paper"
          hinge="top"
          trigger="scroll"
          duration={0.65}
          stagger={0.04}
          fontWeight={800}
          fontSize="clamp(2.8rem, 7.5vw, 6.2rem)"
          splitBy={splitBy}
          hoverRefold={hoverRefold}
          refoldRadius={refoldRadius}
          color="var(--hi-max)"
        />
      </h2>

      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}
