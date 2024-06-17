import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  assetsInclude: ["**/*.png", "**/*.ico", "**/*.svg", "**/*.jpg", "**/*.jpeg"],
  publicDir: "public",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        theme_color: "#09652e",
        background_color: "#fff9e8",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "https://geo-api.frannoflix.xyz/assets/PWA/icon512_maskable.png", // updated path
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "https://geo-api.frannoflix.xyz/assets/PWA/icon512_rounded.png", // updated path
            type: "image/png",
          },
        ],
        orientation: "portrait",
        display: "standalone",
        lang: "da-DK",
        name: "Geografisk Have",
        short_name: "Geografisk Have",
        description: "Geografisk have app - Webudvikler 2. semester",
        id: "/",
      },
    }),
  ],
});
