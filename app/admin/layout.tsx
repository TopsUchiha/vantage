import type { Metadata } from 'next'
import { AdminBackdrop } from '@/components/admin/backdrop'

export const metadata: Metadata = {
  title: { absolute: 'Control Panel' },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminBackdrop>{children}</AdminBackdrop>
}
