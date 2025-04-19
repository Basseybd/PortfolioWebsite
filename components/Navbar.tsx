"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Determine active section
      const sections = ["projects", "skills", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-[#222]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="text-xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 relative group"
          >
            <span className="accent-gradient">Bassey Duke</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-300"></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["projects", "skills", "about", "contact"].map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className={`text-gray-300 hover:text-white transition-colors relative group ${
                  activeSection === item ? "text-white" : ""
                }`}
              >
                <span className="capitalize">{item}</span>
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 ${
                    activeSection === item ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}
            <Link
              href="https://bassey-duke-static-files.s3.us-east-2.amazonaws.com/Bassey+Duke's+Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors relative group"
            >
              <span>Resume</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#contact"
              className="btn-primary relative overflow-hidden group"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-10"></span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-[#222] backdrop-blur-md">
          <div className="px-4 pt-2 pb-4 space-y-4">
            {["projects", "skills", "about", "contact"].map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className={`block py-2 capitalize ${
                  activeSection === item
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="https://bassey-duke-static-files.s3.us-east-2.amazonaws.com/Bassey+Duke's+Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
