/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-20 22:09:11
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-01-16 10:04:38
 * @ Description: vite 配置文件
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pm-tools/',
  publicDir: './public',
  build: {
    target: 'esnext',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@comp': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
        }),
        tailwindcss,
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/styles/var.scss" as *;
        `,
      },
    },
  },
  server: {
    hmr: true,
  },
});
