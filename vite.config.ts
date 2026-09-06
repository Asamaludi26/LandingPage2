import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR dimatikan via variabel lingkungan DISABLE_HMR (untuk lingkungan non-interaktif).
      hmr: process.env.DISABLE_HMR !== 'true',
      // Matikan file watching saat DISABLE_HMR aktif agar hemat CPU.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['motion'],
            lenis: ['lenis'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  };
});
