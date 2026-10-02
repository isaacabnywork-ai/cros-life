/**
 * Central site configuration for CrossLife Conference.
 * Edit registration URLs, contact details, and dates here.
 */
export const SITE_CONFIG = {
  name: 'CrossLife',
  tagline: 'One Life',
  subTagline: 'A Conference for Young People',
  organiser: 'Equip Indian Churches',
  targetAudience: '18 to 25 years old men and women',
  dates: '14 - 16 September 2027',
  days: 'Tuesday to Thursday',
  year: '2027',
  
  // ISO Date for UTC countdown calculation
  startDateIso: '2027-09-14T09:00:00+05:30',

  venue: {
    name: 'Ashirwad Global Learning Centre',
    city: 'Hyderabad',
    state: 'Telangana',
    fullAddress: 'Ashirwad Global Learning Centre, Hyderabad, Telangana, India',
    // Embedded map placeholder - replace with actual Google Maps embed URL
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121818.89886861614!2d78.372883!3d17.435777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb974776e0176b%3A0xb35a09b4c0e5a956!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },

  pricing: {
    currencySymbol: '₹',
    earlyBird: {
      id: 'early-bird',
      label: 'Early Bird',
      amount: 2000,
      formattedAmount: '₹2,000',
      description: 'Full 3-day conference access, lodging, meals, and conference pack.',
      badge: 'Limited Availability',
    },
    regular: {
      id: 'regular',
      label: 'Regular Registration',
      amount: 3000,
      formattedAmount: '₹3,000',
      description: 'Standard admission for all sessions, materials, lodging, and meals.',
    },
    coupon: {
      code: 'AIPC2026',
      discountAmount: 500,
      copy: 'Save ₹500 on Early Bird! Use code at checkout',
    },
  },

  giftBook: {
    title: "Don't Waste Your Life",
    author: 'John Piper',
    description: "Register now and receive your free copy of Don't Waste Your Life.",
  },

  contacts: {
    phones: [
      { display: '+91 98867 69948', value: '+919886769948' },
      { display: '+91 99368 44317', value: '+919936844317' },
    ],
    email: 'contact@crosslife.in',
  },

  // Centralised registration link - update when real form or gateway is ready
  REGISTER_URL: 'https://crosslife.in/register',

  // Contact form submission endpoint placeholder
  FORM_ENDPOINT: 'https://formspree.io/f/placeholder',
}
