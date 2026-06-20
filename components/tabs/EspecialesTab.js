'use client'

const ESPECIALES = [
  { id: 'stars', label: 'Stars ✦', desc: 'Cielo estrellado · noche real' },
]

export default function EspecialesTab({ data, onChange }) {
  const theme = data.theme || 'light'

  function selectTheme(id) {
    onChange({ theme: id })
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Fondos especiales</p>
        <div className="flex flex-col gap-2">
          {ESPECIALES.map(t => (
            <button
              key={t.id}
              onClick={() => selectTheme(t.id)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all text-left ${
                theme === t.id
                  ? 'border-purple-400 bg-purple-50'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div>
                <p className={`text-sm font-semibold ${theme === t.id ? 'text-purple-700' : 'text-gray-700'}`}>{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
              {theme === t.id && <i className="ti ti-check text-purple-500 text-base" aria-hidden="true"></i>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
