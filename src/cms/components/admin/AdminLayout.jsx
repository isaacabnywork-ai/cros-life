import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useCmsAuth } from '../../context/CmsAuthContext'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { DashboardHome } from './DashboardHome'
import { PagesList } from './PagesList'
import { PageEditor } from './PageEditor'
import { MediaLibrary } from './MediaLibrary'
import { HeaderManager } from './HeaderManager'
import { MenuBuilder } from './MenuBuilder'
import { MegaMenuBuilder } from './MegaMenuBuilder'
import { FooterManager } from './FooterManager'
import { GlobalSettings } from './GlobalSettings'
import { SeoManager } from './SeoManager'
import { RedirectsManager } from './RedirectsManager'
import { ReusableBlocksManager } from './ReusableBlocksManager'
import { UsersManager } from './UsersManager'
import { ActivityLog } from './ActivityLog'
import { TrashManager } from './TrashManager'
import { AdminLogin } from './AdminLogin'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function RequireRole({ children, minRole = 'editor' }) {
  const { currentUser, isSuperAdmin, isAdmin } = useCmsAuth()

  let hasAccess = false
  if (minRole === 'super_admin') {
    hasAccess = isSuperAdmin
  } else if (minRole === 'admin') {
    hasAccess = isAdmin
  } else {
    hasAccess = Boolean(currentUser)
  }

  if (!hasAccess) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4 bg-white rounded-panel border border-slate-200 mt-12 shadow-panel">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="font-display font-bold text-lg text-slate-800">Access Restricted</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Your current account role (<strong>{currentUser?.role || 'editor'}</strong>) does not have sufficient permissions to access this management area.
        </p>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white text-xs font-semibold rounded transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    )
  }

  return children
}

export function AdminLayout() {
  const { currentUser } = useCmsAuth()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  if (!currentUser) {
    return <AdminLogin />
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-800">
      {/* Sidebar (Desktop & Mobile Drawer) */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onOpenMobileMenu={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="pages" element={<PagesList />} />
            <Route path="pages/edit/:pageId" element={<PageEditor />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="blocks" element={<ReusableBlocksManager />} />
            <Route
              path="header"
              element={
                <RequireRole minRole="admin">
                  <HeaderManager />
                </RequireRole>
              }
            />
            <Route
              path="menus"
              element={
                <RequireRole minRole="admin">
                  <MenuBuilder />
                </RequireRole>
              }
            />
            <Route
              path="mega-menus"
              element={
                <RequireRole minRole="admin">
                  <MegaMenuBuilder />
                </RequireRole>
              }
            />
            <Route
              path="footer"
              element={
                <RequireRole minRole="admin">
                  <FooterManager />
                </RequireRole>
              }
            />
            <Route
              path="settings"
              element={
                <RequireRole minRole="admin">
                  <GlobalSettings />
                </RequireRole>
              }
            />
            <Route
              path="seo"
              element={
                <RequireRole minRole="admin">
                  <SeoManager />
                </RequireRole>
              }
            />
            <Route
              path="redirects"
              element={
                <RequireRole minRole="admin">
                  <RedirectsManager />
                </RequireRole>
              }
            />
            <Route
              path="users"
              element={
                <RequireRole minRole="super_admin">
                  <UsersManager />
                </RequireRole>
              }
            />
            <Route path="activity" element={<ActivityLog />} />
            <Route path="trash" element={<TrashManager />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
