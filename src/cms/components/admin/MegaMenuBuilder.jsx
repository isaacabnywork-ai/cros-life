import React, { useState } from 'react'
import { Save, Check, Plus, Trash2, LayoutGrid } from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { CmsInput, CmsToggle, CmsButton } from '../ui/CmsFormControls'
import { CmsImageField } from '../ui/CmsImageField'

export function MegaMenuBuilder() {
  const { megaMenus, saveMegaMenu } = useCms()
  const [selectedId, setSelectedId] = useState(megaMenus[0]?.id || '')
  const [savedNotice, setSavedNotice] = useState(false)

  const activeMega = megaMenus.find((m) => m.id === selectedId) || megaMenus[0]
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(activeMega || {})))

  const handleSelectMega = (id) => {
    setSelectedId(id)
    const target = megaMenus.find((m) => m.id === id)
    if (target) {
      setFormData(JSON.parse(JSON.stringify(target)))
    }
  }

  const handleSave = async () => {
    await saveMegaMenu(formData)
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  const handleAddColumn = () => {
    const newCol = {
      id: `col-${Date.now()}`,
      heading: 'New Column',
      items: [
        { label: 'Example Link', href: '/', description: 'Brief description of link' },
      ],
    }
    setFormData({
      ...formData,
      columns: [...(formData.columns || []), newCol],
    })
  }

  const handleDeleteColumn = (colIndex) => {
    setFormData({
      ...formData,
      columns: formData.columns.filter((_, i) => i !== colIndex),
    })
  }

  const handleUpdateColumnHeading = (colIndex, val) => {
    const updatedCols = [...formData.columns]
    updatedCols[colIndex].heading = val
    setFormData({ ...formData, columns: updatedCols })
  }

  const handleAddLinkToColumn = (colIndex) => {
    const updatedCols = [...formData.columns]
    updatedCols[colIndex].items = [
      ...(updatedCols[colIndex].items || []),
      { label: 'New Link', href: '/', description: '' },
    ]
    setFormData({ ...formData, columns: updatedCols })
  }

  const handleUpdateLinkInColumn = (colIndex, linkIndex, field, val) => {
    const updatedCols = [...formData.columns]
    updatedCols[colIndex].items[linkIndex][field] = val
    setFormData({ ...formData, columns: updatedCols })
  }

  const handleDeleteLinkInColumn = (colIndex, linkIndex) => {
    const updatedCols = [...formData.columns]
    updatedCols[colIndex].items = updatedCols[colIndex].items.filter((_, i) => i !== linkIndex)
    setFormData({ ...formData, columns: updatedCols })
  }

  const handleUpdateFeatured = (colIndex, field, val) => {
    const updatedCols = [...formData.columns]
    updatedCols[colIndex].featured = {
      ...(updatedCols[colIndex].featured || {}),
      [field]: val,
    }
    setFormData({ ...formData, columns: updatedCols })
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-brand-blue" />
            <span>Mega Menu Manager</span>
          </h1>
          <p className="text-xs text-slate-500">
            Configure rich multi-column dropdowns with column headers, descriptions, and featured promo cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Mega Menu Saved!</span>
            </span>
          )}
          <CmsButton variant="primary" onClick={handleSave}>
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Save Mega Menu</span>
          </CmsButton>
        </div>
      </div>

      {/* Target Nav Selector & Enable Toggle */}
      <div className="p-4 bg-white rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-700">Attached Nav Item:</label>
          <div className="flex items-center gap-1">
            {megaMenus.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMega(m.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  selectedId === m.id
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {m.nav_item_label}
              </button>
            ))}
          </div>
        </div>

        <CmsToggle
          label="Enable Mega Menu for this Navigation Item"
          checked={formData.enabled ?? true}
          onChange={(v) => setFormData({ ...formData, enabled: v })}
        />
      </div>

      {/* Columns Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Columns ({(formData.columns || []).length})
          </h3>

          <button
            type="button"
            onClick={handleAddColumn}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-ice hover:bg-blue-100 text-brand-blue rounded-md text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Column</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(formData.columns || []).map((col, colIdx) => (
            <div
              key={col.id || colIdx}
              className="p-5 bg-white rounded-panel border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    Column {colIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteColumn(colIdx)}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                    title="Delete Column"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <CmsInput
                  label="Column Heading"
                  value={col.heading}
                  onChange={(v) => handleUpdateColumnHeading(colIdx, v)}
                  placeholder="e.g. Programs"
                />

                {/* Regular Links in this Column */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Links
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddLinkToColumn(colIdx)}
                      className="text-[11px] text-brand-blue font-semibold hover:underline"
                    >
                      + Add Link
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(col.items || []).map((link, lIdx) => (
                      <div key={lIdx} className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) =>
                              handleUpdateLinkInColumn(colIdx, lIdx, 'label', e.target.value)
                            }
                            placeholder="Link text"
                            className="w-full text-xs font-medium rounded border border-slate-300 px-2 py-1 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteLinkInColumn(colIdx, lIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) =>
                            handleUpdateLinkInColumn(colIdx, lIdx, 'href', e.target.value)
                          }
                          placeholder="/path-or-anchor"
                          className="w-full text-[11px] rounded border border-slate-300 px-2 py-1 bg-white font-mono"
                        />
                        <input
                          type="text"
                          value={link.description || ''}
                          onChange={(e) =>
                            handleUpdateLinkInColumn(colIdx, lIdx, 'description', e.target.value)
                          }
                          placeholder="Subtext description"
                          className="w-full text-[10px] text-slate-600 rounded border border-slate-200 px-2 py-0.5 bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Featured Block in this column */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Featured Card (Optional)
                  </span>
                  <CmsInput
                    label="Promo Title"
                    value={col.featured?.title || ''}
                    onChange={(v) => handleUpdateFeatured(colIdx, 'title', v)}
                    placeholder="e.g. Free Book Gift"
                  />
                  <CmsInput
                    label="Promo Description"
                    type="textarea"
                    rows={2}
                    value={col.featured?.description || ''}
                    onChange={(v) => handleUpdateFeatured(colIdx, 'description', v)}
                    placeholder="Short promo summary"
                  />
                  <CmsImageField
                    label="Promo Image"
                    value={col.featured?.image || ''}
                    onChange={(v) => handleUpdateFeatured(colIdx, 'image', v)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <CmsInput
                      label="Button Text"
                      value={col.featured?.buttonText || ''}
                      onChange={(v) => handleUpdateFeatured(colIdx, 'buttonText', v)}
                    />
                    <CmsInput
                      label="Button Link"
                      value={col.featured?.buttonLink || ''}
                      onChange={(v) => handleUpdateFeatured(colIdx, 'buttonLink', v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
