import { NextResponse } from 'next/server'
import { q } from '@/lib/db'

const hits = new Map<string, { n: number; t: number }>()

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const now = Date.now()
  const h = hits.get(ip)
  if (!h || now - h.t > 10 * 60_000) hits.set(ip, { n: 1, t: now })
  else if (++h.n > 5) return NextResponse.json({ error: 'Too many messages. Try again later.' }, { status: 429 })

  const b = await req.json().catch(() => null)
  const str = (k: string, max: number) => String(b?.[k] ?? '').trim().slice(0, max)
  const name = str('name', 120), email = str('email', 200), message = str('message', 5000)
  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return NextResponse.json({ error: 'Please fill in your name, a valid email and a message.' }, { status: 400 })
  try {
    await q('insert into contact_messages(name,email,phone,subject,message) values ($1,$2,$3,$4,$5)', [
      name, email, str('phone', 50) || null, str('service', 120) || null, message,
    ])
  } catch {
    return NextResponse.json({ error: 'Could not send your message right now.' }, { status: 503 })
  }
  return NextResponse.json({ ok: true })
}
