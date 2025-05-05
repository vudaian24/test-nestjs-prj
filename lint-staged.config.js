module.exports = {
  '*.{js,ts}': ['eslint --fix'],
  '**/*.ts?(x)': () => 'npm run check-types',
  '*.{json,yaml}': ['prettier --write'],
}
