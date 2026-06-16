'use client'

import { useRef } from 'react'

export default function ProfileTab({ data, onChange, userId }) {
  const fileRef = useRef()

  function handlePhoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 20 * 1024 * 1024) { alert('La foto debe ser menor a 20MB'); return }
    const reader = new FileReader()
    reader.onload = ev => onChange({ avatar_url: ev.target.result })
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div
          className="relative w-20 h-20 rounded-full cursor-pointer flex-shrink-0 overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          {data.avatar_url ? (
            <img src={data.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: data.accent || '#6c63ff' }}>
              {(data.name || '?').charAt(0).toUpperCase()}
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <i className="ti ti-camera text-white text-lg" aria-hidden="true"></i>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Foto de perfil</p>
          <p className="text-xs text-gray-400 mt-1">Haz clic en el avatar para subir tu foto</p>
          <p className="text-xs text-gray-400">JPG, PNG — máx. 20MB</p>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nombre</label>
        <input
          type="text"
          value={data.name || ''}
          onChange={e => onChange({ name: e.target.value })}
          placeholder="Tu nombre o marca"
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 bg-gray-50 focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Usuario</label>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50">
          <span className="text-sm text-gray-400">linkpage.com/</span>
          <span className="text-sm font-semibold text-gray-700">{data.username}</span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descripción</label>
        <textarea
          value={data.bio || ''}
          onChange={e => onChange({ bio: e.target.value })}
          placeholder="Cuéntale algo a tu audiencia..."
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 bg-gray-50 focus:bg-white transition-colors resize-none"
        />
      </div>
    </div>
  )
}
