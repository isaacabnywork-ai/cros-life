import React, { useState } from 'react'
import { useCms } from '../../context/CmsContext'
import { Link2, ExternalLink } from 'lucide-react'

export function CmsLinkField({
  label = 'Link',
  value = { text: '', link: '', target: '_self' },
  onChange,
  showText = true,
  className = '',
}) {
  const { pages } = useCms()

  const [linkType, setLinkType] = useState(() => {
    const raw = value?.link || ''
    if (raw.startsWith('mailto:')) return 'email'
    if (raw.startsWith('tel:')) return 'phone'
    if (raw.startsWith('#')) return 'anchor'
    if (raw.startsWith('http://') || raw.startsWith('https://')) return 'external'
    return 'internal'
  })

  const handleLinkTypeChange = (newType) => {
    setLinkType(newType)
    if (newType === 'internal' && pages.length > 0) {
      onChange({ ...value, link: pages[0].slug })
    } else if (newType === 'email') {
      onChange({ ...value, link: 'mailto:contact@crosslife.in' })
    } else if (newType === 'phone') {
      onChange({ ...value, link: 'tel:+919886769948' })
    } else if (newType === 'anchor') {
      onChange({ ...value, link: '#what-is-crosslife' })
    } else if (newType === 'external') {
      onChange({ ...value, link: 'https://', target: '_blank' })
    }
  }

  return (
    <div className={`space-y-2 p-3 bg-white border border-slate-200 rounded-md ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-brand-blue" />
            {label}
          </span>

          <div className="flex items-center gap-1 text-[11px]">
            <select
              value={linkType}
              onChange={(e) => handleLinkTypeChange(e.target.value)}
              className="border border-slate-300 rounded px-1.5 py-0.5 text-xs bg-slate-50 focus:outline-none"
            >
              <option value="internal">Internal Page</option>
              <option value="external">External URL</option>
              <option value="anchor">Anchor (#section)</option>
              <option value="email">Email (mailto:)</option>
              <option value="phone">Phone (tel:)</option>
            </select>
          </div>
        </div>
      )}

      {showText && (
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Button / Link Label</label>
          <input
            type="text"
            value={value?.text || ''}
            onChange={(e) => onChange({ ...value, text: e.target.value })}
            placeholder="e.g. Register Now"
            className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5 focus:border-brand-blue focus:outline-none"
          />
        </div>
      )}

      <div>
        <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Destination URL / Target</label>
        {linkType === 'internal' ? (
          <select
            value={value?.link || '/'}
            onChange={(e) => onChange({ ...value, link: e.target.value })}
            className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5 bg-white focus:border-brand-blue focus:outline-none"
          >
            {pages.map((p) => (
              <option key={p.id} value={p.slug}>
                {p.title} ({p.slug})
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={value?.link || ''}
            onChange={(e) => onChange({ ...value, link: e.target.value })}
            placeholder={
              linkType === 'email'
                ? 'mailto:hello@example.com'
                : linkType === 'phone'
                ? 'tel:+91XXXXXXXXXX'
                : linkType === 'anchor'
                ? '#contact'
                : 'https://example.com'
            }
            className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5 focus:border-brand-blue focus:outline-none font-mono"
          />
        )}
      </div>

      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-600">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={value?.target === '_blank'}
            onChange={(e) => onChange({ ...value, target: e.target.checked ? '_blank' : '_self' })}
            className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          />
          <span>Open link in new tab</span>
        </label>

        {value?.target === '_blank' && (
          <ExternalLink className="w-3 h-3 text-slate-400" />
        )}
      </div>
    </div>
  )
}
