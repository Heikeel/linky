'use client'

import { safeIconColor } from '@/lib/colorUtils'
import AnimatedBg from '@/components/AnimatedBg'

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
  const iconOverride = profile.icon_color || null

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
            <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: iconOverride || link.color }} aria-hidden="true"></i>
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
        <div className="p-4 pb-6 relative overflow-hidden" style={{ background: darkBg, minHeight: 520 }}>
          <AnimatedBg motion={profile.bg_motion} accent={accent} dark={true} />
          <div className="text-center mb-5 relative z-10">
            <Avatar size={16} border="rgba(255,255,255,0.15)" />
            <p className="text-sm font-bold" style={{ color: darkText }}>{name}</p>
            {username && <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>@{username}</p>}
            {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: darkMuted }}>{bio}</p>}
          </div>
          <div className="flex flex-col relative z-10" style={{ gap }}>
            {links.length === 0
              ? <div className="text-center py-6 text-xs" style={{ color: darkMuted }}>Añade links desde &quot;Links&quot;</div>
              : links.map(link => (
                <div key={link.id} className={`flex items-center gap-2.5 px-3 py-2.5 anim-${anim}`}
                  style={{ background: darkCard, borderRadius: radius, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: iconOverride || safeIconColor(link.color, darkBg) }} aria-hidden="true"></i>
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
        <div className="relative overflow-hidden" style={{ background: bg, minHeight: 520 }}>
          <AnimatedBg motion={profile.bg_motion} accent={accent} dark={false} />
          <div className="p-4 pb-5 text-center relative z-10" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}>
            <Avatar size={16} border="rgba(255,255,255,0.5)" />
            <p className="text-sm font-bold text-white">{name}</p>
            {username && <p className="text-xs font-semibold mt-0.5 text-white/70">@{username}</p>}
            {bio && <p className="text-xs mt-1.5 leading-relaxed px-2 text-white/80">{bio}</p>}
          </div>
          <div className="p-4 relative z-10">
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
                  <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: iconOverride || safeIconColor(link.color, '#0a0a1a') }} aria-hidden="true"></i>
                  <span className="text-xs font-semibold flex-1" style={{ color: '#e8d5ff' }}>{link.name}</span>
                  <i className="ti ti-chevron-right text-xs" style={{ color: '#6b5a8a' }} aria-hidden="true"></i>
                </div>
              ))
            }
          </div>
        </div>
      )
    }

    if (theme === 'cosmos') {
      const starBg = `radial-gradient(1px 1px at 20px 30px, #fff, transparent),
                      radial-gradient(1px 1px at 80px 90px, #fff, transparent),
                      radial-gradient(1px 1px at 130px 50px, #fff, transparent),
                      radial-gradient(2px 2px at 50px 160px, #fff, transparent),
                      radial-gradient(1px 1px at 160px 200px, #fff, transparent),
                      radial-gradient(1px 1px at 30px 250px, #fff, transparent),
                      radial-gradient(2px 2px at 190px 320px, #fff, transparent),
                      radial-gradient(1px 1px at 100px 400px, #fff, transparent),
                      radial-gradient(1px 1px at 210px 460px, #fff, transparent)`
      return (
        <div className="relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 20% 20%, #1a0b3e 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, #0d1b4b 0%, transparent 50%), #05060f', minHeight: 520 }}>
          <div className="absolute inset-0" style={{ background: starBg, opacity: 0.8 }}></div>
          <div className="relative z-10 p-4 pb-6">
            <div className="text-center mb-5">
              <Avatar size={16} border="rgba(167,139,250,0.5)" />
              <p className="text-sm font-bold" style={{ color: '#d8c9ff' }}>{name}</p>
              {username && <p className="text-xs font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>@{username}</p>}
              {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{bio}</p>}
            </div>
            <div className="flex flex-col" style={{ gap }}>
              {links.length === 0
                ? <div className="text-center py-6 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Añade links desde &quot;Links&quot;</div>
                : links.map(link => (
                  <div key={link.id} className={`flex items-center gap-2.5 px-3 py-2.5 anim-${anim}`}
                    style={{ background: 'rgba(255,255,255,0.05)', borderRadius: radius, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: iconOverride || safeIconColor(link.color, '#05060f') }} aria-hidden="true"></i>
                    <span className="text-xs font-semibold flex-1" style={{ color: 'rgba(255,255,255,0.9)' }}>{link.name}</span>
                    <i className="ti ti-chevron-right text-xs" style={{ color: 'rgba(255,255,255,0.3)' }} aria-hidden="true"></i>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    }

    if (theme === 'cometas') {
      const starBg = `radial-gradient(1px 1px at 25px 40px, #fff, transparent),
                      radial-gradient(1px 1px at 90px 110px, #fff, transparent),
                      radial-gradient(2px 2px at 150px 70px, #fff, transparent),
                      radial-gradient(1px 1px at 60px 180px, #fff, transparent),
                      radial-gradient(1px 1px at 200px 230px, #fff, transparent),
                      radial-gradient(2px 2px at 40px 300px, #fff, transparent),
                      radial-gradient(1px 1px at 170px 370px, #fff, transparent),
                      radial-gradient(1px 1px at 110px 440px, #fff, transparent)`
      return (
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg,#080b1a 0%,#0d1330 50%,#10183d 100%)', minHeight: 520 }}>
          <div className="absolute inset-0" style={{ background: starBg, opacity: 0.85 }}></div>
          <div className="absolute" style={{ top: 60, right: 30, width: 70, height: 2, background: 'linear-gradient(90deg,#fff,transparent)', transform: 'rotate(-35deg)', filter: 'drop-shadow(0 0 4px #9bd3ff)' }}></div>
          <div className="absolute" style={{ top: 200, right: 120, width: 50, height: 2, background: 'linear-gradient(90deg,#fff,transparent)', transform: 'rotate(-35deg)', filter: 'drop-shadow(0 0 4px #9bd3ff)' }}></div>
          <div className="relative z-10 p-4 pb-6">
            <div className="text-center mb-5">
              <Avatar size={16} border="rgba(56,189,248,0.5)" />
              <p className="text-sm font-bold" style={{ color: '#e0f2fe' }}>{name}</p>
              {username && <p className="text-xs font-semibold mt-0.5" style={{ color: '#38bdf8' }}>@{username}</p>}
              {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{bio}</p>}
            </div>
            <div className="flex flex-col" style={{ gap }}>
              {links.length === 0
                ? <div className="text-center py-6 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Añade links desde &quot;Links&quot;</div>
                : links.map(link => (
                  <div key={link.id} className={`flex items-center gap-2.5 px-3 py-2.5 anim-${anim}`}
                    style={{ background: 'rgba(255,255,255,0.05)', borderRadius: radius, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: iconOverride || safeIconColor(link.color, '#080b1a') }} aria-hidden="true"></i>
                    <span className="text-xs font-semibold flex-1" style={{ color: 'rgba(255,255,255,0.9)' }}>{link.name}</span>
                    <i className="ti ti-chevron-right text-xs" style={{ color: 'rgba(255,255,255,0.3)' }} aria-hidden="true"></i>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    }

    if (theme === 'neon') {
      return (
        <div className="relative overflow-hidden" style={{ background: '#070710', minHeight: 520 }}>
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.04) 1px,transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
          <div className="relative z-10 p-4 pb-6">
            <div className="text-center mb-5">
              <Avatar size={16} border="rgba(0,245,255,0.6)" />
              <p className="text-sm font-bold text-white">{name}</p>
              {username && <p className="text-xs font-semibold mt-0.5" style={{ color: '#00f5ff' }}>@{username}</p>}
              {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: 'rgba(0,245,255,0.45)' }}>{bio}</p>}
            </div>
            <div className="flex flex-col" style={{ gap }}>
              {links.length === 0
                ? <div className="text-center py-6 text-xs" style={{ color: 'rgba(0,245,255,0.3)' }}>Añade links desde &quot;Links&quot;</div>
                : links.map(link => (
                  <div key={link.id} className={`flex items-center gap-2.5 px-3 py-2.5 anim-${anim}`}
                    style={{ background: 'rgba(0,245,255,0.04)', borderRadius: radius, border: '1px solid rgba(0,245,255,0.22)', boxShadow: '0 0 8px rgba(0,245,255,0.15)' }}>
                    <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: iconOverride || safeIconColor(link.color, '#070710') }} aria-hidden="true"></i>
                    <span className="text-xs font-semibold flex-1 text-white">{link.name}</span>
                    <i className="ti ti-chevron-right text-xs" style={{ color: 'rgba(0,245,255,0.3)' }} aria-hidden="true"></i>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    }

    if (theme === 'sunset') {
      return (
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#8b1a4a,#c2185b,#e84a0c,#f9a825)', minHeight: 520 }}>
          <div className="absolute" style={{ top: -100, left: '50%', transform: 'translateX(-50%)', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,210,80,0.5) 0%,transparent 65%)', filter: 'blur(20px)' }}></div>
          <div className="absolute" style={{ bottom: 0, left: '-10%', width: '120%', height: 120, background: 'rgba(140,20,40,0.25)', borderRadius: '50% 50% 0 0' }}></div>
          <div className="relative z-10 p-4 pb-6">
            <div className="text-center mb-5">
              <Avatar size={16} border="rgba(255,200,80,0.6)" />
              <p className="text-sm font-bold text-white" style={{ textShadow: '0 2px 12px rgba(255,100,20,0.8)' }}>{name}</p>
              {username && <p className="text-xs font-semibold mt-0.5" style={{ color: 'rgba(255,220,140,0.9)' }}>@{username}</p>}
              {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: 'rgba(255,240,200,0.7)' }}>{bio}</p>}
            </div>
            <div className="flex flex-col" style={{ gap }}>
              {links.length === 0
                ? <div className="text-center py-6 text-xs" style={{ color: 'rgba(255,200,150,0.4)' }}>Añade links desde &quot;Links&quot;</div>
                : links.map(link => (
                  <div key={link.id} className={`flex items-center gap-2.5 px-3 py-2.5 anim-${anim}`}
                    style={{ background: 'rgba(255,255,255,0.14)', borderRadius: radius, border: '1px solid rgba(255,200,150,0.22)', backdropFilter: 'blur(12px)' }}>
                    <i className={`ti ${link.icon} text-lg flex-shrink-0 text-white`} aria-hidden="true"></i>
                    <span className="text-xs font-semibold flex-1 text-white">{link.name}</span>
                    <i className="ti ti-chevron-right text-xs" style={{ color: 'rgba(255,200,150,0.45)' }} aria-hidden="true"></i>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    }

    if (theme === 'vaporwave') {
      return (
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg,#0f0221 0%,#1a0533 50%,#0f0a1e 100%)', minHeight: 520 }}>
          <div className="absolute" style={{ top: 20, left: '50%', transform: 'translateX(-50%)', width: 160, height: 80, overflow: 'hidden', borderRadius: '80px 80px 0 0', background: 'linear-gradient(180deg,#ff71ce,#f9c846,#ff8a00)', boxShadow: '0 0 40px rgba(255,113,206,0.4)' }}>
            <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(transparent,transparent 10px,#0f0221 10px,#0f0221 12px)' }}></div>
          </div>
          <div className="absolute" style={{ bottom: 0, left: 0, right: 0, height: '35%', background: 'repeating-linear-gradient(90deg,rgba(1,205,254,0.12) 0px,rgba(1,205,254,0.12) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(0deg,rgba(1,205,254,0.12) 0px,rgba(1,205,254,0.12) 1px,transparent 1px,transparent 28px)', transform: 'perspective(180px) rotateX(42deg)', transformOrigin: 'bottom center' }}></div>
          <div className="relative z-10 pt-24 px-4 pb-6">
            <div className="text-center mb-5">
              <Avatar size={16} border="rgba(255,113,206,0.6)" />
              <p className="text-sm font-bold" style={{ color: '#ff71ce' }}>{name}</p>
              {username && <p className="text-xs font-semibold mt-0.5" style={{ color: '#01cdfe', textShadow: '0 0 8px #01cdfe' }}>@{username}</p>}
              {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: 'rgba(255,200,240,0.65)' }}>{bio}</p>}
            </div>
            <div className="flex flex-col" style={{ gap }}>
              {links.length === 0
                ? <div className="text-center py-6 text-xs" style={{ color: 'rgba(255,113,206,0.3)' }}>Añade links desde &quot;Links&quot;</div>
                : links.map(link => (
                  <div key={link.id} className={`flex items-center gap-2.5 px-3 py-2.5 anim-${anim}`}
                    style={{ background: 'rgba(255,113,206,0.07)', borderRadius: radius, border: '1px solid rgba(255,113,206,0.22)' }}>
                    <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: iconOverride || safeIconColor(link.color, '#0f0221') }} aria-hidden="true"></i>
                    <span className="text-xs font-semibold flex-1" style={{ color: 'rgba(255,230,255,0.9)' }}>{link.name}</span>
                    <i className="ti ti-chevron-right text-xs" style={{ color: 'rgba(255,113,206,0.4)' }} aria-hidden="true"></i>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    }

    if (theme === 'bosque') {
      return (
        <div className="relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 15%,#1a4a1a,transparent 55%),radial-gradient(ellipse at 70% 85%,#0a3010,transparent 55%),#050e07', minHeight: 520 }}>
          <div className="absolute" style={{ top: -100, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(40,180,60,0.18),transparent 70%)' }}></div>
          <div className="absolute" style={{ bottom: -80, right: -40, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(20,120,40,0.2),transparent 70%)' }}></div>
          <div className="relative z-10 p-4 pb-6">
            <div className="text-center mb-5">
              <Avatar size={16} border="rgba(100,255,100,0.4)" />
              <p className="text-sm font-bold" style={{ color: '#a7f3d0' }}>{name}</p>
              {username && <p className="text-xs font-semibold mt-0.5" style={{ color: 'rgba(160,255,160,0.7)' }}>@{username}</p>}
              {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: 'rgba(180,240,180,0.6)' }}>{bio}</p>}
            </div>
            <div className="flex flex-col" style={{ gap }}>
              {links.length === 0
                ? <div className="text-center py-6 text-xs" style={{ color: 'rgba(100,200,100,0.3)' }}>Añade links desde &quot;Links&quot;</div>
                : links.map(link => (
                  <div key={link.id} className={`flex items-center gap-2.5 px-3 py-2.5 anim-${anim}`}
                    style={{ background: 'rgba(40,160,60,0.07)', borderRadius: radius, border: '1px solid rgba(80,180,80,0.16)' }}>
                    <i className={`ti ${link.icon} text-lg flex-shrink-0`} style={{ color: iconOverride || safeIconColor(link.color, '#050e07') }} aria-hidden="true"></i>
                    <span className="text-xs font-semibold flex-1" style={{ color: 'rgba(220,255,220,0.9)' }}>{link.name}</span>
                    <i className="ti ti-chevron-right text-xs" style={{ color: 'rgba(100,200,100,0.4)' }} aria-hidden="true"></i>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    }

    // light (default)
    return (
      <div className="p-4 pb-6 relative overflow-hidden" style={{ background: bg, minHeight: 520 }}>
        <AnimatedBg motion={profile.bg_motion} accent={accent} dark={false} />
        <div className="text-center mb-5 relative z-10">
          <Avatar size={16} border="rgba(255,255,255,0.4)" />
          <p className="text-sm font-bold" style={{ color: textColor }}>{name}</p>
          {username && <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>@{username}</p>}
          {bio && <p className="text-xs mt-1.5 leading-relaxed px-2" style={{ color: muted }}>{bio}</p>}
        </div>
        <div className="relative z-10"><Links /></div>
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
