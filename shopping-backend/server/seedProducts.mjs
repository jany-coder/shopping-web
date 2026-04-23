import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Product } from './models/Product.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PRODUCTS_FILE = join(__dirname, 'data', 'products.json')

export async function seedProductsIfEmpty() {
  const count = await Product.countDocuments()
  if (count > 0) return

  const raw = readFileSync(PRODUCTS_FILE, 'utf8')
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed) || parsed.length === 0) return
  await Product.insertMany(parsed, { ordered: false })
}
