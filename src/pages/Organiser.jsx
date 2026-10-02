import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ORGANISER_INFO } from '../data/eventData'
import SEO from '../components/ui/SEO'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import eicLogo from '../assets/eic-logo.svg'

export default function Organiser() {
  return (
    <div className="bg-brand-page min-h-screen pt-28 pb-24">
      <SEO
        title="Organiser - Equip Indian Churches"
        description="Learn about Equip Indian Churches, the pastoral fellowship and resource centre behind CrossLife Conference."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-16 pt-8">
          <SectionHeading
            kicker="LEADERSHIP & CONVICTION"
            title="The Organiser"
            subtitle="About Equip Indian Churches and the pastoral fellowship behind CrossLife."
          />
          <div className="w-16 h-0.5 bg-brand-amber mt-6" />
        </div>

        {/* Main Content Container */}
        <Reveal>
          <div className="bg-white rounded-panel border border-brand-border p-8 sm:p-14 shadow-panel space-y-12">
            {/* Logo and Ministry Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-brand-border">
              <div className="w-20 h-20 p-2 rounded-card bg-brand-ice flex items-center justify-center border border-brand-border shrink-0">
                <img
                  src={eicLogo}
                  alt="Equip Indian Churches Logo"
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-[0.16em] text-brand-blue block">
                  RESOURCE CENTRE & FELLOWSHIP
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy">
                  {ORGANISER_INFO.name}
                </h2>
              </div>
            </div>

            {/* Ministry Intro Body */}
            <div className="space-y-6 text-brand-text text-base sm:text-lg leading-relaxed max-w-3xl">
              <p>
                {ORGANISER_INFO.intro}
              </p>
            </div>

            {/* Undergirding Verses Block */}
            <div className="space-y-6 pt-4 border-t border-brand-border">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-[0.16em] text-brand-amber block">
                  FOUNDATIONAL SCRIPTURE
                </span>
                <p className="text-sm font-semibold text-brand-muted">
                  {ORGANISER_INFO.verseIntro}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {ORGANISER_INFO.verses.map((verse) => (
                  <div
                    key={verse.reference}
                    className="p-8 rounded-card bg-brand-ice/60 border-l-4 border-brand-blue border-y border-r border-brand-border space-y-4"
                  >
                    <blockquote className="font-display font-medium text-lg text-brand-navy leading-snug">
                      "{verse.text}"
                    </blockquote>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-blue font-mono">
                      {verse.reference}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-8 border-t border-brand-border flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-brand-muted">
                To learn more about participating in the network or accessing regional resources:
              </div>
              <Button variant="primary" to="/contact">
                <span>Contact Equip Indian Churches</span>
                <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
