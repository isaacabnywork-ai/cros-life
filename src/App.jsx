import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import StatementOfFaith from './pages/StatementOfFaith'
import Organiser from './pages/Organiser'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Partners from './pages/Partners'
import NotFound from './pages/NotFound'

/**
 * ScrollToTop helper: handles both route changes and smooth in-page hash links (#what-is-crosslife, etc.)
 */
function ScrollHandler() {
  const { pathname, hash } = useLocation()

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
    <Layout>
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statement-of-faith" element={<StatementOfFaith />} />
        <Route path="/organiser" element={<Organiser />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
