'use client'

import { safeIconColor } from '@/lib/colorUtils'

export default function PhonePreview({ profile, links }) {
  const theme     = profile.theme || 'light'
  const accent    = profile.accent     || '#6c63ff'
  const bg        = profile.bg         || '#f4f3ff'
  const card      = profile.card       || '#ffffff'
  const textColor = profile.text_color || '#1a1a2e'
  const muted     = profile.muted      || '#888888'
  const anim      = profile.animation  || 'bounce'
  const radius    = profile.border_radius ?? 12
  const gap       = profile.link_gap   ?? 9

  const name     = profile.name || 'Tu nombre'
  const username = profile.username || ''
  const bio      = profile.bio || ''

  function Avatar({ size = 16, border = 'rgba(255,255,255,0.4)' }) {
    if (profile.avatar_url) {
      return (
        <img
          src={profile.avatar_url}
          alt="Avatar"
          className={`w-${size} h-${size} rounded-full object-cover mx-auto mb-3 border-2`}
          style={{ borderColor: border, width: size * 4, height: size * 4 }}
        />
      )
    }
    return (
      <div
        className="rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3 border-2"
        style={{ background: accent, borderColor: border, width: size * 4, height: size * 4, fontSize: size * 1.5 }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    )
  }

  function Links() {
    if (links.length === 0) {
      return <div className="text-center py-6 text-xs" style={{ color: muted }}>Añade links desde &quot;Links&quot;</div>
    }
    return (
      <div className="flex flex-col" style={{ gap }}>
        {links.map(link => (
          <div
            key={link.id}
            className={`flex items-center gap-2.5 px-3 py-2.5 border anim-${anim}`}
            style={{ background: card, borderRadius: radius, borderColor: 'rgba(0,0,0,0.04)', borderWidth: 1 }}
          >
            <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: link.color }} aria-hidden="true"></i>
            <span className="text-xs font-semibold flex-1" style={{ color: textColor }}>{link.name}</span>
            <i className="ti ti-chevron-right text-xs" style={{ color: '#ccc' }} aria-hidden="true"></i>
          </div>
        ))}
      </div>
    )
  }

  function renderContent() {
    if (theme === 'dark') {
      const darkBg   = profile.bg   || '#111111'
      const darkCard = profile.card || '#222222'
      const darkText = profile.text_color || '#eeeeee'
      const darkMuted = profile.muted || '#aaaaaa'
      return (
        <div className="p-4 pb-6" style={{ background: darkBg, minHeight: 520 }}>
          <div className="text-center mb-5">
            <Avatar size={16} border="rgba(255,255,255,0.15)" />
            <p className="text-sm font-bold" style={{ color: darkText }}>{name}</p>
            {username && <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>@{username}</p>}
            {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: darkMuted }}>{bio}</p>}
          </div>
          <div className="flex flex-col" style={{ gap }}>
            {links.length === 0
              ? <div className="text-center py-6 text-xs" style={{ color: darkMuted }}>Añade links desde &quot;Links&quot;</div>
              : links.map(link => (
                <div key={link.id} className={`flex items-center gap-2.5 px-3 py-2.5 anim-${anim}`}
                  style={{ background: darkCard, borderRadius: radius, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: safeIconColor(link.color, darkBg) }} aria-hidden="true"></i>
                  <span className="text-xs font-semibold flex-1" style={{ color: darkText }}>{link.name}</span>
                  <i className="ti ti-chevron-right text-xs" style={{ color: '#555' }} aria-hidden="true"></i>
                </div>
              ))
            }
          </div>
        </div>
      )
    }

    if (theme === 'gradient') {
      return (
        <div style={{ background: bg, minHeight: 520 }}>
          <div className="p-4 pb-5 text-center" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}>
            <Avatar size={16} border="rgba(255,255,255,0.5)" />
            <p className="text-sm font-bold text-white">{name}</p>
            {username && <p className="text-xs font-semibold mt-0.5 text-white/70">@{username}</p>}
            {bio && <p className="text-xs mt-1.5 leading-relaxed px-2 text-white/80">{bio}</p>}
          </div>
          <div className="p-4">
            <Links />
          </div>
        </div>
      )
    }

    if (theme === 'tornasol') {
      return (
        <div style={{ background: 'linear-gradient(135deg, #0a0a1a, #1a0a2e)', minHeight: 520 }}>
          <div className="pt-8 pb-5 text-center">
            <div className="mx-auto mb-3 rounded-full flex items-center justify-center"
              style={{
                width: 64, height: 64,
                background: 'linear-gradient(135deg, #a78bfa, #ec4899, #06b6d4)',
                padding: 2,
              }}>
              {profile.avatar_url
                ? <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                : <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ background: '#1a0a2e' }}>
                    {name.charAt(0).toUpperCase()}
                  </div>
              }
            </div>
            <p className="text-sm font-bold" style={{ color: '#e8d5ff' }}>{name}</p>
            {username && <p className="text-xs font-semibold mt-0.5" style={{ color: '#a78bfa' }}>@{username}</p>}
            {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: '#9d8fbe' }}>{bio}</p>}
          </div>
          <div className="p-4 flex flex-col" style={{ gap }}>
            {links.length === 0
              ? <div className="text-center py-6 text-xs" style={{ color: '#9d8fbe' }}>Añade links desde &quot;Links&quot;</div>
              : links.map(link => (
                <div key={link.id} className={`flex items-center gap-2.5 px-3 py-2.5 anim-${anim}`}
                  style={{ background: 'rgba(167,139,250,0.12)', borderRadius: radius, border: '1px solid rgba(167,139,250,0.25)' }}>
                  <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: safeIconColor(link.color, '#0a0a1a') }} aria-hidden="true"></i>
                  <span className="text-xs font-semibold flex-1" style={{ color: '#e8d5ff' }}>{link.name}</span>
                  <i className="ti ti-chevron-right text-xs" style={{ color: '#6b5a8a' }} aria-hidden="true"></i>
                </div>
              ))
            }
          </div>
        </div>
      )
    }

    // light (default)
    return (
      <div className="p-4 pb-6" style={{ background: bg, minHeight: 520 }}>
        <div className="text-center mb-5">
          <Avatar size={16} border="rgba(255,255,255,0.4)" />
          <p className="text-sm font-bold" style={{ color: textColor }}>{name}</p>
          {username && <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>@{username}</p>}
          {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: muted }}>{bio}</p>}
        </div>
        <Links />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 rounded-[44px] p-3 shadow-2xl" style={{ background: '#1a1a2e' }}>
        <div className="rounded-[34px] overflow-hidden">
          <div className="h-7 flex items-center justify-center" style={{ background: '#1a1a2e' }}>
            <div className="w-20 h-2.5 rounded-full bg-gray-700"></div>
          </div>
          {renderContent()}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3 font-medium">Vista previa en tiempo real</p>
    </div>
  )
}
