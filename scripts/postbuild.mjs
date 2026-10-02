// Small tidy-up after `vite build` so the output is ready for GitHub Pages.
import { copyFile, writeFile } from "node:fs/promises";

const out = "dist/client";
await copyFile(`${out}/index.html`, `${out}/404.html`); // unknown URLs show the site, not a GitHub error page
await writeFile(`${out}/.nojekyll`, ""); // tell GitHub to serve files as-is
console.log("Site ready in dist/client/");
