import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  Users,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Library,
  Flame,
  GraduationCap,
  Building,
} from 'lucide-react'
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
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between bg-brand-navy pt-28 pb-16 overflow-hidden">
        {/* Editorial Background Scrim */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/hero-bg.jpg"
            onError={(e) => {
              e.currentTarget.src =
                'https://img.magnific.com/free-photo/waiting-room-with-monitors_1232-1390.jpg?semt=ais_hybrid&w=740&q=80'
            }}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-navy" />
        </div>

        {/* Hairline Cross Geometry */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] border border-brand-amber/30 rounded-full" />
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#1E4B82" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#1E4B82" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Center Hero Content */}
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

              {/* Ultra-Minimal Core Line */}
              <p className="text-slate-200 text-lg sm:text-xl font-medium max-w-2xl leading-snug">
                {CORE_STATEMENTS.coreLine}
              </p>

              {/* Hero Metric Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {CORE_STATEMENTS.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-200 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" />
                    <strong className="text-white font-bold">{m.value}</strong>
                    <span className="text-slate-400">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
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
                  Event Passes & Rates
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Quiet Countdown Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 relative z-10 border-t border-brand-border-navy/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs uppercase font-semibold tracking-wider text-slate-400">
            Commencing 14 September 2027 • Hyderabad
          </div>
          <Countdown />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUICK STATS STRIP                                                      */}
      {/* ========================================================================= */}
      <section className="bg-brand-navy-deep text-white border-y border-brand-border-navy py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-brand-border-navy text-xs">
            <div className="pt-2 md:pt-0 md:px-4 first:pl-0 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-brand-amber shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber">Dates</span>
                <p className="font-semibold text-slate-200">{SITE_CONFIG.dates}</p>
              </div>
            </div>
            <div className="pt-2 md:pt-0 md:px-4 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-brand-amber shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber">Venue</span>
                <p className="font-semibold text-slate-200">{SITE_CONFIG.venue.name}</p>
              </div>
            </div>
            <div className="pt-2 md:pt-0 md:px-4 flex items-center gap-3">
              <Users className="w-4 h-4 text-brand-amber shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber">Audience</span>
                <p className="font-semibold text-slate-200">{SITE_CONFIG.targetAudience}</p>
              </div>
            </div>
            <div className="pt-2 md:pt-0 md:px-4 flex items-center gap-3">
              <Clock className="w-4 h-4 text-brand-amber shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-brand-amber">Format</span>
                <p className="font-semibold text-slate-200">{SITE_CONFIG.days} • Full Board</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT IS CROSSLIFE (3 Crisp Core Pillars)                                */}
      {/* ========================================================================= */}
      <section id="what-is-crosslife" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Statement */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                WHAT IS CROSSLIFE
              </span>
              <h2 className="font-display font-bold text-display-md sm:text-display-lg text-brand-navy leading-tight">
                Built for One Life, One Desire, One Purpose.
              </h2>
              <p className="text-base text-brand-muted leading-relaxed">
                {CORE_STATEMENTS.whatIsCrossLife}
              </p>
              <div className="pt-2">
                <Button variant="primary" size="sm" onClick={() => openRegisterModal('early-bird')}>
                  <span>Join the Gathering</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>

            {/* Right: 3 Core Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CORE_STATEMENTS.pillars.map((pillar) => (
                <div
                  key={pillar.num}
                  className="p-6 bg-white rounded-panel border border-brand-border shadow-editorial hover:border-brand-blue/40 transition-colors flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-display text-brand-blue/30">{pillar.num}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-ice text-brand-blue border border-brand-border">
                      {pillar.subtitle}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-brand-navy">{pillar.title}</h3>
                    <p className="text-xs text-brand-muted mt-1 leading-snug">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <CrossDivider />

      {/* ========================================================================= */}
      {/* 4. VISION & TARGET AUDIENCE (Visual Bullet Cards)                         */}
      {/* ========================================================================= */}
      <section className="py-20 bg-brand-ice/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: The Vision (Punchy Highlights) */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <Reveal>
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                    {WHY_CROSSLIFE.kicker}
                  </span>
                  <h2 className="font-display font-bold text-display-md text-brand-navy">
                    {WHY_CROSSLIFE.title}
                  </h2>
                  <p className="text-sm font-medium text-brand-muted">
                    {WHY_CROSSLIFE.subtitle}
                  </p>
                </div>

                {/* 3 Value Cards */}
                <div className="space-y-3 mt-6">
                  {WHY_CROSSLIFE.points.map((pt, idx) => (
                    <div
                      key={pt.title}
                      className="p-5 bg-white rounded-card border border-brand-border shadow-editorial flex items-start gap-4 hover:border-brand-blue/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-ice flex items-center justify-center shrink-0 border border-brand-border mt-0.5">
                        {idx === 0 && <ShieldCheck className="w-4 h-4 text-brand-blue" />}
                        {idx === 1 && <BookOpen className="w-4 h-4 text-brand-amber-hover" />}
                        {idx === 2 && <Building className="w-4 h-4 text-brand-navy" />}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-brand-navy leading-snug">
                          {pt.title}
                        </h3>
                        <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Who Is It For (Demographic Profile Card) */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-panel border border-brand-border shadow-editorial flex flex-col justify-between space-y-6">
              <Reveal delay={0.1}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-amber block">
                      ELIGIBILITY
                    </span>
                    <span className="text-xs font-mono font-bold text-brand-blue bg-brand-ice px-2 py-0.5 rounded border border-brand-border">
                      {WHO_IS_IT_FOR.age}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-brand-navy">
                    {WHO_IS_IT_FOR.title}
                  </h3>

                  <p className="text-sm text-brand-muted leading-relaxed">
                    {WHO_IS_IT_FOR.summary}
                  </p>
                </div>

                {/* Tag Pills */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-subtle block">
                    Ideal For
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {WHO_IS_IT_FOR.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-brand-ice text-brand-navy text-xs font-semibold border border-brand-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Included Checklist */}
                <div className="pt-4 border-t border-brand-border space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-subtle block">
                    Registration Includes
                  </span>
                  <ul className="space-y-1.5 text-xs text-brand-text">
                    {WHO_IS_IT_FOR.includes.map((inc) => (
                      <li key={inc} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHAT MAKES CROSSLIFE DIFFERENT (Ultra-Minimal Contrast Cards)          */}
      {/* ========================================================================= */}
      <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <Reveal>
            <div className="max-w-2xl space-y-2">
              <span className="text-xs uppercase font-bold tracking-[0.18em] text-brand-amber block">
                {WHAT_MAKES_DIFFERENT.kicker}
              </span>
              <h2 className="font-display font-bold text-display-md sm:text-display-lg text-white tracking-tight">
                {WHAT_MAKES_DIFFERENT.title}
              </h2>
            </div>
          </Reveal>

          {/* 3 Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHAT_MAKES_DIFFERENT.pillars.map((item, idx) => (
              <Reveal key={item.badge} delay={idx * 0.08}>
                <div className="p-6 rounded-panel bg-brand-navy-deep border border-brand-border-navy flex flex-col justify-between h-full space-y-4 hover:border-brand-amber/40 transition-colors">
                  <div className="space-y-3">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-amber/20 text-brand-amber border border-brand-amber/30">
                      {item.badge}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white">
                      {item.focus}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs text-rose-300/90 font-medium">
                      <span>✕</span>
                      <span>{item.contrasting}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pull Quote Strip */}
          <Reveal delay={0.2}>
            <div className="p-6 sm:p-8 rounded-panel bg-brand-navy-deep/80 border-l-4 border-brand-amber border-y border-r border-brand-border-navy flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <blockquote className="font-display font-medium text-lg sm:text-xl text-white leading-snug">
                "{WHAT_MAKES_DIFFERENT.pullQuote}"
              </blockquote>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-amber font-mono shrink-0">
                The CrossLife Conviction
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOPES AND GOALS (5 Crisp Numbered Cards)                               */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-xl mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
              CONFERENCE OBJECTIVES
            </span>
            <h2 className="font-display font-bold text-display-md text-brand-navy">
              Hopes & Goals
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              Five biblical outcomes we pray and labour for throughout this gathering.
            </p>
          </div>
        </Reveal>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {HOPES_AND_GOALS.map((goal, index) => (
            <Reveal key={goal.number} delay={index * 0.05}>
              <div className="p-5 bg-white rounded-panel border border-brand-border shadow-editorial hover:border-brand-blue transition-all duration-300 flex flex-col justify-between h-full space-y-3">
                <span className="font-display font-bold text-2xl text-brand-blue/35">
                  {goal.number}
                </span>
                <div>
                  <h3 className="font-display font-bold text-base text-brand-navy">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1 leading-snug">
                    {goal.summary}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SPEAKERS SECTION                                                       */}
      {/* ========================================================================= */}
      <section id="speakers" className="py-20 bg-brand-ice/30 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
                  TEACHING MINISTRY
                </span>
                <h2 className="font-display font-bold text-display-md text-brand-navy">
                  Speakers
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                  Pastors and expositors from across India
                </p>
              </div>
              <span className="text-xs uppercase tracking-wider text-brand-subtle font-mono">
                Faithful Exposition
              </span>
            </div>
          </Reveal>

          {/* Speakers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPEAKERS.map((speaker, index) => (
              <Reveal key={speaker.id} delay={index * 0.06}>
                <div className="group bg-white rounded-card border border-brand-border overflow-hidden shadow-editorial hover:shadow-panel transition-all duration-300 flex flex-col h-full">
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
                        <Users className="w-8 h-8 text-slate-300 mb-2" strokeWidth={1.5} />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                          {speaker.name}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 bg-brand-navy/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-white font-mono tracking-tight leading-tight">
                      {speaker.topic}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-blue block">
                        {speaker.role}
                      </span>
                      <h3 className="font-display font-bold text-base text-brand-navy tracking-tight">
                        {speaker.name}
                      </h3>
                      <p className="text-xs text-brand-muted">
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
      {/* 8. PRICING SECTION (Clean, High-Impact Cards)                             */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
              ADMISSION & TIERS
            </span>
            <h2 className="font-display font-bold text-display-md text-brand-navy">
              Registration Passes
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Covers 3 days of conference sessions, lodging, meals, and study materials.
            </p>
          </div>
        </Reveal>

        {/* Two Clean Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Early Bird */}
          <Reveal delay={0.05}>
            <div className="relative bg-white rounded-panel border-2 border-brand-navy p-7 shadow-panel flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 bg-brand-amber/15 text-brand-amber-hover border border-brand-amber/30 rounded text-xs font-bold uppercase tracking-wider">
                    {SITE_CONFIG.pricing.earlyBird.badge}
                  </span>
                  <span className="text-xs font-mono text-brand-subtle">Tier 01</span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-brand-navy">
                    {SITE_CONFIG.pricing.earlyBird.label}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl text-brand-navy">
                      {SITE_CONFIG.pricing.earlyBird.formattedAmount}
                    </span>
                    <span className="text-xs text-brand-muted">/ person</span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-1.5 text-xs text-brand-muted pt-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Full 3-day conference access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dormitory lodging & all meals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free book: Don't Waste Your Life</span>
                  </li>
                </ul>

                {/* Coupon Strip */}
                <div className="border border-dashed border-brand-amber bg-amber-50/70 rounded-card p-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-brand-navy">
                      {SITE_CONFIG.pricing.coupon.copy}
                    </p>
                    <p className="text-xs font-mono font-bold text-brand-amber-hover">
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

              <div>
                <Button
                  variant="amber"
                  className="w-full"
                  onClick={() => openRegisterModal('early-bird')}
                >
                  Register Early Bird
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Regular Pass */}
          <Reveal delay={0.1}>
            <div className="relative bg-white rounded-panel border border-brand-border p-7 shadow-editorial flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-xs font-bold uppercase tracking-wider">
                    Standard Rate
                  </span>
                  <span className="text-xs font-mono text-brand-subtle">Tier 02</span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-brand-navy">
                    {SITE_CONFIG.pricing.regular.label}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl text-brand-navy">
                      {SITE_CONFIG.pricing.regular.formattedAmount}
                    </span>
                    <span className="text-xs text-brand-muted">/ person</span>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-brand-muted pt-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-slate-400" />
                    <span>Applies once Early Bird slots close</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-slate-400" />
                    <span>Full 3-day access, lodging & meals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-slate-400" />
                    <span>Conference packet & gift book</span>
                  </li>
                </ul>

                <div className="p-2.5 bg-brand-page rounded-card border border-brand-border text-xs text-brand-muted">
                  Standard passes open when Tier 01 concludes.
                </div>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => openRegisterModal('regular')}
                >
                  Register Regular
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FREE BOOK FEATURE (Ultra-Clean Gift Card)                              */}
      {/* ========================================================================= */}
      <section className="py-16 bg-brand-ice border-y border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-white rounded-panel border border-brand-border p-6 sm:p-8 shadow-panel grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Book Mockup */}
              <div className="md:col-span-4 flex justify-center">
                <div className="w-40 aspect-[3/4] bg-brand-navy rounded shadow-panel relative p-4 flex flex-col justify-between border border-brand-navy-deep transform hover:-rotate-1 transition-transform duration-300">
                  <div className="border border-brand-blue/60 p-3 h-full flex flex-col justify-between text-center">
                    <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-brand-amber">
                      FREE GIFT
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-display font-extrabold text-white text-base tracking-tight leading-tight">
                        DON'T WASTE YOUR LIFE
                      </h4>
                      <div className="w-6 h-0.5 bg-brand-amber mx-auto" />
                      <p className="text-slate-300 text-[11px] font-medium pt-0.5">
                        JOHN PIPER
                      </p>
                    </div>
                    <span className="text-[7px] uppercase tracking-widest text-slate-400">
                      Crossway Editions
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="md:col-span-8 space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-ice text-brand-blue border border-brand-border">
                  CONFERENCE RESOURCE
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-navy leading-tight">
                  Free Book for Every Registered Attendee
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Every participant receives a complimentary copy of John Piper's classic <em>"Don't Waste Your Life"</em> at the check-in desk.
                </p>
                <div className="pt-1">
                  <Button
                    variant="primary"
                    size="sm"
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
      {/* 10. BOOKSTORE SECTION (Visual Category Cards - No Text Wall Placeholders)  */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block">
                {BOOKSTORE_INFO.kicker}
              </span>
              <h2 className="font-display font-bold text-display-md text-brand-navy leading-tight">
                {BOOKSTORE_INFO.title}
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {BOOKSTORE_INFO.subtitle}
              </p>

              <div className="space-y-2.5 pt-2">
                {BOOKSTORE_INFO.features.map((f) => (
                  <div key={f.title} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-brand-amber-hover shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-navy block font-semibold">{f.title}</strong>
                      <span className="text-brand-muted">{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Visual Category Showcase */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-panel border border-brand-border shadow-editorial hover:border-brand-blue/30 transition-colors space-y-3">
                  <div className="w-8 h-8 rounded bg-brand-ice flex items-center justify-center text-brand-blue">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-navy">Exegesis & Theology</h4>
                    <p className="text-[11px] text-brand-muted mt-1 leading-snug">
                      Sound doctrine, biblical commentaries, and systematic theology.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-brand-blue font-semibold block">30%–50% Off</span>
                </div>

                <div className="p-5 bg-white rounded-panel border border-brand-border shadow-editorial hover:border-brand-blue/30 transition-colors space-y-3">
                  <div className="w-8 h-8 rounded bg-brand-ice flex items-center justify-center text-brand-blue">
                    <Library className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-navy">Church History</h4>
                    <p className="text-[11px] text-brand-muted mt-1 leading-snug">
                      Biographies of Spurgeon, Lloyd-Jones, Carey, and the Reformers.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-brand-blue font-semibold block">Conference Bundles</span>
                </div>

                <div className="p-5 bg-white rounded-panel border border-brand-border shadow-editorial hover:border-brand-blue/30 transition-colors space-y-3">
                  <div className="w-8 h-8 rounded bg-brand-ice flex items-center justify-center text-brand-blue">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-navy">Christian Living</h4>
                    <p className="text-[11px] text-brand-muted mt-1 leading-snug">
                      Gospel-centred guidance for prayer, purity, campus, and career.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-brand-blue font-semibold block">Student Friendly</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. VENUE SECTION                                                         */}
      {/* ========================================================================= */}
      <section className="py-20 bg-brand-page border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
                  LOCATION & LODGING
                </span>
                <h2 className="font-display font-bold text-display-md text-brand-navy">
                  Venue & Campus
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                  {SITE_CONFIG.venue.name}, {SITE_CONFIG.venue.city}, {SITE_CONFIG.venue.state}
                </p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-brand-blue inline-flex items-center gap-1 hover:underline"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
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
                  Ashirwad Global Learning Centre
                </h3>
                <ul className="space-y-2 text-xs text-brand-muted">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Air-conditioned assembly auditorium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Comfortable student dormitory lodging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-brand-blue" />
                    <span>On-site dining halls & quiet study gardens</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[11px] text-brand-subtle">
                <span>Hyderabad, Telangana</span>
                <span className="font-mono">Full Board</span>
              </div>
            </div>

            {/* Map Preview */}
            <div className="lg:col-span-8 rounded-panel border border-brand-border overflow-hidden shadow-editorial bg-slate-100 min-h-[260px] relative">
              <iframe
                title="CrossLife Conference Venue Location Map"
                src={SITE_CONFIG.venue.mapEmbedUrl}
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

      {/* ========================================================================= */}
      {/* 12. ORGANISER & PARTNERS SUMMARY                                          */}
      {/* ========================================================================= */}
      <section className="py-20 bg-brand-ice/50 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
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
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Organiser Spotlight */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-panel border border-brand-border shadow-editorial space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                  EIC
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-navy">
                    {ORGANISER_INFO.name}
                  </h3>
                  <span className="text-[11px] text-brand-muted font-medium">
                    {ORGANISER_INFO.tagline}
                  </span>
                </div>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
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

            {/* Partner Logos Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className="p-4 bg-white rounded-card border border-brand-border flex flex-col items-center justify-center text-center shadow-editorial min-h-[90px]"
                >
                  <span className="text-[11px] font-bold text-brand-navy font-display leading-tight">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-brand-subtle font-mono mt-0.5">
                    {partner.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FAQ PREVIEW (5 Items)                                                 */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue block mb-1">
                COMMON QUESTIONS
              </span>
              <h2 className="font-display font-bold text-display-md text-brand-navy">
                Frequently Asked Questions
              </h2>
            </div>
            <Link
              to="/faq"
              className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-navy inline-flex items-center gap-1"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>

        <Accordion items={faqPreviewItems} />
      </section>

      {/* ========================================================================= */}
      {/* 14. FINAL CTA BAND                                                        */}
      {/* ========================================================================= */}
      <section className="py-20 bg-brand-navy text-white text-center relative overflow-hidden border-t border-brand-border-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Reveal>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-brand-amber block">
              14 - 16 SEPTEMBER 2027 • HYDERABAD
            </span>
            <h2 className="font-display font-extrabold text-display-lg text-white tracking-tight leading-tight">
              One Life for Christ. Come ready to be equipped.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Early bird passes are limited. Claim your pass and complimentary copy of <em>Don't Waste Your Life</em>.
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
