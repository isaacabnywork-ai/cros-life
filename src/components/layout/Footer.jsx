import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { useCms } from '../../cms/context/CmsContext'

import UniversalLink from '../ui/UniversalLink'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { settings, menus } = useCms()

  const footerMenu = menus.find((m) => m.slug === 'footer')
  const navLinks = footerMenu?.items || []

  const organiser = settings.event?.organiser || 'Equip Indian Churches'
  const venue = settings.contacts?.venue || {
    name: 'Ashirwad Global Learning Centre',
    city: 'Hyderabad',
    state: 'Telangana',
  }
  const phones = settings.contacts?.phones || []
  const email = settings.contacts?.email || 'contact@crosslife.in'
  const dates = settings.event?.dates || '14 - 16 September 2027'

  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-brand-border-navy relative overflow-hidden">
      {/* Subtle background hairline motif */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-border-navy">
          {/* Brand & Organiser Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center">
              <img
                src={settings.logo_url || '/images/crosslife-logo.webp'}
                alt={settings.site_name || 'CrossLife'}
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {settings.footer_description ||
                'One Life for Christ, One Desire to glorify Him, One Purpose to proclaim His Gospel. A Gospel-centred youth conference for young men and women.'}
            </p>

            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
                Organised By
              </p>
              <Link
                to="/organiser"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-amber transition-colors group"
              >
                <span>{organiser}</span>
                <ArrowUpRight
                  className="w-4 h-4 text-slate-400 group-hover:text-brand-amber transition-colors"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <UniversalLink
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </UniversalLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Venue Column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">
              Event & Contact
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-amber shrink-0 mt-1" strokeWidth={1.75} />
                <div>
                  <p className="font-medium text-white">{venue.name}</p>
                  <p className="text-xs text-slate-400">
                    {venue.city}, {venue.state}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-amber shrink-0" strokeWidth={1.75} />
                <a
                  href={`mailto:${email}`}
                  className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-amber shrink-0 mt-1" strokeWidth={1.75} />
                <div className="space-y-1">
                  {phones.map((phone) => (
                    <a
                      key={phone.value}
                      href={`tel:${phone.value}`}
                      className="block text-slate-300 hover:text-white transition-colors text-xs sm:text-sm font-mono"
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border-navy/60">
              <div className="inline-block px-3 py-1.5 rounded bg-brand-navy-deep border border-brand-border-navy text-xs text-slate-300 font-mono">
                {dates}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {currentYear} {settings.site_name}. {settings.copyright_text}
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/statement-of-faith" className="hover:text-slate-200 transition-colors">
              Statement of Faith
            </Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
