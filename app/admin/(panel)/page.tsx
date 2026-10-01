import Link from 'next/link'
import { q } from '@/lib/db'
import { newMessageCount } from '@/lib/admin-data'
import { STATUSES, STATUS_LABELS, fmt } from '@/lib/status'
import { ADMIN_BASE } from '@/lib/admin-path'
import { cn } from '@/lib/utils'
import { ui, StatusBadge } from '@/components/admin/ui'
import { createShipment } from '../actions'

const field = ui.input
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

  const [counts, newMsgs, [{ n: total }], rows] = await Promise.all([
    q('select status, count(*)::int n from shipments group by status'),
    newMessageCount(),
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
    `${ADMIN_BASE}?${new URLSearchParams({ ...(term && { q: term }), ...(status && { status }), page: String(p) })}`

  const tiles: [string, number, string][] = [
    ['Total', all, 'text-white'],
    ['In transit', by('IN_TRANSIT'), 'text-sky'],
    ['Delivered', by('DELIVERED'), 'text-gold'],
    ['Pending', by('PENDING'), 'text-white'],
    ['On hold', by('ON_HOLD'), 'text-orange-300'],
    ['Cancelled', by('CANCELLED'), 'text-red-300'],
    ['New messages', newMsgs, 'text-gold'],
  ]

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {tiles.map(([l, n, tone]) => (
          <div
            key={l}
            className={`rounded-2xl border bg-white/[0.04] p-4 backdrop-blur ${l === 'New messages' && n > 0 ? 'border-gold/40' : 'border-white/10'}`}
          >
            <p className="text-[13px] font-semibold uppercase tracking-wider text-white/55">{l}</p>
            <p className={`mt-2 text-3xl font-semibold ${tone}`}>{n}</p>
          </div>
        ))}
      </div>

      <section>
        <form className="mb-4 flex flex-col gap-3 sm:flex-row">
          <input name="q" defaultValue={term} placeholder="Search tracking #, name, email, phone, city" className={field} />
          <select name="status" defaultValue={status} className={field + ' sm:w-56'}>
            <option value="">All statuses</option>
            {STATUSES.map((k) => <option key={k} value={k}>{STATUS_LABELS[k]}</option>)}
          </select>
          <button className={ui.primary}>Search</button>
        </form>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-white/[0.06] text-[13px] uppercase tracking-wider text-white/60">
              <tr>{['Tracking #', 'Receiver', 'Route', 'Status', 'Location', 'ETA', 'Created', ''].map((h) => <th key={h} className="px-4 py-3.5 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-t border-white/10 transition-colors hover:bg-white/[0.04]">
                  <td className="px-4 py-3.5 font-semibold whitespace-nowrap">
                    <Link href={`${ADMIN_BASE}/shipments/${s.id}`} className="text-gold underline-offset-4 hover:underline">{s.tracking_number}</Link>
                  </td>
                  <td className="px-4 py-3.5">{s.receiver_name}</td>
                  <td className="px-4 py-3.5 text-white/75">{s.origin} → {s.destination}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3.5 text-white/75">{s.current_location ?? '—'}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-white/75">{s.eta ?? '—'}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-white/75">{fmt(s.created_at)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <Link href={`${ADMIN_BASE}/shipments/${s.id}/receipt`} className="text-sky underline-offset-4 hover:underline">Receipt</Link>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={8} className="px-4 py-10 text-center text-white/60">No shipments found</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[15px] text-white/70">
          <span>Page {page} of {pages} · {total} shipments</span>
          <span className="flex gap-2">
            {page > 1 && <Link href={link(page - 1)} className={ui.chip}>Previous</Link>}
            {page < pages && <Link href={link(page + 1)} className={ui.chip}>Next</Link>}
          </span>
        </div>
      </section>

      <section className={ui.card}>
        <h2 className={`${ui.h2} mb-5`}>Create shipment</h2>
        {sp.error && <p className="mb-4 text-base text-red-300">Fill in all required fields (*).</p>}
        <form action={createShipment} className="grid gap-4 sm:grid-cols-2">
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
          <input name="product" placeholder="Product (what is being shipped)" className={field} />
          <input name="quantity" placeholder="Quantity (e.g. 3 boxes)" className={field} />
          <input name="totalFreight" placeholder="Total freight (e.g. $1,250.00)" className={field} />
          <textarea name="comment" rows={3} placeholder="Comment (shown to the customer)" className={cn(field, 'h-auto min-h-24 py-3 sm:col-span-2')} />
          <p className={`${ui.label} mt-2 sm:col-span-2`}>Package details (optional, up to 3 rows)</p>
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-3 gap-3 sm:col-span-2 sm:grid-cols-7">
              <input name={`pkgQty${i}`} placeholder="Qty" className={field} />
              <input name={`pkgType${i}`} placeholder="Piece type" className={field} />
              <input name={`pkgDesc${i}`} placeholder="Description" className={field} />
              <input name={`pkgL${i}`} placeholder="L (cm)" className={field} />
              <input name={`pkgW${i}`} placeholder="W (cm)" className={field} />
              <input name={`pkgH${i}`} placeholder="H (cm)" className={field} />
              <input name={`pkgKg${i}`} placeholder="Weight (kg)" className={field} />
            </div>
          ))}
          <button className={`${ui.primary} mt-2 sm:col-span-2`}>Create shipment</button>
        </form>
      </section>
    </div>
  )
}
