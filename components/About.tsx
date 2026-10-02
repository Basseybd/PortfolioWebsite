export default function About() {
  return (
    <section
      id="about"
      className="bg-cream-deep border-t border-line py-24 px-6 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4">
          04 / About
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Pull quote */}
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-primary">
            I help engineering teams ship{" "}
            <em className="text-accent">faster.</em>
          </h2>

          {/* Paragraph */}
          <p className="font-sans text-[16px] text-secondary leading-relaxed max-w-[58ch]">
            I specialize in platform modernization and AI infrastructure,
            cutting build times, migrating design systems, and shipping
            tooling that compounds across teams. I studied Computer Science
            with an AI concentration at Drexel University, and serve as
            Program Director for Africode, a mentorship program spanning 4
            countries. Based in New York.
          </p>
        </div>
      </div>
    </section>
  );
}
