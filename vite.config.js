import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Web (GitHub Pages) needs base '/kid-learn-app/'; the Capacitor Android
// build serves files locally from the app root, so it needs base '/'.
const isCapacitor = process.env.BUILD_TARGET === 'capacitor';

export default defineConfig({
  plugins: [react()],
  base: isCapacitor ? '/' : '/kid-learn-app/',
  build: {
    outDir: isCapacitor ? 'dist-android' : 'dist',
  },
})
