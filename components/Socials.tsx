import { socials } from "@/components/data";

export default function Socials() {
  return (
    <section id="socials" className="py-8">
      <div className="container mx-auto flex items-center justify-end">
        <ul className="flex">
          {socials.map((social) => (
            <li className="relative w-16 h-16 mr-5" key={social.name}>
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block w-full h-full group`}
              >
                {/* Enhanced layered hover effect with smoother transitions */}
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gray-900 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:z-10 ${social.hoverColor} group-hover:opacity-10 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-105`}
                ></div>
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gray-900 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] delay-[50ms] group-hover:z-20 ${social.hoverColor} group-hover:opacity-20 group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:scale-110`}
                ></div>
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gray-900 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] delay-100 group-hover:z-30 ${social.hoverColor} group-hover:opacity-30 group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:scale-115`}
                ></div>
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gray-900 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] delay-150 group-hover:z-40 ${social.hoverColor} group-hover:opacity-40 group-hover:translate-x-8 group-hover:-translate-y-8 group-hover:scale-120`}
                ></div>
                <div
                  className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-white transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] delay-200 group-hover:z-50 ${social.hoverColor} group-hover:translate-x-10 group-hover:-translate-y-10 group-hover:scale-125 group-hover:shadow-lg`}
                >
                  {social.name === "linkedin" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 transition-transform group-hover:scale-110 duration-300"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 transition-transform group-hover:scale-110 duration-300"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path>
                    </svg>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
