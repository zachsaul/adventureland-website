# Notes for Claude

This is the Adventureland band site. Zach updates it by asking Claude, so keep changes
focused and explain them in plain language.

- Stack: React 19 + TanStack Start (pre-rendered to static HTML) + Tailwind CSS 4, built with Vite.
- Hosting: GitHub Pages. Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs
  `npm ci && npm run build` and publishes `dist/client`. There is no server, so don't add server
  functions, API routes or anything needing a backend.
- Almost all content is in `src/routes/index.tsx`; styling is in `src/styles.css`.
- Photos/video go in `public/media/` and are referenced through `src/lib/media.ts`.
- Before finishing a change, run `npm run build` and make sure it succeeds.
- Game behavior to preserve: score and bonus shots reset on every page load and never persist;
  bonuses only happen on successful shots; cat, Dan, Nate, Tetra and Scout reactions fire on every
  3rd hit of that group. After Dan's reaction both Dan clowns leave the lineup, and after Scout's
  she leaves; they come back on refresh. Plus a one-time 1,000-point "Lopez Titan" reaction.
- Layout: full-width carnival bands (navy game, cream Polaroids, textured red music/tour,
  black biography/TV) separated by matching zigzag edges.
