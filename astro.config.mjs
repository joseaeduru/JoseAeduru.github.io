import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://joseaeduru.github.io',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
