import React from 'react'
import { STATEMENT_OF_FAITH } from '../data/statementOfFaith'
import SEO from '../components/ui/SEO'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'

export default function StatementOfFaith() {
  return (
    <div className="bg-brand-page min-h-screen pt-28 pb-24">
      <SEO
        title="Statement of Faith"
        description="The doctrinal convictions and Statement of Faith undergirding CrossLife and Equip Indian Churches."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pt-8">
          <SectionHeading
            kicker="DOCTRINAL FOUNDATION"
            title="Statement of Faith"
            subtitle="The historic evangelical and reformed convictions that undergird CrossLife and the ministry of Equip Indian Churches."
          />
          <div className="w-16 h-0.5 bg-brand-amber mt-6" />
        </div>

        {/* Layout: Sticky Desktop Table of Contents + Reading Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4 bg-brand-ice/50 p-6 rounded-panel border border-brand-border">
            <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-brand-blue block">
              TABLE OF CONTENTS
            </span>
            <nav className="space-y-2" aria-label="Statement of Faith Navigation">
              {STATEMENT_OF_FAITH.map((article) => (
                <a
                  key={article.id}
                  href={`#${article.id}`}
                  className="block text-xs font-semibold text-brand-muted hover:text-brand-navy hover:underline transition-colors leading-snug py-1"
                >
                  {article.heading}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-brand-border text-[11px] text-brand-subtle">
              Click an article above to jump directly to its doctrinal confession.
            </div>
          </aside>

          {/* Long-Form Reading Layout (max-w-reading ~ 720px) */}
          <article className="lg:col-span-8 max-w-reading space-y-16">
            {STATEMENT_OF_FAITH.map((article, index) => (
              <Reveal key={article.id} delay={index * 0.04}>
                <section
                  id={article.id}
                  className="scroll-mt-32 space-y-4 pb-12 border-b border-brand-border last:border-b-0"
                >
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight">
                    {article.heading}
                  </h2>
                  <div className="space-y-4 text-brand-text text-base sm:text-lg leading-[1.8] font-normal">
                    {article.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </article>
        </div>
      </div>
    </div>
  )
}
