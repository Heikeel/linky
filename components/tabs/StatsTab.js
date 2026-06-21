'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function StatsTab({ userId, links }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState(7)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()
      const since = new Date(Date.now() - range * 24 * 60 * 60 * 1000).toISOString()

      const { data } = await supabase
        .from('analytics')
        .select('type, link_id, created_at')
        .eq('profile_id', userId)
        .gte('created_at', since)

      if (!data) { setLoading(false); return }

      const views = data.filter(r => r.type === 'view').length
      const clicks = data.filter(r => r.type === 'click').length

      const clicksByLink = {}
      data.filter(r => r.type === 'click' && r.link_id).forEach(r => {
        clicksByLink[r.link_id] = (clicksByLink[r.link_id] || 0) + 1
      })

      setStats({ views, clicks, clicksByLink })
      setLoading(false)
    }
    load()
  }, [userId, range])

  const card = 'rounded-xl p-4 flex flex-col gap-1'
  const cardStyle = { background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.15)' }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Estadísticas</p>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs font-medium">
          {[7, 30].map(d => (
            <button key={d} onClick={() => setRange(d)}
              className="px-3 py-1.5 transition-colors"
              style={{ background: range === d ? '#6c63ff' : 'transparent', color: range === d ? '#fff' : '#9ca3af' }}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !stats ? (
        <p className="text-xs text-gray-400 text-center py-8">No hay datos aún</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className={card} style={cardStyle}>
              <span className="text-2xl font-bold" style={{ color: '#6c63ff' }}>{stats.views}</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <i className="ti ti-eye text-sm" aria-hidden="true"></i> Visitas
              </span>
            </div>
            <div className={card} style={cardStyle}>
              <span className="text-2xl font-bold" style={{ color: '#6c63ff' }}>{stats.clicks}</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <i className="ti ti-cursor text-sm" aria-hidden="true"></i> Clicks totales
              </span>
            </div>
          </div>

          {links.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Por link</p>
              {links.map(link => {
                const count = stats.clicksByLink[link.id] || 0
                const max = Math.max(...links.map(l => stats.clicksByLink[l.id] || 0), 1)
                return (
                  <div key={link.id} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 truncate max-w-[70%]">{link.name}</span>
                      <span className="text-xs font-semibold" style={{ color: '#6c63ff' }}>{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(count / max) * 100}%`, background: '#6c63ff' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {stats.views === 0 && stats.clicks === 0 && (
            <p className="text-xs text-gray-400 text-center -mt-2">Comparte tu perfil para empezar a ver datos</p>
          )}
        </>
      )}
    </div>
  )
}
