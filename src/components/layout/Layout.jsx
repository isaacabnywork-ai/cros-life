import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingButton from './FloatingButton'
import RegisterModal from './RegisterModal'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-page text-brand-text">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-brand-navy text-white text-xs font-semibold rounded shadow-modal focus:outline-none focus:ring-2 focus:ring-brand-amber"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 focus:outline-none">
        {children}
      </main>

      <Footer />
      <FloatingButton />
      <RegisterModal />
    </div>
  )
}
