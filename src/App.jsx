import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis, stopScroll, startScroll } from './lib/scroll'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import About from './components/About'
import Signature from './components/Signature'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Experience from './components/Experience'
import Reservation from './components/Reservation'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  /* Flips at the START of the splash's exit slide, so the hero's
     entrance choreography plays while the curtain lifts. */
  const [revealed, setRevealed] = useState(false)

  /* The splash must always reveal the very top of the page — kill the
     browser's scroll restoration and pin to 0 while the curtain is up */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('splash-active', showSplash)
    if (showSplash) stopScroll()
    else startScroll()
  }, [showSplash])

  /* Lenis smooth scrolling — skipped for reduced-motion users */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: { offset: -72 },
    })
    setLenis(lenis)
    if (document.body.classList.contains('splash-active')) lenis.stop()

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {showSplash && (
        <SplashScreen
          onExitStart={() => {
            window.scrollTo(0, 0)
            setRevealed(true)
          }}
          onComplete={() => setShowSplash(false)}
        />
      )}
      <div style={{ background: 'var(--color-bg)' }}>
        <Navbar />
        <main>
          {/* Remounts as the splash curtain lifts so the hero's
              entrance plays in view, not hidden behind the overlay */}
          <Hero key={revealed ? 'live' : 'staged'} />
          <Ticker />
          <About />
          <Signature />
          <Menu />
          <Gallery />
          <Experience />
          <Reservation />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
