import React, { useState } from 'react'
import { FAQS } from '../data/faqs'
import SEO from '../components/ui/SEO'
import SectionHeading from '../components/ui/SectionHeading'
import Accordion from '../components/ui/Accordion'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(FAQS.map((item) => item.category))]

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter((item) => item.category === selectedCategory)

  return (
    <div className="bg-brand-page min-h-screen pt-28 pb-24">
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about CrossLife conference registration, travel, lodging, and schedule."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-12 pt-8">
          <SectionHeading
            kicker="QUESTIONS & LOGISTICS"
            title="Frequently Asked Questions"
            subtitle="Details regarding eligibility, registration tiers, venue accommodation, and conference preparation."
          />
          <div className="w-16 h-0.5 bg-brand-amber mt-6" />
        </div>

        {/* Category Filter Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-brand-border">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-btn text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedCategory === category
                  ? 'bg-brand-navy text-white shadow-editorial'
                  : 'bg-white text-brand-muted hover:text-brand-navy border border-brand-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Accordion Component */}
        <Reveal>
          <div className="bg-white p-8 sm:p-10 rounded-panel border border-brand-border shadow-panel">
            <Accordion items={filteredFaqs} allowMultiple />
          </div>
        </Reveal>

        {/* Bottom Contact Prompt */}
        <div className="mt-16 p-8 bg-brand-ice/60 rounded-panel border border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg text-brand-navy">
              Have an unlisted logistical question?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted">
              Our administrative and hospitality team in Hyderabad is ready to assist you.
            </p>
          </div>
          <Button variant="primary" to="/contact">
            Write to the Team
          </Button>
        </div>
      </div>
    </div>
  )
}
