import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfilePage from '@/components/ProfilePage'

export async function generateMetadata({ params }) {
  const { username } = await params
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles').select('name, bio, avatar_url').eq('username', username).single()
  if (!profile) return { title: 'Página no encontrada' }

  const title = `${profile.name || username} | Linky`
  const description = profile.bio || `Los links de ${profile.name || username}`
  const images = profile.avatar_url ? [{ url: profile.avatar_url }] : []

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mylinky-eta.vercel.app/${username}`,
      images,
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: profile.avatar_url ? [profile.avatar_url] : [],
    },
  }
}

export default async function PublicProfilePage({ params }) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, name, bio, avatar_url, accent, bg, card, text_color, muted, icon_color, theme, bg_motion, animation, border_radius, link_gap')
    .eq('username', username).single()

  if (!profile) notFound()

  const { data: authData } = await supabase.auth.getUser()
  const user = authData?.user ?? null
  const isOwner = user?.id === profile.id

  const { data: links } = await supabase
    .from('links').select('*')
    .eq('profile_id', profile.id)
    .eq('active', true)
    .order('order_index')

  return (
    <ProfilePage
      profile={profile}
      links={links}
      isOwner={isOwner}
      username={username}
    />
  )
}
