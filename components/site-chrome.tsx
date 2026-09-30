'use client'

import { usePathname } from 'next/navigation'

export function SiteChrome({ header, footer, children }: { header: React.ReactNode; footer: React.ReactNode; children: React.ReactNode }) {
  const admin = usePathname().startsWith('/admin')
  return (
    <>
      {!admin && header}
      <div className="flex-1">{children}</div>
      {!admin && footer}
    </>
  )
}
