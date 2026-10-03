import React from 'react'
import { BookOpen, Library, Sparkles, CheckCircle2 } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'

const ICON_MAP = {
  BookOpen,
  Library,
  Sparkles,
}

export default function BookstoreSection({ data = {} }) {
  const {
    kicker = 'THEOLOGICAL RESOURCES',
    title = 'Conference Bookstore',
    subtitle = 'Curated titles at subsidized conference pricing.',
    features = [],
    categories = [],
  } = data

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-4">
          <Reveal>
            {kicker && (
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                {kicker}
              </span>
            )}
            <h2 className="font-display font-bold text-display-md text-brand-navy leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {subtitle}
              </p>
            )}

            {features && features.length > 0 && (
              <div className="space-y-2.5 pt-2">
                {features.map((f, i) => (
                  <div key={f.title || i} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-brand-amber-hover shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-navy block font-semibold">{f.title}</strong>
                      <span className="text-brand-muted">{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>

        {/* Right Column: Visual Category Showcase */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((cat, i) => {
                const Icon = ICON_MAP[cat.icon] || (i === 0 ? BookOpen : i === 1 ? Library : Sparkles)
                return (
                  <div
                    key={cat.title || i}
                    className="p-5 bg-white rounded-panel border border-brand-border shadow-editorial hover:border-brand-blue/30 transition-colors space-y-3"
                  >
                    <div className="w-8 h-8 rounded bg-brand-ice flex items-center justify-center text-brand-blue">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-brand-navy">{cat.title}</h4>
                      <p className="text-[11px] text-brand-muted mt-1 leading-snug">
                        {cat.desc}
                      </p>
                    </div>
                    {cat.tag && (
                      <span className="text-[10px] font-mono text-brand-blue font-semibold block">
                        {cat.tag}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
