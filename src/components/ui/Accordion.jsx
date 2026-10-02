import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ items, allowMultiple = false, className = '' }) {
  const [openIndices, setOpenIndices] = useState([0]) // Default first item open

  const toggleIndex = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className={`divide-y divide-brand-border border-y border-brand-border ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index)
        const headingId = `faq-heading-${item.id || index}`
        const panelId = `faq-panel-${item.id || index}`

        return (
          <div key={item.id || index} className="py-5 group">
            <h3>
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded py-1"
              >
                <span className="font-display font-semibold text-base sm:text-lg text-brand-navy group-hover:text-brand-blue transition-colors">
                  {item.question}
                </span>
                <span
                  className={`w-7 h-7 rounded-full bg-brand-ice flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-brand-navy text-white' : 'text-brand-navy'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                className="pt-3 pb-1 text-sm sm:text-base text-brand-muted leading-relaxed"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
