import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

export default defineConfig({
  assetsInclude: ["img/**"],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
