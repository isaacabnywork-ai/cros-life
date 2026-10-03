import React from 'react'
import { Users } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'

export default function SpeakersSection({ data = {} }) {
  const {
    sectionId = 'speakers',
    kicker = 'TEACHING MINISTRY',
    title = 'Speakers',
    subtitle = 'Pastors and expositors from across India',
    rightBadge = 'Faithful Exposition',
    speakers = [],
  } = data

  return (
    <section id={sectionId} className="py-20 bg-brand-ice/30 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              {kicker && (
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
                  {kicker}
                </span>
              )}
              <h2 className="font-display font-bold text-display-md text-brand-navy">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            {rightBadge && (
              <span className="text-xs uppercase tracking-wider text-brand-subtle font-mono">
                {rightBadge}
              </span>
            )}
          </div>
        </Reveal>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker, index) => (
            <Reveal key={speaker.id || index} delay={index * 0.06}>
              <div className="group bg-white rounded-card border border-brand-border overflow-hidden shadow-editorial hover:shadow-panel transition-all duration-300 flex flex-col h-full">
                <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden border-b border-brand-border flex items-center justify-center">
                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={`Photograph of ${speaker.name}`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-6 text-center group-hover:bg-brand-ice/50 transition-colors">
                      <Users className="w-8 h-8 text-slate-300 mb-2" strokeWidth={1.5} />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                        {speaker.name}
                      </span>
                    </div>
                  )}
                  {speaker.topic && (
                    <div className="absolute bottom-2 left-2 right-2 bg-brand-navy/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-white font-mono tracking-tight leading-tight">
                      {speaker.topic}
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    {speaker.role && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-blue block">
                        {speaker.role}
                      </span>
                    )}
                    <h3 className="font-display font-bold text-base text-brand-navy tracking-tight">
                      {speaker.name}
                    </h3>
                    {speaker.church && (
                      <p className="text-xs text-brand-muted">
                        {speaker.church}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
