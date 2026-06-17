'use client'

import { useState } from 'react'
import Link from 'next/link'

const ACCENT = '#6c63ff'

function PhoneMockup({ darkMode }) {
  const phoneBg    = darkMode ? '#1a1a2e' : '#fff'
  const linkBg     = darkMode ? 'rgba(255,255,255,0.07)' : '#f5f3ff'
  const linkBorder = darkMode ? 'rgba(255,255,255,0.1)'  : '#ede9fe'
  const textColor  = darkMode ? '#fff'                   : '#1f2937'
  const mutedColor = darkMode ? 'rgba(255,255,255,0.45)' : '#6b7280'

  return (
    <div style={{
      width: 220, height: 430, borderRadius: 36, flexShrink: 0,
      background: 'linear-gradient(135deg, #6c63ff 0%, #a855f7 100%)',
      boxShadow: darkMode
        ? '0 40px 100px rgba(108,99,255,0.5), 0 0 0 1px rgba(108,99,255,0.3)'
        : '0 40px 80px rgba(108,99,255,0.3)',
      padding: 3, position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 56, height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.2)', zIndex: 10 }} />
      <div style={{
        width: '100%', height: '100%', borderRadius: 34, background: phoneBg,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        alignItems: 'center', paddingTop: 36, paddingBottom: 20, paddingLeft: 16, paddingRight: 16,
      }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22, fontWeight: 700 }}>M</div>
        <div style={{ fontWeight: 700, fontSize: 14, color: textColor, marginBottom: 2 }}>Mike</div>
        <div style={{ fontSize: 11, color: ACCENT, marginBottom: 5, fontWeight: 600 }}>@mike</div>
        <div style={{ fontSize: 10, color: mutedColor, marginBottom: 16, textAlign: 'center', lineHeight: 1.4 }}>Creador de contenido · México</div>
        {[
          { icon: 'ti-brand-instagram', name: 'Instagram', color: '#e1306c' },
          { icon: 'ti-brand-youtube',   name: 'YouTube',   color: '#ff0000' },
          { icon: 'ti-brand-tiktok',    name: 'TikTok',    color: darkMode ? '#fff' : '#000' },
          { icon: 'ti-brand-spotify',   name: 'Spotify',   color: '#1db954' },
        ].map(l => (
          <div key={l.name} style={{
            width: '100%', padding: '9px 12px', borderRadius: 10,
            background: linkBg, marginBottom: 7,
            display: 'flex', alignItems: 'center', gap: 10,
            border: `1px solid ${linkBorder}`,
          }}>
            <i className={`ti ${l.icon}`} style={{ color: l.color, fontSize: 15 }} aria-hidden="true" />
            <span style={{ fontSize: 11, fontWeight: 600, color: textColor }}>{l.name}</span>
            <i className="ti ti-chevron-right" style={{ color: mutedColor, fontSize: 10, marginLeft: 'auto' }} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}

const THEMES_SHOWCASE = [
  { name: 'Minimalista', bg: '#f5f5f7', accent: '#6c63ff', dark: false },
  { name: 'Dark mode',   bg: '#0f0f13', accent: '#6c63ff', dark: true  },
  { name: 'Degradado',   bg: '#fff',    accent: '#a855f7', dark: false },
  { name: 'Galaxia',     bg: '#05060f', accent: '#a78bfa', dark: true  },
  { name: 'Meteoros',    bg: '#080b1a', accent: '#38bdf8', dark: true  },
  { name: 'Tornasol',    bg: '#0f0c29', accent: '#ff0080', dark: true  },
]

function ThemeCard({ theme }) {
  return (
    <div style={{
      width: 100, borderRadius: 20, padding: 12,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: theme.bg, flexShrink: 0,
      boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
      border: theme.dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
    }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: theme.accent, marginBottom: 8 }} />
      <div style={{ width: 52, height: 7, borderRadius: 3, background: theme.dark ? 'rgba(255,255,255,0.7)' : '#1f2937', marginBottom: 4 }} />
      <div style={{ width: 36, height: 5, borderRadius: 2.5, background: theme.dark ? 'rgba(255,255,255,0.3)' : '#9ca3af', marginBottom: 12 }} />
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          width: '100%', height: 22, borderRadius: 7, marginBottom: 6,
          background: theme.dark ? 'rgba(255,255,255,0.07)' : '#f5f3ff',
          border: theme.dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb',
        }} />
      ))}
      <div style={{ paddingTop: 8, fontSize: 9, fontWeight: 600, color: theme.dark ? 'rgba(255,255,255,0.4)' : '#6b7280', textAlign: 'center' }}>{theme.name}</div>
    </div>
  )
}

export default function Home() {
  const [dark, setDark] = useState(false)

  const bg          = dark ? '#0f0f13'                         : '#f4f3ff'
  const text        = dark ? '#fff'                            : '#111827'
  const muted       = dark ? 'rgba(255,255,255,0.5)'          : '#6b7280'
  const cardBg      = dark ? '#1a1a2e'                         : '#fff'
  const border      = dark ? 'rgba(255,255,255,0.08)'         : '#e5e7eb'
  const pillBg      = dark ? 'rgba(108,99,255,0.2)'           : '#ece9ff'
  const headerBg    = dark ? 'rgba(15,15,19,0.9)'             : 'rgba(244,243,255,0.9)'

  return (
    <div style={{ background: bg, color: text, transition: 'background 0.3s, color 0.3s', minHeight: '100vh', fontFamily: 'inherit' }}>

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 40px', position: 'sticky', top: 0, zIndex: 50,
        background: headerBg, backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${border}`,
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>Linky</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={() => setDark(d => !d)}
            aria-label="Cambiar tema"
            style={{
              width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: dark ? 'rgba(255,255,255,0.1)' : '#ece9ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: dark ? '#fff' : ACCENT, fontSize: 18, transition: 'all 0.2s',
            }}
          >
            <i className={`ti ${dark ? 'ti-sun' : 'ti-moon'}`} aria-hidden="true" />
          </button>
          <Link href="/login" style={{
            padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 500,
            color: dark ? 'rgba(255,255,255,0.8)' : '#374151',
            border: `1px solid ${border}`, background: cardBg, textDecoration: 'none',
          }}>
            Iniciar sesión
          </Link>
          <Link href="/register" style={{
            padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600,
            color: '#fff', background: ACCENT, textDecoration: 'none',
            boxShadow: '0 2px 14px rgba(108,99,255,0.4)',
          }}>
            Crear cuenta gratis
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '90px 80px', maxWidth: 1200, margin: '0 auto', gap: 60,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: pillBg, color: ACCENT, marginBottom: 28,
          }}>
            <i className="ti ti-sparkles" aria-hidden="true" /> Tu link en bio, reinventado
          </div>

          <h1 style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.1, marginBottom: 22, color: text }}>
            Tu presencia digital,<br />
            <span style={{ color: ACCENT }}>en un solo link.</span>
          </h1>

          <p style={{ fontSize: 18, color: muted, marginBottom: 36, lineHeight: 1.7, maxWidth: 480 }}>
            Crea tu página personalizada con todos tus links, temas animados y colores únicos. Compártela desde Instagram, TikTok o donde quieras.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/register" style={{
              padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 700,
              color: '#fff', background: ACCENT, textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(108,99,255,0.4)',
            }}>
              Empezar gratis →
            </Link>
            <Link href="/mike" style={{
              padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 600,
              color: dark ? 'rgba(255,255,255,0.8)' : '#374151',
              border: `1px solid ${border}`, background: cardBg, textDecoration: 'none',
            }}>
              Ver ejemplo
            </Link>
          </div>
        </div>

        <div style={{ flexShrink: 0, position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -40, borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT}50 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }} />
          <PhoneMockup darkMode={dark} />
        </div>
      </section>

      {/* ── SECCIÓN 2 — Crea en minutos ── */}
      <section style={{ background: dark ? '#1a1a2e' : ACCENT, padding: '80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 80 }}>
          {/* Editor mockup */}
          <div style={{
            flex: 1, borderRadius: 24, padding: 28,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              {['Perfil', 'Links', 'Colores', 'Movimiento'].map((t, i) => (
                <div key={t} style={{
                  padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                  background: i === 1 ? '#fff' : 'rgba(255,255,255,0.15)',
                  color: i === 1 ? ACCENT : 'rgba(255,255,255,0.7)',
                }}>{t}</div>
              ))}
            </div>
            {['Instagram', 'YouTube', 'TikTok', 'Mi portfolio'].map(n => (
              <div key={n} style={{
                padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{n}</span>
                <div style={{ marginLeft: 'auto', width: 24, height: 24, borderRadius: 6, background: 'rgba(255,255,255,0.15)' }} />
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 46, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 18 }}>
              Crea y personaliza<br />en minutos
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 30 }}>
              Editor visual intuitivo con preview en tiempo real. Elige temas animados, paletas de colores y ajusta cada detalle de tu página.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              {[
                { icon: 'ti-palette',  text: '7 temas únicos: Galaxia, Meteoros, Tornasol y más' },
                { icon: 'ti-activity', text: '6 fondos animados: Aurora, Destellos, Rayos...' },
                { icon: 'ti-link',     text: '46+ redes sociales soportadas' },
              ].map(f => (
                <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'rgba(255,255,255,0.85)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`ti ${f.icon}`} style={{ fontSize: 18 }} aria-hidden="true" />
                  </div>
                  <span style={{ fontSize: 15 }}>{f.text}</span>
                </div>
              ))}
            </div>
            <Link href="/register" style={{
              display: 'inline-block', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 700,
              background: '#fff', color: ACCENT, textDecoration: 'none',
            }}>
              Empezar gratis →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3 — Temas ── */}
      <section style={{ background: dark ? '#0d0d18' : '#1a1a2e', padding: '80px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 60 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 46, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 18 }}>
              Tu estilo,<br />
              <span style={{ color: ACCENT }}>tus reglas.</span>
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 32, maxWidth: 380 }}>
              Elige entre 7 temas visuales únicos — desde minimalista hasta galaxia animada. Cada uno completamente personalizable.
            </p>
            <Link href="/register" style={{
              display: 'inline-block', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 700,
              background: ACCENT, color: '#fff', textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(108,99,255,0.4)',
            }}>
              Elegir mi tema →
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', maxWidth: 560, justifyContent: 'flex-end' }}>
            {THEMES_SHOWCASE.map(t => <ThemeCard key={t.name} theme={t} />)}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 4 — Cómo funciona ── */}
      <section style={{ padding: '80px', background: bg }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: pillBg, color: ACCENT, marginBottom: 20,
          }}>
            <i className="ti ti-rocket" aria-hidden="true" /> Simple y rápido
          </div>
          <h2 style={{ fontSize: 46, fontWeight: 800, color: text, lineHeight: 1.15, marginBottom: 16 }}>
            Listo en 3 pasos
          </h2>
          <p style={{ fontSize: 17, color: muted, marginBottom: 56, maxWidth: 460, margin: '0 auto 56px' }}>
            Sin configuraciones complicadas. Tu página en menos de 2 minutos.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { num: '01', icon: 'ti-user-plus',  title: 'Crea tu cuenta',       desc: 'Regístrate gratis con email o Google. Elige tu nombre de usuario único.' },
              { num: '02', icon: 'ti-palette',    title: 'Personaliza tu página', desc: 'Agrega tus links, elige temas animados, colores y ajusta cada detalle.' },
              { num: '03', icon: 'ti-share',      title: 'Compártela',            desc: 'Pon tu link de Linky en el bio de todas tus redes sociales y listo.' },
            ].map(step => (
              <div key={step.num} style={{
                padding: 32, borderRadius: 24, textAlign: 'left',
                background: cardBg, border: `1px solid ${border}`,
                boxShadow: dark ? 'none' : '0 4px 20px rgba(0,0,0,0.06)',
              }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: ACCENT, marginBottom: 16, letterSpacing: '0.05em' }}>{step.num}</div>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: pillBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  <i className={`ti ${step.icon}`} style={{ color: ACCENT, fontSize: 22 }} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: text, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{
        padding: '80px', textAlign: 'center',
        background: dark ? '#1a1a2e' : 'linear-gradient(135deg, #f4f3ff, #ede9ff)',
      }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <h2 style={{ fontSize: 46, fontWeight: 800, color: text, lineHeight: 1.15, marginBottom: 18 }}>
            ¿Listo para tu<br />
            <span style={{ color: ACCENT }}>página Linky?</span>
          </h2>
          <p style={{ fontSize: 17, color: muted, marginBottom: 36, lineHeight: 1.7 }}>
            Crea tu página de links personalizada hoy. Es gratis.
          </p>
          <Link href="/register" style={{
            display: 'inline-block', padding: '18px 40px', borderRadius: 16, fontSize: 17, fontWeight: 700,
            color: '#fff', background: ACCENT, textDecoration: 'none',
            boxShadow: '0 12px 40px rgba(108,99,255,0.4)',
          }}>
            Crear mi Linky gratis →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '24px 40px', textAlign: 'center', fontSize: 13, color: muted,
        borderTop: `1px solid ${border}`,
        background: dark ? '#0f0f13' : '#f4f3ff',
      }}>
        Linky · Hecho con ♥
      </footer>
    </div>
  )
}
