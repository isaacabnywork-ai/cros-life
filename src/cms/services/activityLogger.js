import { supabase, isSupabaseConfigured } from './supabaseClient.js'

const STORAGE_KEY = 'crosslife_cms_activity_logs'
let memoryLogs = []

export function getLocalActivityLogs() {
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      return JSON.parse(raw)
    }
  } catch {}
  return memoryLogs
}

export function saveLocalActivityLog(log) {
  try {
    const logs = getLocalActivityLogs()
    const updated = [log, ...logs].slice(0, 100) // keep last 100
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    memoryLogs = updated
  } catch (err) {
    console.error('Failed to save activity log:', err)
  }
}

export async function logActivity(action, entityType, entityTitle, user = null) {
  const log = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    user_name: user?.name || 'Administrator',
    user_role: user?.role || 'admin',
    action,
    entity_type: entityType,
    entity_title: entityTitle,
    created_at: new Date().toISOString(),
  }

  saveLocalActivityLog(log)

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('activity_logs').insert([log])
    } catch (err) {
      console.warn('Could not sync activity log to Supabase:', err)
    }
  }

  return log
}
