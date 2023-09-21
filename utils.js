// Leyendo un archivo json en ESModule recomendado por ahora por ser nativo en NodeJs
import { readFileSync } from 'node:fs'

export const movies = JSON.parse(readFileSync('./movies.json', 'utf-8'))

/**
 * import { createRequire } from 'node:module'
  const require = createRequire(import.meta.url)

  export const readJSON = (path) => require(path)
 */
