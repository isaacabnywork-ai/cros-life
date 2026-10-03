import React, { useState } from 'react'
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import { useCmsAuth } from '../../context/CmsAuthContext'

export function AdminLogin() {
  const { login, loading } = useCmsAuth()
  const [email, setEmail] = useState('admin@crosslife.in')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      setError(err?.message || 'Invalid login credentials')
    }
  }

  const handleQuickLogin = (roleEmail) => {
    setEmail(roleEmail)
    login(roleEmail, 'password')
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-panel shadow-panel border border-slate-200 overflow-hidden">
        {/* Brand Header */}
        <div className="bg-brand-navy p-8 text-center text-white space-y-2">
          <div className="w-12 h-12 rounded-xl bg-brand-amber text-brand-navy font-display font-extrabold text-2xl flex items-center justify-center mx-auto shadow-sm">
            C
          </div>
          <h2 className="font-display font-bold text-2xl tracking-tight">CrossLife CMS</h2>
          <p className="text-xs text-slate-300">Sign in to manage website content and navigation</p>
        </div>

        {/* Login Form */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs rounded-md border border-slate-300 px-3 py-2.5 focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs rounded-md border border-slate-300 px-3 py-2.5 focus:border-brand-blue focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-brand-navy hover:bg-brand-blue text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>

          {/* Demo Quick Logins for Instant Evaluation */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              Quick Role Simulation
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@crosslife.in')}
                className="p-2 bg-slate-50 hover:bg-brand-ice text-slate-700 border border-slate-200 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                <span>Super Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('editor@crosslife.in')}
                className="p-2 bg-slate-50 hover:bg-brand-ice text-slate-700 border border-slate-200 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Editor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
