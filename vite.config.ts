import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isNetlifyBuild = process.env.NETLIFY === 'true' || process.env.DEPLOY_TARGET === 'netlify'

export default defineConfig({
  base: isNetlifyBuild ? '/' : '/rota-defteri-web/',
  plugins: [react()],
})
