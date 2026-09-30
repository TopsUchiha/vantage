import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { BrandButton } from '@/components/brand-button'
import { Logo } from '@/components/logo'
import {
  LinkedInIcon,
  XIcon,
  FacebookIcon,
  InstagramIcon,
} from '@/components/social-icons'
import { siteConfig, navLinks, services } from '@/lib/site'

const socials = [
  { label: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { label: 'X', href: '#', icon: XIcon },
  { label: 'Facebook', href: '#', icon: FacebookIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
]

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-dark text-white">
      {/* colour: accent line + soft glows */}
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-sky to-gold"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-44 -right-36 -z-10 size-[30rem] rounded-full bg-sky/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-52 -left-40 -z-10 size-[30rem] rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="container-page pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-5 max-w-xs text-base leading-relaxed text-white/70">
              {siteConfig.tagline}
            </p>
            <BrandButton href="/track" variant="gold" size="md" className="mt-7">
              Track a shipment
              <ArrowRight />
            </BrandButton>
          </div>

          <FooterColumn title="Services" className="lg:col-span-3">
            {services.slice(0, 5).map((s) => (
              <FooterLink key={s.slug} href={`/services#${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company" className="lg:col-span-2">
            {navLinks
              .filter((l) => l.href !== '/')
              .map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
          </FooterColumn>

          <FooterColumn title="Contact" className="lg:col-span-3">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center gap-3 text-[15px] text-white/80 transition-colors hover:text-gold"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-sky/15 text-sky transition-colors group-hover:bg-gold group-hover:text-navy-dark">
                  <Mail className="size-4" />
                </span>
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-2.5 pt-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-navy-dark"
                >
                  <s.icon className="size-4" />
                </Link>
              ))}
            </li>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Vantage Logistics. All rights reserved.</p>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <h3 className="eyebrow flex items-center gap-2 text-gold">
        <span className="size-1.5 rounded-full bg-gold" aria-hidden />
        {title}
      </h3>
      <ul className="mt-6 space-y-3.5">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="inline-block text-[15px] text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}
