import { useEffect } from 'react'

function setOrCreateMeta(selector, attributeName, attributeValue, content) {
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attributeName, attributeValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content || '')
}

function setOrCreateLink(rel, href) {
  let link = document.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export default function SEO({
  title,
  description,
  image = '/images/crosslife-logo.webp',
  type = 'website',
}) {
  useEffect(() => {
    const siteName = 'CrossLife'
    const defaultTitle = 'CrossLife - One Life | Gospel-Centred Youth Conference'
    const fullTitle = title ? `${title} | ${siteName}` : defaultTitle

    // 1. Page Title
    document.title = fullTitle

    // 2. Standard Meta Description
    const metaDescription =
      description ||
      'CrossLife is a Gospel-centred conference for young people (ages 18–25) organised by Equip Indian Churches in Hyderabad, India.'
    setOrCreateMeta('meta[name="description"]', 'name', 'description', metaDescription)

    // 3. Open Graph Tags
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://cros-life.vercel.app'
    setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', metaDescription)
    setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', currentUrl)
    setOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', type)
    if (image) {
      const fullImageUrl = image.startsWith('http')
        ? image
        : `${window.location.origin}${image.startsWith('/') ? image : '/' + image}`
      setOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', fullImageUrl)
      setOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', fullImageUrl)
    }

    // 4. Twitter Card Tags
    setOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription)

    // 5. Canonical Link
    setOrCreateLink('canonical', currentUrl.split('?')[0].split('#')[0])
  }, [title, description, image, type])

  return null
}
