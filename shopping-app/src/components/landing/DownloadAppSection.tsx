import mobileImg from '../../assets/mobile.png'
import playStoreBadge from '../../assets/playstore.png'
import googlePlayBadge from '../../assets/google-play.png'

export function DownloadAppSection() {
  return (
    <section className="grid grid-cols-1 items-center gap-8 bg-surface px-5 py-12 md:grid-cols-2 md:gap-16 md:px-16 md:py-20">
      <div className="max-w-xl space-y-4 text-left md:space-y-6">
        <h2 className="text-lg leading-tight font-black tracking-wide sm:text-xl md:text-3xl">
          DOWNLOAD APP &
          <br />
          GET THE VOUCHER!
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-ink/55 sm:text-base md:text-base">
          Get 30% off for first transaction using <br className="hidden md:block" />
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
  )
}
