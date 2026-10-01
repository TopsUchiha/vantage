export const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PICKED_UP: 'Picked Up',
  PROCESSING: 'Processing',
  IN_TRANSIT: 'In Transit',
  AT_FACILITY: 'At Facility',
  CUSTOMS: 'Customs Clearance',
  ON_HOLD: 'On Hold',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
}

export const STATUSES = Object.keys(STATUS_LABELS)

export const fmt = (d: Date) =>
  d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }) + ' UTC'

export const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' })

// Land / Water / Air, worked out from the shipping method chosen by the admin
export const shippingMode = (method: string) =>
  /air/i.test(method) ? 'Air' : /ocean|sea|water/i.test(method) ? 'Water' : /road|land|domestic|truck/i.test(method) ? 'Land' : method
