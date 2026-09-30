'use client'

import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

export function Barcode({ value }: { value: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (ref.current) JsBarcode(ref.current, value, { format: 'CODE128', height: 60, width: 2, displayValue: true })
  }, [value])
  return <svg ref={ref} />
}

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy-dark print:hidden">
      Print / Save as PDF
    </button>
  )
}
