import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '7hem1z',
  viewportHeight: 1000,
  viewportWidth: 1280,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})
