import QRCode from 'qrcode'

export type DotStyle = 'square' | 'rounded' | 'dots' | 'extra-rounded'
export type CornerStyle = 'square' | 'rounded' | 'extra-rounded'

export interface QRDesign {
  fg: string
  bg: string
  dotStyle: DotStyle
  cornerStyle: CornerStyle
  size: number
  margin: number
  logo: string | null
  logoSize: number
}

export const defaultDesign: QRDesign = {
  fg: '#0F6E56',
  bg: '#FFFFFF',
  dotStyle: 'rounded',
  cornerStyle: 'rounded',
  size: 512,
  margin: 4,
  logo: null,
  logoSize: 20,
}

function drawRoundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + w - radius, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
  ctx.lineTo(x + w, y + h - radius)
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  ctx.lineTo(x + radius, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

function isFinder(row: number, col: number, count: number): 'tl' | 'tr' | 'bl' | null {
  const f = 7
  if (row < f && col < f) return 'tl'
  if (row < f && col >= count - f) return 'tr'
  if (row >= count - f && col < f) return 'bl'
  return null
}

export async function renderQR(canvas: HTMLCanvasElement, text: string, design: QRDesign) {
  const qr = QRCode.create(text || ' ', { errorCorrectionLevel: 'H' })
  const modules = qr.modules
  const count = modules.size
  const data = modules.data
  const total = count + design.margin * 2
  const cell = design.size / total
  const ctx = canvas.getContext('2d')!
  const ratio = window.devicePixelRatio || 1
  canvas.width = design.size * ratio
  canvas.height = design.size * ratio
  canvas.style.width = `${design.size}px`
  canvas.style.height = `${design.size}px`
  ctx.scale(ratio, ratio)
  ctx.fillStyle = design.bg
  ctx.fillRect(0, 0, design.size, design.size)
  ctx.fillStyle = design.fg

  const get = (r: number, c: number) => data[r * count + c] === 1

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (!get(r, c)) continue
      if (isFinder(r, c, count)) continue
      const x = (c + design.margin) * cell
      const y = (r + design.margin) * cell
      if (design.dotStyle === 'dots') {
        ctx.beginPath()
        ctx.arc(x + cell / 2, y + cell / 2, cell * 0.42, 0, Math.PI * 2)
        ctx.fill()
      } else if (design.dotStyle === 'square') {
        ctx.fillRect(x, y, cell, cell)
      } else {
        const rad = design.dotStyle === 'extra-rounded' ? cell * 0.5 : cell * 0.32
        drawRoundedRectPath(ctx, x, y, cell, cell, rad)
        ctx.fill()
      }
    }
  }

  const finderOrigins: Array<[number, number]> = [
    [design.margin, design.margin],
    [design.margin + count - 7, design.margin],
    [design.margin, design.margin + count - 7],
  ]
  finderOrigins.forEach(([fc, fr]) => {
    const x = fc * cell
    const y = fr * cell
    const rad = design.cornerStyle === 'square' ? 0 : design.cornerStyle === 'extra-rounded' ? cell * 3.5 : cell * 1.6
    ctx.fillStyle = design.fg
    drawRoundedRectPath(ctx, x, y, cell * 7, cell * 7, rad)
    ctx.fill()
    ctx.fillStyle = design.bg
    drawRoundedRectPath(ctx, x + cell, y + cell, cell * 5, cell * 5, Math.max(0, rad - cell))
    ctx.fill()
    ctx.fillStyle = design.fg
    const innerRad = design.cornerStyle === 'square' ? 0 : design.cornerStyle === 'extra-rounded' ? cell * 1.8 : cell
    drawRoundedRectPath(ctx, x + cell * 2, y + cell * 2, cell * 3, cell * 3, innerRad)
    ctx.fill()
  })

  if (design.logo) {
    await new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => {
        const box = (design.size * design.logoSize) / 100
        const lx = (design.size - box) / 2
        const ly = (design.size - box) / 2
        ctx.fillStyle = design.bg
        drawRoundedRectPath(ctx, lx - box * 0.12, ly - box * 0.12, box * 1.24, box * 1.24, box * 0.2)
        ctx.fill()
        const s = Math.min(box / img.width, box / img.height)
        const w = img.width * s
        const h = img.height * s
        ctx.drawImage(img, (design.size - w) / 2, (design.size - h) / 2, w, h)
        resolve()
      }
      img.onerror = () => resolve()
      img.src = design.logo!
    })
  }
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string, type: 'png' | 'jpg', fg: string, bg: string) {
  if (type === 'jpg') {
    const tmp = document.createElement('canvas')
    tmp.width = canvas.width
    tmp.height = canvas.height
    const c = tmp.getContext('2d')!
    c.fillStyle = bg
    c.fillRect(0, 0, tmp.width, tmp.height)
    c.drawImage(canvas, 0, 0)
    const url = tmp.toDataURL('image/jpeg', 0.95)
    triggerDownload(url, filename)
  } else {
    triggerDownload(canvas.toDataURL('image/png'), filename)
  }
  void fg
}

export async function downloadSVG(text: string, design: QRDesign, filename: string) {
  const svg = await QRCode.toString(text || ' ', {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: design.margin,
    width: design.size,
    color: { dark: design.fg, light: design.bg },
  })
  triggerDownload('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg), filename)
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function buildContent(type: string, fields: Record<string, string>): string {
  switch (type) {
    case 'url':
      return fields.url || ''
    case 'text':
      return fields.text || ''
    case 'wifi': {
      const hidden = fields.hidden === 'true' ? 'true' : 'false'
      return `WIFI:T:${fields.encryption || 'WPA'};S:${fields.ssid || ''};P:${fields.password || ''};H:${hidden};;`
    }
    case 'email':
      return `mailto:${fields.email || ''}?subject=${encodeURIComponent(fields.subject || '')}&body=${encodeURIComponent(fields.body || '')}`
    case 'phone':
      return `tel:${fields.phone || ''}`
    case 'sms':
      return `SMSTO:${fields.phone || ''}:${fields.message || ''}`
    case 'vcard':
      return [
        'BEGIN:VCARD', 'VERSION:3.0',
        `FN:${fields.name || ''}`,
        `ORG:${fields.company || ''}`,
        `TITLE:${fields.title || ''}`,
        `TEL:${fields.phone || ''}`,
        `EMAIL:${fields.email || ''}`,
        `URL:${fields.website || ''}`,
        `ADR:;;${fields.address || ''};;;;`,
        'END:VCARD',
      ].join('\n')
    default:
      return fields.url || fields.text || ''
  }
}
