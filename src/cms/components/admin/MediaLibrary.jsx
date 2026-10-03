import React, { useState } from 'react'
import { useCms } from '../../context/CmsContext'
import {
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  FileText,
  Video,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react'

export function MediaLibrary() {
  const { media, saveMediaItem, deleteMediaItem } = useCms()
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedItem, setSelectedItem] = useState(media[0] || null)
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const filtered = media.filter((item) => {
    const matchesSearch =
      item.filename.toLowerCase().includes(search.toLowerCase()) ||
      (item.alt_text && item.alt_text.toLowerCase().includes(search.toLowerCase())) ||
      (item.caption && item.caption.toLowerCase().includes(search.toLowerCase()))

    if (!matchesSearch) return false
    if (filterType === 'image') return item.type.startsWith('image/')
    if (filterType === 'video') return item.type.startsWith('video/')
    if (filterType === 'document') return !item.type.startsWith('image/') && !item.type.startsWith('video/')
    return true
  })

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 1.5MB validation to prevent localStorage QuotaExceededError
    const MAX_SIZE = 1.5 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      alert(
        `File "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 1.5MB limit for browser storage. Please upload an optimized file under 1.5MB.`
      )
      e.target.value = ''
      return
    }

    setIsUploading(true)
    const reader = new FileReader()
    reader.onerror = () => {
      alert('Failed to read media file.')
      setIsUploading(false)
    }
    reader.onload = async () => {
      try {
        const newMedia = {
          id: `media-${Date.now()}`,
          filename: file.name,
          url: reader.result,
          type: file.type || 'image/jpeg',
          size: file.size,
          alt_text: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          caption: '',
          description: '',
          created_at: new Date().toISOString(),
        }
        await saveMediaItem(newMedia)
        setSelectedItem(newMedia)
      } catch (err) {
        alert('Could not save media: ' + (err?.message || 'Storage full'))
      } finally {
        setIsUploading(false)
        e.target.value = ''
      }
    }
    reader.readAsDataURL(file)
  }

  const handleCopy = (url) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(url).catch(() => {})
      }
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2000)
    } catch {}
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this media item?')) {
      await deleteMediaItem(id)
      if (selectedItem?.id === id) {
        setSelectedItem(null)
      }
    }
  }

  const handleUpdateDetails = async (field, val) => {
    if (!selectedItem) return
    const updated = { ...selectedItem, [field]: val }
    setSelectedItem(updated)
    await saveMediaItem(updated)
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Media Library</h1>
          <p className="text-xs text-slate-500">
            Manage images, graphics, audio, and documents across your website.
          </p>
        </div>

        <div>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white rounded-md text-xs font-semibold shadow-xs transition-colors">
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload New Media'}</span>
            <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,video/*,application/pdf" />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg border border-slate-200">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by filename, caption, or alt text..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-md border border-slate-300 focus:border-brand-blue focus:outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs border border-slate-300 rounded-md px-3 py-2 bg-slate-50 focus:outline-none"
          >
            <option value="all">All Media</option>
            <option value="image">Images Only</option>
            <option value="video">Videos Only</option>
            <option value="document">Documents</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} of {media.length} items
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Media Grid */}
        <div className="lg:col-span-8 bg-white p-6 rounded-lg border border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map((item) => {
              const isSelected = selectedItem?.id === item.id
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`aspect-square rounded-lg border-2 overflow-hidden cursor-pointer relative group transition-all ${
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
                      <span className="text-[10px] mt-1 font-mono">Video</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <FileText className="w-8 h-8" />
                      <span className="text-[10px] mt-1 font-mono">Doc</span>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-slate-900/80 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white truncate text-center font-medium">
                      {item.filename}
                    </p>
                  </div>
                </div>
              )
            })}

            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-400 text-xs">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                No media assets found matching the criteria.
              </div>
            )}
          </div>
        </div>

        {/* Selected Media Inspector */}
        <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-slate-200 space-y-5">
          {selectedItem ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800 text-sm">Asset Details</h3>
                <button
                  type="button"
                  onClick={() => handleDelete(selectedItem.id)}
                  className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              {/* Preview */}
              <div className="aspect-video w-full rounded-md bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                {selectedItem.type.startsWith('image/') ? (
                  <img src={selectedItem.url} alt={selectedItem.alt_text} className="w-full h-full object-contain" />
                ) : (
                  <FileText className="w-10 h-10 text-slate-400" />
                )}
              </div>

              {/* URL and Copy */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700">File URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedItem.url}
                    className="w-full text-xs rounded border border-slate-300 px-2 py-1.5 bg-slate-50 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedItem.url)}
                    className="p-1.5 rounded border border-slate-300 hover:bg-slate-100 text-slate-600 shrink-0"
                    title="Copy URL"
                  >
                    {copiedUrl ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Metadata Attributes */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={selectedItem.alt_text || ''}
                    onChange={(e) => handleUpdateDetails('alt_text', e.target.value)}
                    placeholder="Describe this image for screen readers"
                    className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Caption</label>
                  <input
                    type="text"
                    value={selectedItem.caption || ''}
                    onChange={(e) => handleUpdateDetails('caption', e.target.value)}
                    placeholder="Optional caption"
                    className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={selectedItem.description || ''}
                    onChange={(e) => handleUpdateDetails('description', e.target.value)}
                    placeholder="Internal reference notes"
                    className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5"
                  />
                </div>
              </div>

              {/* File Specs */}
              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1 font-mono">
                <p>File: {selectedItem.filename}</p>
                <p>Type: {selectedItem.type}</p>
                <p>Size: {(selectedItem.size / 1024).toFixed(1)} KB</p>
                <p>Uploaded: {new Date(selectedItem.created_at).toLocaleDateString()}</p>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              Select a media asset from the grid to view details and metadata.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
