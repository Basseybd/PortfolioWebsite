"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#photos", label: "Photos" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`on-dark sticky top-0 z-40 bg-charcoal text-bone transition-[border-color] duration-200 ${
        scrolled || open ? "border-b border-charcoal-rule" : "border-b border-transparent"
      }`}
    >
      <nav className="page flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="font-display text-[1.35rem] tracking-[-0.01em]">
          Bassey Duke
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[1rem] text-smoke transition-colors duration-200 hover:text-bone">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-bone/70 px-4 py-1.5 text-[1rem] transition-colors duration-200 hover:bg-bone hover:text-charcoal"
            >
              Résumé
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="label -mr-2 px-2 py-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="page pb-6 md:hidden">
          {[...links, { href: site.resume, label: "Résumé" }].map((l) => (
            <li key={l.href} className="border-t border-charcoal-rule">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 font-display text-[1.6rem]"
                {...(l.label === "Résumé" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
