import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Pill buttons. A trailing icon (e.g. an arrow) automatically becomes a small circular chip.
const brandButton = cva(
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight whitespace-nowrap transition-all duration-300 outline-none hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-sky-deep focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg:last-child]:box-content [&_svg:last-child]:rounded-full [&_svg:last-child]:transition-all [&_svg:last-child]:duration-300 hover:[&_svg:last-child]:translate-x-0.5',
  {
    variants: {
      variant: {
        gold: 'bg-gold text-navy-dark shadow-[0_10px_28px_-10px_rgb(206_255_82/0.85)] hover:bg-[#dcff7d] hover:shadow-[0_14px_34px_-10px_rgb(206_255_82/0.95)] [&_svg:last-child]:bg-navy-dark/10 hover:[&_svg:last-child]:bg-navy-dark hover:[&_svg:last-child]:text-gold',
        navy: 'bg-navy text-white shadow-[0_10px_28px_-12px_rgb(21_46_64/0.9)] hover:bg-navy-light [&_svg:last-child]:bg-white/15 hover:[&_svg:last-child]:bg-gold hover:[&_svg:last-child]:text-navy-dark',
        light:
          'bg-white text-navy-dark shadow-[0_10px_28px_-12px_rgb(0_0_0/0.5)] hover:bg-paper [&_svg:last-child]:bg-navy/10 hover:[&_svg:last-child]:bg-navy hover:[&_svg:last-child]:text-white',
        outline:
          'border border-navy/15 bg-white text-navy shadow-sm hover:border-navy/40 hover:bg-paper [&_svg:last-child]:bg-navy/5 hover:[&_svg:last-child]:bg-navy hover:[&_svg:last-child]:text-white',
        outlineLight:
          'border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/15 [&_svg:last-child]:bg-white/10 hover:[&_svg:last-child]:bg-gold hover:[&_svg:last-child]:text-navy-dark',
        ghost: 'text-navy hover:bg-navy/5',
      },
      size: {
        sm: 'h-10 px-5 text-sm has-[>svg:last-child]:pr-1.5 [&_svg:last-child]:p-1.5',
        md: 'h-12 px-6 text-[15px] has-[>svg:last-child]:pr-2 [&_svg:last-child]:p-2',
        lg: 'h-14 px-8 text-base has-[>svg:last-child]:pr-2.5 [&_svg:last-child]:p-2.5',
      },
    },
    defaultVariants: { variant: 'navy', size: 'md' },
  },
)

type BrandButtonProps = VariantProps<typeof brandButton> & {
  href?: string
  className?: string
  children: React.ReactNode
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export function BrandButton({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: BrandButtonProps) {
  const classes = cn(brandButton({ variant, size }), className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
