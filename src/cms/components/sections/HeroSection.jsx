import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useModal } from '../../../context/ModalContext'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'
import Countdown from '../../../components/ui/Countdown'

export default function HeroSection({ data = {} }) {
  const { openRegisterModal } = useModal()

  const {
    kicker = 'A Conference for Young People',
    organiserText = 'Organised by Equip Indian Churches',
    headlinePart1 = 'One Life.',
    headlineHighlight = 'One Desire.',
    headlinePart2 = 'One Purpose.',
    coreLine = 'One Life for Christ. One Desire to glorify Him. One Purpose to proclaim His Gospel.',
    backgroundImage = '/hero-bg.jpg',
    metrics = [],
    primaryButton = { text: 'Register Now', link: '#pricing', modalTier: 'early-bird' },
    secondaryButton = { text: 'Event Passes & Rates', link: '#pricing' },
    showCountdown = true,
    countdownNotice = 'Commencing 14 September 2027 • Hyderabad',
  } = data

  const handlePrimaryClick = (e) => {
    if (primaryButton.link === '#pricing' || primaryButton.action === 'open_modal') {
      e?.preventDefault?.()
      openRegisterModal(primaryButton.modalTier || 'early-bird')
    }
  }

  const handleSecondaryClick = (e) => {
    if (secondaryButton.link?.startsWith('#')) {
      const el = document.querySelector(secondaryButton.link)
      if (el) {
        e?.preventDefault?.()
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-brand-navy pt-28 pb-16 overflow-hidden">
      {/* Editorial Background Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={backgroundImage || '/hero-bg.jpg'}
          onError={(e) => {
            e.currentTarget.src =
              'https://img.magnific.com/free-photo/waiting-room-with-monitors_1232-1390.jpg?semt=ais_hybrid&w=740&q=80'
          }}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-navy" />
      </div>

      {/* Hairline Cross Geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] border border-brand-amber/30 rounded-full" />
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#1E4B82" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#1E4B82" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Center Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12 relative z-10">
        <Reveal>
          <div className="max-w-4xl space-y-6">
            {/* Event Sub-tagline & Organiser Kicker */}
            <div className="flex flex-wrap items-center gap-3">
              {kicker && (
                <span className="inline-block py-1 px-3 rounded bg-brand-blue/30 border border-brand-blue/50 text-brand-amber text-xs uppercase font-bold tracking-[0.16em]">
                  {kicker}
                </span>
              )}
              {organiserText && (
                <span className="text-slate-400 text-xs tracking-wider">
                  {organiserText}
                </span>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-white text-display-2xl tracking-tight leading-[1.05]">
              {headlinePart1} <br />
              {headlineHighlight && (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-brand-amber to-amber-200">
                    {headlineHighlight}
                  </span>{' '}
                  <br />
                </>
              )}
              {headlinePart2}
            </h1>

            {/* Ultra-Minimal Core Line */}
            {coreLine && (
              <p className="text-slate-200 text-lg sm:text-xl font-medium max-w-2xl leading-snug">
                {coreLine}
              </p>
            )}

            {/* Hero Metric Pills */}
            {metrics && metrics.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {metrics.map((m, idx) => (
                  <div
                    key={m.label || idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-200 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" />
                    <strong className="text-white font-bold">{m.value}</strong>
                    <span className="text-slate-400">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {primaryButton?.text && (
                <Button variant="amber" size="lg" onClick={handlePrimaryClick}>
                  <span>{primaryButton.text}</span>
                  <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                </Button>
              )}

              {secondaryButton?.text && (
                <Button variant="outline-light" size="lg" onClick={handleSecondaryClick}>
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Quiet Countdown Strip */}
      {showCountdown && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 relative z-10 border-t border-brand-border-navy/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs uppercase font-semibold tracking-wider text-slate-400">
            {countdownNotice}
          </div>
          <Countdown />
        </div>
      )}
    </section>
  )
}
