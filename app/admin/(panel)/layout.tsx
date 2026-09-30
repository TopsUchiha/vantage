import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { logout } from '../actions'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between border-b border-navy/10 pb-4 print:hidden">
        <nav className="flex items-center gap-5 text-sm font-medium text-navy">
          <Link href="/admin" className="text-lg font-semibold">Admin Panel</Link>
          <Link href="/admin" className="hover:underline">Shipments</Link>
          <Link href="/admin/messages" className="hover:underline">Messages</Link>
        </nav>
        <form action={logout}>
          <button className="text-sm font-medium text-navy underline-offset-4 hover:underline">Log out</button>
        </form>
      </div>
      {children}
    </div>
  )
}
