import React, { useState } from 'react'
import { Image as ImageIcon, Upload, X } from 'lucide-react'
import { MediaPickerModal } from '../admin/MediaPickerModal'

export function CmsImageField({
  label = 'Image',
  value = '',
  onChange,
  description,
  className = '',
}) {
  const [pickerOpen, setPickerOpen] = useState(false)

  const handleClear = () => {
    onChange('')
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}

      <div className="flex items-start gap-3 p-3 bg-white border border-slate-300 rounded-md">
        {/* Thumbnail Preview */}
        <div className="w-20 h-20 rounded bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 relative group">
          {value ? (
            <>
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={handleClear}
                title="Remove image"
                className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-400" />
          )}
        </div>

        {/* Input & Action */}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/photo.jpg or https://..."
            className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5 focus:border-brand-blue focus:outline-none"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs font-semibold text-slate-700 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-brand-blue" />
              <span>Choose from Media Library</span>
            </button>
          </div>
        </div>
      </div>

      {description && <p className="text-[11px] text-slate-500">{description}</p>}

      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        currentUrl={value}
        onSelect={(newUrl) => onChange(newUrl)}
      />
    </div>
  )
}
