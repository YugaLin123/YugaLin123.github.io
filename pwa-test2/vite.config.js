import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/PWA4/', 
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    https: false,  // 对应GitHub项目名称
  },
  include: [
    "src/**/*.d.ts",
    "src/**/*.js",
    "src/**/*.svelte",
    "src/firebase-messaging-sw.js"
  ]
})