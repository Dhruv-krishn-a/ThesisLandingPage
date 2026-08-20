'use client';

import React, { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';

interface SharedFormProps {
  formId: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onSuccess?: () => void;
}

export default function SharedForm({ formId, buttonText = "Submit", buttonIcon, onSuccess }: SharedFormProps) {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, source: `Thesis - ${formId}` }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', phone: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const defaultIcon = <Send className="h-4 w-4" />;
  const inputClass = "peer w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-amber-500/80 focus:bg-white/10 transition-all z-10 relative placeholder-transparent shadow-inner";
  const labelClass = "absolute left-4 top-4 text-stone-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[10px] peer-focus:px-2 peer-focus:bg-[#0a0a0a]/80 peer-focus:backdrop-blur-md peer-focus:rounded peer-focus:text-amber-400 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:bg-[#0a0a0a]/80 peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded peer-not-placeholder-shown:text-amber-400 pointer-events-none z-20";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="relative group/input">
        <input 
          type="text" id={`${formId}-name`} required
          className={inputClass} placeholder="Full Name"
          value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})}
        />
        <label htmlFor={`${formId}-name`} className={labelClass}>Full Name</label>
        {formState.name.length > 2 && <Check className="absolute right-3 top-4 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] z-20" />}
      </div>

      <div className="relative group/input">
        <input 
          type="tel" id={`${formId}-phone`} required
          className={inputClass} placeholder="Phone Number"
          value={formState.phone} onChange={(e) => setFormState({...formState, phone: e.target.value})}
        />
        <label htmlFor={`${formId}-phone`} className={labelClass}>Phone Number</label>
        {formState.phone.length > 6 && <Check className="absolute right-3 top-4 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] z-20" />}
      </div>

      <div className="relative group/input">
        <input 
          type="email" id={`${formId}-email`} required
          className={inputClass} placeholder="Email Address"
          value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})}
        />
        <label htmlFor={`${formId}-email`} className={labelClass}>Email Address</label>
        {isValidEmail(formState.email) && <Check className="absolute right-3 top-4 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] z-20" />}
      </div>

      <div className="relative group/input">
        <textarea 
          id={`${formId}-message`} rows={3} required
          className={`${inputClass} resize-none`} placeholder="Message"
          value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})}
        ></textarea>
        <label htmlFor={`${formId}-message`} className={labelClass}>Message / Research Topic</label>
        {formState.message.length > 5 && <Check className="absolute right-3 top-4 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] z-20" />}
      </div>

      <div className="relative mt-4 group">
        {/* Ambient glow behind button */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-900 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-1000 group-hover:duration-300 pointer-events-none"></div>
        <button 
          disabled={submitStatus !== 'idle'} 
          className={`relative w-full rounded-xl py-4 font-bold tracking-widest uppercase text-sm transition-all duration-500 flex items-center justify-center gap-2 border overflow-hidden ${submitStatus !== 'idle' ? 'text-white border-transparent' : 'bg-[#0a0a0a] border-amber-500/30 text-amber-50 hover:border-amber-400 hover:shadow-[0_0_40px_rgba(217,119,6,0.3)] active:scale-[0.98]'}`}
        >
          {/* Shimmer sweep effect */}
          {submitStatus === 'idle' && <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-amber-100/10 to-transparent group-hover:animate-shimmer pointer-events-none"></div>}
          
          {submitStatus === 'loading' && <div className="absolute inset-0 bg-amber-600 rounded-xl"></div>}
          {submitStatus === 'success' && <div className="absolute inset-0 bg-emerald-600 rounded-xl"></div>}
          {submitStatus === 'error' && <div className="absolute inset-0 bg-red-600 rounded-xl"></div>}
          
          <span className="relative z-10 flex items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-300">
            {submitStatus === 'idle' && <>{buttonText} {buttonIcon || defaultIcon}</>}
            {submitStatus === 'loading' && <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</>}
            {submitStatus === 'success' && <><Check className="h-5 w-5" /> Request Sent!</>}
            {submitStatus === 'error' && <>Error. Try Again.</>}
          </span>
        </button>
      </div>
    </form>
  );
}
