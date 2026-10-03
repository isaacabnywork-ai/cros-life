import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-brand-page text-brand-text">
          <div className="max-w-md w-full bg-white rounded-panel border border-brand-border p-8 shadow-panel text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-brand-amber-hover flex items-center justify-center mx-auto border border-brand-amber/30">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="font-display font-bold text-xl text-brand-navy">
                Something went wrong
              </h2>
              <p className="text-xs text-brand-muted leading-relaxed">
                An unexpected display error occurred while rendering this part of the website.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-navy hover:bg-brand-blue text-white rounded-btn text-xs font-semibold shadow-xs transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>

              <a
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-ice hover:bg-slate-200 text-brand-navy border border-brand-border rounded-btn text-xs font-semibold transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Go Home</span>
              </a>
            </div>

            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <details className="text-left mt-4 p-3 bg-slate-50 rounded border border-slate-200 text-[11px] font-mono text-rose-600 overflow-x-auto">
                <summary className="cursor-pointer font-semibold text-slate-700">Developer Stack Trace</summary>
                <p className="mt-2 whitespace-pre-wrap">{this.state.error.toString()}</p>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
