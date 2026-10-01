// Shown instantly while the next admin page loads, so navigation never feels frozen
export default function Loading() {
  return (
    <div className="animate-pulse space-y-8" aria-busy="true" aria-label="Loading">
      <div className="h-9 w-56 rounded-xl bg-white/[0.08]" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl border border-white/10 bg-white/[0.04]" />
        ))}
      </div>
      <div className="h-12 rounded-xl bg-white/[0.06]" />
      <div className="h-72 rounded-2xl border border-white/10 bg-white/[0.03]" />
    </div>
  )
}
