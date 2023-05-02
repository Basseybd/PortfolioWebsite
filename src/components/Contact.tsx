import { FormEvent, useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function encode(data: Record<string, any>) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", name, email, message }),
    })
      .then(() => {
        const nameInput = document.getElementById("name") as HTMLInputElement;
        const emailInput = document.getElementById("email") as HTMLInputElement;
        const messageInput = document.getElementById(
          "message"
        ) as HTMLInputElement;

        const inputs = [nameInput, emailInput, messageInput];
        inputs.forEach((input) => (input.value = ""));

        const alertDiv = document.createElement("div");

        alertDiv.innerText =
          "Thank you for your message! We will be in touch soon!";
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "50%";
        alertDiv.style.left = "50%";
        alertDiv.style.transform = "translate(-50%, -50%)";
        alertDiv.style.backgroundColor = "#4caf50";
        alertDiv.style.color = "white";
        alertDiv.style.padding = "10px";
        alertDiv.style.borderRadius = "5px";
        alertDiv.style.zIndex = "50";
        document.body.appendChild(alertDiv);

        setTimeout(() => {
          alertDiv.remove();
        }, 5000);
      })
      .catch((error) => alert(error));
  }

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
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">Greater Philadelphia Area</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                EMAIL
              </h2>
              <a
                href="mailto:bassey.bd@gmail.com"
                className="text-indigo-400 leading-relaxed"
              >
                bassey.bd@gmail.com
              </a>
              <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">(267) 580-9782</p>
            </div>
          </div>
        </div>
        <form
          data-netlify="true"
          action="/pages/success"
          name="contact"
          method="post"
          onSubmit={handleSubmit}
          className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
        >
          <input type="hidden" name="form-name" value="contact" />
          <input
            type="hidden"
            name="subject"
            value="Contact me form filled from basseyolaoluduke.com"
          />
          <h2 className="text-white text-2xl font-bold mb-5">Contact Me</h2>
          <p className="leading-relaxed mb-5">
            If you're looking for a reliable and skilled developer to help bring
            your project to life, get in touch with me today.
          </p>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block text-gray-400 font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-3 transition-colors duration-200 ease-in-out"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-gray-400 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-3 transition-colors duration-200 ease-in-out"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-400"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
