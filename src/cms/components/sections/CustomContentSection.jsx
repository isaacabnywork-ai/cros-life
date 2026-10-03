import React from 'react'
import { sanitizeHtml } from '../../utils/sanitizer'
import Reveal from '../../../components/ui/Reveal'

export default function CustomContentSection({ data = {} }) {
  const { title = '', html = '' } = data
  const safeHtml = sanitizeHtml(html)

  if (!safeHtml) return null

  return (
    <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        {title && (
          <h2 className="font-display font-bold text-display-md text-brand-navy mb-6">
            {title}
          </h2>
        )}
        <div
          className="prose prose-slate max-w-none text-brand-text"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </Reveal>
    </section>
  )
}
