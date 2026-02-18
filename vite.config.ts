import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three'],
          'vendor-r3f': ['@react-three/fiber'],
          'vendor-drei': ['@react-three/drei'],
          'vendor-postprocessing': ['@react-three/postprocessing', 'postprocessing'],
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-utils': ['lucide-react', 'lenis'],
        }
      }
    }
  },
})
