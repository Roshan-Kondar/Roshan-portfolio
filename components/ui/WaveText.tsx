"use client";

import React from "react";

interface WaveTextProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

export function WaveText({ text, icon, className = "" }: WaveTextProps) {
  return (
    <span className={`wave-link inline-flex items-center gap-1.5 font-medium ${className}`}>
      <span className="inline-flex">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="wave-char inline-block"
            style={{ "--char-i": index } as React.CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      {icon && <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{icon}</span>}
    </span>
  );
}
