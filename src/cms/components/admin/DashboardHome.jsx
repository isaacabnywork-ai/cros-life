import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FileText,
  CheckCircle2,
  FileClock,
  Image as ImageIcon,
  Plus,
  Home,
  Menu,
  Clock,
  ArrowRight,
  Database,
  ExternalLink,
} from 'lucide-react'
import { useCms } from '../../context/CmsContext'
import { useCmsAuth } from '../../context/CmsAuthContext'
import * as activityService from '../../services/activityLogger'
import { getSupabaseStatus } from '../../services/supabaseClient'

export function DashboardHome() {
  const navigate = useNavigate()
  const { pages, media, settings } = useCms()
  const { currentUser } = useCmsAuth()
  const activityLogs = activityService.getLocalActivityLogs().slice(0, 6)
  const supabaseStatus = getSupabaseStatus()

  const totalPages = pages.length
  const publishedPages = pages.filter((p) => p.status === 'published').length
  const draftPages = pages.filter((p) => p.status === 'draft').length
  const scheduledPages = pages.filter((p) => p.status === 'scheduled').length

  const stats = [
    { label: 'Total Pages', count: totalPages, icon: FileText, color: 'text-brand-blue bg-blue-50' },
    { label: 'Published Pages', count: publishedPages, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Draft Pages', count: draftPages, icon: FileClock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Media Assets', count: media.length, icon: ImageIcon, color: 'text-purple-600 bg-purple-50' },
  ]

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome & Quick Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">
            Welcome back, {currentUser?.name || 'Administrator'}!
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your website content, navigation, and media seamlessly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-xs font-semibold text-slate-700 shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
            <span>View Live Website</span>
          </a>

          <button
            type="button"
            onClick={() => navigate('/admin/pages/edit/page-home')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-navy hover:bg-brand-blue text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Edit Homepage</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="p-5 bg-white rounded-panel border border-slate-200 shadow-xs flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {s.label}
                </span>
                <span className="font-display font-extrabold text-3xl text-slate-900 mt-1 block">
                  {s.count}
                </span>
              </div>
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${s.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions Band */}
      <div className="p-6 bg-white rounded-panel border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/admin/pages"
            className="p-3 bg-slate-50 hover:bg-brand-ice/60 border border-slate-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-slate-800 transition-colors group"
          >
            <Plus className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform" />
            <span>+ New Page</span>
          </Link>

          <Link
            to="/admin/pages/edit/page-home"
            className="p-3 bg-slate-50 hover:bg-brand-ice/60 border border-slate-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-slate-800 transition-colors group"
          >
            <Home className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform" />
            <span>Edit Homepage</span>
          </Link>

          <Link
            to="/admin/media"
            className="p-3 bg-slate-50 hover:bg-brand-ice/60 border border-slate-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-slate-800 transition-colors group"
          >
            <ImageIcon className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform" />
            <span>Upload Media</span>
          </Link>

          <Link
            to="/admin/menus"
            className="p-3 bg-slate-50 hover:bg-brand-ice/60 border border-slate-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-slate-800 transition-colors group"
          >
            <Menu className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform" />
            <span>Manage Menus</span>
          </Link>
        </div>
      </div>

      {/* Two Column Section: Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Activity Feed */}
        <div className="lg:col-span-8 p-6 bg-white rounded-panel border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-blue" />
              <span>Recent Activity</span>
            </h3>
            <Link to="/admin/activity" className="text-xs text-brand-blue font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {activityLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-800">{log.action}</p>
                  <p className="text-[11px] text-slate-400">
                    {log.entity_title} • by {log.user_name}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {new Date(log.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}

            {activityLogs.length === 0 && (
              <p className="py-6 text-center text-slate-400 text-xs">No recent activity logged.</p>
            )}
          </div>
        </div>

        {/* System & Storage Status */}
        <div className="lg:col-span-4 p-6 bg-white rounded-panel border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Database className="w-4 h-4 text-brand-blue" />
            <span>Database & Storage</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Database Engine:</span>
              <span className="font-semibold text-slate-800">
                {supabaseStatus.configured ? 'PostgreSQL (Supabase)' : 'Local Persistent Engine'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Supabase Connection:</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  supabaseStatus.configured
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {supabaseStatus.configured ? 'Connected' : 'Ready (Offline/Local)'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Conference Name:</span>
              <span className="font-semibold text-slate-800">{settings.site_name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Event Dates:</span>
              <span className="font-mono text-slate-700">{settings.event?.dates}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              to="/admin/settings"
              className="text-xs font-semibold text-brand-blue hover:underline flex items-center justify-between"
            >
              <span>Manage Global Settings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
