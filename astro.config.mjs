// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pointsbeyond.ai',
  base: '/',
  output: 'static',
  integrations: [
    sitemap(),
  ],
});
