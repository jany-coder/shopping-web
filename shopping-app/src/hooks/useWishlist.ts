import { useContext } from 'react'
import { WishlistContext, type WishlistContextValue } from '../context/wishlist-context'

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext)
  if (!ctx) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return ctx
}
