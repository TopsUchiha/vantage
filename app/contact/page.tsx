import type { Metadata } from 'next'
import { Mail, Clock } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { ContactForm } from '@/components/contact/contact-form'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Vantage Logistics to ask a question or request a quote.',
}

const details = [
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Monday to Friday, 8:00 AM to 6:00 PM',
  },
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact Us"
        title="Tell us what you're shipping."
        description="Ask a question or request a quote. We reply by email, usually within one business day."
        image="/images/photo/distribution-hub.jpg"
        imageAlt="Aerial view of a distribution hub with trucks at the loading bays"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow text-muted-foreground">
                Get in touch
              </p>
              <h2 className="mt-3 text-3xl font-medium text-ink text-balance">
                Send us a message
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Use the form or email us directly. We reply to every message.
              </p>

              <ul className="mt-10 space-y-6">
                {details.map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-navy">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-0.5 block text-base text-muted-foreground transition-colors hover:text-navy"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-base text-muted-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
