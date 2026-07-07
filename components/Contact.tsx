"use client";

import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const [state, handleSubmit] = useForm("xoqzrlko");

  return (
    <>
      <section
        id="contact"
        className="bg-ink grid-texture border-t border-line-dark py-24 px-6 sm:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Big closing headline */}
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight text-inverse mb-10">
            Let's talk.
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Contact info */}
            <div>
              <a
                href="mailto:bassey.bd@gmail.com"
                className="block font-sans text-[1.1rem] text-accent hover:text-inverse transition-colors duration-200 mb-8 underline underline-offset-4 decoration-accent/40 hover:decoration-inverse/40"
              >
                bassey.bd@gmail.com
              </a>

              <div className="flex gap-8">
                <a
                  href="https://linkedin.com/in/basseyduke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-widest text-inverse-muted hover:text-inverse transition-colors duration-200"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com/Basseybd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-widest text-inverse-muted hover:text-inverse transition-colors duration-200"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* Contact form */}
            {state.succeeded ? (
              <div className="border border-line-dark p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-inverse-muted mb-1">
                  Sent
                </p>
                <p className="font-sans text-[15px] text-inverse">
                  Message received. I'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-[10px] uppercase tracking-widest text-inverse-muted mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-transparent border border-line-dark px-4 py-3 font-sans text-[15px] text-inverse placeholder:text-inverse-muted focus:outline-none focus:border-inverse transition-colors duration-200"
                    placeholder="Your name"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-[10px] uppercase tracking-widest text-inverse-muted mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border border-line-dark px-4 py-3 font-sans text-[15px] text-inverse placeholder:text-inverse-muted focus:outline-none focus:border-inverse transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[10px] uppercase tracking-widest text-inverse-muted mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent border border-line-dark px-4 py-3 font-sans text-[15px] text-inverse placeholder:text-inverse-muted focus:outline-none focus:border-inverse transition-colors duration-200 resize-none"
                    placeholder="What's on your mind?"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="font-mono text-[11px] uppercase tracking-widest px-6 py-3 bg-accent text-cream hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50"
                >
                  {state.submitting ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink border-t border-line-dark px-6 sm:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-widest text-inverse-muted">
            Bassey Duke&nbsp;&nbsp;/&nbsp;&nbsp;New York&nbsp;&nbsp;/&nbsp;&nbsp;2026
          </p>
        </div>
      </footer>
    </>
  );
}
