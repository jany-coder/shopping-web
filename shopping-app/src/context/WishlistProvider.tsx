import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readWishlistIds, writeWishlistIds, WISHLIST_STORAGE_KEY } from '../lib/wishlistStorage'
import { WishlistContext } from './wishlist-context'

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readWishlistIds())

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === WISHLIST_STORAGE_KEY) setIds(readWishlistIds())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const has = useCallback((id: string) => ids.includes(id), [ids])

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      writeWishlistIds(next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ has, toggle }), [has, toggle])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
