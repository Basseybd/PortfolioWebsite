import { WorldLink } from "@/components/transition/WorldTransition";
import { offTheClock, photoSrc, photos, type Photo } from "@/lib/content";

// A short graphite band on /work that points over to /life.
const PICKS = ["2026-two-lines", "2026-notre-dame", "2026-crowned", "2026-midtown-sunset"];

export default function OffTheClock() {
  const picks = PICKS.map((slug) => photos.find((p) => p.slug === slug)).filter((p): p is Photo => !!p);
  const lead = picks[0];
  return (
    <section id="off-the-clock" aria-labelledby="otc-title" className="on-dark overflow-hidden bg-graphite text-rice">
      <div className="page grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <h2
            id="otc-title"
            className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] sm:text-[3.4rem]"
          >
            {offTheClock.heading}
          </h2>
          <div aria-hidden className="chrome mt-7 h-[2px] w-24" />
          <p className="mt-6 max-w-[28rem] text-[1.125rem] leading-relaxed text-silver">{offTheClock.body}</p>
          <WorldLink
            href="/life"
            world="life"
            color={lead?.accent}
            className="btn-chrome mt-8 inline-block px-6 py-3.5 text-[1rem] font-medium"
          >
            {offTheClock.cta}
          </WorldLink>
        </div>

        <WorldLink
          href="/life"
          world="life"
          color={lead?.accent}
          aria-label={offTheClock.cta}
          className="group grid grid-cols-4 gap-2 sm:gap-3 lg:col-span-6 lg:col-start-7"
        >
          {picks.map((p, i) => (
            <span
              key={p.slug}
              className={`relative block aspect-[2/3] overflow-hidden bg-graphite-rule ${i % 2 ? "translate-y-5" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoSrc(p.slug, 640)}
                width={p.width}
                height={p.height}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </span>
          ))}
        </WorldLink>
      </div>
    </section>
  );
}
