'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChevronDown, BookOpen, Award, TrendingUp, Users, Clock, ShieldCheck, 
  PenTool, Send, PhoneCall, ArrowRight, FileCheck2, Quote, Activity, 
  Globe, CheckCircle, Star, Sparkles, HelpCircle, GraduationCap, Target, 
  FileText, Lightbulb, Compass, Layers, Search, BarChart3, 
  CheckSquare, MessageSquareQuote
} from 'lucide-react';
import dynamic from 'next/dynamic';
import SharedForm from '@/components/SharedForm';
import ReviewCarousel from '@/components/ReviewCarousel';
import { GoogleReview } from '@/components/GoogleReviewCard';
import MouseGlowEffect from '@/components/MouseGlowEffect';

const AnimatedCounter = dynamic(() => import('@/components/AnimatedCounter'), { ssr: false });
const PopupForm = dynamic(() => import('@/components/PopupForm'), { ssr: false });

type ContentValue = { value: string };

interface ContentItem {
  icon?: string;
  title?: string;
  desc?: string;
  description?: string;
  subtitle?: string;
  number?: string;
  label?: string;
  text?: string;
  step?: string;
  stepNumber?: string;
  heading?: string;
  details?: string[];
  points?: string[];
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
  value?: string;
  href?: string;
}

interface ContentSection {
  tag?: ContentValue;
  title?: ContentValue;
  heading?: ContentValue;
  subtitle?: ContentValue;
  description?: Array<ContentValue> | ContentValue;
  items?: ContentItem[];
  steps?: ContentItem[];
  features?: ContentItem[];
  cards?: ContentItem[];
  stats?: ContentItem[];
  quote?: ContentValue;
  points?: string[];
  ctaHeading?: ContentValue;
  ctaText1?: ContentValue;
  ctaText2?: ContentValue;
  ctaText3?: ContentValue;
  disclaimer?: ContentValue;
}

interface SiteContent {
  globalSettings?: {
    brandName?: ContentValue;
    heroBadgeText?: ContentValue;
    phoneNumber?: ContentValue;
    whatsappNumber?: ContentValue;
    whatsappMessage?: ContentValue;
    callNumber?: ContentValue;
    [key: string]: unknown;
  };
  hero?: {
    tag?: ContentValue;
    title?: ContentValue;
    headline?: ContentValue;
    subtitle?: ContentValue;
    button1?: ContentValue;
    button2?: ContentValue;
    integrityBold?: ContentValue;
    integrityText?: Array<ContentValue>;
    description?: Array<ContentValue>;
    trustBadges?: Array<{ text: string; subtext?: string }>;
    [key: string]: unknown;
  };
  metrics?: ContentItem[];
  whoWeHelp?: ContentSection;
  whyTrustUs?: ContentSection;
  trustedPartner?: ContentSection;
  services?: ContentSection;
  modules?: ContentSection;
  whoIsThisFor?: ContentSection;
  whyChooseWrirk?: ContentSection;
  process?: ContentSection;
  faqs?: ContentSection;
  reviews?: GoogleReview[];
  finalCta?: {
    tag?: ContentValue;
    title?: ContentValue;
    subtitle?: ContentValue;
    buttonText?: ContentValue;
    [key: string]: unknown;
  };
  footer?: {
    brandName?: ContentValue;
    tagline?: ContentValue;
    description?: Array<ContentValue>;
    socials?: {
      whatsapp?: string;
      linkedin?: string;
      youtube?: string;
    };
    links?: Array<{ text: string; href: string }>;
    copyright?: ContentValue;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

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

// Fast-Loading FadeIn Component
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.01, rootMargin: '400px 0px 400px 0px' });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ClientPage({ initialContent }: { initialContent: SiteContent }) {
  const content = initialContent;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [selectedModuleMessage, setSelectedModuleMessage] = useState('');
  const [isHeroFormHighlighted, setIsHeroFormHighlighted] = useState(false);
  
  const processRef = useRef<HTMLDivElement>(null);
  const processProgress = useScrollProgress(processRef);
  
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    ChevronDown, BookOpen, Award, TrendingUp, Users, Clock, ShieldCheck, 
    PenTool, Send, PhoneCall, ArrowRight, FileCheck2, Quote, Activity, 
    Globe, CheckCircle, Star, Sparkles, HelpCircle, GraduationCap, Target,
    FileText, Lightbulb, Compass, Layers, Search, BarChart3, CheckSquare, MessageSquareQuote
  };

  const getIcon = (iconName: string | undefined, defaultIcon: React.ComponentType<{ className?: string }>) => 
    (iconName && IconMap[iconName]) || defaultIcon;

  const scrollToCenter = (elementId: string) => {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middleOffset = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
      window.scrollTo({
        top: Math.max(0, middleOffset),
        behavior: 'smooth'
      });
    }
  };

  const triggerHeroFormHighlight = () => {
    scrollToCenter('hero-form-card');
    setIsHeroFormHighlighted(true);
    setTimeout(() => {
      const nameInput = document.getElementById('hero-name');
      if (nameInput) {
        nameInput.focus();
      }
    }, 450);
    setTimeout(() => {
      setIsHeroFormHighlighted(false);
    }, 2400);
  };

  const handleGuidanceClick = (cardTitle?: string) => {
    if (cardTitle) {
      setSelectedModuleMessage(`I need guidance on: ${cardTitle}`);
    }
    const targetElement = document.getElementById('final-cta-card-box') || document.getElementById('bottom-cta-card');
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middleOffset = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
      window.scrollTo({
        top: Math.max(0, middleOffset),
        behavior: 'smooth'
      });
      setTimeout(() => {
        const messageInput = document.getElementById('bottom-cta-message');
        if (messageInput) {
          messageInput.focus();
        }
      }, 500);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-cyan-600/30 relative overflow-x-hidden">      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}} />

      {/* Header Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#030712]/95 backdrop-blur-2xl border-b border-cyan-500/20 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.9)]' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
          
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer active:scale-95 transition-transform duration-200">
            <Image priority={true} src="/WrirkLogoOld.png" alt="WRIRK Logo" width={52} height={52} className="h-11 w-11 md:h-13 md:w-13 object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.9)] transition-all duration-300" />
            <span className="font-serif text-2xl md:text-3xl tracking-widest font-normal text-white uppercase drop-shadow-md">WRIRK</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-bold uppercase tracking-widest">
            {[
              { label: 'SERVICES', href: '#services' },
              { label: 'PROCESS', href: '#process' },
              { label: 'TESTIMONIALS', href: '#testimonials' },
              { label: 'FAQS', href: '#faqs' }
            ].map((item) => (
              <a key={item.label} href={item.href} className="relative group text-slate-200 hover:text-cyan-400 transition-colors duration-300">
                {item.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-cyan-400 group-hover:w-full group-hover:left-0 transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              </a>
            ))}
          </nav>

          {/* Glowing Top-Right CTA Pill Button */}
          <button 
            type="button"
            onClick={triggerHeroFormHighlight}
            className="relative px-6 py-3 rounded-full border border-cyan-400/80 bg-[#06202e]/80 text-cyan-300 font-extrabold uppercase tracking-wider text-xs md:text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] hover:bg-[#082a3d] hover:text-white transition-all duration-300 flex items-center gap-2 group overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
            <span className="relative z-10 flex items-center gap-2">CONTACT US <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
          </button>

        </div>

        {/* Scroll Progress Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 shadow-[0_0_8px_rgba(34,211,238,0.9)] transition-all duration-150 ease-out z-50" style={{ width: `${scrollPercent}%` }}></div>
      </header>

      {/* Main Content Wrapper */}
      <div style={{ marginBottom: footerHeight }} className="relative z-10 bg-[#030712] shadow-[0_20px_50px_rgba(0,0,0,1)] transition-all duration-300">
        
        <MouseGlowEffect />
        
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-blue-950/15 to-transparent pointer-events-none z-0"></div>

        {/* 1. HERO SECTION */}
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 px-6 md:px-12 z-10" id="hero">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
            
            {/* Left Column */}
            <div className="lg:col-span-7 text-left space-y-7 pt-2">
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-extrabold text-white leading-[1.18] tracking-tight [text-wrap:balance] drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                {content.hero?.headline?.value ? (
                  <>
                    {content.hero.headline.value.replace(/Get Expert Guidance to Move Forward\./i, '').trim()}{' '}
                    <span className="inline-block bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">
                      Get Expert Guidance to Move Forward.
                    </span>
                  </>
                ) : (
                  "Stuck on Your Thesis? Get Expert Guidance to Move Forward."
                )}
              </h1>

              <p className="text-slate-200 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
                {content.hero?.description?.map((p: { value: string }) => p.value).join(' ')}
              </p>

              {/* Callout Box */}
              <div className="bg-[#081226]/90 border-l-4 border-cyan-400 rounded-xl p-6 md:p-7 border-t border-r border-b border-cyan-500/20 shadow-xl backdrop-blur-md space-y-3">
                <p className="text-cyan-400 font-bold text-lg md:text-xl">
                  {content.hero?.integrityBold?.value || "You Write. We Guide."}
                </p>
                <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed">
                  {content.hero?.integrityText?.map((p: { value: string }) => p.value).join(' ')}
                </p>
              </div>

              {/* CTA Action Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button 
                  type="button"
                  onClick={triggerHeroFormHighlight}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm md:text-base uppercase tracking-widest shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
                >
                  <span>{content.hero?.button1?.value || "Get Thesis Guidance"}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {content.hero?.button2?.value && (
                  <button 
                    type="button"
                    onClick={triggerHeroFormHighlight}
                    className="px-8 py-4 rounded-xl border border-cyan-500/40 bg-[#06152a]/60 hover:bg-[#08203d] hover:border-cyan-400 text-cyan-300 font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300"
                  >
                    {content.hero.button2.value}
                  </button>
                )}
              </div>

            </div>

            {/* Right Column: Contact Form Card */}
            <div className="lg:col-span-5 w-full" id="contact">
              <FadeIn delay={150}>
                <div 
                  id="hero-form-card" 
                  className={`bg-[#060c19]/95 backdrop-blur-2xl border rounded-2xl p-7 md:p-9 transition-all duration-500 relative overflow-hidden ${
                    isHeroFormHighlighted 
                      ? 'border-cyan-400 ring-4 ring-cyan-400/60 shadow-[0_0_80px_rgba(34,211,238,0.9)] scale-[1.03]' 
                      : 'border-[#1e293b] hover:border-cyan-500/40 shadow-[0_0_50px_rgba(14,165,233,0.15)]'
                  }`}
                >
                  {isHeroFormHighlighted && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs uppercase px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.9)] z-20 flex items-center gap-1.5 animate-bounce">
                      <Sparkles className="w-3.5 h-3.5" /> Please Fill Out This Form Below
                    </div>
                  )}

                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-6 text-center tracking-tight pt-2">
                    Request a <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent font-extrabold">Review</span>
                  </h2>

                  <SharedForm formId="hero" buttonText="REQUEST FREE CONSULTATION" />
                </div>
              </FadeIn>
            </div>

          </div>
        </section>

        {/* Metrics Bar */}
        <section className="py-12 md:py-16 border-y border-[#1e293b] bg-[#030712]/90 backdrop-blur-md z-10 relative">
          <FadeIn>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center">
                 {content.metrics?.map((metric: ContentItem, i: number) => {
                    const cleanValue = (metric.value || '').replace(/,/g, '');
                    const numMatch = cleanValue.match(/\d+/);
                    const num = numMatch ? parseInt(numMatch[0]) : null;
                    const suffix = (metric.value || '').replace(/[\d,]+/, '').trim();
                    
                    return (
                      <div 
                        key={i} 
                        className={`flex flex-col items-center justify-center text-center px-4 py-5 md:py-3 relative ${
                          content.metrics && i < content.metrics.length - 1 ? 'lg:border-r border-white/10' : ''
                        }`}
                      >
                         <div className="min-h-[72px] flex items-center justify-center">
                           {num !== null ? (
                             <span className="text-5xl sm:text-6xl lg:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
                               <AnimatedCounter end={num} suffix={suffix} duration={2000} />
                             </span>
                           ) : (
                             <span className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                               Confidential <br /> &amp; Ethical
                             </span>
                           )}
                         </div>

                         <div className="text-xs sm:text-sm font-extrabold text-cyan-400 tracking-widest uppercase mt-3.5">
                           {metric.label}
                         </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 2. WHY TRUST US / FINDING YOUR THESIS DIFFICULT TO MANAGE? */}
        <section className="py-20 md:py-28 px-6 relative z-10" id="why-trust-us">
          <div className="max-w-6xl mx-auto">
            
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto mb-14">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight [text-wrap:balance]">
                  {content.whyTrustUs?.heading?.value || "Finding Your Thesis Difficult to Manage?"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-6"></div>
              </div>
            </FadeIn>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-12">
              {content.whyTrustUs?.features?.map((feat: ContentItem, idx: number) => {
                const IconComponent = getIcon(feat.icon, BookOpen);
                return (
                  <FadeIn key={idx} delay={idx * 40}>
                    <div className="bg-[#070e1e]/80 backdrop-blur-xl border border-[#1e293b] hover:border-cyan-500/50 p-6 md:p-7 rounded-2xl flex items-start gap-5 hover:bg-[#0a152d] transition-all duration-300 group shadow-md">
                      <div className="shrink-0 p-3.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {feat.title}
                        </h3>
                        <p className="text-slate-200 text-base md:text-lg font-normal leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Section Quote / Conclusion */}
            {content.whyTrustUs?.quote?.value && (
              <FadeIn delay={300}>
                <div className="bg-gradient-to-r from-[#081226] via-[#0c1a38] to-[#081226] border border-cyan-500/40 rounded-2xl p-7 md:p-9 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <p className="text-cyan-200 text-xl md:text-2xl font-bold leading-relaxed whitespace-pre-line">
                    &quot;{content.whyTrustUs.quote.value}&quot;
                  </p>
                </div>
              </FadeIn>
            )}

          </div>
        </section>

        {/* 3. WHAT IS THESIS GUIDANCE? (trustedPartner) */}
        <section className="py-20 md:py-28 px-6 relative z-10 bg-[#02050e] border-y border-[#1e293b]" id="what-is-thesis-guidance">
          <div className="max-w-6xl mx-auto">
            
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.trustedPartner?.heading?.value || "What Is Thesis Guidance?"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-6"></div>
              </div>
            </FadeIn>

            {/* Highlight Banner */}
            <FadeIn delay={150}>
              <div className="bg-gradient-to-br from-[#081226] via-[#050b18] to-[#0c1a38] border-2 border-cyan-500/50 rounded-3xl p-9 md:p-14 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group mb-14">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none"></div>
                
                <Quote className="h-12 w-12 text-cyan-400 mx-auto mb-5 opacity-80" />

                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.trustedPartner?.ctaText1?.value || "We Don't Write Your Thesis for You."}
                </h3>

                <p className="text-slate-100 text-lg md:text-2xl font-normal leading-relaxed max-w-3xl mx-auto mb-7">
                  {content.trustedPartner?.ctaText2?.value || "We help you understand, develop, review, and improve your own research work."}
                </p>

                {content.trustedPartner?.ctaHeading?.value && (
                  <div className="inline-block px-7 py-3 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold text-base md:text-lg tracking-wide">
                    {content.trustedPartner.ctaHeading.value}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* 6 Feature Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.trustedPartner?.features?.map((feat: ContentItem, idx: number) => {
                const IconComponent = getIcon(feat.icon, ShieldCheck);
                return (
                  <FadeIn key={idx} delay={idx * 40}>
                    <div className="bg-[#070e1e]/80 backdrop-blur-xl border border-[#1e293b] hover:border-cyan-500/50 p-6 md:p-7 rounded-2xl hover:bg-[#0c1834] transition-all duration-300 group shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-[#09152a] border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 stroke-[1.75]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors [text-wrap:balance]">
                        {feat.title}
                      </h3>
                      <p className="text-slate-300 text-sm font-normal leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

          </div>
        </section>

        {/* 4. WHAT WE GUIDE YOU WITH (services) */}
        <section className="py-20 md:py-28 px-6 relative z-10" id="services">
          <div className="max-w-7xl mx-auto">
            
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.services?.heading?.value || "What We Guide You With"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-6"></div>
                <p className="text-slate-200 text-lg md:text-xl font-normal">
                  {Array.isArray(content.services?.description) ? content.services?.description?.map((p: { value: string }) => p.value).join(' ') : content.services?.description?.value}
                </p>
              </div>
            </FadeIn>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {content.services?.cards?.map((card: ContentItem, idx: number) => {
                const IconComponent = getIcon(card.icon, BookOpen);
                return (
                  <FadeIn key={idx} delay={idx * 60}>
                    <div className="bg-[#070e1e]/80 backdrop-blur-xl border border-[#1e293b] hover:border-cyan-500/50 p-7 md:p-8 rounded-2xl hover:bg-[#0c1834] transition-all duration-500 group shadow-lg flex flex-col justify-between h-full">
                      <div>
                        <div className="w-14 h-14 rounded-xl bg-[#09152a] border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300 shadow-inner">
                          <IconComponent className="h-7 w-7 stroke-[1.75]" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-cyan-300 transition-colors [text-wrap:balance]">
                          {card.title}
                        </h3>
                        <p className="text-slate-300 text-base font-normal leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                      
                      {/* Clickable Expert Guidance Button that scrolls to final CTA card */}
                      <button
                        type="button"
                        onClick={() => handleGuidanceClick(card.title)}
                        className="pt-5 mt-5 border-t border-[#1e293b] flex items-center gap-2.5 text-sm font-extrabold uppercase text-cyan-400 hover:text-cyan-300 opacity-90 group-hover:opacity-100 transition-all cursor-pointer w-full text-left group/btn"
                      >
                        <span>Expert Guidance</span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. HOW OUR THESIS GUIDANCE WORKS (process) */}
        <section className="py-20 md:py-28 px-6 relative z-10 bg-[#02050e] border-y border-[#1e293b]" id="process" ref={processRef}>
          <div className="max-w-4xl mx-auto">
            
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.process?.heading?.value || "How Our Thesis Guidance Works"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-4"></div>
                <p className="text-slate-200 text-lg md:text-xl font-normal">
                  {Array.isArray(content.process?.description) ? content.process?.description?.map((p: { value: string }) => p.value).join(' ') : content.process?.description?.value}
                </p>
              </div>
            </FadeIn>

            <div className="relative ml-4 md:ml-8 py-4 space-y-10">
              <div className="absolute left-[1.15rem] top-0 bottom-0 w-1 bg-[#1e293b] rounded-full"></div>
              <div 
                className="absolute left-[1.15rem] top-0 w-1 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] transition-all duration-300 ease-out"
                style={{ height: `${processProgress}%` }}
              ></div>

              {content.process?.steps?.map((stepItem: ContentItem, idx: number) => {
                const isActive = processProgress > (idx * 25);
                return (
                  <FadeIn key={idx} delay={idx * 80}>
                    <div className="relative pl-10 md:pl-16 group">
                      <div className={`absolute -left-1 top-1 h-10 w-10 rounded-full border-[3px] flex items-center justify-center font-bold text-sm md:text-base transition-all duration-500 shadow-lg ${isActive ? 'border-cyan-400 bg-[#08152e] text-white shadow-[0_0_20px_rgba(34,211,238,0.8)] scale-110' : 'bg-black border-[#1e293b] text-slate-500'}`}>
                        {idx + 1}
                      </div>
                      <div className={`bg-[#070e1e]/90 backdrop-blur-md border rounded-2xl p-7 md:p-8 transition-all duration-500 ${isActive ? 'border-cyan-400/50 shadow-[0_10px_25px_rgba(34,211,238,0.15)] bg-[#091630]' : 'border-[#1e293b]'}`}>
                        <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-1.5 block">
                          Step {stepItem.step || `0${idx + 1}`}
                        </span>
                        <h3 className={`text-2xl font-extrabold mb-2.5 transition-colors duration-500 ${isActive ? 'text-cyan-200' : 'text-white'}`}>
                          {stepItem.title}
                        </h3>
                        <p className="text-slate-200 font-normal leading-relaxed text-base md:text-lg">
                          {stepItem.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

          </div>
        </section>

        {/* 6. TESTIMONIALS */}
        <section className="py-20 md:py-28 relative z-10 w-full overflow-hidden bg-[#02050e] border-y border-[#1e293b]" id="testimonials">
          <div className="w-full">
            <FadeIn>
              <div className="text-center mb-12 px-6">
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                   Testimonials
                 </h2>
                 <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-5"></div>
                 <p className="text-slate-200 text-lg md:text-xl font-normal">
                   What Researchers Say About Our Guidance
                 </p>
              </div>
            </FadeIn>
            <div className="w-full relative mt-4">
               <ReviewCarousel reviews={content.reviews} />
            </div>
          </div>
        </section>

        {/* 7. FAQS */}
        <section className="py-20 md:py-28 px-6 relative z-10" id="faqs">
          <div className="max-w-4xl mx-auto">
            
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.faqs?.heading?.value || "Frequently Asked Questions"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-4"></div>
                {content.faqs?.description && (
                  <p className="text-slate-300 text-base md:text-lg">
                    {Array.isArray(content.faqs.description) ? content.faqs.description.map((p: { value: string }) => p.value).join(' ') : content.faqs.description.value}
                  </p>
                )}
              </div>
            </FadeIn>

            <div className="divide-y divide-[#1e293b] border-y border-[#1e293b]">
              {content.faqs?.items?.map((faq: ContentItem, i: number) => (
                <FadeIn key={i} delay={i * 20}>
                  <div className="py-6">
                    <button 
                      className="w-full flex items-center justify-between text-left focus:outline-none group py-2 cursor-pointer"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className={`font-extrabold text-lg md:text-xl pr-4 transition-colors ${openFaq === i ? 'text-cyan-400' : 'text-white group-hover:text-cyan-300'}`}>
                        {faq.q}
                      </span>
                      <div className={`shrink-0 flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-300 ${openFaq === i ? 'border-cyan-400 bg-cyan-500/20 text-cyan-400' : 'border-[#1e293b] bg-[#070e1e] text-slate-400 group-hover:border-cyan-400/50'}`}>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 mt-4 opacity-100 blur-none' : 'max-h-0 opacity-0 blur-sm'}`}>
                      <p className="text-slate-200 font-normal leading-relaxed text-base md:text-lg pl-4 border-l-2 border-cyan-400/50 py-1">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="pt-20 pb-40 md:pt-28 md:pb-64 px-6 relative z-10 overflow-hidden" id="final-cta">
          <FadeIn>
            <div id="final-cta-card-box" className="max-w-6xl mx-auto bg-gradient-to-r from-[#060c19] via-[#0f192e] to-[#060c19] border-2 border-cyan-500/40 rounded-3xl p-9 md:p-14 relative shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                
                {/* Left Side */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Thesis Research Mentorship
                  </div>

                  <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight [text-wrap:balance]">
                    Ready to Complete Your Thesis with Confidence?
                  </h2>

                  <p className="text-slate-200 font-normal text-lg md:text-xl leading-relaxed">
                    Get expert mentorship across your thesis chapters, methodology, data interpretation, and viva defense preparation.
                  </p>

                  <div className="p-5 rounded-xl bg-[#081226] border border-cyan-500/30 font-bold text-cyan-300 text-xl md:text-2xl">
                    You Write. We Guide.
                  </div>

                  <div className="pt-2 flex flex-col gap-3.5">
                    <div className="flex items-center gap-3.5 text-slate-100 text-base md:text-lg font-semibold">
                      <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0" />
                      <span>Individualized Thesis Chapter Mentorship</span>
                    </div>
                    <div className="flex items-center gap-3.5 text-slate-100 text-base md:text-lg font-semibold">
                      <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0" />
                      <span>100% Confidential & Authentic Guidance</span>
                    </div>
                  </div>
                </div>

                {/* Right Side Form */}
                <div className="lg:col-span-6" id="bottom-cta-card">
                  <div className="bg-[#030712]/90 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-7 md:p-9 shadow-2xl relative">
                    <h3 className="text-2xl font-extrabold text-white mb-6 text-center border-b border-white/10 pb-4">Get Thesis Guidance</h3>
                    <SharedForm 
                      formId="bottom-cta" 
                      buttonText={content.hero?.button1?.value || "Get Thesis Guidance"} 
                      initialMessage={selectedModuleMessage}
                    />
                  </div>
                </div>

              </div>

            </div>
          </FadeIn>
        </section>

      </div> {/* End Main Content Wrapper */}

      {/* Footer */}
      <footer ref={footerRef} className="fixed bottom-0 w-full z-0 bg-[#02040a] pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image priority={true} src="/WrirkLogoOld.png" alt="WRIRK Logo" width={44} height={44} className="h-11 w-11 object-contain" />
                <span className="font-serif text-[26px] tracking-widest text-white uppercase">WRIRK</span>
              </div>
              <p className="text-slate-400 font-normal max-w-sm leading-relaxed text-base mb-4">
                {content.footer?.description?.map((p: { value: string }) => p.value).join(' ')}
              </p>
              <a href="mailto:contact@wrirk.com" className="text-cyan-400 hover:text-cyan-300 text-base font-semibold transition-colors">contact@wrirk.com</a>
            </div>
            <div className="flex flex-col md:items-end justify-center">
               <h3 className="text-white font-bold text-xl mb-3">Connect With Us</h3>
               <div className="flex gap-6 text-base font-semibold">
                 <a href={content.footer?.socials?.whatsapp} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">WhatsApp</a>
                 <a href={content.footer?.socials?.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
                 <a href={content.footer?.socials?.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">YouTube</a>
               </div>
            </div>
          </div>
          <div className="border-t border-[#1e293b] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs md:text-sm font-normal">
            <p>© 2026 MPRW Research Work LLP. All rights Reserved.</p>
            <p className="tracking-widest font-extrabold">INDIA <span className="text-red-800 ml-1">❤️</span></p>
          </div>
        </div>
      </footer>
      
      {/* Floating Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5">
        <a 
          href={content.footer?.socials?.whatsapp || "https://chat.whatsapp.com/IUUfrrGfyBNH6exy1JzOEA"} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="WhatsApp Us"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] border border-emerald-300/40 text-white flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:shadow-[0_0_35px_rgba(37,211,102,0.9)] hover:scale-110 transition-all duration-300 group"
        >
          <svg className="w-7 h-7 fill-white group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        <a 
          href={`tel:${content.globalSettings?.callNumber?.value || "+919548521859"}`}
          aria-label="Call Us"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] border border-cyan-300/40 text-white flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:shadow-[0_0_35px_rgba(56,189,248,0.9)] hover:scale-110 transition-all duration-300 group"
        >
          <svg className="w-6.5 h-6.5 fill-white group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
      </div>

      <PopupForm />
    </main>
  );
}
