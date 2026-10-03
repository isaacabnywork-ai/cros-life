import React from 'react'
import Reveal from '../../../components/ui/Reveal'

export default function GoalsSection({ data = {} }) {
  const {
    kicker = 'CONFERENCE OBJECTIVES',
    title = 'Hopes & Goals',
    subtitle = 'Five biblical outcomes we pray and labour for throughout this gathering.',
    goals = [],
  } = data

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="max-w-xl mb-12">
          {kicker && (
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
              {kicker}
            </span>
          )}
          <h2 className="font-display font-bold text-display-md text-brand-navy">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </Reveal>

      {/* Grid of Numbered Outcome Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {goals.map((goal, index) => (
          <Reveal key={goal.number || index} delay={index * 0.05}>
            <div className="p-5 bg-white rounded-panel border border-brand-border shadow-editorial hover:border-brand-blue transition-all duration-300 flex flex-col justify-between h-full space-y-3">
              <span className="font-display font-bold text-2xl text-brand-blue/35">
                {goal.number}
              </span>
              <div>
                <h3 className="font-display font-bold text-base text-brand-navy">
                  {goal.title}
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-snug">
                  {goal.summary}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
