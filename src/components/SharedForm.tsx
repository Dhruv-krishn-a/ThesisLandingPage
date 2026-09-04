'use client';

import React, { useState } from 'react';
import { Check, Loader2, ChevronDown, AlertCircle, Lock, ArrowRight } from 'lucide-react';

interface SharedFormProps {
  formId: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  initialMessage?: string;
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

export default function SharedForm({ formId, buttonText = "Request Free Consultation", buttonIcon, initialMessage = '', onSuccess }: SharedFormProps) {
  const [countryCode, setCountryCode] = useState('+91');
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: initialMessage });
  const [touched, setTouched] = useState({ name: false, phone: false, email: false, message: false });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [prevInitialMessage, setPrevInitialMessage] = useState(initialMessage);
  if (initialMessage !== prevInitialMessage) {
    setPrevInitialMessage(initialMessage);
    if (initialMessage) {
      setFormState(prev => ({ ...prev, message: initialMessage }));
      setTouched(prev => ({ ...prev, message: true }));
    }
  }

  const isValidName = (name: string) => name.trim().length >= 3;
  const isValidEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  const isValidPhone = (phone: string, code: string) => {
    const clean = phone.replace(/\D/g, '');
    if (code === '+91') {
      return /^[6-9]\d{9}$/.test(clean);
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
    setTouched({ name: true, phone: true, email: true, message: true });

    if (!isFormValid) return;

    setSubmitStatus('loading');
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
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const getInputBorderClass = (isValid: boolean, isTouched: boolean) => {
    if (!isTouched) return "border-[#1e293b] focus:border-cyan-400 focus:bg-[#0a1428]";
    return isValid 
      ? "border-emerald-500/60 bg-emerald-500/5 focus:border-emerald-400" 
      : "border-red-500/60 bg-red-500/5 focus:border-red-400";
  };

  const defaultIcon = <ArrowRight className="h-5 w-5" />;
  const baseInputClass = "w-full bg-[#070e1e] backdrop-blur-md border rounded-xl px-4 py-4 text-white text-base focus:outline-none transition-all placeholder-slate-400 shadow-inner";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full" noValidate>
      
      {/* Full Name */}
      <div className="relative">
        <input 
          type="text" 
          id={`${formId}-name`} 
          required
          className={`${baseInputClass} ${getInputBorderClass(isValidName(formState.name), touched.name || formState.name.length > 0)}`}
          placeholder="Full Name"
          value={formState.name}
          onBlur={() => setTouched({ ...touched, name: true })}
          onChange={(e) => setFormState({...formState, name: e.target.value})}
        />
        {isValidName(formState.name) && (
          <Check className="absolute right-4 top-4 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] pointer-events-none" />
        )}
        {(touched.name || formState.name.length > 0) && !isValidName(formState.name) && (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium pl-1">
            <AlertCircle className="h-3.5 w-3.5 inline" /> Name must be at least 3 characters
          </p>
        )}
      </div>

      {/* Country Code + Phone Number */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-2.5">
          <div className="relative shrink-0 w-32 md:w-36">
            <select
              aria-label="Country Code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full h-full bg-[#070e1e] backdrop-blur-md border border-[#1e293b] rounded-xl pl-3 pr-7 py-4 text-white text-sm font-semibold focus:outline-none focus:border-cyan-400 transition-all appearance-none cursor-pointer"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code + c.country} value={c.code} className="bg-[#030712] text-white">
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative flex-1">
            <input 
              type="tel" 
              id={`${formId}-phone`} 
              required
              className={`${baseInputClass} ${getInputBorderClass(isValidPhone(formState.phone, countryCode), touched.phone || formState.phone.length > 0)}`}
              placeholder="Phone Number"
              value={formState.phone}
              maxLength={countryCode === '+91' ? 10 : 15}
              onBlur={() => setTouched({ ...touched, phone: true })}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setFormState({...formState, phone: val});
              }}
            />
            {isValidPhone(formState.phone, countryCode) && (
              <Check className="absolute right-4 top-4 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] pointer-events-none" />
            )}
          </div>
        </div>

        {(touched.phone || formState.phone.length > 0) && !isValidPhone(formState.phone, countryCode) && (
          <p className="text-xs text-red-400 mt-0.5 flex items-center gap-1 font-medium pl-1">
            <AlertCircle className="h-3.5 w-3.5 inline shrink-0" />
            {countryCode === '+91' 
              ? `Must be a valid 10-digit Indian mobile number (${formState.phone.length}/10 digits)`
              : `Must be between 7 and 15 digits`
            }
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="relative">
        <input 
          type="email" 
          id={`${formId}-email`} 
          required
          className={`${baseInputClass} ${getInputBorderClass(isValidEmail(formState.email), touched.email || formState.email.length > 0)}`}
          placeholder="Email Address"
          value={formState.email} 
          onBlur={() => setTouched({ ...touched, email: true })}
          onChange={(e) => setFormState({...formState, email: e.target.value})}
        />
        {isValidEmail(formState.email) && (
          <Check className="absolute right-4 top-4 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] pointer-events-none" />
        )}
        {(touched.email || formState.email.length > 0) && !isValidEmail(formState.email) && (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium pl-1">
            <AlertCircle className="h-3.5 w-3.5 inline" /> Enter a valid email address
          </p>
        )}
      </div>

      {/* Message */}
      <div className="relative">
        <textarea 
          id={`${formId}-message`} 
          rows={3} 
          required
          className={`${baseInputClass} resize-none ${getInputBorderClass(isValidMessage(formState.message), touched.message || formState.message.length > 0)}`}
          placeholder="Message / Research Topic"
          value={formState.message} 
          onBlur={() => setTouched({ ...touched, message: true })}
          onChange={(e) => setFormState({...formState, message: e.target.value})}
        ></textarea>
        {isValidMessage(formState.message) && (
          <Check className="absolute right-4 top-4 h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] pointer-events-none" />
        )}
        {(touched.message || formState.message.length > 0) && !isValidMessage(formState.message) && (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium pl-1">
            <AlertCircle className="h-3.5 w-3.5 inline" /> Message must be at least 5 characters
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="relative mt-2">
        <button 
          disabled={submitStatus !== 'idle'} 
          className={`w-full rounded-xl py-4 font-extrabold tracking-widest uppercase text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
            submitStatus === 'loading' 
              ? 'bg-cyan-600 text-white shadow-none' 
              : submitStatus === 'success' 
              ? 'bg-emerald-600 text-white shadow-none' 
              : submitStatus === 'error' 
              ? 'bg-red-600 text-white shadow-none' 
              : 'bg-white text-slate-950 hover:bg-cyan-50 shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:shadow-[0_0_35px_rgba(34,211,238,0.9)] active:scale-[0.99]'
          }`}
        >
          {submitStatus === 'idle' && (
            <>
              <span>{buttonText}</span>
              {buttonIcon || defaultIcon}
            </>
          )}
          {submitStatus === 'loading' && <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</>}
          {submitStatus === 'success' && <><Check className="h-5 w-5" /> Request Sent!</>}
          {submitStatus === 'error' && <>Error. Try Again.</>}
        </button>
      </div>

      {/* Confidentiality Footer Badge */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
        <Lock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        <span>Your information remains completely confidential.</span>
      </div>

    </form>
  );
}
