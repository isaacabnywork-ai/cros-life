import React from 'react'
import { useModal } from '../../../context/ModalContext'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'

export default function BookFeatureSection({ data = {} }) {
  const { openRegisterModal } = useModal()

  const {
    kicker = 'CONFERENCE RESOURCE',
    title = 'Free Book for Every Registered Attendee',
    description = "Every participant receives a complimentary copy of John Piper's classic \"Don't Waste Your Life\" at the check-in desk.",
    buttonText = 'Claim With Registration',
    book = {
      title: "DON'T WASTE YOUR LIFE",
      author: 'JOHN PIPER',
      badge: 'FREE GIFT',
      publisher: 'Crossway Editions',
    },
  } = data

  return (
    <section className="py-16 bg-brand-ice border-y border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-white rounded-panel border border-brand-border p-6 sm:p-8 shadow-panel grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Book Mockup */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-40 aspect-[3/4] bg-brand-navy rounded shadow-panel relative p-4 flex flex-col justify-between border border-brand-navy-deep transform hover:-rotate-1 transition-transform duration-300">
                <div className="border border-brand-blue/60 p-3 h-full flex flex-col justify-between text-center">
                  <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-brand-amber">
                    {book.badge || 'FREE GIFT'}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-white text-base tracking-tight leading-tight">
                      {book.title}
                    </h4>
                    <div className="w-6 h-0.5 bg-brand-amber mx-auto" />
                    <p className="text-slate-300 text-[11px] font-medium pt-0.5">
                      {book.author}
                    </p>
                  </div>
                  <span className="text-[7px] uppercase tracking-widest text-slate-400">
                    {book.publisher}
                  </span>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="md:col-span-8 space-y-3">
              {kicker && (
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-ice text-brand-blue border border-brand-border">
                  {kicker}
                </span>
              )}
              <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-navy leading-tight">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {description}
              </p>
              {buttonText && (
                <div className="pt-1">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => openRegisterModal('early-bird')}
                  >
                    {buttonText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
