import { skills } from "@/components/data";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Skills() {
  // Group skills by category
  const categories = {
    "AI / Prompt Engineering": skills.slice(0, 3),
    "Front End": skills.slice(3, 10),
    Backend: skills.slice(10, 16),
    "Cloud / DevOps": skills.slice(16),
  };

  // Skill descriptions for hover cards
  const skillDescriptions: Record<string, string> = {
    Replicate:
      "Used for deploying and running machine learning models in the cloud",
    OpenAI:
      "Integrated GPT models for natural language processing and generation",
    v0: "Leveraged Vercel's AI assistant for development and code generation",
    "Next.js":
      "Built production-ready React applications with server-side rendering",
    "React.js": "Created interactive UIs with component-based architecture",
    TypeScript:
      "Enhanced JavaScript with static type definitions for better code quality",
    Auth0: "Implemented secure authentication and authorization solutions",
    "AWS ecosystem":
      "Deployed and managed cloud infrastructure on Amazon Web Services",
    Vercel: "Deployed and hosted web applications with continuous integration",
  };

  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Skills & Technologies</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies I've worked with professionally and on side projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(categories).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categorySkills.map((skill) => (
                  <HoverCard key={skill}>
                    <HoverCardTrigger asChild>
                      <div className="bg-[#111] border border-[#333] rounded-md p-3 hover:border-blue-500 hover:bg-[#151515] transition-all duration-300 cursor-pointer group relative overflow-hidden">
                        <span className="text-gray-200 group-hover:text-white transition-colors relative z-10">
                          {skill}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </HoverCardTrigger>
                    {skillDescriptions[skill] && (
                      <HoverCardContent className="w-72">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-blue-400">
                            {skill}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {skillDescriptions[skill]}
                          </p>
                        </div>
                      </HoverCardContent>
                    )}
                  </HoverCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
