"use client";

import React, { useRef, useState, useEffect } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize, Calendar, Download, MessageSquare } from "lucide-react";

interface BrandFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export function BrandFilmModal({
  isOpen,
  onClose,
  onOpenBooking,
  onOpenBrochure
}: BrandFilmModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    } else {
      document.body.style.overflow = "unset";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#265CA0] animate-pulse" />
            <span className="font-heading text-lg font-bold text-slate-900 tracking-tight">
              The HUM Legacy &bull; Cinematic Brand Film
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-[#265CA0] font-bold px-2 py-0.5 bg-[#EBF3FC] rounded">
              Mumbai Showcase
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close Brand Film"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black group overflow-hidden">
          <video
            ref={videoRef}
            src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Timelapse_at_Marine_Drive_Mumbai.webm"
            className="w-full h-full object-cover"
            playsInline
            loop
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
          />

          {/* Video Control Bar Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-6 flex flex-col gap-2 transition-opacity duration-300">
            {/* Progress Bar */}
            <div
              onClick={handleSeek}
              className="w-full h-1.5 bg-white/30 hover:h-2.5 rounded-full cursor-pointer relative transition-all"
            >
              <div
                className="h-full bg-[#265CA0] rounded-full relative"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between text-white text-xs pt-1">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 hover:text-[#60A5FA] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 hover:text-[#60A5FA] transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <span className="text-[11px] uppercase tracking-wider text-slate-200 hidden sm:inline font-semibold">
                  Mumbai Horizons &amp; Signature Residences
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1.5 hover:text-[#60A5FA] transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-heading text-base font-bold text-slate-900">HUM Developers &mdash; Mumbai</div>
            <div className="text-xs text-slate-500">
              Over 20 Years of Timely Delivery &bull; Kandivali (W) &bull; Borivali (W)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="brandFilledBtn text-xs py-2.5 px-4"
            >
              <Calendar className="w-3.5 h-3.5 mr-1" />
              Book Private Viewing
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBrochure();
              }}
              className="brandBorderBtn text-xs py-2.5 px-4"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Get E-Brochure
            </button>

            <a
              href="https://wa.me/919920061100?text=Hi%20HUM%20Developers,%20I%20just%20watched%20the%20brand%20film%20and%20would%20like%20to%20inquire%20about%20your%20luxury%20residences."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors rounded text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
