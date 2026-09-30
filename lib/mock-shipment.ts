export type ShipmentStatus = 'In Transit' | 'Delivered' | 'Out for Delivery'

export type TimelineEvent = {
  date: string
  title: string
  location: string
}

export type Shipment = {
  trackingNumber: string
  status: ShipmentStatus
  currentLocation: string
  origin: string
  destination: string
  shipmentType: string
  weight: string
  estimatedDelivery: string
  timeline: TimelineEvent[]
}

/**
 * Frontend-only mock. Returns a representative shipment for any tracking number
 * so the UI can be demonstrated before a real backend is connected.
 */
export function getMockShipment(trackingNumber: string): Shipment {
  return {
    trackingNumber: trackingNumber.toUpperCase(),
    status: 'In Transit',
    currentLocation: 'New York, USA',
    origin: 'New York, USA',
    destination: 'Lagos, Nigeria',
    shipmentType: 'Ocean Freight',
    weight: '25 kg',
    estimatedDelivery: 'September 20, 2026',
    timeline: [
      {
        date: 'Sep 12, 2026 · 09:20 AM',
        title: 'Shipment Created',
        location: 'New York, USA',
      },
      {
        date: 'Sep 14, 2026 · 06:15 PM',
        title: 'Departed Origin Facility',
        location: 'New York, USA',
      },
      {
        date: 'Sep 18, 2026 · 10:42 AM',
        title: 'Arrived at Port',
        location: 'In Transit',
      },
      {
        date: 'Sep 20, 2026 · 08:00 AM',
        title: 'Out for Delivery',
        location: 'Lagos, Nigeria',
      },
    ],
  }
}
