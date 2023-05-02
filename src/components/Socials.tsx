import { socials } from "../Data/data";

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
                className="relative block w-full h-full group"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gray-900 transition-transform transform duration-500 ease-in-out group-hover:z-10 group-hover:${social.hoverColor} group-hover:opacity-10 group-hover:translate-x-2
                  } group-hover:-translate-y-2 `}
                ></div>
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gray-900 transition-transform transform duration-500 ease-in-out group-hover:z-20 group-hover:${social.hoverColor} group-hover:opacity-20 group-hover:translate-x-4
                  } group-hover:-translate-y-4 `}
                ></div>
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gray-900 transition-transform transform duration-500 ease-in-out group-hover:z-30 group-hover:${social.hoverColor} group-hover:opacity-30 group-hover:translate-x-6
                  } group-hover:-translate-y-6 `}
                ></div>
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gray-900 transition-transform transform duration-500 ease-in-out group-hover:z-40 group-hover:${social.hoverColor} group-hover:opacity-40 group-hover:translate-x-8
                  } group-hover:-translate-y-8 `}
                ></div>
                <div
                  className={`absolute top-0 left-0 w-full  h-full flex items-center justify-center text-white text-3xl transition-transform transform duration-500 ease-in-out group-hover:z-50 group-hover:${social.hoverColor} group-hover:translate-x-10 group-hover:-translate-y-10 `}
                >
                  <i className={`fa fa-${social.name}`} />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
