import React, { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useCms } from '../../context/CmsContext'
import SectionRenderer from '../sections/SectionRenderer'
import SEO from '../../../components/ui/SEO'
import NotFound from '../../../pages/NotFound'
import * as cmsStore from '../../services/cmsStore'

export default function CmsDynamicPage({ fixedSlug = null }) {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getPage, getSections } = useCms()

  const currentPath = fixedSlug || params.slug ? (fixedSlug || '/' + params.slug) : location.pathname

  // 1. Check Redirects
  useEffect(() => {
    const matched = cmsStore.matchRedirect(location.pathname)
    if (matched && matched.target_url) {
      const target = matched.target_url.trim()
      if (target.startsWith('https://') || target.startsWith('http://')) {
        window.location.href = target
      } else if (target.startsWith('/') || target.startsWith('#')) {
        navigate(target, { replace: true })
      }
    }
  }, [location.pathname, navigate])

  const page = getPage(currentPath)

  if (!page || page.status !== 'published') {
    return <NotFound />
  }

  const sections = getSections(page.id)

  return (
    <div className="bg-brand-page text-brand-text">
      <SEO
        title={page.seo?.title || page.title}
        description={page.seo?.description || ''}
      />

      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  )
}
