import { STATUS_LABELS } from '@/lib/status'
import { cn } from '@/lib/utils'

// Shared look for the admin panel (dark navy, lime accents)
export const ui = {
  card: 'rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-7',
  input:
    'h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-base text-white outline-none transition [color-scheme:dark] placeholder:text-white/40 focus:border-gold focus:bg-white/[0.09] focus:ring-2 focus:ring-gold/25',
  label: 'text-[13px] font-semibold uppercase tracking-wider text-white/55',
  h2: 'text-xl font-semibold text-white',
  primary:
    'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 text-[15px] font-semibold text-navy-dark shadow-[0_10px_28px_-10px_rgb(206_255_82/0.6)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#dcff7d] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark print:hidden',
  secondary:
    'inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 text-[15px] font-medium text-white outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-sky',
  danger:
    'inline-flex h-11 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 px-5 text-[15px] font-medium text-red-300 outline-none transition-all duration-300 hover:bg-red-500/20 focus-visible:ring-2 focus-visible:ring-red-400',
  chip: 'inline-flex h-9 items-center rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-sky',
}

const TONES: Record<string, string> = {
  DELIVERED: 'bg-gold/15 text-gold ring-gold/30',
  IN_TRANSIT: 'bg-sky/15 text-sky ring-sky/30',
  OUT_FOR_DELIVERY: 'bg-sky/15 text-sky ring-sky/30',
  CUSTOMS: 'bg-violet-400/15 text-violet-200 ring-violet-300/30',
  ON_HOLD: 'bg-orange-400/15 text-orange-300 ring-orange-300/30',
  CANCELLED: 'bg-red-500/15 text-red-300 ring-red-400/30',
  NEW: 'bg-gold/15 text-gold ring-gold/30',
  REPLIED: 'bg-sky/15 text-sky ring-sky/30',
  ARCHIVED: 'bg-white/5 text-white/50 ring-white/15',
}

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap ring-1 ring-inset',
        TONES[status] ?? 'bg-white/10 text-white/80 ring-white/20',
      )}
    >
      {label ?? STATUS_LABELS[status] ?? status}
    </span>
  )
}
