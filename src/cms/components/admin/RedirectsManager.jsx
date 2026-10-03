import React, { useState } from 'react'
import { Plus, Trash2, GitFork, Check } from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { CmsInput, CmsSelect, CmsButton } from '../ui/CmsFormControls'

export function RedirectsManager() {
  const { redirects, saveRedirect, deleteRedirect } = useCms()
  const [modalOpen, setModalOpen] = useState(false)
  const [sourceUrl, setSourceUrl] = useState('')
  const [targetUrl, setTargetUrl] = useState('')
  const [statusCode, setStatusCode] = useState(301)
  const [savedNotice, setSavedNotice] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!sourceUrl.trim() || !targetUrl.trim()) return

    await saveRedirect({
      id: `redir-${Date.now()}`,
      source_url: sourceUrl.trim(),
      target_url: targetUrl.trim(),
      status_code: Number(statusCode),
      enabled: true,
    })

    setModalOpen(false)
    setSourceUrl('')
    setTargetUrl('')
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this URL redirect rule?')) {
      await deleteRedirect(id)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <GitFork className="w-6 h-6 text-brand-blue" />
            <span>URL Redirects (301 / 302)</span>
          </h1>
          <p className="text-xs text-slate-500">
            Ensure legacy links and modified page slugs smoothly point visitors to new destinations without 404 errors.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Redirect</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Redirect created and active.</span>
        </div>
      )}

      {/* Redirects Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">Source URL (Incoming)</th>
                <th className="py-3 px-4">Target Destination</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-700">
              {redirects.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-semibold text-slate-900">{r.source_url}</td>
                  <td className="py-3 px-4 text-brand-blue">{r.target_url}</td>
                  <td className="py-3 px-4 font-sans">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-bold text-[10px]">
                      {r.status_code} {r.status_code === 301 ? 'Permanent' : 'Temporary'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <button
                      type="button"
                      onClick={() => handleDelete(r.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete Redirect"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {redirects.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400 font-sans">
                    No custom redirects configured yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Redirect Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-panel shadow-panel border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">Add Redirect</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <CmsInput
                label="Source URL (Old Path)"
                value={sourceUrl}
                onChange={setSourceUrl}
                placeholder="e.g. /register-now or /about-us"
                required
              />

              <CmsInput
                label="Target URL (New Destination)"
                value={targetUrl}
                onChange={setTargetUrl}
                placeholder="e.g. /#pricing or /statement-of-faith"
                required
              />

              <CmsSelect
                label="Redirect Type"
                value={statusCode}
                options={[
                  { label: '301 - Permanent Redirect', value: 301 },
                  { label: '302 - Temporary Redirect', value: 302 },
                ]}
                onChange={setStatusCode}
              />

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <CmsButton variant="primary" type="submit">
                  Save Redirect
                </CmsButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
