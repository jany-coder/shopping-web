import heroImg from '../../assets/hero.png'
import { navItems } from '../../content/landingData'

export function Header() {
  return (
    <header className="mx-auto w-full max-w-6xl px-2 pt-2 md:px-8 md:pt-8">
      <div className="rounded-t-[14px] bg-surface px-2 py-2 md:rounded-t-[24px] md:px-10 md:py-4">
        <nav className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex items-center justify-between gap-3">
            <a className="text-xs font-black tracking-wide md:text-xl" href="#">
              FASHION
            </a>
            <button
              type="button"
              className="shrink-0 rounded-[4px] bg-ink px-3 py-1 text-xs text-surface md:hidden"
            >
              SIGN UP
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 md:contents">
            <ul className="-mx-1 flex max-w-full items-center gap-3 overflow-x-auto px-1 text-xs font-medium whitespace-nowrap md:mx-0 md:gap-6 md:overflow-visible md:px-0 md:text-sm">
              {navItems.map((item) => (
                <li key={item} className="shrink-0">
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="hidden shrink-0 rounded-md bg-ink px-4 py-2 text-sm text-surface md:inline-flex"
            >
              SIGN UP
            </button>
          </div>
        </nav>
        <section className="mt-2 grid grid-cols-[1.05fr_1fr] gap-2 rounded-[12px] bg-[#f4f6f5] p-2 md:mt-5 md:gap-8 md:rounded-[26px] md:p-6 md:px-10 md:py-8">
          <div className="space-y-2 text-left md:space-y-6">
            <h1 className="m-0 text-2xl leading-none font-black sm:text-3xl md:text-6xl">
              <span className="inline-block bg-surface px-1 md:px-3">LET&apos;S</span>
              <br />
              EXPLORE
              <br />
              <span className="inline-block bg-brand px-1 md:px-3">UNIQUE</span>
              <br />
              CLOTHES.
            </h1>
            <p className="max-w-md text-xs leading-tight md:text-base">
              Live for influential and innovative fashion.
            </p>
            <button className="rounded-[4px] bg-ink px-3 py-1 text-xs font-medium text-surface md:rounded-lg md:px-7 md:py-3 md:text-sm">
              SHOP NOW
            </button>
          </div>
          <img
            className="block w-full self-end rounded-[10px] object-cover object-bottom-left saturate-75 md:h-[420px] md:rounded-2xl"
            src={heroImg}
            alt="Hero placeholder. Replace with model image."
          />
        </section>
      </div>
    </header>
  )
}
