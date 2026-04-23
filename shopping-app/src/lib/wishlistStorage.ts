export const WISHLIST_STORAGE_KEY = 'fcs-wishlist'

type WishlistByUser = Record<string, string[]>

function parseIds(raw: unknown): string[] {
  if (!raw) return []
  if (!Array.isArray(raw)) return []
  return raw.filter((x): x is string => typeof x === 'string')
}

function activeWishlistUserKey(): string {
  if (typeof window === 'undefined') return 'guest'
  const rawUser = window.localStorage.getItem('fcs-auth-user')
  if (!rawUser) return 'guest'
  try {
    const parsed: unknown = JSON.parse(rawUser)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof (parsed as { id?: unknown }).id === 'string'
    ) {
      return (parsed as { id: string }).id
    }
  } catch {
    return 'guest'
  }
  return 'guest'
}

function parseWishlistStore(raw: string | null): WishlistByUser {
  if (!raw) return {}
  try {
    const data: unknown = JSON.parse(raw)
    if (Array.isArray(data)) {
      // Backward compatibility: legacy format was a single array.
      return { guest: parseIds(data) }
    }
    if (typeof data !== 'object' || data === null) return {}
    const next: WishlistByUser = {}
    for (const [key, value] of Object.entries(data)) {
      next[key] = parseIds(value)
    }
    return next
  } catch {
    return {}
  }
}

export function readWishlistIds(): string[] {
  if (typeof window === 'undefined') return []
  const store = parseWishlistStore(window.localStorage.getItem(WISHLIST_STORAGE_KEY))
  return store[activeWishlistUserKey()] ?? []
}

export function writeWishlistIds(ids: string[]): void {
  if (typeof window === 'undefined') return
  const store = parseWishlistStore(window.localStorage.getItem(WISHLIST_STORAGE_KEY))
  store[activeWishlistUserKey()] = ids
  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(store))
}
