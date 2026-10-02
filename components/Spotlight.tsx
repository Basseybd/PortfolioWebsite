"use client";

import type React from "react";

// Tracks the pointer across child .spotlight elements so a soft glow
// follows the cursor. Touch devices skip it (see globals.css).
export default function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = (e.target as HTMLElement).closest<HTMLElement>(".spotlight");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div className={className} onPointerMove={onMove}>
      {children}
    </div>
  );
}
