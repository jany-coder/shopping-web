import type { ShowcaseItem } from '../../content/landingData'

type Props = {
  item: ShowcaseItem
  titleClassName: string
}

export function ShowcaseCard({ item, titleClassName }: Props) {
  return (
    <article className="space-y-1.5 text-left md:space-y-4">
      <img
        src={item.image}
        alt={item.title}
        className="h-auto w-full rounded-[8px] object-cover md:rounded-[16px]"
      />
      <div className="flex items-center justify-between">
        <div>
          <h3 className={titleClassName}>{item.title}</h3>
          <p className="text-xs text-ink/65 md:text-sm">{item.cta}</p>
        </div>
        <span aria-hidden="true" className="text-sm md:text-base">
          →
        </span>
      </div>
    </article>
  )
}
