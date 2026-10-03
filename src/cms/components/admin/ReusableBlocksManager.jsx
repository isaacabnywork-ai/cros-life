import React, { useState } from 'react'
import { Plus, Trash2, Edit2, Layers, Check } from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { CmsInput, CmsSelect, CmsButton } from '../ui/CmsFormControls'

export function ReusableBlocksManager() {
  const { reusableBlocks, saveReusableBlock, deleteReusableBlock } = useCms()
  const [editingBlock, setEditingBlock] = useState(null)
  const [savedNotice, setSavedNotice] = useState(false)

  const handleCreateNew = () => {
    setEditingBlock({
      id: `block-${Date.now()}`,
      name: 'New Reusable Block',
      type: 'final_cta',
      data: {
        kicker: 'ANNOUNCEMENT',
        headline: 'Block Headline',
        subtext: 'Description here',
        primaryButton: { text: 'Register Now', link: '#pricing' },
        secondaryButton: { text: 'Contact Us', link: '/contact' },
      },
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!editingBlock) return
    await saveReusableBlock(editingBlock)
    setEditingBlock(null)
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete reusable block "${name}"?`)) {
      await deleteReusableBlock(id)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-brand-blue" />
            <span>Reusable Content Blocks</span>
          </h1>
          <p className="text-xs text-slate-500">
            Define global call-to-actions, promo cards, and announcements to embed and synchronize across multiple pages.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Reusable Block</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Reusable block saved successfully. All instances across pages are synchronized.</span>
        </div>
      )}

      {/* Blocks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reusableBlocks.map((block) => (
          <div
            key={block.id}
            className="p-5 bg-white rounded-panel border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-ice text-brand-blue border border-brand-border">
                  {block.type}
                </span>
                <span className="text-[11px] font-mono text-slate-400">#{block.id}</span>
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">{block.name}</h3>
              <p className="text-xs text-slate-500">
                {block.data?.headline || block.data?.title || 'Configured block data'}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setEditingBlock(JSON.parse(JSON.stringify(block)))}
                className="inline-flex items-center gap-1 text-brand-blue font-semibold hover:underline"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Block</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(block.id, block.name)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Delete Block"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {reusableBlocks.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 text-xs">
            No reusable blocks created yet.
          </div>
        )}
      </div>

      {/* Edit Drawer / Modal */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-panel shadow-panel border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">
              Edit Reusable Block
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <CmsInput
                label="Block Name"
                value={editingBlock.name}
                onChange={(v) => setEditingBlock({ ...editingBlock, name: v })}
                required
              />

              <CmsSelect
                label="Block Type"
                value={editingBlock.type}
                options={[
                  { label: 'Final CTA Band', value: 'final_cta' },
                  { label: 'Free Book Feature', value: 'book_feature' },
                  { label: 'Rich Text Snippet', value: 'rich_text' },
                ]}
                onChange={(v) => setEditingBlock({ ...editingBlock, type: v })}
              />

              {editingBlock.type === 'final_cta' && (
                <div className="space-y-3 pt-2">
                  <CmsInput
                    label="Kicker Notice"
                    value={editingBlock.data?.kicker || ''}
                    onChange={(v) =>
                      setEditingBlock({
                        ...editingBlock,
                        data: { ...editingBlock.data, kicker: v },
                      })
                    }
                  />
                  <CmsInput
                    label="Headline"
                    value={editingBlock.data?.headline || ''}
                    onChange={(v) =>
                      setEditingBlock({
                        ...editingBlock,
                        data: { ...editingBlock.data, headline: v },
                      })
                    }
                  />
                  <CmsInput
                    label="Subtext"
                    type="textarea"
                    rows={2}
                    value={editingBlock.data?.subtext || ''}
                    onChange={(v) =>
                      setEditingBlock({
                        ...editingBlock,
                        data: { ...editingBlock.data, subtext: v },
                      })
                    }
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingBlock(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <CmsButton variant="primary" type="submit">
                  Save Block
                </CmsButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
