import React from 'react'

export function CmsInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  description,
  error,
  required = false,
  className = '',
  rows,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 7)}`

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={inputId}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 3}
          className="w-full text-xs rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors disabled:bg-slate-50"
          {...props}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          value={value ?? ''}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          placeholder={placeholder}
          className="w-full text-xs rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors disabled:bg-slate-50"
          {...props}
        />
      )}

      {description && <p className="text-[11px] text-slate-500">{description}</p>}
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  )
}

export function CmsSelect({
  label,
  id,
  value,
  onChange,
  options = [],
  description,
  error,
  required = false,
  className = '',
  ...props
}) {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 7)}`

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <select
        id={selectId}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs rounded-md border border-slate-300 px-3 py-2 text-slate-900 bg-white focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors"
        {...props}
      >
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt
          const lbl = typeof opt === 'object' ? opt.label : opt
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          )
        })}
      </select>

      {description && <p className="text-[11px] text-slate-500">{description}</p>}
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  )
}

export function CmsToggle({ label, checked, onChange, description, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-3 ${className}`}>
      <div className="space-y-0.5">
        <span className="text-xs font-semibold text-slate-700 block">{label}</span>
        {description && <p className="text-[11px] text-slate-500">{description}</p>}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 ${
          checked ? 'bg-brand-blue' : 'bg-slate-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

export function CmsButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-brand-navy hover:bg-brand-blue text-white focus:ring-brand-navy',
    amber: 'bg-brand-amber hover:bg-brand-amber-hover text-brand-navy focus:ring-brand-amber',
    outline: 'border border-slate-300 hover:bg-slate-100 text-slate-700 focus:ring-slate-400 bg-white',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
    subtle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  }

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-xs px-4 py-2 gap-2',
    lg: 'text-sm px-5 py-2.5 gap-2.5',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
