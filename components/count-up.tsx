'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  to: number
  decimals?: number
  duration?: number
  suffix?: string
  suffixClassName?: string
  className?: string
}

// Counts from 0 to `to` every time it scrolls into view.
// The suffix (%, +, /7) travels with the number so there is never a gap while counting.
export function CountUp({
  to,
  decimals = 0,
  duration = 2000,
  suffix = '',
  suffixClassName,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const final = to.toFixed(decimals)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0

    const animate = () => {
      cancelAnimationFrame(raf)
      let start: number | undefined
      const tick = (now: number) => {
        start ??= now
        const p = Math.min((now - start) / duration, 1)
        setValue(to * (1 - Math.pow(1 - p, 4))) // ease out: fast at first, settles at the end
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
        } else {
          // reset when it leaves the screen so it counts again next time
          cancelAnimationFrame(raf)
          setValue(0)
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {final}
        {suffix}
      </span>
      {/* the invisible final value reserves the width so nothing jumps while counting */}
      <span className="relative inline-block" aria-hidden>
        <span className="invisible">
          {final}
          <span className={suffixClassName}>{suffix}</span>
        </span>
        <span className="absolute inset-y-0 left-0 whitespace-nowrap">
          {value.toFixed(decimals)}
          <span className={suffixClassName}>{suffix}</span>
        </span>
      </span>
    </span>
  )
}
