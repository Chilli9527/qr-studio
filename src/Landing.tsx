import { useState } from 'react'
import {
  ArrowRight, Check, Sparkles, BarChart3, Palette, Layers, MousePointerClick,
  Download, Settings2, Globe, FileText, Mail, Wifi, Video, Image as ImageIcon,
  Smartphone, ChevronDown, Menu, X, QrCode, ScanLine, Pencil, Share2, Folder,
} from 'lucide-react'

type Page = 'home' | 'studio' | 'login' | 'register'

interface Props {
  go: (page: Page) => void
}

const qrTypes = [
  { name: 'vCard', icon: <Globe size={22} /> },
  { name: 'Email', icon: <Mail size={22} /> },
  { name: 'Website', icon: <Globe size={22} /> },
  { name: 'PDF', icon: <FileText size={22} /> },
  { name: 'Image', icon: <ImageIcon size={22} /> },
  { name: 'Video', icon: <Video size={22} /> },
  { name: 'WiFi', icon: <Wifi size={22} /> },
  { name: 'App store', icon: <Smartphone size={22} /> },
]

const features = [
  { title: 'High-tech QR codes', desc: 'Access advanced functionalities with our dynamic QR code generator. Customize colors, layout, and logo on various QR code types and easily scan them on any device.', color: '#E6F1FB', icon: <QrCode size={20} /> },
  { title: 'High conversion rates', desc: 'Create high-performing QR codes that accurately represent your brand and design, resulting in high scan rates.', color: '#E1F5EE', icon: <MousePointerClick size={20} /> },
  { title: 'Real-time analytics', desc: 'Boost your marketing campaigns with real-time analytics for each QR code that shows when, where and how many times your QR codes were scanned.', color: '#FAEEDA', icon: <BarChart3 size={20} /> },
  { title: 'Easy landing pages', desc: "There's no need to build a website. Quickly create customizable landing pages for all of your QR code needs.", color: '#FAECE7', icon: <Layers size={20} /> },
  { title: 'Multiple types of QR codes', desc: 'Easily create various QR code types with customized options. From image QR code to PDF QR code or even video QR code.', color: '#EEEDFE', icon: <FileText size={20} /> },
  { title: 'Full customization', desc: 'Bring your QR codes to life by customizing them with our endless array of easy-to-use options. Stand out from the competition.', color: '#FBEAF0', icon: <Palette size={20} /> },
  { title: 'Easily download, share & edit', desc: 'Keep the highest resolution for your QR codes. Download in JPG, PNG, or SVG and edit their content at any time.', color: '#E1F5EE', icon: <Download size={20} /> },
  { title: 'Get started now!', desc: 'Ready to create your first QR code? Take advantage of our free QR code generator by signing up today!', color: '#E6F1FB', icon: <Sparkles size={20} /> },
]

const steps = [
  { n: 1, title: 'Choose your QR code content', desc: 'Decide what you want to share. You can use URLs, videos, apps, and more!', color: '#16A34A' },
  { n: 2, title: 'Customize your design', desc: "Personalize your QR code's color, shape, and style to create a unique design that matches your brand!", color: '#6366F1' },
  { n: 3, title: 'Download your QR code', desc: 'Save your QR code as a PNG, SVG, JPG or EPS. Print it or share it digitally!', color: '#0EA5E9' },
]

const faqs = [
  { q: 'What is a QR code generator?', a: 'A QR code generator is a tool that allows you to make your own QR codes. These codes can be customized to contain data of your choice. People can scan these codes on their smartphones and they will be sent to the content you point them to, whether it is a website, a video or a social media profile.' },
  { q: "What's the difference between static and dynamic QR codes?", a: 'Static QR codes cannot be modified once generated. Dynamic QR codes are editable at any time — you can print the code, distribute it, and change the link it points to later. Dynamic QR codes can also collect time, location and frequency statistics.' },
  { q: 'What data is collected in dynamic QR code scans?', a: 'We collect how often your QR codes are scanned, where and how they are scanned, the devices and operating systems used, total scans and unique scanners — with charts and Excel export.' },
  { q: 'Can I customize my QR codes or use different colors?', a: 'Yes! Customize your QR codes with different designs and colors, different dot shapes and corners, and even use your own logo as part of the design.' },
  { q: 'Is there a limit to how many QR codes I can create?', a: 'No, you can create as many QR codes as you want. Easily manage your QR codes with folders accessible from the dashboard.' },
  { q: 'In which formats can I download my QR code?', a: 'Export any time from your account in PNG, JPG, SVG and EPS — always in the highest resolution available.' },
  { q: 'Can I use the QR codes generated in the trial for commercial purposes?', a: 'Of course! Our trial gives you access to everything a paid plan has to offer, so you can use it for your business.' },
  { q: 'What happens to my QR codes after the trial ends?', a: 'Your QR codes remain in your dashboard, but you will not be able to access them or the collected data until you take out a paid plan.' },
]

export default function Landing({ go }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="site">
      <header className="nav">
        <div className="nav-inner">
          <button className="brand" onClick={() => go('home')}>
            <span className="brand-mark"><QrCode size={22} strokeWidth={2.4} /></span>
            <span className="brand-text">QR<br /><b>Generator</b></span>
          </button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <button onClick={() => go('studio')}>Create QR</button>
            <a href="#features">Features</a>
            <a href="#types">QR types</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-actions">
            <button className="btn-ghost" onClick={() => go('login')}>Log in</button>
            <button className="btn-primary sm" onClick={() => go('register')}>Sign up</button>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-blob" />
        <div className="hero-inner">
          <h1>We make QR codes <span className="underline-green">easy</span></h1>
          <div className="hero-checks">
            <span><Check size={16} /> Generate dynamic, editable QR codes</span>
            <span><Check size={16} /> Track performance with analytics</span>
            <span><Check size={16} /> Design QR codes with logo, colors &amp; shapes</span>
          </div>
          <button className="btn-primary hero-cta" onClick={() => go('studio')}><Sparkles size={17} /> Create QR code</button>
          <div className="hero-mockup">
            <div className="mock-window">
              <div className="mock-sidebar">
                <div className="mock-logo"><QrCode size={14} /> My QR Codes</div>
                {['Dashboard', 'QR Codes', 'Analytics', 'Landing Pages', 'Folders'].map((x, i) => (
                  <div key={x} className={'mock-navitem' + (i === 1 ? ' active' : '')}>{x}</div>
                ))}
              </div>
              <div className="mock-main">
                <div className="mock-top"><span>My QR Codes</span><span className="mock-new">+ Create New</span></div>
                <div className="mock-stats">
                  <div><b>12</b><span>Total QR codes</span></div>
                  <div><b>8,492</b><span>Total scans</span></div>
                  <div><b>1,204</b><span>Unique scans</span></div>
                  <div><b>6</b><span>Landing pages</span></div>
                </div>
                <div className="mock-tabs">All &nbsp;·&nbsp; Active &nbsp;·&nbsp; Archived</div>
                {['https://yourbrand.com/summer', 'https://yourbrand.com/menu', 'https://yourbrand.com/contact'].map((u, i) => (
                  <div className="mock-row" key={u}>
                    <div className={'mock-thumb t' + i}><QrCode size={18} /></div>
                    <div className="mock-rowinfo"><b>{['Summer Campaign', 'Restaurant Menu', 'Contact Card'][i]}</b><span>{u}</span></div>
                    <span className="mock-badge">Active</span>
                    <span className="mock-edit">Edit</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mock-phone">
              <div className="mock-phone-notch" />
              <div className="mock-phone-qr"><QrCode size={70} /></div>
              <b>Your Brand</b>
              <span>Scan for 15% off</span>
              <div className="mock-phone-btn" />
            </div>
          </div>
        </div>
      </section>

      <section className="section steps-section">
        <h2>Create your <br /><span className="green">QR code in three simple steps</span></h2>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={s.n}>
              <div className="step-num" style={{ background: s.color }}>{s.n}</div>
              {i < steps.length - 1 && <div className="step-line" />}
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={() => go('studio')}>Create your QR code <ArrowRight size={17} /></button>
      </section>

      <section className="section features-section" id="features">
        <h2>Experience the most <span className="green">advanced QR code generator</span></h2>
        <p className="section-lead">Our QR code software is highly functional and customizable, yet easy to use for all. It's the only tool you'll need to build powerful, high-performing QR codes that can boost engagement and drive conversions.</p>
        <div className="feature-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section types-section" id="types">
        <h2>QR codes that <span className="green">fit your needs</span></h2>
        <p className="section-lead">With our wide selection of QR codes, choose the right type to fit your specific needs. Whether it's to share a website or a business, promote a social media account or display your contact information.</p>
        <div className="types-grid">
          {qrTypes.map((t) => (
            <button className="type-card" key={t.name} onClick={() => go('studio')}>
              <span className="type-icon">{t.icon}</span>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <h2>Frequently asked <span className="green">questions</span></h2>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div className={'faq-item' + (openFaq === i ? ' open' : '')} key={f.q}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span><ChevronDown size={18} />
              </button>
              {openFaq === i && <p>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <h2>Ready to get <span className="green">started?</span></h2>
          <p>Sign up today to build your customizable and fully trackable QR codes. Unlock advanced insights, implement your branding and make updates to your QR codes at any time.</p>
          <button className="btn-primary" onClick={() => go('register')}>Create your QR code <ArrowRight size={17} /></button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-mark"><QrCode size={20} /></span>
            <b>QR Generator</b>
            <p>We make QR codes easy. Create, manage and track your QR codes in one place.</p>
          </div>
          <div className="footer-col"><h4>Product</h4><a href="#features">Features</a><a href="#types">QR types</a><button onClick={() => go('studio')}>Create QR</button></div>
          <div className="footer-col"><h4>Company</h4><a href="#faq">FAQ</a><button onClick={() => go('login')}>Log in</button><button onClick={() => go('register')}>Sign up</button></div>
          <div className="footer-col"><h4>Legal</h4><a href="#terms">Terms &amp; Conditions</a><a href="#privacy">Privacy Policy</a></div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} QR Generator. All rights reserved.</div>
      </footer>
    </div>
  )
}
