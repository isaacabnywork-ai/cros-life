import React from 'react'
import { useCms } from '../cms/context/CmsContext'
import SectionRenderer from '../cms/components/sections/SectionRenderer'
import SEO from '../components/ui/SEO'

export default function Home() {
  const { getPage, getSections } = useCms()
  const page = getPage('/') || getPage('page-home')
  const sections = page ? getSections(page.id) : []

  return (
    <div className="bg-brand-page text-brand-text">
      <SEO
        title={page?.seo?.title || 'One Life | Gospel-Centred Youth Conference'}
        description={
          page?.seo?.description ||
          'CrossLife is a Gospel-centred youth conference for men and women aged 18 to 25. 14-16 September 2027 in Hyderabad, Telangana.'
        }
      />

      {/* Render Dynamic Ordered CMS Sections */}
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  )
}
