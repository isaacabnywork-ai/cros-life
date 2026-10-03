import React, { useState } from 'react'
import { Save, Check, Settings, Phone, Mail, MapPin, Share2 } from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { CmsInput, CmsButton } from '../ui/CmsFormControls'
import { CmsImageField } from '../ui/CmsImageField'
import { CmsRepeater } from '../ui/CmsRepeater'

export function GlobalSettings() {
  const { settings, saveSettings } = useCms()
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(settings || {})))
  const [savedNotice, setSavedNotice] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    await saveSettings(formData)
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  const updateContact = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      contacts: {
        ...(prev.contacts || {}),
        [key]: val,
      },
    }))
  }

  const updateVenue = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      contacts: {
        ...(prev.contacts || {}),
        venue: {
          ...((prev.contacts || {}).venue || {}),
          [key]: val,
        },
      },
    }))
  }

  const updateSocial = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      social_links: {
        ...(prev.social_links || {}),
        [key]: val,
      },
    }))
  }

  const updateEvent = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      event: {
        ...(prev.event || {}),
        [key]: val,
      },
    }))
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-brand-blue" />
            <span>Global Website Settings</span>
          </h1>
          <p className="text-xs text-slate-500">
            Centrally manage contact details, event dates, social links, and brand assets used across the entire site.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Settings Saved!</span>
            </span>
          )}
          <CmsButton variant="primary" onClick={handleSave}>
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Save All Settings</span>
          </CmsButton>
        </div>
      </div>

      {/* General Website Info */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
          General Site Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CmsInput
            label="Site Name"
            value={formData.site_name}
            onChange={(v) => setFormData({ ...formData, site_name: v })}
          />
          <CmsInput
            label="Tagline"
            value={formData.tagline}
            onChange={(v) => setFormData({ ...formData, tagline: v })}
          />
          <CmsInput
            label="Sub Tagline"
            value={formData.sub_tagline}
            onChange={(v) => setFormData({ ...formData, sub_tagline: v })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CmsImageField
            label="Default Logo URL"
            value={formData.logo_url}
            onChange={(v) => setFormData({ ...formData, logo_url: v })}
          />
          <CmsImageField
            label="Default Social Share Image (OG)"
            value={formData.default_og_image}
            onChange={(v) => setFormData({ ...formData, default_og_image: v })}
          />
        </div>
      </div>

      {/* Conference Event Master Info */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
          Event Master Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CmsInput
            label="Event Dates"
            value={formData.event?.dates}
            onChange={(v) => updateEvent('dates', v)}
            placeholder="14 - 16 September 2027"
          />
          <CmsInput
            label="Event Days"
            value={formData.event?.days}
            onChange={(v) => updateEvent('days', v)}
            placeholder="Tuesday to Thursday"
          />
          <CmsInput
            label="Event Year"
            value={formData.event?.year}
            onChange={(v) => updateEvent('year', v)}
            placeholder="2027"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CmsInput
            label="Target Audience"
            value={formData.event?.targetAudience}
            onChange={(v) => updateEvent('targetAudience', v)}
          />
          <CmsInput
            label="Countdown ISO Start Date (UTC)"
            value={formData.event?.startDateIso}
            onChange={(v) => updateEvent('startDateIso', v)}
            placeholder="2027-09-14T09:00:00+05:30"
          />
        </div>
      </div>

      {/* Global Contact & Venue Information */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-brand-blue" />
          <span>Global Contact Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CmsInput
            label="Primary Contact Email"
            type="email"
            value={formData.contacts?.email}
            onChange={(v) => updateContact('email', v)}
          />
          <CmsInput
            label="Full Physical Address"
            value={formData.contacts?.full_address}
            onChange={(v) => updateContact('full_address', v)}
          />
        </div>

        {/* Contact Phones Repeater */}
        <CmsRepeater
          label="Helpline Phone Numbers"
          items={formData.contacts?.phones || []}
          onChange={(v) => updateContact('phones', v)}
          newItemFactory={() => ({ display: '+91 99999 99999', value: '+919999999999' })}
          addLabel="Add Phone Number"
          renderItem={(item, i, updateItem) => (
            <div className="grid grid-cols-2 gap-3">
              <CmsInput
                label="Display Number"
                value={item.display}
                onChange={(v) => updateItem({ ...item, display: v })}
                placeholder="+91 98867 69948"
              />
              <CmsInput
                label="Tel URI Value"
                value={item.value}
                onChange={(v) => updateItem({ ...item, value: v })}
                placeholder="+919886769948"
              />
            </div>
          )}
        />

        {/* Venue Information */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-blue" />
            <span>Venue Information</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CmsInput
              label="Venue Name"
              value={formData.contacts?.venue?.name}
              onChange={(v) => updateVenue('name', v)}
            />
            <CmsInput
              label="City"
              value={formData.contacts?.venue?.city}
              onChange={(v) => updateVenue('city', v)}
            />
            <CmsInput
              label="State"
              value={formData.contacts?.venue?.state}
              onChange={(v) => updateVenue('state', v)}
            />
          </div>

          <CmsInput
            label="Google Maps Embed URL"
            value={formData.contacts?.venue?.mapEmbedUrl}
            onChange={(v) => updateVenue('mapEmbedUrl', v)}
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-brand-blue" />
          <span>Social Media Links</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CmsInput
            label="Facebook Profile / Page URL"
            value={formData.social_links?.facebook}
            onChange={(v) => updateSocial('facebook', v)}
            placeholder="https://facebook.com/..."
          />
          <CmsInput
            label="Instagram Profile URL"
            value={formData.social_links?.instagram}
            onChange={(v) => updateSocial('instagram', v)}
            placeholder="https://instagram.com/..."
          />
          <CmsInput
            label="YouTube Channel URL"
            value={formData.social_links?.youtube}
            onChange={(v) => updateSocial('youtube', v)}
            placeholder="https://youtube.com/..."
          />
          <CmsInput
            label="LinkedIn URL"
            value={formData.social_links?.linkedin}
            onChange={(v) => updateSocial('linkedin', v)}
            placeholder="https://linkedin.com/..."
          />
        </div>
      </div>
    </div>
  )
}
