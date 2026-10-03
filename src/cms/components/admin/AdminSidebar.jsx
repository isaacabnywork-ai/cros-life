import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Layers,
  LayoutTemplate,
  Menu,
  LayoutGrid,
  Footprints,
  Home,
  Settings,
  Globe,
  GitFork,
  Users,
  Activity,
  Trash2,
  X,
  ExternalLink,
} from 'lucide-react'

import { useCmsAuth } from '../../context/CmsAuthContext'

const NAV_GROUPS = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true },
      { label: 'Homepage', to: '/admin/pages/edit/page-home', icon: Home },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { label: 'Pages', to: '/admin/pages', icon: FileText },
      { label: 'Media Library', to: '/admin/media', icon: ImageIcon },
      { label: 'Reusable Blocks', to: '/admin/blocks', icon: Layers },
    ],
  },
  {
    title: 'NAVIGATION',
    items: [
      { label: 'Header Settings', to: '/admin/header', icon: LayoutTemplate, minRole: 'admin' },
      { label: 'Menu Builder', to: '/admin/menus', icon: Menu, minRole: 'admin' },
      { label: 'Mega Menus', to: '/admin/mega-menus', icon: LayoutGrid, minRole: 'admin' },
      { label: 'Footer Settings', to: '/admin/footer', icon: Footprints, minRole: 'admin' },
    ],
  },
  {
    title: 'WEBSITE',
    items: [
      { label: 'Global Settings', to: '/admin/settings', icon: Settings, minRole: 'admin' },
      { label: 'SEO Defaults', to: '/admin/seo', icon: Globe, minRole: 'admin' },
      { label: 'Redirects', to: '/admin/redirects', icon: GitFork, minRole: 'admin' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Users & Roles', to: '/admin/users', icon: Users, minRole: 'super_admin' },
      { label: 'Activity Log', to: '/admin/activity', icon: Activity },
      { label: 'Trash', to: '/admin/trash', icon: Trash2 },
    ],
  },
]

export function AdminSidebar({ mobileOpen = false, onCloseMobile }) {
  const { isSuperAdmin, isAdmin } = useCmsAuth()

  const canViewItem = (item) => {
    if (item.minRole === 'super_admin') return isSuperAdmin
    if (item.minRole === 'admin') return isAdmin
    return true
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:z-0`}
      >
        {/* Brand Bar */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <NavLink to="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-amber flex items-center justify-center font-bold text-brand-navy font-display text-base">
              C
            </div>
            <div>
              <span className="font-display font-bold text-base text-white tracking-tight block">
                CrossLife CMS
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block -mt-0.5">
                Admin Panel
              </span>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1 rounded text-slate-400 hover:text-white md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {NAV_GROUPS.map((group) => {
            const visibleItems = group.items.filter(canViewItem)
            if (visibleItems.length === 0) return null

            return (
              <div key={group.title} className="space-y-1">
                <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">
                  {group.title}
                </span>
                <div className="space-y-0.5 pt-1">
                  {visibleItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.exact}
                        onClick={onCloseMobile}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                            isActive
                              ? 'bg-brand-blue text-white shadow-xs'
                              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer info & Live Link */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-brand-amber transition-colors"
          >
            <span>Open Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>
    </>
  )
}
