/**
 * Robust HTML sanitizer for controlled Custom Content Blocks.
 * Uses native DOMParser to parse, validate against an explicit whitelist of safe tags & attributes,
 * neutralize dangerous event handlers and pseudo-protocols (javascript:, data:), and enforce safe rel attributes.
 */

const ALLOWED_TAGS = new Set([
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'b', 'strong', 'i', 'em', 'u', 's', 'small', 'mark',
  'blockquote', 'hr', 'br', 'span', 'div',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
  'img', 'code', 'pre', 'sub', 'sup'
])

const ALLOWED_ATTRS = new Set([
  'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel', 'loading', 'width', 'height'
])

function isSafeUrl(url) {
  if (!url) return false
  const trimmed = url.trim().toLowerCase()
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return true
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) return true
  if (trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) return true
  return false
}

function cleanNode(node, doc) {
  const children = Array.from(node.childNodes)

  for (const child of children) {
    if (child.nodeType === 3) {
      // Text node is safe
      continue
    }

    if (child.nodeType === 1) {
      const tagName = child.tagName.toLowerCase()

      // If tag is not allowed, replace with its sanitized children or remove
      if (!ALLOWED_TAGS.has(tagName)) {
        cleanNode(child, doc)
        while (child.firstChild) {
          node.insertBefore(child.firstChild, child)
        }
        node.removeChild(child)
        continue
      }

      // Filter attributes
      const attrs = Array.from(child.attributes)
      for (const attr of attrs) {
        const attrName = attr.name.toLowerCase()
        const attrVal = attr.value

        // Remove any event handlers (onclick, onmouseover, onload, onerror, etc.)
        if (attrName.startsWith('on')) {
          child.removeAttribute(attr.name)
          continue
        }

        // Validate attribute against whitelist
        if (!ALLOWED_ATTRS.has(attrName)) {
          child.removeAttribute(attr.name)
          continue
        }

        // Validate URLs for href and src
        if (attrName === 'href' || attrName === 'src') {
          if (!isSafeUrl(attrVal)) {
            child.removeAttribute(attr.name)
          } else if (tagName === 'a' && child.getAttribute('target') === '_blank') {
            child.setAttribute('rel', 'noopener noreferrer')
          }
        }
      }

      // Recursively clean children
      cleanNode(child, doc)
    } else {
      // Remove comments and other node types
      node.removeChild(child)
    }
  }
}

export function sanitizeHtml(rawHtml) {
  if (!rawHtml || typeof rawHtml !== 'string') return ''

  // Browser environment: use DOMParser
  if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(rawHtml, 'text/html')
      cleanNode(doc.body, doc)
      return doc.body.innerHTML
    } catch (e) {
      console.error('DOMParser sanitation error:', e)
    }
  }

  // Fallback regex sanitizer if DOMParser is unavailable (SSR/tests)
  return rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .replace(/\son\w+(?:="[^"]*"|='[^']*'|=\S+)/gi, '')
    .replace(/href=["']?javascript:[^"'>]*/gi, 'href="#"')
    .replace(/src=["']?javascript:[^"'>]*/gi, 'src=""')
}
