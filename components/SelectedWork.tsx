import Spotlight from "@/components/Spotlight";
import { selectedWork } from "@/lib/content";

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title">
      <div className="page pb-24 pt-6 sm:pb-32">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-x-12">
          <h2
            id="work-title"
            className="font-display text-[2.6rem] font-medium leading-[1.05] tracking-[-0.015em] sm:text-[3.25rem] lg:col-span-5"
          >
            Selected work
          </h2>
          <p className="max-w-[32rem] text-[1.0625rem] leading-relaxed text-stone lg:col-span-6 lg:col-start-7 lg:pt-4">
            Recent work at Capital One, shared without internal details. Each
            entry says exactly what my part was.
          </p>
        </div>

        <Spotlight className="mt-14 border-t border-ink/20">
          {selectedWork.map((w, i) => (
            <article
              key={w.title}
              className="spotlight grid gap-6 border-b border-ink/20 py-12 lg:grid-cols-12 lg:gap-x-12 lg:py-14"
            >
              <dl className="order-2 space-y-1.5 lg:order-1 lg:col-span-4">
                <dt className="sr-only">My part</dt>
                <dd className="text-[0.95rem] font-medium text-ink">{w.verb}</dd>
                <dt className="sr-only">Stack</dt>
                <dd className="label text-stone">{w.stack.join(", ")}</dd>
              </dl>

              <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
                <h3
                  className={`font-display font-medium leading-[1.12] tracking-[-0.01em] ${
                    i === 0 ? "text-[2.2rem] sm:text-[2.9rem]" : "text-[1.9rem] sm:text-[2.3rem]"
                  }`}
                >
                  {w.title}
                </h3>
                <p className="mt-3 font-display text-[1.3rem] leading-snug text-ink">{w.outcome}</p>
                <p className="mt-5 max-w-[38rem] text-[1.0625rem] leading-relaxed text-stone">{w.detail}</p>
              </div>
            </article>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
