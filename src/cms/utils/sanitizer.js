/**
 * Simple, secure HTML sanitizer for controlled Custom Content Blocks.
 * Strips script tags, inline event handlers (onclick, etc.), javascript: URLs, and unsafe elements.
 */
export function sanitizeHtml(rawHtml) {
  if (!rawHtml || typeof rawHtml !== 'string') return ''

  let clean = rawHtml
    // Strip script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Strip style tags and content
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Strip iframe / object / embed
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    // Strip inline event attributes (on*)
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/\son\w+=\S+/gi, '')
    // Strip javascript: pseudo protocols
    .replace(/href=["']?javascript:[^"'>]*/gi, 'href="#"')
    .replace(/src=["']?javascript:[^"'>]*/gi, 'src=""')

  return clean
}
