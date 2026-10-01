// Public URL of the admin panel. Set ADMIN_PATH in .env.local / Vercel to something only you know,
// e.g. ADMIN_PATH=vantage/control/panel-k7q2x9. Direct requests to /admin return a 404.
const raw = (process.env.ADMIN_PATH || 'vantage/control/panel').replace(/^\/+|\/+$/g, '')
export const ADMIN_BASE = /^[A-Za-z0-9/_-]+$/.test(raw) ? `/${raw}` : '/vantage/control/panel'
