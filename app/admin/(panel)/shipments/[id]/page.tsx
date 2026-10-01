import Link from 'next/link'
import { notFound } from 'next/navigation'
import { q, isId } from '@/lib/db'
import { ADMIN_BASE } from '@/lib/admin-path'
import { ui, StatusBadge } from '@/components/admin/ui'
import { ShipmentMap } from '@/components/shipment-map-loader'
import { shipmentMapProps } from '@/lib/points'
import { cn } from '@/lib/utils'
import { STATUSES, STATUS_LABELS, fmt, shippingMode } from '@/lib/status'
import { addEvent, deleteShipment, updateShipmentInfo } from '../../../actions'

export default async function ShipmentAdmin({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams
  if (!isId(id)) notFound()
  const [[s], events] = await Promise.all([
    q('select * from shipments where id=$1', [id]),
    q('select * from shipment_events where shipment_id=$1 order by created_at desc', [id]),
  ])
  if (!s) notFound()

  const rows: [string, string | null, boolean?][] = [
    ['Method', s.method],
    ['Shipping mode', shippingMode(s.method)],
    ['Carrier reference no.', s.carrier_ref],
    ['Product', s.product],
    ['Quantity', s.quantity],
    ['Weight', s.weight],
    ['Total freight', s.total_freight],
    ['Route', `${s.origin} → ${s.destination}`],
    ['Current location', s.current_location],
    ['ETA', s.eta],
    ['Sender', [s.sender_name, s.sender_phone, s.sender_email, s.sender_address].filter(Boolean).join(' · '), true],
    ['Receiver', [s.receiver_name, s.receiver_phone, s.receiver_email, s.receiver_address].filter(Boolean).join(' · '), true],
    ['Description', s.description, true],
    ['Comment', s.comment, true],
  ]

  return (
    <div className="space-y-8">
      <Link href={ADMIN_BASE} className={ui.chip}>← All shipments</Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">{s.tracking_number}</h1>
          <StatusBadge status={s.status} />
        </div>
        <Link href={`${ADMIN_BASE}/shipments/${s.id}/receipt`} className={ui.secondary}>Print receipt</Link>
      </div>

      <dl className={`${ui.card} grid gap-x-8 gap-y-5 sm:grid-cols-2`}>
        {rows.map(([k, v, wide]) => (
          <div key={k} className={wide ? 'sm:col-span-2' : ''}>
            <dt className={ui.label}>{k}</dt>
            <dd className="mt-1 text-base font-medium">{v || '—'}</dd>
          </div>
        ))}
      </dl>

      <div className={ui.card}>
        <h2 className={`${ui.h2} mb-4`}>Location</h2>
        <ShipmentMap {...shipmentMapProps(s)} />
      </div>

      <form action={addEvent} className={`${ui.card} space-y-4`}>
        <input type="hidden" name="id" value={s.id} />
        <h2 className={ui.h2}>Update status / location</h2>
        <p className="text-[15px] text-white/60">The location is placed on the map automatically. Use a city and country, e.g. &quot;Dubai, UAE&quot;.</p>
        {error && <p className="text-base text-red-300">Status and location are required.</p>}
        <select name="status" defaultValue={s.status} className={ui.input}>
          {STATUSES.map((k) => <option key={k} value={k}>{STATUS_LABELS[k]}</option>)}
        </select>
        <input name="location" required defaultValue={s.current_location ?? ''} placeholder="Location *" className={ui.input} />
        <input name="description" placeholder="Note (shown to customer)" className={ui.input} />
        <button className={`${ui.primary} w-full`}>Save update</button>
      </form>

      <form action={updateShipmentInfo} className={`${ui.card} grid gap-4 sm:grid-cols-2`}>
        <input type="hidden" name="id" value={s.id} />
        <h2 className={`${ui.h2} sm:col-span-2`}>Edit shipment info</h2>
        <input name="product" defaultValue={s.product ?? ''} placeholder="Product" className={ui.input} />
        <input name="quantity" defaultValue={s.quantity ?? ''} placeholder="Quantity" className={ui.input} />
        <input name="totalFreight" defaultValue={s.total_freight ?? ''} placeholder="Total freight (e.g. $1,250.00)" className={ui.input} />
        <textarea name="comment" rows={3} defaultValue={s.comment ?? ''} placeholder="Comment (shown to the customer)" className={cn(ui.input, 'h-auto min-h-24 py-3 sm:col-span-2')} />
        <button className={`${ui.secondary} sm:col-span-2`}>Save info</button>
      </form>

      <section className={ui.card}>
        <h2 className={`${ui.h2} mb-5`}>History</h2>
        <ol className="relative space-y-6 border-l border-white/15 pl-6">
          {events.map((e) => (
            <li key={e.id} className="relative">
              <span className="absolute top-1.5 -left-[31px] size-3 rounded-full bg-gold ring-4 ring-navy-dark" aria-hidden />
              <p className="text-sm text-white/55">{fmt(e.created_at)}</p>
              <p className="mt-0.5 text-base font-medium">{STATUS_LABELS[e.status]} · {e.location}</p>
              {e.description && <p className="mt-1 text-base text-white/65">{e.description}</p>}
            </li>
          ))}
        </ol>
      </section>

      <form action={deleteShipment} className="flex justify-end">
        <input type="hidden" name="id" value={s.id} />
        <button className={ui.danger}>Delete this shipment</button>
      </form>
    </div>
  )
}
