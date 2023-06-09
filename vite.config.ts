import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],

  server: {
    open: true,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
