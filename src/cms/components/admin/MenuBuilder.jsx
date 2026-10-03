import React, { useState } from 'react'
import {
  Save,
  Check,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Menu,
  ChevronDown,
} from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { CmsInput, CmsButton } from '../ui/CmsFormControls'

export function MenuBuilder() {
  const { menus, pages, saveMenu } = useCms()
  const [selectedSlug, setSelectedSlug] = useState('header')
  const [savedNotice, setSavedNotice] = useState(false)

  const activeMenu = menus.find((m) => m.slug === selectedSlug) || menus[0]
  const [menuItems, setMenuItems] = useState(() => JSON.parse(JSON.stringify(activeMenu?.items || [])))

  // Re-sync when switching menus
  const handleSelectMenu = (slug) => {
    setSelectedSlug(slug)
    const m = menus.find((item) => item.slug === slug)
    setMenuItems(JSON.parse(JSON.stringify(m?.items || [])))
  }

  const handleSave = async () => {
    await saveMenu({
      ...activeMenu,
      items: menuItems,
    })
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  const handleAddItem = () => {
    const newItem = {
      id: `nav-${Date.now()}`,
      label: 'New Link',
      type: 'link',
      href: '/',
      target: '_self',
      order: menuItems.length + 1,
      items: [],
    }
    setMenuItems([...menuItems, newItem])
  }

  const handleDeleteItem = (index) => {
    setMenuItems(menuItems.filter((_, i) => i !== index))
  }

  const handleMoveUp = (index) => {
    if (index === 0) return
    const updated = [...menuItems]
    const temp = updated[index - 1]
    updated[index - 1] = updated[index]
    updated[index] = temp
    setMenuItems(updated)
  }

  const handleMoveDown = (index) => {
    if (index === menuItems.length - 1) return
    const updated = [...menuItems]
    const temp = updated[index + 1]
    updated[index + 1] = updated[index]
    updated[index] = temp
    setMenuItems(updated)
  }

  const updateItem = (index, field, val) => {
    const updated = menuItems.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: val }
      }
      return item
    })
    setMenuItems(updated)
  }

  // Nested dropdown item handlers
  const handleAddSubItem = (parentIndex) => {
    const parent = menuItems[parentIndex]
    const subItems = parent.items || []
    const newSubItem = {
      id: `sub-${Date.now()}`,
      label: 'Sub Item',
      href: '/',
      target: '_self',
    }
    updateItem(parentIndex, 'items', [...subItems, newSubItem])
    if (parent.type !== 'dropdown') {
      updateItem(parentIndex, 'type', 'dropdown')
    }
  }

  const handleUpdateSubItem = (parentIndex, subIndex, field, val) => {
    const parent = menuItems[parentIndex]
    const subItems = [...(parent.items || [])]
    subItems[subIndex] = { ...subItems[subIndex], [field]: val }
    updateItem(parentIndex, 'items', subItems)
  }

  const handleDeleteSubItem = (parentIndex, subIndex) => {
    const parent = menuItems[parentIndex]
    const subItems = (parent.items || []).filter((_, i) => i !== subIndex)
    updateItem(parentIndex, 'items', subItems)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Menu className="w-6 h-6 text-brand-blue" />
            <span>Navigation Menu Builder</span>
          </h1>
          <p className="text-xs text-slate-500">
            Configure primary navigation menus, dropdown links, and hierarchies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Menu Saved!</span>
            </span>
          )}
          <CmsButton variant="primary" onClick={handleSave}>
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Save Menu</span>
          </CmsButton>
        </div>
      </div>

      {/* Menu Selector Tabs */}
      <div className="flex items-center gap-2 p-2 bg-slate-200/60 rounded-lg w-fit">
        {menus.map((m) => (
          <button
            key={m.slug}
            type="button"
            onClick={() => handleSelectMenu(m.slug)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              selectedSlug === m.slug
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {m.title} ({m.slug})
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Menu Items ({menuItems.length})
          </h3>

          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-ice hover:bg-blue-100 text-brand-blue rounded-md text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Menu Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <div
              key={item.id || index}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
            >
              {/* Top Row: Label, URL, Type, Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-48">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateItem(index, 'label', e.target.value)}
                      placeholder="Label"
                      className="w-full text-xs font-semibold rounded border border-slate-300 px-2.5 py-1.5 bg-white"
                    />
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateItem(index, 'href', e.target.value)}
                      placeholder="Destination URL (e.g. /faq or /#pricing)"
                      className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5 bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <select
                    value={item.type || 'link'}
                    onChange={(e) => updateItem(index, 'type', e.target.value)}
                    className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white"
                  >
                    <option value="link">Direct Link</option>
                    <option value="dropdown">Dropdown Menu</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 rounded text-slate-500 hover:bg-slate-200 disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === menuItems.length - 1}
                    className="p-1 rounded text-slate-500 hover:bg-slate-200 disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index)}
                    className="p-1 rounded text-rose-600 hover:bg-rose-50"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dropdown Sub-Items List */}
              {item.type === 'dropdown' && (
                <div className="pl-6 pt-3 border-l-2 border-brand-blue/30 space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1">
                      <ChevronDown className="w-3 h-3" />
                      Dropdown Child Links
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddSubItem(index)}
                      className="text-[11px] font-semibold text-brand-blue hover:underline"
                    >
                      + Add Child Link
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(item.items || []).map((sub, sIdx) => (
                      <div key={sub.id || sIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={sub.label}
                          onChange={(e) =>
                            handleUpdateSubItem(index, sIdx, 'label', e.target.value)
                          }
                          placeholder="Sub link label"
                          className="w-40 text-xs rounded border border-slate-300 px-2 py-1 bg-white"
                        />
                        <input
                          type="text"
                          value={sub.href}
                          onChange={(e) =>
                            handleUpdateSubItem(index, sIdx, 'href', e.target.value)
                          }
                          placeholder="/page-url"
                          className="flex-1 text-xs rounded border border-slate-300 px-2 py-1 bg-white font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteSubItem(index, sIdx)}
                          className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {menuItems.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No items in this menu yet. Click "+ Add Menu Item" to start.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
