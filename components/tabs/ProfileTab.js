'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

function CropModal({ src, onConfirm, onCancel }) {
  const canvasRef = useRef()
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const imgRef = useRef(null)
  const SIZE = 280

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      imgRef.current = img
      const fit = Math.max(SIZE / img.width, SIZE / img.height)
      setScale(fit)
      setOffset({ x: 0, y: 0 })
    }
    img.src = src
  }, [src])

  function clampOffset(ox, oy, sc) {
    const img = imgRef.current
    if (!img) return { x: ox, y: oy }
    const maxX = Math.max(0, (img.width * sc - SIZE) / 2)
    const maxY = Math.max(0, (img.height * sc - SIZE) / 2)
    return {
      x: Math.max(-maxX, Math.min(maxX, ox)),
      y: Math.max(-maxY, Math.min(maxY, oy)),
    }
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !imgRef.current) return
    const ctx = canvas.getContext('2d')
    const img = imgRef.current
    ctx.clearRect(0, 0, SIZE, SIZE)
    const w = img.width * scale
    const h = img.height * scale
    const x = SIZE / 2 - w / 2 + offset.x
    const y = SIZE / 2 - h / 2 + offset.y
    ctx.drawImage(img, x, y, w, h)
    // square border
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, SIZE - 2, SIZE - 2)
  }, [scale, offset])

  useEffect(() => { draw() }, [draw])

  function onMouseDown(e) {
    setDragging(true)
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
  }
  function onMouseMove(e) {
    if (!dragging) return
    const raw = { x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y }
    setOffset(clampOffset(raw.x, raw.y, scale))
  }
  function onMouseUp() { setDragging(false) }

  function onTouchStart(e) {
    const t = e.touches[0]
    setDragging(true)
    dragStart.current = { x: t.clientX - offset.x, y: t.clientY - offset.y }
  }
  function onTouchMove(e) {
    if (!dragging) return
    const t = e.touches[0]
    const raw = { x: t.clientX - dragStart.current.x, y: t.clientY - dragStart.current.y }
    setOffset(clampOffset(raw.x, raw.y, scale))
  }

  function onWheel(e) {
    e.preventDefault()
    setScale(s => {
      const next = Math.min(5, Math.max(0.2, s - e.deltaY * 0.001))
      setOffset(prev => clampOffset(prev.x, prev.y, next))
      return next
    })
  }

  function confirm() {
    const OUT = 1200
    const canvas = document.createElement('canvas')
    canvas.width = OUT
    canvas.height = OUT
    const ctx = canvas.getContext('2d')
    const img = imgRef.current
    const ratio = OUT / SIZE
    const w = img.width * scale * ratio
    const h = img.height * scale * ratio
    const x = OUT / 2 - w / 2 + offset.x * ratio
    const y = OUT / 2 - h / 2 + offset.y * ratio
    ctx.drawImage(img, x, y, w, h)
    onConfirm(canvas.toDataURL('image/jpeg', 0.9))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl w-80">
        <p className="text-sm font-semibold text-gray-700">Ajusta tu foto</p>
        <p className="text-xs text-gray-400 -mt-2">Arrastra para mover · Scroll para zoom</p>
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="rounded-lg cursor-grab active:cursor-grabbing"
          style={{ userSelect: 'none' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
          onWheel={onWheel}
        />
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400">−</span>
          <input
            type="range" min={0.1} max={5} step={0.01}
            value={scale}
            onChange={e => setScale(parseFloat(e.target.value))}
            className="flex-1 accent-purple-500"
          />
          <span className="text-xs text-gray-400">+</span>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={confirm}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#6c63ff' }}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProfileTab({ data, onChange, userId }) {
  const fileRef = useRef()
  const [cropSrc, setCropSrc] = useState(null)
  const [uploading, setUploading] = useState(false)

  function handlePhoto(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      alert('Solo se permiten imágenes JPG, PNG, WEBP o GIF'); return
    }
    if (file.size > 20 * 1024 * 1024) { alert('La foto debe ser menor a 20MB'); return }
    const reader = new FileReader()
    reader.onload = ev => setCropSrc(ev.target.result)
    reader.readAsDataURL(file)
  }

  async function handleCropConfirm(dataUrl) {
    setCropSrc(null)
    setUploading(true)
    try {
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      const supabase = createClient()
      const path = `${userId}/avatar.jpg`
      const { error } = await supabase.storage.from('avatars').upload(path, blob, {
        contentType: 'image/jpeg',
        upsert: true,
      })
      if (error) throw error
      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path)
      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`
      onChange({ avatar_url: publicUrl })
    } catch (err) {
      alert('Error al subir la foto: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {cropSrc && (
        <CropModal
          src={cropSrc}
          onConfirm={handleCropConfirm}
          onCancel={() => setCropSrc(null)}
        />
      )}

      <div className="flex items-center gap-4">
        <div
          className="relative w-20 h-20 rounded-full cursor-pointer flex-shrink-0 overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-colors"
          onClick={() => !uploading && fileRef.current?.click()}
        >
          {data.avatar_url ? (
            <img src={data.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: data.accent || '#6c63ff' }}>
              {(data.name || '?').charAt(0).toUpperCase()}
            </div>
          )}
          {uploading ? (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <i className="ti ti-camera text-white text-lg" aria-hidden="true"></i>
            </div>
          )}
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
          <span className="text-sm text-gray-400">linky.com/</span>
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
