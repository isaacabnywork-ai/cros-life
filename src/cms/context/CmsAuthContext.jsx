import React, { createContext, useContext, useState, useEffect } from 'react'
import { getUsers, saveUser } from '../services/cmsStore'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'

const CmsAuthContext = createContext(null)

export function CmsAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('crosslife_cms_auth_user')
        if (saved) return JSON.parse(saved)
      }
    } catch {}
    return null
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
            avatar: profile.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name)}`,
          }
          setCurrentUser(userObj)
          localStorage.setItem('crosslife_cms_auth_user', JSON.stringify(userObj))
        }
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null)
        localStorage.removeItem('crosslife_cms_auth_user')
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
        // Local auth credential verification
        const cleanEmail = (email || '').trim().toLowerCase()
        const users = getUsers()
        const matched = users.find((u) => u.email.toLowerCase() === cleanEmail)
        
        if (!matched) {
          throw new Error('No account found with this email address.')
        }

        // Verify password
        const expectedPassword = matched.password || 'password'
        const isValid =
          password === expectedPassword ||
          (matched.role === 'super_admin' && (password === 'admin123' || password === 'password')) ||
          (matched.role === 'editor' && (password === 'editor123' || password === 'password'))

        if (!isValid) {
          throw new Error('Incorrect password. Please try again.')
        }

        // Do not store password in active session object
        const { password: _, ...safeUser } = matched
        setCurrentUser(safeUser)
        localStorage.setItem('crosslife_cms_auth_user', JSON.stringify(safeUser))
        return { success: true, user: safeUser }
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
