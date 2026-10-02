# basseyduke.io

Portfolio for Bassey Duke, an AI-focused senior software engineer in New York.
Next.js 15, React 19, TypeScript, Tailwind CSS. Deployed on Vercel.

## Editing content

Every claim on the site lives in `lib/content.ts`. Edit that file, not the
components. Keep it in sync with the Career Fact Sheet, and keep it public-safe:
no internal employer names or internal counts, and no em dashes.

## Design

"Warm Institutional x Dark Technical", staged like a small exhibition: every
project and photo gets a museum-style wall label (role, medium, place). The
palette is sampled from the portrait (wall cream, night charcoal, lamp orange).
Libre Caslon Display and Text for type, Fragment Mono for label data only.
Tokens are in `tailwind.config.ts`. Fonts are self-hosted through Fontsource,
so builds need no network access.

## Interactive pieces

- `components/GlyphPortrait.tsx`: the hero portrait drawn in code glyphs on a
  canvas. A cursor lens develops the film scan; click or tap shows the full frame.
- `components/Timeline.tsx`: experience as a pinned horizontal timeline on wide
  screens; a plain vertical or grid timeline on phones and with reduced motion.
- `components/ThinkingOrb.tsx`: a small WebGL orb in the contact form that idles,
  stirs while someone types, and works harder while the message sends.
- `components/PhotoGallery.tsx`: the photo grid and a full-screen viewer with
  arrow keys, swipe, and Escape.

All motion pauses offscreen and respects `prefers-reduced-motion`.

## Adding photos

Export JPGs into `public/photos/`, then add an entry per photo to the `photos`
array in `lib/content.ts` (src, width, height, alt, title, caption). The gallery
appears automatically once the array has entries.

## Run locally

```bash
npm install
npm run dev
```

The contact form posts to Formspree (form id `xoqzrlko`).
