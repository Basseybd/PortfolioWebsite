"use client";

import { useEffect, useMemo, useState } from "react";
import Lightbox from "@/components/Lightbox";
import { photoCategories, photoSrc, photoSrcSet, type Photo, type PhotoCategory } from "@/lib/content";

type Filter = "All" | PhotoCategory;
const toSlug = (f: Filter) => f.toLowerCase().replace(/\s+/g, "-");

export default function PhotoArchive({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [viewing, setViewing] = useState<number | null>(null);

  // Keep the filter in the URL (?c=travel) so it can be shared.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    const match = photoCategories.find((x) => toSlug(x) === c);
    if (match) setFilter(match);
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    const url = new URL(window.location.href);
    if (f === "All") url.searchParams.delete("c");
    else url.searchParams.set("c", toSlug(f));
    window.history.replaceState(null, "", url);
  };

  const shown = useMemo(
    () => (filter === "All" ? photos : photos.filter((p) => p.category === filter)),
    [filter, photos],
  );

  const filters: Filter[] = ["All", ...photoCategories];

  return (
    <>
      <div role="group" aria-label="Filter photos" className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "All" ? photos.length : photos.filter((p) => p.category === f).length;
          const on = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => choose(f)}
              className={`border px-4 py-2 text-[0.95rem] transition-colors duration-200 ${
                on ? "border-ink bg-ink text-paper" : "border-ink/30 text-stone hover:border-ink hover:text-ink"
              }`}
            >
              {f} <span className={`label ml-1 ${on ? "text-rule" : "text-stone/80"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-12 columns-1 gap-8 sm:columns-2 lg:columns-3">
        {shown.map((p, i) => (
          <li key={p.slug} className="mb-12 break-inside-avoid">
            <figure>
              <button
                type="button"
                onClick={() => setViewing(i)}
                aria-label={`View larger: ${p.title}`}
                className="block w-full cursor-zoom-in bg-rule"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoSrc(p.slug, 1200)}
                  srcSet={photoSrcSet(p.slug)}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  width={p.width}
                  height={p.height}
                  alt={p.alt}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="block h-auto w-full"
                />
              </button>
              <figcaption className="mt-3 border-t border-ink/70 pt-2.5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[1.1rem] font-medium leading-snug">{p.title}</span>
                  <span className="shrink-0 text-[0.85rem] text-stone">{p.place}</span>
                </div>
                <p className="label mt-1 text-stone">{p.settings}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <Lightbox photos={shown} index={viewing} onClose={() => setViewing(null)} onIndex={setViewing} />
    </>
  );
}
