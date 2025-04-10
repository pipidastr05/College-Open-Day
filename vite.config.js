

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base:'/College-Open-Day/',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        hangman: path.resolve(__dirname, 'hangman-game.html'),
        nowel: path.resolve(__dirname, 'nowel.html'),
        award2: path.resolve(__dirname, 'award2.html'),
      }
    }
  }
})