import React, { useState } from 'react'
import {
  GripVertical,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Layers,
} from 'lucide-react'
import { SectionEditorModal } from './SectionEditorModal'
import { AddSectionModal } from './AddSectionModal'

export function SectionBuilder({
  sections = [],
  pageId,
  onSaveSection,
  onDeleteSection,
  onDuplicateSection,
  onReorderSections,
}) {
  const [editingSection, setEditingSection] = useState(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState(null)

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    // Optional drag ghost opacity
    e.currentTarget.classList.add('opacity-50')
  }

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-50')
    setDraggedIndex(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetIndex) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === targetIndex) return

    const reordered = [...sections]
    const [moved] = reordered.splice(draggedIndex, 1)
    reordered.splice(targetIndex, 0, moved)

    const orderedIds = reordered.map((s) => s.id)
    onReorderSections(pageId, orderedIds)
    setDraggedIndex(null)
  }

  // Move up/down accessibility buttons
  const handleMoveUp = (index) => {
    if (index === 0) return
    const reordered = [...sections]
    const temp = reordered[index - 1]
    reordered[index - 1] = reordered[index]
    reordered[index] = temp
    onReorderSections(
      pageId,
      reordered.map((s) => s.id)
    )
  }

  const handleMoveDown = (index) => {
    if (index === sections.length - 1) return
    const reordered = [...sections]
    const temp = reordered[index + 1]
    reordered[index + 1] = reordered[index]
    reordered[index] = temp
    onReorderSections(
      pageId,
      reordered.map((s) => s.id)
    )
  }

  // Toggle visibility status
  const handleToggleVisibility = (section) => {
    const nextStatus = section.status === 'published' ? 'hidden' : 'published'
    onSaveSection({
      ...section,
      status: nextStatus,
    })
  }

  // Handle adding new section from modal
  const handleInsertSection = (type, defaultData) => {
    const newSection = {
      id: `sec-${Date.now()}`,
      page_id: pageId,
      type,
      order: sections.length + 1,
      status: 'published',
      visibility: { desktop: true, tablet: true, mobile: true },
      schedule: { publish_from: null, publish_until: null },
      data: defaultData,
    }
    onSaveSection(newSection)
    // Open editor right away so the user can customize it immediately
    setEditingSection(newSection)
  }

  const getSectionTitle = (sec) => {
    return (
      sec.data?.title ||
      sec.data?.headlinePart1 ||
      sec.data?.headline ||
      sec.data?.kicker ||
      `Section #${sec.order || ''}`
    )
  }

  return (
    <div className="space-y-4">
      {/* Builder Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-brand-blue" />
            <span>Page Sections ({sections.length})</span>
          </h3>
          <p className="text-xs text-slate-500">
            Drag items or use the arrows to reorder. Click a section to edit its content.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-navy hover:bg-brand-blue text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Section</span>
        </button>
      </div>

      {/* Ordered Sections List */}
      <div className="space-y-2.5">
        {sections.map((section, index) => {
          const isHidden = section.status === 'hidden' || section.status === 'draft'

          return (
            <div
              key={section.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`p-3.5 bg-white border rounded-lg flex items-center justify-between gap-4 transition-all ${
                isHidden
                  ? 'border-slate-200 bg-slate-50 opacity-60'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {/* Drag Handle & Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600 rounded"
                  title="Drag to reorder"
                >
                  <GripVertical className="w-4 h-4" />
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400 w-5">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div
                  onClick={() => setEditingSection(section)}
                  className="cursor-pointer flex-1 min-w-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-ice text-brand-blue border border-brand-border">
                      {section.type}
                    </span>

                    {isHidden && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                        {section.status}
                      </span>
                    )}

                    <h4 className="font-semibold text-xs text-slate-900 truncate">
                      {getSectionTitle(section)}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0 text-slate-500">
                {/* Reorder Buttons (Accessible & Mobile Friendly) */}
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  title="Move Up"
                  aria-label="Move Up"
                  className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === sections.length - 1}
                  title="Move Down"
                  aria-label="Move Down"
                  className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleVisibility(section)}
                  title={isHidden ? 'Show Section' : 'Hide Section'}
                  aria-label={isHidden ? 'Show Section' : 'Hide Section'}
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-600"
                >
                  {isHidden ? (
                    <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => setEditingSection(section)}
                  title="Edit Section"
                  aria-label="Edit Section"
                  className="p-1.5 rounded hover:bg-slate-100 text-brand-blue"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                {/* Duplicate Button */}
                <button
                  type="button"
                  onClick={() => onDuplicateSection(section.id)}
                  title="Duplicate Section"
                  aria-label="Duplicate Section"
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-600"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Delete this section?')) {
                      onDeleteSection(section.id)
                    }
                  }}
                  title="Delete Section"
                  aria-label="Delete Section"
                  className="p-1.5 rounded hover:bg-rose-50 text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}

        {sections.length === 0 && (
          <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50 space-y-2">
            <Layers className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">This page currently has no sections.</p>
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="text-xs font-bold text-brand-blue hover:underline"
            >
              + Add First Section
            </button>
          </div>
        )}
      </div>

      {/* Editor Modal for active section */}
      <SectionEditorModal
        section={editingSection}
        isOpen={Boolean(editingSection)}
        onClose={() => setEditingSection(null)}
        onSave={(updated) => {
          onSaveSection(updated)
          setEditingSection(null)
        }}
      />

      {/* Add Section Modal Catalog */}
      <AddSectionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSelectType={handleInsertSection}
      />
    </div>
  )
}
