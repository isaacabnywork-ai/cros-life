import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Calendar, Clock, Users, Copy, Check, ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import {
  CORE_STATEMENTS,
  WHY_CROSSLIFE,
  WHO_IS_IT_FOR,
  WHAT_MAKES_DIFFERENT,
  HOPES_AND_GOALS,
  BOOKSTORE_INFO,
  ORGANISER_INFO,
} from '../data/eventData'
import { SPEAKERS } from '../data/speakers'
import { FAQS } from '../data/faqs'
import { PARTNERS } from '../data/partners'
import { useModal } from '../context/ModalContext'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import Accordion from '../components/ui/Accordion'
import Reveal from '../components/ui/Reveal'
import CrossDivider from '../components/ui/CrossDivider'
import Countdown from '../components/ui/Countdown'
import SEO from '../components/ui/SEO'

export default function Home() {
  const { openRegisterModal } = useModal()
  const [couponCopied, setCouponCopied] = useState(false)

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(SITE_CONFIG.pricing.coupon.code)
    setCouponCopied(true)
    setTimeout(() => setCouponCopied(false), 2000)
  }

  // FAQ preview items (first 5)
  const faqPreviewItems = FAQS.slice(0, 5)

  return (
    <div className="bg-brand-page text-brand-text">
      <SEO
        title="One Life | Gospel-Centred Youth Conference"
        description="CrossLife is a Gospel-centred youth conference for men and women aged 18 to 25. 14-16 September 2027 in Hyderabad, Telangana."
      />

      {/* ========================================================================= */}
      {/* 1.a. HERO SECTION                                                         */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between bg-brand-navy pt-28 pb-16 overflow-hidden">
        {/* Hero Background Image with Editorial Scrim for High-Contrast Readability */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/hero-bg.png"
            onError={(e) => {
              // Fallback to remote CDN if local file is missing
              e.currentTarget.src = 'https://crosslife.in/wp-content/uploads/2024/12/Homepage-Blur-e1735303144723.png'
            }}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-45 mix-blend-luminosity"
          />
          {/* Multi-stage gradient scrim ensuring WCAG AA contrast for text */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/75 to-brand-navy" />
        </div>

        {/* Subtle geometric hairline watermarks echoing the brand cross */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] border border-brand-amber/30 rounded-full" />
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#1E4B82" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#1E4B82" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Center Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12 relative z-10">
          <Reveal>
            <div className="max-w-4xl space-y-6">
              {/* Event Sub-tagline & Organiser Kicker */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block py-1 px-3 rounded bg-brand-blue/30 border border-brand-blue/50 text-brand-amber text-xs uppercase font-bold tracking-[0.16em]">
                  {SITE_CONFIG.subTagline}
                </span>
                <span className="text-slate-400 text-xs tracking-wider">
                  Organised by <strong className="text-slate-200">{SITE_CONFIG.organiser}</strong>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-white text-display-2xl tracking-tight leading-[1.05]">
                One Life. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-brand-amber to-amber-200">
                  One Desire.
                </span>{' '}
                <br />
                One Purpose.
              </h1>

              {/* Core Line */}
              <p className="text-slate-300 text-base sm:text-xl font-normal max-w-2xl leading-relaxed">
                {CORE_STATEMENTS.coreLine}
              </p>

              {/* Quick Meta: Dates & Venue */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300 pt-2 font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-amber" strokeWidth={1.5} />
                  <span>{SITE_CONFIG.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-amber" strokeWidth={1.5} />
                  <span>{SITE_CONFIG.venue.name}, {SITE_CONFIG.venue.city}</span>
                </div>
              </div>

              {/* Actions: Register Now and Event Info and Rates */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  variant="amber"
                  size="lg"
                  onClick={() => openRegisterModal('early-bird')}
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                </Button>

                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={() => openRegisterModal('early-bird')}
                >
                  Event Info and Rates
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Quiet Countdown Strip inside Hero Base */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 relative z-10 border-t border-brand-border-navy/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs uppercase font-semibold tracking-wider text-slate-400">
            Commencing 14 September 2027
          </div>
          <Countdown />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.b. EVENT STRIP                                                          */}
      {/* ========================================================================= */}
      <section className="bg-brand-navy-deep text-white border-y border-brand-border-navy py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-brand-border-navy text-xs">
            <div className="pt-2 md:pt-0 md:px-4 first:pl-0">
              <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber mb-1">
                Dates
              </span>
              <p className="font-semibold text-slate-200">{SITE_CONFIG.dates}</p>
            </div>
            <div className="pt-2 md:pt-0 md:px-4">
              <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber mb-1">
                Venue
              </span>
              <p className="font-semibold text-slate-200">{SITE_CONFIG.venue.name}, {SITE_CONFIG.venue.city}</p>
            </div>
            <div className="pt-2 md:pt-0 md:px-4">
              <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber mb-1">
                Audience
              </span>
              <p className="font-semibold text-slate-200">{SITE_CONFIG.targetAudience}</p>
            </div>
            <div className="pt-2 md:pt-0 md:px-4">
              <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber mb-1">
                Schedule
              </span>
              <p className="font-semibold text-slate-200">{SITE_CONFIG.days}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.c. WHAT IS CROSSLIFE (Split Layout)                                      */}
      {/* ========================================================================= */}
      <section id="what-is-crosslife" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Large Statement Left */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                WHAT IS CROSSLIFE
              </span>
              <h2 className="font-display font-bold text-display-lg sm:text-display-xl text-brand-navy leading-tight">
                Designed to inspire and equip young people for one life.
              </h2>
            </div>

            {/* Supporting Text Right */}
            <div className="lg:col-span-6 space-y-6 lg:border-l lg:border-brand-border lg:pl-12">
              <p className="text-lg sm:text-xl text-brand-text font-normal leading-relaxed">
                "{CORE_STATEMENTS.whatIsCrossLife}"
              </p>
              <div className="w-12 h-0.5 bg-brand-amber" />
              <p className="text-sm text-brand-muted leading-relaxed">
                Organised by pastors from across India under the banner of Equip Indian Churches, this gathering brings young men and women together for three intensive days of biblical instruction and mutual encouragement.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CrossDivider />

      {/* ========================================================================= */}
      {/* 1.d. WHY CROSSLIFE & WHO IT IS FOR (Two-Column Editorial Block)           */}
      {/* ========================================================================= */}
      <section className="py-20 bg-brand-ice/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Why CrossLife */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                    THE VISION
                  </span>
                  <h2 className="font-display font-bold text-display-lg text-brand-navy">
                    {WHY_CROSSLIFE.title}
                  </h2>
                </div>
                <div className="space-y-4 text-brand-muted text-base leading-relaxed pt-2">
                  {WHY_CROSSLIFE.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Who Is It For */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-panel border border-brand-border shadow-editorial self-start space-y-6">
              <Reveal delay={0.1}>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-amber block">
                    TARGET AUDIENCE
                  </span>
                  <h3 className="font-display font-bold text-2xl text-brand-navy">
                    {WHO_IS_IT_FOR.title}
                  </h3>
                </div>

                <div className="w-10 h-0.5 bg-brand-navy" />

                <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                  {WHO_IS_IT_FOR.content}
                </p>

                <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs text-brand-subtle font-mono">
                  <span>Age: 18 - 25 Years</span>
                  <span>Men & Women</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.e. WHAT MAKES CROSSLIFE DIFFERENT (Full-Bleed Navy Band)                */}
      {/* ========================================================================= */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        {/* Subtle background hairline */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <svg viewBox="0 0 120 120" className="w-96 h-96" fill="currentColor">
            <rect x="55" y="0" width="10" height="120" />
            <rect x="0" y="38" width="120" height="10" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <span className="text-xs uppercase font-bold tracking-[0.18em] text-brand-amber block">
                {WHAT_MAKES_DIFFERENT.kicker}
              </span>
              <h2 className="font-display font-bold text-display-xl text-white tracking-tight leading-tight">
                {WHAT_MAKES_DIFFERENT.title}
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              <Reveal delay={0.1}>
                {WHAT_MAKES_DIFFERENT.paragraphs.map((p, idx) => (
                  <p key={idx} className="mb-4">
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>

            {/* Closing Pull Quote: Large Editorial Typography */}
            <div className="lg:col-span-5 flex items-center">
              <Reveal delay={0.2}>
                <div className="p-8 sm:p-10 rounded-panel bg-brand-navy-deep border-l-4 border-brand-amber border-y border-r border-brand-border-navy">
                  <blockquote className="font-display font-medium text-xl sm:text-2xl text-white leading-snug tracking-tight">
                    "{WHAT_MAKES_DIFFERENT.pullQuote}"
                  </blockquote>
                  <p className="mt-4 text-xs uppercase font-bold tracking-widest text-slate-400">
                    The CrossLife Conviction
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.f. HOPES AND GOALS (Numbered 01-05 Editorial List, Not Cards)          */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-2">
              CONFERENCE OBJECTIVES
            </span>
            <h2 className="font-display font-bold text-display-lg text-brand-navy">
              Hopes and Goals
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mt-2">
              The biblical outcomes we pray and labour for throughout this gathering.
            </p>
          </div>
        </Reveal>

        {/* Numbered Editorial List */}
        <div className="divide-y divide-brand-border border-y border-brand-border">
          {HOPES_AND_GOALS.map((goal, index) => (
            <Reveal key={goal.number} delay={index * 0.06}>
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group hover:bg-brand-ice/30 transition-colors px-4 -mx-4 rounded">
                {/* Oversized Plain Numeral */}
                <div className="md:col-span-2">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-brand-blue tracking-tight">
                    {goal.number}
                  </span>
                </div>
                {/* Statement Body */}
                <div className="md:col-span-10">
                  <p className="font-display font-medium text-lg sm:text-xl text-brand-navy leading-snug group-hover:text-brand-blue transition-colors">
                    {goal.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.g. SPEAKERS SECTION                                                     */}
      {/* ========================================================================= */}
      <section id="speakers" className="py-24 bg-brand-ice/30 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-2">
                  TEACHING MINISTRY
                </span>
                <h2 className="font-display font-bold text-display-lg text-brand-navy">
                  Speakers
                </h2>
                <p className="text-base text-brand-muted mt-1">
                  Pastors from across India
                </p>
              </div>
              <span className="text-xs uppercase tracking-wider text-brand-subtle font-mono">
                Faithful Exposition
              </span>
            </div>
          </Reveal>

          {/* Speakers Data-Driven Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SPEAKERS.map((speaker, index) => (
              <Reveal key={speaker.id} delay={index * 0.08}>
                <div className="group bg-white rounded-card border border-brand-border overflow-hidden shadow-editorial hover:shadow-panel transition-all duration-300 flex flex-col h-full">
                  {/* Portrait Placeholder with Grayscale to Color Transition */}
                  <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden border-b border-brand-border flex items-center justify-center">
                    {speaker.image ? (
                      <img
                        src={speaker.image}
                        alt={`Photograph of ${speaker.name}`}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                        width="320"
                        height="400"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-6 text-center group-hover:bg-brand-ice/50 transition-colors">
                        {/* Minimalist Camera Outline SVG */}
                        <div className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 mb-3">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none" strokeWidth="1.25">
                            <rect x="3" y="6" width="18" height="15" rx="2" />
                            <circle cx="12" cy="13" r="4" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                          Photo Placeholder
                        </span>
                      </div>
                    )}
                    {/* Session topic badge overlay */}
                    <div className="absolute bottom-2 left-2 right-2 bg-brand-navy/90 backdrop-blur-sm px-2.5 py-1.5 rounded text-[10px] text-white font-mono tracking-tight leading-tight">
                      {speaker.topic}
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-blue block">
                        {speaker.role}
                      </span>
                      <h3 className="font-display font-bold text-lg text-brand-navy tracking-tight mt-0.5">
                        {speaker.name}
                      </h3>
                      <p className="text-xs text-brand-muted mt-1">
                        {speaker.church}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.h. PRICING SECTION                                                      */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
              ADMISSION & TIERS
            </span>
            <h2 className="font-display font-bold text-display-lg text-brand-navy">
              Registration Passes
            </h2>
            <p className="text-sm sm:text-base text-brand-muted">
              Registration covers 3 days of conference sessions, lodging, meals, and study materials.
            </p>
          </div>
        </Reveal>

        {/* Two Clean Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Early Bird Panel */}
          <Reveal delay={0.05}>
            <div className="relative bg-white rounded-panel border-2 border-brand-navy p-8 shadow-panel flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-brand-amber/15 text-brand-amber-hover border border-brand-amber/30 rounded text-xs font-bold uppercase tracking-wider">
                    {SITE_CONFIG.pricing.earlyBird.badge}
                  </span>
                  <span className="text-xs font-mono text-brand-subtle">Tier 01</span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-brand-navy">
                    {SITE_CONFIG.pricing.earlyBird.label}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl text-brand-navy">
                      {SITE_CONFIG.pricing.earlyBird.formattedAmount}
                    </span>
                    <span className="text-xs text-brand-muted">/ person</span>
                  </div>
                </div>

                <p className="text-sm text-brand-muted leading-relaxed">
                  {SITE_CONFIG.pricing.earlyBird.description}
                </p>

                {/* Dashed Outline Coupon Strip */}
                <div className="pt-2">
                  <div className="border border-dashed border-brand-amber bg-amber-50/60 rounded-card p-3 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-brand-navy">
                        {SITE_CONFIG.pricing.coupon.copy}
                      </p>
                      <p className="text-xs font-mono font-bold text-brand-amber-hover mt-0.5">
                        Code: {SITE_CONFIG.pricing.coupon.code}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCoupon}
                      aria-label="Copy code"
                      className="px-2.5 py-1 bg-white border border-brand-amber/50 rounded text-xs font-semibold text-brand-navy hover:bg-amber-100 transition-colors flex items-center gap-1"
                    >
                      {couponCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-brand-subtle" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  variant="amber"
                  className="w-full"
                  onClick={() => openRegisterModal('early-bird')}
                >
                  Register Now
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Regular Panel */}
          <Reveal delay={0.1}>
            <div className="relative bg-white rounded-panel border border-brand-border p-8 shadow-editorial hover:border-slate-300 transition-colors flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded text-xs font-bold uppercase tracking-wider">
                    Standard Rate
                  </span>
                  <span className="text-xs font-mono text-brand-subtle">Tier 02</span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-brand-navy">
                    {SITE_CONFIG.pricing.regular.label}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl text-brand-navy">
                      {SITE_CONFIG.pricing.regular.formattedAmount}
                    </span>
                    <span className="text-xs text-brand-muted">/ person</span>
                  </div>
                </div>

                <p className="text-sm text-brand-muted leading-relaxed">
                  {SITE_CONFIG.pricing.regular.description}
                </p>

                <div className="p-3 bg-brand-page rounded-card border border-brand-border text-xs text-brand-muted leading-relaxed">
                  Applies once Early Bird slots are filled. Includes full event access and complimentary book.
                </div>
              </div>

              <div className="pt-8">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => openRegisterModal('regular')}
                >
                  Register Now
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.i. FREE BOOK FEATURE                                                    */}
      {/* ========================================================================= */}
      <section className="py-20 bg-brand-ice border-y border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-white rounded-panel border border-brand-border p-8 sm:p-12 shadow-panel grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Book Cover Placeholder */}
              <div className="md:col-span-5 flex justify-center">
                <div className="w-48 sm:w-56 aspect-[3/4] bg-brand-navy rounded shadow-panel relative p-6 flex flex-col justify-between border border-brand-navy-deep transform hover:-rotate-1 transition-transform duration-300">
                  <div className="border border-brand-blue/60 p-4 h-full flex flex-col justify-between text-center">
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-brand-amber">
                      CONFERENCE GIFT
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-display font-extrabold text-white text-xl tracking-tight leading-tight">
                        DON'T WASTE YOUR LIFE
                      </h4>
                      <div className="w-8 h-0.5 bg-brand-amber mx-auto" />
                      <p className="text-slate-300 text-xs font-medium pt-1">
                        JOHN PIPER
                      </p>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-slate-400">
                      Crossway Editions
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy & Details */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                  CONFERENCE RESOURCE
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy leading-tight">
                  Free book for every registered participant
                </h3>
                <p className="text-base text-brand-text leading-relaxed">
                  Register now and receive your free copy of "{SITE_CONFIG.giftBook.title}".
                </p>
                <p className="text-sm text-brand-muted leading-relaxed">
                  A foundational reading on living passionately for Christ's glory and refusing to spend one's youth on trivial pursuits. Provided free at the welcome desk.
                </p>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    onClick={() => openRegisterModal('early-bird')}
                  >
                    Claim With Registration
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.j. DEDICATED BOOKSTORE (Asymmetric Image Collage + Placeholder Copy)     */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text block */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                {BOOKSTORE_INFO.kicker}
              </span>
              <h2 className="font-display font-bold text-display-lg text-brand-navy leading-tight">
                {BOOKSTORE_INFO.title}
              </h2>
              <div className="p-4 bg-brand-ice/60 rounded-card border border-brand-border text-sm text-brand-muted leading-relaxed font-mono">
                {BOOKSTORE_INFO.description}
              </div>
              <p className="text-xs text-brand-subtle">
                A curated selection of sound theological volumes, commentaries, biographies, and Christian living titles will be available on-site at discounted conference pricing.
              </p>
            </Reveal>
          </div>

          {/* Asymmetric Image Collage (Neutral Placeholders) */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7 aspect-[4/3] bg-slate-100 rounded-panel border border-brand-border flex items-center justify-center p-6 text-center shadow-editorial">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
                      Image Placeholder
                    </span>
                    <span className="text-xs text-brand-muted font-mono">
                      [BOOKSTORE DISPLAY 01]
                    </span>
                  </div>
                </div>

                <div className="col-span-5 aspect-[3/4] bg-slate-200 rounded-panel border border-brand-border flex items-center justify-center p-4 text-center shadow-editorial">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
                      Image Placeholder
                    </span>
                    <span className="text-xs text-brand-muted font-mono">
                      [BOOKS CLOSEUP 02]
                    </span>
                  </div>
                </div>

                <div className="col-span-5 aspect-[1/1] bg-slate-200 rounded-panel border border-brand-border flex items-center justify-center p-4 text-center shadow-editorial -mt-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
                      Image Placeholder
                    </span>
                    <span className="text-xs text-brand-muted font-mono">
                      [READING AREA 03]
                    </span>
                  </div>
                </div>

                <div className="col-span-7 aspect-[16/9] bg-slate-100 rounded-panel border border-brand-border flex items-center justify-center p-4 text-center shadow-editorial -mt-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
                      Image Placeholder
                    </span>
                    <span className="text-xs text-brand-muted font-mono">
                      [RESOURCES TABLE 04]
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.k. VENUE SECTION                                                        */}
      {/* ========================================================================= */}
      <section className="py-24 bg-brand-page border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-2">
                LOCATION & LODGING
              </span>
              <h2 className="font-display font-bold text-display-lg text-brand-navy">
                Venue
              </h2>
              <p className="text-base text-brand-muted mt-1">
                {SITE_CONFIG.venue.name}, {SITE_CONFIG.venue.city}, {SITE_CONFIG.venue.state}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Venue Image Placeholder */}
            <div className="lg:col-span-5 bg-white rounded-panel border border-brand-border overflow-hidden shadow-editorial flex flex-col">
              <div className="aspect-[16/10] bg-slate-100 flex items-center justify-center p-6 border-b border-brand-border">
                <div className="text-center space-y-1">
                  <MapPin className="w-8 h-8 text-brand-blue mx-auto mb-2" strokeWidth={1.5} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Venue Photo Placeholder
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Ashirwad Global Learning Centre Campus
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-navy">
                    Ashirwad Global Learning Centre
                  </h3>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    A peaceful, equipped retreat facility providing air-conditioned assembly halls, comfortable student dormitory accommodation, and dining facilities.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-border text-xs text-brand-subtle flex items-center justify-between">
                  <span>Telangana, India</span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Iframe Placeholder */}
            <div className="lg:col-span-7 rounded-panel border border-brand-border overflow-hidden shadow-editorial bg-slate-100 min-h-[360px] relative">
              <iframe
                title="CrossLife Conference Venue Location Map"
                src={SITE_CONFIG.venue.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.l. ORGANISER & PARTNERS SUMMARY                                         */}
      {/* ========================================================================= */}
      <section className="py-20 bg-brand-ice/50 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
                  LEADERSHIP & FELLOWSHIP
                </span>
                <h2 className="font-display font-bold text-display-md text-brand-navy">
                  Organiser & Supporting Ministries
                </h2>
              </div>
              <Link
                to="/partners"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-navy transition-colors"
              >
                <span>View All Partners</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>

          {/* Organiser Summary Card + Partner Logos Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Organiser Spotlight */}
            <div className="lg:col-span-5 bg-white p-8 rounded-panel border border-brand-border shadow-editorial space-y-4">
              <div className="w-10 h-10 rounded-btn bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                EIC
              </div>
              <h3 className="font-display font-bold text-xl text-brand-navy">
                {ORGANISER_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {ORGANISER_INFO.intro}
              </p>
              <div className="pt-2">
                <Link
                  to="/organiser"
                  className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Organiser Statement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Partner Logo Placeholders Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className="p-5 bg-white rounded-card border border-brand-border flex flex-col items-center justify-center text-center shadow-editorial min-h-[110px]"
                >
                  <span className="text-[11px] font-bold text-brand-navy font-display leading-tight">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-brand-subtle font-mono mt-1">
                    {partner.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.m. FAQ PREVIEW (Accordion, 5 Items)                                     */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-2">
                COMMON QUESTIONS
              </span>
              <h2 className="font-display font-bold text-display-lg text-brand-navy">
                Frequently Asked Questions
              </h2>
            </div>
            <Link
              to="/faq"
              className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-navy inline-flex items-center gap-1"
            >
              <span>View Full FAQ</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>

        <Accordion items={faqPreviewItems} />
      </section>

      {/* ========================================================================= */}
      {/* 1.n. FINAL CTA BAND                                                       */}
      {/* ========================================================================= */}
      <section className="py-20 bg-brand-navy text-white text-center relative overflow-hidden border-t border-brand-border-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Reveal>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-brand-amber block">
              14 - 16 SEPTEMBER 2027 • HYDERABAD
            </span>
            <h2 className="font-display font-extrabold text-display-lg sm:text-display-xl text-white tracking-tight leading-tight">
              One Life for Christ. Come ready to be equipped.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Early bird passes are limited. Claim your registration pass and complimentary copy of "Don't Waste Your Life".
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button
                variant="amber"
                size="lg"
                onClick={() => openRegisterModal('early-bird')}
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                to="/contact"
              >
                Contact the Team
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
