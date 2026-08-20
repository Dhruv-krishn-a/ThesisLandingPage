'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Small timeout ensures the observer doesn't block main thread during hydration
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const totalSteps = 60;
          const stepTime = duration / totalSteps;
          const increment = end / totalSteps;
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      }, { threshold: 0.1 });
      
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [end, hasAnimated, duration]);

  return <div ref={ref} className="will-change-contents">{hasAnimated ? count.toLocaleString() : 0}{suffix}</div>;
}
