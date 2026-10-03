import React, { useState } from 'react'
import { Save, Check, Globe, Search, Smartphone } from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { CmsInput, CmsButton } from '../ui/CmsFormControls'
import { CmsImageField } from '../ui/CmsImageField'

export function SeoManager() {
  const { settings, saveSettings, pages } = useCms()
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(settings || {})))
  const [savedNotice, setSavedNotice] = useState(false)
  const [previewPageSlug, setPreviewPageSlug] = useState('/')

  const selectedPage = pages.find((p) => p.slug === previewPageSlug) || pages[0]

  const handleSave = async (e) => {
    e.preventDefault()
    await saveSettings(formData)
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  // Previews
  const previewTitle = selectedPage?.seo?.title || `${selectedPage?.title || 'Home'} | ${formData.site_name || 'CrossLife'}`
  const previewDesc =
    selectedPage?.seo?.description ||
    'CrossLife is a Gospel-centred youth conference for men and women aged 18 to 25. 14-16 September 2027 in Hyderabad, Telangana.'
  const previewUrl = `https://crosslife.in${selectedPage?.slug === '/' ? '' : selectedPage?.slug || ''}`
  const previewImage = selectedPage?.seo?.ogImage || formData.default_og_image || '/hero-bg.jpg'

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Globe className="w-6 h-6 text-brand-blue" />
            <span>Search Engine Optimization (SEO)</span>
          </h1>
          <p className="text-xs text-slate-500">
            Configure default meta titles, social share assets, robots.txt directives, and preview search appearance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>SEO Saved!</span>
            </span>
          )}
          <CmsButton variant="primary" onClick={handleSave}>
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Save SEO Defaults</span>
          </CmsButton>
        </div>
      </div>

      {/* Global Defaults */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
          Global SEO Defaults
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CmsInput
            label="Title Format Pattern"
            value={formData.seo_title_pattern || '%title% | CrossLife Conference'}
            onChange={(v) => setFormData({ ...formData, seo_title_pattern: v })}
            description="Use %title% for page title substitution."
          />
          <CmsInput
            label="Robots Directives"
            value={formData.seo_robots || 'index, follow'}
            onChange={(v) => setFormData({ ...formData, seo_robots: v })}
            description="Default indexing directive for all public pages."
          />
        </div>

        <CmsImageField
          label="Default Social Share Image (Open Graph / Twitter Card)"
          value={formData.default_og_image}
          onChange={(v) => setFormData({ ...formData, default_og_image: v })}
          description="Recommended aspect ratio: 1200x630px WebP or JPG."
        />
      </div>

      {/* Realistic Search Result Simulator */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-brand-blue" />
            <span>Google Search Appearance Simulator</span>
          </h3>

          <div className="flex items-center gap-2">
            <label className="text-[11px] text-slate-500 font-medium">Preview page:</label>
            <select
              value={previewPageSlug}
              onChange={(e) => setPreviewPageSlug(e.target.value)}
              className="text-xs border border-slate-300 rounded px-2 py-1 bg-slate-50"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.title} ({p.slug})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Google Card Preview */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg max-w-xl space-y-1 font-sans">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <div className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-600">
              C
            </div>
            <span className="text-slate-800 font-medium">CrossLife</span>
            <span className="text-slate-400">›</span>
            <span className="text-slate-500 truncate font-mono text-[11px]">{previewUrl}</span>
          </div>

          <h4 className="text-base text-blue-800 font-medium hover:underline cursor-pointer leading-tight pt-1">
            {previewTitle}
          </h4>

          <p className="text-xs text-slate-600 leading-snug line-clamp-2">
            {previewDesc}
          </p>
        </div>

        {/* Social Card Preview */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-brand-blue" />
            <span>Social Share Card (Facebook, WhatsApp, LinkedIn, X)</span>
          </h4>

          <div className="border border-slate-200 rounded-lg overflow-hidden max-w-md bg-white shadow-xs">
            <div className="aspect-[1.91/1] w-full bg-slate-100 overflow-hidden">
              <img src={previewImage} alt="OG Card" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 space-y-1 bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                CROSSLIFE.IN
              </span>
              <h5 className="font-semibold text-xs text-slate-900 leading-snug">
                {previewTitle}
              </h5>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {previewDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
