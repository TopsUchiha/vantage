import { CountUp } from '@/components/count-up'
import { stats } from '@/lib/site'

// '99.7%' -> { to: 99.7, decimals: 1, suffix: '%' }
function parseStat(value: string) {
  const m = value.match(/^(\d+(?:\.(\d+))?)(.*)$/)
  return m ? { to: parseFloat(m[1]), decimals: m[2]?.length ?? 0, suffix: m[3] } : { to: 0, decimals: 0, suffix: value }
}

export function GlobalReachSection() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="pointer-events-none absolute -top-32 -right-24 size-[26rem] rounded-full bg-sky/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -left-24 size-[24rem] rounded-full bg-sky/15 blur-3xl" aria-hidden />

      <div className="container-page relative py-20 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow pt-3 text-sky-deep lg:col-span-4">Who we are</p>
          <p className="font-display text-3xl leading-[1.15] font-semibold tracking-tight text-navy text-pretty sm:text-4xl lg:col-span-8 lg:text-[2.75rem]">
            We move freight for businesses that can&apos;t afford to wait. We keep handovers short and clear, and show
            you where the shipment is at every step.
          </p>
        </div>

        <dl className="mt-16 grid gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {[...stats, { value: '24/7', label: 'Operations desk' }].map((stat) => {
            const { to, decimals, suffix } = parseStat(stat.value)
            return (
              <div key={stat.label} className="flex flex-col-reverse gap-2">
                <dt className="text-base font-medium text-muted-foreground">{stat.label}</dt>
                <dd className="font-display text-5xl font-semibold tracking-tight text-navy sm:text-6xl">
                  <CountUp to={to} decimals={decimals} suffix={suffix} suffixClassName="text-sky-deep" />
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
