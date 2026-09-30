import Image from 'next/image'
import Link from 'next/link'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  image: string
  imageAlt: string
  crumbs?: Crumb[]
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  crumbs,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-dark">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        quality={85}
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-dark via-navy-dark/60 to-navy-dark/40"
        aria-hidden
      />

      <div className="container-page flex min-h-[26rem] flex-col justify-end pt-32 pb-14 sm:min-h-[30rem] sm:pb-16">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="eyebrow flex flex-wrap items-center gap-2 text-white/50">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/80" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl text-4xl font-medium text-white text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 text-pretty sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
