import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'
import SectionHeading from '../../../components/ui/SectionHeading'

export default function CardsSection({ data = {} }) {
  const {
    kicker = '',
    title = 'Features',
    subtitle = '',
    columns = 3,
    cards = [],
  } = data

  const colClass =
    columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
      ? 'sm:grid-cols-2'
      : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        {(title || kicker) && (
          <div className="mb-12 max-w-2xl">
            <SectionHeading kicker={kicker} title={title} subtitle={subtitle} />
            <div className="w-16 h-0.5 bg-brand-amber mt-4" />
          </div>
        )}

        <div className={`grid grid-cols-1 ${colClass} gap-6`}>
          {cards.map((card, idx) => (
            <div
              key={card.title || idx}
              className="p-6 bg-white rounded-panel border border-brand-border shadow-editorial hover:shadow-panel transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {card.image && (
                  <div className="aspect-video w-full rounded-card overflow-hidden bg-brand-ice mb-3">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  </div>
                )}
                {card.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-ice text-brand-blue border border-brand-border">
                    {card.badge}
                  </span>
                )}
                <h3 className="font-display font-bold text-xl text-brand-navy">
                  {card.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {card.description}
                </p>
              </div>

              {card.link && card.linkText && (
                <div className="pt-2">
                  <Link
                    to={card.link}
                    className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-navy inline-flex items-center gap-1"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
