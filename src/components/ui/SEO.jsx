import { useEffect } from 'react'

export default function SEO({ title, description }) {
  useEffect(() => {
    const defaultTitle = 'CrossLife - One Life | Gospel-Centred Youth Conference'
    const fullTitle = title ? `${title} | CrossLife` : defaultTitle
    document.title = fullTitle

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.content = description
    }
  }, [title, description])

  return null
}
