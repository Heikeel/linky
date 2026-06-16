'use client'

const ANIMS = [
  { id: 'bounce', label: 'Rebote',   icon: 'ti-bounce-right' },
  { id: 'pulse',  label: 'Pulso',    icon: 'ti-activity-heartbeat' },
  { id: 'shake',  label: 'Vibrar',   icon: 'ti-ripple' },
  { id: 'slide',  label: 'Deslizar', icon: 'ti-arrow-right' },
  { id: 'fade',   label: 'Fade',     icon: 'ti-eye' },
  { id: 'zoom',   label: 'Zoom',     icon: 'ti-zoom-in' },
  { id: 'none',   label: 'Ninguno',  icon: 'ti-ban' },
]

export default function MotionTab({ data, onChange }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Animación al pasar el cursor</p>
        <div className="grid grid-cols-3 gap-2">
          {ANIMS.map(a => (
            <button
              key={a.id}
              onClick={() => onChange({ animation: a.id })}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                data.animation === a.id
                  ? 'border-purple-400 bg-purple-50 text-purple-600'
                  : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
              }`}
            >
              <i className={`ti ${a.icon} text-xl`} aria-hidden="true"></i>
              <span className="text-xs font-medium">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ajustes</p>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-600">Radio de esquinas</label>
            <span className="text-sm font-semibold text-purple-600">{data.border_radius ?? 12}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={28}
            step={1}
            value={data.border_radius ?? 12}
            onChange={e => onChange({ border_radius: Number(e.target.value) })}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-300 mt-1">
            <span>Cuadrado</span>
            <span>Redondeado</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-600">Espacio entre links</label>
            <span className="text-sm font-semibold text-purple-600">{data.link_gap ?? 9}px</span>
          </div>
          <input
            type="range"
            min={4}
            max={20}
            step={1}
            value={data.link_gap ?? 9}
            onChange={e => onChange({ link_gap: Number(e.target.value) })}
            className="w-full accent-purple-500"
          />
        </div>
      </div>
    </div>
  )
}
