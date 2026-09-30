import { ArrowRight } from 'lucide-react'
import { BrandButton } from '@/components/brand-button'

type CtaBannerProps = {
  title?: string
  description?: string
}

export function CtaBanner({
  title = 'Tell us what needs to move.',
  description = 'Send us the details and we\'ll reply within one business day with routing options and a price.',
}: CtaBannerProps) {
  return (
    <section className="border-t border-border bg-white">
      <div className="container-page grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-end">
        <h2 className="max-w-xl text-4xl font-medium text-ink text-balance sm:text-5xl lg:col-span-7">
          {title}
        </h2>
        <div className="lg:col-span-5">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BrandButton href="/contact" variant="navy" size="lg">
              Request a quote
              <ArrowRight />
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  )
}
