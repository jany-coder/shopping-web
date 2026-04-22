import { newArrivals } from '../../content/landingData'
import { ShowcaseCard } from './ShowcaseCard'

export function NewArrivalsSection() {
  return (
    <section className="bg-surface px-2 py-6 md:px-10 md:py-12">
      <h2 className="text-left text-sm font-black leading-tight tracking-tight md:text-3xl">
        NEW ARRIVALS
      </h2>
      <div className="mt-3 grid grid-cols-3 gap-2 md:mt-8 md:gap-6">
        {newArrivals.map((item) => (
          <ShowcaseCard
            key={item.title}
            item={item}
            titleClassName="text-xs font-medium md:text-lg"
          />
        ))}
      </div>
    </section>
  )
}
