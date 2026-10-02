import Spotlight from "@/components/Spotlight";
import { selectedWork } from "@/lib/content";

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      <div className="page py-24 sm:py-32">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <h2
              id="work-title"
              className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.015em] sm:text-[3.25rem]"
            >
              Selected work
            </h2>
            <p className="mt-5 max-w-[26rem] text-[1.125rem] leading-relaxed text-stone">
              Recent work at Capital One, shared without internal details. Each
              label says exactly what my part was.
            </p>
          </div>
        </div>

        <Spotlight className="mt-16 border-t border-ink/20">
          {selectedWork.map((w, i) => (
            <article
              key={w.title}
              className="spotlight grid gap-6 border-b border-ink/20 py-12 lg:grid-cols-12 lg:gap-x-12 lg:py-14"
            >
              <dl className="label order-2 space-y-1 lg:order-1 lg:col-span-4">
                <dt className="sr-only">Role</dt>
                <dd className="text-ember">{w.verb}</dd>
                <dt className="sr-only">Medium</dt>
                <dd className="text-stone">{w.stack.join(", ")}</dd>
                <dt className="sr-only">Where</dt>
                <dd className="text-stone">Capital One</dd>
              </dl>

              <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
                <h3
                  className={`font-display leading-[1.08] tracking-[-0.01em] ${
                    i === 0 ? "text-[2.25rem] sm:text-[3rem]" : "text-[2rem] sm:text-[2.4rem]"
                  }`}
                >
                  {w.title}
                </h3>
                <p className="mt-3 text-[1.3rem] italic leading-snug text-ink">{w.outcome}</p>
                <p className="mt-5 max-w-[38rem] text-[1.0625rem] leading-relaxed text-stone">
                  {w.detail}
                </p>
              </div>
            </article>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
