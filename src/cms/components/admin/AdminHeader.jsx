import React, { useState } from 'react'
import { Menu, Search, ExternalLink, LogOut, User } from 'lucide-react'
import { useCmsAuth } from '../../context/CmsAuthContext'
import { AdminSearchModal } from './AdminSearchModal'

export function AdminHeader({ onOpenMobileMenu }) {
  const { currentUser, logout } = useCmsAuth()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 md:hidden"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search Button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-md text-xs transition-colors w-48 sm:w-64"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Search CMS...</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right User & Actions */}
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-navy"
          >
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* User Profile */}
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=Admin'}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200"
            />
            <div className="hidden md:block text-left">
              <span className="text-xs font-semibold text-slate-900 block leading-tight">
                {currentUser?.name || 'Administrator'}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue block">
                {currentUser?.role?.replace('_', ' ')}
              </span>
            </div>

            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 ml-1 transition-colors"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <AdminSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
