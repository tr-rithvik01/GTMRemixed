// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  // Production domain — required for sitemap and canonical URLs.
  site: 'https://gtmremixed.com',

  // 'static' = every page is pre-rendered at build time (best for SEO and Cloudflare Pages).
  // All React islands are still hydrated client-side via <script> bundles (Astro Islands architecture).
  output: 'static',

  adapter: cloudflare(),

  integrations: [
    // React integration enables .jsx/.tsx files and client:* hydration directives.
    // Without this, <NavBar client:load /> would fail at build time.
    react(),
    sitemap(),
  ],
});
