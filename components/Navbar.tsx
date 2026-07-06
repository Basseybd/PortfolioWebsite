"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md border-b border-line"
          : "bg-cream"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl text-primary hover:text-accent transition-colors duration-200"
        >
          BD
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="font-mono text-[11px] uppercase tracking-widest px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-cream transition-all duration-200"
          >
            Resume
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary p-1 -mr-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu — height transition via max-h */}
      <div
        className={`md:hidden overflow-hidden border-t border-line bg-cream transition-all duration-300 ${
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="px-6 py-6 flex flex-col gap-5"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-[11px] uppercase tracking-widest text-secondary hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            onClick={() => setMobileOpen(false)}
            className="font-mono text-[11px] uppercase tracking-widest px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-cream transition-all w-fit"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
