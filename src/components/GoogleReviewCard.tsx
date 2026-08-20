/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { Star, ExternalLink, X, Quote } from 'lucide-react';

const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
};


const RichTextRenderer = ({ content, className }: { content: string, className?: string }) => {
  if (!content) return null;
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return (
    <div className={className}>
      {content.split(/(?:\\n|\n)/).map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {line.trim()}
        </React.Fragment>
      ))}
    </div>
  );
};

export interface GoogleReview {
  id: string | number;
  author: string;
  image: string;
  stars: number;
  reviewText: string;
  link: string;
}

interface Props {
  review: GoogleReview;
}

export default function GoogleReviewCard({ review }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* The Review Card */}
      <div className="flex-shrink-0 w-[320px] md:w-[400px] bg-[#060D1A] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col h-[350px] relative group hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(34,211,238,0.1)]">
        
        {/* Subtle Background Glow on Hover */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
        
        <Quote className="absolute top-5 right-5 h-8 w-8 text-white/5 group-hover:text-cyan-500/10 transition-colors duration-500 pointer-events-none" />

        <div className="flex items-center gap-4 mb-5 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping opacity-0 group-hover:opacity-75 transition-opacity"></div>
            <img 
              src={review.image} 
              alt={review.author} 
              width={56} height={56}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white/10 group-hover:border-cyan-400/50 transition-colors duration-300 relative z-10 bg-[#0A1326]"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author)}&background=0A1326&color=22D3EE`;
              }}
            />
            {/* Tiny Google Badge */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md z-20">
              <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-4 md:h-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm md:text-base group-hover:text-cyan-50 transition-colors">{review.author}</h3>
            <div className="flex items-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < review.stars ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]' : 'text-slate-600'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-grow relative z-10 flex flex-col">
          <p className="text-slate-300 font-medium text-sm md:text-base leading-relaxed line-clamp-4 relative group-hover:text-slate-200 transition-colors">
            {stripHtml(review.reviewText)}
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 text-xs md:text-sm font-bold mt-2 text-left w-fit active:scale-95 transition-transform"
          >
            Read more
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 relative z-10">
          <a 
            href={review.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-3 bg-[#0A1326] hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/30 rounded-xl transition-all duration-300 active:scale-95 group/btn"
          >
            <span className="text-xs md:text-sm font-bold text-slate-300 group-hover/btn:text-white transition-colors">View on Google</span>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover/btn:text-cyan-400 transition-colors" />
          </a>
        </div>
      </div>

      {/* The Animated Full-Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out_forwards]"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-linear-to-b from-[#060D1A] to-[#02050D] border border-cyan-900/50 w-full max-w-2xl rounded-2xl p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-[slideUpScale_0.4s_ease-out_forwards] flex flex-col max-h-full">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white active:scale-95 transition-all"
              aria-label="Close review modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-5 mb-6 md:mb-8 pr-12">
              <img 
                src={review.image} 
                alt={review.author} 
                width={80} height={80}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] bg-[#0A1326]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author)}&background=0A1326&color=22D3EE`;
                }}
              />
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white">{review.author}</h3>
                <div className="flex items-center gap-1 mt-1.5 md:mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 md:w-5 md:h-5 ${i < review.stars ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'text-slate-600'}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Body (Scrollable if text is massive) */}
            <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
              <Quote className="h-10 w-10 text-cyan-500/20 mb-4" />
              <RichTextRenderer 
                content={review.reviewText} 
                className="text-slate-200 font-medium text-base md:text-lg leading-relaxed whitespace-pre-line [&>p]:mb-4 last:[&>p]:mb-0"
              />
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 shrink-0">
              <a 
                href={review.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold text-sm md:text-base shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-[0.98] transition-all"
              >
                <span>Read Full Review on Google</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
