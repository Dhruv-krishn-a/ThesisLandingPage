'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function MouseGlowEffect() {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Subtle, Soft Ambient Background Glows that do NOT wash out text contrast */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[140px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-[40%] right-10 w-[500px] h-[500px] rounded-full bg-amber-700/10 blur-[140px] opacity-35 pointer-events-none"></div>

      {/* Dynamic Soft Cursor Spotlight */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-25 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(217,119,6,0.3) 0%, rgba(180,83,9,0.15) 50%, transparent 80%)',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          transition: 'left 0.15s cubic-bezier(0.25, 1, 0.5, 1), top 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />
    </div>
  );
}
