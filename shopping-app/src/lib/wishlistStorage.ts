export const WISHLIST_STORAGE_KEY = 'fcs-wishlist'

function parseIds(raw: string | null): string[] {
  if (!raw) return []
  try {
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    return data.filter((x): x is string => typeof x === 'string')
  } catch {
    return []
  }
}

export function readWishlistIds(): string[] {
  if (typeof window === 'undefined') return []
  return parseIds(window.localStorage.getItem(WISHLIST_STORAGE_KEY))
}

export function writeWishlistIds(ids: string[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids))
}
