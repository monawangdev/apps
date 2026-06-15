import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://monawangdev.github.io',
  base: '/apps',
  output: 'static',
  integrations: [sitemap()],
});
