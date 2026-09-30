import { MapPin } from 'lucide-react'
import { q } from '@/lib/db'
import { STATUS_LABELS, fmt, fmtDate } from '@/lib/status'

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-3 last:border-0">
      <dt className="text-sm uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-navy">{value}</dd>
    </div>
  )
}

function Notice({ text }: { text: string }) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-border bg-white px-6 py-10 text-center text-sm text-muted-foreground">
      {text}
    </div>
  )
}

export async function ShipmentResult({ trackingNumber }: { trackingNumber: string }) {
  const tn = trackingNumber.trim().toUpperCase()
  let shipment
  let events: { id: string; status: string; location: string; description: string | null; created_at: Date }[] = []
  try {
    if (/^VGL-\d{7}$/.test(tn)) {
      ;[shipment] = await q('select * from shipments where tracking_number=$1', [tn])
      if (shipment)
        events = await q('select id, status, location, description, created_at from shipment_events where shipment_id=$1 order by created_at desc', [shipment.id])
    }
  } catch {
    return <Notice text="Tracking is temporarily unavailable. Please try again shortly." />
  }
  if (!shipment)
    return (
      <Notice text="We couldn't find a shipment with that tracking number. Check the number and try again." />
    )

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr]">
      <div className="rounded-lg border border-border bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy">Shipment Details</h2>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            {STATUS_LABELS[shipment.status]}
          </span>
        </div>
        <dl className="mt-4">
          <DetailRow label="Tracking Number" value={shipment.tracking_number} />
          <DetailRow label="Current Location" value={shipment.current_location ?? '—'} />
          <DetailRow label="Origin" value={shipment.origin} />
          <DetailRow label="Destination" value={shipment.destination} />
          <DetailRow label="Shipment Type" value={shipment.method} />
          <DetailRow label="Weight" value={shipment.weight ?? '—'} />
          <DetailRow
            label="Estimated Delivery"
            value={shipment.eta ? fmtDate(shipment.eta) : '—'}
          />
        </dl>
      </div>

      <div className="space-y-8">
        <div className="rounded-lg border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-navy">Location</h2>
          <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-md border border-border bg-slate-50">
            <iframe
              title="Shipment location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(shipment.current_location || shipment.destination)}&output=embed`}
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-sm text-navy">
            {shipment.origin} → <strong>{shipment.current_location ?? '—'}</strong> → {shipment.destination}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-navy">Shipment Timeline</h2>
          <ol className="mt-6 space-y-6">
            {events.map((e, i) => (
              <li key={e.id} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <span className={`flex size-8 items-center justify-center rounded-full ${i === 0 ? 'bg-navy text-gold' : 'bg-navy/5 text-navy'}`}>
                    <MapPin className="size-4" />
                  </span>
                  {i < events.length - 1 && <span className="mt-1 w-px flex-1 bg-navy/10" aria-hidden />}
                </div>
                <div className="pb-1">
                  <p className="text-sm text-muted-foreground">{fmt(e.created_at)}</p>
                  <p className="mt-0.5 font-medium text-navy">{STATUS_LABELS[e.status]}</p>
                  <p className="text-sm text-muted-foreground">{e.location}{e.description ? ` · ${e.description}` : ''}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
