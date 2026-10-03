import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  Copy,
  Trash2,
  ExternalLink,
  Edit2,
  FileText,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { slugify } from '../../utils/slugify'
import * as cmsStore from '../../services/cmsStore'

export function PagesList() {
  const navigate = useNavigate()
  const { pages, trashPage, restorePage, deletePagePermanently, duplicatePage, savePage } = useCms()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [newPageModalOpen, setNewPageModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSlug, setNewSlug] = useState('')

  // Include trashed if on trash tab
  const allStoredPages = cmsStore.getPages(true)

  const filteredPages = allStoredPages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())

    if (!matchesSearch) return false

    if (statusFilter === 'all') return p.status !== 'trash'
    if (statusFilter === 'trash') return p.status === 'trash'
    return p.status === statusFilter
  })

  const handleCreatePage = async (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const slug = newSlug.trim() ? (newSlug.startsWith('/') ? newSlug : '/' + newSlug) : '/' + slugify(newTitle)
    const newPage = {
      id: `page-${Date.now()}`,
      title: newTitle.trim(),
      slug,
      status: 'draft',
      featured_image: '',
      seo: {
        title: `${newTitle.trim()} | CrossLife`,
        description: '',
      },
    }

    await savePage(newPage)
    setNewPageModalOpen(false)
    setNewTitle('')
    setNewSlug('')
    navigate(`/admin/pages/edit/${newPage.id}`)
  }

  const handleTrash = async (id, title) => {
    if (window.confirm(`Move page "${title}" to Trash?`)) {
      await trashPage(id)
    }
  }

  const handleRestore = async (id) => {
    await restorePage(id)
  }

  const handleDeletePermanent = async (id, title) => {
    if (window.confirm(`Permanently delete page "${title}"? This cannot be undone.`)) {
      await deletePagePermanently(id)
    }
  }

  const handleDuplicate = async (id) => {
    const dup = await duplicatePage(id)
    if (dup) {
      navigate(`/admin/pages/edit/${dup.id}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Pages</h1>
          <p className="text-xs text-slate-500">
            Create, configure, and manage all pages and their component sections.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setNewPageModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Page</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg border border-slate-200">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1">
          {['all', 'published', 'draft', 'trash'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                statusFilter === tab
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pages by title or slug..."
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-brand-blue"
          />
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Sections</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPages.map((p) => {
                const sectionCount = cmsStore.getSectionsByPageId(p.id).length
                const isTrash = p.status === 'trash'

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <Link
                            to={`/admin/pages/edit/${p.id}`}
                            className="font-semibold text-slate-900 hover:text-brand-blue"
                          >
                            {p.title}
                          </Link>
                          <span className="block text-[11px] text-slate-400 font-mono">
                            {p.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          p.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'trash'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px]">
                      {sectionCount} {sectionCount === 1 ? 'section' : 'sections'}
                    </td>

                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {new Date(p.updated_at || p.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!isTrash ? (
                          <>
                            <Link
                              to={`/admin/pages/edit/${p.id}`}
                              className="p-1 rounded text-slate-600 hover:bg-slate-100 hover:text-brand-blue"
                              title="Edit Page"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Link>

                            <a
                              href={`/preview/${p.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded text-slate-600 hover:bg-slate-100 hover:text-brand-blue"
                              title="Preview Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            <button
                              type="button"
                              onClick={() => handleDuplicate(p.id)}
                              className="p-1 rounded text-slate-600 hover:bg-slate-100 hover:text-brand-blue"
                              title="Duplicate Page"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            {p.id !== 'page-home' && (
                              <button
                                type="button"
                                onClick={() => handleTrash(p.id, p.title)}
                                className="p-1 rounded text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                                title="Move to Trash"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleRestore(p.id)}
                              className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-xs font-semibold mr-2"
                              title="Restore Page"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Restore</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeletePermanent(p.id, p.title)}
                              className="inline-flex items-center gap-1 text-rose-600 hover:underline text-xs font-semibold"
                              title="Permanently Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete Permanently</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}

              {filteredPages.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    No pages found matching the filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Page Modal */}
      {newPageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-panel shadow-panel border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">Create New Page</h3>

            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Page Title</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value)
                    setNewSlug('/' + slugify(e.target.value))
                  }}
                  placeholder="e.g. Conference Schedule"
                  className="w-full text-xs rounded border border-slate-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="/schedule"
                  className="w-full text-xs rounded border border-slate-300 px-3 py-2 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setNewPageModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white rounded text-xs font-semibold"
                >
                  Create & Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
