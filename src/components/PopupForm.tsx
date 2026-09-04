'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import SharedForm from './SharedForm';

export default function PopupForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasClosed) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const rect = contactSection.getBoundingClientRect();
          const isContactInView = rect.top < window.innerHeight && rect.bottom > 0;
          if (isContactInView) return; 
        }
        setIsVisible(true);
      }
    }, 12000);

    const handleInteraction = () => {
      setHasClosed(true);
      setIsVisible(false);
    };
    window.addEventListener('formInteractionStarted', handleInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('formInteractionStarted', handleInteraction);
    };
  }, [hasClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setHasClosed(true);
  };

  if (!isVisible && !hasClosed) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-[#02050D]/85 backdrop-blur-md transition-opacity duration-500"
        onClick={handleClose}
      ></div>

      {/* Modal Box */}
      <div 
        className={`relative w-full max-w-md bg-[#070b14]/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500 ease-out transform ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

        <button 
          onClick={handleClose}
          aria-label="Close form"
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all active:scale-90"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative p-8 z-10">
          <h2 className="text-2xl font-serif text-white mb-6 text-center border-b border-white/10 pb-4">Request a <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">Confidential Review</span></h2>
          
          <SharedForm 
            formId="popup" 
            buttonText="Request Call Back" 
          />
        </div>
      </div>
    </div>
  );
}
