import React, { useState } from 'react'
import { useCms } from '../../context/CmsContext'
import { X, Search, Upload, Check, Image as ImageIcon, FileText, Video } from 'lucide-react'

export function MediaPickerModal({ isOpen, onClose, onSelect, currentUrl = '' }) {
  const { media, saveMediaItem } = useCms()
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [isUploading, setIsUploading] = useState(false)

  if (!isOpen) return null

  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      item.filename.toLowerCase().includes(search.toLowerCase()) ||
      (item.alt_text && item.alt_text.toLowerCase().includes(search.toLowerCase()))

    if (!matchesSearch) return false
    if (filterType === 'image') return item.type.startsWith('image/')
    if (filterType === 'video') return item.type.startsWith('video/')
    if (filterType === 'document') return item.type.includes('pdf') || !item.type.startsWith('image/')
    return true
  })

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const reader = new FileReader()
    reader.onload = async () => {
      const newMedia = {
        id: `media-${Date.now()}`,
        filename: file.name,
        url: reader.result,
        type: file.type,
        size: file.size,
        alt_text: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        caption: '',
        description: '',
        created_at: new Date().toISOString(),
      }
      await saveMediaItem(newMedia)
      setSelectedItem(newMedia)
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleConfirm = () => {
    if (selectedItem) {
      onSelect(selectedItem.url, selectedItem)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-panel shadow-panel border border-slate-200 w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-display font-bold text-base text-brand-navy">Media Library</h3>
            <p className="text-xs text-slate-500">Select an existing asset or upload a new file.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action & Filter Toolbar */}
        <div className="px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search media by filename or alt text..."
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-brand-blue"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs border border-slate-300 rounded-md px-2 py-1.5 bg-slate-50 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>

          <div>
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-navy hover:bg-brand-blue text-white rounded-md text-xs font-semibold transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
              <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,video/*,application/pdf" />
            </label>
          </div>
        </div>

        {/* Content Area: Grid + Preview Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Media Grid */}
          <div className="flex-1 p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredMedia.map((item) => {
              const isSelected = selectedItem?.id === item.id || (!selectedItem && item.url === currentUrl)
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`aspect-square rounded-lg border-2 overflow-hidden cursor-pointer relative group flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-brand-blue ring-2 ring-brand-blue/30 bg-blue-50/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  {item.type.startsWith('image/') ? (
                    <img src={item.url} alt={item.alt_text} className="w-full h-full object-cover" />
                  ) : item.type.startsWith('video/') ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <Video className="w-8 h-8" />
                      <span className="text-[10px] mt-1">Video</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <FileText className="w-8 h-8" />
                      <span className="text-[10px] mt-1">Document</span>
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3" />
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white truncate font-medium">{item.filename}</p>
                  </div>
                </div>
              )
            })}

            {filteredMedia.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-400 text-xs">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                No media items match your search or filter.
              </div>
            )}
          </div>

          {/* Details Sidebar */}
          {selectedItem && (
            <div className="w-72 border-l border-slate-200 p-4 bg-slate-50 overflow-y-auto space-y-4 text-xs">
              <h4 className="font-semibold text-slate-800">Media Details</h4>

              <div className="aspect-video rounded bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-300">
                {selectedItem.type.startsWith('image/') ? (
                  <img src={selectedItem.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-600">
                <p className="truncate">
                  <strong>Name:</strong> {selectedItem.filename}
                </p>
                <p>
                  <strong>Type:</strong> {selectedItem.type}
                </p>
                <p>
                  <strong>Size:</strong> {(selectedItem.size / 1024).toFixed(1)} KB
                </p>
                {selectedItem.width && (
                  <p>
                    <strong>Dimensions:</strong> {selectedItem.width} × {selectedItem.height}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={selectedItem.alt_text || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, alt_text: e.target.value })}
                  placeholder="Alternative text for accessibility"
                  className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5 bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <span className="text-xs text-slate-500">
            {selectedItem ? `Selected: ${selectedItem.filename}` : 'Select an image to insert.'}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedItem}
              onClick={handleConfirm}
              className="px-4 py-1.5 rounded-md bg-brand-navy hover:bg-brand-blue text-white text-xs font-semibold disabled:opacity-50 transition-colors"
            >
              Insert Image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
