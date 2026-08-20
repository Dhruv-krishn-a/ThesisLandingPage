'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function ThankYouPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#02050D] relative overflow-hidden flex items-center justify-center font-sans">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]"></div>

      <div className={`relative z-10 p-6 md:p-12 text-center transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
        
        {/* Animated Checkmark */}
        <div className="relative mx-auto w-24 h-24 mb-10 flex items-center justify-center group">
          <div className="absolute inset-0 bg-linear-to-tr from-cyan-400 to-indigo-500 rounded-full blur-xl opacity-50 animate-pulse transition-opacity duration-700 group-hover:opacity-100"></div>
          <div className="relative w-full h-full bg-[#060D1A] rounded-full border border-cyan-400/50 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.3)]">
            <Check className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>
          <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-indigo-400 animate-bounce" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Thank <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">You!</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 font-medium max-w-xl mx-auto leading-relaxed mb-12">
          Your information has been successfully received. One of our PhD publication experts will review your details and contact you shortly.
        </p>

        {/* Return Button */}
        <div className="relative group inline-block">
          <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-indigo-500 rounded-full blur opacity-60 animate-pulse group-hover:opacity-100 transition duration-500"></div>
          <Link href="/" className="relative flex items-center gap-2 bg-white text-[#0A0F1C] px-8 py-4 rounded-full font-black tracking-widest uppercase text-sm hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden isolate">
            <span className="relative z-10 flex items-center gap-2">Return Home <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>

      </div>
    </main>
  );
}
