import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { footerLinks } from '../../content/landingData'

const social = [
  { href: '#', label: 'Facebook' as const, Icon: FaFacebookF },
  { href: '#', label: 'Instagram' as const, Icon: FaInstagram },
  { href: '#', label: 'X (Twitter)' as const, Icon: FaXTwitter },
  { href: '#', label: 'LinkedIn' as const, Icon: FaLinkedinIn },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-brand bg-ink px-4 py-10 text-left text-white md:px-8 md:py-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <h3 className="text-3xl font-black tracking-wide md:text-4xl">FASHION</h3>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-400 md:text-base">
            Complete your style with awesome clothes from us.
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {social.map(({ href, label, Icon }) => (
              <a
                key={label}
                className="inline-flex size-8 items-center justify-center rounded-md bg-brand text-ink md:size-10"
                href={href}
                aria-label={label}
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
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
  )
}
