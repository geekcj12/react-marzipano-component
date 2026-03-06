import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LIB_DIR = path.resolve(__dirname, '../lib')
const SRC_TYPES_DIR = path.resolve(__dirname, '../src/types')

// 1. Copy src/types/ to lib/types/
const destTypesDir = path.join(LIB_DIR, 'types')
fs.cpSync(SRC_TYPES_DIR, destTypesDir, { recursive: true })
console.log('Copied src/types/ -> lib/types/')

// 2. Inject /// <reference path> into lib/index.d.ts
const indexDtsPath = path.join(LIB_DIR, 'index.d.ts')
const content = fs.readFileSync(indexDtsPath, 'utf-8')
const reference = '/// <reference path="./types/marzipano.d.ts" />'

if (!content.includes(reference)) {
  fs.writeFileSync(indexDtsPath, `${reference}\n${content}`)
  console.log('Injected marzipano type reference into lib/index.d.ts')
}
