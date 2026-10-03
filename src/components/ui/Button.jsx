import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Standard Button Primitive for CrossLife.
 * Variants:
 * - 'primary': Solid Navy (#0B2545) with white text
 * - 'secondary': Solid Blue (#1E4B82) with white text
 * - 'outline': Outlined Navy border with transparent background
 * - 'outline-light': Outlined white border for dark hero/footer surfaces
 * - 'amber': Accent Amber (#F59E0B) conversion button
 * - 'ghost': Clean text button with subtle hover
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-display font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2 rounded-btn tracking-wider uppercase',
    md: 'text-xs sm:text-sm px-5 py-3 rounded-btn tracking-wider uppercase',
    lg: 'text-sm sm:text-base px-7 py-3.5 rounded-btn tracking-wide',
    pill: 'text-xs px-6 py-2.5 rounded-full tracking-wider uppercase',
  }

  const variantClasses = {
    primary:
      'bg-brand-navy hover:bg-brand-blue text-white shadow-editorial hover:shadow-panel focus-visible:ring-brand-navy',
    secondary:
      'bg-brand-blue hover:bg-brand-blue-hover text-white shadow-editorial focus-visible:ring-brand-blue',
    outline:
      'border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white focus-visible:ring-brand-navy',
    'outline-light':
      'border border-white/80 text-white hover:bg-white hover:text-brand-navy focus-visible:ring-white',
    amber:
      'bg-brand-amber hover:bg-brand-amber-hover text-brand-navy hover:text-white font-bold shadow-amber-glow focus-visible:ring-brand-amber',
    ghost:
      'text-brand-text hover:text-brand-blue hover:bg-brand-ice/60 focus-visible:ring-brand-blue',
  }

  const combinedClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${
    variantClasses[variant] || variantClasses.primary
  } ${className}`

  const targetUrl = to || href

  if (targetUrl) {
    const isExternal =
      typeof targetUrl === 'string' &&
      (targetUrl.startsWith('http://') ||
        targetUrl.startsWith('https://') ||
        targetUrl.startsWith('mailto:') ||
        targetUrl.startsWith('tel:'))

    if (isExternal) {
      return (
        <a
          href={targetUrl}
          className={combinedClasses}
          target={props.target || (targetUrl.startsWith('http') ? '_blank' : undefined)}
          rel={props.rel || (targetUrl.startsWith('http') ? 'noopener noreferrer' : undefined)}
          {...props}
        >
          {children}
        </a>
      )
    }

    return (
      <Link to={targetUrl} className={combinedClasses} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
