import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import { site, toolkit } from "@/lib/content";

export default function Contact() {
  return (
    <section aria-labelledby="contact-title" className="on-dark bg-charcoal text-bone">
      <div className="page py-24 sm:py-32">
        <div id="toolkit" className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
          <h2 className="font-display text-[2.2rem] leading-tight lg:col-span-4">Toolkit</h2>
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-3">
            {toolkit.map((t) => (
              <div key={t.group}>
                <dt className="label text-ember-light">{t.group}</dt>
                <dd className="mt-1.5 text-[1rem] leading-relaxed text-smoke">{t.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="contact" className="mt-24 grid gap-14 border-t border-charcoal-rule pt-16 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <h2
              id="contact-title"
              className="font-display text-[2.6rem] leading-[1.04] tracking-[-0.015em] sm:text-[3.4rem]"
            >
              Have an AI feature that needs to ship?
            </h2>
            <p className="mt-6 max-w-[28rem] text-[1.125rem] leading-relaxed text-smoke">
              Tell me what you&rsquo;re building, where it&rsquo;s stuck, and your
              timeline. I reply within two business days.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={`mailto:${site.email}`}
                className="link break-all font-display text-[1.5rem] decoration-ember-light hover:text-ember-light sm:text-[1.85rem]"
              >
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>
            <dl className="label mt-8 grid max-w-[22rem] grid-cols-[6.5rem_1fr] gap-y-2 text-[0.82rem]">
              <dt className="text-smoke">Based in</dt>
              <dd>{site.location}</dd>
              <dt className="text-smoke">LinkedIn</dt>
              <dd>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link decoration-smoke/50 hover:decoration-bone">
                  basseyduke
                </a>
              </dd>
              <dt className="text-smoke">GitHub</dt>
              <dd>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="link decoration-smoke/50 hover:decoration-bone">
                  Basseybd
                </a>
              </dd>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
