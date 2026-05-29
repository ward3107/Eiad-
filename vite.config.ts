import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({mode}) => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'motion-vendor': ['motion', 'motion/react'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      sourcemap: mode === 'development',
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'motion', 'motion/react', 'lucide-react'],
    },
  };
});
