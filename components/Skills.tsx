const stack: { label: string; items: string[] }[] = [
  {
    label: "Languages & Frameworks",
    items: ["TypeScript", "JavaScript", "Python", "React 18/19", "Next.js", "Node.js", "Express"],
  },
  {
    label: "Backend & APIs",
    items: ["REST APIs", "PostgreSQL", "Prisma ORM", "AWS Lambda", "Elastic Beanstalk"],
  },
  {
    label: "Cloud & Infrastructure",
    items: ["AWS (EC2, S3, EKS, ECR)", "Docker", "Kubernetes", "GitHub Actions", "CI/CD pipelines"],
  },
  {
    label: "Frontend & UI",
    items: ["Shadcn/UI", "MUI", "Tailwind CSS", "Redux", "Rsbuild / Rspack / SWC", "Mixpanel"],
  },
  {
    label: "AI & Tooling",
    items: ["Claude", "Claude Code", "Windsurf", "Microsoft Copilot", "OpenAI API", "Replicate API", "Agentic coding workflows"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-cream border-t border-line py-24 px-6 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4">
          03 / Stack
        </p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-primary mb-14">
          What I build with.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {stack.map((group) => (
            <div key={group.label}>
              <h3 className="font-serif text-base text-primary mb-3">
                {group.label}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] uppercase tracking-wide text-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
