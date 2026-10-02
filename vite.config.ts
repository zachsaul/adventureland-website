import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Builds the site as plain static files (HTML/CSS/JS) for GitHub Pages.
// The page is pre-rendered at build time, so no server is needed.
export default defineConfig({
  server: { port: 8080 },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
