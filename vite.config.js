import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

function appDirPlugin() {
  const appDir = process.env.APP_DIR || '2025_04_counter_demo'
  console.log('Using app directory:', appDir)

  const absoluteAppPath = path.resolve(process.cwd(), appDir)

  return {
    name: 'app-dir-selector',
    enforce: 'pre',

    config(config) {
      return {
        ...config,
        resolve: {
          alias: {
            '/APP_DIR': absoluteAppPath,
            'd3': path.resolve(process.cwd(), 'node_modules/d3'), // Each clientside dependency needs this
          },
          preserveSymlinks: true
        },
        server: {
          fs: {
            allow: [
              path.resolve(process.cwd(), '..'),
              path.resolve(process.cwd(), 'node_modules')
            ],
          },
        }
      }
    },

    transformIndexHtml(html) {
      return html.replace('/APP_DIR', absoluteAppPath)
    }
  }
}

export default defineConfig({
  plugins: [
    appDirPlugin(),
    svelte()
  ],
  optimizeDeps: {
    include: ['d3']
  },
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
