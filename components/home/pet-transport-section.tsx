import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'

const photos = [
  {
    src: '/images/photo/pet-crates.jpg',
    alt: 'Secure travel crates with water bottles, loaded for transport',
    label: 'Secure crates',
  },
  {
    src: '/images/photo/pet-carriers.jpg',
    alt: 'Rows of travel crates lined up and ready for departure',
    label: 'Ready for departure',
  },
]

const points = [
  {
    title: 'Ventilated crates',
    body: 'Secure crates in the right size, from cats to large dogs.',
  },
  {
    title: 'Paperwork and handover',
    body: 'We prepare health certificates and customs documents, and keep you updated until your pet is handed over.',
  },
]

export function PetTransportSection() {
  return (
    <section className="border-t border-border bg-paper">
      <div className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Pet Transport"
          title="Moving a pet? We sort out the crate and the paperwork."
          description="Each animal travels in a ventilated crate sized for it, and one coordinator follows the trip from pickup to handover."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6">
          {photos.map((p) => (
            <figure
              key={p.src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg bg-navy-dark"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                quality={85}
                sizes="(min-width: 1280px) 600px, (min-width: 640px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent"
                aria-hidden
              />
              <figcaption className="eyebrow absolute bottom-5 left-5 text-white">
                {p.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <ul className="mt-14 grid border-t border-border sm:grid-cols-2">
          {points.map((p, i) => (
            <li
              key={p.title}
              className="border-b border-border py-8 sm:border-b-0 sm:border-l sm:px-8 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="text-sm font-semibold tracking-widest text-sky-deep">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-xl font-medium text-ink">{p.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
