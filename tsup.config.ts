import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts'],
  target: 'es2015',
  format: ['esm', 'cjs', 'iife'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  globalName: 'Ahwa'
})
