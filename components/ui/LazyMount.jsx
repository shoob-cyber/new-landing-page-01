'use client';

import React, { useState, useEffect, useRef, Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL/Canvas Component caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

export default function LazyMount({
  children,
  fallback = null,
  rootMargin = '100% 0px 100% 0px',
  className = '',
  style = {}
}) {
  const [inRange, setInRange] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isNear = entries[0].isIntersecting;
        setInRange(isNear);
      },
      {
        rootMargin,
        threshold: 0
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', ...style }}>
      <ErrorBoundary fallback={fallback}>
        {inRange ? children : fallback}
      </ErrorBoundary>
    </div>
  );
}
