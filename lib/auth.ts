import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHmac, timingSafeEqual } from 'crypto'

const NAME = 'vgl_session'

function sign(v: string) {
  const s = process.env.AUTH_SECRET
  if (!s || s.length < 32) throw new Error('AUTH_SECRET must be set (32+ chars)')
  return createHmac('sha256', s).update(v).digest('hex')
}

export async function createSession(userId: string) {
  const exp = Date.now() + 7 * 24 * 3600 * 1000
  const v = `${userId}.${exp}`
  ;(await cookies()).set(NAME, `${v}.${sign(v)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(exp),
  })
}

export async function getAdminId() {
  const c = (await cookies()).get(NAME)?.value
  if (!c) return null
  const [id, exp, sig] = c.split('.')
  if (!id || !exp || !sig) return null
  const good = sign(`${id}.${exp}`)
  if (sig.length !== good.length) return null
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null
  return Number(exp) > Date.now() ? id : null
}

export async function requireAdmin() {
  const id = await getAdminId()
  if (!id) redirect('/admin/login')
  return id
}

export async function destroySession() {
  ;(await cookies()).delete(NAME)
}
