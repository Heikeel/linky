'use client'

// Fondo animado reutilizable. Se posiciona absoluto dentro de un contenedor
// `relative overflow-hidden`; el contenido debe ir en una capa `relative z-10`.
// motion: 'none' | 'aurora' | 'bubbles' | 'waves'
export default function AnimatedBg({ motion, accent = '#6c63ff', dark = false }) {
  if (!motion || motion === 'none') return null

  const blobOpacity = dark ? 0.45 : 0.35

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <style>{`
        @keyframes ab-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(40px,-30px) scale(1.15); }
          66%     { transform: translate(-30px,20px) scale(0.95); }
        }
        @keyframes ab-rise {
          0%   { transform: translateY(110%) scale(0.6); opacity:0; }
          15%  { opacity:1; }
          85%  { opacity:1; }
          100% { transform: translateY(-20%) scale(1.1); opacity:0; }
        }
        @keyframes ab-wave {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ab-blob { position:absolute; border-radius:50%; filter: blur(60px); }
        .ab-bubble { position:absolute; bottom:0; border-radius:50%; }
        .ab-wave-sheet { position:absolute; border-radius:45%; filter: blur(40px); }
      `}</style>

      {motion === 'aurora' && (
        <>
          <div className="ab-blob" style={{ width: 360, height: 360, top: '-10%', left: '-15%', background: accent, opacity: blobOpacity, animation: 'ab-drift 16s ease-in-out infinite' }}></div>
          <div className="ab-blob" style={{ width: 320, height: 320, bottom: '-12%', right: '-12%', background: accent, opacity: blobOpacity * 0.8, animation: 'ab-drift 20s ease-in-out infinite reverse' }}></div>
          <div className="ab-blob" style={{ width: 260, height: 260, top: '40%', left: '55%', background: accent, opacity: blobOpacity * 0.6, animation: 'ab-drift 14s ease-in-out infinite' }}></div>
        </>
      )}

      {motion === 'bubbles' && (
        [
          { left: '8%',  size: 70,  dur: 9,  delay: 0 },
          { left: '22%', size: 40,  dur: 12, delay: 2 },
          { left: '38%', size: 90,  dur: 14, delay: 1 },
          { left: '55%', size: 50,  dur: 10, delay: 3 },
          { left: '70%', size: 75,  dur: 13, delay: 0.5 },
          { left: '85%', size: 35,  dur: 11, delay: 2.5 },
          { left: '48%', size: 60,  dur: 16, delay: 4 },
          { left: '92%', size: 55,  dur: 12, delay: 1.5 },
        ].map((b, i) => (
          <div key={i} className="ab-bubble" style={{
            left: b.left, width: b.size, height: b.size,
            background: accent, opacity: dark ? 0.18 : 0.14,
            animation: `ab-rise ${b.dur}s linear infinite`, animationDelay: `${b.delay}s`,
          }}></div>
        ))
      )}

      {motion === 'waves' && (
        <>
          <div className="ab-wave-sheet" style={{ width: '160%', height: '160%', top: '20%', left: '-30%', background: `linear-gradient(120deg, ${accent}, transparent 60%)`, opacity: blobOpacity * 0.7, animation: 'ab-wave 30s linear infinite' }}></div>
          <div className="ab-wave-sheet" style={{ width: '140%', height: '140%', bottom: '10%', right: '-25%', background: `linear-gradient(300deg, ${accent}, transparent 60%)`, opacity: blobOpacity * 0.5, animation: 'ab-wave 24s linear infinite reverse' }}></div>
        </>
      )}
    </div>
  )
}
