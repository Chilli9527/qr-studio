import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft, QrCode, Globe, Type, Wifi, Mail, Phone, MessageSquare, UserRound,
  Palette, Download, Upload, Check, Sparkles, Link2, ChevronDown, Image as ImageIcon,
} from 'lucide-react'
import { buildContent, defaultDesign, downloadCanvas, downloadSVG, renderQR, type DotStyle, type CornerStyle, type QRDesign } from './qr'

type Page = 'home' | 'studio' | 'login' | 'register'
interface Props { go: (page: Page) => void }

const contentTypes = [
  { id: 'url', label: 'Website URL', icon: <Globe size={18} /> },
  { id: 'text', label: 'Plain text', icon: <Type size={18} /> },
  { id: 'wifi', label: 'WiFi', icon: <Wifi size={18} /> },
  { id: 'vcard', label: 'vCard', icon: <UserRound size={18} /> },
  { id: 'email', label: 'Email', icon: <Mail size={18} /> },
  { id: 'phone', label: 'Phone', icon: <Phone size={18} /> },
  { id: 'sms', label: 'SMS', icon: <MessageSquare size={18} /> },
]

const dotStyles: { id: DotStyle; label: string }[] = [
  { id: 'square', label: 'Square' }, { id: 'rounded', label: 'Rounded' },
  { id: 'dots', label: 'Dots' }, { id: 'extra-rounded', label: 'Soft' },
]
const cornerStyles: { id: CornerStyle; label: string }[] = [
  { id: 'square', label: 'Square' }, { id: 'rounded', label: 'Rounded' }, { id: 'extra-rounded', label: 'Circle' },
]
const presets = [
  { fg: '#0F6E56', bg: '#FFFFFF' }, { fg: '#111827', bg: '#FFFFFF' },
  { fg: '#FFFFFF', bg: '#111827' }, { fg: '#1D4ED8', bg: '#FFFFFF' },
  { fg: '#B91C1C', bg: '#FFF7ED' }, { fg: '#6D28D9', bg: '#FFFFFF' },
]

const fieldSchema: Record<string, { key: string; label: string; placeholder: string; type?: string }[]> = {
  url: [{ key: 'url', label: 'Website URL', placeholder: 'https://yourbrand.com' }],
  text: [{ key: 'text', label: 'Your text', placeholder: 'Type anything...' }],
  wifi: [
    { key: 'ssid', label: 'Network name (SSID)', placeholder: 'My WiFi' },
    { key: 'password', label: 'Password', placeholder: 'password123' },
    { key: 'encryption', label: 'Encryption', placeholder: 'WPA' },
    { key: 'hidden', label: 'Hidden network (true/false)', placeholder: 'false' },
  ],
  vcard: [
    { key: 'name', label: 'Full name', placeholder: 'Bruce Lam' },
    { key: 'company', label: 'Company', placeholder: 'Lion AI' },
    { key: 'title', label: 'Job title', placeholder: 'Founder' },
    { key: 'phone', label: 'Phone', placeholder: '+852 9000 0000' },
    { key: 'email', label: 'Email', placeholder: 'hello@yourbrand.com' },
    { key: 'website', label: 'Website', placeholder: 'https://yourbrand.com' },
  ],
  email: [
    { key: 'email', label: 'Email address', placeholder: 'hello@yourbrand.com' },
    { key: 'subject', label: 'Subject', placeholder: 'Hello' },
    { key: 'body', label: 'Message', placeholder: 'Write your message...' },
  ],
  phone: [{ key: 'phone', label: 'Phone number', placeholder: '+852 9000 0000' }],
  sms: [
    { key: 'phone', label: 'Phone number', placeholder: '+852 9000 0000' },
    { key: 'message', label: 'Message', placeholder: 'Hello!' },
  ],
}

export default function Studio({ go }: Props) {
  const [type, setType] = useState('url')
  const [fields, setFields] = useState<Record<string, string>>({ url: 'https://yourbrand.com' })
  const [design, setDesign] = useState<QRDesign>(defaultDesign)
  const [tab, setTab] = useState<'content' | 'design'>('content')
  const [downloaded, setDownloaded] = useState<string | null>(null)
  const [isDynamic, setIsDynamic] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const payload = buildContent(type, fields)

  useEffect(() => {
    if (canvasRef.current) renderQR(canvasRef.current, payload, design)
  }, [payload, design])

  const setField = (k: string, v: string) => setFields((f) => ({ ...f, [k]: v }))
  const setDesignField = <K extends keyof QRDesign>(k: K, v: QRDesign[K]) => setDesign((d) => ({ ...d, [k]: v }))

  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { alert('Logo must be under 2MB'); return }
    const reader = new FileReader()
    reader.onload = () => setDesignField('logo', String(reader.result))
    reader.readAsDataURL(file)
  }

  const doDownload = async (fmt: 'png' | 'jpg' | 'svg') => {
    const name = `qr-code-${Date.now()}`
    if (fmt === 'svg') await downloadSVG(payload, design, `${name}.svg`)
    else if (canvasRef.current) downloadCanvas(canvasRef.current, `${name}.${fmt}`, fmt, design.fg, design.bg)
    setDownloaded(fmt)
    setTimeout(() => setDownloaded(null), 2000)
  }

  return (
    <div className="studio">
      <header className="nav studio-nav">
        <div className="nav-inner">
          <button className="brand" onClick={() => go('home')}>
            <span className="brand-mark"><QrCode size={22} strokeWidth={2.4} /></span>
            <span className="brand-text">QR<br /><b>Generator</b></span>
          </button>
          <div className="nav-actions">
            <button className="btn-ghost" onClick={() => go('home')}><ArrowLeft size={16} /> Back</button>
            <button className="btn-primary sm" onClick={() => go('register')}>Sign up to save</button>
          </div>
        </div>
      </header>

      <div className="studio-head">
        <h1>Create your <span className="green">QR code</span></h1>
        <p>Choose what to share, design it your way, then download.</p>
      </div>

      <div className="studio-layout">
        <div className="studio-panel">
          <div className="studio-tabs">
            <button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}><Link2 size={16} /> Content</button>
            <button className={tab === 'design' ? 'active' : ''} onClick={() => setTab('design')}><Palette size={16} /> Design</button>
          </div>

          {tab === 'content' ? (
            <div className="panel-body">
              <label className="field-label">QR code type</label>
              <div className="type-pills">
                {contentTypes.map((t) => (
                  <button key={t.id} className={type === t.id ? 'active' : ''} onClick={() => { setType(t.id); setFields({}) }}>
                    {t.icon}<span>{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="dynamic-toggle">
                <div>
                  <b><Sparkles size={15} /> Dynamic QR code</b>
                  <span>Edit the destination anytime after printing + scan analytics</span>
                </div>
                <button className={'switch' + (isDynamic ? ' on' : '')} onClick={() => setIsDynamic(!isDynamic)} aria-label="Toggle dynamic QR"><span /></button>
              </div>
              {isDynamic && (
                <div className="dynamic-note">
                  Dynamic QR codes need an account to store the redirect and scan data. <button onClick={() => go('register')}>Sign up</button> to enable this.
                </div>
              )}

              <div className="fields">
                {(fieldSchema[type] || []).map((f) => (
                  <div className="field" key={f.key}>
                    <label className="field-label">{f.label}</label>
                    <input
                      type={f.type || 'text'}
                      value={fields[f.key] || ''}
                      placeholder={f.placeholder}
                      onChange={(e) => setField(f.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="panel-body">
              <label className="field-label">Color presets</label>
              <div className="presets">
                {presets.map((p, i) => (
                  <button key={i} className="preset" style={{ background: p.bg, borderColor: p.fg }} onClick={() => { setDesignField('fg', p.fg); setDesignField('bg', p.bg) }}>
                    <span style={{ background: p.fg }} />
                  </button>
                ))}
              </div>
              <div className="color-row">
                <div className="field"><label className="field-label">Foreground</label><div className="color-input"><input type="color" value={design.fg} onChange={(e) => setDesignField('fg', e.target.value)} /><span>{design.fg}</span></div></div>
                <div className="field"><label className="field-label">Background</label><div className="color-input"><input type="color" value={design.bg} onChange={(e) => setDesignField('bg', e.target.value)} /><span>{design.bg}</span></div></div>
              </div>

              <label className="field-label">Dot style</label>
              <div className="seg">
                {dotStyles.map((d) => <button key={d.id} className={design.dotStyle === d.id ? 'active' : ''} onClick={() => setDesignField('dotStyle', d.id)}>{d.label}</button>)}
              </div>

              <label className="field-label">Corner style</label>
              <div className="seg">
                {cornerStyles.map((d) => <button key={d.id} className={design.cornerStyle === d.id ? 'active' : ''} onClick={() => setDesignField('cornerStyle', d.id)}>{d.label}</button>)}
              </div>

              <div className="field">
                <label className="field-label">Logo (optional)</label>
                <label className="upload">
                  <Upload size={16} /> {design.logo ? 'Replace logo' : 'Upload logo (PNG/JPG, max 2MB)'}
                  <input type="file" accept="image/png,image/jpeg" onChange={onLogo} hidden />
                </label>
                {design.logo && <button className="clear-logo" onClick={() => setDesignField('logo', null)}>Remove logo</button>}
              </div>
              {design.logo && (
                <div className="field">
                  <label className="field-label">Logo size: {design.logoSize}%</label>
                  <input type="range" min="10" max="30" value={design.logoSize} onChange={(e) => setDesignField('logoSize', Number(e.target.value))} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="studio-preview">
          <div className="preview-card">
            <div className="preview-title">Live preview</div>
            <div className="qr-canvas-wrap"><canvas ref={canvasRef} /></div>
            <div className="preview-hint">Tip: keep enough contrast for reliable scanning</div>
            <div className="download-btns">
              <button onClick={() => doDownload('png')}><Download size={16} /> {downloaded === 'png' ? <Check size={16} /> : 'PNG'}</button>
              <button onClick={() => doDownload('svg')}><Download size={16} /> {downloaded === 'svg' ? <Check size={16} /> : 'SVG'}</button>
              <button onClick={() => doDownload('jpg')}><Download size={16} /> {downloaded === 'jpg' ? <Check size={16} /> : 'JPG'}</button>
            </div>
            <button className="btn-primary save-btn" onClick={() => go('register')}>Sign up to save &amp; track scans <Sparkles size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
