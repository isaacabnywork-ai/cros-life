import React, { useState, useEffect } from 'react'
import { X, Save, Eye, Calendar, Smartphone, Tablet, Monitor } from 'lucide-react'
import { CmsInput, CmsSelect, CmsToggle, CmsButton } from '../ui/CmsFormControls'
import { CmsRepeater } from '../ui/CmsRepeater'
import { CmsImageField } from '../ui/CmsImageField'
import { CmsLinkField } from '../ui/CmsLinkField'
import { useCms } from '../../context/CmsContext'

export function SectionEditorModal({ section, isOpen, onClose, onSave }) {
  // Escape key handler
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !section) return null

  const { reusableBlocks } = useCms()
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(section.data || {})))
  const [status, setStatus] = useState(section.status || 'published')
  const [visibility, setVisibility] = useState(
    section.visibility || { desktop: true, tablet: true, mobile: true }
  )
  const [schedule, setSchedule] = useState(
    section.schedule || { publish_from: '', publish_until: '' }
  )

  const updateField = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }))
  }

  const updateNestedField = (parentKey, key, val) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...(prev[parentKey] || {}),
        [key]: val,
      },
    }))
  }

  const handleSave = () => {
    onSave({
      ...section,
      status,
      visibility,
      schedule,
      data: formData,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-panel shadow-panel border border-slate-200 w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-ice text-brand-blue border border-brand-border">
                {section.type}
              </span>
              <h3 className="font-display font-bold text-base text-slate-900">
                Edit Section: {formData.title || formData.headlinePart1 || section.type}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize the structured content and display settings for this section.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50">
          {/* Top Configuration: Visibility, Scheduling & Status */}
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-brand-blue" />
              <span>Section Visibility & Publishing</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full text-xs rounded border border-slate-300 px-2.5 py-1.5 bg-white"
                >
                  <option value="published">Published (Visible)</option>
                  <option value="draft">Draft (CMS only)</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>

              {/* Responsive Visibility Checkboxes */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Show on Devices
                </label>
                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-1 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibility.desktop}
                      onChange={(e) => setVisibility({ ...visibility, desktop: e.target.checked })}
                      className="rounded text-brand-blue"
                    />
                    <Monitor className="w-3.5 h-3.5 text-slate-500" />
                    <span>Desktop</span>
                  </label>

                  <label className="flex items-center gap-1 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibility.tablet}
                      onChange={(e) => setVisibility({ ...visibility, tablet: e.target.checked })}
                      className="rounded text-brand-blue"
                    />
                    <Tablet className="w-3.5 h-3.5 text-slate-500" />
                    <span>Tablet</span>
                  </label>

                  <label className="flex items-center gap-1 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibility.mobile}
                      onChange={(e) => setVisibility({ ...visibility, mobile: e.target.checked })}
                      className="rounded text-brand-blue"
                    />
                    <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                    <span>Mobile</span>
                  </label>
                </div>
              </div>

              {/* Scheduling */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Publish Schedule (Optional)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={schedule.publish_from || ''}
                    onChange={(e) => setSchedule({ ...schedule, publish_from: e.target.value })}
                    title="Publish From"
                    className="w-full text-[11px] rounded border border-slate-300 px-1.5 py-1"
                  />
                  <input
                    type="date"
                    value={schedule.publish_until || ''}
                    onChange={(e) => setSchedule({ ...schedule, publish_until: e.target.value })}
                    title="Publish Until"
                    className="w-full text-[11px] rounded border border-slate-300 px-1.5 py-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section Type Specific Content Form */}
          <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-6">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-200">
              Content Fields
            </h4>

            {/* 1. HERO SECTION */}
            {section.type === 'hero' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker Badge"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                    placeholder="e.g. A Conference for Young People"
                  />
                  <CmsInput
                    label="Organiser Note"
                    value={formData.organiserText}
                    onChange={(v) => updateField('organiserText', v)}
                    placeholder="e.g. Organised by Equip Indian Churches"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <CmsInput
                    label="Headline Part 1"
                    value={formData.headlinePart1}
                    onChange={(v) => updateField('headlinePart1', v)}
                    placeholder="One Life."
                  />
                  <CmsInput
                    label="Headline Highlight (Gradient)"
                    value={formData.headlineHighlight}
                    onChange={(v) => updateField('headlineHighlight', v)}
                    placeholder="One Desire."
                  />
                  <CmsInput
                    label="Headline Part 2"
                    value={formData.headlinePart2}
                    onChange={(v) => updateField('headlinePart2', v)}
                    placeholder="One Purpose."
                  />
                </div>

                <CmsInput
                  label="Core Line / Subheading"
                  type="textarea"
                  rows={2}
                  value={formData.coreLine}
                  onChange={(v) => updateField('coreLine', v)}
                />

                <CmsImageField
                  label="Background Scrim Image"
                  value={formData.backgroundImage}
                  onChange={(v) => updateField('backgroundImage', v)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CmsLinkField
                    label="Primary Button"
                    value={formData.primaryButton}
                    onChange={(v) => updateField('primaryButton', v)}
                  />
                  <CmsLinkField
                    label="Secondary Button"
                    value={formData.secondaryButton}
                    onChange={(v) => updateField('secondaryButton', v)}
                  />
                </div>

                {/* Metrics Repeater */}
                <CmsRepeater
                  label="Metrics Pills"
                  items={formData.metrics || []}
                  onChange={(v) => updateField('metrics', v)}
                  newItemFactory={() => ({ value: '100+', label: 'New Metric' })}
                  addLabel="Add Metric Pill"
                  renderItem={(item, i, updateItem) => (
                    <div className="grid grid-cols-2 gap-3">
                      <CmsInput
                        label="Value"
                        value={item.value}
                        onChange={(v) => updateItem({ ...item, value: v })}
                      />
                      <CmsInput
                        label="Label"
                        value={item.label}
                        onChange={(v) => updateItem({ ...item, label: v })}
                      />
                    </div>
                  )}
                />

                <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <CmsToggle
                    label="Show Quiet Countdown Strip"
                    checked={formData.showCountdown ?? true}
                    onChange={(v) => updateField('showCountdown', v)}
                  />
                  <CmsInput
                    label="Countdown Notice"
                    value={formData.countdownNotice}
                    onChange={(v) => updateField('countdownNotice', v)}
                  />
                </div>
              </div>
            )}

            {/* 2. QUICK STATS STRIP */}
            {section.type === 'quick_stats' && (
              <div className="space-y-4">
                <CmsRepeater
                  label="Stats Strip Items"
                  items={formData.items || []}
                  onChange={(v) => updateField('items', v)}
                  newItemFactory={() => ({ label: 'Stat', value: 'Value', icon: 'Calendar' })}
                  addLabel="Add Stat Item"
                  renderItem={(item, i, updateItem) => (
                    <div className="grid grid-cols-3 gap-3">
                      <CmsInput
                        label="Label"
                        value={item.label}
                        onChange={(v) => updateItem({ ...item, label: v })}
                      />
                      <CmsInput
                        label="Value"
                        value={item.value}
                        onChange={(v) => updateItem({ ...item, value: v })}
                      />
                      <CmsSelect
                        label="Icon"
                        value={item.icon}
                        options={['Calendar', 'MapPin', 'Users', 'Clock']}
                        onChange={(v) => updateItem({ ...item, icon: v })}
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {/* 3. PILLARS (What is CrossLife) */}
            {section.type === 'pillars' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>

                <CmsInput
                  label="Description"
                  type="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(v) => updateField('description', v)}
                />

                <CmsInput
                  label="Button Text"
                  value={formData.buttonText}
                  onChange={(v) => updateField('buttonText', v)}
                />

                <CmsRepeater
                  label="Pillar Cards"
                  items={formData.pillars || []}
                  onChange={(v) => updateField('pillars', v)}
                  newItemFactory={() => ({ num: '04', subtitle: 'Focus', title: 'New Pillar', desc: 'Description here.' })}
                  addLabel="Add Pillar Card"
                  renderItem={(item, i, updateItem) => (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <CmsInput
                          label="Number"
                          value={item.num}
                          onChange={(v) => updateItem({ ...item, num: v })}
                        />
                        <CmsInput
                          label="Subtitle Badge"
                          value={item.subtitle}
                          onChange={(v) => updateItem({ ...item, subtitle: v })}
                        />
                        <CmsInput
                          label="Title"
                          value={item.title}
                          onChange={(v) => updateItem({ ...item, title: v })}
                        />
                      </div>
                      <CmsInput
                        label="Description"
                        value={item.desc}
                        onChange={(v) => updateItem({ ...item, desc: v })}
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {/* 4. VISION & TARGET AUDIENCE */}
            {section.type === 'vision_audience' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h5 className="font-semibold text-xs text-slate-700">Left Column: Vision</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <CmsInput
                      label="Kicker"
                      value={formData.kicker}
                      onChange={(v) => updateField('kicker', v)}
                    />
                    <CmsInput
                      label="Title"
                      value={formData.title}
                      onChange={(v) => updateField('title', v)}
                    />
                  </div>
                  <CmsInput
                    label="Subtitle"
                    value={formData.subtitle}
                    onChange={(v) => updateField('subtitle', v)}
                  />

                  <CmsRepeater
                    label="Vision Value Cards"
                    items={formData.valuePoints || []}
                    onChange={(v) => updateField('valuePoints', v)}
                    newItemFactory={() => ({ title: 'Point', desc: 'Explanation', icon: 'ShieldCheck' })}
                    addLabel="Add Value Point"
                    renderItem={(item, i, updateItem) => (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-3">
                          <CmsInput
                            label="Title"
                            value={item.title}
                            onChange={(v) => updateItem({ ...item, title: v })}
                          />
                          <CmsSelect
                            label="Icon"
                            value={item.icon}
                            options={['ShieldCheck', 'BookOpen', 'Building']}
                            onChange={(v) => updateItem({ ...item, icon: v })}
                          />
                        </div>
                        <CmsInput
                          label="Description"
                          value={item.desc}
                          onChange={(v) => updateItem({ ...item, desc: v })}
                        />
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h5 className="font-semibold text-xs text-slate-700">Right Column: Demographic Profile</h5>
                  <div className="grid grid-cols-3 gap-3">
                    <CmsInput
                      label="Eligibility Badge"
                      value={formData.eligibilityBadge}
                      onChange={(v) => updateField('eligibilityBadge', v)}
                    />
                    <CmsInput
                      label="Age Tag"
                      value={formData.age}
                      onChange={(v) => updateField('age', v)}
                    />
                    <CmsInput
                      label="Profile Title"
                      value={formData.profileTitle}
                      onChange={(v) => updateField('profileTitle', v)}
                    />
                  </div>
                  <CmsInput
                    label="Summary"
                    type="textarea"
                    rows={2}
                    value={formData.summary}
                    onChange={(v) => updateField('summary', v)}
                  />

                  {/* Tags */}
                  <CmsRepeater
                    label="Ideal For Tags"
                    items={formData.tags || []}
                    onChange={(v) => updateField('tags', v)}
                    newItemFactory={() => 'New Tag'}
                    addLabel="Add Tag"
                    renderItem={(item, i, updateItem) => (
                      <CmsInput
                        label={`Tag #${i + 1}`}
                        value={item}
                        onChange={(v) => updateItem(v)}
                      />
                    )}
                  />

                  {/* Includes */}
                  <CmsRepeater
                    label="Includes Checklist"
                    items={formData.includes || []}
                    onChange={(v) => updateField('includes', v)}
                    newItemFactory={() => 'New included feature'}
                    addLabel="Add Checklist Item"
                    renderItem={(item, i, updateItem) => (
                      <CmsInput
                        label={`Item #${i + 1}`}
                        value={item}
                        onChange={(v) => updateItem(v)}
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* 5. DIFFERENCE SECTION */}
            {section.type === 'difference' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>

                <CmsInput
                  label="Pull Quote Banner"
                  type="textarea"
                  rows={2}
                  value={formData.pullQuote}
                  onChange={(v) => updateField('pullQuote', v)}
                />

                <CmsRepeater
                  label="Comparison Cards"
                  items={formData.pillars || []}
                  onChange={(v) => updateField('pillars', v)}
                  newItemFactory={() => ({
                    badge: 'New',
                    focus: 'Our Focus',
                    contrasting: 'What we avoid',
                    desc: 'Details',
                  })}
                  addLabel="Add Comparison Card"
                  renderItem={(item, i, updateItem) => (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-3">
                        <CmsInput
                          label="Badge"
                          value={item.badge}
                          onChange={(v) => updateItem({ ...item, badge: v })}
                        />
                        <CmsInput
                          label="Focus Title"
                          value={item.focus}
                          onChange={(v) => updateItem({ ...item, focus: v })}
                        />
                        <CmsInput
                          label="Contrasting Note"
                          value={item.contrasting}
                          onChange={(v) => updateItem({ ...item, contrasting: v })}
                        />
                      </div>
                      <CmsInput
                        label="Description"
                        value={item.desc}
                        onChange={(v) => updateItem({ ...item, desc: v })}
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {/* 6. GOALS (Hopes & Goals) */}
            {section.type === 'goals' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>
                <CmsInput
                  label="Subtitle"
                  value={formData.subtitle}
                  onChange={(v) => updateField('subtitle', v)}
                />

                <CmsRepeater
                  label="Numbered Goals"
                  items={formData.goals || []}
                  onChange={(v) => updateField('goals', v)}
                  newItemFactory={() => ({ number: '06', title: 'New Goal', summary: 'Summary of goal.' })}
                  addLabel="Add Goal Card"
                  renderItem={(item, i, updateItem) => (
                    <div className="grid grid-cols-4 gap-3">
                      <CmsInput
                        label="Number"
                        value={item.number}
                        onChange={(v) => updateItem({ ...item, number: v })}
                      />
                      <div className="col-span-3 space-y-2">
                        <CmsInput
                          label="Goal Title"
                          value={item.title}
                          onChange={(v) => updateItem({ ...item, title: v })}
                        />
                        <CmsInput
                          label="Summary"
                          value={item.summary}
                          onChange={(v) => updateItem({ ...item, summary: v })}
                        />
                      </div>
                    </div>
                  )}
                />
              </div>
            )}

            {/* 7. SPEAKERS */}
            {section.type === 'speakers' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                  <CmsInput
                    label="Right Badge"
                    value={formData.rightBadge}
                    onChange={(v) => updateField('rightBadge', v)}
                  />
                </div>
                <CmsInput
                  label="Subtitle"
                  value={formData.subtitle}
                  onChange={(v) => updateField('subtitle', v)}
                />

                <CmsRepeater
                  label="Speakers List"
                  items={formData.speakers || []}
                  onChange={(v) => updateField('speakers', v)}
                  newItemFactory={() => ({
                    id: `speaker-${Date.now()}`,
                    name: 'Speaker Name',
                    role: 'Pastor',
                    church: 'Church & City',
                    topic: 'Session Exposition',
                    image: null,
                  })}
                  addLabel="Add Speaker"
                  renderItem={(item, i, updateItem) => (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <CmsInput
                          label="Full Name"
                          value={item.name}
                          onChange={(v) => updateItem({ ...item, name: v })}
                        />
                        <CmsInput
                          label="Role"
                          value={item.role}
                          onChange={(v) => updateItem({ ...item, role: v })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <CmsInput
                          label="Church & City"
                          value={item.church}
                          onChange={(v) => updateItem({ ...item, church: v })}
                        />
                        <CmsInput
                          label="Session / Topic"
                          value={item.topic}
                          onChange={(v) => updateItem({ ...item, topic: v })}
                        />
                      </div>
                      <CmsImageField
                        label="Speaker Photograph"
                        value={item.image}
                        onChange={(v) => updateItem({ ...item, image: v })}
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {/* 8. PRICING & PASSES */}
            {section.type === 'pricing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>
                <CmsInput
                  label="Subtitle"
                  value={formData.subtitle}
                  onChange={(v) => updateField('subtitle', v)}
                />

                {/* Early Bird Card */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                  <h5 className="font-semibold text-xs text-slate-800">Tier 01: Early Bird Pass</h5>
                  <div className="grid grid-cols-3 gap-3">
                    <CmsInput
                      label="Label"
                      value={formData.earlyBird?.label}
                      onChange={(v) => updateNestedField('earlyBird', 'label', v)}
                    />
                    <CmsInput
                      label="Formatted Amount"
                      value={formData.earlyBird?.formattedAmount}
                      onChange={(v) => updateNestedField('earlyBird', 'formattedAmount', v)}
                    />
                    <CmsInput
                      label="Badge"
                      value={formData.earlyBird?.badge}
                      onChange={(v) => updateNestedField('earlyBird', 'badge', v)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <CmsInput
                      label="Coupon Code"
                      value={formData.earlyBird?.coupon?.code}
                      onChange={(v) =>
                        updateNestedField('earlyBird', 'coupon', {
                          ...formData.earlyBird?.coupon,
                          code: v,
                        })
                      }
                    />
                    <CmsInput
                      label="Coupon Copy"
                      value={formData.earlyBird?.coupon?.copy}
                      onChange={(v) =>
                        updateNestedField('earlyBird', 'coupon', {
                          ...formData.earlyBird?.coupon,
                          copy: v,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Regular Pass Card */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                  <h5 className="font-semibold text-xs text-slate-800">Tier 02: Regular Registration Pass</h5>
                  <div className="grid grid-cols-3 gap-3">
                    <CmsInput
                      label="Label"
                      value={formData.regular?.label}
                      onChange={(v) => updateNestedField('regular', 'label', v)}
                    />
                    <CmsInput
                      label="Formatted Amount"
                      value={formData.regular?.formattedAmount}
                      onChange={(v) => updateNestedField('regular', 'formattedAmount', v)}
                    />
                    <CmsInput
                      label="Badge"
                      value={formData.regular?.badge}
                      onChange={(v) => updateNestedField('regular', 'badge', v)}
                    />
                  </div>
                  <CmsInput
                    label="Footer Note"
                    value={formData.regular?.note}
                    onChange={(v) => updateNestedField('regular', 'note', v)}
                  />
                </div>
              </div>
            )}

            {/* 9. BOOK FEATURE */}
            {section.type === 'book_feature' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>
                <CmsInput
                  label="Description"
                  type="textarea"
                  rows={2}
                  value={formData.description}
                  onChange={(v) => updateField('description', v)}
                />
                <CmsInput
                  label="Button Text"
                  value={formData.buttonText}
                  onChange={(v) => updateField('buttonText', v)}
                />

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                  <h5 className="font-semibold text-xs text-slate-800">Book Mockup Details</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <CmsInput
                      label="Book Title"
                      value={formData.book?.title}
                      onChange={(v) => updateNestedField('book', 'title', v)}
                    />
                    <CmsInput
                      label="Author"
                      value={formData.book?.author}
                      onChange={(v) => updateNestedField('book', 'author', v)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <CmsInput
                      label="Badge"
                      value={formData.book?.badge}
                      onChange={(v) => updateNestedField('book', 'badge', v)}
                    />
                    <CmsInput
                      label="Publisher / Edition"
                      value={formData.book?.publisher}
                      onChange={(v) => updateNestedField('book', 'publisher', v)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 10. BOOKSTORE */}
            {section.type === 'bookstore' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>
                <CmsInput
                  label="Subtitle"
                  value={formData.subtitle}
                  onChange={(v) => updateField('subtitle', v)}
                />

                <CmsRepeater
                  label="Category Showcase Cards"
                  items={formData.categories || []}
                  onChange={(v) => updateField('categories', v)}
                  newItemFactory={() => ({ title: 'Category', desc: 'Description', tag: 'Discount', icon: 'BookOpen' })}
                  addLabel="Add Showcase Category"
                  renderItem={(item, i, updateItem) => (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-3">
                        <CmsInput
                          label="Title"
                          value={item.title}
                          onChange={(v) => updateItem({ ...item, title: v })}
                        />
                        <CmsInput
                          label="Tag / Badge"
                          value={item.tag}
                          onChange={(v) => updateItem({ ...item, tag: v })}
                        />
                        <CmsSelect
                          label="Icon"
                          value={item.icon}
                          options={['BookOpen', 'Library', 'Sparkles']}
                          onChange={(v) => updateItem({ ...item, icon: v })}
                        />
                      </div>
                      <CmsInput
                        label="Description"
                        value={item.desc}
                        onChange={(v) => updateItem({ ...item, desc: v })}
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {/* 11. VENUE */}
            {section.type === 'venue' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Venue Name"
                    value={formData.venueName}
                    onChange={(v) => updateField('venueName', v)}
                  />
                  <CmsInput
                    label="City & State"
                    value={formData.cityState}
                    onChange={(v) => updateField('cityState', v)}
                  />
                </div>
                <CmsInput
                  label="Google Maps Embed URL"
                  value={formData.mapEmbedUrl}
                  onChange={(v) => updateField('mapEmbedUrl', v)}
                />
                <CmsInput
                  label="Get Directions Link"
                  value={formData.directionsUrl}
                  onChange={(v) => updateField('directionsUrl', v)}
                />

                <CmsRepeater
                  label="Campus Facilities"
                  items={formData.facilities || []}
                  onChange={(v) => updateField('facilities', v)}
                  newItemFactory={() => 'New facility feature'}
                  addLabel="Add Facility"
                  renderItem={(item, i, updateItem) => (
                    <CmsInput
                      label={`Facility #${i + 1}`}
                      value={item}
                      onChange={(v) => updateItem(v)}
                    />
                  )}
                />
              </div>
            )}

            {/* 12. ORGANISER & PARTNERS */}
            {section.type === 'organiser_partners' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>

                {/* Organiser Spotlight */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                  <h5 className="font-semibold text-xs text-slate-800">Organiser Spotlight</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <CmsInput
                      label="Organiser Name"
                      value={formData.organiser?.name}
                      onChange={(v) => updateNestedField('organiser', 'name', v)}
                    />
                    <CmsInput
                      label="Tagline"
                      value={formData.organiser?.tagline}
                      onChange={(v) => updateNestedField('organiser', 'tagline', v)}
                    />
                  </div>
                  <CmsInput
                    label="Introduction"
                    type="textarea"
                    rows={2}
                    value={formData.organiser?.intro}
                    onChange={(v) => updateNestedField('organiser', 'intro', v)}
                  />
                </div>

                {/* Partners List */}
                <CmsRepeater
                  label="Partner Ministries & Churches"
                  items={formData.partners || []}
                  onChange={(v) => updateField('partners', v)}
                  newItemFactory={() => ({
                    id: `partner-${Date.now()}`,
                    name: 'Partner Church',
                    city: 'City, State',
                    type: 'Supporting Church',
                  })}
                  addLabel="Add Partner"
                  renderItem={(item, i, updateItem) => (
                    <div className="grid grid-cols-3 gap-3">
                      <CmsInput
                        label="Name"
                        value={item.name}
                        onChange={(v) => updateItem({ ...item, name: v })}
                      />
                      <CmsInput
                        label="City, State"
                        value={item.city}
                        onChange={(v) => updateItem({ ...item, city: v })}
                      />
                      <CmsInput
                        label="Type / Fellowship"
                        value={item.type}
                        onChange={(v) => updateItem({ ...item, type: v })}
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {/* 13. FAQ PREVIEW */}
            {section.type === 'faq_preview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>

                <CmsRepeater
                  label="FAQ Accordion Items"
                  items={formData.items || []}
                  onChange={(v) => updateField('items', v)}
                  newItemFactory={() => ({
                    id: `faq-${Date.now()}`,
                    question: 'New Question?',
                    answer: 'Answer text here.',
                  })}
                  addLabel="Add FAQ Item"
                  renderItem={(item, i, updateItem) => (
                    <div className="space-y-2">
                      <CmsInput
                        label="Question"
                        value={item.question}
                        onChange={(v) => updateItem({ ...item, question: v })}
                      />
                      <CmsInput
                        label="Answer"
                        type="textarea"
                        rows={2}
                        value={item.answer}
                        onChange={(v) => updateItem({ ...item, answer: v })}
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {/* 14. FINAL CTA */}
            {section.type === 'final_cta' && (
              <div className="space-y-4">
                <CmsInput
                  label="Kicker / Date notice"
                  value={formData.kicker}
                  onChange={(v) => updateField('kicker', v)}
                />
                <CmsInput
                  label="Headline"
                  value={formData.headline}
                  onChange={(v) => updateField('headline', v)}
                />
                <CmsInput
                  label="Subtext"
                  type="textarea"
                  rows={2}
                  value={formData.subtext}
                  onChange={(v) => updateField('subtext', v)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CmsLinkField
                    label="Primary CTA Button"
                    value={formData.primaryButton}
                    onChange={(v) => updateField('primaryButton', v)}
                  />
                  <CmsLinkField
                    label="Secondary Button"
                    value={formData.secondaryButton}
                    onChange={(v) => updateField('secondaryButton', v)}
                  />
                </div>
              </div>
            )}

            {/* 15. RICH TEXT */}
            {section.type === 'rich_text' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                </div>
                <CmsInput
                  label="Subtitle"
                  value={formData.subtitle}
                  onChange={(v) => updateField('subtitle', v)}
                />

                <CmsRepeater
                  label="Paragraphs"
                  items={formData.paragraphs || []}
                  onChange={(v) => updateField('paragraphs', v)}
                  newItemFactory={() => 'New paragraph.'}
                  addLabel="Add Paragraph"
                  renderItem={(item, i, updateItem) => (
                    <CmsInput
                      type="textarea"
                      rows={2}
                      label={`Paragraph #${i + 1}`}
                      value={item}
                      onChange={(v) => updateItem(v)}
                    />
                  )}
                />
              </div>
            )}

            {/* 16. CARDS */}
            {section.type === 'cards' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <CmsInput
                    label="Kicker"
                    value={formData.kicker}
                    onChange={(v) => updateField('kicker', v)}
                  />
                  <CmsInput
                    label="Title"
                    value={formData.title}
                    onChange={(v) => updateField('title', v)}
                  />
                  <CmsSelect
                    label="Columns"
                    value={formData.columns || 3}
                    options={[2, 3, 4]}
                    onChange={(v) => updateField('columns', Number(v))}
                  />
                </div>

                <CmsRepeater
                  label="Cards"
                  items={formData.cards || []}
                  onChange={(v) => updateField('cards', v)}
                  newItemFactory={() => ({
                    title: 'Card Title',
                    description: 'Card details',
                    badge: '',
                    link: '',
                    linkText: 'Learn More',
                  })}
                  addLabel="Add Card"
                  renderItem={(item, i, updateItem) => (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-3">
                        <CmsInput
                          label="Title"
                          value={item.title}
                          onChange={(v) => updateItem({ ...item, title: v })}
                        />
                        <CmsInput
                          label="Badge"
                          value={item.badge}
                          onChange={(v) => updateItem({ ...item, badge: v })}
                        />
                      </div>
                      <CmsInput
                        label="Description"
                        type="textarea"
                        rows={2}
                        value={item.description}
                        onChange={(v) => updateItem({ ...item, description: v })}
                      />
                      <CmsImageField
                        label="Card Image"
                        value={item.image}
                        onChange={(v) => updateItem({ ...item, image: v })}
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {/* 17. CUSTOM HTML */}
            {section.type === 'custom_html' && (
              <div className="space-y-4">
                <CmsInput
                  label="Block Title (Optional)"
                  value={formData.title}
                  onChange={(v) => updateField('title', v)}
                />
                <CmsInput
                  label="Custom HTML Content (Sanitized)"
                  type="textarea"
                  rows={8}
                  value={formData.html}
                  onChange={(v) => updateField('html', v)}
                  description="Standard markup only. Script tags and dangerous event handlers are automatically sanitized for security."
                />
              </div>
            )}

            {/* 18. REUSABLE BLOCK */}
            {section.type === 'reusable_block' && (
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-slate-700">Select Reusable Block</label>
                <select
                  value={formData.block_id || ''}
                  onChange={(e) => updateField('block_id', e.target.value)}
                  className="w-full text-xs rounded border border-slate-300 px-3 py-2 bg-white"
                >
                  <option value="">-- Choose a block --</option>
                  {reusableBlocks.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.type})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">
                  Editing the source block under Reusable Blocks will immediately update all pages where it appears.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <span className="text-xs text-slate-500">
            Changes will update in real-time upon clicking Save.
          </span>

          <div className="flex items-center gap-2">
            <CmsButton variant="outline" onClick={onClose}>
              Cancel
            </CmsButton>
            <CmsButton variant="primary" onClick={handleSave}>
              <Save className="w-3.5 h-3.5 mr-1" />
              <span>Save Section Changes</span>
            </CmsButton>
          </div>
        </div>
      </div>
    </div>
  )
}
