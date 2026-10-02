const stats = [
  { value: "97%", label: "faster builds" },
  { value: "$100M+", label: "revenue supported" },
  { value: "$2M+", label: "annual savings" },
  { value: "1M+", label: "patients reached" },
];

export default function Hero() {
  return (
    <section className="bg-cream pt-36 pb-28 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Mono location label */}
        <p className="hero-line font-mono text-[11px] uppercase tracking-widest text-secondary mb-10">
          Senior Software Engineer&nbsp;&nbsp;/&nbsp;&nbsp;New York
        </p>

        {/* Headline */}
        <h1 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.04] tracking-[-0.02em] text-primary mb-8 max-w-4xl">
          <span className="hero-line block">I build the systems</span>
          <span className="hero-line block">that make engineering</span>
          <span className="hero-line block">
            teams{" "}
            <em className="text-accent">faster.</em>
          </span>
        </h1>

        {/* Sub-line */}
        <p className="hero-line font-sans text-[17px] text-secondary leading-relaxed max-w-[62ch] mb-14">
          7+ years across fintech, consulting, and healthcare. Currently
          modernizing frontend platforms and shipping AI infrastructure at
          Capital One.
        </p>

        {/* Stats — horizontal on desktop, 2-col on mobile */}
        <div className="hero-line">
          {/* Desktop: single row with hairline dividers */}
          <div className="hidden sm:flex items-center flex-wrap gap-y-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-10 bg-line mx-8 shrink-0" />
                )}
                <div>
                  <div className="font-mono text-[1.6rem] font-medium text-primary leading-none tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-secondary mt-1.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: 2-column grid */}
          <div className="grid grid-cols-2 gap-6 sm:hidden">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-2xl font-medium text-primary leading-none tracking-tight">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-secondary mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
