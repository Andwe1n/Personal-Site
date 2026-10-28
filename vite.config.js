import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    svelte(),
    {
      // Keep unreferenced local photo originals out of the generated site.
      name: 'exclude-local-photo-originals',
      async closeBundle() {
        await rm(resolve('dist/images/Photography Projects'), { recursive: true, force: true });
      },
    },
  ],
});
