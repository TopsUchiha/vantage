import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  onDark?: boolean
  priority?: boolean
}

export function Logo({ className, onDark = false, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Vantage Logistics home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <Image
        src="/vantage-mark.png"
        alt=""
        width={267}
        height={265}
        priority={priority}
        className={cn(
          'size-8 transition-[filter] duration-300',
          onDark && 'brightness-0 invert',
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[17px] font-bold tracking-[0.14em] transition-colors duration-300',
            onDark ? 'text-white' : 'text-navy',
          )}
        >
          VANTAGE
        </span>
        <span
          className={cn(
            'mt-1 text-xs font-medium tracking-[0.3em] transition-colors duration-300',
            onDark ? 'text-white/60' : 'text-muted-foreground',
          )}
        >
          LOGISTICS
        </span>
      </span>
    </Link>
  )
}
