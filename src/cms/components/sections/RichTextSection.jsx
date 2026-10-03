import React from 'react'
import Reveal from '../../../components/ui/Reveal'
import SectionHeading from '../../../components/ui/SectionHeading'

export default function RichTextSection({ data = {} }) {
  const {
    kicker = '',
    title = '',
    subtitle = '',
    content = '',
    paragraphs = [],
    maxWidth = 'max-w-4xl',
  } = data

  const bodyParagraphs = paragraphs.length > 0 ? paragraphs : content ? [content] : []

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        {(title || kicker) && (
          <div className="mb-10 max-w-3xl">
            <SectionHeading kicker={kicker} title={title} subtitle={subtitle} />
            <div className="w-16 h-0.5 bg-brand-amber mt-4" />
          </div>
        )}

        <div className={`${maxWidth} mx-auto space-y-6 text-brand-text text-base sm:text-lg leading-relaxed`}>
          {bodyParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
