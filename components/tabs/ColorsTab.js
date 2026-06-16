'use client'

import { PALETTES } from '@/lib/networks'

export default function ColorsTab({ data, onChange }) {
  function applyPalette(p) {
    onChange({ accent: p.accent, bg: p.bg, card: p.card, text_color: p.textColor, muted: p.muted })
  }

  const fields = [
    { key: 'accent',     label: 'Acento' },
    { key: 'bg',         label: 'Fondo' },
    { key: 'card',       label: 'Tarjetas' },
    { key: 'text_color', label: 'Texto' },
    { key: 'muted',      label: 'Texto muted' },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Paletas rápidas</p>
        <div className="flex gap-2 flex-wrap">
          {PALETTES.map(p => (
            <button
              key={p.name}
              onClick={() => applyPalette(p)}
              title={p.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform ring-1 ring-gray-200"
              style={{ background: p.accent }}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Personalizar</p>
        <div className="flex flex-col gap-2">
          {fields.map(f => (
            <div key={f.key} className="flex items-center justify-between px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50">
              <span className="text-sm text-gray-600">{f.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono">{data[f.key] || '#000000'}</span>
                <input
                  type="color"
                  value={data[f.key] || '#000000'}
                  onChange={e => onChange({ [f.key]: e.target.value })}
                  className="w-9 h-7 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
