import type { ProductDto } from '../types/product'

function apiBase(): string {
  const explicit = (import.meta.env.VITE_API_URL ?? '').trim()
  if (explicit) return explicit.replace(/\/$/, '')
  return ''
}

export function apiUrl(path: string): string {
  const base = apiBase()
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function getProducts(): Promise<ProductDto[]> {
  const res = await fetch(apiUrl('/api/products'))
  if (!res.ok) {
    throw new ApiError('Failed to load products', res.status)
  }
  const data: unknown = await res.json()
  if (!Array.isArray(data)) {
    throw new ApiError('Invalid products response', 500)
  }
  return data as ProductDto[]
}

export async function subscribeNewsletter(email: string): Promise<{ ok: true; message?: string }> {
  const res = await fetch(apiUrl('/api/newsletter'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  let body: { error?: string; message?: string; ok?: boolean } = {}
  try {
    body = (await res.json()) as typeof body
  } catch {
    /* empty body */
  }
  if (!res.ok) {
    throw new ApiError(body.error ?? 'Subscription failed', res.status)
  }
  return { ok: true, message: body.message }
}
