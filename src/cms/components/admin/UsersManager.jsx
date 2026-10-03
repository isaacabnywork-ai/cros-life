import React, { useState } from 'react'
import { Users, Shield, Plus, Trash2, Check } from 'lucide-react'
import { useCmsAuth } from '../../context/CmsAuthContext'
import { CmsInput, CmsSelect, CmsButton } from '../ui/CmsFormControls'
import * as cmsStore from '../../services/cmsStore'

export function UsersManager() {
  const { currentUser, switchUser } = useCmsAuth()
  const [users, setUsers] = useState(() => cmsStore.getUsers())
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('editor')
  const [notice, setNotice] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
    }

    await cmsStore.saveUser(newUser, currentUser)
    setUsers(cmsStore.getUsers())
    setModalOpen(false)
    setName('')
    setEmail('')
    setNotice('User account created.')
    setTimeout(() => setNotice(''), 3000)
  }

  const handleDelete = async (id, userName) => {
    if (users.length <= 1) {
      alert('Cannot delete the last remaining user account.')
      return
    }
    if (window.confirm(`Delete user account "${userName}"?`)) {
      await cmsStore.deleteUser(id, currentUser)
      setUsers(cmsStore.getUsers())
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-blue" />
            <span>Users & Access Control</span>
          </h1>
          <p className="text-xs text-slate-500">
            Manage administrator and editor permissions, roles, and user accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Role Switcher Toolbar for convenient testing */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-brand-navy">
          <Shield className="w-4 h-4 text-brand-blue shrink-0" />
          <span>
            Current Active Session: <strong>{currentUser?.name}</strong> (Role:{' '}
            <strong className="uppercase">{currentUser?.role}</strong>)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500">Switch Role Simulation:</span>
          <button
            type="button"
            onClick={() => switchUser('super_admin')}
            className={`px-2 py-1 rounded font-semibold text-[10px] uppercase ${
              currentUser?.role === 'super_admin' ? 'bg-brand-navy text-white' : 'bg-white text-slate-700 border'
            }`}
          >
            Super Admin
          </button>
          <button
            type="button"
            onClick={() => switchUser('admin')}
            className={`px-2 py-1 rounded font-semibold text-[10px] uppercase ${
              currentUser?.role === 'admin' ? 'bg-brand-navy text-white' : 'bg-white text-slate-700 border'
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => switchUser('editor')}
            className={`px-2 py-1 rounded font-semibold text-[10px] uppercase ${
              currentUser?.role === 'editor' ? 'bg-brand-navy text-white' : 'bg-white text-slate-700 border'
            }`}
          >
            Editor
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{notice}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={u.avatar} alt="" className="w-7 h-7 rounded-full bg-slate-200" />
                    <span className="font-semibold text-slate-900">{u.name}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{u.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        u.role === 'super_admin'
                          ? 'bg-purple-100 text-purple-800'
                          : u.role === 'admin'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      disabled={u.id === currentUser?.id}
                      onClick={() => handleDelete(u.id, u.name)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 disabled:opacity-30"
                      title="Delete User"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-panel shadow-panel border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">Add New User</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <CmsInput
                label="Full Name"
                value={name}
                onChange={setName}
                placeholder="e.g. John Doe"
                required
              />

              <CmsInput
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="john@crosslife.in"
                required
              />

              <CmsSelect
                label="Assigned Role"
                value={role}
                options={[
                  { label: 'Super Admin (Full Access)', value: 'super_admin' },
                  { label: 'Admin (Website Management)', value: 'admin' },
                  { label: 'Editor (Content Only)', value: 'editor' },
                ]}
                onChange={setRole}
              />

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <CmsButton variant="primary" type="submit">
                  Create User
                </CmsButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
