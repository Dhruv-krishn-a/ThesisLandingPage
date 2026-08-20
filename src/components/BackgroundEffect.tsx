'use client';

import React, { useState, useEffect } from 'react';

export default function BackgroundEffect() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const mobileCheck = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(mobileCheck);
    
    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    if (mobileCheck) return;

    let requestRef: number;
    const updateMousePosition = (e: MouseEvent) => {
      // Throttle mouse updates using requestAnimationFrame for better performance
      if (requestRef) cancelAnimationFrame(requestRef);
      requestRef = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, []);

  if (!isClient) return <div className="fixed inset-0 z-0 bg-[#02050D]"></div>;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#02050D]">
      <div className="absolute top-[10%] left-[20%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-cyan-600/10 rounded-full blur-[100px] md:blur-[150px] animate-[pulse_10s_ease-in-out_infinite] will-change-transform"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] bg-indigo-600/10 rounded-full blur-[100px] md:blur-[150px] animate-[pulse_12s_ease-in-out_infinite_reverse] will-change-transform"></div>
      <div 
        className={`absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-cyan-400/10 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen transition-transform ease-out will-change-transform ${isMobile ? 'duration-1000' : 'duration-300'}`}
        style={{ transform: `translate3d(${mousePosition.x - (isMobile ? 200 : 250)}px, ${mousePosition.y - (isMobile ? 200 : 250)}px, 0)` }}
      ></div>
    </div>
  );
}
