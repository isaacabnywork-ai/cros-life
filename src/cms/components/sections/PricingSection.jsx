import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useModal } from '../../../context/ModalContext'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'

export default function PricingSection({ data = {} }) {
  const { openRegisterModal } = useModal()
  const [couponCopied, setCouponCopied] = useState(false)

  const {
    sectionId = 'pricing',
    kicker = 'ADMISSION & TIERS',
    title = 'Registration Passes',
    subtitle = 'Covers 3 days of conference sessions, lodging, meals, and study materials.',
    earlyBird = {
      badge: 'Limited Availability',
      tier: 'Tier 01',
      label: 'Early Bird',
      formattedAmount: '₹2,000',
      features: ['Full 3-day conference access', 'Dormitory lodging & all meals', "Free book: Don't Waste Your Life"],
      buttonText: 'Register Early Bird',
      coupon: { code: 'AIPC2026', copy: 'Save ₹500 on Early Bird! Use code at checkout' },
    },
    regular = {
      badge: 'Standard Rate',
      tier: 'Tier 02',
      label: 'Regular Registration',
      formattedAmount: '₹3,000',
      features: ['Applies once Early Bird slots close', 'Full 3-day access, lodging & meals', 'Conference packet & gift book'],
      buttonText: 'Register Regular',
      note: 'Standard passes open when Tier 01 concludes.',
    },
  } = data

  const handleCopyCoupon = () => {
    if (earlyBird.coupon?.code) {
      try {
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(earlyBird.coupon.code).catch(() => {})
        }
        setCouponCopied(true)
        setTimeout(() => setCouponCopied(false), 2000)
      } catch {}
    }
  }

  return (
    <section id={sectionId} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          {kicker && (
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
              {kicker}
            </span>
          )}
          <h2 className="font-display font-bold text-display-md text-brand-navy">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-brand-muted">
              {subtitle}
            </p>
          )}
        </div>
      </Reveal>

      {/* Two Clean Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Early Bird */}
        <Reveal delay={0.05}>
          <div className="relative bg-white rounded-panel border-2 border-brand-navy p-7 shadow-panel flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {earlyBird.badge && (
                  <span className="inline-block px-2.5 py-0.5 bg-brand-amber/15 text-brand-amber-hover border border-brand-amber/30 rounded text-xs font-bold uppercase tracking-wider">
                    {earlyBird.badge}
                  </span>
                )}
                {earlyBird.tier && (
                  <span className="text-xs font-mono text-brand-subtle">{earlyBird.tier}</span>
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-brand-navy">
                  {earlyBird.label}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display font-bold text-4xl text-brand-navy">
                    {earlyBird.formattedAmount}
                  </span>
                  <span className="text-xs text-brand-muted">/ person</span>
                </div>
              </div>

              {/* Features list */}
              {earlyBird.features && (
                <ul className="space-y-1.5 text-xs text-brand-muted pt-1">
                  {earlyBird.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Coupon Strip */}
              {earlyBird.coupon && (
                <div className="border border-dashed border-brand-amber bg-amber-50/70 rounded-card p-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-brand-navy">
                      {earlyBird.coupon.copy}
                    </p>
                    <p className="text-xs font-mono font-bold text-brand-amber-hover">
                      Code: {earlyBird.coupon.code}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCoupon}
                    aria-label="Copy coupon code"
                    className="px-2.5 py-1 bg-white border border-brand-amber/50 rounded text-xs font-semibold text-brand-navy hover:bg-amber-100 transition-colors flex items-center gap-1"
                  >
                    {couponCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-brand-subtle" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div>
              <Button
                variant="amber"
                className="w-full"
                onClick={() => openRegisterModal('early-bird')}
              >
                {earlyBird.buttonText || 'Register Early Bird'}
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Regular Pass */}
        <Reveal delay={0.1}>
          <div className="relative bg-white rounded-panel border border-brand-border p-7 shadow-editorial flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {regular.badge && (
                  <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-xs font-bold uppercase tracking-wider">
                    {regular.badge}
                  </span>
                )}
                {regular.tier && (
                  <span className="text-xs font-mono text-brand-subtle">{regular.tier}</span>
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-brand-navy">
                  {regular.label}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display font-bold text-4xl text-brand-navy">
                    {regular.formattedAmount}
                  </span>
                  <span className="text-xs text-brand-muted">/ person</span>
                </div>
              </div>

              {regular.features && (
                <ul className="space-y-1.5 text-xs text-brand-muted pt-1">
                  {regular.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-slate-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              {regular.note && (
                <div className="p-2.5 bg-brand-page rounded-card border border-brand-border text-xs text-brand-muted">
                  {regular.note}
                </div>
              )}
            </div>

            <div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => openRegisterModal('regular')}
              >
                {regular.buttonText || 'Register Regular'}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
