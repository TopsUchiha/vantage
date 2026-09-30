import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '@/lib/site'
import { cn } from '@/lib/utils'

export function ServiceCard({
  service,
  index,
  className,
}: {
  service: Service
  index?: number
  className?: string
}) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className={cn('group flex flex-col', className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-dark ring-1 ring-navy/10">
        <Image
          src={service.image}
          alt=""
          fill
          quality={85}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-start justify-between gap-4 border-b border-border pt-5 pb-5">
        <div>
          {index !== undefined && (
            <p className="eyebrow text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </p>
          )}
          <h3 className="mt-2 text-xl font-medium text-ink">{service.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
            {service.short}
          </p>
        </div>
        <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
    </Link>
  )
}
