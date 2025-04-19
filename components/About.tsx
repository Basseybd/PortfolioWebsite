import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-[#080808] py-24">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-lg mb-6">About Me</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                I'm a software engineer with nearly 5 years at Accenture,
                specializing in front-end and full-stack development. My passion
                lies in creating elegant solutions to complex problems.
              </p>
              <p>
                I build scalable applications, streamline user experiences, and
                deliver innovative solutions that drive business impact. My
                approach combines technical expertise with a keen eye for design
                and user experience.
              </p>
              <p>
                When I'm not coding, you can find me staying active with
                running, rock climbing, and Muay Thai. I'm also an avid baker
                and occasionally post my adventures on Instagram - if you're
                lucky, you might find me there! ;)
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500/20">
              <Image
                src="/bassey.jpg"
                alt="Bassey Duke"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
