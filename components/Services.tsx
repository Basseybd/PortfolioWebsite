import SectionHead from "@/components/SectionHead";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-rule">
      <div className="page py-24 sm:py-32">
        <SectionHead
          id="services-title"
          title="What I take on"
          intro="Contract or part-time work, remote or in New York. Best fit: teams that want AI in a real product, not a demo."
        />

        <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <dl className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {services.map((s) => (
              <div key={s.title} className="border-t-2 border-ember pt-5">
                <dt className="font-display text-[1.6rem] leading-snug">{s.title}</dt>
                <dd className="mt-3 text-[1.0625rem] leading-relaxed text-ink/80">{s.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
