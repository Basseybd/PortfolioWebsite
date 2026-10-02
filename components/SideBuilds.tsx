import { sideBuilds } from "@/lib/content";

export default function SideBuilds() {
  return (
    <section id="side-builds" aria-labelledby="side-title" className="border-t border-rule">
      <div className="page grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-x-12">
        <h2 id="side-title" className="font-display text-[2.2rem] leading-tight lg:col-span-4">
          Side builds
        </h2>
        <ul className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {sideBuilds.map((b) => (
            <li key={b.title}>
              <h3 className="font-display text-[1.6rem]">{b.title}</h3>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink/85">{b.body}</p>
              <p className="label mt-3 text-stone">{b.stack}</p>
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[1rem]">
                <a href={b.live} target="_blank" rel="noopener noreferrer" className="link decoration-ember hover:text-ember">
                  {b.liveLabel}
                </a>
                <a href={b.code} target="_blank" rel="noopener noreferrer" className="link decoration-rule hover:decoration-ink">
                  Source on GitHub
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
