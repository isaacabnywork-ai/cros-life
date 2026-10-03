import React, { useState, useEffect } from 'react'
import { Activity, Search, RefreshCw, UserCheck } from 'lucide-react'
import * as activityService from '../../services/activityLogger'

export function ActivityLog() {
  const [logs, setLogs] = useState([])
  const [search, setSearch] = useState('')

  const loadLogs = () => {
    setLogs(activityService.getLocalActivityLogs())
  }

  useEffect(() => {
    loadLogs()
  }, [])

  const filteredLogs = logs.filter((log) => {
    const q = search.toLowerCase()
    return (
      log.action.toLowerCase().includes(q) ||
      log.user_name.toLowerCase().includes(q) ||
      log.entity_title.toLowerCase().includes(q) ||
      log.entity_type.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-brand-blue" />
            <span>Activity Log</span>
          </h1>
          <p className="text-xs text-slate-500">
            Real-time audit trail of all content updates, section edits, and administrative actions.
          </p>
        </div>

        <button
          type="button"
          onClick={loadLogs}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-xs font-semibold text-slate-700 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter activity by user, action, or content..."
          className="w-full text-xs border-0 focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100 text-xs">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-ice text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{log.action}</p>
                  <p className="text-[11px] text-slate-500">
                    Target: <strong className="text-slate-700">{log.entity_title}</strong> (
                    {log.entity_type})
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] text-slate-600 font-medium block">
                  {log.user_name} ({log.user_role})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              No activity records match your filter.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
