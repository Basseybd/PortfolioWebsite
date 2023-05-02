import Socials from "./Socials";

export default function About() {
  return (
    <section id="about" className="bg-white">
      <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <img
            src={require("../Assests/bassey.png")}
            alt="bassey profile"
            className="h-52 w-52 rounded-full"
          />
          <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-4">
            Hi, I'm Bassey Duke.
          </h1>
          <p className="mb-8 leading-relaxed text-gray-700">
            Currently working at Accenture as a Software Engineering Consultant.
            <br className="hidden lg:inline-block" /> I am a graduate of Drexel
            University and majored in Computer Science with a track in both
            Artificial Intelligence and Human-Computer Interaction.
          </p>
          <div className="flex justify-center">
            <a
              href="#contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mr-2"
            >
              Work With Me
            </a>
            <a
              href="#projects"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg"
            >
              See My Past Work
            </a>
          </div>
        </div>
        <div className="md:w-1/2 ">
          <Socials />
        </div>
      </div>
    </section>
  );
}
