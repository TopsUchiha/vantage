// Dark background with soft colour glows, shared by the login page and the panel
export function AdminBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-clip bg-navy-dark text-white print:min-h-0 print:bg-white print:text-black">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-sky to-gold print:hidden" aria-hidden />
      <div className="pointer-events-none absolute -top-48 -right-40 -z-10 size-[34rem] rounded-full bg-sky/15 blur-3xl print:hidden" aria-hidden />
      <div className="pointer-events-none absolute -bottom-56 -left-44 -z-10 size-[34rem] rounded-full bg-gold/10 blur-3xl print:hidden" aria-hidden />
      {children}
    </div>
  )
}
