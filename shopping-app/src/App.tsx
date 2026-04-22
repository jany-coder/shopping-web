import heroImg from './assets/hero.png'
import favouriteImg from './assets/favourite.png'
import favourite02Img from './assets/favourite-02.png'
import newArrival01Img from './assets/new-arrival-01.png'
import newArrival02Img from './assets/new-arrival-2.png'
import newArrival03Img from './assets/new-arrival-3.png'
import paydayImg from './assets/payday.png'
import mobileImg from './assets/mobile.png'
import playStoreBadge from './assets/playstore.png'
import googlePlayBadge from './assets/google-play.png'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const navItems = ['CATALOGUE', 'FASHION', 'FAVOURITE', 'LIFESTYLE']

const brandItems = ['H&M', 'OBEY', 'Shopify', 'LACOSTE', "LEVI'S", 'Amazon']

const newArrivals = [
  {
    title: 'Hoodies & Sweatshirt',
    cta: 'Explore Now',
    image: newArrival01Img,
  },
  {
    title: 'Coats & Parkas',
    cta: 'Explore Now',
    image: newArrival02Img,
  },
  {
    title: 'Tees & T-Shirt',
    cta: 'Explore Now',
    image: newArrival03Img,
  },
]

const favourites = [
  {
    title: 'Trending on Instagram',
    cta: 'Explore Now!',
    image: favouriteImg,
  },
  {
    title: 'All Under $40',
    cta: 'Explore Now!',
    image: favourite02Img,
  },
]

const footerLinks = {
  company: ['About', 'Contact us', 'Support', 'Careers'],
  quickLinks: ['Share Location', 'Orders Tracking', 'Size Guide', 'FAQs'],
  legal: ['Terms & conditions', 'Privacy Policy'],
}

function App() {
  return (
    <div className="relative overflow-hidden bg-brand/25">
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

      <main className="mx-auto w-full max-w-6xl px-2 md:px-8">
        <section className="bg-brand py-2 md:py-8">
          <ul className="grid grid-cols-6 items-center gap-1 text-center text-xs font-bold md:gap-4 md:text-lg">
            {brandItems.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </section>

        <section className="bg-surface px-2 py-6 md:px-10 md:py-12">
          <h2 className="text-left text-sm font-black leading-tight tracking-tight md:text-3xl">
            NEW ARRIVALS
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-2 md:mt-8 md:gap-6">
            {newArrivals.map((item) => (
              <article key={item.title} className="space-y-1.5 text-left md:space-y-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-auto w-full rounded-[8px] object-cover md:rounded-[16px]"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-medium md:text-lg">{item.title}</h3>
                    <p className="text-xs text-ink/65 md:text-sm">{item.cta}</p>
                  </div>
                  <span aria-hidden="true" className="text-sm md:text-base">→</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 items-center gap-2 bg-brand md:gap-6">
          <img
            className="h-auto w-full object-cover object-bottom-left"
            src={paydayImg}
            alt="Payday promotional offer"
          />
          <div className="flex w-full flex-col items-center space-y-1.5 px-2 py-3 text-center md:items-start md:space-y-4 md:px-10 md:py-10 md:text-left">
            <h2 className="m-0 w-full font-black leading-none">
              <div className="flex w-full flex-col items-center md:items-start">
                <span className="inline-block -rotate-2 bg-white px-3 py-1 shadow-sm sm:text-3xl md:-ml-1 md:-rotate-3 md:px-4 md:py-1.5">
                  <span className="inline-block rotate-2 select-none text-2xl text-ink uppercase sm:text-3xl md:rotate-3 md:text-5xl">
                    PAYDAY
                  </span>
                </span>
                <span className="mt-1 block text-2xl text-ink uppercase sm:text-3xl md:mt-2 md:text-5xl">
                  SALE NOW
                </span>
              </div>
            </h2>
            <p className="max-w-md text-center text-xs leading-tight md:text-left md:text-base">
              Spend minimal $100 get 30% off voucher code for your next purchase.
            </p>
            <p className="text-center text-xs font-semibold md:text-left md:text-sm">
              1 June - 10 June 2021
            </p>
            <button className="self-center rounded-[4px] bg-ink px-3 py-1 text-xs font-medium text-surface md:self-start md:rounded-lg md:px-6 md:py-3 md:text-sm">
              SHOP NOW
            </button>
          </div>
        </section>

        <section className="bg-surface px-2 py-6 md:px-10 md:py-12">
          <h2 className="text-left text-sm font-black leading-tight tracking-tight md:text-3xl">
            Young&apos;s Favourite
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2 md:mt-8 md:gap-6">
            {favourites.map((item) => (
              <article key={item.title} className="space-y-1.5 text-left md:space-y-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-auto w-full rounded-[8px] object-cover md:rounded-[16px]"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-medium md:text-2xl">{item.title}</h3>
                    <p className="text-xs text-ink/65 md:text-sm">{item.cta}</p>
                  </div>
                  <span aria-hidden="true" className="text-sm md:text-base">→</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 items-center gap-8 bg-surface px-5 py-12 md:grid-cols-2 md:gap-16 md:px-16 md:py-20">
          <div className="max-w-xl space-y-4 text-left md:space-y-6">
            <h2 className="text-lg leading-tight font-black tracking-wide sm:text-xl md:text-3xl">
              DOWNLOAD APP &
              <br />
              GET THE VOUCHER!
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-ink/55 sm:text-base md:text-base">
              Get 30% off for first transaction using {' '}
              <br className="hidden md:block" />
              Rondovision mobile app for now.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                className="inline-flex overflow-hidden rounded-xl"
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={playStoreBadge}
                  alt="Get it on Google Play (Play Store badge)"
                  className="block h-10 w-auto sm:h-11 md:h-12"
                  loading="lazy"
                />
              </a>
              <a
                className="inline-flex overflow-hidden rounded-xl"
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play (Google Play badge)"
                  className="block h-10 w-auto sm:h-11 md:h-12"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
          <div className="relative flex min-h-[320px] items-center justify-center md:min-h-[420px]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10 md:h-[480px] md:w-[480px]"></div>
              <div className="absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10 md:h-[400px] md:w-[400px]"></div>
              <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10 md:h-[320px] md:w-[320px]"></div>
            </div>
            <span
              className="absolute top-[18%] left-[8%] z-0 size-3 rounded-full bg-brand md:top-[16%] md:left-[10%] md:size-4"
              aria-hidden="true"
            ></span>
            <span
              className="absolute top-[12%] right-[12%] z-0 size-2 rounded-full bg-ink/30 md:top-[10%] md:right-[10%] md:size-3"
              aria-hidden="true"
            ></span>
            <span
              className="absolute bottom-[16%] left-[20%] z-0 size-2 rounded-full bg-ink/30 md:bottom-[14%] md:left-[16%] md:size-3"
              aria-hidden="true"
            ></span>
            <span
              className="absolute right-[6%] bottom-[8%] z-0 size-3 rounded-full bg-brand md:bottom-[10%] md:right-[8%] md:size-4"
              aria-hidden="true"
            ></span>
            <img
              src={mobileImg}
              alt="Mobile app preview"
              className="relative z-10 h-auto w-[190px] md:w-[360px] lg:w-[400px]"
            />
          </div>
        </section>
      </main>

      <section className="bg-brand px-4 py-12 text-center text-white md:px-8 md:py-20">
        <h2 className="mx-auto max-w-4xl text-2xl font-black uppercase leading-tight tracking-wide text-white sm:text-3xl md:text-5xl">
          JOIN SHOPPING COMMUNITY TO
          <br />
          GET MONTHLY PROMO
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/90 sm:text-base md:mt-6 md:text-lg">
          Type your email down below and be young wild generation.
        </p>
        <form className="mx-auto mt-6 flex w-full max-w-2xl items-center gap-2 rounded-xl bg-surface p-2 md:mt-8 md:gap-3 md:p-3">
          <input
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-ink/35 sm:px-3 sm:text-base md:py-3"
            type="email"
            placeholder="Add your email here"
            autoComplete="email"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-ink px-5 py-2 text-sm font-semibold uppercase tracking-wide text-surface sm:px-6 sm:py-3 sm:text-base"
          >
            SEND
          </button>
        </form>
      </section>

      <footer className="border-t-2 border-brand bg-ink px-4 py-10 text-left text-white md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-3xl font-black tracking-wide md:text-4xl">FASHION</h3>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-400 md:text-base">
              Complete your style with awesome clothes from us.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <a
                className="inline-flex size-8 items-center justify-center rounded-md bg-brand text-ink md:size-10"
                href="#"
                aria-label="Facebook"
              >
                <FaFacebookF className="size-4" aria-hidden="true" />
              </a>
              <a
                className="inline-flex size-8 items-center justify-center rounded-md bg-brand text-ink md:size-10"
                href="#"
                aria-label="Instagram"
              >
                <FaInstagram className="size-4" aria-hidden="true" />
              </a>
              <a
                className="inline-flex size-8 items-center justify-center rounded-md bg-brand text-ink md:size-10"
                href="#"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="size-4" aria-hidden="true" />
              </a>
              <a
                className="inline-flex size-8 items-center justify-center rounded-md bg-brand text-ink md:size-10"
                href="#"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-base font-medium text-white md:mb-6 md:text-lg">Company</h4>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm text-neutral-400 md:gap-4 md:text-base">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <a className="transition-colors hover:text-white" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-base font-medium text-white md:mb-6 md:text-lg">Quick Link</h4>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm text-neutral-400 md:gap-4 md:text-base">
              {footerLinks.quickLinks.map((item) => (
                <li key={item}>
                  <a className="transition-colors hover:text-white" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-base font-medium text-white md:mb-6 md:text-lg">Legal</h4>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm text-neutral-400 md:gap-4 md:text-base">
              {footerLinks.legal.map((item) => (
                <li key={item}>
                  <a className="transition-colors hover:text-white" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
