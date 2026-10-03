import React from 'react'
import { Plus, Trash2, Copy, ArrowUp, ArrowDown, GripVertical } from 'lucide-react'

export function CmsRepeater({
  label,
  description,
  items = [],
  onChange,
  renderItem,
  newItemFactory,
  addLabel = 'Add Item',
  className = '',
}) {
  const handleAdd = () => {
    const newItem = newItemFactory ? newItemFactory() : {}
    onChange([...items, newItem])
  }

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index)
    onChange(updated)
  }

  const handleDuplicate = (index) => {
    const target = items[index]
    const duplicate = JSON.parse(JSON.stringify(target))
    if (duplicate.id) duplicate.id = `item-${Date.now()}`
    const updated = [...items.slice(0, index + 1), duplicate, ...items.slice(index + 1)]
    onChange(updated)
  }

  const handleMoveUp = (index) => {
    if (index === 0) return
    const updated = [...items]
    const temp = updated[index - 1]
    updated[index - 1] = updated[index]
    updated[index] = temp
    onChange(updated)
  }

  const handleMoveDown = (index) => {
    if (index === items.length - 1) return
    const updated = [...items]
    const temp = updated[index + 1]
    updated[index + 1] = updated[index]
    updated[index] = temp
    onChange(updated)
  }

  const handleItemChange = (index, updatedItem) => {
    const updated = items.map((it, i) => (i === index ? updatedItem : it))
    onChange(updated)
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          {label && <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{label}</h4>}
          {description && <p className="text-[11px] text-slate-500">{description}</p>}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-navy bg-brand-ice px-2.5 py-1.5 rounded border border-brand-border hover:border-brand-blue/40 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{addLabel}</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative group transition-colors hover:border-slate-300"
          >
            {/* Header controls bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-500 text-xs">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-slate-600">
                <GripVertical className="w-3.5 h-3.5 text-slate-400" />
                <span>#{index + 1}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  title="Move Up"
                  aria-label="Move Up"
                  className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === items.length - 1}
                  title="Move Down"
                  aria-label="Move Down"
                  className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDuplicate(index)}
                  title="Duplicate"
                  aria-label="Duplicate"
                  className="p-1 rounded hover:bg-slate-200 text-slate-600 ml-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  title="Delete"
                  aria-label="Delete"
                  className="p-1 rounded hover:bg-rose-100 text-rose-600 ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Custom item fields */}
            <div>{renderItem(item, index, (updated) => handleItemChange(index, updated))}</div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg text-xs text-slate-400">
            No items added yet. Click "{addLabel}" to begin.
          </div>
        )}
      </div>
    </div>
  )
}
