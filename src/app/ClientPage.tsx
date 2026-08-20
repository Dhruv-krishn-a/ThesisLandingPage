'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronDown, BookOpen, Award, TrendingUp, Users, Clock, ShieldCheck, PenTool, Send, PhoneCall, ArrowRight, FileCheck2, Quote, Activity, Globe, CheckCircle, Star } from 'lucide-react';
import dynamic from 'next/dynamic';
import SharedForm from '@/components/SharedForm';
import ReviewCarousel from '@/components/ReviewCarousel';
import MouseGlowEffect from '@/components/MouseGlowEffect';

const AnimatedCounter = dynamic(() => import('@/components/AnimatedCounter'), { ssr: false });
const PopupForm = dynamic(() => import('@/components/PopupForm'), { ssr: false });

const useScrollProgress = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = rect.top - windowHeight / 2;
      const total = rect.height;
      let percent = (start * -1) / total;
      if (percent < 0) percent = 0;
      if (percent > 1) percent = 1;
      setProgress(percent * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);
  return progress;
};

// Bulletproof React FadeIn Component
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-[800ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ClientPage({ initialContent }: { initialContent: any }) {
  const content = initialContent;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [winScrollY, setWinScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const processRef = useRef<HTMLDivElement>(null);
  const processProgress = useScrollProgress(processRef);
  
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setWinScrollY(window.scrollY);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollPercent(height > 0 ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleResize = () => {
      if (footerRef.current) setFooterHeight(footerRef.current.offsetHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // Slight delay to ensure DOM is fully painted before measuring footer
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const IconMap: Record<string, any> = { ChevronDown, BookOpen, Award, TrendingUp, Users, Clock, ShieldCheck, PenTool, Send, PhoneCall, ArrowRight, FileCheck2, Quote, Activity, Globe, CheckCircle, Star };
  const getIcon = (iconName: string, defaultIcon: any) => IconMap[iconName] || defaultIcon;

  return (
    <main className="min-h-screen bg-[#07070a] text-stone-300 font-sans selection:bg-amber-700/40 relative overflow-x-hidden">      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUpFade { 
          from { opacity: 0; transform: translateY(20px); filter: blur(4px); } 
          to { opacity: 1; transform: translateY(0); filter: blur(0); } 
        }
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}} />

      
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#07070a]/80 backdrop-blur-2xl border-b border-white/5 py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
          <div className="flex items-center gap-3 md:gap-4 group cursor-pointer active:scale-95 transition-transform duration-200">
            <Image priority={true} src="/WrirkLogoOld.png" alt="WRIrk Logo" width={80} height={80} className="h-14 w-14 object-contain drop-shadow-[0_0_12px_rgba(217,119,6,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(217,119,6,0.8)] transition-all duration-300" />
            <span className="font-serif text-[18px] lg:text-[22px] tracking-widest font-normal text-white uppercase drop-shadow-md translate-y-[2px]">WRIRK</span>
          </div>
          <nav className="hidden lg:flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.1em]">
            {['Services', 'Process', 'Testimonials', 'FAQs'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative group text-stone-400 hover:text-amber-500 transition-colors duration-300">
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-amber-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </a>
            ))}
          </nav>
          <a href="#contact" className="relative px-6 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md hover:border-amber-400 text-xs font-semibold uppercase tracking-[0.1em] text-stone-300 hover:text-white transition-all duration-500 shadow-lg group overflow-hidden hover:shadow-[0_0_20px_rgba(217,119,6,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
            <span className="relative z-10 flex items-center gap-2">Consult Us <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" /></span>
          </a>
        </div>
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[1px] bg-amber-500/80 shadow-[0_0_5px_rgba(217,119,6,0.5)] transition-all duration-150 ease-out z-50" style={{ width: `${scrollPercent}%` }}></div>
      </header>

      {/* Main Content Wrapper (For Footer Curtain Reveal) */}
      <div style={{ marginBottom: footerHeight }} className="relative z-10 bg-[#07070a] shadow-[0_20px_50px_rgba(0,0,0,1)] transition-all duration-300">
        
        <MouseGlowEffect />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent pointer-events-none z-0"></div>

        {/* Hero Section */}
        <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6 z-10">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-8 drop-shadow-lg flex flex-wrap justify-center gap-x-4 gap-y-2">
              {content.hero.headline.value.split(' ').map((word: string, i: number) => (
                <span 
                  key={i} 
                  className={`inline-block transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} 
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <div 
              className={`h-px w-24 bg-amber-600 mx-auto mb-8 shadow-[0_0_10px_rgba(217,119,6,0.8)] transition-all duration-1000 ease-out ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
              style={{ transitionDelay: '800ms' }}
            ></div>
            <p 
              className={`text-lg md:text-2xl text-stone-300 font-light max-w-3xl mx-auto leading-relaxed mb-12 drop-shadow-md transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '1000ms' }}
            >
              {content.hero.description.map((p: any) => p.value).join(' ')}
            </p>
          </div>
        </section>

        {/* Contact Form Overlapping Hero */}
        <section className={`relative z-20 px-6 -mt-10 md:-mt-20 mb-24`}>
          <FadeIn delay={1200}>
            <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.6)] hover:border-white/20 transition-colors duration-500">
               <h2 className="text-2xl font-serif text-white mb-8 text-center border-b border-white/10 pb-4">Request a Confidential Review</h2>
               <SharedForm formId="hero" buttonText="Submit Details" />
            </div>
          </FadeIn>
        </section>

        {/* Metrics */}
        <section className={`py-16 md:py-24 border-y border-white/5 bg-black/20 backdrop-blur-md z-10 relative`}>
          <FadeIn>
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-white/10">
                 {content.metrics.map((metric: any, i: number) => {
                   const cleanValue = metric.value.replace(/,/g, '');
                   const numMatch = cleanValue.match(/\d+/);
                   const num = numMatch ? parseInt(numMatch[0]) : null;
                   const suffix = metric.value.replace(/[\d,]+/, '').trim();
                   return (
                     <div key={i} className="text-center px-4 relative group">
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                          <Star className="w-24 h-24" />
                        </div>
                        <div className="text-4xl md:text-5xl font-serif text-white mb-3 drop-shadow-md relative z-10">
                          {num !== null ? <AnimatedCounter end={num} suffix={suffix} duration={2000} /> : metric.value}
                        </div>
                        <div className="text-xs text-amber-500/80 font-bold uppercase tracking-[0.15em] relative z-10">{metric.label}</div>
                     </div>
                   );
                 })}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Why Trust Us / Sticky Scroll */}
        <section className="py-24 md:py-32 px-6 relative z-10" id="why-publish">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            <div className="lg:col-span-5 relative">
              <FadeIn>
                <div className="lg:sticky lg:top-40 mb-12 lg:mb-0">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-6 drop-shadow-md leading-tight">{content.whyTrustUs.heading?.value}</h2>
                  <div className="h-px w-16 bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.8)] mb-6"></div>
                  <p className="text-stone-400 font-light text-lg">Scroll to explore why thousands of researchers trust our expert guidance.</p>
                </div>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-8">
              {(content.whyTrustUs.features || []).map((f: any, idx: number) => {
                const Icon = getIcon(f.icon, TrendingUp);
                return (
                  <FadeIn key={idx} delay={idx * 150}>
                    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl flex gap-6 items-start hover:bg-white/10 hover:border-amber-500/30 transition-all duration-500 group`}>
                      <div className="shrink-0 p-4 bg-black/40 rounded-xl border border-white/10 text-amber-500 shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <Icon className="h-8 w-8 stroke-[1.5]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-white mb-3">{f.title}</h3>
                        <p className="text-stone-300 font-light leading-relaxed">{f.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

          </div>
        </section>

        {/* Quote Banner (Parallax) */}
        <section className={`py-32 relative z-10 bg-amber-900/5 border-y border-amber-500/10 backdrop-blur-sm overflow-hidden`}>
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-serif text-amber-500 opacity-5 pointer-events-none leading-none select-none transition-transform duration-75"
            style={{ transform: `translate(-50%, calc(-50% + ${(winScrollY * 0.15) - 200}px))` }}
          >
            "
          </div>
          <FadeIn>
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <Quote className="h-12 w-12 text-amber-600 mx-auto mb-8 opacity-70" />
              <p className="text-3xl md:text-5xl font-serif text-amber-50 leading-snug drop-shadow-xl">
                 "{content.whyTrustUs.quote.value}"
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Services List (Focus/Dim) */}
        <section className="py-24 md:py-32 px-6 relative z-10 group/services" id="services">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className={`mb-20 text-center md:text-left`}>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 drop-shadow-md">{content.services.heading?.value}</h2>
                <div className="h-px w-16 bg-amber-600 md:mx-0 mx-auto shadow-[0_0_10px_rgba(217,119,6,0.8)]"></div>
              </div>
            </FadeIn>

            <div className="space-y-6">
              {(content.services.cards || []).map((srv: any, idx: number) => {
                const Icon = getIcon(srv.icon, PenTool);
                return (
                  <FadeIn key={srv.id} delay={idx * 150}>
                    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 transition-all duration-500 group-hover/services:opacity-40 hover:!opacity-100 hover:scale-[1.02] hover:bg-white/10 hover:border-amber-700/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]`}>
                      <div className="shrink-0 p-5 bg-black/40 border border-white/10 rounded-xl text-stone-400 group-hover/services:text-amber-500 transition-all shadow-inner">
                        <Icon className="h-10 w-10 stroke-[1.5]" />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-serif text-white mb-4 drop-shadow-sm">{srv.title}</h3>
                        <p className="text-stone-300 font-light leading-relaxed text-lg max-w-2xl">{srv.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Timeline (Scroll Drawing Line) */}
        <section className="py-24 md:py-32 px-6 relative z-10 bg-black/20 backdrop-blur-sm border-y border-white/5" id="process" ref={processRef}>
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className={`text-center mb-24`}>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 drop-shadow-md">{content.process.heading?.value}</h2>
                <div className="h-px w-16 bg-amber-600 mx-auto shadow-[0_0_10px_rgba(217,119,6,0.8)]"></div>
              </div>
            </FadeIn>

            <div className="relative ml-4 md:ml-8 py-8 space-y-16">
              {/* Background empty line */}
              <div className="absolute left-[1.15rem] top-0 bottom-0 w-1 bg-white/5 rounded-full"></div>
              {/* Active scroll drawing line */}
              <div 
                className="absolute left-[1.15rem] top-0 w-1 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(217,119,6,1)] transition-all duration-300 ease-out"
                style={{ height: `${processProgress}%` }}
              ></div>

              {content.process.steps.map((step: any, idx: number) => {
                const isActive = processProgress > (idx * 25);
                return (
                  <FadeIn key={idx} delay={idx * 150}>
                    <div className={`relative pl-12 md:pl-20 group`}>
                      <div className={`absolute -left-1 top-2 h-10 w-10 rounded-full border-[3px] flex items-center justify-center font-serif text-lg transition-all duration-500 shadow-lg ${isActive ? 'border-amber-500 bg-amber-900 text-white shadow-[0_0_20px_rgba(217,119,6,0.8)] scale-110' : 'bg-black border-white/20 text-stone-500'}`}>
                        {step.step}
                      </div>
                      <div className={`bg-white/5 backdrop-blur-md border rounded-xl p-6 transition-all duration-500 ${isActive ? 'border-amber-500/50 shadow-[0_10px_30px_rgba(217,119,6,0.15)]' : 'border-white/10'}`}>
                        <h3 className={`text-2xl font-serif mb-3 transition-colors duration-500 ${isActive ? 'text-amber-100' : 'text-white'}`}>{step.title}</h3>
                        <p className="text-stone-300 font-light leading-relaxed text-lg">{step.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32 relative z-10" id="testimonials">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className={`text-center mb-16`}>
                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 drop-shadow-md">Scholar Success</h2>
                 <div className="h-px w-16 bg-amber-600 mx-auto shadow-[0_0_10px_rgba(217,119,6,0.8)]"></div>
              </div>
            </FadeIn>
            <div className="w-full relative mt-8">
               <ReviewCarousel reviews={content.reviews} />
            </div>
          </div>
        </section>

        {/* FAQs (Blur Reveal) */}
        <section className="py-24 md:py-32 px-6 relative z-10 bg-black/20 backdrop-blur-sm border-t border-white/5" id="faqs">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className={`text-center mb-20`}>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 drop-shadow-md">{content.faqs.heading?.value}</h2>
                <div className="h-px w-16 bg-amber-600 mx-auto shadow-[0_0_10px_rgba(217,119,6,0.8)]"></div>
              </div>
            </FadeIn>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {content.faqs.items.map((faq: any, i: number) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className={`py-6`}>
                    <button 
                      className="w-full flex items-center justify-between text-left focus:outline-none group"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className={`font-serif text-lg md:text-xl transition-colors ${openFaq === i ? 'text-amber-500' : 'text-white group-hover:text-amber-200'}`}>{faq.q}</span>
                      <div className={`shrink-0 flex items-center justify-center h-8 w-8 rounded-full border transition-all duration-300 ${openFaq === i ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-white/5 group-hover:border-amber-500/50'}`}>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-amber-500' : 'text-stone-400'}`} />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 mt-6 opacity-100 blur-none' : 'max-h-0 opacity-0 blur-sm'}`}>
                      <p className="text-stone-300 font-light leading-relaxed pl-2 border-l-2 border-amber-500/50">{faq.a}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

      </div> {/* End Main Content Wrapper */}

      {/* Footer (Curtain Reveal) */}
      <footer ref={footerRef} className="fixed bottom-0 w-full z-0 bg-black pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-[28px] tracking-widest text-white uppercase">WRIRK</span>
              </div>
              <p className="text-stone-400 font-light max-w-sm leading-relaxed mb-6">
                {content.footer?.description.map((p: any) => p.value).join(' ')}
              </p>
              <a href="mailto:contact@wrirk.com" className="text-amber-500 hover:text-amber-400 transition-colors">contact@wrirk.com</a>
            </div>
            <div className="flex flex-col md:items-end justify-center">
               <h3 className="text-white font-serif text-xl mb-4">Connect With Us</h3>
               <div className="flex gap-6">
                 <a href={content.footer?.socials?.whatsapp} className="text-stone-400 hover:text-amber-500 transition-colors">WhatsApp</a>
                 <a href={content.footer?.socials?.linkedin} className="text-stone-400 hover:text-amber-500 transition-colors">LinkedIn</a>
                 <a href={content.footer?.socials?.youtube} className="text-stone-400 hover:text-amber-500 transition-colors">YouTube</a>
               </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-600 text-sm font-light">
            <p>© 2026 MPRW Research Work LLP. All rights Reserved.</p>
            <p className="tracking-[0.2em] font-semibold">INDIA <span className="text-red-900 ml-1">❤️</span></p>
          </div>
        </div>
      </footer>
      
      <PopupForm />
    </main>
  );
}
