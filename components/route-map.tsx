'use client'

import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export type MapPoint = { label: string; lat: number; lng: number; color: string }

export default function RouteMap({ points }: { points: MapPoint[] }) {
  const line = points.map((p) => [p.lat, p.lng] as [number, number])
  return (
    <MapContainer
      bounds={line.length > 1 ? line : undefined}
      boundsOptions={{ padding: [40, 40] }}
      center={line.length === 1 ? line[0] : undefined}
      zoom={line.length === 1 ? 5 : undefined}
      scrollWheelZoom={false}
      className="z-0 h-80 w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={line} pathOptions={{ color: '#1673a5', dashArray: '6 8', weight: 3 }} />
      {points.map((p) => (
        <CircleMarker key={p.label} center={[p.lat, p.lng]} radius={9} pathOptions={{ color: '#fff', weight: 2, fillColor: p.color, fillOpacity: 1 }}>
          <Tooltip>{p.label}</Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
