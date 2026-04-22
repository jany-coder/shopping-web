import amazonLogo from '../assets/amazon.png'
import hmLogo from '../assets/h&m.png'
import lacosteLogo from '../assets/lacoste.png'
import levisLogo from '../assets/levis.png'
import obeyLogo from '../assets/obey.png'
import shopifyLogo from '../assets/shopify.png'
import favouriteImg from '../assets/favourite.png'
import favourite02Img from '../assets/favourite-02.png'
import newArrival01Img from '../assets/new-arrival-01.png'
import newArrival02Img from '../assets/new-arrival-2.png'
import newArrival03Img from '../assets/new-arrival-3.png'

export type ShowcaseItem = {
  title: string
  cta: string
  image: string
}

export const navItems = ['CATALOGUE', 'FASHION', 'FAVOURITE', 'LIFESTYLE'] as const

export type BrandLogo = {
  id: string
  src: string
  alt: string
}

export const brandLogos: BrandLogo[] = [
  { id: 'hm', src: hmLogo, alt: 'H&M' },
  { id: 'obey', src: obeyLogo, alt: 'Obey' },
  { id: 'shopify', src: shopifyLogo, alt: 'Shopify' },
  { id: 'lacoste', src: lacosteLogo, alt: 'Lacoste' },
  { id: 'levis', src: levisLogo, alt: "Levi's" },
  { id: 'amazon', src: amazonLogo, alt: 'Amazon' },
]

export const newArrivals: ShowcaseItem[] = [
  { title: 'Hoodies & Sweatshirt', cta: 'Explore Now', image: newArrival01Img },
  { title: 'Coats & Parkas', cta: 'Explore Now', image: newArrival02Img },
  { title: 'Tees & T-Shirt', cta: 'Explore Now', image: newArrival03Img },
]

export const youngFavourites: ShowcaseItem[] = [
  { title: 'Trending on Instagram', cta: 'Explore Now!', image: favouriteImg },
  { title: 'All Under $40', cta: 'Explore Now!', image: favourite02Img },
]

export const footerLinks = {
  company: ['About', 'Contact us', 'Support', 'Careers'] as const,
  quickLinks: ['Share Location', 'Orders Tracking', 'Size Guide', 'FAQs'] as const,
  legal: ['Terms & conditions', 'Privacy Policy'] as const,
}
