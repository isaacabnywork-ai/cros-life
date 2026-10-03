import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Universal Link component that automatically decides whether to render
 * a React Router <Link> (for internal SPA routes) or a native <a> tag
 * (for external URLs, mailto, tel, and anchor hashes).
 */
export default function UniversalLink({
  to,
  href,
  children,
  className = '',
  target,
  rel,
  onClick,
  ...props
}) {
  const destination = to || href || '/'
  const isExternal =
    typeof destination === 'string' &&
    (destination.startsWith('http://') ||
      destination.startsWith('https://') ||
      destination.startsWith('mailto:') ||
      destination.startsWith('tel:'))

  if (isExternal) {
    return (
      <a
        href={destination}
        target={target || (destination.startsWith('http') ? '_blank' : undefined)}
        rel={rel || (destination.startsWith('http') ? 'noopener noreferrer' : undefined)}
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={destination} className={className} onClick={onClick} target={target} rel={rel} {...props}>
      {children}
    </Link>
  )
}
