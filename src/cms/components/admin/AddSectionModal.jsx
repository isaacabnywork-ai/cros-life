import React from 'react'
import {
  X,
  Sparkles,
  Layout,
  Users,
  CreditCard,
  BookOpen,
  MapPin,
  HelpCircle,
  Megaphone,
  AlignLeft,
  Grid,
  FileCode,
  Layers,
} from 'lucide-react'

const SECTION_TEMPLATES = [
  {
    type: 'hero',
    name: 'Hero Section',
    icon: Sparkles,
    description: 'Impactful dark background banner with headline, metrics pills, countdown, and primary CTA buttons.',
    defaultData: {
      kicker: 'A Conference for Young People',
      organiserText: 'Organised by Equip Indian Churches',
      headlinePart1: 'One Life.',
      headlineHighlight: 'One Desire.',
      headlinePart2: 'One Purpose.',
      coreLine: 'One Life for Christ. One Desire to glorify Him. One Purpose to proclaim His Gospel.',
      backgroundImage: '/hero-bg.jpg',
      metrics: [
        { value: '3 Days', label: 'Intensive' },
        { value: '18–25', label: 'Age Group' },
      ],
      primaryButton: { text: 'Register Now', link: '#pricing' },
      secondaryButton: { text: 'Learn More', link: '#what-is-crosslife' },
      showCountdown: true,
      countdownNotice: 'Commencing 14 September 2027 • Hyderabad',
    },
  },
  {
    type: 'quick_stats',
    name: 'Quick Stats Strip',
    icon: Layout,
    description: 'Compact 4-column highlight strip showing Dates, Venue, Audience, and Format.',
    defaultData: {
      items: [
        { label: 'Dates', value: '14 - 16 September 2027', icon: 'Calendar' },
        { label: 'Venue', value: 'Ashirwad Global Learning Centre', icon: 'MapPin' },
        { label: 'Audience', value: '18 to 25 years old', icon: 'Users' },
        { label: 'Format', value: 'Tuesday to Thursday', icon: 'Clock' },
      ],
    },
  },
  {
    type: 'pillars',
    name: 'Pillars (What is CrossLife)',
    icon: Layers,
    description: 'Statement with 3 numbered cards showcasing Devotion, Worship, and Mission.',
    defaultData: {
      kicker: 'WHAT IS CROSSLIFE',
      title: 'Built for One Life, One Desire, One Purpose.',
      description: 'Equipping young people across India for wholehearted Gospel faithfulness.',
      buttonText: 'Join the Gathering',
      pillars: [
        { num: '01', subtitle: 'Devotion', title: 'One Life', desc: 'Lived wholly for Jesus Christ.' },
        { num: '02', subtitle: 'Worship', title: 'One Desire', desc: 'Rooted in His supreme glory.' },
        { num: '03', subtitle: 'Mission', title: 'One Purpose', desc: 'Proclaiming His Gospel to all nations.' },
      ],
    },
  },
  {
    type: 'vision_audience',
    name: 'Vision & Demographic Profile',
    icon: Users,
    description: 'Split section with value points on left and an eligibility profile card with tags and checklist on right.',
    defaultData: {
      kicker: 'THE VISION',
      title: 'Why CrossLife',
      subtitle: 'Substance over hype. Biblical clarity over cultural noise.',
      valuePoints: [
        { title: 'Gospel Faithfulness', desc: 'Standing firm on sound doctrine.', icon: 'ShieldCheck' },
      ],
      eligibilityBadge: 'ELIGIBILITY',
      age: '18 – 25 Years',
      profileTitle: 'Who Is It For',
      summary: 'For young Christians hungry for doctrinal depth.',
      tags: ['College Students', 'Young Working Adults'],
      includes: ['Full 3-day access', 'Dormitory lodging & meals'],
    },
  },
  {
    type: 'difference',
    name: 'What Sets Us Apart',
    icon: Layout,
    description: '3 high-contrast comparison cards showing positive convictions vs contrasting alternatives + pull quote.',
    defaultData: {
      kicker: 'WHAT SETS US APART',
      title: 'Substance Over Trend',
      pullQuote: 'Come ready to be challenged and sharpened — not by trends, but by truth.',
      pillars: [
        { badge: 'Preaching', focus: 'Authoritative Exposition', contrasting: 'Not entertainment or hype', desc: 'Uncompromising preaching.' },
      ],
    },
  },
  {
    type: 'goals',
    name: 'Hopes & Goals',
    icon: Layers,
    description: 'Five numbered cards displaying biblical objectives and conference prayers.',
    defaultData: {
      kicker: 'CONFERENCE OBJECTIVES',
      title: 'Hopes & Goals',
      subtitle: 'Five biblical outcomes we pray and labour for.',
      goals: [
        { number: '01', title: 'Gospel Alignment', summary: 'Align daily life with Christ.' },
        { number: '02', title: 'Biblical Conviction', summary: 'Stand firm on sound doctrine.' },
      ],
    },
  },
  {
    type: 'speakers',
    name: 'Speakers Section',
    icon: Users,
    description: 'Grid of speaker cards with grayscale photo styling, session topic badge, role, and church.',
    defaultData: {
      kicker: 'TEACHING MINISTRY',
      title: 'Speakers',
      subtitle: 'Pastors and expositors from across India',
      rightBadge: 'Faithful Exposition',
      speakers: [
        { id: 'sp-new-1', name: 'Pastor Name', role: 'Pastor', church: 'Local Church', topic: 'Exposition of Scripture', image: null },
      ],
    },
  },
  {
    type: 'pricing',
    name: 'Registration Passes & Pricing',
    icon: CreditCard,
    description: 'Side-by-side tier cards for Early Bird and Regular passes with coupon copy button and modal triggers.',
    defaultData: {
      kicker: 'ADMISSION & TIERS',
      title: 'Registration Passes',
      subtitle: 'Covers 3 days of conference sessions, lodging, meals, and study materials.',
      earlyBird: {
        badge: 'Limited Availability',
        tier: 'Tier 01',
        label: 'Early Bird',
        formattedAmount: '₹2,000',
        features: ['Full 3-day access', 'Lodging & all meals', "Free book: Don't Waste Your Life"],
        buttonText: 'Register Early Bird',
        coupon: { code: 'AIPC2026', copy: 'Save ₹500 on Early Bird!' },
      },
      regular: {
        badge: 'Standard Rate',
        tier: 'Tier 02',
        label: 'Regular Registration',
        formattedAmount: '₹3,000',
        features: ['Applies once Early Bird slots close', 'Full 3-day access', 'Conference packet'],
        buttonText: 'Register Regular',
        note: 'Standard passes open when Tier 01 concludes.',
      },
    },
  },
  {
    type: 'book_feature',
    name: 'Free Book Resource Promo',
    icon: BookOpen,
    description: 'Showcase card featuring a 3D book mockup (John Piper) and complimentary copy incentive.',
    defaultData: {
      kicker: 'CONFERENCE RESOURCE',
      title: 'Free Book for Every Registered Attendee',
      description: "Every participant receives a complimentary copy of John Piper's classic \"Don't Waste Your Life\".",
      buttonText: 'Claim With Registration',
      book: {
        title: "DON'T WASTE YOUR LIFE",
        author: 'JOHN PIPER',
        badge: 'FREE GIFT',
        publisher: 'Crossway Editions',
      },
    },
  },
  {
    type: 'bookstore',
    name: 'Conference Bookstore',
    icon: BookOpen,
    description: 'Bookstore showcase with feature points and 3 category promo cards with discounted tags.',
    defaultData: {
      kicker: 'THEOLOGICAL RESOURCES',
      title: 'Conference Bookstore',
      subtitle: 'Curated titles at subsidized conference pricing.',
      features: [{ title: 'Expositions & Commentaries', desc: 'Trusted authors for study.' }],
      categories: [{ title: 'Exegesis & Theology', desc: 'Sound doctrine and commentaries.', tag: '30%–50% Off', icon: 'BookOpen' }],
    },
  },
  {
    type: 'venue',
    name: 'Venue & Campus Map',
    icon: MapPin,
    description: 'Facilities checklist, full address, board info, and embedded Google Maps iframe.',
    defaultData: {
      kicker: 'LOCATION & LODGING',
      title: 'Venue & Campus',
      venueName: 'Ashirwad Global Learning Centre',
      cityState: 'Hyderabad, Telangana',
      directionsUrl: 'https://maps.google.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
      facilities: ['Air-conditioned assembly auditorium', 'Comfortable student dormitory lodging'],
      boardNote: 'Full Board',
    },
  },
  {
    type: 'organiser_partners',
    name: 'Organiser & Partners Showcase',
    icon: Users,
    description: 'Equip Indian Churches organizer spotlight card and grid of partner church logos.',
    defaultData: {
      kicker: 'LEADERSHIP & FELLOWSHIP',
      title: 'Organiser & Supporting Ministries',
      viewAllText: 'View All Partners',
      viewAllLink: '/partners',
      organiser: {
        badge: 'EIC',
        name: 'Equip Indian Churches',
        tagline: 'Pastoral Fellowship',
        intro: 'A fellowship of pastors united to spur biblical Gospel growth across India.',
        linkText: 'Read Organiser Statement',
        linkUrl: '/organiser',
      },
      partners: [{ id: 'p-1', name: 'Partner Church', city: 'City, State', type: 'Supporting Church' }],
    },
  },
  {
    type: 'faq_preview',
    name: 'FAQ Accordion',
    icon: HelpCircle,
    description: 'Collapsible accordion answering common questions regarding eligibility, passes, and venue.',
    defaultData: {
      kicker: 'COMMON QUESTIONS',
      title: 'Frequently Asked Questions',
      viewAllText: 'View All FAQs',
      viewAllLink: '/faq',
      items: [
        { id: 'f-1', question: 'Who is eligible to attend?', answer: 'Young men and women between 18 and 25.' },
      ],
    },
  },
  {
    type: 'final_cta',
    name: 'Final CTA Band',
    icon: Megaphone,
    description: 'High-conversion dark band with date notice, bold headline, subtext, and action buttons.',
    defaultData: {
      kicker: '14 - 16 SEPTEMBER 2027 • HYDERABAD',
      headline: 'One Life for Christ. Come ready to be equipped.',
      subtext: 'Early bird passes are limited. Claim your pass today.',
      primaryButton: { text: 'Register Now', link: '#pricing' },
      secondaryButton: { text: 'Contact the Team', link: '/contact' },
    },
  },
  {
    type: 'rich_text',
    name: 'Rich Text Article',
    icon: AlignLeft,
    description: 'Editorial article layout with kicker, title, and multiple reading paragraphs.',
    defaultData: {
      kicker: 'READING',
      title: 'Article Title',
      subtitle: 'Subtitle for context',
      paragraphs: ['First paragraph of article text.', 'Second paragraph of article text.'],
    },
  },
  {
    type: 'cards',
    name: 'Cards Grid',
    icon: Grid,
    description: 'Configurable multi-column grid of image cards with titles, badges, and action links.',
    defaultData: {
      kicker: 'HIGHLIGHTS',
      title: 'Feature Cards',
      columns: 3,
      cards: [
        { title: 'Feature One', description: 'Description of feature.', badge: 'New', link: '#', linkText: 'Explore' },
      ],
    },
  },
  {
    type: 'reusable_block',
    name: 'Reusable Block Instance',
    icon: Layers,
    description: 'Embed a globally managed reusable block that syncs automatically across pages.',
    defaultData: {
      block_id: 'block-main-cta',
    },
  },
  {
    type: 'custom_html',
    name: 'Custom HTML Block (Sanitized)',
    icon: FileCode,
    description: 'Controlled sanitized HTML snippet for custom embeds or third-party widgets.',
    defaultData: {
      title: 'Custom Announcement',
      html: '<div class="p-6 bg-amber-50 border border-amber-200 rounded-lg text-slate-800"><p>Custom content here</p></div>',
    },
  },
]

export function AddSectionModal({ isOpen, onClose, onSelectType }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-panel shadow-panel border border-slate-200 w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-display font-bold text-base text-slate-900">Add Page Section</h3>
            <p className="text-xs text-slate-500">Choose a component section to insert into your page.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SECTION_TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon
            return (
              <div
                key={tmpl.type}
                onClick={() => {
                  onSelectType(tmpl.type, tmpl.defaultData)
                  onClose()
                }}
                className="p-5 rounded-lg border border-slate-200 bg-white hover:border-brand-blue hover:shadow-panel cursor-pointer transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-md bg-brand-ice text-brand-blue flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-brand-blue transition-colors">
                    {tmpl.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono uppercase text-slate-400">
                  <span>{tmpl.type}</span>
                  <span className="text-brand-blue font-bold group-hover:underline">+ Insert</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
