import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/contribuintes': {
        target: 'http://192.168.37.11:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/contribuintes/, '')
      }
    }
  }
});
