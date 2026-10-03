import React, { useEffect, Suspense } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ui/ErrorBoundary'
import { CmsAuthProvider } from './cms/context/CmsAuthContext'
import { CmsProvider } from './cms/context/CmsContext'
import * as cmsStore from './cms/services/cmsStore'

// Code-split pages for high performance and fast initial load
const Home = React.lazy(() => import('./pages/Home'))
const StatementOfFaith = React.lazy(() => import('./pages/StatementOfFaith'))
const Organiser = React.lazy(() => import('./pages/Organiser'))
const FAQ = React.lazy(() => import('./pages/FAQ'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Partners = React.lazy(() => import('./pages/Partners'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

// Code-split CMS Admin Dashboard & Previews
const AdminLayout = React.lazy(() =>
  import('./cms/components/admin/AdminLayout').then((m) => ({ default: m.AdminLayout }))
)
const PreviewPage = React.lazy(() => import('./cms/components/preview/PreviewPage'))
const CmsDynamicPage = React.lazy(() => import('./cms/components/frontend/CmsDynamicPage'))

function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8 bg-brand-page">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
        <span className="text-xs uppercase font-mono tracking-widest text-brand-muted">
          Loading...
        </span>
      </div>
    </div>
  )
}

/**
 * ScrollToTop & Global Redirects Handler
 */
function ScrollHandler() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  // 1. Check CMS URL Redirects with safe protocol validation
  useEffect(() => {
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/preview')) {
      const redirect = cmsStore.matchRedirect(pathname)
      if (redirect && redirect.target_url) {
        const target = redirect.target_url.trim()
        if (target.startsWith('https://') || target.startsWith('http://')) {
          window.location.href = target
        } else if (target.startsWith('/') || target.startsWith('#')) {
          navigate(target, { replace: true })
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
    <ErrorBoundary>
      <CmsAuthProvider>
        <CmsProvider>
          <ScrollHandler />
          <Suspense fallback={<PageFallback />}>
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
                    <Suspense fallback={<PageFallback />}>
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
                    </Suspense>
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </CmsProvider>
      </CmsAuthProvider>
    </ErrorBoundary>
  )
}
