/**
 * Seed data for CrossLife CMS.
 * Represents 100% of the existing website content migrated into structured CMS format.
 */

export const INITIAL_GLOBAL_SETTINGS = {
  site_name: 'CrossLife',
  tagline: 'One Life',
  sub_tagline: 'A Conference for Young People',
  logo_url: '/images/crosslife-logo.webp',
  favicon_url: '/favicon.ico',
  default_og_image: '/hero-bg.jpg',
  copyright_text: 'All rights reserved. Organised by Equip Indian Churches.',
  sticky_header: true,
  announcement: {
    enabled: true,
    message: 'Early Bird registrations for CrossLife 2027 are now open! Use coupon code AIPC2026 to save ₹500.',
    link_text: 'Register Now',
    link_url: '/#pricing',
  },
  default_cta: {
    text: 'Register Now',
    link: '/#pricing',
    variant: 'amber',
  },
  contacts: {
    email: 'contact@crosslife.in',
    phones: [
      { display: '+91 98867 69948', value: '+919886769948' },
      { display: '+91 99368 44317', value: '+919936844317' },
    ],
    full_address: 'Ashirwad Global Learning Centre, Hyderabad, Telangana, India',
    venue: {
      name: 'Ashirwad Global Learning Centre',
      city: 'Hyderabad',
      state: 'Telangana',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121818.89886861614!2d78.372883!3d17.435777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb974776e0176b%3A0xb35a09b4c0e5a956!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    },
  },
  social_links: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: '',
    twitter: '',
  },
  event: {
    dates: '14 - 16 September 2027',
    days: 'Tuesday to Thursday',
    year: '2027',
    startDateIso: '2027-09-14T09:00:00+05:30',
    organiser: 'Equip Indian Churches',
    targetAudience: '18 to 25 years old men and women',
  },
}

export const INITIAL_MENUS = [
  {
    id: 'menu-header',
    slug: 'header',
    title: 'Main Navigation',
    items: [
      {
        id: 'nav-about',
        label: 'About',
        type: 'dropdown',
        href: '#',
        target: '_self',
        order: 1,
        items: [
          { id: 'sub-what-is', label: 'What is CrossLife', href: '/#what-is-crosslife', target: '_self' },
          { id: 'sub-faith', label: 'Statement of Faith', href: '/statement-of-faith', target: '_self' },
          { id: 'sub-organiser', label: 'Organiser', href: '/organiser', target: '_self' },
        ],
      },
      { id: 'nav-speakers', label: 'Speakers', type: 'link', href: '/#speakers', target: '_self', order: 2 },
      { id: 'nav-pricing', label: 'Passes', type: 'link', href: '/#pricing', target: '_self', order: 3 },
      { id: 'nav-faq', label: 'FAQ', type: 'link', href: '/faq', target: '_self', order: 4 },
      { id: 'nav-partners', label: 'Partners', type: 'link', href: '/partners', target: '_self', order: 5 },
      { id: 'nav-contact', label: 'Contact', type: 'link', href: '/contact', target: '_self', order: 6 },
    ],
  },
  {
    id: 'menu-footer',
    slug: 'footer',
    title: 'Footer Links',
    items: [
      { id: 'f-home', label: 'Home', href: '/', order: 1 },
      { id: 'f-what-is', label: 'What is CrossLife', href: '/#what-is-crosslife', order: 2 },
      { id: 'f-faith', label: 'Statement of Faith', href: '/statement-of-faith', order: 3 },
      { id: 'f-speakers', label: 'Speakers', href: '/#speakers', order: 4 },
      { id: 'f-pricing', label: 'Pricing & Passes', href: '/#pricing', order: 5 },
      { id: 'f-organiser', label: 'Organiser', href: '/organiser', order: 6 },
      { id: 'f-partners', label: 'Partners', href: '/partners', order: 7 },
      { id: 'f-faq', label: 'FAQ', href: '/faq', order: 8 },
      { id: 'f-contact', label: 'Contact Us', href: '/contact', order: 9 },
    ],
  },
]

export const INITIAL_MEGA_MENUS = [
  {
    id: 'mega-about',
    nav_item_id: 'nav-about',
    nav_item_label: 'About',
    enabled: true,
    columns: [
      {
        id: 'col-1',
        heading: 'The Conference',
        items: [
          { label: 'What is CrossLife', href: '/#what-is-crosslife', description: 'Our 3 core pillars: Devotion, Worship, Mission' },
          { label: 'Vision & Audience', href: '/#what-is-crosslife', description: 'For young Christians aged 18 to 25' },
          { label: 'Conference Objectives', href: '/#what-is-crosslife', description: '5 biblical outcomes we pray and labour for' },
        ],
      },
      {
        id: 'col-2',
        heading: 'Convictions & Leadership',
        items: [
          { label: 'Statement of Faith', href: '/statement-of-faith', description: 'Historic evangelical and reformed confessions' },
          { label: 'The Organiser', href: '/organiser', description: 'Equip Indian Churches pastoral fellowship' },
          { label: 'Partner Ministries', href: '/partners', description: 'Churches collaborating across India' },
        ],
      },
      {
        id: 'col-3',
        heading: 'Featured Resource',
        featured: {
          title: "Don't Waste Your Life",
          description: "Every attendee receives a complimentary copy of John Piper's classic book.",
          image: '/hero-bg.jpg',
          buttonText: 'Claim Your Copy',
          buttonLink: '/#pricing',
        },
      },
    ],
  },
]

export const INITIAL_PAGES = [
  {
    id: 'page-home',
    title: 'Homepage',
    slug: '/',
    status: 'published',
    featured_image: '/hero-bg.jpg',
    seo: {
      title: 'One Life | Gospel-Centred Youth Conference',
      description: 'CrossLife is a Gospel-centred youth conference for men and women aged 18 to 25. 14-16 September 2027 in Hyderabad, Telangana.',
      canonical: 'https://crosslife.in',
      robots: 'index, follow',
      ogTitle: 'CrossLife 2027 - One Life. One Desire. One Purpose.',
      ogDescription: 'A 3-day intensive conference for young people aged 18-25 in Hyderabad, Telangana.',
      ogImage: '/hero-bg.jpg',
      twitterTitle: 'CrossLife 2027',
      twitterDescription: 'One Life. One Desire. One Purpose. 14-16 September 2027 in Hyderabad.',
      twitterImage: '/hero-bg.jpg',
    },
    published_at: '2026-01-01T00:00:00Z',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-03T10:00:00Z',
    created_by: 'Super Admin',
  },
  {
    id: 'page-faith',
    title: 'Statement of Faith',
    slug: '/statement-of-faith',
    status: 'published',
    featured_image: '/hero-bg.jpg',
    seo: {
      title: 'Statement of Faith | CrossLife',
      description: 'The doctrinal convictions and Statement of Faith undergirding CrossLife and Equip Indian Churches.',
      canonical: 'https://crosslife.in/statement-of-faith',
      robots: 'index, follow',
      ogTitle: 'CrossLife Statement of Faith',
      ogDescription: 'Historic evangelical and reformed convictions undergirding CrossLife.',
      ogImage: '/hero-bg.jpg',
      twitterTitle: 'CrossLife Statement of Faith',
      twitterDescription: 'Historic evangelical and reformed convictions undergirding CrossLife.',
      twitterImage: '/hero-bg.jpg',
    },
    published_at: '2026-01-01T00:00:00Z',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-03T10:00:00Z',
    created_by: 'Super Admin',
  },
  {
    id: 'page-organiser',
    title: 'The Organiser',
    slug: '/organiser',
    status: 'published',
    featured_image: '/assets/eic-logo.svg',
    seo: {
      title: 'Organiser - Equip Indian Churches | CrossLife',
      description: 'Learn about Equip Indian Churches, the pastoral fellowship and resource centre behind CrossLife Conference.',
      canonical: 'https://crosslife.in/organiser',
      robots: 'index, follow',
      ogTitle: 'Organiser - Equip Indian Churches',
      ogDescription: 'A pastoral fellowship uniting local church pastors across India.',
      ogImage: '/hero-bg.jpg',
      twitterTitle: 'Organiser - Equip Indian Churches',
      twitterDescription: 'A pastoral fellowship uniting local church pastors across India.',
      twitterImage: '/hero-bg.jpg',
    },
    published_at: '2026-01-01T00:00:00Z',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-03T10:00:00Z',
    created_by: 'Super Admin',
  },
  {
    id: 'page-faq',
    title: 'Frequently Asked Questions',
    slug: '/faq',
    status: 'published',
    featured_image: '',
    seo: {
      title: 'Frequently Asked Questions | CrossLife',
      description: 'Find answers to common questions about CrossLife conference registration, travel, lodging, and schedule.',
      canonical: 'https://crosslife.in/faq',
      robots: 'index, follow',
      ogTitle: 'CrossLife Conference FAQs',
      ogDescription: 'Answers regarding eligibility, passes, lodging, and schedule.',
      ogImage: '/hero-bg.jpg',
      twitterTitle: 'CrossLife Conference FAQs',
      twitterDescription: 'Answers regarding eligibility, passes, lodging, and schedule.',
      twitterImage: '/hero-bg.jpg',
    },
    published_at: '2026-01-01T00:00:00Z',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-03T10:00:00Z',
    created_by: 'Super Admin',
  },
  {
    id: 'page-contact',
    title: 'Contact the Team',
    slug: '/contact',
    status: 'published',
    featured_image: '',
    seo: {
      title: 'Contact Us | CrossLife',
      description: 'Get in touch with the CrossLife organising team for conference inquiries, registration assistance, and venue details.',
      canonical: 'https://crosslife.in/contact',
      robots: 'index, follow',
      ogTitle: 'Contact CrossLife Conference Team',
      ogDescription: 'Questions regarding registration or logistics? Get in touch with us.',
      ogImage: '/hero-bg.jpg',
      twitterTitle: 'Contact CrossLife Conference Team',
      twitterDescription: 'Questions regarding registration or logistics? Get in touch with us.',
      twitterImage: '/hero-bg.jpg',
    },
    published_at: '2026-01-01T00:00:00Z',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-03T10:00:00Z',
    created_by: 'Super Admin',
  },
  {
    id: 'page-partners',
    title: 'Partners & Supporting Churches',
    slug: '/partners',
    status: 'published',
    featured_image: '',
    seo: {
      title: 'Partners & Fellowship | CrossLife',
      description: 'Ministries, local churches, and pastoral fellowships collaborating for the Gospel through CrossLife.',
      canonical: 'https://crosslife.in/partners',
      robots: 'index, follow',
      ogTitle: 'CrossLife Partners & Fellowship',
      ogDescription: 'Churches and resource ministries collaborating across India.',
      ogImage: '/hero-bg.jpg',
      twitterTitle: 'CrossLife Partners & Fellowship',
      twitterDescription: 'Churches and resource ministries collaborating across India.',
      twitterImage: '/hero-bg.jpg',
    },
    published_at: '2026-01-01T00:00:00Z',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-03T10:00:00Z',
    created_by: 'Super Admin',
  },
]

export const INITIAL_PAGE_SECTIONS = [
  // 1. HERO SECTION
  {
    id: 'sec-hero',
    page_id: 'page-home',
    type: 'hero',
    order: 1,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
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
        { value: 'Hyderabad', label: 'Host City' },
        { value: 'Full Board', label: 'Lodging & Meals' },
      ],
      primaryButton: {
        text: 'Register Now',
        link: '#pricing',
        action: 'open_modal',
        modalTier: 'early-bird',
      },
      secondaryButton: {
        text: 'Event Passes & Rates',
        link: '#pricing',
        action: 'scroll',
      },
      showCountdown: true,
      countdownNotice: 'Commencing 14 September 2027 • Hyderabad',
    },
  },

  // 2. QUICK STATS STRIP
  {
    id: 'sec-quick-stats',
    page_id: 'page-home',
    type: 'quick_stats',
    order: 2,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      items: [
        { label: 'Dates', value: '14 - 16 September 2027', icon: 'Calendar' },
        { label: 'Venue', value: 'Ashirwad Global Learning Centre', icon: 'MapPin' },
        { label: 'Audience', value: '18 to 25 years old men and women', icon: 'Users' },
        { label: 'Format', value: 'Tuesday to Thursday • Full Board', icon: 'Clock' },
      ],
    },
  },

  // 3. WHAT IS CROSSLIFE (3 Core Pillars)
  {
    id: 'sec-what-is',
    page_id: 'page-home',
    type: 'pillars',
    order: 3,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      sectionId: 'what-is-crosslife',
      kicker: 'WHAT IS CROSSLIFE',
      title: 'Built for One Life, One Desire, One Purpose.',
      description: 'Equipping young people across India for wholehearted Gospel faithfulness, rooted in biblical truth and the local church.',
      buttonText: 'Join the Gathering',
      buttonAction: 'open_modal',
      pillars: [
        { num: '01', subtitle: 'Devotion', title: 'One Life', desc: 'Lived wholly for Jesus Christ.' },
        { num: '02', subtitle: 'Worship', title: 'One Desire', desc: 'Rooted in His supreme glory.' },
        { num: '03', subtitle: 'Mission', title: 'One Purpose', desc: 'Proclaiming His Gospel to all nations.' },
      ],
    },
  },

  // 4. VISION & TARGET AUDIENCE
  {
    id: 'sec-vision-audience',
    page_id: 'page-home',
    type: 'vision_audience',
    order: 4,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      kicker: 'THE VISION',
      title: 'Why CrossLife',
      subtitle: 'Substance over hype. Biblical clarity over cultural noise.',
      valuePoints: [
        { title: 'Gospel Faithfulness', desc: 'Standing firm on sound doctrine against cultural trends and worldly compromises.', icon: 'ShieldCheck' },
        { title: 'Spiritual Substance', desc: 'Sitting under authoritative Scripture with reverent worship and expository teaching.', icon: 'BookOpen' },
        { title: 'Local Church Rooted', desc: 'Connecting with seasoned pastors to build lasting, church-centred fellowship.', icon: 'Building' },
      ],
      eligibilityBadge: 'ELIGIBILITY',
      age: '18 – 25 Years',
      profileTitle: 'Who Is It For',
      summary: 'For young Christians hungry for doctrinal depth, biblical wisdom, and purposeful Gospel living.',
      tags: ['College Students', 'Young Working Adults', 'Aspiring Disciple-Makers', 'Local Church Youth'],
      includes: [
        'Full 3-day access to all sessions',
        'Dormitory lodging & all meals included',
        "Free copy of 'Don't Waste Your Life'",
        'Conference notebook & study packet',
      ],
    },
  },

  // 5. WHAT MAKES CROSSLIFE DIFFERENT
  {
    id: 'sec-difference',
    page_id: 'page-home',
    type: 'difference',
    order: 5,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      kicker: 'WHAT SETS US APART',
      title: 'Substance Over Trend',
      pullQuote: 'Come ready to be challenged and sharpened — not by trends, but by truth.',
      pillars: [
        {
          badge: 'Preaching',
          focus: 'Authoritative Exposition',
          contrasting: 'Not entertainment, hype, or emotional manipulation',
          desc: 'Uncompromising biblical preaching that feeds the mind and convicts the soul.',
        },
        {
          badge: 'Discipleship',
          focus: 'Pastoral Warmth & Depth',
          contrasting: 'Not feel-good motivational talks',
          desc: 'Challenging young adults to live Gospel-driven lives across campus and career.',
        },
        {
          badge: 'Fellowship',
          focus: 'Church-Centred Unity',
          contrasting: 'Not a shallow weekend high',
          desc: 'Meaningful connection with faithful pastors and like-minded young believers.',
        },
      ],
    },
  },

  // 6. HOPES & GOALS (5 Numbered Cards)
  {
    id: 'sec-goals',
    page_id: 'page-home',
    type: 'goals',
    order: 6,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      kicker: 'CONFERENCE OBJECTIVES',
      title: 'Hopes & Goals',
      subtitle: 'Five biblical outcomes we pray and labour for throughout this gathering.',
      goals: [
        { number: '01', title: 'Gospel Alignment', summary: 'Align daily life, study, and career with Christ.' },
        { number: '02', title: 'Biblical Conviction', summary: 'Stand firm on sound doctrine in every season of life.' },
        { number: '03', title: 'Spiritual Depth', summary: "Cultivate deep love for God's Word and personal holiness." },
        { number: '04', title: 'Practical Equipping', summary: 'Equip young adults with tools to answer tough questions.' },
        { number: '05', title: 'Gospel Community', summary: 'Build lasting mentorship with pastors and faithful peers.' },
      ],
    },
  },

  // 7. SPEAKERS SECTION
  {
    id: 'sec-speakers',
    page_id: 'page-home',
    type: 'speakers',
    order: 7,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      sectionId: 'speakers',
      kicker: 'TEACHING MINISTRY',
      title: 'Speakers',
      subtitle: 'Pastors and expositors from across India',
      rightBadge: 'Faithful Exposition',
      speakers: [
        { id: 'speaker-1', name: '[SPEAKER NAME]', role: 'Pastor', church: '[CHURCH & CITY]', topic: '[SESSION TOPIC: EXPOSITION OF THE WORD]', image: null },
        { id: 'speaker-2', name: '[SPEAKER NAME]', role: 'Pastor', church: '[CHURCH & CITY]', topic: '[SESSION TOPIC: LIVING FOR THE GOSPEL]', image: null },
        { id: 'speaker-3', name: '[SPEAKER NAME]', role: 'Pastor', church: '[CHURCH & CITY]', topic: '[SESSION TOPIC: BIBLICAL FAITHFULNESS]', image: null },
        { id: 'speaker-4', name: '[SPEAKER NAME]', role: 'Pastor', church: '[CHURCH & CITY]', topic: '[SESSION TOPIC: CHRIST IN THE LOCAL CHURCH]', image: null },
      ],
    },
  },

  // 8. PRICING & PASSES
  {
    id: 'sec-pricing',
    page_id: 'page-home',
    type: 'pricing',
    order: 8,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      sectionId: 'pricing',
      kicker: 'ADMISSION & TIERS',
      title: 'Registration Passes',
      subtitle: 'Covers 3 days of conference sessions, lodging, meals, and study materials.',
      earlyBird: {
        badge: 'Limited Availability',
        tier: 'Tier 01',
        label: 'Early Bird',
        amount: 2000,
        formattedAmount: '₹2,000',
        features: [
          'Full 3-day conference access',
          'Dormitory lodging & all meals',
          "Free book: Don't Waste Your Life",
        ],
        buttonText: 'Register Early Bird',
        coupon: {
          code: 'AIPC2026',
          discountAmount: 500,
          copy: 'Save ₹500 on Early Bird! Use code at checkout',
        },
      },
      regular: {
        badge: 'Standard Rate',
        tier: 'Tier 02',
        label: 'Regular Registration',
        amount: 3000,
        formattedAmount: '₹3,000',
        features: [
          'Applies once Early Bird slots close',
          'Full 3-day access, lodging & meals',
          'Conference packet & gift book',
        ],
        buttonText: 'Register Regular',
        note: 'Standard passes open when Tier 01 concludes.',
      },
    },
  },

  // 9. FREE BOOK FEATURE
  {
    id: 'sec-free-book',
    page_id: 'page-home',
    type: 'book_feature',
    order: 9,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      kicker: 'CONFERENCE RESOURCE',
      title: 'Free Book for Every Registered Attendee',
      description: "Every participant receives a complimentary copy of John Piper's classic \"Don't Waste Your Life\" at the check-in desk.",
      buttonText: 'Claim With Registration',
      book: {
        title: "DON'T WASTE YOUR LIFE",
        author: 'JOHN PIPER',
        badge: 'FREE GIFT',
        publisher: 'Crossway Editions',
      },
    },
  },

  // 10. BOOKSTORE SECTION
  {
    id: 'sec-bookstore',
    page_id: 'page-home',
    type: 'bookstore',
    order: 10,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      kicker: 'THEOLOGICAL RESOURCES',
      title: 'Conference Bookstore',
      subtitle: 'Curated titles at subsidized conference pricing.',
      features: [
        { title: 'Expositions & Commentaries', desc: 'Trusted reformed and evangelical authors for personal study.' },
        { title: 'Subsidized Rates', desc: 'Affordable book bundles curated specifically for students.' },
        { title: 'Pastoral Booklists', desc: 'Recommended foundational reads hand-picked by conference speakers.' },
      ],
      categories: [
        {
          title: 'Exegesis & Theology',
          desc: 'Sound doctrine, biblical commentaries, and systematic theology.',
          tag: '30%–50% Off',
          icon: 'BookOpen',
        },
        {
          title: 'Church History',
          desc: 'Biographies of Spurgeon, Lloyd-Jones, Carey, and the Reformers.',
          tag: 'Conference Bundles',
          icon: 'Library',
        },
        {
          title: 'Christian Living',
          desc: 'Gospel-centred guidance for prayer, purity, campus, and career.',
          tag: 'Student Friendly',
          icon: 'Sparkles',
        },
      ],
    },
  },

  // 11. VENUE SECTION
  {
    id: 'sec-venue',
    page_id: 'page-home',
    type: 'venue',
    order: 11,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      kicker: 'LOCATION & LODGING',
      title: 'Venue & Campus',
      venueName: 'Ashirwad Global Learning Centre',
      cityState: 'Hyderabad, Telangana',
      directionsUrl: 'https://maps.google.com',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121818.89886861614!2d78.372883!3d17.435777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb974776e0176b%3A0xb35a09b4c0e5a956!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      facilities: [
        'Air-conditioned assembly auditorium',
        'Comfortable student dormitory lodging',
        'On-site dining halls & quiet study gardens',
      ],
      boardNote: 'Full Board',
    },
  },

  // 12. ORGANISER & PARTNERS SUMMARY
  {
    id: 'sec-organiser-partners',
    page_id: 'page-home',
    type: 'organiser_partners',
    order: 12,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      kicker: 'LEADERSHIP & FELLOWSHIP',
      title: 'Organiser & Supporting Ministries',
      viewAllText: 'View All Partners',
      viewAllLink: '/partners',
      organiser: {
        badge: 'EIC',
        name: 'Equip Indian Churches',
        tagline: 'Pastoral Fellowship & Resource Centre',
        intro: 'A fellowship of pastors united to spur biblical Gospel growth across India through training, publications, and youth conferences.',
        linkText: 'Read Organiser Statement',
        linkUrl: '/organiser',
      },
      partners: [
        { id: 'partner-1', name: '[PARTNER MINISTRY NAME]', city: 'Bengaluru, Karnataka', type: 'Partner Ministry' },
        { id: 'partner-2', name: '[PARTNER MINISTRY NAME]', city: 'Hyderabad, Telangana', type: 'Supporting Church' },
        { id: 'partner-3', name: '[PARTNER MINISTRY NAME]', city: 'Mumbai, Maharashtra', type: 'Resource Partner' },
        { id: 'partner-4', name: '[PARTNER MINISTRY NAME]', city: 'New Delhi', type: 'Supporting Church' },
        { id: 'partner-5', name: '[PARTNER MINISTRY NAME]', city: 'Chennai, Tamil Nadu', type: 'Supporting Church' },
        { id: 'partner-6', name: '[PARTNER MINISTRY NAME]', city: 'Kolkata, West Bengal', type: 'Partner Fellowship' },
      ],
    },
  },

  // 13. FAQ PREVIEW
  {
    id: 'sec-faq-preview',
    page_id: 'page-home',
    type: 'faq_preview',
    order: 13,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      kicker: 'COMMON QUESTIONS',
      title: 'Frequently Asked Questions',
      viewAllText: 'View All FAQs',
      viewAllLink: '/faq',
      items: [
        {
          id: 'faq-1',
          question: 'Who is eligible to attend CrossLife?',
          answer: 'CrossLife is specifically organized for young men and women between the ages of 18 and 25 who desire to grow in their faith, deepen their relationship with Christ, and live faithfully for the Gospel in their local churches and communities.',
        },
        {
          id: 'faq-2',
          question: 'What are the dates and location for the conference?',
          answer: 'The conference will take place from Tuesday, 14 September to Thursday, 16 September 2027 at the Ashirwad Global Learning Centre in Hyderabad, Telangana.',
        },
        {
          id: 'faq-3',
          question: 'What does the registration fee cover?',
          answer: 'The registration fee (Early Bird ₹2,000, Regular ₹3,000) covers complete access to all main preaching sessions, workshops, conference study materials, lodging at the venue, all meals during the 3 days, and a complimentary copy of John Piper\'s book "Don\'t Waste Your Life".',
        },
        {
          id: 'faq-4',
          question: 'How do I avail the Early Bird discount code?',
          answer: 'Use the code AIPC2026 at checkout to save ₹500 on your Early Bird registration. Be sure to apply the code prior to completing your payment.',
        },
        {
          id: 'faq-5',
          question: 'What should I bring with me to the conference?',
          answer: '[FAQ ANSWER PLACEHOLDER: Details on Bible, notebook, clothing recommendations, and personal travel necessities will be provided here.]',
        },
      ],
    },
  },

  // 14. FINAL CTA BAND
  {
    id: 'sec-final-cta',
    page_id: 'page-home',
    type: 'final_cta',
    order: 14,
    status: 'published',
    visibility: { desktop: true, tablet: true, mobile: true },
    schedule: { publish_from: null, publish_until: null },
    data: {
      kicker: '14 - 16 SEPTEMBER 2027 • HYDERABAD',
      headline: 'One Life for Christ. Come ready to be equipped.',
      subtext: "Early bird passes are limited. Claim your pass and complimentary copy of Don't Waste Your Life.",
      primaryButton: {
        text: 'Register Now',
        link: '#pricing',
        action: 'open_modal',
      },
      secondaryButton: {
        text: 'Contact the Team',
        link: '/contact',
      },
    },
  },
]

export const INITIAL_MEDIA = [
  {
    id: 'media-logo',
    filename: 'crosslife-logo.webp',
    url: '/images/crosslife-logo.webp',
    type: 'image/webp',
    size: 24500,
    width: 480,
    height: 120,
    alt_text: 'CrossLife Logo',
    caption: 'Official CrossLife branding',
    description: 'Vector logo optimized for high-DPI displays',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'media-hero',
    filename: 'hero-bg.jpg',
    url: '/hero-bg.jpg',
    type: 'image/jpeg',
    size: 185000,
    width: 1920,
    height: 1080,
    alt_text: 'Atmospheric conference assembly hall',
    caption: 'Conference main stage backdrop',
    description: 'Dark toned editorial auditorium background',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'media-eic',
    filename: 'eic-logo.svg',
    url: '/src/assets/eic-logo.svg',
    type: 'image/svg+xml',
    size: 8400,
    width: 200,
    height: 200,
    alt_text: 'Equip Indian Churches Logo',
    caption: 'Equip Indian Churches identity',
    description: 'Official emblem of Equip Indian Churches',
    created_at: '2026-01-01T00:00:00Z',
  },
]

export const INITIAL_REUSABLE_BLOCKS = [
  {
    id: 'block-main-cta',
    name: 'Main Conference Registration CTA',
    type: 'final_cta',
    data: {
      kicker: '14 - 16 SEPTEMBER 2027 • HYDERABAD',
      headline: 'One Life for Christ. Come ready to be equipped.',
      subtext: "Early bird passes are limited. Claim your pass and complimentary copy of Don't Waste Your Life.",
      primaryButton: { text: 'Register Now', link: '#pricing' },
      secondaryButton: { text: 'Contact the Team', link: '/contact' },
    },
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-03T10:00:00Z',
  },
  {
    id: 'block-book-gift',
    name: 'Free Book Promotion Card',
    type: 'book_feature',
    data: {
      kicker: 'CONFERENCE RESOURCE',
      title: 'Free Book for Every Registered Attendee',
      description: "Every participant receives a complimentary copy of John Piper's classic \"Don't Waste Your Life\" at the check-in desk.",
      buttonText: 'Claim With Registration',
      book: {
        title: "DON'T WASTE YOUR LIFE",
        author: 'JOHN PIPER',
        badge: 'FREE GIFT',
        publisher: 'Crossway Editions',
      },
    },
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-03T10:00:00Z',
  },
]

export const INITIAL_REDIRECTS = [
  {
    id: 'redir-1',
    source_url: '/register-now',
    target_url: '/#pricing',
    status_code: 301,
    enabled: true,
    created_at: '2026-01-01T00:00:00Z',
  },
]

export const INITIAL_USERS = [
  {
    id: 'user-super',
    name: 'Isaac Abny',
    email: 'admin@crosslife.in',
    role: 'super_admin',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=IA',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-editor',
    name: 'Sarah Joseph',
    email: 'editor@crosslife.in',
    role: 'editor',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SJ',
    created_at: '2026-02-15T00:00:00Z',
  },
]
