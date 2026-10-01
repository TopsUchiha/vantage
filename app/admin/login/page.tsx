import Image from 'next/image'
import { q } from '@/lib/db'
import { ui } from '@/components/admin/ui'
import { login, setupAdmin } from '../actions'

export const dynamic = 'force-dynamic'

const msgs: Record<string, string> = {
  login: 'Invalid email or password.',
  locked: 'Too many attempts. Try again in 15 minutes.',
  setup: 'Setup failed. Check the setup key and use a password of 10+ characters.',
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  const [{ c }] = await q('select count(*)::int c from admin_users')
  const first = c === 0
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-16">
      <form action={first ? setupAdmin : login} className={`${ui.card} w-full space-y-5`}>
        <div className="flex flex-col items-center text-center">
          <Image src="/vantage-mark.png" alt="" width={267} height={265} className="size-12 brightness-0 invert" />
          <p className="eyebrow mt-4 text-gold">Control Panel</p>
          <h1 className="mt-2 text-2xl font-semibold">{first ? 'Create admin account' : 'Sign in'}</h1>
        </div>
        <input name="email" type="email" required placeholder="Email" className={ui.input} autoComplete="username" />
        <input
          name="password"
          type="password"
          required
          placeholder={first ? 'Password (10+ characters)' : 'Password'}
          className={ui.input}
          autoComplete={first ? 'new-password' : 'current-password'}
        />
        {first && <input name="key" type="password" required placeholder="Setup key (ADMIN_SETUP_KEY)" className={ui.input} />}
        {error && <p className="text-base text-red-300">{msgs[error] ?? 'Something went wrong.'}</p>}
        <button className={`${ui.primary} w-full`}>{first ? 'Create account' : 'Sign in'}</button>
      </form>
    </main>
  )
}
