import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'

const pillars = [
  {
    title: 'Live tracking page',
    body: 'Each pickup, handover and customs release is logged, and you can look it up with your tracking number.',
  },
  {
    title: 'Careful handling',
    body: 'We use vetted carriers and keep a record of who has your cargo at each step. Cargo insurance is available on request.',
  },
  {
    title: 'One account manager',
    body: 'One contact who knows your routes, with an operations team behind them around the clock.',
  },
  {
    title: 'Customs brokers',
    body: 'Licensed brokers check your documents early, so paperwork doesn\'t hold your shipment at the border.',
  },
]

export function WhyChooseSection() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-dark">
        <Image
          src="/images/photo/airport-apron.jpg"
          alt="Wide-body cargo aircraft on the apron at sunset"
          fill
          quality={85}
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent"
          aria-hidden
        />
        <div className="container-page flex min-h-[32rem] flex-col justify-end py-16 sm:min-h-[40rem] sm:py-20">
          <blockquote className="max-w-2xl">
            <p className="text-3xl font-medium leading-tight text-white text-balance sm:text-4xl">
              &ldquo;Most delays start with missing paperwork or a late handover. We check both before
              the shipment leaves.&rdquo;
            </p>
            <footer className="eyebrow mt-6 text-white/60">Vantage Operations</footer>
          </blockquote>
        </div>
      </section>

      <section className="bg-navy-dark text-white">
        <div className="container-page py-20 sm:py-28">
          <SectionHeading
            onDark
            eyebrow="Why Vantage"
            title="What you get with every shipment."
          />
          <ul className="mt-14 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className="border-b border-white/10 py-8 sm:pr-8 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <p className="text-sm font-semibold tracking-widest text-gold">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-xl font-medium">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-white/70">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
