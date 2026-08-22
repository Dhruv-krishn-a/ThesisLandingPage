'use client';

import React, { useState } from 'react';
import { Check, Loader2, Send, ChevronDown, AlertCircle } from 'lucide-react';

interface SharedFormProps {
  formId: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onSuccess?: () => void;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', label: '🇮🇳 +91 (India)' },
  { code: '+1', country: 'US', label: '🇺🇸 +1 (USA)' },
  { code: '+44', country: 'GB', label: '🇬🇧 +44 (UK)' },
  { code: '+61', country: 'AU', label: '🇦🇺 +61 (Australia)' },
  { code: '+971', country: 'AE', label: '🇦🇪 +971 (UAE)' },
  { code: '+966', country: 'SA', label: '🇸🇦 +966 (Saudi Arabia)' },
  { code: '+65', country: 'SG', label: '🇸🇬 +65 (Singapore)' },
  { code: '+49', country: 'DE', label: '🇩🇪 +49 (Germany)' },
  { code: '+1', country: 'CA', label: '🇨🇦 +1 (Canada)' },
];

export default function SharedForm({ formId, buttonText = "Submit", buttonIcon, onSuccess }: SharedFormProps) {
  const [countryCode, setCountryCode] = useState('+91');
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, phone: false, email: false, message: false });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Real-time Validation Functions
  const isValidName = (name: string) => name.trim().length >= 3;
  const isValidEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  const isValidPhone = (phone: string, code: string) => {
    const clean = phone.replace(/\D/g, '');
    if (code === '+91') {
      return /^[6-9]\d{9}$/.test(clean); // Exactly 10 digits starting with 6-9 for India
    }
    return clean.length >= 7 && clean.length <= 15;
  };
  const isValidMessage = (message: string) => message.trim().length >= 5;

  const isFormValid = isValidName(formState.name) && 
                      isValidPhone(formState.phone, countryCode) && 
                      isValidEmail(formState.email) && 
                      isValidMessage(formState.message);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched on submit attempt
    setTouched({ name: true, phone: true, email: true, message: true });

    if (!isFormValid) return;

    setSubmitStatus('loading');

    // Concatenate countryCode and phone number into the same "phone" field
    const concatenatedPhone = `${countryCode} ${formState.phone.trim()}`;

    const payload = {
      name: formState.name.trim(),
      phone: concatenatedPhone,
      email: formState.email.trim(),
      message: formState.message.trim(),
      source: `Thesis - ${formId}`
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', phone: '', email: '', message: '' });
        setTouched({ name: false, phone: false, email: false, message: false });
        if (onSuccess) onSuccess();
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

  const getInputBorderClass = (isValid: boolean, isTouched: boolean) => {
    if (!isTouched) return "border-white/10 focus:border-amber-500/80 focus:bg-white/10";
    return isValid 
      ? "border-emerald-500/60 bg-emerald-500/5 focus:border-emerald-400 focus:bg-white/10" 
      : "border-red-500/60 bg-red-500/5 focus:border-red-400 focus:bg-white/10";
  };

  const defaultIcon = <Send className="h-4 w-4" />;
  const baseInputClass = "peer w-full bg-white/5 backdrop-blur-md border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none transition-all z-10 relative placeholder-transparent shadow-inner";
  const labelClass = "absolute left-4 top-3.5 text-stone-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[10px] peer-focus:px-2 peer-focus:bg-[#0a0a0a]/90 peer-focus:backdrop-blur-md peer-focus:rounded peer-focus:text-amber-400 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:bg-[#0a0a0a]/90 peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded peer-not-placeholder-shown:text-amber-400 pointer-events-none z-20";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full" noValidate>
      
      {/* Full Name */}
      <div className="relative group/input">
        <input 
          type="text" id={`${formId}-name`} required
          className={`${baseInputClass} ${getInputBorderClass(isValidName(formState.name), touched.name || formState.name.length > 0)}`}
          placeholder="Full Name"
          value={formState.name}
          onBlur={() => setTouched({ ...touched, name: true })}
          onChange={(e) => setFormState({...formState, name: e.target.value})}
        />
        <label htmlFor={`${formId}-name`} className={labelClass}>Full Name</label>
        
        {isValidName(formState.name) && (
          <Check className="absolute right-3 top-3.5 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] z-20" />
        )}
        {(touched.name || formState.name.length > 0) && !isValidName(formState.name) && (
          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-medium pl-1">
            <AlertCircle className="h-3 w-3 inline" /> Name must be at least 3 characters
          </p>
        )}
      </div>

      {/* Country Code + Phone Number */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <div className="relative shrink-0 w-32">
            <select
              aria-label="Country Code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl pl-2.5 pr-7 py-3.5 text-white text-xs font-medium focus:outline-none focus:border-amber-500/80 transition-all appearance-none cursor-pointer"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code + c.country} value={c.code} className="bg-[#0a0a0a] text-white">
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
          </div>

          <div className="relative group/input flex-1">
            <input 
              type="tel" id={`${formId}-phone`} required
              className={`${baseInputClass} ${getInputBorderClass(isValidPhone(formState.phone, countryCode), touched.phone || formState.phone.length > 0)}`}
              placeholder="Phone Number"
              value={formState.phone}
              maxLength={countryCode === '+91' ? 10 : 15}
              onBlur={() => setTouched({ ...touched, phone: true })}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ''); // Digits only
                setFormState({...formState, phone: val});
              }}
            />
            <label htmlFor={`${formId}-phone`} className={labelClass}>Phone Number</label>
            
            {isValidPhone(formState.phone, countryCode) && (
              <Check className="absolute right-3 top-3.5 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] z-20" />
            )}
          </div>
        </div>

        {/* Live Phone Helper / Validation Error Text */}
        {(touched.phone || formState.phone.length > 0) && !isValidPhone(formState.phone, countryCode) && (
          <p className="text-[11px] text-red-400 mt-0.5 flex items-center gap-1 font-medium pl-1">
            <AlertCircle className="h-3 w-3 inline shrink-0" />
            {countryCode === '+91' 
              ? `Must be a valid 10-digit Indian mobile number (${formState.phone.length}/10 digits)`
              : `Must be between 7 and 15 digits (${formState.phone.length} digits entered)`
            }
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="relative group/input">
        <input 
          type="email" id={`${formId}-email`} required
          className={`${baseInputClass} ${getInputBorderClass(isValidEmail(formState.email), touched.email || formState.email.length > 0)}`}
          placeholder="Email Address"
          value={formState.email} 
          onBlur={() => setTouched({ ...touched, email: true })}
          onChange={(e) => setFormState({...formState, email: e.target.value})}
        />
        <label htmlFor={`${formId}-email`} className={labelClass}>Email Address</label>
        
        {isValidEmail(formState.email) && (
          <Check className="absolute right-3 top-3.5 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] z-20" />
        )}
        {(touched.email || formState.email.length > 0) && !isValidEmail(formState.email) && (
          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-medium pl-1">
            <AlertCircle className="h-3 w-3 inline" /> Enter a valid email address (e.g. name@domain.com)
          </p>
        )}
      </div>

      {/* Message */}
      <div className="relative group/input">
        <textarea 
          id={`${formId}-message`} rows={3} required
          className={`${baseInputClass} resize-none ${getInputBorderClass(isValidMessage(formState.message), touched.message || formState.message.length > 0)}`}
          placeholder="Message"
          value={formState.message} 
          onBlur={() => setTouched({ ...touched, message: true })}
          onChange={(e) => setFormState({...formState, message: e.target.value})}
        ></textarea>
        <label htmlFor={`${formId}-message`} className={labelClass}>Message / Research Topic</label>
        
        {isValidMessage(formState.message) && (
          <Check className="absolute right-3 top-3.5 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] z-20" />
        )}
        {(touched.message || formState.message.length > 0) && !isValidMessage(formState.message) && (
          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-medium pl-1">
            <AlertCircle className="h-3 w-3 inline" /> Message must be at least 5 characters
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="relative mt-2 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-900 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-1000 group-hover:duration-300 pointer-events-none"></div>
        <button 
          disabled={submitStatus !== 'idle'} 
          className={`relative w-full rounded-xl py-4 font-bold tracking-widest uppercase text-sm transition-all duration-500 flex items-center justify-center gap-2 border overflow-hidden ${submitStatus !== 'idle' ? 'text-white border-transparent' : 'bg-[#0a0a0a] border-amber-500/30 text-amber-50 hover:border-amber-400 hover:shadow-[0_0_40px_rgba(217,119,6,0.3)] active:scale-[0.98]'}`}
        >
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
