import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
    UnoCSS(),
  ],
  publicDir: 'registry/public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
