export function NewsletterSection() {
  return (
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
  )
}
