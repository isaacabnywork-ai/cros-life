import React from 'react'
import { useModal } from '../../context/ModalContext'

export default function FloatingButton() {
  const { openRegisterModal } = useModal()

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={() => openRegisterModal('early-bird')}
        aria-label="Open Event Info and Rates modal"
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-brand-amber to-brand-amber-hover hover:from-brand-amber-hover hover:to-brand-amber text-brand-navy hover:text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-amber-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-amber"
      >
        {/* Subtle 1px Line Cross Glyph */}
        <span className="w-4 h-4 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current" stroke="currentColor" strokeWidth="0.5">
            <rect x="7" y="1" width="2" height="14" rx="0.5" />
            <rect x="2" y="4.5" width="12" height="2" rx="0.5" />
          </svg>
        </span>

        {/* Text Label: Hidden on very compact mobile, visible on sm+ */}
        <span className="hidden sm:inline font-display">Event Info & Rates</span>
        <span className="sm:hidden font-display">Rates</span>
      </button>
    </div>
  )
}
