import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { BrandButton } from '@/components/brand-button'

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-dark">
      <Image
        src="/images/photo/port-approach.jpg"
        alt="Container ship guided into port by tugboats"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-dark/85 via-navy-dark/45 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy-dark/70 to-transparent"
        aria-hidden
      />

      <div className="container-page flex min-h-[100svh] max-h-[960px] flex-col justify-end pt-32 pb-16 sm:pb-20">
        <p className="eyebrow text-white/70">Air &middot; Ocean &middot; Road &middot; Warehousing</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[1.02] text-white text-balance sm:text-6xl lg:text-7xl">
          Your cargo, tracked from pickup to delivery.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 text-pretty sm:text-lg">
          We ship for manufacturers and retailers to more than 150 countries. Every shipment has a
          tracking number you can check at any time.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <BrandButton href="/contact" variant="gold" size="lg">
            Request a quote
            <ArrowRight />
          </BrandButton>
          <BrandButton href="/track" variant="outlineLight" size="lg">
            Track a shipment
          </BrandButton>
        </div>
      </div>
    </section>
  )
}
