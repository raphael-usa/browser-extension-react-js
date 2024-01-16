import { defineConfig, loadEnv } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import manifestFile from './src/manifest.js'
import firefoxManifestFile from './src/manifest_firefox_v3.js'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isFirefox = env.VITE_BROWSER
  console.log("defineConfig, mode:", { command, mode, isSsrBuild, isPreview, isFirefox });

  var manifest;
  if (isFirefox == "firefox") {
    manifest = firefoxManifestFile;
  } else {
    manifest = manifestFile;
  }

  console.log({ manifest });

  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },
    server: { port: 3000, strictPort: true, hmr: { port: 5173, }, },
    plugins: [crx({ manifest }), react()],
  }
})
