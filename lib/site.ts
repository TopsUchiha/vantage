import {
  Plane,
  Ship,
  Truck,
  Warehouse,
  Globe2,
  ShieldCheck,
  PackageCheck,
  type LucideIcon,
} from 'lucide-react'

export const siteConfig = {
  name: 'Vantage Logistics',
  tagline: 'Air, ocean and road freight, warehousing and customs clearance from one team.',
  email: 'contact@vantagelogistics.com',
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Track Shipment', href: '/track' },
  { label: 'Contact', href: '/contact' },
]

export type Service = {
  slug: string
  title: string
  short: string
  description: string
  icon: LucideIcon
  image: string
}

export const services: Service[] = [
  {
    slug: 'air-freight',
    title: 'Air Freight',
    short: 'Air cargo for urgent shipments.',
    description:
      'Priority space with our airline partners for cargo that has to arrive fast. We handle the booking and paperwork and keep you updated until it lands.',
    icon: Plane,
    image: '/images/photo/air-freight.jpg',
  },
  {
    slug: 'ocean-freight',
    title: 'Ocean Freight',
    short: 'Sea freight for large and heavy cargo.',
    description:
      'Full container load (FCL) and less-than-container load (LCL) shipping for big, heavy or high-volume cargo, at competitive rates.',
    icon: Ship,
    image: '/images/photo/port-approach.jpg',
  },
  {
    slug: 'domestic-transportation',
    title: 'Domestic Transportation',
    short: 'Trucking between cities and regions.',
    description:
      'Trucking and ground distribution across regions and cities, with tracking updates and flexible scheduling for each delivery.',
    icon: Truck,
    image: '/images/photo/distribution-hub.jpg',
  },
  {
    slug: 'warehousing',
    title: 'Warehousing',
    short: 'Storage and inventory management.',
    description:
      'Secure warehouse space with inventory management, order fulfillment and distribution.',
    icon: Warehouse,
    image: '/images/photo/warehouse.jpg',
  },
  {
    slug: 'cargo-forwarding',
    title: 'Cargo Forwarding',
    short: 'One team coordinating your shipment door to door.',
    description:
      'We arrange every leg of the trip, from pickup at the origin to final delivery, so you deal with one contact instead of several carriers.',
    icon: Globe2,
    image: '/images/photo/terminal-aerial.jpg',
  },
  {
    slug: 'customs-clearance',
    title: 'Customs Clearance',
    short: 'Customs brokerage and paperwork.',
    description:
      'Our brokers prepare the documents, work out duties and check compliance before your cargo reaches the border.',
    icon: ShieldCheck,
    image: '/images/photo/customs.jpg',
  },
  {
    slug: 'ecommerce-fulfillment',
    title: 'E-commerce Fulfillment',
    short: 'Pick, pack and ship for online stores.',
    description:
      'We connect to your online store, pick and pack each order, and ship it out, so your customers get the right item on time.',
    icon: PackageCheck,
    image: '/images/photo/ecommerce.jpg',
  },
]

export const stats = [
  { value: '150+', label: 'Countries' },
  { value: '500+', label: 'Partners' },
  { value: '99.7%', label: 'On-Time Delivery' },
]
