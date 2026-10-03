import React from 'react'
import { useCms } from '../../context/CmsContext'
import FinalCTASection from './FinalCTASection'
import BookFeatureSection from './BookFeatureSection'
import RichTextSection from './RichTextSection'
import CardsSection from './CardsSection'

export default function ReusableBlockSection({ data = {} }) {
  const { getBlock } = useCms()
  const block = getBlock(data.block_id)

  if (!block) {
    return (
      <div className="py-8 text-center text-xs text-brand-muted bg-brand-ice/50 border border-brand-border mx-auto max-w-4xl my-4 rounded">
        Reusable Block #{data.block_id || 'unknown'} (not found)
      </div>
    )
  }

  switch (block.type) {
    case 'final_cta':
      return <FinalCTASection data={block.data} />
    case 'book_feature':
      return <BookFeatureSection data={block.data} />
    case 'rich_text':
      return <RichTextSection data={block.data} />
    case 'cards':
      return <CardsSection data={block.data} />
    default:
      return null
  }
}
