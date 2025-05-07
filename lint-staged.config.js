module.exports = {
  '*.{js,ts}': ['eslint --fix'],
  '**/*.ts?(x)': () => 'yarn check-types',
  '*.{json,yml,yaml}': ['prettier --write'],
}
