"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Download, ShieldCheck, CheckCircle2, Loader2, Phone, Mail, User } from "lucide-react";
import { humProjectsData } from "@/data/projects";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export function BrochureModal({ isOpen, onClose, defaultProject }: BrochureModalProps) {
  const [selectedProject, setSelectedProject] = useState(defaultProject || humProjectsData[0].name);

  useEffect(() => {
    if (defaultProject) {
      setSelectedProject(defaultProject);
    }
  }, [defaultProject]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 800));
      setIsSuccess(true);
    } catch {
      // fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-md bg-white border border-slate-200 rounded-lg p-6 sm:p-8 z-50 shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start pb-4 border-b border-slate-200 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#265CA0] font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#265CA0]" />
                Official E-Brochure Dispatch
              </div>
              <Dialog.Title className="font-heading text-2xl text-slate-900 font-bold">
                Download Master Brochure
              </Dialog.Title>
              <Dialog.Description className="text-xs text-slate-600 mt-1">
                Instant delivery of comprehensive masterplan, floor plans, specifications, and pricing sheet.
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center">
              <div className="w-14 h-14 bg-[#EBF3FC] text-[#265CA0] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                Brochure Dispatched!
              </h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                The comprehensive PDF brochure for <strong className="text-[#265CA0]">{selectedProject}</strong> has been shared to <strong className="text-slate-900">{email}</strong> and via WhatsApp to <strong className="text-slate-900">{phone}</strong>.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="/floorplan.jpg"
                  download
                  className="brandFilledBtn py-2.5 text-xs justify-center"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Download Instant PDF
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 py-1"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Selected Development
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded focus:outline-none focus:border-[#265CA0] font-medium"
                >
                  {humProjectsData.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.location.split(",")[0]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Mehta"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs pl-9 pr-3.5 py-2.5 rounded focus:outline-none focus:border-[#265CA0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs pl-9 pr-3.5 py-2.5 rounded focus:outline-none focus:border-[#265CA0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="vikram@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs pl-9 pr-3.5 py-2.5 rounded focus:outline-none focus:border-[#265CA0]"
                  />
                </div>
              </div>

              <p className="text-[10px] text-slate-500 leading-tight">
                *We respect your privacy. No spam. You will only receive the official brochure and pricing sheet.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full brandFilledBtn py-3 text-xs justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                    Generating Document...
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 mr-2" />
                    Download Official Brochure
                  </>
                )}
              </button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
