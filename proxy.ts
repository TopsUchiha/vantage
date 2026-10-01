import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_BASE } from '@/lib/admin-path'

// The real admin routes live under /admin, but they are only reachable through the secret ADMIN_BASE path.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === ADMIN_BASE || pathname.startsWith(ADMIN_BASE + '/')) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin' + pathname.slice(ADMIN_BASE.length)
    const res = NextResponse.rewrite(url)
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    res.headers.set('Cache-Control', 'no-store')
    return res
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.rewrite(new URL('/not-found-404', req.url)) // same 404 page as any unknown URL
  }
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'] }
