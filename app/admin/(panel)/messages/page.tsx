import Link from 'next/link'
import { q } from '@/lib/db'
import { fmt } from '@/lib/status'
import { ADMIN_BASE } from '@/lib/admin-path'
import { ui, StatusBadge } from '@/components/admin/ui'
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
    <div className="space-y-5">
      <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link
            key={t}
            href={`${ADMIN_BASE}/messages?s=${t}`}
            className={`inline-flex h-10 items-center rounded-full px-5 text-[15px] font-medium transition-colors ${
              (f ?? 'ALL') === t ? 'bg-gold text-navy-dark' : 'border border-white/20 text-white/75 hover:bg-white/10'
            }`}
          >
            {t}
          </Link>
        ))}
      </div>
      {rows.map((m) => (
        <details key={m.id} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur open:bg-white/[0.06]">
          <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 text-[15px] marker:content-none">
            <span className="text-base font-semibold">{m.name}</span>
            <span className="text-white/70">{m.subject ?? 'Message'}</span>
            <span className="text-white/50">{fmt(m.created_at)}</span>
            <StatusBadge status={m.status} />
          </summary>
          <p className="mt-4 text-[15px] text-white/60">{m.email}{m.phone ? ` · ${m.phone}` : ''}</p>
          <p className="mt-2 text-base whitespace-pre-wrap text-white/90">{m.message}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <form action={setMessageStatus} className="flex flex-wrap gap-2">
              <input type="hidden" name="id" value={m.id} />
              {['READ', 'REPLIED', 'ARCHIVED'].map((st) => (
                <button key={st} name="status" value={st} className={ui.chip}>Mark {st.toLowerCase()}</button>
              ))}
            </form>
            <form action={deleteMessage}>
              <input type="hidden" name="id" value={m.id} />
              <button className="inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10">Delete</button>
            </form>
          </div>
        </details>
      ))}
      {rows.length === 0 && <p className="text-base text-white/60">No messages.</p>}
    </div>
  )
}
