'use client'

import { useState } from 'react'
import NetworkModal from '@/components/NetworkModal'

export default function LinksTab({ links, onLinksChange }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customUrl, setCustomUrl] = useState('')
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [dragIdx, setDragIdx] = useState(null)

  function addNetwork(net) {
    if (links.find(l => l.network_id === net.id)) return
    onLinksChange([...links, {
      id: `tmp_${Date.now()}`,
      network_id: net.id,
      name: net.name,
      icon: net.icon,
      color: net.color,
      url: '',
      order_index: links.length,
      active: true,
    }])
  }

  function removeLink(id) {
    onLinksChange(links.filter(l => l.id !== id))
  }

  function updateUrl(id, url) {
    onLinksChange(links.map(l => l.id === id ? { ...l, url } : l))
  }

  function addCustomLink() {
    if (!customName.trim()) return
    onLinksChange([...links, {
      id: `tmp_${Date.now()}`,
      network_id: 'custom',
      name: customName.trim(),
      icon: 'ti-link',
      color: '#6c63ff',
      url: customUrl.trim(),
      order_index: links.length,
      active: true,
    }])
    setCustomName('')
    setCustomUrl('')
    setShowCustomForm(false)
  }

  function onDragStart(idx) { setDragIdx(idx) }
  function onDragOver(e, idx) {
    e.preventDefault()
    if (dragIdx === null || dragIdx === idx) return
    const reordered = [...links]
    const [moved] = reordered.splice(dragIdx, 1)
    reordered.splice(idx, 0, moved)
    onLinksChange(reordered)
    setDragIdx(idx)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-gray-400">Arrastra para reordenar · Escribe la URL de cada red</p>

      {links.map((link, idx) => (
        <div
          key={link.id}
          draggable
          onDragStart={() => onDragStart(idx)}
          onDragOver={e => onDragOver(e, idx)}
          onDragEnd={() => setDragIdx(null)}
          className="flex items-center gap-2.5 p-2.5 border border-gray-200 rounded-xl bg-gray-50 cursor-grab active:cursor-grabbing"
        >
          <i className="ti ti-grip-vertical text-gray-300 text-base flex-shrink-0" aria-hidden="true"></i>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: link.color + '22', color: link.color }}>
            <i className={`ti ${link.icon} text-base`} aria-hidden="true"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-700">{link.name}</p>
            <input
              type="url"
              value={link.url || ''}
              onChange={e => updateUrl(link.id, e.target.value)}
              placeholder="https://..."
              onClick={e => e.stopPropagation()}
              className="w-full text-xs text-gray-400 bg-transparent outline-none placeholder:text-gray-300 mt-0.5"
            />
          </div>
          <button onClick={() => removeLink(link.id)} className="p-1 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors flex-shrink-0">
            <i className="ti ti-x text-sm" aria-hidden="true"></i>
          </button>
        </div>
      ))}

      {showCustomForm && (
        <div className="border border-gray-200 rounded-xl p-3 bg-gray-50">
          <p className="text-xs font-semibold text-gray-600 mb-2">Link personalizado</p>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              placeholder="Nombre (ej: Mi Blog)"
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-purple-400 bg-white"
            />
            <input
              type="url"
              value={customUrl}
              onChange={e => setCustomUrl(e.target.value)}
              placeholder="https://..."
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-purple-400 bg-white"
            />
            <div className="flex gap-2">
              <button onClick={addCustomLink} className="px-4 py-1.5 rounded-lg text-white text-xs font-semibold" style={{ background: '#6c63ff' }}>
                Añadir
              </button>
              <button onClick={() => setShowCustomForm(false)} className="px-4 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-100">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setModalOpen(true)}
        className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm font-semibold hover:border-purple-400 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
        style={{ color: '#6c63ff' }}
      >
        <i className="ti ti-plus" aria-hidden="true"></i> Añadir red social
      </button>

      <button
        onClick={() => setShowCustomForm(true)}
        className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm font-semibold text-gray-400 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <i className="ti ti-link" aria-hidden="true"></i> Añadir link personalizado
      </button>

      <NetworkModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addNetwork}
        activeIds={links.map(l => l.network_id)}
      />
    </div>
  )
}
