import { createContext } from 'react'

export type WishlistContextValue = {
  has: (id: string) => boolean
  toggle: (id: string) => void
}

export const WishlistContext = createContext<WishlistContextValue | null>(null)
