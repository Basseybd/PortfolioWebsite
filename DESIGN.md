# basseyduke.io design system

Bassey Duke is a senior software engineer in New York who shoots photos, hosts
parties, and travels. The site has one job: make people say "he has taste."
Most visitors arrive from Instagram and LinkedIn on a phone, often inside the
Instagram in-app browser (iOS WebKit).

## Structure: two worlds

- `/` First visit: preloader ("BASSEY" tumbling through a 3D cube, counter to
  100%, a rose blooming behind it with chromatic aberration). Then the landing:
  two doors, **Work** and **Life**. Clicking a door floods the screen and carries
  you into that world.
- `/work` Chrome world. Entered through the letters of "WORK" (glyph portal).
  Selected work wheel, experience timeline, services, side builds, toolkit,
  "Ask me anything" orb (Claude-powered), contact.
- `/life` Color world. Entered through "LIFE" with photos inside the letters.
  Filmstrip slider whose background grades to each photo's accent, editorial
  poster, "Book a shoot" for photography clients, link to `/photos`.
- `/photos` Full archive (20 photos, filters, lightbox).

## Tokens (tailwind.config.ts)

| Token | Hex | Use |
|---|---|---|
| ground | #E3E4E2 | page background (pale silver) |
| paper | #EFF0EE | raised light surfaces |
| ink | #141516 | primary text on light |
| stone | #585B5E | secondary text on light |
| rule | #C5C7C8 | hairlines on light |
| graphite | #17181A | dark sections |
| graphite-rule | #34363A | hairlines on dark |
| rice | #ECEDEB | primary text on dark |
| silver | #A7ABAF | secondary text on dark |
| chrome-light | #C9CDD1 | accents on dark |
| alu | #D4D7DA | brushed aluminum panel |
| steel | #4A4D50 | secondary text on aluminum |

Chrome utilities in `app/globals.css`: `.chrome` (horizontal polished bar),
`.chrome-v` (vertical), `.chrome-bezel` (frame), `.btn-chrome` (button),
`.brushed` (aluminum panel).

Photo accents live on each photo in `lib/content.ts` (`photo.accent`). Color
belongs to the Life world and comes from the photos. Never green UI. Never the
old cream, terracotta, or burnt orange.

## Type

- Work world display: Shippori Mincho 400/500 (`font-display`).
- Life world and preloader display: Saira Extra Condensed 700/800, uppercase
  allowed for giant display words only (`@fontsource/saira-extra-condensed`).
- Text: Zen Kaku Gothic New 400/500/700 (`font-sans`).
- Data only (stacks, camera settings, counters): Fragment Mono (`font-mono`).
- All fonts are self-hosted through Fontsource. Never load Google Fonts at runtime.

## Rules

- No em dashes anywhere, in copy or comments. Use periods or commas.
- Copy is short, plain, sentence case. Bassey's voice: casual, confident.
- Capital One work stays public-safe: no internal names, no internal numbers,
  the AI assistant's users are just "users".
- Mobile first: every component must work at 390x844 with touch, no horizontal
  page scroll, 44px touch targets.
- Motion: respect `prefers-reduced-motion` with a static fallback. Pause
  offscreen work (IntersectionObserver). No scroll traps: wheel handlers hand
  the page back at the ends.
- WebGL must fall back gracefully (WebGL2 can be missing; show the image).
- Images come from `public/photos/{slug}-{640|1200|2400}.webp` via
  `photoSrc` / `photoSrcSet` in `lib/content.ts`. Always set width and height.
- Accessibility: visible focus, labelled controls, alt text from content.
- Commit messages: no co-author trailers.
