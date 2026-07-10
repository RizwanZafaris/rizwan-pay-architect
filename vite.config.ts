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
//   3. tanstackStart   — SSR + server-fn machinery, AND the router plugin
//                        (route-tree generation + code splitting) internally
//   4. viteReact       — React fast refresh (must come AFTER tanstackStart)
//   5. cloudflare      — emits dist/server/index.js as a CF Worker; consumed
//                        by scripts/build-static.ts to prerender every route
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";

// start-server-core imports virtual specifiers (#tanstack-router-entry,
// tanstack-start-manifest:v, ...) that only the Start plugin can resolve.
// esbuild's prebundler does not run Vite resolvers, so scanning that package
// hard-fails `vite dev`. Excluding it is dev-only — the Cloudflare worker
// build resolves them normally. See TanStack/router#5554 and #5795.
//
// The package is excluded AND each virtual specifier is named: if any other
// dependency drags start-server-core into a scan we did not anticipate, the
// specifiers themselves still resolve to "external" instead of hard-failing.
const OPTIMIZE_EXCLUDE = [
  "@tanstack/start-server-core",
  "#tanstack-router-entry",
  "#tanstack-start-entry",
  "#tanstack-start-plugin-adapters",
  "tanstack-start-manifest:v",
  "tanstack-start-injected-head-scripts:v",
];

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    // NOTE: do NOT also register `tanstackRouter()` here. tanstackStart bundles
    // the router plugin (start-plugin-core/start-router-plugin). Running both
    // applies the code-splitting codemod twice: the first pass rewrites a route
    // into a `TSRSplitComponent` reference, the second strips its definition —
    // producing `ReferenceError: TSRSplitComponent is not defined` at SSR.
    // Router options belong under `router` below.
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our
      // SSR error wrapper). @cloudflare/vite-plugin builds from this entry;
      // wrangler.jsonc main alone is insufficient.
      server: { entry: "server" },
      // autoCodeSplitting is not passed: start-plugin-core already defaults it
      // to true (schema.js), so the old explicit `tanstackRouter({ autoCodeSplitting: true })`
      // is preserved in behaviour without re-registering the plugin.
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
  optimizeDeps: {
    exclude: OPTIMIZE_EXCLUDE,
  },
  ssr: {
    optimizeDeps: {
      exclude: OPTIMIZE_EXCLUDE,
    },
  },
  // The cloudflare plugin runs its own Vite environment (named "server" above).
  // Per-environment optimizeDeps replaces the top-level one, so the exclusion
  // has to be repeated here or the prebundler still scans start-server-core.
  environments: {
    server: {
      optimizeDeps: {
        exclude: OPTIMIZE_EXCLUDE,
      },
    },
    ssr: {
      optimizeDeps: {
        exclude: OPTIMIZE_EXCLUDE,
      },
    },
  },
});
