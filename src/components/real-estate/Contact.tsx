"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, ChevronDown, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

interface ContactProps {
  onOpenBooking?: (projectName?: string) => void;
}

export function Contact({ onOpenBooking }: ContactProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setResidenceType("");
    setMessage("");
    setIsSuccess(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#FFFFFF] text-slate-900 border-t border-slate-200 overflow-hidden"
    >
      {/* Background Architectural Texture (Repeat, 40% Opacity) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-repeat"
        style={{
          backgroundImage: "url('/Image/bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ================================================================ */}
          {/* LEFT COLUMN: Heading & Quick Contact Information                  */}
          {/* ================================================================ */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-[#265CA0]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#265CA0] font-bold">
                  GET IN TOUCH
                </span>
              </div>

              {/* Editorial Heading */}
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-normal tracking-tight leading-[1.1] mb-6">
                Begin Your Journey <br />
                at <span className="italic font-normal text-[#265CA0]">HUM Emerald.</span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md mb-10">
                Schedule a site visit, request a floor plan, or simply ask us anything. Our team is ready to guide you home.
              </p>
            </div>

            {/* Quick Contact Links */}
            <div className="space-y-6 pt-2">
              {/* Call Us */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-0 border border-slate-300 flex items-center justify-center text-[#265CA0] bg-white shadow-sm shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold block mb-0.5">
                    CALL US
                  </span>
                  <a
                    href="tel:+918976764979"
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#265CA0] transition-colors"
                  >
                    +91 89767 64979
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-0 border border-slate-300 flex items-center justify-center text-[#265CA0] bg-white shadow-sm shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold block mb-0.5">
                    WHATSAPP
                  </span>
                  <a
                    href="https://wa.me/918976764979?text=Hi%2C%20I%20am%20interested%20in%20HUM%20Emerald%20Heights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#265CA0] transition-colors"
                  >
                    Chat with our team
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* RIGHT COLUMN: Minimalist Luxury Inquiry Form                      */}
          {/* ================================================================ */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-sm border border-slate-200 p-8 sm:p-12 shadow-sm rounded-0">
            {isSuccess ? (
              <div className="py-12 sm:py-16 text-center">
                <div className="w-16 h-16 bg-[#EBF3FC] text-[#265CA0] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                  Enquiry Successfully Received
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-8">
                  Thank you for your interest in <strong className="font-semibold text-slate-900">HUM Emerald Heights</strong>. Our senior residential advisor will connect with you within 4 hours.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 text-xs font-bold uppercase tracking-wider transition-colors rounded-0"
                  >
                    Send Another Enquiry
                  </button>
                  {onOpenBooking && (
                    <button
                      type="button"
                      onClick={() => onOpenBooking("HUM Emerald Heights")}
                      className="px-6 py-3 bg-[#265CA0] hover:bg-[#1E4B82] text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-0 shadow-md flex items-center gap-2"
                    >
                      <span>Book VIP Site Visit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Two Column Row: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-slate-600 block mb-2">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-slate-300 focus:border-[#265CA0] pb-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-slate-600 block mb-2">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className="w-full bg-transparent border-b border-slate-300 focus:border-[#265CA0] pb-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-slate-600 block mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-slate-300 focus:border-[#265CA0] pb-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Residence Type Select */}
                <div>
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-slate-600 block mb-2">
                    I AM INTERESTED IN
                  </label>
                  <div className="relative">
                    <select
                      value={residenceType}
                      onChange={(e) => setResidenceType(e.target.value)}
                      className="w-full bg-transparent border-b border-slate-300 focus:border-[#265CA0] pb-2 text-sm sm:text-base text-slate-900 focus:outline-none transition-colors appearance-none cursor-pointer pr-8"
                    >
                      <option value="" disabled className="text-slate-400">
                        Select residence type
                      </option>
                      <option value="1 BHK Smart Luxe Residence">1 BHK Smart Luxe Residence</option>
                      <option value="2 BHK Grand Family Suite">2 BHK Grand Family Suite</option>
                      <option value="3 BHK Presidential Sky Suite">3 BHK Presidential Sky Suite</option>
                      <option value="Jodi / Combined Layout">Jodi / Combined Layout</option>
                      <option value="Penthouse / Sky Villa">Penthouse / Sky Villa</option>
                      <option value="General Project Enquiry">General Project Enquiry</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 bottom-3 pointer-events-none" />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-slate-600 block mb-2">
                    MESSAGE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any specific requirements or questions?"
                    className="w-full bg-transparent border-b border-slate-300 focus:border-[#265CA0] pb-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 bg-[#265CA0] hover:bg-[#1E4B82] text-white font-bold text-xs sm:text-sm uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 rounded-0 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <span>SEND ENQUIRY</span>
                    )}
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] text-slate-500 text-center font-normal">
                  By submitting, you consent to being contacted by HUM Developers.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
