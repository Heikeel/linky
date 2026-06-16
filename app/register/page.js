'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(null)

  async function checkUsername(val) {
    const clean = val.toLowerCase().replace(/[^a-z0-9_]/g, '')
    setUsername(clean)
    if (clean.length < 3) { setUsernameAvailable(null); return }
    setCheckingUsername(true)
    const supabase = createClient()
    const { data } = await supabase.from('profiles').select('username').eq('username', clean).single()
    setUsernameAvailable(!data)
    setCheckingUsername(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (step === 1) {
      if (!usernameAvailable) { setError('Elige un nombre de usuario disponible'); return }
      setStep(2); return
    }
    setLoading(true)
    const supabase = createClient()
    const { data, error: signupError } = await supabase.auth.signUp({ email, password })
    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username,
      name,
      bio: '',
    })
    if (profileError) {
      setError('Error al crear el perfil: ' + profileError.message)
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #f4f3ff 0%, #ede9ff 100%)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#6c63ff' }}>
            Link<span className="font-normal text-gray-700">Page</span>
          </Link>
          <h1 className="text-xl font-semibold text-gray-800 mt-4">Crea tu cuenta</h1>
          <p className="text-gray-500 text-sm mt-1">
            Paso {step} de 2 — {step === 1 ? 'Tu perfil' : 'Tu acceso'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm text-red-600 bg-red-50 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tu nombre</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Nombre que verán tus seguidores"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nombre de usuario</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={e => checkUsername(e.target.value)}
                      required
                      placeholder="tuusuario"
                      className="w-full pl-7 pr-10 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 bg-gray-50 focus:bg-white transition-colors"
                    />
                    {username.length >= 3 && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                        {checkingUsername ? '...' : usernameAvailable ? '✅' : '❌'}
                      </span>
                    )}
                  </div>
                  {username.length >= 3 && !checkingUsername && (
                    <p className={`text-xs mt-1 ${usernameAvailable ? 'text-green-600' : 'text-red-500'}`}>
                      {usernameAvailable ? `linkpage.com/${username} está disponible` : 'Ese usuario ya está tomado'}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Solo letras, números y guión bajo</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-400 hover:text-gray-600 text-left"
                >
                  ← Volver
                </button>
              </>
            )}

            <button
              type="submit"
              disabled={loading || (step === 1 && !usernameAvailable)}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 mt-2"
              style={{ background: '#6c63ff' }}
            >
              {loading ? 'Creando cuenta...' : step === 1 ? 'Continuar →' : 'Crear mi cuenta'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-semibold" style={{ color: '#6c63ff' }}>
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
