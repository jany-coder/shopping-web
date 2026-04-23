import type { ShowcaseItem } from '../../content/landingData'
import { useProducts } from '../../hooks/useProducts'
import type { ProductDto } from '../../types/product'
import { ShowcaseCard } from './ShowcaseCard'

function formatPrice(price: number | undefined): string | undefined {
  if (price === undefined) return undefined
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

function toShowcaseItem(p: ProductDto, image: string): ShowcaseItem {
  return {
    title: p.title,
    cta: p.cta ?? 'Explore Now',
    image,
  }
}

export function NewArrivalsSection() {
  const { state, reload } = useProducts()

  return (
    <section className="bg-surface px-2 py-6 md:px-10 md:py-12">
      <h2 className="text-left text-sm font-black leading-tight tracking-tight md:text-3xl">
        NEW ARRIVALS
      </h2>

      {state.status === 'loading' ? (
        <p className="mt-6 text-center text-sm text-ink/60 md:mt-8">Loading products…</p>
      ) : null}

      {state.status === 'error' ? (
        <div className="mt-6 space-y-3 text-center md:mt-8">
          <p className="text-sm text-red-700">{state.message}</p>
          <button
            type="button"
            className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-surface"
            onClick={() => void reload()}
          >
            Try again
          </button>
        </div>
      ) : null}

      {state.status === 'ok' ? (
        <div className="mt-3 grid grid-cols-3 gap-2 md:mt-8 md:gap-6">
          {state.data.map((p) => {
            const image = p.imageUrl
            if (!image) return null
            const item = toShowcaseItem(p, image)
            return (
              <ShowcaseCard
                key={p.id}
                item={item}
                titleClassName="text-xs font-medium md:text-lg"
                productId={p.id}
                priceLabel={formatPrice(p.price)}
              />
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
