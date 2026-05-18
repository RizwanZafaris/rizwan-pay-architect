// Custom Vite config for rzifi.com. Builds a TanStack Start app that runs as a
// Cloudflare Worker (the worker bundle is consumed by scripts/build-static.ts
// to prerender all routes for the Hostinger static deploy).
//
// Every plugin is wired explicitly here so versions and order are visible —
// no opaque wrapper dependency.
//
// Plugin order matters:
//   1. tsconfigPaths   — resolves @/ aliases from tsconfig.json
//   2. tailwindcss     — Tailwind v4 vite plugin
//   3. tanstackRouter  — generates the route tree from src/routes/
//   4. tanstackStart   — TanStack Start SSR + server-fn machinery
//   5. viteReact       — React fast refresh (must come AFTER tanstackStart)
//   6. cloudflare      — emits dist/server/index.js as a CF Worker; consumed
//                        by scripts/build-static.ts to prerender every route
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our
      // SSR error wrapper). @cloudflare/vite-plugin builds from this entry;
      // wrangler.jsonc main alone is insufficient.
      server: { entry: "server" },
    }),
    viteReact(),
    // viteEnvironment.name="server" makes the cloudflare plugin emit the
    // worker bundle at dist/server/index.js (instead of dist/<wrangler-name>/),
    // which is the path scripts/build-static.ts imports for prerendering.
    cloudflare({ viteEnvironment: { name: "server" } }),
  ],
  // React + TanStack deduping prevents two copies of react / react-dom ending
  // up in the bundle through transitive dev-dep paths.
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});
