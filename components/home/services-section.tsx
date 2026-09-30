import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { services } from '@/lib/site'

export function ServicesSection() {
  return (
    <section className="bg-white">
      <div className="container-page py-20 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Services" title="Freight and customs, handled by one team." />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-ink transition-colors hover:text-sky-deep"
          >
            All services
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
