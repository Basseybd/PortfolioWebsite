import { site } from "@/lib/content";

export default function Footer() {
  const links = [
    { href: site.linkedin, label: "LinkedIn" },
    { href: site.github, label: "GitHub" },
    { href: site.photoArchive, label: "Photo archive" },
    { href: site.resume, label: "Résumé" },
  ];
  return (
    <footer className="on-dark border-t border-charcoal-rule bg-charcoal text-smoke">
      <div className="page flex flex-wrap items-center justify-between gap-4 py-8">
        <p className="label">&copy; {new Date().getFullYear()} Bassey Duke</p>
        <ul className="label flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-bone">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
