"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#off-the-clock", label: "Off the clock" },
  { href: "/photos", label: "Photos" },
  { href: "/#contact", label: "Contact" },
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
    <header className="sticky top-0 z-40 bg-ground">
      <nav className="page flex h-16 items-center justify-between" aria-label="Main">
        <a href="/" className="font-display text-[1.3rem] font-medium tracking-[-0.01em]">
          Bassey Duke
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[0.975rem] text-stone transition-colors duration-200 hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink/80 px-4 py-1.5 text-[0.975rem] transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              Résumé
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 px-2 py-2 text-[0.95rem] font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <div
        aria-hidden
        className={`chrome h-px w-full transition-opacity duration-300 ${scrolled || open ? "opacity-100" : "opacity-0"}`}
      />

      {open && (
        <ul id="mobile-menu" className="page pb-6 md:hidden">
          {[...links, { href: site.resume, label: "Résumé" }].map((l) => (
            <li key={l.href} className="border-b border-rule">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 font-display text-[1.5rem] font-medium"
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
