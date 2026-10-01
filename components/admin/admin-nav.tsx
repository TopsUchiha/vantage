'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { cn } from '@/lib/utils'

export function AdminNav({ base, newMessages }: { base: string; newMessages: number }) {
  const seg = useSelectedLayoutSegment()
  const items = [
    { label: 'Shipments', href: base, active: seg === null || seg === 'shipments', badge: 0 },
    { label: 'Messages', href: `${base}/messages`, active: seg === 'messages', badge: newMessages },
  ]
  return (
    <nav className="flex gap-1.5">
      {items.map((i) => (
        <Link
          key={i.label}
          href={i.href}
          className={cn(
            'inline-flex h-10 items-center gap-2 rounded-full px-4 text-[15px] font-medium transition-colors',
            i.active ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white',
          )}
        >
          {i.label}
          {i.badge > 0 && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-navy-dark">{i.badge}</span>
          )}
        </Link>
      ))}
    </nav>
  )
}
