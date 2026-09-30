export function GoogleMap({ query }: { query: string }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-navy/10 bg-slate-50">
      <iframe
        title="Shipment location"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
