import React from 'react'

export default function CrossDivider({ className = '', light = false }) {
  const strokeColor = light ? 'stroke-white/30' : 'stroke-brand-border'
  const crossColor = light ? 'stroke-brand-amber' : 'stroke-brand-blue'

  return (
    <div className={`relative flex items-center justify-center my-8 ${className}`} aria-hidden="true">
      <div className={`w-full h-px ${light ? 'bg-white/15' : 'bg-brand-border'}`} />
      
      {/* 1px Cross Motif in the Center */}
      <div className="absolute px-4 bg-inherit flex items-center justify-center">
        <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
          <line x1="10" y1="2" x2="10" y2="18" className={crossColor} strokeWidth="1" strokeLinecap="square" />
          <line x1="4" y1="8" x2="16" y2="8" className={crossColor} strokeWidth="1" strokeLinecap="square" />
        </svg>
      </div>
    </div>
  )
}
