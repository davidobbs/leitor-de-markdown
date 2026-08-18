import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/leitor/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      includeAssets: ['favicon.png', 'icons/*.png'],
      manifest: {
        name: 'Leitor MD',
        short_name: 'LeitorMD',
        description: 'Leitor de Markdown instalável — seus arquivos nunca saem do dispositivo.',
        theme_color: '#05070A',
        background_color: '#05070A',
        display: 'standalone',
        orientation: 'any',
        scope: '/leitor/',
        start_url: '/leitor/',
        categories: ['productivity', 'utilities'],
        icons: [
          {
            src: '/leitor/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/leitor/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/leitor/icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        share_target: {
          action: '/leitor/share',
          method: 'POST',
          enctype: 'multipart/form-data',
          params: {
            files: [
              {
                name: 'file',
                accept: [
                  'text/markdown',
                  'text/plain',
                  '.md',
                  '.markdown',
                ],
              },
            ],
          },
        },
        file_handlers: [
          {
            action: '/leitor/open',
            accept: {
              'text/markdown': ['.md', '.markdown'],
              'text/plain': ['.md', '.markdown'],
            },
          },
        ],
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
})
