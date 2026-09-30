import { stats } from '@/lib/site'

export function GlobalReachSection() {
  return (
    <section className="bg-paper">
      <div className="container-page py-20 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow text-muted-foreground lg:col-span-4">Who we are</p>
          <p className="text-2xl font-medium leading-snug text-ink text-pretty sm:text-3xl lg:col-span-8">
            We move freight for businesses that can&apos;t afford to wait. We keep handovers short and
            clear{' '}
            <span className="text-muted-foreground">
              and show you where the shipment is at every step.
            </span>
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t border-border sm:mt-20 lg:grid-cols-4">
          {[...stats, { value: '24/7', label: 'Operations desk' }].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse gap-3 border-border pt-6 pb-2 sm:pr-6 ${
                i % 2 === 1 ? 'border-l pl-6' : ''
              } ${i >= 1 ? 'lg:border-l lg:pl-6' : ''} ${i >= 2 ? 'max-lg:mt-8' : ''}`}
            >
              <dt className="text-base text-muted-foreground">{stat.label}</dt>
              <dd className="text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
