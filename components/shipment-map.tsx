'use client'

import { useEffect, useRef, useState } from 'react'
import { Maximize2, Minimize2, MapPin, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Point = { lat: number; lng: number; label: string }
type Props = {
  current: Point | null
  origin: Point | null
  destination: Point | null
  locationText?: string | null
  query: string
}

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || 'DEMO_MAP_ID'

/* eslint-disable @typescript-eslint/no-explicit-any */
let googlePromise: Promise<any> | null = null
function loadGoogle(): Promise<any> {
  const w = window as any
  if (w.google?.maps?.importLibrary) return Promise.resolve(w.google)
  if (!googlePromise) {
    googlePromise = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&loading=async&v=weekly`
      s.async = true
      s.onload = () => resolve(w.google)
      s.onerror = () => {
        googlePromise = null
        reject(new Error('Google Maps failed to load'))
      }
      document.head.appendChild(s)
    })
  }
  return googlePromise
}

function dot(fill: string, border: string) {
  const el = document.createElement('div')
  el.style.cssText = `width:16px;height:16px;border-radius:50%;background:${fill};border:3px solid ${border};box-shadow:0 1px 4px rgba(0,0,0,.4);transform:translateY(50%)`
  return el
}

// Full Google Maps (zoom, pinch, Map/Satellite switch) with a blue Google pin on the current location
function JsMap({
  current,
  origin,
  destination,
  expanded,
  onFail,
}: Pick<Props, 'current' | 'origin' | 'destination'> & { expanded: boolean; onFail: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    let cancelled = false
    ;(window as any).gm_authFailure = onFail // bad or restricted key: fall back to the embed
    ;(async () => {
      try {
        const g = await loadGoogle()
        const { Map, InfoWindow, Polyline } = await g.maps.importLibrary('maps')
        const { AdvancedMarkerElement, PinElement } = await g.maps.importLibrary('marker')
        if (cancelled || !ref.current) return

        const pts = [origin, current, destination].filter((p): p is Point => p !== null)
        const map = new Map(ref.current, {
          mapId: MAP_ID,
          center: { lat: pts[0].lat, lng: pts[0].lng },
          zoom: 6,
          gestureHandling: 'greedy', // one finger pans, two fingers pinch-zoom
          clickableIcons: false, // no place cards that link out to google.com
          zoomControl: true,
          mapTypeControl: true, // Map / Satellite switch
          streetViewControl: false,
          fullscreenControl: false,
        })
        mapRef.current = map

        if (pts.length > 1) {
          new Polyline({
            map,
            path: pts.map((p) => ({ lat: p.lat, lng: p.lng })),
            geodesic: true,
            strokeColor: '#1673a5',
            strokeOpacity: 0.8,
            strokeWeight: 3,
          })
          const bounds = new g.maps.LatLngBounds()
          pts.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }))
          map.fitBounds(bounds, 60)
          g.maps.event.addListenerOnce(map, 'idle', () => {
            if ((map.getZoom() ?? 0) > 8) map.setZoom(8)
          })
        }

        if (origin)
          new AdvancedMarkerElement({ map, position: origin, title: origin.label, content: dot('#152e40', '#ffffff') })
        if (destination)
          new AdvancedMarkerElement({ map, position: destination, title: destination.label, content: dot('#ceff52', '#152e40') })

        if (current) {
          const pin = new PinElement({ background: '#1a73e8', borderColor: '#1557b0', glyphColor: '#ffffff', scale: 1.3 })
          const marker = new AdvancedMarkerElement({
            map,
            position: current,
            title: current.label,
            content: pin.element,
            gmpClickable: true,
            zIndex: 10,
          })
          const info = new InfoWindow({ content: `<strong>Current location</strong><br>${current.label.replace(/</g, '&lt;')}` })
          marker.addListener('click', () => info.open({ map, anchor: marker }))
        }
      } catch {
        if (!cancelled) onFail()
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const g = (window as any).google
    if (mapRef.current && g?.maps?.event) setTimeout(() => g.maps.event.trigger(mapRef.current, 'resize'), 150)
  }, [expanded])

  return <div ref={ref} className="size-full" />
}

// Fallback (no API key): the regular Google Maps embed with our own zoom and satellite buttons
function EmbedMap({ query }: { query: string }) {
  const [satellite, setSatellite] = useState(false)
  const [zoom, setZoom] = useState(6)
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&t=${satellite ? 'h' : 'm'}&z=${zoom}&output=embed`
  const segment = (on: boolean) =>
    cn('h-10 px-4 text-sm font-semibold transition-colors', on ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-paper')
  const round =
    'flex size-10 items-center justify-center bg-white text-navy transition-colors hover:bg-paper disabled:opacity-40'

  return (
    <>
      <iframe
        title="Shipment location"
        src={src}
        className="absolute inset-0 size-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin"
      />
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 overflow-hidden rounded-full border border-navy/15 shadow-md" role="group" aria-label="Map type">
        <button type="button" aria-pressed={!satellite} onClick={() => setSatellite(false)} className={segment(!satellite)}>
          Map
        </button>
        <button type="button" aria-pressed={satellite} onClick={() => setSatellite(true)} className={segment(satellite)}>
          Satellite
        </button>
      </div>
      <div className="absolute right-3 bottom-8 z-10 flex flex-col overflow-hidden rounded-xl border border-navy/15 shadow-md">
        <button type="button" aria-label="Zoom in" disabled={zoom >= 20} onClick={() => setZoom((z) => Math.min(z + 1, 20))} className={round}>
          <Plus className="size-5" />
        </button>
        <button type="button" aria-label="Zoom out" disabled={zoom <= 2} onClick={() => setZoom((z) => Math.max(z - 1, 2))} className={cn(round, 'border-t border-navy/10')}>
          <Minus className="size-5" />
        </button>
      </div>
    </>
  )
}

export default function ShipmentMap({ current, origin, destination, locationText, query }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [failed, setFailed] = useState(false)
  const hasPoints = current || origin || destination

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setExpanded(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [expanded])

  if (!hasPoints && !query) {
    return (
      <div className="flex h-72 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-navy/15 bg-navy/[0.02] px-6 text-center">
        <MapPin className="size-6 text-navy/60" />
        <p className="text-base text-muted-foreground">No location has been added yet.</p>
      </div>
    )
  }

  const useJs = Boolean(KEY) && Boolean(hasPoints) && !failed

  return (
    <div
      className={cn(
        'isolate overflow-hidden bg-slate-100',
        expanded ? 'fixed inset-0 z-[100]' : 'relative h-[22rem] rounded-xl border border-navy/10 sm:h-[28rem]',
      )}
    >
      {useJs ? (
        <JsMap current={current} origin={origin} destination={destination} expanded={expanded} onFail={() => setFailed(true)} />
      ) : (
        <EmbedMap query={query || locationText || ''} />
      )}

      <button
        type="button"
        aria-label={expanded ? 'Close full screen' : 'Open full screen'}
        onClick={() => setExpanded((v) => !v)}
        className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-md transition-colors hover:bg-paper"
        style={expanded ? { top: 'max(0.75rem, env(safe-area-inset-top))' } : undefined}
      >
        {expanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
      </button>
    </div>
  )
}
