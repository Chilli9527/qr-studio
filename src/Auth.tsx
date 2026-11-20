import { useState } from 'react'
import { ArrowLeft, QrCode, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'

type Page = 'home' | 'studio' | 'login' | 'register'
interface Props { go: (page: Page) => void; mode: 'login' | 'register' }

export default function Auth({ go, mode }: Props) {
  const isReg = mode === 'register'
  const [showPw, setShowPw] = useState(false)
  const [notice, setNotice] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setNotice(true)
  }

  return (
    <div className="auth-page">
      <header className="nav studio-nav">
        <div className="nav-inner">
          <button className="brand" onClick={() => go('home')}>
            <span className="brand-mark"><QrCode size={22} strokeWidth={2.4} /></span>
            <span className="brand-text">QR<br /><b>Generator</b></span>
          </button>
          <div className="nav-actions"><button className="btn-ghost" onClick={() => go('home')}><ArrowLeft size={16} /> Home</button></div>
        </div>
      </header>

      <div className="auth-wrap">
        <div className="auth-card">
          <h1>{isReg ? 'Create a free account' : 'Welcome back'}</h1>
          <p className="auth-sub">{isReg ? 'Sign Up to Online QR Generator' : 'Sign in to manage and track your QR codes'}</p>

          <form onSubmit={submit}>
            {isReg && <div className="auth-field"><span className="auth-ico"><Mail size={17} /></span><input type="email" placeholder="Email" required /></div>}
            <div className="auth-field"><span className="auth-ico"><Mail size={17} /></span><input type="email" placeholder="Email" required /></div>
            <div className="auth-field"><span className="auth-ico"><Lock size={17} /></span><input type={showPw ? 'text' : 'password'} placeholder="Password" required /><button type="button" className="eye" onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
            <button className="btn-primary auth-submit" type="submit">{isReg ? 'Sign Up' : 'Sign in'}</button>
          </form>

          {notice && <div className="auth-notice"><Sparkles size={16} /><span>Account system is being connected. The QR generator is fully usable now — sign up to save &amp; track codes once live.</span></div>}

          <div className="auth-or"><span>OR</span></div>
          <div className="social-btns">
            <button><span className="g">G</span> Google</button>
            <button><span className="f">f</span> Facebook</button>
            <button><span className="m">M</span> Microsoft</button>
            <button><span className="a"></span> Apple</button>
          </div>

          <p className="auth-switch">
            {isReg ? 'Already have an account? ' : "Don't have an account? "}
            <button onClick={() => go(isReg ? 'login' : 'register')}>{isReg ? 'Sign in' : 'Sign up'}</button>
          </p>
          {isReg && <p className="auth-terms">By creating an account, you agree to our <a href="#terms">Terms &amp; Conditions</a> and the <a href="#privacy">Privacy Policy</a>.</p>}
        </div>
      </div>
    </div>
  )
}
