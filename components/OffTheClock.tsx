import PrintDeck from "@/components/PrintDeck";
import { offTheClock, photos, site } from "@/lib/content";

export default function OffTheClock() {
  const featured = photos.filter((p) => p.featured);
  return (
    <section id="off-the-clock" aria-labelledby="otc-title" className="on-dark overflow-hidden bg-graphite text-rice">
      <div className="page grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <h2
            id="otc-title"
            className="font-display text-[2.9rem] font-medium leading-[1.02] tracking-[-0.02em] sm:text-[4rem]"
          >
            {offTheClock.heading}
          </h2>
          <div aria-hidden className="chrome mt-8 h-[2px] w-24" />
          {offTheClock.body.map((p) => (
            <p key={p} className="mt-6 max-w-[30rem] text-[1.125rem] leading-relaxed text-silver first-of-type:text-rice">
              {p}
            </p>
          ))}
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="/photos"
              className="btn-chrome px-6 py-3.5 text-[1rem] font-medium"
            >
              See all {photos.length} photos
            </a>
            <a
              href={site.photoArchive}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-rice/60 px-6 py-3.5 text-[1rem] font-medium transition-colors duration-200 hover:border-rice hover:bg-rice hover:text-graphite"
            >
              {site.photoArchiveHandle} on Instagram
            </a>
          </div>
          <p className="label mt-8 text-silver">Fujifilm X100VI, 23mm</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <PrintDeck photos={featured} />
        </div>
      </div>
    </section>
  );
}
