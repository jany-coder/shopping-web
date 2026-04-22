import { brandLogos } from '../../content/landingData'

export function BrandStrip() {
  return (
    <section className="bg-brand py-3 md:py-8">
      <ul className="mx-auto grid max-w-6xl grid-cols-3 items-center justify-items-center gap-x-2 gap-y-4 px-2 md:grid-cols-6 md:gap-6 md:px-8">
        {brandLogos.map(({ id, src, alt }) => (
          <li
            key={id}
            className="flex h-8 w-full items-center justify-center md:h-10"
          >
            <img
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
