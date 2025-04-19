"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const [state, handleSubmit] = useForm("xoqzrlko");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("bassey.bd@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interested in working together? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">
                  LOCATION
                </h4>
                <p className="text-white">Greater Philadelphia Area</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">
                  EMAIL
                </h4>
                <div className="flex items-center">
                  <a
                    href="mailto:bassey.bd@gmail.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors mr-2"
                  >
                    bassey.bd@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">
                  CONNECT
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/basseyduke/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/Basseybd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">
              Send a Message
            </h3>

            {state.succeeded ? (
              <div className="bg-[#112211] border border-green-800 rounded-lg p-6 text-center">
                <h4 className="text-green-400 font-medium text-lg mb-2">
                  Message Sent!
                </h4>
                <p className="text-gray-300">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-[#111] border border-[#333] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-[#111] border border-[#333] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-[#111] border border-[#333] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="btn-primary w-full"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
