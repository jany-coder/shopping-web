import { Link } from 'react-router-dom'
import { useWishlist } from '../hooks/useWishlist'
import { useProducts } from '../hooks/useProducts'

function formatPrice(price: number | undefined): string | undefined {
  if (price === undefined) return undefined
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

export function WishlistPage() {
  const wishlist = useWishlist()
  const { state, reload } = useProducts()

  const wishlisted =
    state.status === 'ok' ? state.data.filter((p) => wishlist.ids.includes(p.id)) : []

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="m-0 text-2xl font-semibold text-zinc-900">My Wishlist</h1>
            <p className="mt-1 text-sm text-zinc-500">
              {wishlist.ids.length} item{wishlist.ids.length === 1 ? '' : 's'} saved
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700"
              onClick={reload}
            >
              Refresh
            </button>
            <Link className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700" to="/">
              Back
            </Link>
          </div>
        </div>

        {state.status === 'loading' ? <p className="text-sm text-zinc-500">Loading products…</p> : null}
        {state.status === 'error' ? <p className="text-sm text-red-700">{state.message}</p> : null}

        {state.status === 'ok' && wishlisted.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
            No wishlist items yet. Click the heart icon on products to add favorites.
          </div>
        ) : null}

        {state.status === 'ok' && wishlisted.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wishlisted.map((p) => (
              <article key={p.id} className="rounded-lg border border-zinc-200 bg-white p-3">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="h-44 w-full rounded-md object-cover"
                />
                <h2 className="mt-3 text-base font-semibold text-zinc-900">{p.title}</h2>
                <p className="text-sm text-zinc-500">{p.category}</p>
                {p.price !== undefined ? (
                  <p className="mt-1 text-sm font-medium text-zinc-800">{formatPrice(p.price)}</p>
                ) : null}
                <button
                  type="button"
                  className="mt-3 w-full rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                  onClick={() => wishlist.toggle(p.id)}
                >
                  Remove from wishlist
                </button>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  )
}

