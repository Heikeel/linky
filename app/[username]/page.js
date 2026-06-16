import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }) {
  const { username } = await params
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles').select('name, bio').eq('username', username).single()
  if (!profile) return { title: 'Página no encontrada' }
  return {
    title: `${profile.name || username} | LinkPage`,
    description: profile.bio || `Los links de ${profile.name || username}`,
  }
}

export default async function PublicProfilePage({ params }) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('username', username).single()

  if (!profile) notFound()

  const { data: links } = await supabase
    .from('links').select('*')
    .eq('profile_id', profile.id)
    .eq('active', true)
    .order('order_index')

  const accent    = profile.accent     || '#6c63ff'
  const bg        = profile.bg         || '#f4f3ff'
  const card      = profile.card       || '#ffffff'
  const textColor = profile.text_color || '#1a1a2e'
  const muted     = profile.muted      || '#888888'
  const anim      = profile.animation  || 'bounce'
  const radius    = profile.border_radius ?? 12
  const gap       = profile.link_gap   ?? 9

  return (
    <main
      className="min-h-screen flex flex-col items-center py-12 px-4"
      style={{ background: bg }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.name || username}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4"
              style={{ borderColor: 'rgba(255,255,255,0.5)' }}
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 border-4"
              style={{ background: accent, borderColor: 'rgba(255,255,255,0.4)' }}
            >
              {(profile.name || username).charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="text-xl font-bold mb-1" style={{ color: textColor }}>
            {profile.name || username}
          </h1>
          <p className="text-sm font-semibold mb-3" style={{ color: accent }}>@{username}</p>
          {profile.bio && (
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: muted }}>
              {profile.bio}
            </p>
          )}
        </div>

        <div className="flex flex-col" style={{ gap }}>
          {links?.map(link => (
            <a
              key={link.id}
              href={link.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3.5 border anim-${anim} transition-all`}
              style={{
                background: card,
                borderRadius: radius,
                borderColor: 'rgba(0,0,0,0.05)',
                borderWidth: 1,
                color: textColor,
                textDecoration: 'none',
              }}
            >
              <i className={`ti ${link.icon} text-xl flex-shrink-0`} style={{ color: link.color }} aria-hidden="true"></i>
              <span className="font-semibold text-sm flex-1">{link.name}</span>
              <i className="ti ti-chevron-right text-sm" style={{ color: '#ccc' }} aria-hidden="true"></i>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/"
            className="text-xs font-semibold px-4 py-2 rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
            style={{ background: 'rgba(255,255,255,0.5)' }}
          >
            Crear mi LinkPage gratis →
          </a>
        </div>
      </div>
    </main>
  )
}
