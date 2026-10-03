import React, { createContext, useContext, useState, useEffect } from 'react'
import { getUsers, saveUser } from '../services/cmsStore'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'

const CmsAuthContext = createContext(null)

export function CmsAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('crosslife_cms_auth_user')
      if (saved) return JSON.parse(saved)
    } catch {}
    // Default to Super Admin for seamless development experience
    return {
      id: 'user-super',
      name: 'Isaac Abny',
      email: 'admin@crosslife.in',
      role: 'super_admin',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=IA',
    }
  })

  const [loading, setLoading] = useState(false)

  // Listen to Supabase auth state if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          const userObj = {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: profile.role,
            avatar: profile.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`,
          }
          setCurrentUser(userObj)
          localStorage.setItem('crosslife_cms_auth_user', JSON.stringify(userObj))
        }
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        return { success: true, user: data.user }
      } else {
        // Fallback / local auth match
        const users = getUsers()
        const matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
        if (matched) {
          setCurrentUser(matched)
          localStorage.setItem('crosslife_cms_auth_user', JSON.stringify(matched))
          return { success: true, user: matched }
        } else {
          // Allow login as demo user
          const demoUser = {
            id: `user-${Date.now()}`,
            name: email.split('@')[0],
            email,
            role: email.includes('admin') ? 'super_admin' : 'editor',
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
          }
          setCurrentUser(demoUser)
          localStorage.setItem('crosslife_cms_auth_user', JSON.stringify(demoUser))
          return { success: true, user: demoUser }
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut()
    }
    setCurrentUser(null)
    localStorage.removeItem('crosslife_cms_auth_user')
  }

  const switchUser = (role) => {
    const users = getUsers()
    const target = users.find((u) => u.role === role) || {
      id: `user-${role}`,
      name: role === 'super_admin' ? 'Isaac (Super Admin)' : role === 'admin' ? 'Alex (Admin)' : 'Sarah (Editor)',
      email: `${role}@crosslife.in`,
      role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${role}`,
    }
    setCurrentUser(target)
    localStorage.setItem('crosslife_cms_auth_user', JSON.stringify(target))
  }

  // Permission helpers
  const isSuperAdmin = currentUser?.role === 'super_admin'
  const isAdmin = currentUser?.role === 'admin' || isSuperAdmin
  const isEditor = Boolean(currentUser)

  const canEditContent = Boolean(currentUser)
  const canPublish = isAdmin || isSuperAdmin
  const canManageMenus = isAdmin || isSuperAdmin
  const canManageSettings = isAdmin || isSuperAdmin
  const canManageUsers = isSuperAdmin
  const canDeletePermanently = isSuperAdmin

  return (
    <CmsAuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        logout,
        switchUser,
        isSuperAdmin,
        isAdmin,
        isEditor,
        canEditContent,
        canPublish,
        canManageMenus,
        canManageSettings,
        canManageUsers,
        canDeletePermanently,
      }}
    >
      {children}
    </CmsAuthContext.Provider>
  )
}

export function useCmsAuth() {
  const context = useContext(CmsAuthContext)
  if (!context) {
    throw new Error('useCmsAuth must be used within a CmsAuthProvider')
  }
  return context
}
