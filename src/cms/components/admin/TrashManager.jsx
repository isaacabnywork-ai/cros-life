import React from 'react'
import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import * as cmsStore from '../../services/cmsStore'

export function TrashManager() {
  const { restorePage, deletePagePermanently } = useCms()
  const trashedPages = cmsStore.getPages(true).filter((p) => p.status === 'trash')

  const handleRestore = async (id) => {
    await restorePage(id)
  }

  const handleDeletePermanent = async (id, title) => {
    if (window.confirm(`Permanently delete "${title}"? This cannot be recovered.`)) {
      await deletePagePermanently(id)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-brand-blue" />
            <span>Trash & Deleted Content</span>
          </h1>
          <p className="text-xs text-slate-500">
            Recover deleted pages and components or permanently purge them from the database.
          </p>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3 text-xs text-amber-800">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
        <span>
          Items in Trash are removed from the live website. Restoring will return them as drafts.
        </span>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100 text-xs">
          {trashedPages.map((page) => (
            <div key={page.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">{page.title}</h4>
                <p className="text-slate-400 font-mono text-[11px]">Slug: {page.slug}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRestore(page.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeletePermanent(page.id, page.title)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Permanently</span>
                </button>
              </div>
            </div>
          ))}

          {trashedPages.length === 0 && (
            <div className="py-16 text-center text-slate-400 text-xs">
              Trash is empty. No deleted items found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
