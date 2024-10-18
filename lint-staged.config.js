export default {
  '*.{js,ts}': [() => 'tsc --noEmit --skipLibCheck', 'biome check --write'],
  '*.{json,md}': 'biome check --write'
}
