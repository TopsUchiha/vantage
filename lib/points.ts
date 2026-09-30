import type { MapPoint } from '@/components/route-map'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildPoints(s: any): MapPoint[] {
  const pts: MapPoint[] = []
  if (s.origin_lat != null) pts.push({ label: `Origin: ${s.origin}`, lat: s.origin_lat, lng: s.origin_lng, color: '#2563eb' })
  if (s.current_lat != null) pts.push({ label: `Now: ${s.current_location}`, lat: s.current_lat, lng: s.current_lng, color: '#e0a526' })
  if (s.dest_lat != null) pts.push({ label: `Destination: ${s.destination}`, lat: s.dest_lat, lng: s.dest_lng, color: '#16a34a' })
  return pts
}


// Props for <ShipmentMap /> (origin, current location and destination, when they have coordinates)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shipmentMapProps(s: any) {
  const pt = (label: string, lat: unknown, lng: unknown) =>
    lat != null && lng != null ? { label, lat: Number(lat), lng: Number(lng) } : null
  return {
    origin: pt(`Origin: ${s.origin}`, s.origin_lat, s.origin_lng),
    current: pt(s.current_location || 'Current location', s.current_lat, s.current_lng),
    destination: pt(`Destination: ${s.destination}`, s.dest_lat, s.dest_lng),
    locationText: (s.current_location as string | null) ?? null,
    query:
      s.current_lat != null && s.current_lng != null
        ? `${s.current_lat},${s.current_lng}`
        : ((s.current_location || s.destination || '') as string),
  }
}
