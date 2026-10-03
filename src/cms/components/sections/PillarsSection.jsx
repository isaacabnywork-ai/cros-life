import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useModal } from '../../../context/ModalContext'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'

export default function PillarsSection({ data = {} }) {
  const { openRegisterModal } = useModal()

  const {
    sectionId = 'what-is-crosslife',
    kicker = 'WHAT IS CROSSLIFE',
    title = 'Built for One Life, One Desire, One Purpose.',
    description = 'Equipping young people across India for wholehearted Gospel faithfulness, rooted in biblical truth and the local church.',
    buttonText = 'Join the Gathering',
    pillars = [],
  } = data

  return (
    <section id={sectionId} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Statement */}
          <div className="lg:col-span-5 space-y-4">
            {kicker && (
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                {kicker}
              </span>
            )}
            <h2 className="font-display font-bold text-display-md sm:text-display-lg text-brand-navy leading-tight">
              {title}
            </h2>
            <p className="text-base text-brand-muted leading-relaxed">
              {description}
            </p>
            {buttonText && (
              <div className="pt-2">
                <Button variant="primary" size="sm" onClick={() => openRegisterModal('early-bird')}>
                  <span>{buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            )}
          </div>

          {/* Right: Pillars Repeaters */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.num || idx}
                className="p-6 bg-white rounded-panel border border-brand-border shadow-editorial hover:border-brand-blue/40 transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-display text-brand-blue/30">
                    {pillar.num}
                  </span>
                  {pillar.subtitle && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-ice text-brand-blue border border-brand-border">
                      {pillar.subtitle}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-brand-navy">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1 leading-snug">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
