"use client";

import { useState } from "react";

type Role = {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
  preview: number;
};

const roles: Role[] = [
  {
    company: "Capital One",
    title: "Senior Software Engineer",
    location: "New York",
    dates: "Aug 2025 – Present",
    preview: 3,
    bullets: [
      "Migrated deprecated CRA frontend monorepo to Rsbuild (Rspack + SWC) after evaluating 8 build tools; cut cold-start builds 97% (5 min to 2 sec), resolved high-severity CVEs, and unblocked the React 19 upgrade path",
      "Executed a React 17 to 18.3 upgrade across 79 files with full passing test coverage; now leading the React 19 migration including a 661-file MUI-to-Shadcn conversion powered by AI-driven code translation",
      "Built full-stack infrastructure for an AI-powered message assistant across 2 repositories and 4 cross-team PRs, shipped to 1000+ users",
      "Won 2nd place in an org-wide hackathon: real-time Claude AI chat-preference extraction closing data gaps across 21,600+ user profiles; design adopted by 2 production teams",
      "Designed and shipped the team's Mixpanel analytics architecture with a reusable AWS-connected package",
      "Modernized the icon system across 253 files, reducing bundle size 20%, and built branch-sync automation across 10 repositories",
    ],
  },
  {
    company: "Accenture",
    title: "Senior Software Engineer",
    location: "Philadelphia",
    dates: "Feb 2021 – Aug 2025",
    preview: 3,
    bullets: [
      "Led migration of a GenAI prompt-to-website platform from Elastic Beanstalk to EKS; TypeScript conversion, CI/CD across 4 environments, cut QA cycles 40%, supported $100M+ revenue in six months",
      "Spearheaded an open-source JMeter replacement for HP LoadRunner on AWS ECR/EKS; adopted by 150+ internal teams, saving $2M+ annually",
      "Built a full-stack COVID health outreach platform delivering targeted messaging to 1M+ patients",
    ],
  },
  {
    company: "Africode",
    title: "Program Director, Mentorship Program",
    location: "Remote",
    dates: "Jan 2025 – Aug 2025",
    preview: 3,
    bullets: [
      "Appointed by the CEO to lead a mentorship program pairing 12 mentors with 36 mentees across 4 countries",
    ],
  },
  {
    company: "Comcast",
    title: "Reliability Engineer",
    location: "Philadelphia",
    dates: "Mar 2018 – Sep 2018",
    preview: 3,
    bullets: [
      "Integrated React into a legacy codebase with RSpec/Selenium testing at 99% coverage",
    ],
  },
  {
    company: "Philadelphia Parking Authority",
    title: "Software Engineer",
    location: "Philadelphia",
    dates: "Mar 2017 – Sep 2017",
    preview: 3,
    bullets: [
      "Redesigned the public UI and automated data entry, cutting processing from days to minutes",
    ],
  },
];

function RoleEntry({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? role.bullets : role.bullets.slice(0, role.preview);
  const remaining = role.bullets.length - role.preview;

  return (
    <div className="py-10 border-b border-line last:border-b-0">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
        <div>
          <h3 className="font-serif text-[1.35rem] leading-snug text-primary">
            {role.company}
          </h3>
          <p className="font-serif text-base text-secondary mt-0.5">
            {role.title}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
            {role.dates}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mt-0.5">
            {role.location}
          </p>
        </div>
      </div>

      {/* Bullets */}
      <ul className="space-y-2.5">
        {shown.map((bullet, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-mono text-[10px] text-secondary mt-[5px] shrink-0">
              —
            </span>
            <span className="font-sans text-[15px] text-secondary leading-relaxed">
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      {/* Expand toggle */}
      {remaining > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 font-mono text-[10px] uppercase tracking-widest text-accent hover:text-primary transition-colors duration-200"
        >
          {expanded ? "Show less ↑" : `${remaining} more ↓`}
        </button>
      )}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="bg-cream border-t border-line py-24 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
            01 / Experience
          </p>
        </div>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-primary mb-12">
          Where I've worked.
        </h2>

        {/* Timeline */}
        <div className="border-t border-line">
          {roles.map((role) => (
            <RoleEntry key={role.company + role.dates} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
