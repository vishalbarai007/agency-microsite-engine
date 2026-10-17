"use client";

import * as React from "react";

/*
 * Aperture Carousel — a full-bleed carousel where the next picture/video opens
 * through a circular iris that grows from wherever you click or trigger, with a hairline
 * ring riding its edge. Titles rise out of a mask, a hairline fills toward the
 * next slide, and the cursor becomes an interactive lens.
 *
 * Enhanced for both high-resolution photography and autoplaying background video slides.
 */

export type LandPalette = "dawn" | "alpine" | "dusk" | "mist";

export type Slide = {
  image?: string;
  video?: string;
  poster?: string;
  title?: string;
  caption?: string;
  alt?: string;
  projectId?: string;
  palette?: LandPalette;
  seed?: number;
};

export type ApertureCarouselProps = {
  slides?: Slide[];
  height?: number | string;
  autoplay?: number;
  duration?: number;
  ink?: string;
  plainCursor?: boolean;
  onChange?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  currentIndex?: number;
  onNavigate?: (index: number) => void;
  children?: React.ReactNode;
};

export type ApertureCarouselHandle = {
  goTo: (index: number) => void;
  go: (dir: number) => void;
  getIndex: () => number;
};

export function coverRadius(x: number, y: number, w: number, h: number): number {
  return Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
}

export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0;
}

export function sideOf(x: number, w: number): 1 | -1 {
  return x >= w / 2 ? 1 : -1;
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

const AP_CSS = `
.ap-root{position:relative;width:100%;overflow:hidden;background:#0d0d0f;color:var(--ap-ink);user-select:none;-webkit-user-select:none;touch-action:pan-y;outline:none}
.ap-root:focus-visible{box-shadow:inset 0 0 0 2px var(--ap-ink)}
@media (hover:hover) and (pointer:fine){.ap-root[data-lens='1']{cursor:none}}
.ap-layer{position:absolute;inset:0;overflow:hidden}
.ap-img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;pointer-events:none}
.ap-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}
.ap-ring{position:absolute;left:0;top:0;border-radius:50%;border:1px solid var(--ap-ink);pointer-events:none;opacity:0}
.ap-shade{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,23,42,0.92) 0%,rgba(15,23,42,0.45) 50%,rgba(15,23,42,0.7) 100%);pointer-events:none}
.ap-text{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 clamp(20px,6vw,80px);pointer-events:none;z-index:10;transform:translateY(-24px)}
.ap-line{display:block}
.ap-line>span{display:block;animation:ap-reveal .8s cubic-bezier(.16,1,.3,1) both}
.ap-title{font-family:'Cormorant Garamond','Playfair Display','Didot',Georgia,serif;font-size:clamp(36px,6.2vw,86px);font-weight:300;font-style:italic;line-height:1.1;letter-spacing:0.01em;text-transform:none;color:#ffffff;text-shadow:0 4px 28px rgba(0,0,0,0.85),0 2px 10px rgba(0,0,0,0.9)}
.ap-cap{margin-top:14px;font-size:clamp(13px,1.25vw,17px);font-weight:300;line-height:1.6;letter-spacing:0.04em;color:rgba(255,255,255,0.88);max-width:64ch;text-shadow:0 2px 14px rgba(0,0,0,0.95)}
.ap-cap>span{animation-delay:.1s}
.ap-count{position:absolute;right:clamp(20px,4vw,56px);top:clamp(90px,12vh,110px);font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.18em;pointer-events:none;z-index:10;color:rgba(255,255,255,0.7);background:rgba(255,255,255,0.08);padding:6px 12px;border-radius:9999px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12)}
.ap-root[data-paused='1'] .ap-fill{animation-play-state:paused}
.ap-lens{position:absolute;left:0;top:0;width:72px;height:72px;margin:-36px 0 0 -36px;border-radius:50%;border:1px solid var(--ap-ink);display:grid;place-items:center;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;pointer-events:none;opacity:0;transition:opacity .25s ease;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:30;background:rgba(15,23,42,0.35)}
.ap-lens[data-on='1']{opacity:1}
.ap-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@keyframes ap-reveal{from{opacity:0;transform:translateY(24px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes ap-fill{to{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){.ap-line>span{animation:none}}
`;

export const ApertureCarousel = React.forwardRef<ApertureCarouselHandle, ApertureCarouselProps>(
  function ApertureCarousel(
    {
      slides = [],
      height = "100svh",
      autoplay = 5000,
      duration = 1100,
      ink = "#ffffff",
      plainCursor = false,
      onChange,
      className,
      style,
      ariaLabel = "Real Estate Showcase Carousel",
      currentIndex,
      onNavigate,
      children,
    },
    ref
  ) {
    const n = slides.length;
    const [internalIndex, setInternalIndex] = React.useState(0);
    const activeIndex = currentIndex !== undefined ? currentIndex : internalIndex;

    const [incoming, setIncoming] = React.useState<null | { to: number; x: number; y: number; id: number }>(null);
    const [paused, setPaused] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const layerRef = React.useRef<HTMLDivElement | null>(null);
    const ringRef = React.useRef<HTMLDivElement | null>(null);
    const lensRef = React.useRef<HTMLDivElement | null>(null);
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const busy = React.useRef(false);
    const down = React.useRef<null | { x: number; y: number }>(null);
    const [lensOn, setLensOn] = React.useState(false);
    const [lensLabel, setLensLabel] = React.useState("Next");

    const go = React.useCallback(
      (dir: number, x?: number, y?: number) => {
        const root = rootRef.current;
        if (!root || busy.current || n < 2) return;
        const w = root.clientWidth;
        const h = root.clientHeight;
        const targetIndex = wrap(activeIndex + dir, n);
        busy.current = true;
        onChange?.(targetIndex);
        onNavigate?.(targetIndex);
        setIncoming({
          to: targetIndex,
          x: x ?? (dir > 0 ? w * 0.85 : w * 0.15),
          y: y ?? h * 0.5,
          id: Date.now(),
        });
      },
      [activeIndex, n, onChange, onNavigate]
    );

    const goTo = React.useCallback(
      (targetIndex: number) => {
        const root = rootRef.current;
        if (!root || busy.current || targetIndex === activeIndex || targetIndex < 0 || targetIndex >= n) return;
        const w = root.clientWidth;
        const h = root.clientHeight;
        busy.current = true;
        onChange?.(targetIndex);
        onNavigate?.(targetIndex);
        setIncoming({
          to: targetIndex,
          x: targetIndex > activeIndex ? w * 0.85 : w * 0.15,
          y: h * 0.5,
          id: Date.now(),
        });
      },
      [activeIndex, n, onChange, onNavigate]
    );

    // Expose imperative API to parent components
    React.useImperativeHandle(
      ref,
      () => ({
        goTo,
        go,
        getIndex: () => activeIndex,
      }),
      [goTo, go, activeIndex]
    );

    // Open the iris once the incoming layer is in the DOM
    React.useLayoutEffect(() => {
      const root = rootRef.current;
      const layer = layerRef.current;
      const ring = ringRef.current;
      if (!incoming || !root || !layer) return;
      const w = root.clientWidth;
      const h = root.clientHeight;
      const R = coverRadius(incoming.x, incoming.y, w, h);
      const at = ` at ${incoming.x}px ${incoming.y}px)`;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const ease = "cubic-bezier(.7,0,.2,1)";
      const anims: Animation[] = [];

      if (reduce) {
        anims.push(layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: "both" }));
      } else {
        anims.push(
          layer.animate(
            [{ clipPath: `circle(0px${at}` }, { clipPath: `circle(${R}px${at}` }],
            { duration, easing: ease, fill: "both" }
          )
        );
        const media = layer.firstElementChild as HTMLElement | null;
        if (media) {
          anims.push(
            media.animate(
              [{ transform: "scale(1.15)" }, { transform: "scale(1)" }],
              { duration: duration * 1.25, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" }
            )
          );
        }
        if (ring) {
          ring.style.width = ring.style.height = `${R * 2}px`;
          anims.push(
            ring.animate(
              [
                { transform: `translate(${incoming.x - R}px, ${incoming.y - R}px) scale(0)`, opacity: 1 },
                { opacity: 1, offset: 0.7 },
                { transform: `translate(${incoming.x - R}px, ${incoming.y - R}px) scale(1)`, opacity: 0 },
              ],
              { duration, easing: ease, fill: "both" }
            )
          );
        }
      }

      let done = false;
      anims[0].onfinish = () => {
        done = true;
        setInternalIndex(incoming.to);
        onNavigate?.(incoming.to);
        onChange?.(incoming.to);
        setIncoming(null);
        busy.current = false;
      };

      return () => {
        if (!done) busy.current = false;
        anims.forEach((a) => a.cancel());
      };
    }, [incoming, duration, onChange, onNavigate]);

    // Off-screen pause detection
    React.useEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      let seen = true;
      const sync = () => setPaused(!seen || document.hidden);
      const io = new IntersectionObserver(([e]) => {
        seen = e.isIntersecting;
        sync();
      });
      io.observe(root);
      document.addEventListener("visibilitychange", sync);
      return () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", sync);
      };
    }, []);

    // Automatic fallback advance for video slides (in case video stalls or ends)
    React.useEffect(() => {
      const currentSlide = slides[activeIndex];
      if (!currentSlide || !currentSlide.video) return;

      if (videoRef.current) {
        try {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        } catch {
          // ignore playback error on unmounted elements
        }
      }

      const fallbackTimer = setTimeout(() => {
        if (!busy.current) {
          go(1);
        }
      }, 12000); // 12 seconds max duration per video slide

      return () => clearTimeout(fallbackTimer);
    }, [activeIndex, slides, go]);

    const local = (e: React.PointerEvent) => {
      const r = rootRef.current!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width };
    };

    const onMove = (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse" || plainCursor) return;
      // If pointer is over interactive bottom element, don't show lens
      const target = e.target as HTMLElement;
      if (target.closest("[data-no-lens='1']")) {
        if (lensOn) setLensOn(false);
        return;
      }
      const p = local(e);
      const lens = lensRef.current;
      if (lens) lens.style.transform = `translate(${p.x}px, ${p.y}px)`;
      const label = sideOf(p.x, p.w) > 0 ? "Next" : "Prev";
      if (label !== lensLabel) setLensLabel(label);
      if (!lensOn) setLensOn(true);
    };

    const onDown = (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-no-lens='1']")) return;
      down.current = { x: e.clientX, y: e.clientY };
    };

    const onUp = (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-no-lens='1']")) return;
      const start = down.current;
      down.current = null;
      if (!start) return;
      const p = local(e);
      const dx = e.clientX - start.x;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - start.y)) {
        go(dx < 0 ? 1 : -1, p.x, p.y);
      } else if (Math.abs(dx) < 8) {
        go(sideOf(p.x, p.w), p.x, p.y);
      }
    };

    const onKey = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else return;
      e.preventDefault();
    };

    const shown = incoming ? incoming.to : activeIndex;
    const currentSlide = slides[shown] || {};
    const isVideoSlide = Boolean(currentSlide.video);
    // Image slides use activeAutoplay (5000ms by default), video slides use onEnded / fallback
    const activeAutoplay = isVideoSlide ? 0 : (autoplay || 5000);
    const runFill = activeAutoplay > 0 && n > 1 && !incoming;

    return (
      <div
        ref={rootRef}
        className={["ap-root", className].filter(Boolean).join(" ")}
        style={{ height, ["--ap-ink" as string]: ink, ["--ap-dur" as string]: `${activeAutoplay}ms`, ...style }}
        data-paused={paused ? "1" : "0"}
        data-lens={plainCursor ? "0" : "1"}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKey}
        onPointerMove={onMove}
        onPointerLeave={() => setLensOn(false)}
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        <style>{AP_CSS}</style>

        {/* Base Layer: Current Slide Media */}
        <div className="ap-layer">
          {slides[activeIndex]?.video ? (
            <video
              ref={videoRef}
              key={slides[activeIndex].video}
              src={slides[activeIndex].video}
              poster={slides[activeIndex].poster || slides[activeIndex].image}
              className="ap-video"
              autoPlay
              muted
              playsInline
              onEnded={() => go(1)}
            />
          ) : slides[activeIndex]?.image ? (
            <img
              className="ap-img"
              src={slides[activeIndex].image}
              alt={slides[activeIndex]?.alt || slides[activeIndex]?.title || ""}
              draggable={false}
            />
          ) : null}
        </div>

        {/* Incoming Iris Reveal Layer */}
        {incoming ? (
          <div ref={layerRef} className="ap-layer" key={incoming.id} style={{ clipPath: "circle(0px at 0 0)" }}>
            {slides[incoming.to]?.video ? (
              <video
                src={slides[incoming.to].video}
                poster={slides[incoming.to].poster || slides[incoming.to].image}
                className="ap-video"
                autoPlay
                muted
                playsInline
                onEnded={() => go(1)}
              />
            ) : slides[incoming.to]?.image ? (
              <img className="ap-img" src={slides[incoming.to].image} alt="" draggable={false} />
            ) : null}
          </div>
        ) : null}

        {/* Circular Iris hairline ring */}
        <div ref={ringRef} className="ap-ring" aria-hidden="true" />

        {/* Gradient dark shade for high-contrast reading */}
        <div className="ap-shade" aria-hidden="true" />

        {/* Centered Editorial Title & Subtitle */}
        <div className="ap-text" key={`t${shown}`} aria-hidden="true">
          {currentSlide.title ? (
            <span className="ap-line ap-title">
              <span>{currentSlide.title}</span>
            </span>
          ) : null}
          {currentSlide.caption ? (
            <span className="ap-line ap-cap">
              <span>{currentSlide.caption}</span>
            </span>
          ) : null}
        </div>

        {/* Top Slide Counter */}
        <div className="ap-count" aria-hidden="true">
          {pad2(shown + 1)} / {pad2(n)}
        </div>



        {/* Custom Interactive Lens Cursor */}
        {!plainCursor && (
          <div ref={lensRef} className="ap-lens" data-on={lensOn ? "1" : "0"} aria-hidden="true">
            {lensLabel}
          </div>
        )}

        {/* Static Bottom Elements (Project Thumbnails Switcher & Scroll Cue) */}
        {children}

        <div className="ap-sr" aria-live="polite">
          {`Slide ${shown + 1} of ${n}${currentSlide.title ? `: ${currentSlide.title}` : ""}`}
        </div>
      </div>
    );
  }
);

export default ApertureCarousel;
