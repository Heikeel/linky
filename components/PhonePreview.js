'use client'

export default function PhonePreview({ profile, links }) {
  const accent     = profile.accent     || '#6c63ff'
  const bg         = profile.bg         || '#f4f3ff'
  const card       = profile.card       || '#ffffff'
  const textColor  = profile.text_color || '#1a1a2e'
  const muted      = profile.muted      || '#888888'
  const anim       = profile.animation  || 'bounce'
  const radius     = profile.border_radius ?? 12
  const gap        = profile.link_gap   ?? 9

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 rounded-[44px] p-3 shadow-2xl" style={{ background: '#1a1a2e' }}>
        <div className="rounded-[34px] overflow-hidden" style={{ background: bg, minHeight: 520 }}>
          <div className="h-7 flex items-center justify-center" style={{ background: '#1a1a2e' }}>
            <div className="w-20 h-2.5 rounded-full bg-gray-700"></div>
          </div>
          <div className="p-4 pb-6 overflow-y-auto" style={{ maxHeight: 540 }}>
            <div className="text-center mb-5">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2"
                  style={{ borderColor: 'rgba(255,255,255,0.4)' }}
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 border-2"
                  style={{ background: accent, borderColor: 'rgba(255,255,255,0.4)' }}
                >
                  {(profile.name || '?').charAt(0).toUpperCase()}
                </div>
              )}
              <p className="text-sm font-bold" style={{ color: textColor }}>{profile.name || 'Tu nombre'}</p>
              {profile.username && (
                <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>@{profile.username}</p>
              )}
              {profile.bio && (
                <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: muted }}>{profile.bio}</p>
              )}
            </div>

            <div className="flex flex-col" style={{ gap }}>
              {links.map(link => (
                <div
                  key={link.id}
                  className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer border anim-${anim}`}
                  style={{
                    background: card,
                    borderRadius: radius,
                    borderColor: 'rgba(0,0,0,0.04)',
                    borderWidth: 1,
                  }}
                >
                  <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: link.color }} aria-hidden="true"></i>
                  <span className="text-xs font-semibold flex-1" style={{ color: textColor }}>{link.name}</span>
                  <i className="ti ti-chevron-right text-xs" style={{ color: '#ccc' }} aria-hidden="true"></i>
                </div>
              ))}
              {links.length === 0 && (
                <div className="text-center py-6 text-xs" style={{ color: muted }}>
                  Añade links desde la pestaña &quot;Links&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3 font-medium">Vista previa en tiempo real</p>
    </div>
  )
}
