"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface StopData {
  id: string;
  className: string;
  desktopPadding: string;
  dateBadge?: string;
  date: string;
  role: string | React.ReactNode;
  place: string;
  location?: string;
  description: string;
}

const STOPS: StopData[] = [
  {
    id: "jayster",
    className: "journey-now",
    desktopPadding: "md:pt-0",
    dateBadge: "Current role",
    date: "Nov 2025 \u2013 Present",
    role: (
      <>
        Full Stack
        <br />
        &amp; Cloud Intern
      </>
    ),
    place: "Jayster Corporate",
    location: "Remote \u00b7 NSDC & MSME Recognised",
    description:
      "Remote internship in full-stack development and cloud. Certificate issued Jan 2026.",
  },
  {
    id: "eargs",
    className: "journey-freelance",
    desktopPadding: "md:pt-[100px]",
    date: "Feb 2026 (122 hrs)",
    role: "Full Stack / Cloud Intern",
    place: "Eargs Learning Solutions Pvt. Ltd.",
    location: "Remote",
    description:
      "React, TypeScript, Express.js, PostgreSQL, Docker; Microsoft server management and private cloud apps.",
  },
  {
    id: "aerozone",
    className: "journey-masters",
    desktopPadding: "md:pt-[20px]",
    date: "Completed Mar 2026",
    role: "Full Stack Developer Intern",
    place: "Aerozone",
    location: "Remote",
    description:
      "GSAP & Three.js web experiences, React validation hooks, GitHub Actions CI/CD pipelines.",
  },
  {
    id: "msc-cs",
    className: "journey-internship",
    desktopPadding: "md:pt-[100px]",
    dateBadge: "Pursuing",
    date: "2026 \u2013 2028",
    role: "M.Sc. Computer Science",
    place: "Kirti M. Doongursee College (Autonomous)",
    location: "Dadar, Mumbai",
    description: "Currently pursuing M.Sc. in Computer Science.",
  },
  {
    id: "bsc-cs",
    className: "journey-bachelors",
    desktopPadding: "md:pt-[20px]",
    date: "2023 \u2013 2026",
    role: "B.Sc. Computer Science",
    place: "K.V. Pendharkar College (Autonomous)",
    location: "Dombivli (East)",
    description: "First Class with Distinction \u00b7 8.8 CGPA",
  },
];

export function ExperienceSection() {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const [pathData, setPathData] = useState({ d: "", width: 1, height: 1 });
  const [isDrawn, setIsDrawn] = useState(false);

  // Scroll-linked progress for mobile timeline
  const { scrollYProgress } = useScroll({
    target: mobileSectionRef,
    offset: ["start 80%", "end 70%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const dotTop = useTransform(scaleY, (v) => `${Math.min(Math.max(v * 100, 0), 100)}%`);

  useEffect(() => {
    const roadmap = roadmapRef.current;
    if (!roadmap) return;

    let isDestroyed = false;
    let rafId = 0;

    const calculatePath = () => {
      if (isDestroyed || !roadmap) return;
      const rect = roadmap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const markerElements = Array.from(
        roadmap.querySelectorAll<HTMLElement>(".journey-stop-marker")
      );

      const markers = markerElements.map((marker) => {
        const mRect = marker.getBoundingClientRect();
        return {
          x: mRect.left - rect.left + mRect.width / 2,
          y: mRect.top - rect.top + mRect.height / 2,
        };
      });

      if (markers.length < 2) return;

      let d = `M ${markers[0].x} ${markers[0].y}`;
      for (let i = 1; i < markers.length; i++) {
        const prev = markers[i - 1];
        const curr = markers[i];
        const midX = (prev.x + curr.x) / 2;
        d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
      }

      setPathData((prev) => {
        if (
          prev.d === d &&
          Math.abs(prev.width - rect.width) < 2 &&
          Math.abs(prev.height - rect.height) < 2
        ) {
          return prev;
        }
        return {
          d,
          width: Math.max(Math.round(rect.width), 1),
          height: Math.max(Math.round(rect.height), 1),
        };
      });
    };

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculatePath);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(roadmap);
    window.addEventListener("resize", handleResize);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
        }
      },
      { threshold: 0.15 }
    );
    intersectionObserver.observe(roadmap);

    handleResize();
    document.fonts.ready.then(handleResize);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="experience"
      className="experience-section section-pad w-full relative py-20 md:py-28"
      data-sc-act="flow"
    >
      <div className="wrap w-[min(calc(100%-48px),1180px)] mx-auto">
        {/* Heading */}
        <div className="experience-heading flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-8 mb-8 md:mb-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111213] dark:text-[#f8f7f4]">
            Experience.
          </h2>
          <p className="text-base md:text-lg text-[#5C5F66] dark:text-[#9CA3AF] leading-relaxed">
            Current work.
            <br className="hidden md:inline" /> Back to the foundations.
          </p>
        </div>

        {/* ─── DESKTOP ROADMAP (Unchanged PC View) ─── */}
        <div
          ref={roadmapRef}
          className="journey-roadmap relative hidden min-[1001px]:grid grid-cols-5 gap-7 mt-16 pt-6"
          data-drawn={isDrawn ? "true" : "false"}
        >
          {/* Dynamic SVG Road */}
          <svg
            className="journey-road absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
            viewBox={`0 0 ${pathData.width} ${pathData.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="journey-road-base" d={pathData.d} />
            <path
              className="journey-road-ink"
              d={pathData.d}
              pathLength={1}
            />
          </svg>

          {/* Stops */}
          {STOPS.map((stop) => (
            <article
              key={stop.id}
              className={`journey-stop ${stop.className} ${stop.desktopPadding} relative z-[1] min-w-0 block`}
              aria-labelledby={`${stop.id}-title`}
            >
              <span
                className="journey-stop-marker mx-auto mb-9 grid place-items-center w-[38px] h-[38px] rounded-full border border-[#111213] dark:border-[#f8f7f4] bg-white dark:bg-[#08090b] transition-transform duration-300 shrink-0"
                aria-hidden="true"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#111213] dark:bg-[#f8f7f4]" />
              </span>

              <div className="journey-stop-content relative bg-transparent">
                <p className="journey-date flex flex-wrap items-center gap-3 min-h-[28px] mb-4 text-sm text-[#5C5F66] dark:text-[#9CA3AF]">
                  {stop.dateBadge && (
                    <span className="journey-current bg-[#111213] dark:bg-[#f8f7f4] text-white dark:text-[#08090b] rounded px-2.5 py-1 text-[11px] font-medium leading-none">
                      {stop.dateBadge}
                    </span>
                  )}
                  {stop.date}
                </p>

                <h3
                  id={`${stop.id}-title`}
                  className="text-[26px] font-semibold leading-tight tracking-tight text-[#111213] dark:text-[#f8f7f4] mb-5"
                >
                  {stop.role}
                </h3>

                <p className="journey-place text-lg font-medium text-[#111213] dark:text-[#f8f7f4] mb-3">
                  {stop.place}{" "}
                  {stop.location && (
                    <span className="block mt-1 text-sm font-normal text-[#5C5F66] dark:text-[#9CA3AF]">
                      {stop.location}
                    </span>
                  )}
                </p>

                <p className="journey-description text-[15px] leading-relaxed text-[#5C5F66] dark:text-[#9CA3AF] m-0">
                  {stop.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ─── MOBILE EXPERIENCE TIMELINE (Sleek, Cool & Minimal Animation) ─── */}
        <div
          ref={mobileSectionRef}
          className="mobile-experience-timeline block min-[1001px]:hidden relative mt-8"
        >
          {/* Vertical Timeline Guide & Liquid Ink Spine */}
          <div className="absolute left-[18px] top-4 bottom-4 w-[2px] pointer-events-none" aria-hidden="true">
            {/* Subtle background guide rail */}
            <div className="w-full h-full bg-[#111213]/10 dark:bg-white/10 rounded-full" />

            {/* Scroll-driven progress ink beam */}
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 w-full bg-[#111213] dark:bg-[#f8f7f4] rounded-full"
            />

            {/* Traveling spark / light pulse on line head */}
            <motion.div
              style={{ top: dotTop }}
              className="absolute -left-[3px] -translate-y-1/2 w-2 h-2 rounded-full bg-[#111213] dark:bg-[#f8f7f4] shadow-[0_0_8px_rgba(0,0,0,0.4)] dark:shadow-[0_0_8px_rgba(255,255,255,0.7)] pointer-events-none"
            />
          </div>

          {/* Stops List */}
          <div className="space-y-9">
            {STOPS.map((stop, index) => {
              const isCurrent = stop.id === "jayster";

              return (
                <article
                  key={`mobile-${stop.id}`}
                  className="relative grid grid-cols-[38px_minmax(0,1fr)] gap-5 items-start group"
                  aria-labelledby={`mobile-${stop.id}-title`}
                >
                  {/* Animated Marker Node */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 24,
                      delay: index * 0.05,
                    }}
                    className={`relative z-10 grid place-items-center w-[38px] h-[38px] rounded-full border transition-all duration-300 shrink-0 ${
                      isCurrent
                        ? "border-[#111213] dark:border-[#f8f7f4] bg-[#111213] dark:bg-[#f8f7f4] text-white dark:text-[#08090b] shadow-sm"
                        : "border-[#111213] dark:border-[#f8f7f4] bg-white dark:bg-[#08090b]"
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        {/* Live Radar Beacon Rings */}
                        <span className="absolute -inset-1 rounded-full border border-[#111213]/40 dark:border-white/40 animate-ping opacity-60" />
                        <span className="absolute -inset-2 rounded-full bg-[#111213]/5 dark:bg-white/5 animate-pulse" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white dark:bg-[#08090b]" />
                      </>
                    ) : (
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 + 0.15 }}
                        className="w-2.5 h-2.5 rounded-full bg-[#111213] dark:bg-[#f8f7f4]"
                      />
                    )}
                  </motion.div>

                  {/* Animated Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 22, filter: "blur(3px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.06,
                    }}
                    whileTap={{ scale: 0.985 }}
                    className="pt-0.5 rounded-2xl p-3 -ml-1 transition-colors duration-200 active:bg-black/[0.03] dark:active:bg-white/[0.04]"
                  >
                    {/* Header Row: Index + Date Badge + Date */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] font-bold tracking-wider text-[#5C5F66]/60 dark:text-[#9CA3AF]/60">
                        0{index + 1}
                      </span>
                      {stop.dateBadge && (
                        <span className="inline-flex items-center gap-1.5 bg-[#111213] dark:bg-[#f8f7f4] text-white dark:text-[#08090b] rounded px-2.5 py-0.5 text-[10px] font-medium leading-none tracking-tight">
                          {isCurrent && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 animate-pulse" />
                          )}
                          {stop.dateBadge}
                        </span>
                      )}
                      <span className="text-xs text-[#5C5F66] dark:text-[#9CA3AF]">
                        {stop.date}
                      </span>
                    </div>

                    {/* Role Heading */}
                    <h3
                      id={`mobile-${stop.id}-title`}
                      className="text-xl font-semibold leading-tight tracking-tight text-[#111213] dark:text-[#f8f7f4] mb-2"
                    >
                      {stop.role}
                    </h3>

                    {/* Place & Location */}
                    <p className="text-[15px] font-medium text-[#111213] dark:text-[#f8f7f4] mb-2 leading-snug">
                      {stop.place}
                      {stop.location && (
                        <span className="block mt-0.5 text-xs font-normal text-[#5C5F66] dark:text-[#9CA3AF]">
                          {stop.location}
                        </span>
                      )}
                    </p>

                    {/* Description */}
                    <p className="text-xs leading-relaxed text-[#5C5F66] dark:text-[#9CA3AF] m-0">
                      {stop.description}
                    </p>
                  </motion.div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
