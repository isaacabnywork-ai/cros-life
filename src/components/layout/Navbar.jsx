import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu } from 'lucide-react'
import { NAV_LINKS } from '../../data/navigation'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { useModal } from '../../context/ModalContext'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const isScrolled = useScrollPosition(30)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const { openRegisterModal } = useModal()

  const isHome = location.pathname === '/'

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false)
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Header background logic: transparent over hero on Home, solid white/navy on scroll or other routes
  const navBgClass = isHome && !isScrolled
    ? 'bg-transparent text-white border-transparent'
    : 'bg-white/95 backdrop-blur-md text-brand-navy border-brand-border shadow-editorial'

  const logoTextColor = isHome && !isScrolled ? 'text-white' : 'text-brand-navy'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 border-b ${navBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber rounded"
            aria-label="CrossLife Homepage"
          >
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect x="13" y="2" width="6" height="28" rx="2" fill="url(#navCrossGrad)" />
                <rect x="4" y="9" width="24" height="6" rx="2" fill="url(#navCrossGrad)" />
                <defs>
                  <linearGradient id="navCrossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#1E4B82" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-xl tracking-tight ${logoTextColor}`}>
                Cross<span className="text-brand-amber">Life</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-brand-subtle">
                One Life
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              if (link.type === 'dropdown') {
                return (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      onMouseEnter={() => setDropdownOpen(true)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      className={`text-sm font-semibold tracking-wide flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber rounded py-1 ${
                        isHome && !isScrolled
                          ? 'text-slate-200 hover:text-white'
                          : 'text-brand-text hover:text-brand-blue'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          dropdownOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>

                    {dropdownOpen && (
                      <div
                        onMouseLeave={() => setDropdownOpen(false)}
                        className="absolute left-0 mt-2 w-56 rounded-card bg-white border border-brand-border shadow-panel py-2 z-50 animate-in fade-in slide-in-from-top-1"
                      >
                        {link.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-text hover:bg-brand-ice hover:text-brand-blue transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber rounded py-1 ${
                    isHome && !isScrolled
                      ? 'text-slate-200 hover:text-white'
                      : 'text-brand-text hover:text-brand-blue'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Outlined Register Now Button */}
            <button
              type="button"
              onClick={() => openRegisterModal('early-bird')}
              className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber ${
                isHome && !isScrolled
                  ? 'border-white/80 text-white hover:bg-white hover:text-brand-navy shadow-sm'
                  : 'border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
              }`}
            >
              Register Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className={`p-2 rounded-btn focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber ${
                isHome && !isScrolled ? 'text-white hover:bg-white/10' : 'text-brand-navy hover:bg-brand-ice'
              }`}
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
        onRegisterClick={() => {
          setMobileMenuOpen(false)
          openRegisterModal('early-bird')
        }}
      />
    </>
  )
}
