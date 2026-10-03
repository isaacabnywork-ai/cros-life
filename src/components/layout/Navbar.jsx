import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, ArrowRight } from 'lucide-react'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { useModal } from '../../context/ModalContext'
import { useCms } from '../../cms/context/CmsContext'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const isScrolled = useScrollPosition(30)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const { openRegisterModal } = useModal()
  const { settings, menus, getMegaMenu } = useCms()

  const isHome = location.pathname === '/'

  // Dynamic CMS navigation items
  const headerMenu = menus.find((m) => m.slug === 'header')
  const navLinks = headerMenu?.items || []

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isSticky = settings.sticky_header ?? true

  // Header background logic
  const navBgClass =
    isHome && !isScrolled
      ? 'bg-transparent text-white border-transparent'
      : 'bg-white/95 backdrop-blur-md text-brand-navy border-brand-border shadow-editorial'

  const cta = settings.default_cta || { text: 'Register Now', link: '/#pricing' }

  const handleCtaClick = (e) => {
    if (cta.link === '/#pricing' || cta.link === '#pricing') {
      openRegisterModal('early-bird')
    }
  }

  return (
    <>
      {/* Top Announcement Bar (CMS Controlled) */}
      {settings.announcement?.enabled && (
        <div className="bg-brand-navy-deep text-slate-200 border-b border-brand-border-navy/70 py-2 px-4 text-center text-xs relative z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span>{settings.announcement.message}</span>
            {settings.announcement.link_text && (
              <a
                href={settings.announcement.link_url || '#pricing'}
                onClick={(e) => {
                  if (settings.announcement.link_url?.includes('pricing')) {
                    e.preventDefault()
                    openRegisterModal('early-bird')
                  }
                }}
                className="font-bold text-brand-amber hover:underline inline-flex items-center gap-0.5 ml-1"
              >
                <span>{settings.announcement.link_text}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}

      <header
        className={`${
          isSticky ? 'fixed' : 'relative'
        } top-0 left-0 right-0 z-40 transition-colors duration-300 border-b ${navBgClass} ${
          settings.announcement?.enabled ? 'mt-0' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber rounded py-1"
            aria-label={`${settings.site_name} Homepage`}
          >
            <img
              src={settings.logo_url || '/images/crosslife-logo.webp'}
              alt={settings.site_name || 'CrossLife'}
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const megaMenu = getMegaMenu(link.id)
              const hasMega = Boolean(megaMenu && megaMenu.enabled && megaMenu.columns?.length > 0)
              const isDropdown = link.type === 'dropdown' || hasMega
              const isOpen = activeDropdown === link.id

              if (isDropdown) {
                return (
                  <div
                    key={link.id || link.label}
                    className="relative"
                    ref={dropdownRef}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isOpen ? null : link.id)}
                      onMouseEnter={() => setActiveDropdown(link.id)}
                      aria-expanded={isOpen}
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
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>

                    {/* Standard Dropdown or Mega Menu */}
                    {isOpen && (
                      hasMega ? (
                        /* MEGA MENU PANEL */
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[720px] rounded-panel bg-white border border-brand-border shadow-panel p-6 z-50 animate-in fade-in slide-in-from-top-1 text-slate-800">
                          <div className="grid grid-cols-3 gap-6">
                            {megaMenu.columns.map((col, idx) => (
                              <div key={col.id || idx} className="space-y-3">
                                {col.heading && (
                                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-brand-blue border-b border-brand-border pb-1">
                                    {col.heading}
                                  </h4>
                                )}
                                <div className="space-y-2">
                                  {(col.items || []).map((subItem, sIdx) => (
                                    <Link
                                      key={sIdx}
                                      to={subItem.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="block group/item py-1"
                                    >
                                      <span className="block text-xs font-semibold text-slate-900 group-hover/item:text-brand-blue transition-colors">
                                        {subItem.label}
                                      </span>
                                      {subItem.description && (
                                        <span className="block text-[11px] text-slate-500 leading-tight mt-0.5">
                                          {subItem.description}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>

                                {/* Column Featured Card */}
                                {col.featured?.title && (
                                  <div className="p-3 bg-brand-ice/60 border border-brand-border rounded-card space-y-2 mt-2">
                                    <span className="text-[9px] font-bold uppercase text-brand-amber font-mono">
                                      Featured
                                    </span>
                                    <h5 className="font-display font-bold text-xs text-brand-navy">
                                      {col.featured.title}
                                    </h5>
                                    {col.featured.description && (
                                      <p className="text-[11px] text-brand-muted leading-tight">
                                        {col.featured.description}
                                      </p>
                                    )}
                                    {col.featured.buttonText && (
                                      <Link
                                        to={col.featured.buttonLink || '#'}
                                        onClick={() => setActiveDropdown(null)}
                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-blue hover:underline pt-1"
                                      >
                                        <span>{col.featured.buttonText}</span>
                                        <ArrowRight className="w-3 h-3" />
                                      </Link>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* STANDARD DROPDOWN */
                        <div className="absolute left-0 mt-2 w-56 rounded-card bg-white border border-brand-border shadow-panel py-2 z-50 animate-in fade-in slide-in-from-top-1">
                          {(link.items || []).map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-text hover:bg-brand-ice hover:text-brand-blue transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )
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

            {/* Outlined Register Now Button (CMS Controlled) */}
            <Link
              to={cta.link}
              onClick={handleCtaClick}
              className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber ${
                isHome && !isScrolled
                  ? 'border-white/80 text-white hover:bg-white hover:text-brand-navy shadow-sm'
                  : 'border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
              }`}
            >
              {cta.text || 'Register Now'}
            </Link>
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
        navLinks={navLinks}
        onRegisterClick={() => {
          setMobileMenuOpen(false)
          handleCtaClick()
        }}
      />
    </>
  )
}
