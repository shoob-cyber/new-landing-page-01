'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PROJECTS } from '@/lib/projects';
import { SITE } from '@/lib/site';

import Hero from '@/components/sections/Hero';
import StatementBandA from '@/components/sections/StatementBandA';
import Work from '@/components/sections/Work';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import StatementBandB from '@/components/sections/StatementBandB';
import About from '@/components/sections/About';
import Proof from '@/components/sections/Proof';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

import VideoModal from '@/components/ui/VideoModal';
import SiteNav from '@/components/ui/SiteNav';
import TimelineBar from '@/components/ui/TimelineBar';
import GrainOverlay from '@/components/ui/GrainOverlay';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef(null);

  // Refresh GSAP ScrollTrigger after fonts ready
  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  }, []);

  const handleOpenProject = useCallback((project, ref = null) => {
    if (ref) triggerRef.current = ref.current;
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleOpenShowreel = useCallback(() => {
    // Showreel project or custom showreel video
    const showreelProj = PROJECTS.find((p) => p.id === 'personal-instagram-edits') || {
      id: 'showreel',
      title: `${SITE.brandName} Showreel 2025`,
      category: 'long-form',
      year: '2025',
      runtime: '2:15',
      tools: ['DaVinci Resolve', 'Premiere Pro', 'Sound Design'],
      description: 'A master cut of creative commercial, fashion, architectural, and high-retention social edits.',
      video: SITE.showreelUrl,
      youtubeUrl: SITE.showreelRaw,
      isShort: false
    };
    setSelectedProject(showreelProj);
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
    <>
      {/* Global Grain Texture Overlay */}
      <GrainOverlay />

      {/* Floating Top Navigation with GooeyNav, Monogram, and Hire Me CTA */}
      <SiteNav />

      {/* Main Landing Sections */}
      <main className="site-main" id="main-content">
        {/* 00: Hero (#home, ink-950) */}
        <Hero onOpenShowreel={handleOpenShowreel} />

        {/* Statement A (Light Band: Periwinkle) */}
        <StatementBandA />

        {/* 01: Selected Work (#work, ink-950) */}
        <Work onSelectProject={handleOpenProject} />

        <div className="ruler-divider" aria-hidden="true" />

        {/* 02: Services (#services, ink-900) */}
        <Services />

        <div className="ruler-divider" aria-hidden="true" />

        {/* 03: Process (#process, ink-950) */}
        <Process />

        {/* Statement B (ink-800) */}
        <StatementBandB />

        {/* 04: About (#about, ink-900) */}
        <About />

        <div className="ruler-divider" aria-hidden="true" />

        {/* 05: Proof (#proof, ink-950) */}
        <Proof />

        <div className="ruler-divider" aria-hidden="true" />

        {/* 06: Contact (#contact, ink-950) */}
        <Contact />

        {/* Footer (ink-900) */}
        <Footer />
      </main>

      {/* Interactive Video Modal */}
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

      {/* Scroll-driven Timeline Bar with 24fps Timecode */}
      <TimelineBar />
    </>
  );
}
