# basseyduke.io

Portfolio for Bassey Duke, an AI-focused senior software engineer in New York.
Next.js 15, React 19, TypeScript, Tailwind CSS. Deployed on Vercel.

## Editing content

Every claim on the site lives in `lib/content.ts`. Edit that file, not the
components. Keep it in sync with the Career Fact Sheet, and keep it public-safe:
no internal employer names or internal counts, and no em dashes.

## Design

Silver and chrome with a Japandi base: a pale silver ground, graphite, brushed
aluminum, and polished chrome details (`.chrome`, `.chrome-bezel`,
`.btn-chrome`, `.brushed` in `app/globals.css`). The photos are the only real
color on the page. Type is Shippori Mincho for display and Zen Kaku Gothic New
for text, with Fragment Mono only for real data like stacks and camera
settings. Tokens are in `tailwind.config.ts`. Fonts are self-hosted through
Fontsource, so builds need no network access.

## Interactive pieces

- `components/GlyphPortrait.tsx`: the hero portrait drawn in code glyphs on a
  canvas. A cursor lens develops the film scan; click or tap shows the full frame.
- `components/Timeline.tsx`: experience as a pinned horizontal timeline on wide
  screens; a plain vertical or grid timeline on phones and with reduced motion.
- `components/ThinkingOrb.tsx`: a liquid chrome orb in the contact form that idles,
  ripples while someone types, and works harder while the message sends.
- `components/PrintDeck.tsx`: the stack of prints in Off the clock. Drag or swipe
  to flip, tap to open.
- `components/PhotoArchive.tsx` and `components/Lightbox.tsx`: the `/photos` page
  with filters (kept in the URL) and a full-screen viewer with arrow keys, swipe,
  and Escape.

All motion pauses offscreen and respects `prefers-reduced-motion`.

## Adding photos

Photos live in `public/photos` in three sizes: `{slug}-640.webp`,
`{slug}-1200.webp`, and `{slug}-2400.webp`, with camera metadata and location
data stripped. Add an entry to the `photos` array in `lib/content.ts` (title,
place, category, settings, alt text). `featured: true` puts it in the home page
deck; every photo appears on `/photos`.

## Deploying

Vercel builds on Node 24 (`engines` in `package.json`). The link preview image
for LinkedIn and Instagram is `public/og.png` (1200x630).

## Run locally

```bash
npm install
npm run dev
```

The contact form posts to Formspree (form id `xoqzrlko`).
