import type { MapPoint } from '@/components/route-map'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildPoints(s: any): MapPoint[] {
  const pts: MapPoint[] = []
  if (s.origin_lat != null) pts.push({ label: `Origin: ${s.origin}`, lat: s.origin_lat, lng: s.origin_lng, color: '#2563eb' })
  if (s.current_lat != null) pts.push({ label: `Now: ${s.current_location}`, lat: s.current_lat, lng: s.current_lng, color: '#e0a526' })
  if (s.dest_lat != null) pts.push({ label: `Destination: ${s.destination}`, lat: s.dest_lat, lng: s.dest_lng, color: '#16a34a' })
  return pts
}

