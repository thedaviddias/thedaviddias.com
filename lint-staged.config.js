// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ESLint } = require('eslint')

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    })
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles.join(' ')
}

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npm run check:types',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return filesToLint ? [`eslint --fix ${filesToLint}`, `prettier --write ${filesToLint}`] : []
  },

  // Lint then format JSON files
  '/**/*.json,!package.json,!package-lock.json': async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [`eslint --fix ${filesToLint}`, `prettier --write ${filesToLint}`]
  },

  // Format YAML, MarkDown, JSON
  '**/*.(yml|md)': (filenames) => `prettier --write ${filenames.join(' ')}`,

  // Format the package.json
  // 'package.json': 'npx sort-package-json',
}
