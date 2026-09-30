import Image from 'next/image'
import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CtaBanner } from '@/components/cta-banner'
import { services } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Air freight, ocean freight, road transport, warehousing, cargo forwarding, customs clearance and e-commerce fulfillment from Vantage Logistics.',
}

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our Services"
        title="What we do"
        description="Air, ocean and road freight, plus warehousing, customs and fulfillment. Use one service or all of them."
        image="/images/photo/airport-apron.jpg"
        imageAlt="Cargo aircraft being loaded on an airport tarmac"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <section className="bg-white">
        <div className="container-page py-20 sm:py-28">
          <ol className="flex flex-col gap-20 sm:gap-28">
            {services.map((service, i) => (
              <li
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-24 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-dark shadow-sm ring-1 ring-navy/10 lg:col-span-7 ${
                    i % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    quality={85}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy-dark/45 via-transparent to-transparent"
                    aria-hidden
                  />
                  <span className="absolute bottom-5 left-5 flex size-12 items-center justify-center rounded-xl bg-gold text-navy-dark shadow-lg">
                    <service.icon className="size-6" />
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <p className="eyebrow text-muted-foreground">
                    {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                  </p>
                  <h2 className="mt-4 text-3xl font-medium text-ink sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-lg text-ink/80">{service.short}</p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </main>
  )
}
