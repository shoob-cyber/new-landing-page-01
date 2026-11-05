'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollSpy(ids = ['home', 'work', 'services', 'process', 'about', 'contact']) {
  const [activeId, setActiveId] = useState(ids[0] || 'home');
  const lockedRef = useRef(false);
  const unlockTimerRef = useRef(null);

  const lockSpy = useCallback((durationMs = 1200) => {
    lockedRef.current = true;
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

    const unlock = () => {
      lockedRef.current = false;
      window.removeEventListener('scrollend', onScrollEnd);
    };

    const onScrollEnd = () => {
      unlock();
    };

    window.addEventListener('scrollend', onScrollEnd, { once: true });
    unlockTimerRef.current = setTimeout(unlock, durationMs);
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    lockSpy(1200);
    setActiveId(id);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }, [lockSpy]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockedRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -54% 0px',
        threshold: 0
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, [ids]);

  const activeIndex = Math.max(0, ids.indexOf(activeId));

  return { activeId, activeIndex, scrollToSection, lockSpy };
}

export default useScrollSpy;
