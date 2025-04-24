import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

function appDirPlugin() {
  const appDir = process.env.APP_DIR || '2025_04_counter_demo'
  console.log('Using app directory:', appDir)

  return {
    name: 'app-dir-selector',
    enforce: 'pre',

    config(config) {
      return {
        ...config,
        resolve: {
          alias: {
            '/APP_DIR': path.resolve(process.cwd(), appDir)
          }
        }
      }
    },

    transformIndexHtml(html) {
      return html.replace('APP_DIR', appDir)
    }
  }
}

export default defineConfig({
  plugins: [
    appDirPlugin(),
    svelte()
  ],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  base: './',
})
