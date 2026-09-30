'use client'

import dynamic from 'next/dynamic'
import type { MapPoint } from './route-map'

const RouteMap = dynamic(() => import('./route-map'), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse rounded-2xl bg-navy/5" />,
})

export function ShipmentMap({ points }: { points: MapPoint[] }) {
  if (points.length === 0) return null
  return <RouteMap points={points} />
}
