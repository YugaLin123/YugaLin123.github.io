import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/YugaLin123.github.io/",
  server: {
    host: "0.0.0.0",
    https: false,
  },
});
