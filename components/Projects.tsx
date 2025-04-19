import Image from "next/image";
import Link from "next/link";
import { projects } from "@/components/data";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="bg-[#080808] py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of applications I've built using modern web
            technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.image} className="card group overflow-visible">
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="object-cover object-center w-full h-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  width={600}
                  height={400}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-center">
                      <Link
                        href={project.deployed}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Demo</span>
                      </Link>
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors flex items-center gap-1"
                      >
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                {project.note && (
                  <p className="text-sm text-gray-500 italic">{project.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="https://github.com/Basseybd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary relative overflow-hidden group"
          >
            <span className="relative z-10">View More on GitHub</span>
            <span className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-20"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
