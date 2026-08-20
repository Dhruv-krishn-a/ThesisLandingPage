"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GoogleReviewCard, { GoogleReview } from './GoogleReviewCard';

interface Props {
  reviews: GoogleReview[];
}

export default function ReviewCarousel({ reviews }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate for seamless infinite loop
  const duplicatedReviews = reviews.length > 0 ? [...reviews, ...reviews, ...reviews] : [];
  const isSingle = reviews.length === 1;

  // Auto-scrolling logic
  useEffect(() => {
    // Disable auto-scroll on mobile by checking window width
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    if (isSingle || isHovered || !carouselRef.current) return;
    
    let animationId: number;
    const scroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1; // Speed of auto-scroll
        
        // Seamless loop logic
        // If we've scrolled past 1/3 of the total duplicated width, seamlessly jump back
        // (since we duplicated it 3 times, jumping back 1/3 is perfectly invisible)
        const singleSetWidth = carouselRef.current.scrollWidth / 3;
        if (carouselRef.current.scrollLeft >= singleSetWidth) {
          carouselRef.current.scrollLeft -= singleSetWidth;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isSingle, reviews]);

  const scrollByAmount = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (!reviews || reviews.length === 0) return null;

  return (
    <div 
      className="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className={`flex overflow-x-auto gap-6 pb-6 md:pb-8 pt-4 px-6 md:px-12 custom-scrollbar ${isSingle ? 'justify-center' : ''}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {duplicatedReviews.map((review, i) => (
          <GoogleReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>

      {/* Left Fade Overlay */}
      <div className="absolute left-0 top-0 bottom-16 md:bottom-8 w-16 md:w-48 bg-gradient-to-r from-[#02050D] via-[#02050D]/80 to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Fade Overlay */}
      <div className="absolute right-0 top-0 bottom-16 md:bottom-8 w-16 md:w-48 bg-gradient-to-l from-[#02050D] via-[#02050D]/80 to-transparent z-10 pointer-events-none"></div>

      {/* Navigation Arrows */}
      {!isSingle && (
        <>
          {/* Desktop Navigation Arrows (Overlay) */}
          <button 
            onClick={() => scrollByAmount(-350)}
            aria-label="Previous review"
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-[#0A1326] border border-cyan-500/50 items-center justify-center text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-cyan-900/50 hover:border-cyan-400"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scrollByAmount(350)}
            aria-label="Next review"
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-[#0A1326] border border-cyan-500/50 items-center justify-center text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-cyan-900/50 hover:border-cyan-400"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Mobile Navigation Arrows (Below Cards, Right-Aligned) */}
          <div className="md:hidden flex justify-end gap-4 px-6 mt-2 relative z-20">
            <button 
              onClick={() => scrollByAmount(-320)}
              aria-label="Previous review"
              className="h-12 w-12 rounded-full bg-[#0A1326] border border-cyan-500/50 flex items-center justify-center text-white active:scale-95 active:bg-cyan-900/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollByAmount(320)}
              aria-label="Next review"
              className="h-12 w-12 rounded-full bg-[#0A1326] border border-cyan-500/50 flex items-center justify-center text-white active:scale-95 active:bg-cyan-900/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}

      {/* Hide default scrollbar in webkit */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
