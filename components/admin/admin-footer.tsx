import Image from 'next/image'
import Link from 'next/link'
import { ADMIN_BASE } from '@/lib/admin-path'
import { ui } from '@/components/admin/ui'
import { logout } from '@/app/admin/actions'

const links = [
  { label: 'Shipments', href: ADMIN_BASE },
  { label: 'Messages', href: `${ADMIN_BASE}/messages` },
  { label: 'View website', href: '/' },
]

export function AdminFooter() {
  return (
    <footer className="relative mt-16 border-t border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.07] print:hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <Image src="/vantage-mark.png" alt="" width={267} height={265} className="size-9 brightness-0 invert" />
            <span className="flex flex-col leading-none">
              <span className="text-[17px] font-bold tracking-[0.14em]">VANTAGE</span>
              <span className="mt-1 text-xs font-medium tracking-[0.3em] text-gold">CONTROL PANEL</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/65">
            Staff area for managing shipments, tracking updates and customer messages.
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="eyebrow flex items-center gap-2 text-gold">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden />
            Quick links
          </h3>
          <ul className="mt-5 space-y-3.5">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="inline-block text-[15px] text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <p className="flex items-center gap-2.5 text-[15px] font-semibold">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold/60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-gold" />
              </span>
              Secure session
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/60">
              This session is private to this browser and expires after 7 days.
            </p>
            <form action={logout} className="mt-4">
              <button className={ui.secondary}>Log out</button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Vantage Logistics. Staff access only.</p>
          <p>This area is not listed in search engines.</p>
        </div>
      </div>
    </footer>
  )
}
