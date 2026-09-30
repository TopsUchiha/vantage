import Link from 'next/link'
import { q } from '@/lib/db'
import { STATUSES, STATUS_LABELS, fmt } from '@/lib/status'
import { createShipment } from '../actions'

const field =
  'h-10 w-full rounded-lg border border-navy/15 bg-white px-3 text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-sky/50'
const PAGE = 20

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string; error?: string }>
}) {
  const sp = await searchParams
  const term = sp.q?.trim() ?? ''
  const status = STATUSES.includes(sp.status ?? '') ? sp.status! : ''
  const page = Math.max(1, parseInt(sp.page ?? '1') || 1)

  const params: unknown[] = []
  const where: string[] = []
  if (term) {
    params.push(`%${term}%`)
    where.push(
      `(tracking_number ilike $1 or sender_name ilike $1 or receiver_name ilike $1 or sender_email ilike $1 or receiver_email ilike $1 or sender_phone ilike $1 or receiver_phone ilike $1 or origin ilike $1 or destination ilike $1)`,
    )
  }
  if (status) {
    params.push(status)
    where.push(`status = $${params.length}`)
  }
  const w = where.length ? `where ${where.join(' and ')}` : ''

  const [counts, [{ n: newMsgs }], [{ n: total }], rows] = await Promise.all([
    q('select status, count(*)::int n from shipments group by status'),
    q(`select count(*)::int n from contact_messages where status='NEW'`),
    q(`select count(*)::int n from shipments ${w}`, params),
    q(
      `select id, tracking_number, receiver_name, origin, destination, status, current_location, eta, created_at
       from shipments ${w} order by created_at desc limit ${PAGE} offset ${(page - 1) * PAGE}`,
      params,
    ),
  ])
  const by = (st: string) => counts.find((c) => c.status === st)?.n ?? 0
  const all = counts.reduce((a, c) => a + c.n, 0)
  const pages = Math.max(1, Math.ceil(total / PAGE))
  const link = (p: number) =>
    `/admin?${new URLSearchParams({ ...(term && { q: term }), ...(status && { status }), page: String(p) })}`

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['Total', all], ['In transit', by('IN_TRANSIT')], ['Delivered', by('DELIVERED')], ['Pending', by('PENDING')],
          ['On hold', by('ON_HOLD')], ['Cancelled', by('CANCELLED')], ['New messages', newMsgs],
        ].map(([l, n]) => (
          <div key={l} className="rounded-xl border border-navy/10 bg-white p-4">
            <p className="text-xs uppercase text-muted-foreground">{l}</p>
            <p className="text-2xl font-semibold text-navy">{n}</p>
          </div>
        ))}
      </div>

      <section>
        <form className="mb-3 flex flex-col gap-2 sm:flex-row">
          <input name="q" defaultValue={term} placeholder="Search tracking #, name, email, phone, city" className={field} />
          <select name="status" defaultValue={status} className={field + ' sm:w-48'}>
            <option value="">All statuses</option>
            {STATUSES.map((k) => <option key={k} value={k}>{STATUS_LABELS[k]}</option>)}
          </select>
          <button className="h-10 rounded-lg bg-navy px-4 text-sm font-semibold text-white">Search</button>
        </form>
        <div className="overflow-x-auto rounded-xl border border-navy/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy/5 text-xs uppercase text-muted-foreground">
              <tr>{['Tracking #', 'Receiver', 'Route', 'Status', 'Location', 'ETA', 'Created', ''].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-t border-navy/10">
                  <td className="px-4 py-3 font-medium">
                    <Link href={`/admin/shipments/${s.id}`} className="text-navy underline-offset-4 hover:underline">{s.tracking_number}</Link>
                  </td>
                  <td className="px-4 py-3">{s.receiver_name}</td>
                  <td className="px-4 py-3">{s.origin} → {s.destination}</td>
                  <td className="px-4 py-3">{STATUS_LABELS[s.status]}</td>
                  <td className="px-4 py-3">{s.current_location ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{s.eta ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{fmt(s.created_at)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link href={`/admin/shipments/${s.id}/receipt`} className="text-navy underline-offset-4 hover:underline">Receipt</Link>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No shipments found</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-navy">
          <span>Page {page} of {pages} · {total} shipments</span>
          <span className="flex gap-4">
            {page > 1 && <Link href={link(page - 1)} className="underline">Previous</Link>}
            {page < pages && <Link href={link(page + 1)} className="underline">Next</Link>}
          </span>
        </div>
      </section>

      <section className="rounded-2xl border border-navy/10 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-navy">Create Shipment</h2>
        {sp.error && <p className="mb-3 text-sm text-red-600">Fill in all required fields (*).</p>}
        <form action={createShipment} className="grid gap-3 sm:grid-cols-2">
          <input name="senderName" required placeholder="Sender name *" className={field} />
          <input name="senderPhone" placeholder="Sender phone" className={field} />
          <input name="senderEmail" type="email" placeholder="Sender email" className={field} />
          <input name="senderAddress" placeholder="Sender address" className={field} />
          <input name="receiverName" required placeholder="Receiver name *" className={field} />
          <input name="receiverPhone" placeholder="Receiver phone" className={field} />
          <input name="receiverEmail" type="email" placeholder="Receiver email" className={field} />
          <input name="receiverAddress" placeholder="Receiver address" className={field} />
          <input name="origin" required placeholder="Origin (city, country) *" className={field} />
          <input name="destination" required placeholder="Destination (city, country) *" className={field} />
          <select name="method" required defaultValue="" className={field}>
            <option value="" disabled>Shipping method *</option>
            <option>Air Freight</option><option>Ocean Freight</option><option>Road / Domestic</option>
          </select>
          <input name="weight" placeholder="Weight (e.g. 25 kg)" className={field} />
          <input name="eta" type="date" className={field} />
          <input name="description" placeholder="Description" className={field} />
          <p className="text-sm font-semibold text-navy sm:col-span-2">Package details (optional, up to 3 rows)</p>
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-3 gap-2 sm:col-span-2 sm:grid-cols-7">
              <input name={`pkgQty${i}`} placeholder="Qty" className={field} />
              <input name={`pkgType${i}`} placeholder="Piece type" className={field} />
              <input name={`pkgDesc${i}`} placeholder="Description" className={field} />
              <input name={`pkgL${i}`} placeholder="L (cm)" className={field} />
              <input name={`pkgW${i}`} placeholder="W (cm)" className={field} />
              <input name={`pkgH${i}`} placeholder="H (cm)" className={field} />
              <input name={`pkgKg${i}`} placeholder="Weight (kg)" className={field} />
            </div>
          ))}
          <button className="h-10 rounded-lg bg-gold font-semibold text-navy-dark hover:bg-gold-dark sm:col-span-2">Create shipment</button>
        </form>
      </section>
    </div>
  )
}
