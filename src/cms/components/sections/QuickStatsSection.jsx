import React from 'react'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'

const ICON_MAP = {
  Calendar,
  MapPin,
  Users,
  Clock,
}

export default function QuickStatsSection({ data = {} }) {
  const items = data.items || [
    { label: 'Dates', value: '14 - 16 September 2027', icon: 'Calendar' },
    { label: 'Venue', value: 'Ashirwad Global Learning Centre', icon: 'MapPin' },
    { label: 'Audience', value: '18 to 25 years old men and women', icon: 'Users' },
    { label: 'Format', value: 'Tuesday to Thursday • Full Board', icon: 'Clock' },
  ]

  return (
    <section className="bg-brand-navy-deep text-white border-y border-brand-border-navy py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-brand-border-navy text-xs">
          {items.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Calendar
            return (
              <div
                key={item.label || idx}
                className="pt-2 md:pt-0 md:px-4 first:pl-0 flex items-center gap-3"
              >
                <Icon className="w-4 h-4 text-brand-amber shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber">
                    {item.label}
                  </span>
                  <p className="font-semibold text-slate-200">{item.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
