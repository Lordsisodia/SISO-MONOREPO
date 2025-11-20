"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface CountdownProps {
  endDate: Date
  startDate?: Date
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Lightweight, dependency-free rolling number fallback
// This mimics an upward scrolling change per tick.
function RollingValue({ value, pad = 2 }: { value: number; pad?: number }) {
  const display = useMemo(() => value.toString().padStart(pad, "0"), [value, pad])
  return (
    <div className="flex gap-0.5 leading-none">
      {display.split("").map((ch, idx) => (
        <div key={`${idx}-${ch}`} className="relative w-[0.8em] h-[1.2em] overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={ch}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-0 text-center"
              style={{ lineHeight: "1.2em" }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default function AnimatedNumberCountdown({ endDate, startDate, className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = startDate ? new Date(startDate) : new Date()
      const end = new Date(endDate)
      const diff = end.getTime() - start.getTime()

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / 1000 / 60) % 60)
        const seconds = Math.floor((diff / 1000) % 60)
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    intervalRef.current = window.setInterval(calculateTimeLeft, 1000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [endDate, startDate])

  return (
    <div className={`flex items-center justify-center gap-4 ${className || ""}`}>
      <div className="flex flex-col items-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
          <RollingValue value={timeLeft.days} pad={Math.max(2, timeLeft.days.toString().length)} />
        </div>
        <span className="text-sm text-gray-500">Days</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
          <RollingValue value={timeLeft.hours} />
        </div>
        <span className="text-sm text-gray-500">Hours</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
          <RollingValue value={timeLeft.minutes} />
        </div>
        <span className="text-sm text-gray-500">Minutes</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
          <RollingValue value={timeLeft.seconds} />
        </div>
        <span className="text-sm text-gray-500">Seconds</span>
      </div>
    </div>
  )
}
