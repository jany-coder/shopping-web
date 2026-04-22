import paydayImg from '../../assets/payday.png'

export function PaydaySection() {
  return (
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
        <div className="w-full space-y-0.5 text-center md:text-left">
          <p className="m-0 text-xs font-bold text-ink md:text-sm">1 June - 10 June 2021</p>
          <p className="m-0 text-[10px] font-normal leading-tight text-ink sm:text-xs">
            *Terms & Conditions apply
          </p>
        </div>
        <button className="self-center rounded-[4px] bg-ink px-3 py-1 text-xs font-medium text-surface md:self-start md:rounded-lg md:px-6 md:py-3 md:text-sm">
          SHOP NOW
        </button>
      </div>
    </section>
  )
}
