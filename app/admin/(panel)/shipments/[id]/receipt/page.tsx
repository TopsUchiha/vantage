import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { q, isId } from '@/lib/db'
import { Barcode, PrintButton } from '@/components/admin/receipt-tools'
import { ADMIN_BASE } from '@/lib/admin-path'
import { ui } from '@/components/admin/ui'

type Pkg = { qty: string; type: string; description: string; length: string; width: string; height: string; weight: string }

const n = (v: string) => parseFloat(v) || 0
const round = (v: number) => (Math.round(v * 100) / 100).toString()

function Details({ title, rows }: { title: string; rows: [string, string | null][] }) {
  return (
    <section className="mt-6">
      <h2 className="border-b border-navy/15 pb-1 text-sm font-bold text-navy">{title}</h2>
      <dl className="mt-2 space-y-1 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <dt className="w-36 shrink-0 text-muted-foreground">{k}:</dt>
            <dd className="font-medium text-navy">{v || '—'}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default async function Receipt({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!isId(id)) notFound()
  const [s] = await q('select * from shipments where id=$1', [id])
  if (!s) notFound()
  const pkgs: Pkg[] = s.packages ?? []

  // volumetric weight (kg) = L x W x H / 5000 per piece; volume in m³
  const totals = pkgs.reduce(
    (t, p) => {
      const qty = n(p.qty) || 1
      const cm3 = n(p.length) * n(p.width) * n(p.height) * qty
      return { vol: t.vol + cm3 / 1_000_000, volWeight: t.volWeight + cm3 / 5000, weight: t.weight + n(p.weight) * qty }
    },
    { vol: 0, volWeight: 0, weight: 0 },
  )

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex justify-between print:hidden">
        <Link href={`${ADMIN_BASE}/shipments/${id}`} className={ui.secondary}>← Back</Link>
        <PrintButton />
      </div>

      <div className="rounded-2xl border border-navy/15 bg-white p-8 text-navy shadow-2xl shadow-black/30 print:border-0 print:p-0 print:shadow-none">
        <div className="flex flex-col items-center text-center">
          <Image src="/vantage-logo.webp" alt="Vantage Logistics" width={160} height={87} />
          <p className="mt-2 text-sm font-medium text-navy">Shipment receipt</p>
          <div className="mt-4"><Barcode value={s.tracking_number} /></div>
        </div>

        <Details
          title="SHIPPER DETAILS"
          rows={[['Shipper Name', s.sender_name], ['Phone Number', s.sender_phone], ['Address', s.sender_address], ['Email', s.sender_email]]}
        />
        <Details
          title="RECEIVER DETAILS"
          rows={[['Receiver Name', s.receiver_name], ['Phone Number', s.receiver_phone], ['Address', s.receiver_address], ['Email', s.receiver_email]]}
        />

        <section className="mt-6">
          <h2 className="border-b border-navy/15 pb-1 text-sm font-bold text-navy">PACKAGE DETAILS</h2>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border border-navy/15 text-left text-sm">
              <thead className="bg-navy/5 text-xs uppercase text-navy">
                <tr>
                  {['Qty', 'Piece Type', 'Description', 'Length (cm)', 'Width (cm)', 'Height (cm)', 'Weight (kg)'].map((h) => (
                    <th key={h} className="border border-navy/15 px-2 py-2 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pkgs.length === 0 && (
                  <tr><td colSpan={7} className="px-2 py-4 text-center text-muted-foreground">No package details</td></tr>
                )}
                {pkgs.map((p, i) => (
                  <tr key={i}>
                    {[p.qty, p.type, p.description, p.length, p.width, p.height, p.weight].map((v, j) => (
                      <td key={j} className="border border-navy/15 px-2 py-2 text-navy">{v || '—'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="mt-4 space-y-1 text-sm">
            <div className="flex gap-2"><dt className="w-52 text-muted-foreground">Total Volumetric Weight:</dt><dd className="font-semibold text-navy">{round(totals.volWeight)} kg</dd></div>
            <div className="flex gap-2"><dt className="w-52 text-muted-foreground">Total Volume:</dt><dd className="font-semibold text-navy">{round(totals.vol)} m³</dd></div>
            <div className="flex gap-2"><dt className="w-52 text-muted-foreground">Total Actual Weight:</dt><dd className="font-semibold text-navy">{round(totals.weight)} kg</dd></div>
          </dl>
        </section>
      </div>
    </div>
  )
}
