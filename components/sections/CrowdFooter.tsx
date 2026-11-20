"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

interface Walker {
  cell: number;
  layer: number; // 0 = rear canvas, 1 = front canvas
  h: number;
  w: number;
  baseline: number;
  speed: number;
  phase: number;
  direction: 1 | -1; // 1 = moving right, -1 = moving left
}

// GLSL pseudo-random hash for deterministic, jitter-free randomization
const hash = (e: number): number => {
  const t = 43758.5453 * Math.sin(127.1 * e + 311.7);
  return t - Math.floor(t);
};

// Pedestrian scale factors (adults: 1.0, kids: 0.7, teens: 0.95)
const CROWD_SCALES: number[] = Array.from({ length: 105 }, (_, i) => {
  if (i >= 60 && i < 75) return 0.7; // sheet 5: children
  if (i >= 75 && i < 90) return 0.95; // sheet 6: teenagers
  return 1.0; // sheets 1-4, 7: adults
});

export function CrowdFooter() {
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const sceneBtnRef = useRef<HTMLButtonElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const rearCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);

  const animStateRef = useRef<{
    paused: boolean;
    reduced: boolean;
    sync: () => void;
  }>({
    paused: false,
    reduced: false,
    sync: () => {},
  });

  // Keep state ref in sync
  useEffect(() => {
    animStateRef.current.paused = isPaused;
    animStateRef.current.reduced = isReducedMotion;
    animStateRef.current.sync();
  }, [isPaused, isReducedMotion]);

  // Handle prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setIsReducedMotion(mq.matches);
    updateMotion();
    mq.addEventListener("change", updateMotion);
    return () => mq.removeEventListener("change", updateMotion);
  }, []);

  // Smooth scroll back to hero
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: isReducedMotion ? "instant" : "smooth",
    });
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isReducedMotion) return;
    setIsPaused((prev) => !prev);
  };

  // ── CORE ANIMATION ENGINE ──
  useEffect(() => {
    const sceneBtn = sceneBtnRef.current;
    const portraitImg = portraitImgRef.current;
    const rearCanvas = rearCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;

    if (!sceneBtn || !portraitImg || !rearCanvas || !frontCanvas) return;

    const canvases = [rearCanvas, frontCanvas];
    const contexts = canvases.map((c) => c.getContext("2d"));
    if (!contexts[0] || !contexts[1]) return;

    const animState = animStateRef.current;

    // Sprite sheets: crowd-01.webp through crowd-07.webp (total 105 pedestrians)
    const sheetUrls = Array.from(
      { length: 7 },
      (_, t) => `/footer/bengaluru/crowd-${String(t + 1).padStart(2, "0")}.webp`
    );

    const sheetImages = sheetUrls.map((url) => {
      const img = new window.Image();
      img.src = url;
      return img;
    });

    let isDestroyed = false;
    let isImagesLoaded = false;
    let isIntersecting = false;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let elapsedVirtual = 0;
    let lastTimestamp = 0;
    let rafId = 0;
    let maxWalkerWidth = 0;
    let travelSpan = 0;
    let walkers: Walker[] = [];

    // Render all walkers
    const render = () => {
      contexts.forEach((ctx) => {
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
      });

      walkers.forEach((walker) => {
        const t = walker.phase + (elapsedVirtual * walker.speed) / 10;
        const cycle = Math.floor(t);
        const subPhase = t - cycle;

        // Wrap cell dynamically across the 105 sprites
        const spriteIdx = (walker.cell + 37 * cycle) % 105;
        const sheetIdx = Math.floor(spriteIdx / 15);
        const cellIdx = spriteIdx % 15;
        const sheet = sheetImages[sheetIdx] || sheetImages[0];

        if (!sheet || !sheet.naturalWidth) return;

        const cellW = sheet.naturalWidth / 5;
        const cellH = sheet.naturalHeight / 3;
        const spriteScale = CROWD_SCALES[spriteIdx] ?? 1.0;

        // Horizontal position
        const posX =
          (walker.direction === 1 ? subPhase : 1 - subPhase) * travelSpan -
          maxWalkerWidth;

        // Subtle sinusoidal bobbing (0 to 10px twice per second)
        const bob =
          (1 -
            Math.cos(
              (elapsedVirtual * walker.speed + 10 * walker.phase) * Math.PI * 4
            )) *
          5;

        const ctx = contexts[walker.layer];
        if (!ctx) return;

        ctx.save();
        ctx.translate(posX, walker.baseline + walker.h * (1 - spriteScale) - bob);
        ctx.scale(walker.direction, 1);
        ctx.drawImage(
          sheet,
          (cellIdx % 5) * cellW,
          Math.floor(cellIdx / 5) * cellH,
          cellW,
          cellH,
          (-walker.w * spriteScale) / 2,
          0,
          walker.w * spriteScale,
          walker.h * spriteScale
        );
        ctx.restore();
      });
    };

    // Animation frame tick
    const tick = (timestamp: number) => {
      if (lastTimestamp) {
        elapsedVirtual += Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      }
      lastTimestamp = timestamp;

      render();
      rafId = requestAnimationFrame(tick);
    };

    // Synchronize play / pause state
    const sync = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
      lastTimestamp = 0;

      if (isImagesLoaded && !isDestroyed) {
        render();
        if (
          isIntersecting &&
          !document.hidden &&
          !animState.paused &&
          !animState.reduced
        ) {
          rafId = requestAnimationFrame(tick);
        }
      }
    };
    animState.sync = sync;

    // Layout & canvas resizing
    const resize = () => {
      if (!isImagesLoaded || isDestroyed) return;

      const clientW = sceneBtn.clientWidth;
      const clientH = sceneBtn.clientHeight;
      if (width === clientW && height === clientH) return;

      width = clientW;
      height = clientH;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      const portraitH = portraitImg.getBoundingClientRect().height || 365;

      canvases.forEach((canvas) => {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      });

      const isDesktop = width >= 600;
      const portraitScale = Math.min(1.25, Math.max(0.8, portraitH / 310));
      const widthFactor = width / (1440 * portraitScale);

      // Walker counts: [rear, front] - reduced for a cleaner, less crowded scene
      const counts: [number, number] = isDesktop
        ? [18, 11]
        : [
            Math.max(5, Math.min(7, Math.round(18 * widthFactor))),
            Math.max(3, Math.min(4, Math.round(11 * widthFactor))),
          ];
      const totalCount = counts[0] + counts[1];

      // Mobile crowd scale: pedestrians are made smaller on mobile so character & name stand out
      const crowdScale = isDesktop ? 1.0 : 0.68;

      // Build walkers
      walkers = Array.from({ length: totalCount }, (_, t) => {
        const row = t < counts[0] ? 0 : 1; // 0 = rear, 1 = front
        const rowIndex = t - (row === 0 ? 0 : counts[0]);
        const rowTotal = counts[row];

        // Heights & baselines
        const walkerH =
          (row === 1
            ? 260 + 35 * hash(t + 8)
            : 200 + 35 * hash(t + 8)) * portraitScale * crowdScale;

        // Ground-anchored baselines so bottom cut lines reach the bottom edge with zero floating cutoffs
        const baseline =
          row === 0
            ? height - walkerH + (isDesktop ? 14 : 8) * portraitScale + 12 * hash(t + 4)
            : height - walkerH + (isDesktop ? 36 : 24) * portraitScale + 15 * hash(t + 4);

        const cell = (37 * Math.floor((105 * t) / totalCount)) % 105;
        const speed = [0.7, 1.05][row] * (0.88 + 0.24 * hash(t + 97));

        return {
          cell,
          // Overlap: foreground walkers on front canvas; every 3rd rear walker also on front canvas
          layer: +(row > 0 || rowIndex % 3 === 0),
          h: walkerH,
          w: 0.8 * walkerH,
          baseline,
          speed,
          phase: (rowIndex + 0.85 * hash(t + 41)) / rowTotal,
          direction: (row === 1 ? -1 : 1) as 1 | -1,
        };
      }).sort((a, b) => a.baseline - b.baseline);

      maxWalkerWidth = Math.max(...walkers.map((w) => w.w));
      travelSpan = width + 2 * maxWalkerWidth;

      sync();
    };

    // IntersectionObserver to pause offscreen
    const io = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0]?.isIntersecting ?? false;
        sync();
      },
      { rootMargin: "80px" }
    );
    io.observe(sceneBtn);

    // ResizeObserver
    const ro = new ResizeObserver(resize);
    ro.observe(sceneBtn);

    // VisibilityChange
    document.addEventListener("visibilitychange", sync);

    // Load and decode all sheets
    Promise.all(
      sheetImages.map((img) =>
        "decode" in img ? img.decode() : Promise.resolve()
      )
    )
      .then(() => {
        if (!isDestroyed) {
          isImagesLoaded = true;
          resize();
          setIsReady(true);
        }
      })
      .catch((err) => {
        console.warn("Could not decode crowd sheets", err);
      });

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      animState.sync = () => {};
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <footer className="site-footer bg-black text-[#f8f7f4] box-border grid grid-rows-[auto_minmax(0,1fr)] min-h-[700px] md:min-h-[100svh] md:h-[100svh] pt-6 md:pt-10 overflow-hidden w-full relative">
      {/* Background noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(/grain.png)",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />

      {/* ── TOP THREE COLUMNS ── */}
      <div className="footer-top wrap w-[min(calc(100%-48px),1180px)] mx-auto grid grid-cols-[0.8fr_1.2fr] md:grid-cols-[0.9fr_1.1fr_1fr] gap-6 md:gap-12 items-start relative z-1">
        {/* Column 1: Identity */}
        <div className="footer-identity">
          <h2 className="text-[26px] md:text-[32px] font-bold leading-none tracking-tight text-[#f8f7f4]">
            Roshan.
          </h2>
          <p className="mt-2.5 md:mt-4 text-xs md:text-sm text-[#b5b5b5] leading-relaxed">
            Full Stack Developer.
          </p>
        </div>

        {/* Column 2: Explore */}
        <nav aria-label="Footer navigation">
          <p className="text-xs md:text-sm text-[#b5b5b5] mb-1 md:mb-4">
            Explore
          </p>
          <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-0 max-w-[310px]">
            {[
              ["About", "#about"],
              ["Biography", "#biography"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["Experience", "#experience"],
              ["Contact", "#contact"],
            ].map(([title, href]) => (
              <a
                key={title}
                href={href}
                className="text-xs md:text-sm text-[#f8f7f4] min-h-[36px] md:min-h-[44px] py-1.5 md:py-2 inline-flex items-center hover:underline underline-offset-4 transition-colors"
              >
                {title}
              </a>
            ))}
          </div>
        </nav>

        {/* Column 3: Get In Touch */}
        <div className="footer-contact col-span-2 md:col-span-1 border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
          <p className="hidden md:block text-sm text-[#b5b5b5] mb-4">
            Get in touch
          </p>
          <a
            href={`mailto:${PORTFOLIO_DATA.email}`}
            className="text-xs md:text-sm text-[#f8f7f4] min-h-[32px] md:min-h-[44px] inline-flex items-center gap-2 hover:underline underline-offset-4 break-all"
          >
            <span>{PORTFOLIO_DATA.email}</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <span className="block mt-1 md:mt-6 text-[10px] md:text-xs text-[#b5b5b5]">
            © {PORTFOLIO_DATA.copyrightYear} {PORTFOLIO_DATA.name}
          </span>
        </div>
      </div>

      {/* ── FINALE: HEADING, WHITE 2.5D SCENE, AND CAPTION ── */}
      <div className="footer-finale grid grid-rows-[44px_minmax(0,1fr)_84px] md:grid-rows-[48px_minmax(0,1fr)_62px] min-h-0 mt-3 md:mt-6 relative z-1">
        {/* Sub-bar: See you around & Back to top */}
        <div className="footer-finale-heading wrap w-[min(calc(100%-48px),1180px)] mx-auto flex items-center justify-between gap-3 md:gap-5">
          <p className="text-[clamp(28px,3.2vw,44px)] font-medium leading-[1.15] tracking-[-0.03em] text-[#f8f7f4]">
            See you around.
          </p>
          <a
            href="#"
            onClick={handleBackToTop}
            className="flex items-center gap-2 md:gap-3 text-[11px] md:text-xs text-[#f8f7f4] min-h-[44px] hover:underline underline-offset-4 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* ── CROWD SCENE: BUTTON WITH LAYERED CANVASES ── */}
        <button
          ref={sceneBtnRef}
          type="button"
          onClick={togglePlayPause}
          disabled={isReducedMotion}
          aria-label={
            isPaused
              ? "ROSHAN. Resume crowd animation"
              : "ROSHAN. Pause crowd animation"
          }
          aria-pressed={isPaused || isReducedMotion}
          data-cast-size="105"
          data-ready={isReady ? "true" : "false"}
          className="footer-crowd-scene relative block w-full h-auto min-h-[clamp(400px,56svh,500px)] md:min-h-[460px] bg-white border-0 p-0 mt-3.5 overflow-hidden isolate cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#141414] select-none"
        >
          {/* Layer 1: Giant Uppercase First Name (ROSHAN.) */}
          <span
            className="footer-crowd-name font-extrabold uppercase text-[#ececec] leading-none select-none tracking-[-0.04em] whitespace-nowrap block absolute top-2 sm:top-1 md:top-0 left-0 w-full text-center pointer-events-none text-[clamp(68px,20vw,115px)] md:text-[clamp(120px,24vw,420px)]"
            aria-hidden="true"
          >
            ROSHAN.
          </span>

          {/* Layer 2: Rear Canvas (pedestrians moving right behind portrait) */}
          <canvas
            ref={rearCanvasRef}
            className="footer-crowd-layer footer-crowd-back absolute inset-0 w-full h-full pointer-events-none z-[1]"
            aria-hidden="true"
          />

          {/* Layer 3: Central Personal Character (anchored at baseline, bottom: 12px) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={portraitImgRef}
            src="/hero-arms-crossed.png"
            alt={PORTFOLIO_DATA.name}
            width="682"
            height="1024"
            loading="lazy"
            className="footer-crowd-portrait absolute bottom-[12px] left-1/2 -translate-x-1/2 z-[2] pointer-events-none object-contain w-auto max-w-none h-[min(clamp(310px,46svh,385px),calc(100%-24px))] md:h-[min(410px,calc(100%-24px))]"
          />

          {/* Layer 4: Front Canvas (pedestrians moving left in front of portrait) */}
          <canvas
            ref={frontCanvasRef}
            className="footer-crowd-layer footer-crowd-front absolute inset-0 w-full h-full pointer-events-none z-[3]"
            aria-hidden="true"
          />
        </button>

        {/* ── BOTTOM STRIP: CAPTION ── */}
        <div className="footer-scene-bottom wrap w-[min(calc(100%-48px),1180px)] mx-auto flex items-center justify-between border-t border-[#282828] min-h-[62px] box-border pb-10 md:pb-0 pr-12 md:pr-0">
          <small className="text-[10px] text-[#b5b5b5] font-normal">
            Finally, some traffic on my website.
          </small>
        </div>
      </div>
    </footer>
  );
}
