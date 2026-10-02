# Adventureland — band website

The official Adventureland site. It's a single page built with React, TanStack Start and
Tailwind CSS, published as static files on GitHub Pages.

## How updates work

1. Edit the site (with Claude in Cowork, or by hand).
2. Push the change to the `main` branch on GitHub.
3. GitHub Actions rebuilds the site and publishes it automatically, usually within 2 minutes.
   Progress is shown in the repo's **Actions** tab.

## Where things live

| What | Where |
| --- | --- |
| The page itself (sections, text, links, tour dates, game) | `src/routes/index.tsx` |
| Colors, fonts, layout and animations | `src/styles.css` |
| Page title, description, Google Fonts | `src/routes/__root.tsx` |
| Photos and video | `public/media/` (paths listed in `src/lib/media.ts`) |
| Auto-publish setup | `.github/workflows/deploy.yml` |

## Working on it locally (optional)

Requires Node.js 22+.

```sh
npm install
npm run dev      # live preview at http://localhost:8080
npm run build    # production build into dist/client
```
