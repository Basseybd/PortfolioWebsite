const items = [
  "Leading React 19 migration, 661-file design system conversion using AI-driven code translation",
  "Shipping AI message-assistant infrastructure at Capital One",
  "Program Director, Africode mentorship, 12 mentors, 36 mentees, 4 countries",
];

export default function Currently() {
  return (
    <section
      id="currently"
      className="bg-ink grid-texture border-t border-line-dark py-16 px-6 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-widest text-inverse-muted mb-10">
          Currently
        </p>
        <div className="grid md:grid-cols-3 gap-8 md:gap-16">
          {items.map((item, i) => (
            <p
              key={i}
              className="font-sans text-[15px] text-inverse leading-relaxed"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
