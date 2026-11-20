"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

interface Pedestrian {
  x: number;
  y: number;
  speed: number;
  direction: 1 | -1;
  scale: number;
  legPhase: number;
  color: string;
  hasBag?: boolean;
  hasHat?: boolean;
}

export function CrowdCanvas() {
  const [isPlaying, setIsPlaying] = useState(true);
  const backCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!backCanvas || !frontCanvas) return;

    const backCtx = backCanvas.getContext("2d");
    const frontCtx = frontCanvas.getContext("2d");
    if (!backCtx || !frontCtx) return;

    let width = (backCanvas.width = frontCanvas.width = backCanvas.parentElement?.clientWidth || 900);
    let height = (backCanvas.height = frontCanvas.height = 360);

    const handleResize = () => {
      if (!backCanvas || !frontCanvas) return;
      width = backCanvas.width = frontCanvas.width = backCanvas.parentElement?.clientWidth || 900;
      height = backCanvas.height = frontCanvas.height = 360;
    };
    window.addEventListener("resize", handleResize);

    // Palettes matching the aesthetic
    const colors = [
      "#E25C34",
      "#2B303A",
      "#4E5968",
      "#1F2421",
      "#383F51",
      "#D4A373",
      "#5A677D",
    ];

    // Generate back layer pedestrians
    const backPedestrians: Pedestrian[] = Array.from({ length: 8 }, (_, i) => ({
      x: (width / 8) * i + Math.random() * 50,
      y: height - 120,
      speed: 0.6 + Math.random() * 0.5,
      direction: Math.random() > 0.5 ? 1 : -1,
      scale: 0.6 + Math.random() * 0.15,
      legPhase: Math.random() * Math.PI * 2,
      color: colors[i % colors.length],
      hasHat: Math.random() > 0.6,
    }));

    // Generate front layer pedestrians
    const frontPedestrians: Pedestrian[] = Array.from({ length: 5 }, (_, i) => ({
      x: (width / 5) * i + Math.random() * 40,
      y: height - 60,
      speed: 1.1 + Math.random() * 0.6,
      direction: Math.random() > 0.5 ? 1 : -1,
      scale: 0.95 + Math.random() * 0.25,
      legPhase: Math.random() * Math.PI * 2,
      color: colors[(i + 3) % colors.length],
      hasBag: Math.random() > 0.5,
    }));

    // Draw stylized silhouette pedestrian
    const drawPedestrian = (
      ctx: CanvasRenderingContext2D,
      p: Pedestrian,
      time: number
    ) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(p.scale * p.direction, p.scale);

      const legSwing = Math.sin(time * 0.005 * p.speed + p.legPhase) * 16;
      const armSwing = Math.cos(time * 0.005 * p.speed + p.legPhase) * 12;

      // Legs
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";

      // Leg 1
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.lineTo(-4 + legSwing, 45);
      ctx.stroke();

      // Leg 2
      ctx.beginPath();
      ctx.moveTo(4, 0);
      ctx.lineTo(4 - legSwing, 45);
      ctx.stroke();

      // Torso
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.roundRect(-9, -48, 18, 50, [6, 6, 2, 2]);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(0, -62, 10, 0, Math.PI * 2);
      ctx.fill();

      // Optional Hat
      if (p.hasHat) {
        ctx.fillStyle = "#111213";
        ctx.beginPath();
        ctx.roundRect(-12, -73, 24, 4, 2);
        ctx.roundRect(-8, -80, 16, 8, [4, 4, 0, 0]);
        ctx.fill();
      }

      // Arm 1
      ctx.beginPath();
      ctx.moveTo(-6, -42);
      ctx.lineTo(-6 - armSwing, -15);
      ctx.stroke();

      // Arm 2
      ctx.beginPath();
      ctx.moveTo(6, -42);
      ctx.lineTo(6 + armSwing, -15);
      ctx.stroke();

      // Optional Bag
      if (p.hasBag) {
        ctx.fillStyle = "#D4A373";
        ctx.beginPath();
        ctx.roundRect(-11, -26, 7, 14, 2);
        ctx.fill();
      }

      ctx.restore();
    };

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.6, 2);
      lastTime = time;

      if (isPlaying) {
        backCtx.clearRect(0, 0, width, height);
        frontCtx.clearRect(0, 0, width, height);

        // Update and draw back pedestrians
        backPedestrians.forEach((p) => {
          p.x += p.speed * p.direction * dt * 1.5;
          if (p.direction === 1 && p.x > width + 50) p.x = -50;
          if (p.direction === -1 && p.x < -50) p.x = width + 50;
          drawPedestrian(backCtx, p, time);
        });

        // Update and draw front pedestrians
        frontPedestrians.forEach((p) => {
          p.x += p.speed * p.direction * dt * 2;
          if (p.direction === 1 && p.x > width + 60) p.x = -60;
          if (p.direction === -1 && p.x < -60) p.x = width + 60;
          drawPedestrian(frontCtx, p, time);
        });
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full overflow-hidden pt-8 pb-4 flex flex-col items-center">
      {/* Caption & Play/Pause Button */}
      <div className="flex items-center justify-between w-full max-w-5xl px-6 mb-4 z-30">
        <span className="text-xs font-mono text-[#9B9EA5] dark:text-[#9CA3AF] tracking-wide">
          Finally, some traffic on my website.
        </span>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3" />
              <span>ROSHAN. Pause crowd animation</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>ROSHAN. Resume crowd animation</span>
            </>
          )}
        </button>
      </div>

      {/* 2.5D Multi-Layer Container */}
      <div className="relative w-full max-w-5xl h-[340px] md:h-[380px] flex items-end justify-center select-none overflow-hidden">
        {/* Layer 1: Huge Watermark Typography */}
        <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none select-none z-0">
          <span className="text-[14vw] md:text-[120px] font-black font-mono tracking-tighter text-white/5 uppercase leading-none block">
            ROSHAN.
          </span>
        </div>

        {/* Layer 2: Back Canvas (Pedestrians behind Roshan) */}
        <canvas
          ref={backCanvasRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-85"
        />

        {/* Layer 3: Central Standing Cutout */}
        <div className="relative z-20 h-[300px] md:h-[350px] w-auto shrink-0 flex items-end drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
          <Image
            src="/hero-standing.png"
            alt="Roshan in the crowd"
            width={240}
            height={360}
            className="h-full w-auto object-contain filter contrast-105"
            priority
          />
        </div>

        {/* Layer 4: Front Canvas (Pedestrians walking in front) */}
        <canvas
          ref={frontCanvasRef}
          className="absolute inset-0 w-full h-full z-30 pointer-events-none"
        />

        {/* Base ground gradient shadow */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0F1011] to-transparent z-35 pointer-events-none" />
      </div>
    </div>
  );
}
