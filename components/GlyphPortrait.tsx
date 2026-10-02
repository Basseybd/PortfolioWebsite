"use client";

import { useEffect, useRef, useState } from "react";

// The portrait, rendered as code glyphs in the photo's own colors.
// A lens follows the cursor and "develops" the real film scan beneath.
// Click or tap develops the whole frame. Keyboard users get a button.

const RAMP = " .:-=+/;(<{[*#%@";
const NOISE = "{}()<>[];:/=+*#";
const BG = "#201B18";

// Head-and-shoulders crop of the source, as fractions of its width/height.
const CROP = { x: 0.145, y: 0.16, w: 0.578, h: 0.578 };

type Props = {
  src: string;
  alt: string;
};

export default function GlyphPortrait({ src, alt }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [developed, setDeveloped] = useState(false);
  const developedRef = useRef(false);
  const [finePointer, setFinePointer] = useState(true);

  useEffect(() => {
    developedRef.current = developed;
  }, [developed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setFinePointer(fine);

    const img = new Image();
    img.decoding = "async";
    img.src = src;

    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d");
    if (!lctx) return;

    let size = 0;
    let dpr = 1;
    let cell = 9;
    let cols = 0;
    let rows = 0;
    let cells: { x: number; y: number; ch: string; color: string; order: number }[] = [];
    let crop = { sx: 0, sy: 0, sw: 1, sh: 1 };
    let drawn = 0;
    let introStart = 0;
    let introDone = reduce;
    let raf = 0;

    // Lens state (CSS pixels).
    const lens = { x: 0, y: 0, tx: 0, ty: 0, r: 0, tr: 0 };
    let hovering = false;

    const build = () => {
      size = Math.round(wrap.clientWidth);
      if (!size) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = layer.width = Math.round(size * dpr);
      canvas.height = layer.height = Math.round(size * dpr);
      // Smaller glyphs only where the screen can render them crisply.
      cell = Math.max(5, Math.round(size / (dpr >= 2 ? 96 : 78)));
      cols = Math.floor(size / cell);
      rows = cols;
      crop = {
        sx: img.naturalWidth * CROP.x,
        sy: img.naturalHeight * CROP.y,
        sw: img.naturalWidth * CROP.w,
        sh: img.naturalHeight * CROP.h,
      };

      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;
      sctx.imageSmoothingQuality = "high";
      sctx.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;

      // A blurred copy for local contrast: shrink, then scale back up.
      const tiny = document.createElement("canvas");
      const tw = Math.max(2, Math.round(cols / 9));
      tiny.width = tiny.height = tw;
      const tctx = tiny.getContext("2d");
      const blurC = document.createElement("canvas");
      blurC.width = cols;
      blurC.height = rows;
      const bctx = blurC.getContext("2d", { willReadFrequently: true });
      if (!tctx || !bctx) return;
      tctx.drawImage(sample, 0, 0, tw, tw);
      bctx.imageSmoothingQuality = "high";
      bctx.drawImage(tiny, 0, 0, cols, rows);
      const blur = bctx.getImageData(0, 0, cols, rows).data;

      const lumOf = (d: Uint8ClampedArray, k: number) =>
        (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255;

      cells = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = (j * cols + i) * 4;
          const lum = lumOf(data, k);
          // Mix global tone with local detail so the face reads against
          // the bright wall and shirt.
          const v = Math.min(1, Math.max(0, 0.75 * lum + 0.125 + 1.6 * (lum - lumOf(blur, k))));
          if (v < 0.26) continue;
          let r = data[k];
          let g = data[k + 1];
          let b = data[k + 2];
          const peak = Math.max(r, g, b, 1);
          const f = (105 + 150 * v) / peak;
          r = Math.min(255, r * f);
          g = Math.min(255, g * f);
          b = Math.min(255, b * f);
          const alpha = 0.5 + 0.5 * v;
          cells.push({
            x: i * cell + cell / 2,
            y: j * cell + cell / 2,
            ch: RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))],
            color: `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(2)})`,
            order: Math.random(),
          });
        }
      }
      cells.sort((p, q) => p.order - q.order);
      clearLayer();
      drawn = 0;
      if (introDone) drawUpTo(1);
      if (!lens.x && !lens.y) {
        lens.x = lens.tx = size * 0.5;
        lens.y = lens.ty = size * 0.38;
      }
    };

    const setFont = () => {
      lctx.font = `${Math.round(cell * 1.18)}px "Fragment Mono", ui-monospace, monospace`;
      lctx.textAlign = "center";
      lctx.textBaseline = "middle";
    };

    const clearLayer = () => {
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.fillStyle = BG;
      lctx.fillRect(0, 0, size, size);
      setFont();
    };

    // Incremental reveal: glyphs land in ember first, then settle into
    // the photo's own color on the next frame.
    let pending: typeof cells = [];
    const drawUpTo = (progress: number) => {
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setFont();
      for (const c of pending) {
        lctx.fillStyle = BG;
        lctx.fillRect(c.x - cell / 2, c.y - cell / 2, cell, cell);
        lctx.fillStyle = c.color;
        lctx.fillText(c.ch, c.x, c.y);
      }
      pending = [];
      const target = Math.floor(cells.length * progress);
      const settleNow = progress >= 1;
      for (; drawn < target; drawn++) {
        const c = cells[drawn];
        if (settleNow) {
          lctx.fillStyle = c.color;
          lctx.fillText(c.ch, c.x, c.y);
        } else {
          lctx.fillStyle = "rgba(226,131,78,0.9)";
          lctx.fillText(NOISE[(Math.random() * NOISE.length) | 0], c.x, c.y);
          pending.push(c);
        }
      }
    };

    const render = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(layer, 0, 0);
      if (lens.r > 0.5) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.save();
        ctx.beginPath();
        ctx.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, size, size);
        ctx.restore();
        if (lens.r < size * 0.9) {
          ctx.beginPath();
          ctx.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(226,131,78,0.9)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const tick = (now: number) => {
      let busy = false;
      if (!introDone) {
        const p = Math.min(1, (now - introStart) / 1600);
        const eased = 1 - Math.pow(1 - p, 3);
        drawUpTo(eased);
        if (p >= 1) {
          drawUpTo(1);
          introDone = true;
        } else busy = true;
      }

      const full = Math.hypot(size, size);
      lens.tr = developedRef.current ? full : hovering ? Math.max(70, size * 0.2) : 0;
      const k = reduce ? 1 : 0.16;
      lens.x += (lens.tx - lens.x) * k;
      lens.y += (lens.ty - lens.y) * k;
      lens.r += (lens.tr - lens.r) * (reduce ? 1 : 0.12);
      if (
        Math.abs(lens.tx - lens.x) > 0.3 ||
        Math.abs(lens.ty - lens.y) > 0.3 ||
        Math.abs(lens.tr - lens.r) > 0.3
      ) {
        busy = true;
      } else {
        lens.x = lens.tx;
        lens.y = lens.ty;
        lens.r = lens.tr;
      }

      render();
      raf = busy ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const p = local(e);
      lens.tx = p.x;
      lens.ty = p.y;
      hovering = true;
      kick();
    };
    const onLeave = () => {
      hovering = false;
      kick();
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      lens.tx = lens.x = p.x;
      lens.ty = lens.y = p.y;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    const ro = new ResizeObserver(() => {
      if (!img.complete) return;
      build();
      render();
    });

    const start = async () => {
      try {
        await document.fonts.load('10px "Fragment Mono"');
      } catch {
        /* fall back to the monospace stack */
      }
      build();
      introStart = performance.now();
      ro.observe(wrap);
      kick();
    };

    if (img.complete) start();
    else img.onload = start;

    (canvas as HTMLCanvasElement & { __kick?: () => void }).__kick = kick;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, [src]);

  const toggle = () => {
    setDeveloped((d) => !d);
    developedRef.current = !developedRef.current;
    (canvasRef.current as (HTMLCanvasElement & { __kick?: () => void }) | null)?.__kick?.();
  };

  return (
    <div>
      <div ref={wrapRef} className="relative aspect-square w-full overflow-hidden bg-charcoal">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={alt}
          onClick={toggle}
          className="absolute inset-0 h-full w-full cursor-crosshair"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-6 border-t border-bone/70 pt-2.5">
        <span className="whitespace-nowrap text-[0.95rem] text-bone">Bassey Duke</span>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={developed}
          className="label text-smoke transition-colors duration-200 hover:text-ember-light"
        >
          {developed ? "Back to code" : finePointer ? "Hover to develop" : "Tap to develop"}
        </button>
      </div>
    </div>
  );
}
