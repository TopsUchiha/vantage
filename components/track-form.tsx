'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type TrackFormProps = {
  className?: string
  defaultValue?: string
  placeholder?: string
  autoFocus?: boolean
}

export function TrackForm({
  className,
  defaultValue = '',
  placeholder = 'Enter tracking number (e.g. VGL-8291047)',
  autoFocus = false,
}: TrackFormProps) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    router.push(`/track?number=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-lg shadow-navy/5 sm:flex-row sm:items-center sm:rounded-full sm:pl-4',
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-3 px-3">
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Tracking number"
          className="h-12 w-full bg-transparent text-base text-navy outline-none placeholder:text-muted-foreground"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 text-[15px] font-semibold text-navy-dark shadow-[0_8px_22px_-8px_rgb(206_255_82/0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#dcff7d]"
      >
        Track Shipment
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}
