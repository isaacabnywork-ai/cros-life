import React, { useState } from 'react'
import { X, Check, Copy } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import { useModalTrap } from '../../hooks/useModalTrap'
import { SITE_CONFIG } from '../../config/site'

export default function RegisterModal() {
  const { isOpen, closeRegisterModal, selectedPlan, setSelectedPlan } = useModal()
  const modalRef = useModalTrap(isOpen, closeRegisterModal)
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SITE_CONFIG.pricing.coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleProceed = () => {
    // Redirects to centralized registration gateway URL
    window.open(SITE_CONFIG.REGISTER_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-brand-navy/70 backdrop-blur-sm transition-opacity"
        onClick={closeRegisterModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-white rounded-panel border border-brand-border shadow-modal overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Bar */}
        <div className="bg-brand-ice/80 border-b border-brand-border p-6 flex items-start justify-between">
          <div className="space-y-1">
            {/* Logo and Event Identity */}
            <div className="flex items-center gap-2">
              <img
                src="/images/crosslife-logo.webp"
                alt="CrossLife"
                className="h-7 w-auto object-contain"
              />
            </div>
            <h2 id="modal-title" className="font-display font-semibold text-xl text-brand-navy">
              Event Info and Rates
            </h2>
            <p className="text-xs uppercase tracking-wider font-semibold text-brand-muted">
              {SITE_CONFIG.targetAudience}
            </p>
          </div>

          <button
            type="button"
            onClick={closeRegisterModal}
            aria-label="Close dialog"
            className="p-2 rounded-btn text-brand-muted hover:text-brand-navy hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[calc(85vh-140px)] overflow-y-auto">
          {/* Schedule & Dates Ribbon */}
          <div className="grid grid-cols-2 gap-3 bg-brand-page p-3.5 rounded-card border border-brand-border text-xs">
            <div>
              <span className="text-brand-subtle block font-semibold uppercase tracking-wider text-[10px]">
                Schedule
              </span>
              <span className="font-bold text-brand-navy">{SITE_CONFIG.days}</span>
            </div>
            <div>
              <span className="text-brand-subtle block font-semibold uppercase tracking-wider text-[10px]">
                Event Dates
              </span>
              <span className="font-bold text-brand-navy">{SITE_CONFIG.dates}</span>
            </div>
          </div>

          {/* Pricing Options Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text">
              Select Registration Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Early Bird Option */}
              <button
                type="button"
                onClick={() => setSelectedPlan('early-bird')}
                className={`relative text-left p-4 rounded-card border-2 transition-all ${
                  selectedPlan === 'early-bird'
                    ? 'border-brand-navy bg-brand-ice/40 shadow-sm'
                    : 'border-brand-border bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                    {SITE_CONFIG.pricing.earlyBird.label}
                  </span>
                  {selectedPlan === 'early-bird' && (
                    <span className="w-4 h-4 rounded-full bg-brand-navy text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </span>
                  )}
                </div>
                <div className="font-display text-2xl font-bold text-brand-navy">
                  {SITE_CONFIG.pricing.earlyBird.formattedAmount}
                </div>
                <div className="text-[11px] text-brand-muted mt-1 leading-snug">
                  {SITE_CONFIG.pricing.earlyBird.description}
                </div>
              </button>

              {/* Regular Option */}
              <button
                type="button"
                onClick={() => setSelectedPlan('regular')}
                className={`relative text-left p-4 rounded-card border-2 transition-all ${
                  selectedPlan === 'regular'
                    ? 'border-brand-navy bg-brand-ice/40 shadow-sm'
                    : 'border-brand-border bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                    {SITE_CONFIG.pricing.regular.label}
                  </span>
                  {selectedPlan === 'regular' && (
                    <span className="w-4 h-4 rounded-full bg-brand-navy text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </span>
                  )}
                </div>
                <div className="font-display text-2xl font-bold text-brand-navy">
                  {SITE_CONFIG.pricing.regular.formattedAmount}
                </div>
                <div className="text-[11px] text-brand-muted mt-1 leading-snug">
                  {SITE_CONFIG.pricing.regular.description}
                </div>
              </button>
            </div>
          </div>

          {/* Coupon Strip */}
          <div className="rounded-card border border-dashed border-brand-amber bg-amber-50/50 p-3.5 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-brand-navy">
                Save ₹500 on Early Bird! Use code at checkout
              </p>
              <p className="text-[11px] font-mono tracking-wider font-semibold text-brand-amber-hover">
                Code: {SITE_CONFIG.pricing.coupon.code}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              aria-label="Copy coupon code"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-amber/40 hover:border-brand-amber text-xs font-semibold rounded text-brand-navy transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-brand-subtle" strokeWidth={1.5} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Free Book Row */}
          <div className="flex items-center gap-4 bg-brand-ice/60 p-4 rounded-card border border-brand-border">
            <div className="w-14 h-20 shrink-0 bg-brand-navy rounded overflow-hidden shadow-editorial border border-brand-navy">
              <svg viewBox="0 0 100 140" className="w-full h-full" fill="none">
                <rect width="100" height="140" fill="#0B2545" />
                <rect x="10" y="10" width="80" height="120" stroke="#1E4B82" strokeWidth="1" fill="none" />
                <text x="50" y="55" fontFamily="'Sora', sans-serif" fontWeight="700" fontSize="11" fill="#FAFBFD" textAnchor="middle">
                  DON'T
                </text>
                <text x="50" y="70" fontFamily="'Sora', sans-serif" fontWeight="700" fontSize="11" fill="#FAFBFD" textAnchor="middle">
                  WASTE
                </text>
                <text x="50" y="85" fontFamily="'Sora', sans-serif" fontWeight="700" fontSize="11" fill="#FAFBFD" textAnchor="middle">
                  YOUR LIFE
                </text>
                <line x1="35" y1="95" x2="65" y2="95" stroke="#F59E0B" strokeWidth="1" />
                <text x="50" y="115" fontFamily="'Raleway', sans-serif" fontWeight="600" fontSize="7" fill="#CBD5E1" textAnchor="middle">
                  JOHN PIPER
                </text>
              </svg>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-blue block">
                Complimentary Gift
              </span>
              <p className="text-xs sm:text-sm font-semibold text-brand-navy leading-snug">
                Register now and receive your free copy of "{SITE_CONFIG.giftBook.title}" by {SITE_CONFIG.giftBook.author}.
              </p>
              <p className="text-[11px] text-brand-muted">
                Handed to all registered participants upon on-site check-in.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-brand-page border-t border-brand-border">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-blue text-white py-3.5 px-6 rounded-btn font-display font-semibold text-sm transition-colors shadow-editorial focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-navy"
          >
            <span>Register Now and Claim Gift</span>
          </button>
        </div>
      </div>
    </div>
  )
}
