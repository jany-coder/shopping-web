import express from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')
const PRODUCTS_FILE = join(DATA_DIR, 'products.json')

/** Writable on Vercel serverless; local uses repo JSON (gitignored). */
const SUBSCRIBERS_FILE = process.env.VERCEL
  ? join('/tmp', 'fcs-mart-subscribers.json')
  : join(DATA_DIR, 'subscribers.json')

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email) {
  if (typeof email !== 'string') return false
  const trimmed = email.trim()
  if (trimmed.length === 0 || trimmed.length > 254) return false
  return EMAIL_REGEX.test(trimmed)
}

function readSubscribers() {
  if (!existsSync(SUBSCRIBERS_FILE)) return []
  try {
    const raw = readFileSync(SUBSCRIBERS_FILE, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writeSubscribers(list) {
  writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(list, null, 2), 'utf8')
}

const app = express()
app.use(express.json({ limit: '32kb' }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'fcs-mock-api' })
})

app.get('/api/products', (_req, res) => {
  try {
    const raw = readFileSync(PRODUCTS_FILE, 'utf8')
    const products = JSON.parse(raw)
    res.json(Array.isArray(products) ? products : [])
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to load products' })
  }
})

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body ?? {}

  if (email === undefined || email === null) {
    return res.status(400).json({ error: 'Email is required' })
  }

  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Email must be a string' })
  }

  const trimmed = email.trim()
  if (trimmed.length === 0) {
    return res.status(400).json({ error: 'Email cannot be empty' })
  }

  if (!isValidEmail(trimmed)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const normalized = trimmed.toLowerCase()
  const subscribers = readSubscribers()
  const exists = subscribers.some((s) => s.email?.toLowerCase() === normalized)
  if (exists) {
    return res.status(409).json({ error: 'This email is already subscribed' })
  }

  subscribers.push({
    email: trimmed,
    subscribedAt: new Date().toISOString(),
  })
  writeSubscribers(subscribers)

  return res.status(201).json({ ok: true, message: 'Subscribed successfully' })
})

/** Demo only: no auth — do not expose publicly. */
app.get('/api/admin/subscribers', (_req, res) => {
  try {
    const list = readSubscribers()
    res.json(list)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to read subscribers' })
  }
})

app.delete('/api/admin/subscribers', (req, res) => {
  const { email } = req.body ?? {}
  if (typeof email !== 'string' || email.trim().length === 0) {
    return res.status(400).json({ error: 'Email is required' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  const normalized = email.trim().toLowerCase()
  const subscribers = readSubscribers()
  const next = subscribers.filter((s) => s.email?.toLowerCase() !== normalized)
  if (next.length === subscribers.length) {
    return res.status(404).json({ error: 'Subscriber not found' })
  }
  writeSubscribers(next)
  return res.json({ ok: true })
})

export default app
