import GlyphPortrait from "@/components/GlyphPortrait";
import { portrait, site } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="on-dark bg-charcoal text-bone">
      <div className="page grid items-center gap-14 pb-24 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-x-12 lg:pb-32 lg:pt-20">
        <div className="lg:col-span-6">
          <h1
            id="hero-name"
            className="font-display text-[clamp(3.9rem,10vw,7.25rem)] leading-[0.9] tracking-[-0.03em]"
          >
            Bassey
            <br />
            Duke
          </h1>

          <p className="mt-10 max-w-[19ch] font-display text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.14] tracking-[-0.01em]">
            I build AI features people actually use, and the systems that keep
            them running.
          </p>

          <p className="mt-7 max-w-[30rem] text-[1.125rem] leading-relaxed text-smoke">
            Senior software engineer at Capital One and a photographer on the
            side, based in New York. Taking on AI contract and part-time work.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="bg-ember px-6 py-3.5 text-[1.0625rem] text-paper transition-colors duration-200 hover:bg-ember-light hover:text-charcoal"
            >
              Start a project
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-bone/70 px-6 py-3.5 text-[1.0625rem] transition-colors duration-200 hover:bg-bone hover:text-charcoal"
            >
              View résumé
            </a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <GlyphPortrait src={portrait.srcSmall} alt={portrait.alt} />
        </div>
      </div>
    </section>
  );
}
