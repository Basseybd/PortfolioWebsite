import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { projects } from "../Data/data";

export default function Projects() {
  return (
    <section id="projects" className="bg-gray-100">
      <div className="container mx-auto px-4 py-16 lg:px-20">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
            Apps I've Built
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Mainly front-end applications with a focus on React! Click the
            images to visit their repositories.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.image}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <img
                  alt="project"
                  className="w-full h-56 object-cover object-center"
                  src={project.image}
                />
              </a>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faCode}
                    className="text-blue-600 mr-2"
                  />
                  <h2 className="text-xl font-bold text-gray-800">
                    {project.title}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={project.deployed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Site
                  </a>
                  {project.note && (
                    <p className="text-sm text-gray-600">{project.note}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
