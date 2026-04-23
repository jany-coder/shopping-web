import { createContext } from 'react'

export type WishlistContextValue = {
  ids: string[]
  has: (id: string) => boolean
  toggle: (id: string) => void
}

export const WishlistContext = createContext<WishlistContextValue | null>(null)
