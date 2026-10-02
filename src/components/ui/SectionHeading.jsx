import React from 'react'

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
  theme = 'light', // 'light' | 'dark'
  className = '',
}) {
  const isDark = theme === 'dark'

  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto max-w-3xl',
    split: 'text-left lg:max-w-2xl',
  }

  return (
    <div className={`space-y-3 ${alignClasses[align] || alignClasses.left} ${className}`}>
      {kicker && (
        <span
          className={`block text-[11px] font-bold uppercase tracking-[0.16em] ${
            isDark ? 'text-brand-amber' : 'text-brand-blue'
          }`}
        >
          {kicker}
        </span>
      )}

      {title && (
        <h2
          className={`font-display font-bold text-display-lg sm:text-display-xl leading-tight tracking-tight ${
            isDark ? 'text-white' : 'text-brand-navy'
          }`}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-brand-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
