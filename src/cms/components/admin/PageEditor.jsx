import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Save,
  Globe,
  ExternalLink,
  History,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calendar,
} from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { SectionBuilder } from './SectionBuilder'
import { CmsInput, CmsSelect, CmsButton } from '../ui/CmsFormControls'
import { CmsImageField } from '../ui/CmsImageField'
import { slugify } from '../../utils/slugify'
import * as cmsStore from '../../services/cmsStore'

export function PageEditor({ defaultPageId = null }) {
  const params = useParams()
  const navigate = useNavigate()
  const pageId = defaultPageId || params.pageId || 'page-home'

  const {
    getPage,
    getSections,
    savePage,
    saveSection,
    deleteSection,
    duplicateSection,
    reorderSections,
    saveRedirect,
  } = useCms()

  const [page, setPage] = useState(null)
  const [sections, setSections] = useState([])
  const [seoOpen, setSeoOpen] = useState(false)
  const [revisionsOpen, setRevisionsOpen] = useState(false)
  const [revisions, setRevisions] = useState([])
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false)
  const [initialSlug, setInitialSlug] = useState('')

  // Load page and its sections
  useEffect(() => {
    const p = getPage(pageId)
    if (p) {
      setPage(JSON.parse(JSON.stringify(p)))
      setInitialSlug(p.slug)
    }
    const secs = getSections(pageId)
    setSections(secs)
  }, [pageId, getPage, getSections])

  if (!page) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>Loading page data or page not found...</p>
        <button
          onClick={() => navigate('/admin/pages')}
          className="mt-4 px-4 py-2 bg-slate-200 rounded text-xs font-semibold"
        >
          Return to Pages List
        </button>
      </div>
    )
  }

  const updatePageField = (key, val) => {
    setPage((prev) => ({ ...prev, [key]: val }))
  }

  const updateSeoField = (key, val) => {
    setPage((prev) => ({
      ...prev,
      seo: {
        ...(prev.seo || {}),
        [key]: val,
      },
    }))
  }

  const handleTitleChange = (newTitle) => {
    updatePageField('title', newTitle)
    // If slug is empty or default, suggest slug
    if (!page.slug || page.slug === '/' || page.slug === '') {
      if (page.id !== 'page-home') {
        updatePageField('slug', '/' + slugify(newTitle))
      }
    }
  }

  const handleSaveDraft = async () => {
    const updated = { ...page, status: 'draft' }
    await checkSlugRedirectAndSave(updated)
  }

  const handlePublish = async () => {
    const updated = {
      ...page,
      status: 'published',
      published_at: page.published_at || new Date().toISOString(),
    }
    await checkSlugRedirectAndSave(updated)
  }

  const checkSlugRedirectAndSave = async (pageData) => {
    // Check if slug changed
    if (initialSlug && initialSlug !== pageData.slug && initialSlug !== '/') {
      const confirmRedirect = window.confirm(
        `The page slug changed from "${initialSlug}" to "${pageData.slug}". Create an automatic 301 redirect?`
      )
      if (confirmRedirect) {
        await saveRedirect({
          source_url: initialSlug,
          target_url: pageData.slug,
          status_code: 301,
          enabled: true,
        })
      }
    }

    await savePage(pageData)
    setInitialSlug(pageData.slug)
    setSaveSuccessNotice(true)
    setTimeout(() => setSaveSuccessNotice(false), 3000)
  }

  const handleOpenRevisions = () => {
    const revs = cmsStore.getRevisions('page', page.id)
    setRevisions(revs)
    setRevisionsOpen(true)
  }

  const handleRestoreRevision = async (revId) => {
    if (window.confirm('Restore this previous version? Current unsaved edits will be replaced.')) {
      const restored = await cmsStore.restoreRevision(revId)
      if (restored) {
        setPage(restored.data)
        setRevisionsOpen(false)
        setSaveSuccessNotice(true)
        setTimeout(() => setSaveSuccessNotice(false), 3000)
      }
    }
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 bg-slate-100/90 backdrop-blur-md py-4 px-1 -mx-1 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/pages')}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600"
            title="Back to Pages"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-xl text-slate-900">
                {page.id === 'page-home' ? 'Edit Homepage' : `Edit: ${page.title}`}
              </h1>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                  page.status === 'published'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {page.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">Slug: {page.slug}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {saveSuccessNotice && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Saved!</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleOpenRevisions}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-xs font-semibold text-slate-700 shadow-xs"
            title="Revision History"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Revisions</span>
          </button>

          <a
            href={`/preview/${page.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-xs font-semibold text-slate-700 shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
            <span>Preview</span>
          </a>

          <CmsButton variant="outline" size="sm" onClick={handleSaveDraft}>
            Save Draft
          </CmsButton>

          <CmsButton variant="primary" size="sm" onClick={handlePublish}>
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Publish</span>
          </CmsButton>
        </div>
      </div>

      {/* Page Settings Card */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
          Page Settings
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CmsInput
            label="Page Title"
            value={page.title}
            onChange={handleTitleChange}
            required
          />

          <CmsInput
            label="Page Slug"
            value={page.slug}
            onChange={(v) => updatePageField('slug', v)}
            disabled={page.id === 'page-home'}
            description={page.id === 'page-home' ? 'Homepage slug is locked to /' : ''}
            required
          />

          <CmsSelect
            label="Publishing Status"
            value={page.status}
            options={[
              { label: 'Published (Live)', value: 'published' },
              { label: 'Draft', value: 'draft' },
              { label: 'Scheduled', value: 'scheduled' },
              { label: 'Archived', value: 'archived' },
            ]}
            onChange={(v) => updatePageField('status', v)}
          />
        </div>

        <CmsImageField
          label="Featured Image"
          value={page.featured_image}
          onChange={(v) => updatePageField('featured_image', v)}
          description="Default social share and header visual for this page."
        />
      </div>

      {/* Page Sections Builder */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs">
        <SectionBuilder
          sections={sections}
          pageId={page.id}
          onSaveSection={async (sec) => {
            await saveSection(sec)
            setSections(getSections(page.id))
          }}
          onDeleteSection={async (secId) => {
            await deleteSection(secId)
            setSections(getSections(page.id))
          }}
          onDuplicateSection={async (secId) => {
            await duplicateSection(secId)
            setSections(getSections(page.id))
          }}
          onReorderSections={async (pId, orderedIds) => {
            await reorderSections(pId, orderedIds)
            setSections(getSections(page.id))
          }}
        />
      </div>

      {/* SEO Accordion */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => setSeoOpen(!seoOpen)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-blue" />
            <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
              Search Engine Optimization (SEO) & Social Sharing
            </h3>
          </div>
          {seoOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {seoOpen && (
          <div className="p-6 border-t border-slate-200 space-y-4 bg-slate-50/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CmsInput
                label="SEO Meta Title"
                value={page.seo?.title}
                onChange={(v) => updateSeoField('title', v)}
                placeholder="Page Title | CrossLife"
              />
              <CmsInput
                label="Canonical URL"
                value={page.seo?.canonical}
                onChange={(v) => updateSeoField('canonical', v)}
                placeholder="https://crosslife.in/..."
              />
            </div>

            <CmsInput
              label="Meta Description"
              type="textarea"
              rows={2}
              value={page.seo?.description}
              onChange={(v) => updateSeoField('description', v)}
              placeholder="150-160 characters summarizing the page for search engine results."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <CmsInput
                label="Open Graph (OG) Title"
                value={page.seo?.ogTitle}
                onChange={(v) => updateSeoField('ogTitle', v)}
                placeholder="Social media title"
              />
              <CmsInput
                label="Twitter Card Title"
                value={page.seo?.twitterTitle}
                onChange={(v) => updateSeoField('twitterTitle', v)}
                placeholder="Twitter title"
              />
            </div>

            <CmsImageField
              label="Social Sharing Image (OG / Twitter)"
              value={page.seo?.ogImage}
              onChange={(v) => updateSeoField('ogImage', v)}
            />
          </div>
        )}
      </div>

      {/* Revision History Modal */}
      {revisionsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-panel shadow-panel border border-slate-200 w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-brand-blue" />
                <h3 className="font-display font-bold text-sm text-slate-900">
                  Revision History: {page.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRevisionsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3 flex-1">
              {revisions.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-slate-800">
                      {new Date(rev.created_at).toLocaleString()}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      By {rev.author} • {rev.note || 'Snapshot'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRestoreRevision(rev.id)}
                    className="px-3 py-1 bg-white border border-slate-300 hover:bg-brand-ice hover:text-brand-blue rounded text-xs font-semibold text-slate-700"
                  >
                    Restore
                  </button>
                </div>
              ))}

              {revisions.length === 0 && (
                <p className="py-8 text-center text-xs text-slate-400">
                  No revisions saved for this page yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
