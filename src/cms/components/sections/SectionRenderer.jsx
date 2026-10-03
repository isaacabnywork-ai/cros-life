import React from 'react'
import HeroSection from './HeroSection'
import QuickStatsSection from './QuickStatsSection'
import PillarsSection from './PillarsSection'
import VisionAudienceSection from './VisionAudienceSection'
import DifferenceSection from './DifferenceSection'
import GoalsSection from './GoalsSection'
import SpeakersSection from './SpeakersSection'
import PricingSection from './PricingSection'
import BookFeatureSection from './BookFeatureSection'
import BookstoreSection from './BookstoreSection'
import VenueSection from './VenueSection'
import OrganiserPartnersSection from './OrganiserPartnersSection'
import FAQPreviewSection from './FAQPreviewSection'
import FinalCTASection from './FinalCTASection'
import RichTextSection from './RichTextSection'
import CardsSection from './CardsSection'
import CustomContentSection from './CustomContentSection'
import ReusableBlockSection from './ReusableBlockSection'

// Section Component Registry
const SECTION_REGISTRY = {
  hero: HeroSection,
  quick_stats: QuickStatsSection,
  pillars: PillarsSection,
  vision_audience: VisionAudienceSection,
  difference: DifferenceSection,
  goals: GoalsSection,
  speakers: SpeakersSection,
  pricing: PricingSection,
  book_feature: BookFeatureSection,
  bookstore: BookstoreSection,
  venue: VenueSection,
  organiser_partners: OrganiserPartnersSection,
  faq_preview: FAQPreviewSection,
  final_cta: FinalCTASection,
  rich_text: RichTextSection,
  cards: CardsSection,
  custom_html: CustomContentSection,
  reusable_block: ReusableBlockSection,
}

export function getSectionComponent(type) {
  return SECTION_REGISTRY[type] || null
}

export default function SectionRenderer({ section, isPreview = false }) {
  if (!section) return null

  // 1. Status Check
  if (!isPreview && section.status !== 'published') {
    return null
  }

  // 2. Schedule Check
  if (!isPreview && section.schedule) {
    const now = Date.now()
    if (section.schedule.publish_from) {
      const fromTime = new Date(section.schedule.publish_from).getTime()
      if (now < fromTime) return null
    }
    if (section.schedule.publish_until) {
      const untilTime = new Date(section.schedule.publish_until).getTime()
      if (now > untilTime) return null
    }
  }

  // 3. Responsive Visibility Classes
  const { desktop = true, tablet = true, mobile = true } = section.visibility || {}

  // If hidden on all, do not render
  if (!desktop && !tablet && !mobile && !isPreview) {
    return null
  }

  let visibilityClass = ''
  if (!mobile && tablet && desktop) {
    visibilityClass = 'hidden sm:block'
  } else if (!mobile && !tablet && desktop) {
    visibilityClass = 'hidden lg:block'
  } else if (mobile && !tablet && desktop) {
    visibilityClass = 'sm:max-lg:hidden'
  } else if (mobile && !tablet && !desktop) {
    visibilityClass = 'block sm:hidden'
  } else if (mobile && tablet && !desktop) {
    visibilityClass = 'block lg:hidden'
  } else if (!mobile && tablet && !desktop) {
    visibilityClass = 'hidden sm:block lg:hidden'
  }

  const Component = getSectionComponent(section.type)

  if (!Component) {
    console.warn(`CMS Section type "${section.type}" has no registered component.`)
    return isPreview ? (
      <div className="p-4 bg-amber-50 border border-amber-200 text-xs text-amber-800 text-center my-2">
        Unregistered section type: <strong>{section.type}</strong>
      </div>
    ) : null
  }

  return (
    <div
      data-section-id={section.id}
      data-section-type={section.type}
      className={visibilityClass}
    >
      <Component data={section.data || {}} />
    </div>
  )
}
