import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Product } from './models/Product.mjs'
import { Subscriber } from './models/Subscriber.mjs'
import { User } from './models/User.mjs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email) {
  if (typeof email !== 'string') return false
  const trimmed = email.trim()
  if (trimmed.length === 0 || trimmed.length > 254) return false
  return EMAIL_REGEX.test(trimmed)
}

function signAuthToken(user) {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-me'
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name },
    secret,
    { expiresIn: '7d' },
  )
}

async function authFromHeader(req) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return null
  const token = auth.slice('Bearer '.length).trim()
  if (!token) return null
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret-change-me'
    const payload = jwt.verify(token, secret)
    if (!payload || typeof payload !== 'object' || !payload.sub) return null
    return await User.findById(payload.sub).lean()
  } catch {
    return null
  }
}

export const app = express()
app.use(express.json({ limit: '32kb' }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'fcs-mongo-api' })
})

app.get('/api/products', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 }).lean()
    res.json(
      products.map((item) => ({
        ...item,
        sku: typeof item.sku === 'string' && item.sku.trim() ? item.sku : String(item.id || '').toUpperCase(),
        stock: Number.isFinite(item.stock) ? Number(item.stock) : 0,
      })),
    )
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to load products' })
  }
})

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body ?? {}
  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters' })
  }
  if (typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Valid email is required' })
  }
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
    })
    const token = signAuthToken(user)
    return res.status(201).json({
      ok: true,
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    })
  } catch (e) {
    if (e && typeof e === 'object' && 'code' in e && e.code === 11000) {
      return res.status(409).json({ error: 'Email is already in use' })
    }
    console.error(e)
    return res.status(500).json({ error: 'Failed to create account' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {}
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Email and password are required' })
  }
  const normalized = email.trim().toLowerCase()
  try {
    const user = await User.findOne({ email: normalized })
    if (!user) return res.status(401).json({ error: 'Invalid email or password' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' })
    const token = signAuthToken(user)
    return res.json({
      ok: true,
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Failed to login' })
  }
})

app.get('/api/auth/me', async (req, res) => {
  const user = await authFromHeader(req)
  if (!user) return res.status(401).json({ error: 'Unauthorized' })
  return res.json({
    ok: true,
    user: { id: user._id.toString(), name: user.name, email: user.email },
  })
})

app.post('/api/newsletter', async (req, res) => {
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

  try {
    await Subscriber.create({ email: trimmed, subscribedAt: new Date() })
    return res.status(201).json({ ok: true, message: 'Subscribed successfully' })
  } catch (e) {
    if (e && typeof e === 'object' && 'code' in e && e.code === 11000) {
      return res.status(409).json({ error: 'This email is already subscribed' })
    }
    console.error(e)
    return res.status(500).json({ error: 'Failed to save subscriber' })
  }
})

app.get('/api/admin/subscribers', async (_req, res) => {
  try {
    const list = await Subscriber.find().sort({ subscribedAt: -1 }).lean()
    res.json(
      list.map((item) => ({
        email: item.email,
        subscribedAt: item.subscribedAt ? new Date(item.subscribedAt).toISOString() : undefined,
      })),
    )
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to read subscribers' })
  }
})

app.get('/api/admin/users', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean()
    return res.json(
      users.map((item) => ({
        id: item._id?.toString(),
        name: item.name,
        email: item.email,
        createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : undefined,
      })),
    )
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Failed to load users' })
  }
})

app.get('/api/admin/products', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean()
    return res.json(
      products.map((item) => ({
        ...item,
        sku: typeof item.sku === 'string' && item.sku.trim() ? item.sku : String(item.id || '').toUpperCase(),
        stock: Number.isFinite(item.stock) ? Number(item.stock) : 0,
      })),
    )
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Failed to read products' })
  }
})

app.post('/api/admin/products', async (req, res) => {
  const { sku, stock, title, category, price, imageUrl, cta } = req.body ?? {}
  if (typeof sku !== 'string' || sku.trim().length === 0) {
    return res.status(400).json({ error: 'Product sku is required' })
  }
  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Product title is required' })
  }
  if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
    return res.status(400).json({ error: 'Product stock must be a non-negative integer' })
  }
  try {
    const normalizedSku = sku.trim().toUpperCase()
    const created = await Product.create({
      // Keep `id` for existing frontend keys; derive it from SKU.
      id: normalizedSku.toLowerCase(),
      sku: normalizedSku,
      stock: stock ?? 10,
      title: title.trim(),
      category: typeof category === 'string' && category.trim() ? category.trim() : undefined,
      price: typeof price === 'number' ? price : undefined,
      imageUrl: typeof imageUrl === 'string' && imageUrl.trim() ? imageUrl.trim() : undefined,
      cta: typeof cta === 'string' ? cta.trim() : undefined,
    })
    return res.status(201).json(created)
  } catch (e) {
    if (e && typeof e === 'object' && 'code' in e && e.code === 11000) {
      return res.status(409).json({ error: 'Product SKU already exists' })
    }
    console.error(e)
    return res.status(500).json({ error: 'Failed to add product' })
  }
})

app.delete('/api/admin/products/:id', async (req, res) => {
  const id = String(req.params.id || '').trim()
  if (!id) return res.status(400).json({ error: 'Product id is required' })
  try {
    const deleted = await Product.findOneAndDelete({ id })
    if (!deleted) return res.status(404).json({ error: 'Product not found' })
    return res.json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Failed to remove product' })
  }
})

app.delete('/api/admin/subscribers', async (req, res) => {
  const { email } = req.body ?? {}
  if (typeof email !== 'string' || email.trim().length === 0) {
    return res.status(400).json({ error: 'Email is required' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  try {
    const normalized = email.trim().toLowerCase()
    const deleted = await Subscriber.findOneAndDelete({ email: normalized })
    if (!deleted) {
      return res.status(404).json({ error: 'Subscriber not found' })
    }
    return res.json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Failed to remove subscriber' })
  }
})
