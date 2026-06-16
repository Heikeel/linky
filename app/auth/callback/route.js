import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`)
  }

  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  const verifierCookie = allCookies.find(c => c.name.includes('code-verifier'))

  // Log for debugging
  console.log('[auth/callback] code present:', !!code)
  console.log('[auth/callback] all cookie names:', allCookies.map(c => c.name))
  console.log('[auth/callback] verifier cookie found:', !!verifierCookie)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (e) {
            console.error('[auth/callback] setAll error:', e.message)
          }
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('[auth/callback] exchange error:', error.message, error.status, error.code)
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}&code=${error.code || ''}&status=${error.status || ''}`
    )
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
