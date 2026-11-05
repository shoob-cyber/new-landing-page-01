'use client';

import { useState, useEffect } from 'react';

export function useSectionTone() {
  const [tone, setTone] = useState('dark');

  useEffect(() => {
    const sections = document.querySelectorAll('[data-tone]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentTone = entry.target.getAttribute('data-tone') || 'dark';
            setTone(currentTone);
            document.documentElement.setAttribute('data-tone', currentTone);
          }
        });
      },
      {
        rootMargin: '-45% 0px -54% 0px',
        threshold: 0
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  return tone;
}

export default useSectionTone;
