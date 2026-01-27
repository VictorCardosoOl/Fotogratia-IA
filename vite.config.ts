import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Substitua '/lumina-portfolio/' pelo nome do seu repositório no GitHub entre barras.
  // Exemplo: Se seu repo chama 'meu-site', use base: '/meu-site/'
  base: '/lumina-portfolio/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})