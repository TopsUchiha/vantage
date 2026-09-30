import Link from 'next/link'
import { notFound } from 'next/navigation'
import { q, isId } from '@/lib/db'
import { GoogleMap } from '@/components/google-map'
import { STATUSES, STATUS_LABELS, fmt } from '@/lib/status'
import { addEvent, deleteShipment } from '../../../actions'

const field =
  'h-10 w-full rounded-lg border border-navy/15 bg-white px-3 text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-sky/50'

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
  const [s] = await q('select * from shipments where id=$1', [id])
  if (!s) notFound()
  const events = await q('select * from shipment_events where shipment_id=$1 order by created_at desc', [id])

  const rows: [string, string | null][] = [
    ['Status', STATUS_LABELS[s.status]],
    ['Method', s.method],
    ['Weight', s.weight],
    ['Sender', [s.sender_name, s.sender_phone, s.sender_email, s.sender_address].filter(Boolean).join(' · ')],
    ['Receiver', [s.receiver_name, s.receiver_phone, s.receiver_email, s.receiver_address].filter(Boolean).join(' · ')],
    ['Route', `${s.origin} → ${s.destination}`],
    ['Current location', s.current_location],
    ['ETA', s.eta],
    ['Description', s.description],
  ]

  return (
    <div className="space-y-8">
      <Link href="/admin" className="text-sm text-navy underline-offset-4 hover:underline">← All shipments</Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-navy">{s.tracking_number}</h1>
        <Link href={`/admin/shipments/${s.id}/receipt`} className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white">Print receipt</Link>
      </div>

      <dl className="rounded-2xl border border-navy/10 bg-white p-6">
        {rows.map(([k, v]) => (
          <div key={k} className="border-b border-navy/10 py-2 last:border-0">
            <dt className="text-xs uppercase text-muted-foreground">{k}</dt>
            <dd className="text-sm font-medium text-navy">{v || '—'}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-2xl border border-navy/10 bg-white p-6">
        <h2 className="mb-3 text-lg font-semibold text-navy">Location</h2>
        <GoogleMap query={s.current_location || s.destination} />
      </div>

      <form action={addEvent} className="space-y-3 rounded-2xl border border-navy/10 bg-white p-6">
        <input type="hidden" name="id" value={s.id} />
        <h2 className="text-lg font-semibold text-navy">Update status / location</h2>
        <p className="text-xs text-muted-foreground">The location is placed on the map automatically. Use a city and country, e.g. &quot;Dubai, UAE&quot;.</p>
        {error && <p className="text-sm text-red-600">Status and location are required.</p>}
        <select name="status" defaultValue={s.status} className={field}>
          {STATUSES.map((k) => <option key={k} value={k}>{STATUS_LABELS[k]}</option>)}
        </select>
        <input name="location" required defaultValue={s.current_location ?? ''} placeholder="Location *" className={field} />
        <input name="description" placeholder="Note (shown to customer)" className={field} />
        <button className="h-10 w-full rounded-lg bg-gold font-semibold text-navy-dark hover:bg-gold-dark">Save update</button>
      </form>

      <section className="rounded-2xl border border-navy/10 bg-white p-6">
        <h2 className="mb-3 text-lg font-semibold text-navy">History</h2>
        <ul className="space-y-3 text-sm">
          {events.map((e) => (
            <li key={e.id}>
              <p className="text-xs text-muted-foreground">{fmt(e.created_at)}</p>
              <p className="font-medium text-navy">{STATUS_LABELS[e.status]} · {e.location}</p>
              {e.description && <p className="text-muted-foreground">{e.description}</p>}
            </li>
          ))}
        </ul>
      </section>

      <form action={deleteShipment}>
        <input type="hidden" name="id" value={s.id} />
        <button className="text-sm font-medium text-red-600 underline-offset-4 hover:underline">Delete this shipment</button>
      </form>
    </div>
  )
}
