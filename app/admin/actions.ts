'use server'

import { randomInt } from 'crypto'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { q, isId } from '@/lib/db'
import { geocode } from '@/lib/geo'
import { STATUSES } from '@/lib/status'
import { createSession, destroySession, requireAdmin } from '@/lib/auth'

const s = (f: FormData, k: string) => String(f.get(k) ?? '').trim()
const opt = (f: FormData, k: string) => s(f, k) || null

const attempts = new Map<string, { n: number; t: number }>()
function tooMany(key: string) {
  const now = Date.now()
  const a = attempts.get(key)
  if (!a || now - a.t > 15 * 60_000) {
    attempts.set(key, { n: 1, t: now })
    return false
  }
  return ++a.n > 5
}

export async function setupAdmin(f: FormData) {
  const [{ c }] = await q('select count(*)::int c from admin_users')
  const key = process.env.ADMIN_SETUP_KEY
  if (c > 0 || !key || s(f, 'key') !== key || s(f, 'password').length < 10)
    redirect('/admin/login?error=setup')
  const [u] = await q('insert into admin_users(email, password_hash) values ($1,$2) returning id', [
    s(f, 'email').toLowerCase(),
    await bcrypt.hash(s(f, 'password'), 12),
  ])
  await createSession(u.id)
  redirect('/admin')
}

export async function login(f: FormData) {
  const email = s(f, 'email').toLowerCase()
  if (tooMany(email)) redirect('/admin/login?error=locked')
  const [u] = await q('select id, password_hash from admin_users where email=$1', [email])
  if (!u || !(await bcrypt.compare(s(f, 'password'), u.password_hash)))
    redirect('/admin/login?error=login')
  await createSession(u.id)
  redirect('/admin')
}

export async function logout() {
  await destroySession()
  redirect('/admin/login')
}

async function newTracking() {
  for (;;) {
    const n = `VGL-${randomInt(1000000, 10000000)}`
    if (!(await q('select 1 from shipments where tracking_number=$1', [n])).length) return n
  }
}

function parsePackages(f: FormData) {
  return [0, 1, 2]
    .map((i) => {
      const g = (k: string) => s(f, `pkg${k}${i}`)
      return { qty: g('Qty'), type: g('Type'), description: g('Desc'), length: g('L'), width: g('W'), height: g('H'), weight: g('Kg') }
    })
    .filter((p) => p.qty || p.type || p.description || p.length || p.width || p.height || p.weight)
}

export async function createShipment(f: FormData) {
  await requireAdmin()
  if (['senderName', 'receiverName', 'origin', 'destination', 'method'].some((k) => !s(f, k)))
    redirect('/admin?error=missing')
  const [o, d] = await Promise.all([geocode(s(f, 'origin')), geocode(s(f, 'destination'))])
  const [row] = await q(
    `insert into shipments (tracking_number, method, weight, description, eta,
      sender_name, sender_phone, sender_email, sender_address,
      receiver_name, receiver_phone, receiver_email, receiver_address,
      origin, origin_lat, origin_lng, destination, dest_lat, dest_lng,
      current_location, current_lat, current_lng, packages)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$14,$15,$16,$20)
     returning id`,
    [
      await newTracking(), s(f, 'method'), opt(f, 'weight'), opt(f, 'description'), opt(f, 'eta'),
      s(f, 'senderName'), opt(f, 'senderPhone'), opt(f, 'senderEmail'), opt(f, 'senderAddress'),
      s(f, 'receiverName'), opt(f, 'receiverPhone'), opt(f, 'receiverEmail'), opt(f, 'receiverAddress'),
      s(f, 'origin'), o?.lat ?? null, o?.lng ?? null,
      s(f, 'destination'), d?.lat ?? null, d?.lng ?? null,
      JSON.stringify(parsePackages(f)),
    ],
  )
  await q(
    `insert into shipment_events(shipment_id, status, location, description) values ($1,'PENDING',$2,'Shipment created')`,
    [row.id, s(f, 'origin')],
  )
  redirect(`/admin/shipments/${row.id}`)
}

export async function addEvent(f: FormData) {
  await requireAdmin()
  const id = s(f, 'id'), status = s(f, 'status'), location = s(f, 'location')
  if (!isId(id)) redirect('/admin')
  if (!STATUSES.includes(status) || !location) redirect(`/admin/shipments/${id}?error=invalid`)
  const g = await geocode(location)
  await q(
    `update shipments set status=$2, current_location=$3, current_lat=$4, current_lng=$5, updated_at=now() where id=$1`,
    [id, status, location, g?.lat ?? null, g?.lng ?? null],
  )
  await q(`insert into shipment_events(shipment_id, status, location, description) values ($1,$2,$3,$4)`, [
    id, status, location, opt(f, 'description'),
  ])
  redirect(`/admin/shipments/${id}`)
}

export async function deleteShipment(f: FormData) {
  await requireAdmin()
  if (isId(s(f, 'id'))) await q('delete from shipments where id=$1', [s(f, 'id')])
  redirect('/admin')
}

export async function setMessageStatus(f: FormData) {
  await requireAdmin()
  if (isId(s(f, 'id')) && ['NEW', 'READ', 'REPLIED', 'ARCHIVED'].includes(s(f, 'status')))
    await q('update contact_messages set status=$2 where id=$1', [s(f, 'id'), s(f, 'status')])
  redirect('/admin/messages')
}

export async function deleteMessage(f: FormData) {
  await requireAdmin()
  if (isId(s(f, 'id'))) await q('delete from contact_messages where id=$1', [s(f, 'id')])
  redirect('/admin/messages')
}
