'use client'

import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'
import { ui } from './ui'

export function Barcode({ value }: { value: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (ref.current) JsBarcode(ref.current, value, { format: 'CODE128', height: 60, width: 2, displayValue: true })
  }, [value])
  return <svg ref={ref} />
}

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className={ui.primary}>
      Print / Save as PDF
    </button>
  )
}
