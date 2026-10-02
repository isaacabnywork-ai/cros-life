import React from 'react'
import { useCountdown } from '../../hooks/useCountdown'

export default function Countdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown()

  if (isPast) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-white/10 text-white font-mono text-xs uppercase tracking-widest border border-white/20">
        Conference Underway
      </div>
    )
  }

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  return (
    <div className="inline-flex items-center gap-4 sm:gap-6 bg-brand-navy-deep/60 backdrop-blur-sm border border-brand-border-navy/80 px-4 sm:px-6 py-3 rounded-card">
      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-amber pr-2 border-r border-brand-border-navy hidden sm:block">
        Countdown
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {units.map((unit, idx) => (
          <div key={unit.label} className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-display font-bold text-lg sm:text-2xl text-white font-mono tracking-tight">
              {unit.value}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
              {unit.label}
            </span>
            {idx < units.length - 1 && (
              <span className="text-slate-600 pl-1 text-sm font-light select-none">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
