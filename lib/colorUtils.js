export function hexToHsl(hex) {
  if (!hex || hex.length < 7) return [0, 0, 50]
  let r = parseInt(hex.slice(1, 3), 16) / 255
  let g = parseInt(hex.slice(3, 5), 16) / 255
  let b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return [h * 360, s * 100, l * 100]
}

export function hslToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100
  let r, g, b
  if (s === 0) { r = g = b = l } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return '#' + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')
}

export function adjustLightness(hex, delta) {
  const [h, s, l] = hexToHsl(hex)
  return hslToHex(h, s, Math.max(0, Math.min(100, l + delta)))
}

export function getLuminance(hex) {
  if (!hex || hex.length < 7) return 1
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

export function safeIconColor(iconColor, bgColor) {
  const bgLum = getLuminance(bgColor || '#ffffff')
  const iconLum = getLuminance(iconColor || '#000000')
  // dark background + dark icon → use white
  if (bgLum < 0.35 && iconLum < 0.35) return '#ffffff'
  return iconColor
}

// Genera un campo de estrellas determinista (mismo resultado en server y client,
// así evitamos errores de hidratación). Devuelve un string para box-shadow.
export function generateStars(count, maxX, maxY, seed = 1) {
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const shadows = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(rand() * maxX)
    const y = Math.floor(rand() * maxY)
    shadows.push(`${x}px ${y}px #fff`)
  }
  return shadows.join(', ')
}
