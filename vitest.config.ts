// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {},
  resolve: {
    alias: [{ find: '@', replacement: resolve(process.cwd(), '.', 'src') }]
  }
})
