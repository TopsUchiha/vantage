'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/logo'
import { BrandButton } from '@/components/brand-button'
import { navLinks } from '@/lib/site'
import { cn } from '@/lib/utils'

const OVERLAY_ROUTES = ['/', '/about', '/services', '/contact', '/track']

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const hasOverlay = OVERLAY_ROUTES.includes(pathname)
  const solid = !hasOverlay || scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
          solid
            ? 'border-b border-border bg-white/90 backdrop-blur-md'
            : 'border-b border-white/10 bg-transparent',
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Logo priority onDark={!solid} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'relative py-1 text-[15px] font-medium transition-colors',
                  solid
                    ? isActive(link.href)
                      ? 'text-navy'
                      : 'text-muted-foreground hover:text-navy'
                    : isActive(link.href)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white',
                  isActive(link.href) &&
                    cn('after:absolute after:inset-x-0 after:-bottom-[21px] after:h-0.5', solid ? 'after:bg-sky-deep' : 'after:bg-gold'),
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <BrandButton href="/contact" variant={solid ? 'navy' : 'light'} size="md">
              Request a quote
              <ArrowRight />
            </BrandButton>
          </div>

          <button
            type="button"
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-md lg:hidden',
              solid ? 'text-navy' : 'text-white',
            )}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div id="mobile-nav" className="border-t border-border bg-white lg:hidden">
            <nav className="container-page flex flex-col py-3" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between border-b border-border py-4 text-base font-medium last:border-b-0',
                    isActive(link.href) ? 'text-navy' : 'text-muted-foreground',
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="size-1.5 rounded-full bg-sky-deep" aria-hidden />
                  )}
                </Link>
              ))}
              <BrandButton href="/contact" variant="navy" size="md" className="mt-4 w-full">
                Request a quote
                <ArrowRight />
              </BrandButton>
            </nav>
          </div>
        )}
      </header>
      {!hasOverlay && <div className="h-16" aria-hidden />}
    </>
  )
}
