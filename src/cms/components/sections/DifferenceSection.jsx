import React from 'react'
import Reveal from '../../../components/ui/Reveal'

export default function DifferenceSection({ data = {} }) {
  const {
    kicker = 'WHAT SETS US APART',
    title = 'Substance Over Trend',
    pullQuote = 'Come ready to be challenged and sharpened — not by trends, but by truth.',
    pillars = [],
  } = data

  return (
    <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-2">
            {kicker && (
              <span className="text-xs uppercase font-bold tracking-[0.18em] text-brand-amber block">
                {kicker}
              </span>
            )}
            <h2 className="font-display font-bold text-display-md sm:text-display-lg text-white tracking-tight">
              {title}
            </h2>
          </div>
        </Reveal>

        {/* 3 Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <Reveal key={item.badge || idx} delay={idx * 0.08}>
              <div className="p-6 rounded-panel bg-brand-navy-deep border border-brand-border-navy flex flex-col justify-between h-full space-y-4 hover:border-brand-amber/40 transition-colors">
                <div className="space-y-3">
                  {item.badge && (
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-amber/20 text-brand-amber border border-brand-amber/30">
                      {item.badge}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-xl text-white">
                    {item.focus}
                  </h3>
                  {item.contrasting && (
                    <div className="inline-flex items-center gap-1.5 text-xs text-rose-300/90 font-medium">
                      <span>✕</span>
                      <span>{item.contrasting}</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pull Quote Strip */}
        {pullQuote && (
          <Reveal delay={0.2}>
            <div className="p-6 sm:p-8 rounded-panel bg-brand-navy-deep/80 border-l-4 border-brand-amber border-y border-r border-brand-border-navy flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <blockquote className="font-display font-medium text-lg sm:text-xl text-white leading-snug">
                "{pullQuote}"
              </blockquote>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-amber font-mono shrink-0">
                The CrossLife Conviction
              </span>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
