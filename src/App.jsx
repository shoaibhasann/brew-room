import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (showSplash) {
      document.body.classList.add('splash-active')
    } else {
      document.body.classList.remove('splash-active')
    }
  }, [showSplash])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      {!showSplash && (
        <div style={{ background: 'var(--color-bg)' }}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Hero />
          <About />
          <Menu />
          <Gallery />
          <Experience />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  )
}
