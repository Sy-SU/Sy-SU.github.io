import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames(assetInfo) {
          const names = assetInfo.names ?? [assetInfo.name];
          if (names.some(name => name === 'profile-web.jpg')) {
            return 'images/profile-web.jpg';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
});
