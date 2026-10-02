import React from 'react'
import { Link } from 'react-router-dom'
import { X, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '../../config/site'

export default function MobileMenu({ isOpen, onClose, navLinks, onRegisterClick }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile Menu">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-panel flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <Link to="/" onClick={onClose} className="block">
            <img
              src="/images/crosslife-logo.webp"
              alt="CrossLife"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-btn text-brand-muted hover:text-brand-navy hover:bg-brand-ice focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-subtle">
              Navigation
            </div>
            {navLinks.map((item) => {
              if (item.type === 'dropdown') {
                return (
                  <div key={item.label} className="space-y-2 border-l-2 border-brand-ice pl-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                      {item.label}
                    </div>
                    <div className="space-y-2 pl-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          onClick={onClose}
                          className="block text-sm font-medium text-brand-text hover:text-brand-blue"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  className="block text-base font-medium text-brand-text hover:text-brand-blue"
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="pt-6 border-t border-brand-border">
            <button
              type="button"
              onClick={onRegisterClick}
              className="w-full flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-blue text-white py-3.5 px-4 rounded-btn font-semibold text-sm transition-colors"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 bg-brand-ice/50 border-t border-brand-border text-xs text-brand-muted">
          <p className="font-semibold text-brand-text">{SITE_CONFIG.venue.name}</p>
          <p>{SITE_CONFIG.venue.city}, {SITE_CONFIG.venue.state}</p>
          <p className="mt-2 text-[11px] text-brand-subtle">{SITE_CONFIG.contacts.email}</p>
        </div>
      </div>
    </div>
  )
}
