import { youngFavourites } from '../../content/landingData'
import { ShowcaseCard } from './ShowcaseCard'

export function YoungFavouritesSection() {
  return (
    <section className="bg-surface px-2 py-6 md:px-10 md:py-12">
      <h2 className="text-left text-sm font-black leading-tight tracking-tight md:text-3xl">
        Young&apos;s Favourite
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-2 md:mt-8 md:gap-6">
        {youngFavourites.map((item) => (
          <ShowcaseCard
            key={item.title}
            item={item}
            titleClassName="text-xs font-medium md:text-2xl"
          />
        ))}
      </div>
    </section>
  )
}
