import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

const projects: Project[] = [
  {
    title: "Genius AI",
    description:
      "AI SaaS platform generating images, video, music, and code via OpenAI and Replicate APIs, with Stripe subscription billing.",
    tags: ["Next.js", "TypeScript", "Prisma", "OpenAI", "Replicate", "Stripe"],
    href: "https://github.com/Basseybd",
  },
  {
    title: "EverStay",
    description:
      "Vacation rental marketplace with search, booking flow, Cloudinary media uploads, and NextAuth OAuth.",
    tags: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Cloudinary"],
    href: "https://everstay.vercel.app",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-ink grid-texture border-t border-line-dark py-24 px-6 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-widest text-inverse-muted mb-4">
          02 / Projects
        </p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-inverse mb-14">
          Where I've shipped.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-ink-raised border border-line-dark p-8 hover:border-accent transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-serif text-[1.5rem] text-inverse leading-snug">
                  {project.title}
                </h3>
                <ArrowUpRight
                  size={18}
                  className="text-inverse-muted group-hover:text-accent transition-colors duration-200 shrink-0 mt-1"
                />
              </div>

              <p className="font-sans text-[15px] text-inverse-muted leading-relaxed mb-7">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-widest text-inverse-muted border border-line-dark px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
