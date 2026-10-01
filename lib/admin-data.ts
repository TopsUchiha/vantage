import { cache } from 'react'
import { q } from '@/lib/db'

// cache() makes the layout and the page share one query per request
export const newMessageCount = cache(async () => {
  const [{ n }] = await q(`select count(*)::int n from contact_messages where status='NEW'`)
  return n as number
})
