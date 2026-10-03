import React from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'

export default function VenueSection({ data = {} }) {
  const {
    kicker = 'LOCATION & LODGING',
    title = 'Venue & Campus',
    venueName = 'Ashirwad Global Learning Centre',
    cityState = 'Hyderabad, Telangana',
    directionsUrl = 'https://maps.google.com',
    mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121818.89886861614!2d78.372883!3d17.435777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb974776e0176b%3A0xb35a09b4c0e5a956!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    facilities = [
      'Air-conditioned assembly auditorium',
      'Comfortable student dormitory lodging',
      'On-site dining halls & quiet study gardens',
    ],
    boardNote = 'Full Board',
  } = data

  return (
    <section className="py-20 bg-brand-page border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              {kicker && (
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
                  {kicker}
                </span>
              )}
              <h2 className="font-display font-bold text-display-md text-brand-navy">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                {venueName}, {cityState}
              </p>
            </div>
            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-brand-blue inline-flex items-center gap-1 hover:underline"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Highlights Column */}
          <div className="lg:col-span-4 bg-white rounded-panel border border-brand-border p-6 shadow-editorial flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-amber block">
                Campus Facilities
              </span>
              <h3 className="font-display font-bold text-lg text-brand-navy">
                {venueName}
              </h3>
              {facilities && facilities.length > 0 && (
                <ul className="space-y-2 text-xs text-brand-muted">
                  {facilities.map((fac, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-blue" />
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[11px] text-brand-subtle">
              <span>{cityState}</span>
              {boardNote && <span className="font-mono">{boardNote}</span>}
            </div>
          </div>

          {/* Map Preview */}
          <div className="lg:col-span-8 rounded-panel border border-brand-border overflow-hidden shadow-editorial bg-slate-100 min-h-[260px] relative">
            <iframe
              title="CrossLife Conference Venue Location Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '260px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
