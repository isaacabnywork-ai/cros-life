import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { PARTNERS } from '../data/partners'
import { ORGANISER_INFO } from '../data/eventData'
import SEO from '../components/ui/SEO'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import eicLogo from '../assets/eic-logo.svg'

export default function Partners() {
  return (
    <div className="bg-brand-page min-h-screen pt-28 pb-24">
      <SEO
        title="Partners & Fellowship"
        description="Ministries, local churches, and pastoral fellowships collaborating for the Gospel through CrossLife."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pt-8">
          <SectionHeading
            kicker="GOSPEL PARTNERSHIP"
            title="Organiser & Partners"
            subtitle="CrossLife is organised by Equip Indian Churches in fellowship with faithful local churches and Gospel ministries across India."
          />
          <div className="w-16 h-0.5 bg-brand-amber mt-6" />
        </div>

        {/* Organiser Primary Block */}
        <Reveal>
          <div className="bg-white rounded-panel border border-brand-border p-8 sm:p-12 shadow-panel mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex items-center justify-center p-6 bg-brand-ice/50 rounded-card border border-brand-border">
                <img
                  src={eicLogo}
                  alt="Equip Indian Churches"
                  className="max-h-20 w-auto"
                />
              </div>

              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs uppercase font-bold tracking-[0.16em] text-brand-blue block">
                  LEAD ORGANISER
                </span>
                <h3 className="font-display font-bold text-2xl text-brand-navy">
                  {ORGANISER_INFO.name}
                </h3>
                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  {ORGANISER_INFO.intro}
                </p>
                <div className="pt-2">
                  <Link
                    to="/organiser"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-navy transition-colors"
                  >
                    <span>Read Full Ministry Overview</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Partners Grid */}
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.16em] text-brand-blue block mb-1">
              SUPPORTING FELLOWSHIPS
            </span>
            <h3 className="font-display font-bold text-2xl text-brand-navy">
              Partner Ministries and Churches
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              Churches and resource ministries partnering to encourage Gospel faithfulness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNERS.map((partner, index) => (
              <Reveal key={partner.id} delay={index * 0.05}>
                <div className="bg-white rounded-panel border border-brand-border p-6 shadow-editorial hover:shadow-panel transition-all flex flex-col justify-between h-full group">
                  <div className="space-y-4">
                    {/* Neutral Logo Placeholder Container */}
                    <div className="w-full aspect-[16/9] bg-brand-ice/60 rounded-card border border-brand-border flex items-center justify-center p-4 text-center group-hover:bg-brand-ice transition-colors">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
                          Logo Placeholder
                        </span>
                        <span className="font-display font-bold text-xs text-brand-navy block">
                          {partner.name}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-blue block">
                        {partner.type}
                      </span>
                      <h4 className="font-display font-bold text-base text-brand-navy mt-0.5">
                        {partner.name}
                      </h4>
                      <p className="text-xs text-brand-muted mt-1 font-mono">
                        {partner.city}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-brand-border flex items-center justify-between text-xs text-brand-subtle">
                    <span>Supporting Partner</span>
                    {partner.website && partner.website !== '#' ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-brand-blue font-semibold hover:underline"
                      >
                        <span>Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="font-mono text-[10px]">Active Partner</span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Partnership Inquiries Callout */}
        <div className="mt-16 p-8 bg-brand-navy text-white rounded-panel border border-brand-border-navy flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-xl text-white">
              Is your church interested in partnering for CrossLife?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              We welcome pastoral partnerships committed to biblical preaching and disciple-making.
            </p>
          </div>
          <Button variant="amber" to="/contact">
            Partner Inquiries
          </Button>
        </div>
      </div>
    </div>
  )
}
