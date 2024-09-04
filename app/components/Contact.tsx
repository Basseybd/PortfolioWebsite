"use client";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-900 py-20">
      <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            title="map"
            className="absolute inset-0"
            style={{ filter: "opacity(0.7)" }}
            src="https://www.google.com/maps/embed/v1/place?q=Philadelphia,+PA,+USA&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          />
          <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
            <div className="px-6 pb-2">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                LOCATION
              </h2>
              <p className="mt-1">Greater Philadelphia Area</p>
            </div>
            <div className="px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                EMAIL
              </h2>
              <a
                href="mailto:bassey.bd@gmail.com"
                className="text-indigo-400 leading-relaxed"
              >
                bassey.bd@gmail.com
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
