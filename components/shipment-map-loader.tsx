'use client'

import dynamic from 'next/dynamic'

// Leaflet only runs in the browser, so it is loaded without server rendering.
export const ShipmentMap = dynamic(() => import('@/components/shipment-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[22rem] items-center justify-center rounded-xl bg-navy/5 text-base text-muted-foreground sm:h-[28rem]">
      Loading map…
    </div>
  ),
})
