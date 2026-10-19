import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

// Plugins
import autoprefixer from "autoprefixer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./js", import.meta.url)),
    },
  },
  assetsInclude: ["assets/**"],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  plugins: [ViteImageOptimizer()],
});
