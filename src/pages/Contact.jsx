import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Phone, Mail, MapPin, CheckCircle, Send } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import SEO from '../components/ui/SEO'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

import { useCms } from '../cms/context/CmsContext'

export default function Contact() {
  const { settings } = useCms()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const phones = settings?.contacts?.phones || SITE_CONFIG.contacts.phones
  const email = settings?.contacts?.email || SITE_CONFIG.contacts.email
  const venue = settings?.contacts?.venue || SITE_CONFIG.venue
  const organiser = settings?.event?.organiser || SITE_CONFIG.organiser

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      reset()
    }, 800)
  }

  return (
    <div className="bg-brand-page min-h-screen pt-28 pb-24">
      <SEO
        title="Contact Us"
        description="Get in touch with the CrossLife organising team for conference inquiries, registration assistance, and venue details."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pt-8">
          <SectionHeading
            kicker="INQUIRIES & SUPPORT"
            title="Contact the Team"
            subtitle="Have a question about registration, accommodation, travel, or group delegations? Reach out to us below."
          />
          <div className="w-16 h-0.5 bg-brand-amber mt-6" />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Solid Blue Panel (#1E4B82) */}
          <div className="lg:col-span-5 bg-brand-blue text-white rounded-panel p-8 sm:p-12 shadow-panel flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-amber block mb-2">
                  DIRECT CONTACT
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  Get in Touch
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
                  Our team is available to assist young people, parents, and church leaders.
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-white/20">
                {/* Call Us */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-btn bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-brand-amber" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-blue-200 block font-semibold">
                      Call Us
                    </span>
                    <div className="mt-1 space-y-1">
                      {phones.map((phone) => (
                        <a
                          key={phone.value}
                          href={`tel:${phone.value}`}
                          className="block text-sm sm:text-base font-mono font-medium hover:text-brand-amber transition-colors"
                        >
                          {phone.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-btn bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-brand-amber" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-blue-200 block font-semibold">
                      Email Us
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="block text-sm sm:text-base hover:text-brand-amber transition-colors mt-1 font-mono"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-btn bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-brand-amber" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-blue-200 block font-semibold">
                      Venue
                    </span>
                    <p className="text-sm font-medium mt-1">
                      {venue.name}
                    </p>
                    <p className="text-xs text-blue-200">
                      {venue.city}, {venue.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/20 text-xs text-blue-100">
              CrossLife is organised under the ministry of {organiser}.
            </div>
          </div>

          {/* Right Column: "You can write to us" Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-panel border border-brand-border shadow-editorial">
            <div className="mb-8">
              <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-brand-blue block mb-1">
                ONLINE INQUIRY
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy">
                You can write to us
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-1">
                Fill in the details below and we will respond promptly.
              </p>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className="p-8 rounded-card bg-brand-ice/80 border border-brand-blue/30 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-brand-amber" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-navy">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-brand-muted max-w-md mx-auto">
                  Thank you for reaching out. A member of our conference coordination team will review your message and get in touch with you shortly.
                </p>
                <div className="pt-2">
                  <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-brand-text">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', {
                      required: 'Full name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                    className={`w-full px-4 py-3 rounded-btn border text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.name
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-brand-border focus:border-brand-blue focus:ring-brand-blue/20'
                    }`}
                    placeholder="e.g. Samuel David"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 font-medium">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Address and Phone in 2 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-text">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email address is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address',
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-btn border text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-brand-border focus:border-brand-blue focus:ring-brand-blue/20'
                      }`}
                      placeholder="samuel@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 font-medium">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-brand-text">
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone', {
                        required: 'Phone number is required',
                        minLength: { value: 8, message: 'Please enter a valid phone number' },
                      })}
                      className={`w-full px-4 py-3 rounded-btn border text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.phone
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-brand-border focus:border-brand-blue focus:ring-brand-blue/20'
                      }`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-600 font-medium">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-brand-text">
                    Your Message <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', {
                      required: 'Please write your message or inquiry',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    })}
                    className={`w-full px-4 py-3 rounded-btn border text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.message
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-brand-border focus:border-brand-blue focus:ring-brand-blue/20'
                    }`}
                    placeholder="Tell us about your inquiry, group delegation, or question..."
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-600 font-medium">{errors.message.message}</p>
                  )}
                </div>

                {/* Clearly Commented reCAPTCHA Placeholder */}
                {/* 
                  reCAPTCHA PLACEHOLDER:
                  <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
                */}

                {/* Submit Action */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}</span>
                    <Send className="w-4 h-4 ml-2" strokeWidth={1.75} />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
