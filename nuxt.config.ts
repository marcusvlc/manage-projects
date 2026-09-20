import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Encode Sans Expanded": [300, 400, 500, 600, 700],
      "Encode Sans Semi Expanded": [300, 400, 500, 600, 700],
    },
    display: "swap",
    download: true,
  },
  imports: {
    dirs: ["composables/**"],
  },
});
