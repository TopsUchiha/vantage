export type LegalSection = { title: string; body?: string[]; list?: string[] }

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <main>
      <section className="bg-navy-dark">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-white/60">Last updated: {updated}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="leading-relaxed text-navy/80">{intro}</p>
        {sections.map((s, i) => (
          <section key={s.title} className="mt-10">
            <h2 className="text-xl font-semibold text-navy">
              {i + 1}. {s.title}
            </h2>
            {s.body?.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-navy/80">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-navy/80">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  )
}
