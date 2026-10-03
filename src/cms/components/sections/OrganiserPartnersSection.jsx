import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'

export default function OrganiserPartnersSection({ data = {} }) {
  const {
    kicker = 'LEADERSHIP & FELLOWSHIP',
    title = 'Organiser & Supporting Ministries',
    viewAllText = 'View All Partners',
    viewAllLink = '/partners',
    organiser = {
      badge: 'EIC',
      name: 'Equip Indian Churches',
      tagline: 'Pastoral Fellowship & Resource Centre',
      intro: 'A fellowship of pastors united to spur biblical Gospel growth across India through training, publications, and youth conferences.',
      linkText: 'Read Organiser Statement',
      linkUrl: '/organiser',
    },
    partners = [],
  } = data

  return (
    <section className="py-20 bg-brand-ice/50 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              {kicker && (
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
                  {kicker}
                </span>
              )}
              <h2 className="font-display font-bold text-display-md text-brand-navy">
                {title}
              </h2>
            </div>
            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-navy transition-colors"
              >
                <span>{viewAllText}</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Organiser Spotlight */}
          {organiser && (
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-panel border border-brand-border shadow-editorial space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                  {organiser.badge || 'EIC'}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-navy">
                    {organiser.name}
                  </h3>
                  <span className="text-[11px] text-brand-muted font-medium">
                    {organiser.tagline}
                  </span>
                </div>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                {organiser.intro}
              </p>
              {organiser.linkUrl && (
                <div className="pt-2">
                  <Link
                    to={organiser.linkUrl}
                    className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    <span>{organiser.linkText || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Partner Logos Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {partners.map((partner, index) => (
              <div
                key={partner.id || index}
                className="p-4 bg-white rounded-card border border-brand-border flex flex-col items-center justify-center text-center shadow-editorial min-h-[90px]"
              >
                <span className="text-[11px] font-bold text-brand-navy font-display leading-tight">
                  {partner.name}
                </span>
                <span className="text-[10px] text-brand-subtle font-mono mt-0.5">
                  {partner.city}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
