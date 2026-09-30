import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, ShieldCheck, HeartHandshake, Target } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { BrandButton } from '@/components/brand-button'
import { CtaBanner } from '@/components/cta-banner'
import { stats } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Vantage Logistics ships freight for businesses and individuals by air, sea and road, with warehousing, customs clearance and online tracking.',
}

const values = [
  {
    icon: ShieldCheck,
    title: 'Reliability',
    description: 'We give realistic delivery dates and warn you early if one slips.',
  },
  {
    icon: HeartHandshake,
    title: 'Honesty',
    description: 'We explain every charge before you commit.',
  },
  {
    icon: Target,
    title: 'Service',
    description: 'You get one named contact for your account.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Vantage Logistics"
        title="We move freight and tell you where it is."
        description="Vantage Logistics ships for businesses and individuals by air, sea and road. We also handle warehousing and customs."
        image="/images/photo/terminal-aerial.jpg"
        imageAlt="Aerial view of a container terminal with stacked shipping containers"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Mission */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-muted-foreground">
                Our Mission
              </p>
              <h2 className="mt-3 text-3xl font-medium text-ink text-balance sm:text-4xl">
                Shipping that&apos;s easy to follow.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We want moving cargo to be simple for businesses and private
                senders alike: clear prices, honest delivery dates and an
                update whenever something changes.
              </p>

              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                {values.map((value) => (
                  <div key={value.title}>
                    <div className="flex size-11 items-center justify-center rounded-lg bg-navy/5 text-navy">
                      <value.icon className="size-5" />
                    </div>
                    <dt className="mt-4 font-semibold text-navy">
                      {value.title}
                    </dt>
                    <dd className="mt-1 text-base text-muted-foreground">
                      {value.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-dark shadow-sm ring-1 ring-navy/10">
              <Image
                src="/images/photo/warehouse.jpg"
                alt="Warehouse aisle with palletized cargo on racking"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent"
                aria-hidden
              />
              <figcaption className="eyebrow absolute bottom-5 left-5 text-white">
                Warehouse operations
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-navy py-14">
        <div className="container-page">
          <dl className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-4xl font-medium tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-base text-white/70">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <figure className="relative order-last aspect-[4/3] overflow-hidden rounded-xl bg-navy-dark shadow-sm ring-1 ring-navy/10 lg:order-first">
              <Image
                src="/images/photo/port-approach.jpg"
                alt="Container ship guided into port by tugboats"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent"
                aria-hidden
              />
              <figcaption className="eyebrow absolute bottom-5 left-5 text-white">
                Port operations
              </figcaption>
            </figure>
            <div>
              <p className="eyebrow text-muted-foreground">
                Our Story
              </p>
              <h2 className="mt-3 text-3xl font-medium text-ink text-balance sm:text-4xl">
                How we work
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We handle air, ocean and road freight, warehousing and customs
                for businesses and individuals. Every shipment gets a tracking
                number, and every customer gets one point of contact.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                If something changes on the way, like a delayed flight or a
                customs hold, we tell you what happened and what we&apos;re
                doing about it.
              </p>
              <BrandButton href="/services" variant="gold" className="mt-8">
                See our services
                <ArrowRight />
              </BrandButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  )
}
