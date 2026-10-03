import React from 'react'
import { ShieldCheck, BookOpen, Building, CheckCircle2 } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'

const ICON_MAP = {
  ShieldCheck,
  BookOpen,
  Building,
}

export default function VisionAudienceSection({ data = {} }) {
  const {
    kicker = 'THE VISION',
    title = 'Why CrossLife',
    subtitle = 'Substance over hype. Biblical clarity over cultural noise.',
    valuePoints = [],
    eligibilityBadge = 'ELIGIBILITY',
    age = '18 – 25 Years',
    profileTitle = 'Who Is It For',
    summary = 'For young Christians hungry for doctrinal depth, biblical wisdom, and purposeful Gospel living.',
    tags = [],
    includes = [],
  } = data

  return (
    <section className="py-20 bg-brand-ice/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: The Vision */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <Reveal>
              <div className="space-y-2">
                {kicker && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                    {kicker}
                  </span>
                )}
                <h2 className="font-display font-bold text-display-md text-brand-navy">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-sm font-medium text-brand-muted">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Value Cards */}
              <div className="space-y-3 mt-6">
                {valuePoints.map((pt, idx) => {
                  const Icon = ICON_MAP[pt.icon] || (idx === 0 ? ShieldCheck : idx === 1 ? BookOpen : Building)
                  return (
                    <div
                      key={pt.title || idx}
                      className="p-5 bg-white rounded-card border border-brand-border shadow-editorial flex items-start gap-4 hover:border-brand-blue/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-ice flex items-center justify-center shrink-0 border border-brand-border mt-0.5">
                        <Icon className="w-4 h-4 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-brand-navy leading-snug">
                          {pt.title}
                        </h3>
                        <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>

          {/* Right: Who Is It For */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-panel border border-brand-border shadow-editorial flex flex-col justify-between space-y-6">
            <Reveal delay={0.1}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {eligibilityBadge && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-amber block">
                      {eligibilityBadge}
                    </span>
                  )}
                  {age && (
                    <span className="text-xs font-mono font-bold text-brand-blue bg-brand-ice px-2 py-0.5 rounded border border-brand-border">
                      {age}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-2xl text-brand-navy">
                  {profileTitle}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed">
                  {summary}
                </p>
              </div>

              {/* Tag Pills */}
              {tags && tags.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-subtle block">
                    Ideal For
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-brand-ice text-brand-navy text-xs font-semibold border border-brand-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Included Checklist */}
              {includes && includes.length > 0 && (
                <div className="pt-4 border-t border-brand-border space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-subtle block">
                    Registration Includes
                  </span>
                  <ul className="space-y-1.5 text-xs text-brand-text">
                    {includes.map((inc) => (
                      <li key={inc} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
