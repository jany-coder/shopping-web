import { FaHeart, FaRegHeart } from 'react-icons/fa'
import type { ShowcaseItem } from '../../content/landingData'
import { useWishlist } from '../../hooks/useWishlist'

type Props = {
  item: ShowcaseItem
  titleClassName: string
  productId?: string
  priceLabel?: string
}

export function ShowcaseCard({ item, titleClassName, productId, priceLabel }: Props) {
  const wishlist = useWishlist()
  const isWishlisted = productId ? wishlist.has(productId) : false

  return (
    <article className="space-y-1.5 text-left md:space-y-4">
      <img
        src={item.image}
        alt={item.title}
        className="h-auto w-full rounded-[8px] object-cover md:rounded-[16px]"
      />
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className={titleClassName}>{item.title}</h3>
          <p className="text-xs text-ink/65 md:text-sm">{item.cta}</p>
          {priceLabel ? (
            <p className="mt-0.5 text-xs font-semibold text-ink md:text-sm">{priceLabel}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          {productId ? (
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-md text-ink transition-colors hover:bg-ink/5 md:size-9"
              onClick={() => wishlist.toggle(productId)}
              aria-pressed={isWishlisted}
              aria-label={isWishlisted ? 'Remove from favourites' : 'Add to favourites'}
            >
              {isWishlisted ? (
                <FaHeart className="size-4 text-red-600 md:size-5" aria-hidden="true" />
              ) : (
                <FaRegHeart className="size-4 md:size-5" aria-hidden="true" />
              )}
            </button>
          ) : null}
          <span aria-hidden="true" className="text-sm md:text-base">
            →
          </span>
        </div>
      </div>
    </article>
  )
}
