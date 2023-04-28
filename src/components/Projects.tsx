import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { projects } from "../Data/data";

export default function Projects() {
  return (
    <section id="projects" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-20">
          <FontAwesomeIcon
            icon={faCode}
            className="mx-auto inline-block w-10 mb-4"
          />
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
            Apps I've Built
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Mainly Front end applications with a focus on React!
            <br className="hidden lg:inline-block" />
            click the images to visit their repositories!
          </p>
        </div>
        <div className="flex flex-col w-full -m-4">
          {projects.map((project) => (
            <div className="w-100 p-4 border flex flex-wrap">
              <a
                href={project.link}
                key={project.image}
                className="sm:w-1/2 w-100 p-4 "
              >
                <img
                  alt="gallery"
                  className="relative w-full h-full object-cover object-center"
                  src={project.image}
                />
              </a>
              <div className="sm:w-1/2 px-8 py-10 relative w-full border-4 border-gray-800 bg-gray-900">
                <h1 className="title-font text-lg font-medium text-white mb-3">
                  {project.title}
                </h1>
                <p className="leading-relaxed">{project.description}</p>
                <a
                  href={project.deployed}
                  className="sm:w-1/2 w-100 p-4 cursor-pointer text-blue-400"
                >
                  Deployed here
                </a>
                {project.note ? (
                  <>
                    <br />
                    {project.note}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
