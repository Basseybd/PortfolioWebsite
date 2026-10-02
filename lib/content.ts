// Single source for every claim on the site.
// Mirrors the Career Fact Sheet (public-safe version). Do not add metrics
// that are not in the fact sheet. No internal Capital One names or counts.

export const site = {
  name: "Bassey Duke",
  role: "Senior Software Engineer",
  email: "bassey.bd@gmail.com",
  location: "New York, NY",
  resume:
    "https://bassey-duke-static-files.s3.us-east-2.amazonaws.com/Bassey+Duke's+Resume.pdf",
  linkedin: "https://www.linkedin.com/in/basseyduke/",
  github: "https://github.com/Basseybd",
  instagram: "https://www.instagram.com/bassey.bd/",
  instagramHandle: "@bassey.bd",
  photoArchive: "https://www.instagram.com/bassey.archive/",
  photoArchiveHandle: "@bassey.archive",
  url: "https://www.basseyduke.io",
};

export const portrait = {
  src: "/bassey-duke.jpg",
  srcSmall: "/bassey-duke-1200.jpg",
  width: 2075,
  height: 2075,
  alt: "Bassey Duke smiling in a white shirt beside an orange globe lamp, photographed on film with flash",
  title: "Bassey Duke",
  caption: "Film scan, rendered in code",
};

export type Milestone = {
  year: string;
  title: string;
  org: string;
  detail: string;
};

// Chronological. Promotion years are approximate (see the fact sheet).
export const timeline: Milestone[] = [
  {
    year: "2017",
    title: "Software Engineer",
    org: "Philadelphia Parking Authority",
    detail: "Redesigned a JavaScript UI. Python automation cut processing from days to minutes.",
  },
  {
    year: "2018",
    title: "Reliability Engineer Intern",
    org: "Comcast",
    detail: "Integrated React into a legacy codebase and brought test coverage to 99%.",
  },
  {
    year: "2020",
    title: "B.S. Computer Science, AI",
    org: "Drexel University",
    detail: "Concentration in Artificial Intelligence. AJ Drexel Scholarship.",
  },
  {
    year: "2021",
    title: "Software Engineer",
    org: "Accenture",
    detail: "Replaced HP LoadRunner with JMeter for 150+ teams, saving $2M+ a year. COVID-19 outreach platform for 1M+ patients.",
  },
  {
    year: "2022",
    title: "Software Engineer II",
    org: "Accenture",
    detail: "Generative AI website platform for Accenture Song, $100M+ in revenue within 6 months. Led the move to Amazon EKS.",
  },
  {
    year: "2025",
    title: "Program Director",
    org: "Africode",
    detail: "Appointed by the CEO to run mentorship: 12 mentors, 36 mentees, 4 countries.",
  },
  {
    year: "2025",
    title: "Senior Software Engineer",
    org: "Accenture",
    detail: "Second promotion. Client engagement for a big tech company.",
  },
  {
    year: "2025",
    title: "Senior Software Engineer",
    org: "Capital One",
    detail: "AI features in production, a 67% cut in forced logouts, and builds from minutes to seconds.",
  },
];

export type Work = {
  verb: string;
  title: string;
  outcome: string;
  detail: string;
  stack: string[];
};

export const selectedWork: Work[] = [
  {
    verb: "Led full-stack integration",
    title: "AI message assistant",
    outcome: "Live in production with real users.",
    detail:
      "Reviews outgoing messages for typos, wrong information, and sensitive data before they go out. I built the human-in-the-loop review interface, the REST APIs behind it, and the MySQL data layer.",
    stack: ["LLM integration", "React", "Node.js", "MySQL"],
  },
  {
    verb: "Co-built, 9-person team",
    title: "Preference-aware chat prototype",
    outcome: "2nd place in an org-wide hackathon.",
    detail:
      "A Claude prototype that picks up user preferences from conversations and asks the follow-up a good person would. Mention seafood, and it asks what kind. The design moved on to production teams.",
    stack: ["Claude", "TypeScript", "Prompt design"],
  },
  {
    verb: "Led",
    title: "Session reliability fix",
    outcome: "Forced logouts down 67%.",
    detail:
      "Users were getting signed out mid-task. I traced it to four separate root causes in the session lifecycle using log analysis, then fixed each one, including a cross-tab sync so open tabs stop fighting each other.",
    stack: ["AWS CloudWatch", "Redis", "Node.js", "React"],
  },
  {
    verb: "Delivered",
    title: "Build migration",
    outcome: "Builds from about 5 minutes to about 2 seconds.",
    detail:
      "Evaluated 8 build tools, then moved a Create React App codebase to Rsbuild (Rspack and SWC). Upgraded TypeScript to 5.4.5 and cleared high-severity CVEs along the way.",
    stack: ["Rsbuild", "Rspack", "SWC", "TypeScript"],
  },
  {
    verb: "Led",
    title: "React upgrade with coding agents",
    outcome: "React 18.3 across 79 files, all tests passing.",
    detail:
      "Ran the refactors with Claude Code agents, covering React Router v6 and React Redux v8. Now leading the Draft.js to Tiptap editor migration that unblocks React 19.",
    stack: ["Claude Code", "React", "Tiptap"],
  },
];

export type Role = {
  title: string;
  dates: string;
  points: string[];
};

export type Job = {
  company: string;
  place: string;
  dates: string;
  note?: string;
  roles: Role[];
};

export const experience: Job[] = [
  {
    company: "Capital One",
    place: "New York",
    dates: "Aug 2025 - Present",
    roles: [
      {
        title: "Senior Software Engineer",
        dates: "Aug 2025 - Present",
        points: [
          "Led full-stack integration of a live AI assistant with human-in-the-loop review.",
          "Led the session reliability fix that cut forced logouts by 67%.",
          "Migrated the build to Rsbuild, from about 5 minutes to about 2 seconds.",
          "Automated weekly branch syncs across 10 repos. Co-managed releases with zero post-release incidents.",
          "Mentor junior engineers on AWS Lambda.",
        ],
      },
    ],
  },
  {
    company: "Accenture",
    place: "Promoted twice",
    dates: "Feb 2021 - Aug 2025",
    roles: [
      {
        title: "Senior Software Engineer",
        dates: "2025",
        points: [
          "Client engagement for a big tech company, coordinating delivery and client calls.",
        ],
      },
      {
        title: "Software Engineer II",
        dates: "2022 - 2025",
        points: [
          "Generative AI prompt-to-website platform for Accenture Song, which supported $100M+ in revenue within 6 months.",
          "Led the move from Elastic Beanstalk to Amazon EKS, eliminating production downtime.",
          "Moved the codebase from JavaScript to TypeScript, standardized on Chakra UI, and set up CI/CD across 4 environments. QA cycles down 40%.",
        ],
      },
      {
        title: "Software Engineer",
        dates: "2021 - 2022",
        points: [
          "Replaced HP LoadRunner with open-source JMeter on Amazon ECR and EKS. Adopted by 150+ teams, saving $2M+ a year in licensing.",
          "Built a full-stack COVID-19 outreach platform for a local government organization, reaching 1M+ patients.",
        ],
      },
    ],
  },
];

export const otherExperience = [
  {
    title: "Program Director, Mentorship Program",
    org: "Africode (nonprofit)",
    dates: "Jan 2025 - Present",
    detail: "Appointed by the CEO. 12 mentors and 36 mentees across 4 countries.",
  },
  {
    title: "Reliability Engineer Intern",
    org: "Comcast",
    dates: "2018",
    detail:
      "Integrated React into a legacy codebase. Brought test coverage to 99% with RSpec and Selenium.",
  },
  {
    title: "Software Engineer",
    org: "Philadelphia Parking Authority",
    dates: "2017",
    detail:
      "Redesigned a JavaScript UI. Python automation cut processing from days to minutes.",
  },
];

export const services = [
  {
    title: "LLM features in your product",
    body: "Adding AI to an app that already has users: the model calls, the APIs around them, and the interface people actually touch.",
  },
  {
    title: "Guardrails and human review",
    body: "Checks that catch bad or sensitive output before it ships, plus review flows that keep a person in control.",
  },
  {
    title: "Agentic coding workflows",
    body: "Setting up Claude Code and similar agents for large refactors and upgrades, with tests that prove nothing broke.",
  },
  {
    title: "Front-end modernization",
    body: "React upgrades, editor migrations, and build tooling that turns minutes into seconds.",
  },
];

export const sideBuilds = [
  {
    title: "DuckBot",
    body: "A Discord bot that answers questions and generates images with the OpenAI and Replicate APIs.",
    stack: "Node.js, Discord.js, OpenAI, Replicate",
    code: "https://github.com/Basseybd/discord-ai-bot",
    live: "https://discord.com/oauth2/authorize?client_id=1326301765674598591",
    liveLabel: "Add to Discord",
  },
  {
    title: "EverStay",
    body: "A home rental and booking app with listings, auth, and image hosting.",
    stack: "Next.js, TypeScript, Prisma, MongoDB, NextAuth",
    code: "https://github.com/Basseybd/EverStay",
    live: "https://everstay.vercel.app/",
    liveLabel: "Open the app",
  },
  // Add the weekend AI project here once it is live.
];

export const photography = {
  heading: "I also take pictures.",
  body: [
    "When I’m not shipping software, I’m out with a Fujifilm X100VI, shooting friends, nights out, and fashion around New York.",
    "The full archive lives on Instagram.",
  ],
};

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
};

// Drop exported JPGs into public/photos/ and list them here.
// Leave this empty and the section shows only the text and links.
export const photos: Photo[] = [];

export const toolkit = [
  {
    group: "AI",
    items: [
      "Claude",
      "LLM integration",
      "Human-in-the-loop AI",
      "AI guardrails",
      "Claude Code",
      "Windsurf",
      "Copilot",
    ],
  },
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "Redux",
      "React Router",
      "Tailwind CSS",
      "Chakra UI",
      "Material UI",
      "Tiptap",
      "Rsbuild",
    ],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "OpenAPI",
      "Prisma",
      "Knex",
      "MySQL",
      "Redis",
      "RabbitMQ",
    ],
  },
  {
    group: "Cloud",
    items: [
      "AWS Lambda",
      "SQS",
      "API Gateway",
      "ECR",
      "EKS",
      "CloudWatch",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
  },
  {
    group: "Testing",
    items: ["Jest", "React Testing Library", "Selenium"],
  },
];
