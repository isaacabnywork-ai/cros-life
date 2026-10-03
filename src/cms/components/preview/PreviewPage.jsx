import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Eye, ArrowLeft, Check, Globe } from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import SectionRenderer from '../sections/SectionRenderer'
import SEO from '../../../components/ui/SEO'

export default function PreviewPage() {
  const { pageId } = useParams()
  const { getPage, getSections, savePage } = useCms()
  const [page, setPage] = useState(null)
  const [sections, setSections] = useState([])
  const [publishedNotice, setPublishedNotice] = useState(false)

  useEffect(() => {
    const p = getPage(pageId)
    if (p) setPage(p)
    const secs = getSections(pageId)
    setSections(secs)
  }, [pageId, getPage, getSections])

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-slate-500">
        <p>Loading preview for page {pageId}...</p>
      </div>
    )
  }

  const handlePublishFromPreview = async () => {
    await savePage({
      ...page,
      status: 'published',
      published_at: new Date().toISOString(),
    })
    setPublishedNotice(true)
    setTimeout(() => setPublishedNotice(false), 3000)
  }

  return (
    <div className="min-h-screen bg-brand-page text-brand-text">
      {/* Floating Preview Banner */}
      <div className="fixed top-0 inset-x-0 z-50 bg-slate-950/90 text-white backdrop-blur-md px-4 py-2 border-b border-amber-500/50 flex flex-wrap items-center justify-between gap-3 shadow-panel text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-bold text-amber-400 uppercase tracking-widest text-[10px]">
            Preview Mode
          </span>
          <span className="text-slate-300">
            Viewing: <strong>{page.title}</strong> ({page.status})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {publishedNotice && (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold mr-2">
              <Check className="w-3.5 h-3.5" />
              <span>Published Live!</span>
            </span>
          )}

          <Link
            to={`/admin/pages/edit/${page.id}`}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Editor</span>
          </Link>

          {page.status !== 'published' && (
            <button
              type="button"
              onClick={handlePublishFromPreview}
              className="inline-flex items-center gap-1 px-3 py-1 bg-brand-amber hover:bg-brand-amber-hover text-brand-navy rounded font-bold text-xs transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>Publish Now</span>
            </button>
          )}
        </div>
      </div>

      <div className="pt-10">
        <SEO
          title={`[PREVIEW] ${page.seo?.title || page.title}`}
          description={page.seo?.description || ''}
        />

        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} isPreview={true} />
        ))}

        {sections.length === 0 && (
          <div className="py-24 text-center text-slate-400 text-sm">
            This page has no sections configured yet.
          </div>
        )}
      </div>
    </div>
  )
}
