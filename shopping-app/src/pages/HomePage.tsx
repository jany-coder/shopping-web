import { BrandStrip } from '../components/landing/BrandStrip'
import { DownloadAppSection } from '../components/landing/DownloadAppSection'
import { Header } from '../components/landing/Header'
import { NewArrivalsSection } from '../components/landing/NewArrivalsSection'
import { NewsletterSection } from '../components/landing/NewsletterSection'
import { PaydaySection } from '../components/landing/PaydaySection'
import { SiteFooter } from '../components/landing/SiteFooter'
import { YoungFavouritesSection } from '../components/landing/YoungFavouritesSection'

export function HomePage() {
  return (
    <div className="relative overflow-hidden bg-brand/25">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-2 md:px-8">
        <BrandStrip />
        <NewArrivalsSection />
        <PaydaySection />
        <YoungFavouritesSection />
        <DownloadAppSection />
      </main>
      <NewsletterSection />
      <SiteFooter />
    </div>
  )
}
