'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

const services = [
  'Air Freight',
  'Ocean Freight',
  'Domestic Transportation',
  'Warehousing',
  'Cargo Forwarding',
  'Customs Clearance',
  'E-commerce Fulfillment',
  'Other',
]

const fieldClass =
  'h-12 w-full rounded-lg border border-navy/15 bg-white px-3.5 text-base text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-sky/50'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      const body = Object.fromEntries(new FormData(e.currentTarget))
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : 'Could not send. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-border bg-white px-6 py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-7" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-navy">Message sent</h3>
        <p className="mt-2 max-w-sm text-base text-muted-foreground">
          Thanks, we got your message. We&apos;ll reply by email within one business day.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[15px] font-semibold text-navy underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[15px] font-medium text-navy">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[15px] font-medium text-navy">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-[15px] font-medium text-navy">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className="text-[15px] font-medium text-navy">
            Service of Interest
          </label>
          <select id="service" name="service" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-[15px] font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you shipping, from where, and to where?"
          className="w-full rounded-lg border border-navy/15 bg-white px-3.5 py-3 text-base text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-sky/50"
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-navy-dark shadow-[0_10px_28px_-10px_rgb(206_255_82/0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#dcff7d] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {sending ? 'Sending...' : 'Send Message'}
        <Send className="size-4" />
      </button>
    </form>
  )
}
