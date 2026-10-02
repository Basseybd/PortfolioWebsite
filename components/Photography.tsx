import PhotoGallery from "@/components/PhotoGallery";
import { photography, photos, site } from "@/lib/content";

export default function Photography() {
  return (
    <section id="photos" aria-labelledby="photos-title" className="border-t border-rule bg-paper">
      <div className="page py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <h2
            id="photos-title"
            className="font-display text-[2.9rem] leading-[1] tracking-[-0.02em] sm:text-[4rem] lg:col-span-5"
          >
            {photography.heading}
          </h2>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            {photography.body.map((p) => (
              <p key={p} className="mb-4 max-w-[34rem] text-[1.1875rem] leading-relaxed text-ink/85">
                {p}
              </p>
            ))}

            <dl className="label mt-8 grid max-w-[30rem] grid-cols-[6.5rem_1fr] gap-y-2 border-t border-ink pt-4 text-[0.82rem]">
              <dt className="text-stone">Archive</dt>
              <dd>
                <a href={site.photoArchive} target="_blank" rel="noopener noreferrer" className="link decoration-ember hover:text-ember">
                  {site.photoArchiveHandle}
                </a>
              </dd>
              <dt className="text-stone">Personal</dt>
              <dd>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link decoration-rule hover:decoration-ink">
                  {site.instagramHandle}
                </a>
              </dd>
              <dt className="text-stone">Camera</dt>
              <dd>Fujifilm X100VI</dd>
            </dl>
          </div>
        </div>

        {photos.length > 0 && (
          <div className="mt-16">
            <PhotoGallery photos={photos} />
          </div>
        )}
      </div>
    </section>
  );
}
