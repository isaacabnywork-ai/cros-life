import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Compass } from 'lucide-react'
import { ORGANISER_INFO } from '../data/eventData'
import SEO from '../components/ui/SEO'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import eicLogo from '../assets/eic-logo.svg'

export default function Organiser() {
  const pillars = [
    {
      icon: <Users className="w-5 h-5 text-brand-blue" />,
      title: 'Pastoral Fellowship',
      desc: 'Uniting local church pastors across India around biblical truth and mutual encouragement.',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-brand-amber-hover" />,
      title: 'Resource Publishing',
      desc: 'Creating sound theological study materials, translations, and discipleship guides.',
    },
    {
      icon: <Compass className="w-5 h-5 text-brand-navy" />,
      title: 'Youth Conferences',
      desc: 'Equipping the rising generation through immersive gatherings like CrossLife.',
    },
  ]

  return (
    <div className="bg-brand-page min-h-screen pt-28 pb-24">
      <SEO
        title="Organiser - Equip Indian Churches"
        description="Learn about Equip Indian Churches, the pastoral fellowship and resource centre behind CrossLife Conference."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-12 pt-8">
          <SectionHeading
            kicker="LEADERSHIP & CONVICTION"
            title="The Organiser"
            subtitle="Equip Indian Churches — the pastoral fellowship behind CrossLife."
          />
          <div className="w-16 h-0.5 bg-brand-amber mt-4" />
        </div>

        {/* Main Content Container */}
        <Reveal>
          <div className="bg-white rounded-panel border border-brand-border p-8 sm:p-12 shadow-panel space-y-10">
            {/* Logo and Ministry Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-brand-border">
              <div className="w-16 h-16 p-2 rounded-card bg-brand-ice flex items-center justify-center border border-brand-border shrink-0">
                <img
                  src={eicLogo}
                  alt="Equip Indian Churches Logo"
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-brand-blue block">
                  RESOURCE CENTRE & FELLOWSHIP
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy">
                  {ORGANISER_INFO.name}
                </h2>
                <p className="text-xs text-brand-muted font-medium">
                  {ORGANISER_INFO.tagline}
                </p>
              </div>
            </div>

            {/* Ministry Intro Body */}
            <p className="text-brand-text text-base sm:text-lg leading-relaxed max-w-3xl">
              {ORGANISER_INFO.intro}
            </p>

            {/* 3 Structured Ministry Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="p-5 rounded-card bg-brand-ice/50 border border-brand-border space-y-2 hover:border-brand-blue/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded bg-white border border-brand-border flex items-center justify-center shadow-xs">
                    {p.icon}
                  </div>
                  <h3 className="font-display font-bold text-base text-brand-navy">
                    {p.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Undergirding Verses Block */}
            <div className="space-y-4 pt-4 border-t border-brand-border">
              <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber block">
                FOUNDATIONAL SCRIPTURE
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ORGANISER_INFO.verses.map((verse) => (
                  <div
                    key={verse.reference}
                    className="p-6 rounded-card bg-brand-ice/40 border-l-4 border-brand-blue border-y border-r border-brand-border space-y-2"
                  >
                    <blockquote className="font-display font-medium text-base text-brand-navy leading-snug">
                      "{verse.text}"
                    </blockquote>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand-blue font-mono">
                      {verse.reference}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-6 border-t border-brand-border flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-brand-muted">
                To connect with the network or request regional pastoral training:
              </span>
              <Button variant="primary" size="sm" to="/contact">
                <span>Contact Equip Indian Churches</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
