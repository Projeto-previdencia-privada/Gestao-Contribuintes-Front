import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/contribuintes': 'http://192.168.37.11:8081'
    }
  }
});
