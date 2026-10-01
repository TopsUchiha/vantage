import Image from 'next/image'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { newMessageCount } from '@/lib/admin-data'
import { ADMIN_BASE } from '@/lib/admin-path'
import { AdminNav } from '@/components/admin/admin-nav'
import { AdminFooter } from '@/components/admin/admin-footer'
import { ui } from '@/components/admin/ui'
import { logout } from '../actions'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  const n = await newMessageCount()
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-dark/80 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link href={ADMIN_BASE} className="flex items-center gap-2.5">
              <Image src="/vantage-mark.png" alt="" width={267} height={265} className="size-8 brightness-0 invert" />
              <span className="flex flex-col leading-none">
                <span className="text-[17px] font-bold tracking-[0.14em]">VANTAGE</span>
                <span className="mt-1 text-xs font-medium tracking-[0.3em] text-gold">CONTROL PANEL</span>
              </span>
            </Link>
            <AdminNav base={ADMIN_BASE} newMessages={n} />
          </div>
          <form action={logout}>
            <button className={ui.secondary}>Log out</button>
          </form>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8 print:p-0">{children}</div>
      <AdminFooter />
    </>
  )
}
