import { useEffect, useState } from 'react'
import Landing from './Landing'
import Studio from './Studio'
import Auth from './Auth'
import './styles.css'

type Page = 'home' | 'studio' | 'login' | 'register'
const valid: Page[] = ['home', 'studio', 'login', 'register']

function pageFromHash(): Page {
  const h = window.location.hash.replace('#', '') as Page
  return valid.includes(h) ? h : 'home'
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash)

  useEffect(() => {
    const onHash = () => setPage(pageFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = (p: Page) => {
    window.location.hash = p === 'home' ? '' : p
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }
  return (
    <>
      {page === 'home' && <Landing go={go} />}
      {page === 'studio' && <Studio go={go} />}
      {(page === 'login' || page === 'register') && <Auth go={go} mode={page} />}
    </>
  )
}
