import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://v2raynverge.cc';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  server: {
    port: 8088,
    host: true,
  },
  preview: {
    port: 8088,
    host: true,
  },
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/draft') &&
        !page.includes('/search/'),
       serialize(item) {
        return {
          ...item,
          lastmod: new Date('2026-11-18T12:00:00+08:00').toISOString(),
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
