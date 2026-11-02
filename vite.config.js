import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages PREVIEW build only: this site will live at
// https://kylemcc11.github.io/Leudy-Automation/
// so every asset path must start with that subpath. Do NOT use this
// file for the real Cloudflare launch on LeudyAutomationGroup.com —
// there the base must go back to '/' (see the v2 zip).
export default defineConfig({
  base: '/Leudy-Automation/',
  plugins: [react()],
})
