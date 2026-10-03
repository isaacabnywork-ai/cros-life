import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'
import Accordion from '../../../components/ui/Accordion'

export default function FAQPreviewSection({ data = {} }) {
  const {
    kicker = 'COMMON QUESTIONS',
    title = 'Frequently Asked Questions',
    viewAllText = 'View All FAQs',
    viewAllLink = '/faq',
    items = [],
  } = data

  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            {kicker && (
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
                {kicker}
              </span>
            )}
            <h2 className="font-display font-bold text-display-md text-brand-navy">
              {title}
            </h2>
          </div>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-navy inline-flex items-center gap-1"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          )}
        </div>
      </Reveal>

      <Accordion items={items} />
    </section>
  )
}
