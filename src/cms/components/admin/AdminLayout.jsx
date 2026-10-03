import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import { useCmsAuth } from '../../context/CmsAuthContext'

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
            <Route path="header" element={<HeaderManager />} />
            <Route path="menus" element={<MenuBuilder />} />
            <Route path="mega-menus" element={<MegaMenuBuilder />} />
            <Route path="footer" element={<FooterManager />} />
            <Route path="settings" element={<GlobalSettings />} />
            <Route path="seo" element={<SeoManager />} />
            <Route path="redirects" element={<RedirectsManager />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="activity" element={<ActivityLog />} />
            <Route path="trash" element={<TrashManager />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
