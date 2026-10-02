import React from 'react'
import { ArrowLeft } from 'lucide-react'
import SEO from '../components/ui/SEO'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="bg-brand-page min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4">
      <SEO
        title="404 - Page Not Found"
        description="The requested page could not be located."
      />

      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-panel border border-brand-border shadow-panel">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-blue block">
          Error 404
        </span>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy tracking-tight">
          Page Not Found
        </h1>

        <div className="w-12 h-0.5 bg-brand-amber mx-auto" />

        <p className="text-sm text-brand-muted leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="pt-4">
          <Button variant="primary" to="/">
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            <span>Return to Homepage</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
