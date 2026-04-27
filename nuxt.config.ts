export default defineNuxtConfig({
  srcDir: "app/",
  dir: {
    public: "../public"
  },
  modules: ["@pinia/nuxt", "@nuxt/icon", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/bookease-icon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        }
      ]
    }
  },
  compatibilityDate: "2026-04-27",
  devtools: { enabled: true }
});
