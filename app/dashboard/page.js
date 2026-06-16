import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Editor from '@/components/Editor'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const user = data?.user ?? null

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', user.id)
    .eq('active', true)
    .order('order_index')

  return <Editor profile={profile} links={links || []} userId={user.id} />
}
