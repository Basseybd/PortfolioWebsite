import { useForm, ValidationError } from "@formspree/react";
export default function ContactForm() {
  const [state, handleSubmit] = useForm("xoqzrlko");
  if (state.succeeded) {
    return <p>Thank you for your message! We will be in touch soon!</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="name" className="block text-gray-400 font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-3 transition-colors duration-200 ease-in-out"
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="block text-gray-400 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-3 transition-colors duration-200 ease-in-out"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div className="relative mb-4">
        <label htmlFor="message" className="leading-7 text-sm text-gray-400">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
      >
        Submit
      </button>
    </form>
  );
}
