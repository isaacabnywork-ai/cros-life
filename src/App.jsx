import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import StatementOfFaith from './pages/StatementOfFaith'
import Organiser from './pages/Organiser'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Partners from './pages/Partners'
import NotFound from './pages/NotFound'
import { CmsAuthProvider } from './cms/context/CmsAuthContext'
import { CmsProvider } from './cms/context/CmsContext'
import { AdminLayout } from './cms/components/admin/AdminLayout'
import PreviewPage from './cms/components/preview/PreviewPage'
import CmsDynamicPage from './cms/components/frontend/CmsDynamicPage'
import * as cmsStore from './cms/services/cmsStore'

/**
 * ScrollToTop & Global Redirects Handler
 */
function ScrollHandler() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  // 1. Check CMS URL Redirects
  useEffect(() => {
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/preview')) {
      const redirect = cmsStore.matchRedirect(pathname)
      if (redirect) {
        if (redirect.target_url.startsWith('http')) {
          window.location.href = redirect.target_url
        } else {
          navigate(redirect.target_url, { replace: true })
        }
      }
    }
  }, [pathname, navigate])

  // 2. Smooth Scroll to hash or top
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <CmsAuthProvider>
      <CmsProvider>
        <ScrollHandler />
        <Routes>
          {/* Protected /admin CMS Dashboard Area */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Real-Component CMS Live Preview Route */}
          <Route path="/preview/:pageId" element={<PreviewPage />} />

          {/* Public Website Routes (Wrapped in Frontend Layout) */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/statement-of-faith" element={<StatementOfFaith />} />
                  <Route path="/organiser" element={<Organiser />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/partners" element={<Partners />} />
                  {/* Dynamic CMS-Created Pages */}
                  <Route path="/page/:slug" element={<CmsDynamicPage />} />
                  {/* Fallback to dynamic CMS page resolution or 404 */}
                  <Route path="*" element={<CmsDynamicPage />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </CmsProvider>
    </CmsAuthProvider>
  )
}
