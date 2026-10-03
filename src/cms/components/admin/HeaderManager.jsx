import React, { useState } from 'react'
import { Save, Check, LayoutTemplate } from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { CmsInput, CmsToggle, CmsButton } from '../ui/CmsFormControls'
import { CmsImageField } from '../ui/CmsImageField'
import { CmsLinkField } from '../ui/CmsLinkField'

export function HeaderManager() {
  const { settings, saveSettings } = useCms()
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(settings || {})))
  const [savedNotice, setSavedNotice] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    await saveSettings(formData)
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-brand-blue" />
            <span>Header & Navigation Settings</span>
          </h1>
          <p className="text-xs text-slate-500">
            Configure logo, sticky behavior, and call-to-action button displayed in the primary header.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Saved!</span>
            </span>
          )}
          <CmsButton variant="primary" onClick={handleSave}>
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Save Header</span>
          </CmsButton>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
          Brand Identity & Logo
        </h3>

        <CmsImageField
          label="Header Logo Image"
          value={formData.logo_url}
          onChange={(v) => setFormData({ ...formData, logo_url: v })}
          description="Transparent WebP or PNG format recommended (max height 48px)."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CmsInput
            label="Logo Alt Text"
            value={formData.site_name}
            onChange={(v) => setFormData({ ...formData, site_name: v })}
          />
          <CmsInput
            label="Logo Target URL"
            value="/"
            disabled
            description="Logo always links to the Homepage."
          />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
          Header Behavior & Actions
        </h3>

        <CmsToggle
          label="Sticky Header on Scroll"
          description="Smoothly glassmorphism blur and dock the header to the top of the viewport when scrolling down."
          checked={formData.sticky_header ?? true}
          onChange={(v) => setFormData({ ...formData, sticky_header: v })}
        />

        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-semibold text-slate-800 mb-3">Header Action Button (CTA)</h4>
          <CmsLinkField
            label="Navbar Action Button"
            value={formData.default_cta || { text: 'Register Now', link: '/#pricing' }}
            onChange={(v) => setFormData({ ...formData, default_cta: v })}
          />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
          Global Announcement Bar
        </h3>

        <CmsToggle
          label="Enable Top Announcement Bar"
          description="Displays a subtle informational ribbon above the main navigation."
          checked={formData.announcement?.enabled ?? false}
          onChange={(v) =>
            setFormData({
              ...formData,
              announcement: { ...(formData.announcement || {}), enabled: v },
            })
          }
        />

        {formData.announcement?.enabled && (
          <div className="space-y-4 pt-2">
            <CmsInput
              label="Announcement Text"
              value={formData.announcement?.message || ''}
              onChange={(v) =>
                setFormData({
                  ...formData,
                  announcement: { ...(formData.announcement || {}), message: v },
                })
              }
              placeholder="e.g. Early Bird registrations close soon!"
            />

            <div className="grid grid-cols-2 gap-4">
              <CmsInput
                label="Action Link Text (Optional)"
                value={formData.announcement?.link_text || ''}
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    announcement: { ...(formData.announcement || {}), link_text: v },
                  })
                }
                placeholder="Register Now"
              />
              <CmsInput
                label="Action Link URL"
                value={formData.announcement?.link_url || ''}
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    announcement: { ...(formData.announcement || {}), link_url: v },
                  })
                }
                placeholder="/#pricing"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
