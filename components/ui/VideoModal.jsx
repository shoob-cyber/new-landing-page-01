'use client';

import { useEffect, useRef, useCallback } from 'react';
import './VideoModal.css';

export default function VideoModal({
  isOpen,
  onClose,
  project,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  triggerRef
}) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        e.preventDefault();
        onPrev();
        return;
      }

      if (e.key === 'ArrowRight' && onNext && hasNext) {
        e.preventDefault();
        onNext();
        return;
      }

      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableEls = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableEls.length) return;

        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    },
    [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Focus first interactive element inside modal
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef?.current?.focus?.();
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown, triggerRef]);

  if (!isOpen || !project) return null;

  const isShort = project.isShort || (project.category === 'shorts');
  const isDirectMp4 = typeof project.video === 'string' && project.video.endsWith('.mp4');

  return (
    <div
      className="video-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title || 'Video Player'}
    >
      <div
        ref={modalRef}
        className="video-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header HUD */}
        <div className="video-modal-header">
          <div className="video-modal-chip">
            <span className="rec-dot" />
            <span>PLAYBACK // {project.year || '2025'} // {project.runtime || 'LIVE'}</span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="video-modal-close"
            onClick={onClose}
            aria-label="Close modal (Esc)"
          >
            &times;
          </button>
        </div>

        {/* Video Player */}
        <div className={`video-modal-player-wrap ${isShort ? 'aspect-shorts' : 'aspect-landscape'}`}>
          {isDirectMp4 ? (
            <video
              className="video-modal-video"
              controls
              autoPlay
              playsInline
              src={project.video}
            />
          ) : (
            <iframe
              className="video-modal-iframe"
              src={project.video}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        {/* Metadata Details */}
        <div className="video-modal-details">
          <div className="video-modal-title-row">
            <h3 className="video-modal-title">{project.title}</h3>
            {project.runtime && (
              <span className="video-modal-runtime">DURATION: {project.runtime}</span>
            )}
          </div>

          {project.description && (
            <p className="video-modal-desc">{project.description}</p>
          )}

          {project.tools && project.tools.length > 0 && (
            <div className="video-modal-tags">
              {project.tools.map((t, idx) => (
                <span key={idx} className="video-modal-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="video-modal-footer">
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="modal-nav-btn"
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="Previous project"
            >
              &larr; Prev
            </button>
            <button
              type="button"
              className="modal-nav-btn"
              onClick={onNext}
              disabled={!hasNext}
              aria-label="Next project"
            >
              Next &rarr;
            </button>
          </div>

          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-nav-btn modal-yt-btn"
            >
              Open on YouTube &#x2197;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
