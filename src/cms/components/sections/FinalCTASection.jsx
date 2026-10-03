import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useModal } from '../../../context/ModalContext'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'

export default function FinalCTASection({ data = {} }) {
  const { openRegisterModal } = useModal()

  const {
    kicker = '14 - 16 SEPTEMBER 2027 • HYDERABAD',
    headline = 'One Life for Christ. Come ready to be equipped.',
    subtext = "Early bird passes are limited. Claim your pass and complimentary copy of Don't Waste Your Life.",
    primaryButton = { text: 'Register Now', link: '#pricing' },
    secondaryButton = { text: 'Contact the Team', link: '/contact' },
  } = data

  const handlePrimaryClick = (e) => {
    if (primaryButton.link === '#pricing' || primaryButton.action === 'open_modal') {
      e?.preventDefault?.()
      openRegisterModal('early-bird')
    }
  }

  return (
    <section className="py-20 bg-brand-navy text-white text-center relative overflow-hidden border-t border-brand-border-navy">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
        <Reveal>
          {kicker && (
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-brand-amber block">
              {kicker}
            </span>
          )}
          <h2 className="font-display font-extrabold text-display-lg text-white tracking-tight leading-tight">
            {headline}
          </h2>
          {subtext && (
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              {subtext}
            </p>
          )}
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            {primaryButton?.text && (
              <Button
                variant="amber"
                size="lg"
                onClick={handlePrimaryClick}
                to={primaryButton.link !== '#pricing' ? primaryButton.link : undefined}
              >
                <span>{primaryButton.text}</span>
                <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
              </Button>
            )}
            {secondaryButton?.text && (
              <Button
                variant="outline-light"
                size="lg"
                to={secondaryButton.link}
              >
                {secondaryButton.text}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
