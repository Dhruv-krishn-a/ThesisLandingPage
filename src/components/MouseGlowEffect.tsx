'use client';
import { useEffect, useState } from 'react';

export default function MouseGlowEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(217,119,6,0.4) 0%, rgba(159,18,57,0.1) 60%, transparent 100%)',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          transition: 'left 0.2s cubic-bezier(0.25, 1, 0.5, 1), top 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />
    </div>
  );
}
