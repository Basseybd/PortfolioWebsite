import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <header className="bg-gray-800 md:sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="title-font font-bold text-white mb-4 md:mb-0">
          <a href="#about" className="mx-auto text-xl">
            Bassey Duke
          </a>
        </div>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
          <a
            href="#projects"
            className="mr-5 py-2 px-3 text-white hover:text-white"
          >
            Past Work
          </a>
          <a
            href="#skills"
            className="mr-5 py-2 px-3 text-white hover:text-white"
          >
            Skills
          </a>
          <a
            href="https://bassey-duke-static-files.s3.us-east-2.amazonaws.com/Bassey+Duke's+Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-5 py-2 px-3 text-white hover:text-white"
          >
            My Resume
          </a>
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center bg-gray-700 border-0 py-2 px-3 focus:outline-none hover:bg-white hover:text-gray-800 rounded text-base mt-4 md:mt-0"
        >
          Let&apos;s build together!
          <FontAwesomeIcon
            icon={faChevronRight}
            className="h-3.5 w-3.5 pt-0.5 ml-1"
          />
        </a>
      </div>
    </header>
  );
}
