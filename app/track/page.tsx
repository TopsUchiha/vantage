import type { Metadata } from 'next'
import { PackageSearch } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { TrackForm } from '@/components/track-form'
import { ShipmentResult } from '@/components/track/shipment-result'

export const metadata: Metadata = {
  title: 'Track Shipment',
  description:
    'Enter your Vantage Logistics tracking number to see where your shipment is and what its status is.',
}

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ number?: string }>
}) {
  const { number } = await searchParams
  const trackingNumber = number?.trim()

  return (
    <main>
      <PageHero
        eyebrow="Track Shipment"
        title="Where is your shipment?"
        description="Enter your tracking number to see where your shipment is and what its status is."
        image="/images/photo/port-approach.jpg"
        imageAlt="Container ship docked at a busy port"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Track Shipment' }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <TrackForm
              defaultValue={trackingNumber}
              autoFocus={!trackingNumber}
              className="border border-border"
            />
          </div>

          <div className="mt-12">
            {trackingNumber ? (
              <ShipmentResult trackingNumber={trackingNumber} />
            ) : (
              <div className="mx-auto max-w-md rounded-lg border border-dashed border-navy/15 bg-navy/[0.02] px-6 py-14 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-navy/5 text-navy">
                  <PackageSearch className="size-7" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-navy">
                  No shipment selected
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Enter a tracking number above to see the status, location and delivery timeline.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
