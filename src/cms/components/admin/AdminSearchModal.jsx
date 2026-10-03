import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, FileText, Image, Layers, Menu, ArrowRight } from 'lucide-react'
import * as cmsStore from '../../services/cmsStore'

const ICON_MAP = {
  Page: FileText,
  Media: Image,
  Section: Layers,
  Menu: Menu,
  'Reusable Block': Layers,
}

export function AdminSearchModal({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
    } else {
      setResults(cmsStore.globalCmsSearch(query))
    }
  }, [query])

  if (!isOpen) return null

  const handleSelect = (url) => {
    onClose()
    navigate(url)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-panel shadow-panel border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-blue shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, sections, media, menus, blocks..."
            className="w-full text-sm outline-none text-slate-900 placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 text-xs">
          {results.map((res, idx) => {
            const Icon = ICON_MAP[res.type] || FileText
            return (
              <div
                key={idx}
                onClick={() => handleSelect(res.url)}
                className="p-3.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3 group transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded bg-brand-ice text-brand-blue flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                        {res.type}
                      </span>
                      <h4 className="font-semibold text-slate-900 truncate group-hover:text-brand-blue">
                        {res.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{res.subtitle}</p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            )
          })}

          {query && results.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              No CMS entities found matching "{query}".
            </div>
          )}

          {!query && (
            <div className="py-10 text-center text-slate-400 text-xs">
              Type to instantly search across all pages, sections, media, and navigation.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
