"use client";

// Experience as a horizontal line you scroll along.
//
// The section pins (CSS sticky) and its track slides sideways as you scroll.
// A chrome line draws itself under the reader, and each milestone grows its
// stem from the line, lights its dot, and lifts its text out of line masks as
// the line reaches it. Milestones alternate above and below the line, and
// their positions come from their index, so any number of them lays out.
//
// Adapted from the Hyperiux timeline. Changes: one coordinate system instead
// of a hand-tuned positions array (a milestone reveals when the line's pen
// reaches it), sticky instead of a fixed-height guess, a rebuild on width
// change only (the iOS toolbar does not re-split text), and a static fallback:
// without JS or with reduced motion the track is a native horizontal scroller
// with everything drawn.

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { portrait, timeline, type Milestone } from "@/lib/content";
import { cn } from "@/lib/utils";

let registered = false;
function register() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

// useLayoutEffect warns on the server; this is the usual isomorphic stand-in.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export type TimelineStop = Milestone & {
  /** Optional call to action under the detail (used by the closing milestone). */
  cta?: { href: string; label: string };
  /** Marks the closing milestone, drawn with a polished dot. */
  now?: boolean;
};

export type ExperienceTimelineProps = {
  items?: Milestone[];
  /** Closing milestone after the history. Pass null to drop it. */
  now?: TimelineStop | null;
  title?: string;
  periodLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Silver print treatment for the portrait, to sit in the chrome world. */
  monochrome?: boolean;
  id?: string;
  className?: string;
};

export const nowStop: TimelineStop = {
  year: "Now",
  title: "Open to AI contract work",
  org: "",
  detail: "LLM features, guardrails and human review, agentic coding workflows, and front-end modernization.",
  cta: { href: "#contact", label: "Get in touch" },
  now: true,
};

export default function ExperienceTimeline({
  items = timeline,
  now = nowStop,
  title = "Experience",
  periodLabel = "2017 to now",
  imageSrc = portrait.srcSmall,
  imageAlt = portrait.alt,
  monochrome = true,
  id = "experience",
  className,
}: ExperienceTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  // false until we know motion is allowed; the static scroller is the default.
  const [pinned, setPinned] = useState(false);
  const [width, setWidth] = useState(0);

  const stops: TimelineStop[] = now ? [...items, now] : items;
  const headingId = `${id}-heading`;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setPinned(!query.matches);
    read();
    query.addEventListener("change", read);
    let last = window.innerWidth;
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        // Height-only changes (mobile toolbars) keep the current build.
        if (window.innerWidth !== last) {
          last = window.innerWidth;
          setWidth(last);
        }
      }, 180);
    };
    setWidth(last);
    window.addEventListener("resize", onResize);
    return () => {
      query.removeEventListener("change", read);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, []);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const viewport = viewportRef.current;
    const slider = sliderRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    if (!pinned || !width || !section || !frame || !viewport || !slider || !track || !line) return;
    register();

    let ctx: gsap.Context | null = null;
    let cancelled = false;
    const splits: SplitText[] = [];

    const build = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const vw = viewport.clientWidth;
        const vh = window.innerHeight;
        const compact = vw < 640;
        const D = Math.max(0, slider.scrollWidth - vw);
        const k = compact ? 1 : 1.15; // scroll px per px of slide
        section.style.height = `${frame.offsetHeight + D * k}px`;

        // Geometry in track coordinates, measured untransformed.
        const trackLeft = slider.getBoundingClientRect().left + track.offsetLeft;
        const tip = vw * (compact ? 0.82 : 0.74); // where the pen sits on screen
        const pen0 = tip - trackLeft; // pen position when the pin starts
        const L = line.offsetWidth;
        const stopEls = gsap.utils.toArray<HTMLElement>(".xt-stop", track);
        const xs = stopEls.map((el) => el.offsetLeft);
        const step = xs.length > 1 ? xs[1] - xs[0] : vw * 0.2;

        // Two scrubbed timelines in pixel time: the approach (section rising
        // into view, track still) and the pin (track sliding). Each piece of
        // the line and each milestone lands on whichever covers its position.
        // The approach starts when the line is low in the viewport.
        const rise = Math.max(120, vh * 0.86 - frame.offsetHeight / 2);
        const approach = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: `top ${Math.round(rise)}px`, end: "top top", scrub: 0.5 },
        });
        approach.to({}, { duration: rise }, 0); // pins the duration to `rise`
        const slide = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: `+=${Math.max(1, D * k)}`, scrub: 0.5 },
        });
        slide.to(slider, { x: -D, duration: Math.max(1, D * k) }, 0);

        const head = Math.max(0, Math.min(pen0, L));
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        if (head > 0) approach.to(line, { scaleX: head / L, duration: rise * 0.9 }, rise * 0.1);
        if (L > head) {
          const s0 = Math.max(0, (head - pen0) * k);
          const s1 = Math.min(D * k, (L - pen0) * k);
          slide.fromTo(
            line,
            { scaleX: head / L },
            { scaleX: 1, duration: Math.max(1, s1 - s0), immediateRender: false },
            s0,
          );
        }

        const reveal = Math.min(Math.max(step * k * 1.15, 180), vh * 0.45);
        stopEls.forEach((el, i) => {
          const isTop = el.classList.contains("xt-top");
          const stem = el.querySelector(".xt-stem");
          const dot = el.querySelector(".xt-dot");
          const lines = (sel: string) => {
            const node = el.querySelector(sel);
            if (!node) return [];
            const split = new SplitText(node, { type: "lines", mask: "lines", linesClass: "xt-ln" });
            splits.push(split);
            return split.lines;
          };
          const year = lines(".xt-year");
          const text = [...lines(".xt-title"), ...lines(".xt-org"), ...lines(".xt-detail")];
          const cta = el.querySelector(".xt-cta");

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.fromTo(stem, { scaleY: 0, transformOrigin: isTop ? "50% 100%" : "50% 0%" }, { scaleY: 1, duration: 0.45, ease: "power2.inOut" }, 0)
            .fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.25, ease: "back.out(2)" }, 0.36)
            .fromTo(year, { yPercent: 105 }, { yPercent: 0, duration: 0.5 }, 0.3)
            .fromTo(text, { yPercent: 110 }, { yPercent: 0, duration: 0.5, stagger: 0.05 }, 0.4);
          if (cta) tl.fromTo(cta, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.7);
          const x = xs[i];
          if (x < pen0) {
            // Visible before the pin: reveal while the section rises.
            const dur = Math.min(reveal, rise * 0.45);
            const at = Math.min(rise * 0.1 + (x / Math.max(1, head)) * rise * 0.9, rise - dur);
            approach.add(tl.duration(dur), at);
          } else {
            const at = Math.min((x - pen0) * k, D * k - reveal);
            slide.add(tl.duration(reveal), Math.max(0, at));
          }
        });
      }, section);
      ScrollTrigger.refresh();
    };

    // Split after the fonts land, or the line breaks are measured wrong.
    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.then(() => requestAnimationFrame(build));

    return () => {
      cancelled = true;
      splits.forEach((sp) => sp.revert());
      ctx?.revert();
      section.style.height = "";
      ScrollTrigger.refresh();
    };
  }, [pinned, width, stops.length]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={headingId}
      data-pinned={pinned ? "" : undefined}
      className={cn("xt on-dark relative w-full bg-graphite text-rice", className)}
      style={{ "--n": stops.length } as CSSProperties}
    >
      <style>{CSS}</style>
      <div ref={frameRef} className="xt-frame">
        <div
          ref={viewportRef}
          className="xt-viewport"
          tabIndex={pinned ? undefined : 0}
          role={pinned ? undefined : "region"}
          aria-label={pinned ? undefined : `${title}, scrolls sideways`}
        >
          <div ref={sliderRef} className="xt-slider">
            <figure className="xt-photo m-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={1200}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={cn(monochrome && "xt-mono")}
              />
            </figure>

            <div ref={trackRef} className="xt-track">
              <div className="xt-axis" aria-hidden>
                <span className="xt-end xt-end-start" />
                <span ref={lineRef} className="xt-line" />
                <span className="xt-end xt-end-stop" />
              </div>

              <h2 id={headingId} className="xt-heading font-display font-medium">
                {title}
              </h2>
              <p className="xt-period">{periodLabel}</p>

              <ol className="xt-list">
                {stops.map((s, i) => (
                  <li
                    key={`${s.year}-${s.title}-${s.org}`}
                    className={cn("xt-stop", i % 2 === 0 ? "xt-top" : "xt-bottom", s.now && "xt-now")}
                    style={{ "--i": i } as CSSProperties}
                  >
                    <span className="xt-stem" aria-hidden />
                    <span className="xt-dot" aria-hidden />
                    <div className="xt-copy">
                      <p className="xt-year font-display">{s.year}</p>
                      <h3 className="xt-title">{s.title}</h3>
                      {s.org ? <p className="xt-org">{s.org}</p> : null}
                      <p className="xt-detail">{s.detail}</p>
                      {s.cta ? (
                        <a className="xt-cta" href={s.cta.href}>
                          {s.cta.label}
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.xt {
  --pad: 5vw; --gap: 6vw;
  --slider-h: min(62svh, 44vw, 640px);
  --photo-w: calc(var(--slider-h) * 0.76);
  --x0: max(30vw, 24rem); --step: 13.5vw; --copy-w: 20vw; --copy-gap: 1.1vw; --tail: 5vw;
  --dot: 9px;
  --track-w: calc(var(--x0) + (var(--n) - 1) * var(--step) + var(--copy-w) + var(--tail));
}
@media (max-width: 1023px) {
  .xt { --pad: 6vw; --gap: 7vw; --slider-h: min(64svh, 92vw); --photo-w: 44vw;
    --x0: 46vw; --step: 25vw; --copy-w: 38vw; --copy-gap: 2.2vw; --tail: 10vw; }
}
@media (max-width: 639px) {
  .xt { --pad: 20px; --gap: 9vw; --slider-h: max(500px, min(70svh, 640px)); --photo-w: 76vw;
    --x0: 62vw; --step: 42vw; --copy-w: 68vw; --copy-gap: 4.5vw; --tail: 14vw; --dot: 8px; }
}

.xt-frame { position: relative; display: flex; align-items: center; min-height: 100svh; padding-block: 8svh; }
.xt-viewport { width: 100%; overflow-x: auto; overflow-y: hidden; scrollbar-width: thin; scrollbar-color: #4a4d50 transparent; overscroll-behavior-x: contain; }
.xt-viewport:focus-visible { outline: 1px solid #C9CDD1; outline-offset: -6px; }
.xt[data-pinned] .xt-frame { position: sticky; top: 0; height: 100svh; padding-block: 0; overflow: hidden; }
.xt[data-pinned] .xt-viewport { overflow: hidden; }

.xt-slider { position: relative; display: flex; align-items: center; gap: var(--gap); width: max-content;
  padding-inline: var(--pad); height: var(--slider-h); will-change: transform; }
.xt:not([data-pinned]) .xt-slider { will-change: auto; }

.xt-photo { position: relative; flex: none; width: var(--photo-w); height: 100%; border-radius: 6px; overflow: hidden;
  background: #222326; box-shadow: 0 0 0 1px rgba(201,205,209,0.18), 0 30px 60px -30px rgba(0,0,0,0.9); }
.xt-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 42% 32%; display: block; }
.xt-photo img.xt-mono { filter: grayscale(1) contrast(1.08) brightness(0.94); }
.xt-photo::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 30%), linear-gradient(0deg, rgba(23,24,26,0.35), rgba(23,24,26,0) 40%); }
@media (max-width: 639px) { .xt-photo { height: calc(var(--photo-w) * 1.25); } }

.xt-track { position: relative; flex: none; width: var(--track-w); height: 100%; }

.xt-axis { position: absolute; left: 0; top: 50%; display: flex; align-items: center; transform: translateY(-50%);
  width: calc(var(--x0) + (var(--n) - 1) * var(--step) + 3vw); }
.xt-line { display: block; flex: 1; height: 1px; background: #C9CDD1; transform-origin: left center; }
.xt-end { flex: none; width: 7px; height: 7px; border-radius: 50%; background: #C9CDD1; }

.xt-heading { position: absolute; left: 0; bottom: calc(50% + 1.1rem); margin: 0;
  font-size: clamp(2.6rem, 5vw, 5.4rem); line-height: 1; letter-spacing: -0.025em; color: #ECEDEB; white-space: nowrap; }
.xt-period { position: absolute; left: 0; top: calc(50% + 1rem); margin: 0; font-size: clamp(0.95rem, 1.1vw, 1.1rem); color: #A7ABAF; letter-spacing: 0.01em; }

.xt-list { position: absolute; inset: 0; margin: 0; padding: 0; list-style: none; }
.xt-stop { position: absolute; left: calc(var(--x0) + var(--i) * var(--step)); width: 0; height: calc(50% - 4px); }
.xt-top { bottom: 50%; }
.xt-bottom { top: 50%; }
.xt-stem { position: absolute; left: 0; width: 1px; margin-left: -0.5px; background: #C9CDD1; }
.xt-top .xt-stem { top: calc(var(--dot) / 2); bottom: 0; transform-origin: 50% 100%; }
.xt-bottom .xt-stem { top: 0; bottom: calc(var(--dot) / 2); transform-origin: 50% 0%; }
.xt-dot { position: absolute; left: 0; width: var(--dot); height: var(--dot); margin-left: calc(var(--dot) / -2); border-radius: 50%; background: #C9CDD1; }
.xt-top .xt-dot { top: 0; }
.xt-bottom .xt-dot { bottom: 0; }
.xt-now .xt-dot { --dot: 15px; background: linear-gradient(135deg, #f6f7f8 0%, #8d9398 26%, #eef0f2 50%, #6e7378 74%, #dfe3e6 100%);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.25), 0 6px 14px -6px rgba(0,0,0,0.9); }

.xt-copy { position: absolute; left: var(--copy-gap); width: var(--copy-w); }
.xt-top .xt-copy { top: -0.42rem; }
.xt-bottom .xt-copy { bottom: -0.3rem; }
.xt-year { margin: 0; font-size: clamp(1.9rem, 2.5vw, 2.7rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.02em; color: #ECEDEB; font-variant-numeric: lining-nums; }
.xt-title { margin: 0.55rem 0 0; font-size: clamp(1rem, 1.08vw, 1.12rem); font-weight: 700; line-height: 1.32; color: #ECEDEB; text-wrap: balance; }
.xt-org { margin: 0.1rem 0 0; font-size: clamp(0.92rem, 0.98vw, 1rem); font-weight: 500; line-height: 1.45; color: #A7ABAF; }
.xt-detail { margin: 0.6rem 0 0; max-width: 36ch; font-size: clamp(0.88rem, 0.95vw, 0.98rem); line-height: 1.58; color: rgba(236,237,235,0.74); text-wrap: pretty; }
.xt-cta { display: inline-flex; align-items: center; min-height: 44px; margin-top: 0.9rem; padding: 0 1.25rem; border-radius: 999px;
  font-size: 0.95rem; font-weight: 500; color: #17181A; border: 1px solid #9a9fa4;
  background: linear-gradient(180deg, #f8f9f9 0%, #e1e3e5 46%, #cbcfd2 54%, #eceef0 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.85), 0 8px 18px -12px rgba(0,0,0,0.9); transition: background 0.25s ease, color 0.25s ease; }
.xt-cta:hover { color: #ECEDEB; background: #17181A; border-color: #C9CDD1; }
.xt-ln { padding-bottom: 0.06em; }
`;
