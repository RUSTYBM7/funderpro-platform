import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@supabase/supabase-js': resolve(__dirname, './node_modules/@supabase/supabase-js'),
      'react-router-dom': resolve(__dirname, './node_modules/react-router/dom'),
    },
  },
})