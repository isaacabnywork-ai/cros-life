import React, { useState } from 'react'
import { Save, Check, Footprints } from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { CmsInput, CmsButton } from '../ui/CmsFormControls'
import { CmsImageField } from '../ui/CmsImageField'
import { CmsRepeater } from '../ui/CmsRepeater'

export function FooterManager() {
  const { settings, saveSettings, menus, saveMenu } = useCms()
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(settings || {})))
  const footerMenu = menus.find((m) => m.slug === 'footer') || { items: [] }
  const [footerLinks, setFooterLinks] = useState(() =>
    JSON.parse(JSON.stringify(footerMenu.items || []))
  )
  const [savedNotice, setSavedNotice] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    await saveSettings(formData)
    await saveMenu({
      ...footerMenu,
      slug: 'footer',
      title: 'Footer Links',
      items: footerLinks,
    })
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Footprints className="w-6 h-6 text-brand-blue" />
            <span>Footer Manager</span>
          </h1>
          <p className="text-xs text-slate-500">
            Control the website footer brand blurb, navigation columns, contact info, and copyright note.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Footer Saved!</span>
            </span>
          )}
          <CmsButton variant="primary" onClick={handleSave}>
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Save Footer</span>
          </CmsButton>
        </div>
      </div>

      {/* Brand & Organiser Info */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
          Footer Branding & Description
        </h3>

        <CmsImageField
          label="Footer Logo"
          value={formData.logo_url}
          onChange={(v) => setFormData({ ...formData, logo_url: v })}
        />

        <CmsInput
          label="Footer Mission Blurb"
          type="textarea"
          rows={3}
          value={
            formData.footer_description ||
            'One Life for Christ, One Desire to glorify Him, One Purpose to proclaim His Gospel. A Gospel-centred youth conference for young men and women.'
          }
          onChange={(v) => setFormData({ ...formData, footer_description: v })}
        />

        <div className="grid grid-cols-2 gap-4">
          <CmsInput
            label="Organised By Name"
            value={formData.event?.organiser || 'Equip Indian Churches'}
            onChange={(v) =>
              setFormData({
                ...formData,
                event: { ...(formData.event || {}), organiser: v },
              })
            }
          />
          <CmsInput
            label="Copyright Text"
            value={formData.copyright_text}
            onChange={(v) => setFormData({ ...formData, copyright_text: v })}
          />
        </div>
      </div>

      {/* Footer Navigation Links Repeater */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <CmsRepeater
          label="Footer Navigation Links"
          description="Manage the list of navigation links rendered in the middle column of the footer."
          items={footerLinks}
          onChange={setFooterLinks}
          newItemFactory={() => ({ id: `fl-${Date.now()}`, label: 'New Link', href: '/' })}
          addLabel="Add Footer Link"
          renderItem={(item, i, updateItem) => (
            <div className="grid grid-cols-2 gap-3">
              <CmsInput
                label="Link Label"
                value={item.label}
                onChange={(v) => updateItem({ ...item, label: v })}
              />
              <CmsInput
                label="Destination URL"
                value={item.href}
                onChange={(v) => updateItem({ ...item, href: v })}
              />
            </div>
          )}
        />
      </div>
    </div>
  )
}
