import { q } from '@/lib/db'
import { login, setupAdmin } from '../actions'

export const dynamic = 'force-dynamic'

const field =
  'h-11 w-full rounded-lg border border-navy/15 bg-white px-3 text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-sky/50'
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
    <main className="mx-auto flex min-h-[70vh] max-w-sm items-center px-4 py-16">
      <form action={first ? setupAdmin : login} className="w-full space-y-4 rounded-2xl border border-navy/10 bg-white p-6">
        <h1 className="text-xl font-semibold text-navy">{first ? 'Create admin account' : 'Admin Login'}</h1>
        <input name="email" type="email" required placeholder="Email" className={field} autoComplete="username" />
        <input name="password" type="password" required placeholder={first ? 'Password (10+ characters)' : 'Password'} className={field} autoComplete={first ? 'new-password' : 'current-password'} />
        {first && <input name="key" type="password" required placeholder="Setup key (ADMIN_SETUP_KEY)" className={field} />}
        {error && <p className="text-sm text-red-600">{msgs[error] ?? 'Something went wrong.'}</p>}
        <button className="h-11 w-full rounded-lg bg-gold font-semibold text-navy-dark hover:bg-gold-dark">
          {first ? 'Create account' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
