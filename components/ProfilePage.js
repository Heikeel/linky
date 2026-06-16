'use client'

import { useState } from 'react'
import Link from 'next/link'
import { safeIconColor } from '@/lib/colorUtils'

function ShareButton({ dark }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all"
      style={{
        background: copied ? '#6c63ff' : (dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)'),
        color: copied ? '#fff' : (dark ? 'rgba(255,255,255,0.8)' : '#555'),
        borderColor: copied ? '#6c63ff' : (dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'),
      }}
    >
      <i className={`ti ${copied ? 'ti-check' : 'ti-copy'} text-sm`} aria-hidden="true"></i>
      {copied ? 'Link copiado' : 'Compartir perfil'}
    </button>
  )
}

function ThemeLight({ profile, links, isOwner, username }) {
  const accent = profile.accent || '#6c63ff'
  const anim   = profile.animation || 'bounce'
  const radius = profile.border_radius ?? 12
  const gap    = profile.link_gap ?? 9

  return (
    <main className="min-h-screen flex flex-col items-center py-14 px-4" style={{ background: '#f5f5f7' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.name || username} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-sm" />
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 border-4 border-white shadow-sm" style={{ background: accent }}>
              {(profile.name || username).charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="text-xl font-bold mb-1 text-gray-900">{profile.name || username}</h1>
          <p className="text-sm font-semibold mb-3" style={{ color: accent }}>@{username}</p>
          {profile.bio && <p className="text-sm leading-relaxed max-w-xs mx-auto text-gray-500">{profile.bio}</p>}
        </div>

        <div className="flex flex-col" style={{ gap }}>
          {links?.map(link => (
            <a key={link.id} href={link.url || '#'} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3.5 bg-white border border-gray-100 shadow-sm anim-${anim} transition-all`}
              style={{ borderRadius: radius, textDecoration: 'none' }}>
              <i className={`ti ${link.icon} text-xl flex-shrink-0`} style={{ color: link.color }} aria-hidden="true"></i>
              <span className="font-semibold text-sm flex-1 text-gray-800">{link.name}</span>
              <i className="ti ti-chevron-right text-sm text-gray-300" aria-hidden="true"></i>
            </a>
          ))}
          {(!links || links.length === 0) && <p className="text-center text-sm py-6 text-gray-400">Sin links por ahora</p>}
        </div>

        <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
          <ShareButton dark={false} />
          {isOwner ? (
            <Link href="/dashboard" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ background: accent }}>
              <i className="ti ti-edit text-sm" aria-hidden="true"></i> Editar perfil
            </Link>
          ) : (
            <a href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
              Crear mi LinkPage →
            </a>
          )}
        </div>
      </div>
    </main>
  )
}

function ThemeDark({ profile, links, isOwner, username }) {
  const accent = profile.accent || '#6c63ff'
  const anim   = profile.animation || 'bounce'
  const radius = profile.border_radius ?? 12
  const gap    = profile.link_gap ?? 9

  return (
    <main className="min-h-screen flex flex-col items-center py-14 px-4" style={{ background: '#0f0f13' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.name || username} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" style={{ border: '3px solid rgba(255,255,255,0.12)' }} />
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4" style={{ background: accent, border: '3px solid rgba(255,255,255,0.12)' }}>
              {(profile.name || username).charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="text-xl font-bold mb-1" style={{ color: '#fff' }}>{profile.name || username}</h1>
          <p className="text-sm font-semibold mb-3" style={{ color: accent }}>@{username}</p>
          {profile.bio && <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>{profile.bio}</p>}
        </div>

        <div className="flex flex-col" style={{ gap }}>
          {links?.map(link => (
            <a key={link.id} href={link.url || '#'} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3.5 anim-${anim} transition-all`}
              style={{ borderRadius: radius, textDecoration: 'none', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <i className={`ti ${link.icon} text-xl flex-shrink-0`} style={{ color: safeIconColor(link.color, '#0f0f13') }} aria-hidden="true"></i>
              <span className="font-semibold text-sm flex-1" style={{ color: 'rgba(255,255,255,0.88)' }}>{link.name}</span>
              <i className="ti ti-chevron-right text-sm" style={{ color: 'rgba(255,255,255,0.2)' }} aria-hidden="true"></i>
            </a>
          ))}
          {(!links || links.length === 0) && <p className="text-center text-sm py-6" style={{ color: 'rgba(255,255,255,0.2)' }}>Sin links por ahora</p>}
        </div>

        <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
          <ShareButton dark={true} />
          {isOwner ? (
            <Link href="/dashboard" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ background: accent }}>
              <i className="ti ti-edit text-sm" aria-hidden="true"></i> Editar perfil
            </Link>
          ) : (
            <a href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>
              Crear mi LinkPage →
            </a>
          )}
        </div>
      </div>
    </main>
  )
}

function ThemeGradient({ profile, links, isOwner, username }) {
  const accent = profile.accent || '#6c63ff'
  const anim   = profile.animation || 'bounce'
  const radius = profile.border_radius ?? 12
  const gap    = profile.link_gap ?? 9

  return (
    <main className="min-h-screen flex flex-col items-center" style={{ background: '#f5f5f7' }}>
      <div className="w-full max-w-sm">
        <div className="w-full h-36" style={{ background: `linear-gradient(135deg, ${accent}, #a855f7)` }}></div>
        <div className="flex flex-col items-center px-5 pb-14" style={{ background: '#fff' }}>
          <div className="flex justify-center -mt-12 mb-3">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name || username} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-md" style={{ background: accent }}>
                {(profile.name || username).charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold mb-1 text-gray-900">{profile.name || username}</h1>
          <p className="text-sm font-semibold mb-3" style={{ color: accent }}>@{username}</p>
          {profile.bio && <p className="text-sm leading-relaxed max-w-xs mx-auto text-center text-gray-500 mb-2">{profile.bio}</p>}

          <div className="flex flex-col w-full mt-5" style={{ gap }}>
            {links?.map(link => (
              <a key={link.id} href={link.url || '#'} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-3 px-4 py-3.5 anim-${anim} transition-all`}
                style={{ borderRadius: radius, textDecoration: 'none', background: '#f5f3ff', border: '1px solid #ede9fe' }}>
                <i className={`ti ${link.icon} text-xl flex-shrink-0`} style={{ color: link.color }} aria-hidden="true"></i>
                <span className="font-semibold text-sm flex-1 text-gray-800">{link.name}</span>
                <i className="ti ti-chevron-right text-sm text-gray-300" aria-hidden="true"></i>
              </a>
            ))}
            {(!links || links.length === 0) && <p className="text-center text-sm py-6 text-gray-400">Sin links por ahora</p>}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            <ShareButton dark={false} />
            {isOwner ? (
              <Link href="/dashboard" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ background: accent }}>
                <i className="ti ti-edit text-sm" aria-hidden="true"></i> Editar perfil
              </Link>
            ) : (
              <a href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
                Crear mi LinkPage →
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function ThemeTornasol({ profile, links, isOwner, username }) {
  const accent = profile.accent || '#6c63ff'
  const anim   = profile.animation || 'bounce'
  const radius = profile.border_radius ?? 12
  const gap    = profile.link_gap ?? 9

  return (
    <>
      <style>{`
        @keyframes aurora {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .aurora-bg {
          background: linear-gradient(-45deg, #0f0c29, #1a0533, #0d1b4b, #0a2a1a, #1a0533, #2d0b45, #041a3d);
          background-size: 400% 400%;
          animation: aurora 12s ease infinite;
          min-height: 100vh;
        }
        .bubble-orb {
          position: fixed; border-radius: 50%; filter: blur(60px);
          opacity: 0.35; pointer-events: none; z-index: 0;
        }
        .orb1 { width:500px;height:500px;top:-100px;left:-150px;background:conic-gradient(from 0deg,#ff0080,#7928ca,#0070f3,#00dfd8,#ff0080);animation:spin-slow 20s linear infinite; }
        .orb2 { width:400px;height:400px;bottom:-80px;right:-100px;background:conic-gradient(from 180deg,#00dfd8,#7928ca,#ff0080,#f5a623,#00dfd8);animation:spin-slow 25s linear infinite reverse; }
        .orb3 { width:300px;height:300px;top:40%;left:60%;background:conic-gradient(from 90deg,#7928ca,#0070f3,#00dfd8,#7928ca);animation:spin-slow 18s linear infinite;opacity:0.2; }
        .glass-card { background:rgba(255,255,255,0.06);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.12);transition:all 0.3s ease; }
        .glass-card:hover { background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.25);transform:translateY(-1px); }
        .glass-btn { background:rgba(255,255,255,0.1);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.85);transition:all 0.2s; }
        .glass-btn:hover { background:rgba(255,255,255,0.18);border-color:rgba(255,255,255,0.35); }
        .iridescent-text { background:linear-gradient(90deg,#ff9de2,#a78bfa,#67e8f9,#a7f3d0,#fde68a,#ff9de2);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite; }
        .avatar-ring { background:conic-gradient(from 0deg,#ff0080,#7928ca,#0070f3,#00dfd8,#ff0080);padding:3px;border-radius:50%; }
        .avatar-inner { border-radius:50%;overflow:hidden;background:#1a1a2e; }
        .float-avatar { animation:float 4s ease-in-out infinite; }
        .link-icon-shine { filter:drop-shadow(0 0 6px currentColor); }
        .glass-copy-btn { background:rgba(255,255,255,0.1);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.85); }
        .glass-copy-btn:hover { background:rgba(255,255,255,0.18); }
      `}</style>

      <div className="aurora-bg relative overflow-hidden">
        <div className="bubble-orb orb1"></div>
        <div className="bubble-orb orb2"></div>
        <div className="bubble-orb orb3"></div>

        <div className="relative z-10 flex flex-col items-center pt-40 pb-14 px-4 min-h-screen">
          <div className="w-full max-w-sm">
            <div className="text-center mb-10">
              <div className="float-avatar flex justify-center mb-5">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.name || username} className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white" style={{ background: accent }}>
                    {(profile.name || username).charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h1 className="iridescent-text text-2xl font-bold mb-1">{profile.name || username}</h1>
              <p className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>@{username}</p>
              {profile.bio && <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>{profile.bio}</p>}
            </div>

            <div className="flex flex-col" style={{ gap }}>
              {links?.map(link => (
                <a key={link.id} href={link.url || '#'} target="_blank" rel="noopener noreferrer"
                  className={`glass-card flex items-center gap-3 px-4 py-3.5 anim-${anim}`}
                  style={{ borderRadius: radius, textDecoration: 'none' }}>
                  <i className={`ti ${link.icon} text-xl flex-shrink-0 link-icon-shine`} style={{ color: safeIconColor(link.color, '#0f0c29') }} aria-hidden="true"></i>
                  <span className="font-semibold text-sm flex-1" style={{ color: 'rgba(255,255,255,0.9)' }}>{link.name}</span>
                  <i className="ti ti-chevron-right text-sm" style={{ color: 'rgba(255,255,255,0.3)' }} aria-hidden="true"></i>
                </a>
              ))}
              {(!links || links.length === 0) && <p className="text-center text-sm py-6" style={{ color: 'rgba(255,255,255,0.3)' }}>Sin links por ahora</p>}
            </div>

            <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
              <ShareButton dark={true} />
              {isOwner ? (
                <Link href="/dashboard" className="glass-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold">
                  <i className="ti ti-edit text-sm" aria-hidden="true"></i> Editar perfil
                </Link>
              ) : (
                <a href="/" className="glass-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold">
                  Crear mi LinkPage →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ProfilePage({ profile, links, isOwner, username }) {
  const theme = profile.theme || 'light'
  if (theme === 'dark')      return <ThemeDark      profile={profile} links={links} isOwner={isOwner} username={username} />
  if (theme === 'gradient')  return <ThemeGradient  profile={profile} links={links} isOwner={isOwner} username={username} />
  if (theme === 'tornasol')  return <ThemeTornasol  profile={profile} links={links} isOwner={isOwner} username={username} />
  return <ThemeLight profile={profile} links={links} isOwner={isOwner} username={username} />
}
