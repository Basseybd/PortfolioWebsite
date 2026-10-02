"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/content";

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  const open = (i: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setIndex(i);
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      setIndex(null);
      triggerRef.current?.focus();
    };
    dlg.addEventListener("close", onClose);
    return () => dlg.removeEventListener("close", onClose);
  }, []);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="columns-1 gap-8 sm:columns-2 lg:columns-3">
        {photos.map((ph, i) => (
          <li key={ph.src} className="mb-10 break-inside-avoid">
            <figure>
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group block w-full overflow-hidden bg-rule"
                aria-label={`View larger: ${ph.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ph.src}
                  width={ph.width}
                  height={ph.height}
                  alt={ph.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              </button>
              <figcaption className="mt-3 flex items-baseline justify-between gap-6 border-t border-ink/70 pt-2">
                <span className="text-[0.95rem]">{ph.title}</span>
                <span className="label text-stone">{ph.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        className="on-dark m-0 h-[100dvh] max-h-none w-screen max-w-none bg-charcoal p-0 text-bone backdrop:bg-charcoal/95"
        style={{ overscrollBehavior: "contain" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && index !== null && (
          <div className="flex h-full flex-col">
            <div className="page flex h-16 shrink-0 items-center justify-between">
              <span className="label text-smoke">
                {index + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="label px-2 py-2 text-bone transition-colors duration-200 hover:text-ember-light"
                autoFocus
              >
                Close
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
              onClick={(e) => {
                if (e.target === e.currentTarget) dialogRef.current?.close();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.src}
                src={current.src}
                width={current.width}
                height={current.height}
                alt={current.alt}
                className="block max-h-full w-auto max-w-full object-contain"
              />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="label absolute left-2 top-1/2 hidden -translate-y-1/2 px-3 py-3 text-smoke transition-colors duration-200 hover:text-bone sm:block"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="label absolute right-2 top-1/2 hidden -translate-y-1/2 px-3 py-3 text-smoke transition-colors duration-200 hover:text-bone sm:block"
                  >
                    Next
                  </button>
                </>
              )}
            </div>

            <div className="page flex shrink-0 items-baseline justify-between gap-6 py-5">
              <span className="text-[1rem]">{current.title}</span>
              <span className="label text-smoke">{current.caption}</span>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
