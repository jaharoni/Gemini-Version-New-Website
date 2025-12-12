import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Gemini-Version-New-Website/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor';
          }
          if (id.includes('node_modules/@supabase/supabase-js')) {
            return 'supabase';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          if (id.includes('/src/pages/AdminNew') || id.includes('/src/components/admin/')) {
            return 'admin';
          }
          if (id.includes('/src/pages/Shop') || id.includes('/src/pages/ProductDetail') || id.includes('/src/pages/Checkout')) {
            return 'shop';
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
