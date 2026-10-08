// Asigna un color consistente (determinístico, por hash del texto) a cada
// etiqueta de tecnología, para que las tarjetas no se vean monocromáticas.
const PALETTE = [
  { bg: '#eef2ff', text: '#4f46e5', border: '#c7d2fe' }, // indigo
  { bg: '#fdf2f8', text: '#db2777', border: '#fbcfe8' }, // pink
  { bg: '#ecfeff', text: '#0891b2', border: '#a5f3fc' }, // cyan
  { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' }, // orange
  { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' }, // green
  { bg: '#fef9c3', text: '#a16207', border: '#fde68a' }, // amber
  { bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff' }, // purple
  { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' }, // blue
]

export function tagColor(label) {
  let hash = 0
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash * 31 + label.charCodeAt(i)) >>> 0
  }
  return PALETTE[hash % PALETTE.length]
}
