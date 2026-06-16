'use client'

import { useState } from 'react'
import { NETWORKS, CATEGORIES } from '@/lib/networks'

export default function NetworkModal({ open, onClose, onAdd, activeIds = [] }) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Todos')

  if (!open) return null

  const filtered = NETWORKS.filter(n => {
    const matchCat = cat === 'Todos' || n.cat === cat
    const matchSearch = !search || n.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  function handleAdd(net) {
    onAdd(net)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="text-lg font-bold text-gray-800">Seleccionar red social</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <i className="ti ti-x text-sm" aria-hidden="true"></i>
          </button>
        </div>

        <div className="p-4 pb-0">
          <div className="relative">
            <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" aria-hidden="true"></i>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar red social..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 bg-gray-50"
              autoFocus
            />
          </div>
        </div>

        <div className="flex gap-2 px-4 py-3 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                cat === c ? 'text-white border-transparent' : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
              style={cat === c ? { background: '#6c63ff', borderColor: '#6c63ff' } : {}}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-4 overflow-y-auto">
          {filtered.map(net => {
            const added = activeIds.includes(net.id)
            return (
              <button
                key={net.id}
                onClick={() => !added && handleAdd(net)}
                className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                  added
                    ? 'border-purple-200 bg-purple-50 opacity-60 cursor-default'
                    : 'border-gray-200 bg-gray-50 hover:border-purple-400 hover:bg-purple-50 hover:-translate-y-0.5'
                }`}
              >
                {added && (
                  <span className="absolute top-1.5 right-1.5 text-purple-500 text-xs">✓</span>
                )}
                <i className={`ti ${net.icon} text-2xl`} style={{ color: net.color }} aria-hidden="true"></i>
                <span className="text-xs font-medium text-gray-700 leading-tight">{net.name}</span>
                <span className="text-[10px] text-gray-400">{net.cat}</span>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="col-span-5 text-center py-10 text-gray-400 text-sm">
              No se encontraron redes para &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
