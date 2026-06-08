import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://iindev.xyz',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [sitemap()],
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
