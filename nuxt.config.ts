// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["v-gsap-nuxt", "@nuxtjs/i18n", "@nuxt/ui"],
    css: ["~/assets/css/main.css"],
    i18n: {
        defaultLocale: "sq",
        locales: [
            { code: "sq", name: "Saqa", file: "sq.json" },
            { code: "ru", name: "Russian", file: "ru.json" },
            { code: "en", name: "English", file: "en.json" },
        ],
    },
});
