# basseyduke.io

Portfolio for Bassey Duke, an AI-focused senior software engineer in New York
who takes photos on the side. Next.js 15, React 19, TypeScript, Tailwind CSS.
Deployed on Vercel.

## Pages

- `/` The landing. On the first visit of a session a chrome preloader runs
  ("BASSEY" tumbling through a cube, a counter to 100%), then two doors: **Work**
  and **Life**, each a pixel abstract that wakes up on hover.
- `/work` The portfolio: hero, selected work, experience, services, side
  builds, a short Off the clock band, and contact.
- `/life` Quick and short: a hello, a deck of favorite photos, links to the
  archive and Instagram, and a line for booking a shoot.
- `/photos` The full archive with filters and a lightbox.

## Editing content

Every claim on the site lives in `lib/content.ts`. Edit that file, not the
components. Keep it in sync with the Career Fact Sheet, and keep it public-safe:
no internal employer names or internal counts, and no em dashes.

## Design

Silver and chrome with a Japandi base: a pale silver ground, graphite, brushed
aluminum, and polished chrome details (`.chrome`, `.chrome-bezel`,
`.btn-chrome`, `.brushed` in `app/globals.css`). The photos are the only real
color on the site. Type is Shippori Mincho for display and Zen Kaku Gothic New
for text, with Fragment Mono only for real data like stacks, counters and
camera settings. Saira Extra Condensed is used only for the preloader letters.
Tokens are in `tailwind.config.ts`; the rules are in `DESIGN.md`. Fonts are
self-hosted through Fontsource, so builds need no network access.

## Interactive pieces

- `components/ui/chroma-glitch-preloader.tsx`: the intro. A WebGL liquid chrome
  surface with a touch of chromatic aberration, grain and scanlines. Any tap or
  key skips it. `components/landing/Landing.tsx` decides when it plays: the
  inline script in `app/layout.tsx` marks the first page load of a session
  (`html[data-intro]`) before paint, so returning visitors never see it.
- `components/landing/PixelField.tsx`: the door graphics. Work is the same
  liquid chrome as the preloader, drawn as a halftone of silver squares. Life is
  the featured photos downsampled into a mosaic that flips cell by cell to the
  next photo. Hover speeds both up and the cursor pushes the pixels around.
- `components/transition/WorldTransition.tsx`: crossing between worlds floods
  the screen from the click point, graphite and chrome for Work, the photo's own
  color for Life.
- `components/GlyphPortrait.tsx`: the hero portrait drawn in code glyphs on a
  canvas. A cursor lens develops the film scan; click or tap shows the full frame.
- `components/Timeline.tsx`: experience as a pinned horizontal timeline on wide
  screens; a plain vertical or grid timeline on phones and with reduced motion.
- `components/ThinkingOrb.tsx`: a liquid chrome orb in the contact form that idles,
  ripples while someone types, and works harder while the message sends.
- `components/PrintDeck.tsx`: the stack of prints on `/life`. Drag or swipe to
  flip, tap to open.
- `components/PhotoArchive.tsx` and `components/Lightbox.tsx`: the `/photos` page
  with filters (kept in the URL) and a full-screen viewer with arrow keys, swipe,
  and Escape.

All motion pauses offscreen and respects `prefers-reduced-motion` (the
preloader is skipped and the doors hold a still frame).

## Adding photos

Photos live in `public/photos` in three sizes: `{slug}-640.webp`,
`{slug}-1200.webp`, and `{slug}-2400.webp`, with camera metadata and location
data stripped. Add an entry to the `photos` array in `lib/content.ts` (title,
place, category, settings, alt text, accent). `featured: true` puts it in the
Life door and the deck on `/life`; every photo appears on `/photos`. `accent` is
the color the screen floods with when someone steps through the Life door while
that photo is showing.

## Deploying

Vercel builds on Node 24 (`engines` in `package.json`; set Node.js Version to
24.x in the Vercel project settings too). The link preview image for LinkedIn
and Instagram is `public/og.png` (1200x630). Icons are the chrome "B" monogram
in `public/` (favicon, Apple touch icon, and `site.webmanifest`).

## Run locally

```bash
npm install
npm run dev
```

The contact form posts to Formspree (form id `xoqzrlko`).
