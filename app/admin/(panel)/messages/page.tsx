import Link from 'next/link'
import { q } from '@/lib/db'
import { fmt } from '@/lib/status'
import { setMessageStatus, deleteMessage } from '../../actions'

const TABS = ['ALL', 'NEW', 'READ', 'REPLIED', 'ARCHIVED']

export default async function Messages({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { s } = await searchParams
  const f = TABS.includes(s ?? '') && s !== 'ALL' ? s : null
  const rows = await q(
    `select * from contact_messages ${f ? 'where status=$1' : ''} order by created_at desc limit 100`,
    f ? [f] : [],
  )
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm">
        {TABS.map((t) => (
          <Link key={t} href={`/admin/messages?s=${t}`} className={`rounded-full border px-3 py-1 ${(f ?? 'ALL') === t ? 'bg-navy text-white' : 'border-navy/15 text-navy'}`}>{t}</Link>
        ))}
      </div>
      {rows.map((m) => (
        <details key={m.id} className="rounded-xl border border-navy/10 bg-white p-4">
          <summary className="cursor-pointer text-sm text-navy">
            <span className="font-semibold">{m.name}</span> · {m.subject ?? 'Message'} · <span className="text-muted-foreground">{fmt(m.created_at)}</span>{' '}
            <span className="rounded bg-navy/5 px-2 py-0.5 text-xs">{m.status}</span>
          </summary>
          <p className="mt-3 text-sm text-muted-foreground">{m.email}{m.phone ? ` · ${m.phone}` : ''}</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-navy">{m.message}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <form action={setMessageStatus} className="flex gap-2">
              <input type="hidden" name="id" value={m.id} />
              {['READ', 'REPLIED', 'ARCHIVED'].map((st) => (
                <button key={st} name="status" value={st} className="rounded-lg border border-navy/15 px-3 py-1 text-xs text-navy">Mark {st.toLowerCase()}</button>
              ))}
            </form>
            <form action={deleteMessage}>
              <input type="hidden" name="id" value={m.id} />
              <button className="rounded-lg px-3 py-1 text-xs text-red-600">Delete</button>
            </form>
          </div>
        </details>
      ))}
      {rows.length === 0 && <p className="text-sm text-muted-foreground">No messages.</p>}
    </div>
  )
}
