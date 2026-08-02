import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { EASE } from './ui'
import { SITE, NAV_LINKS } from '../data/site'
import { stopScroll, startScroll } from '../lib/scroll'

/* ─────────────────────────────────────────────────────────────
   NAVBAR — fixed editorial top bar on the cream paper site.
   Transparent at the top of the page (espresso ink straight on
   paper), condensing to a blurred paper bar with a hairline
   border on scroll.
   Mobile (<880px): full-screen overlay menu with staggered
   Playfair links and gold index numbers.
   ───────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()
  const overlayRef = useRef(null)

  /* Scroll condensation */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Body scroll lock while the overlay is open (class lives in index.css);
     Lenis must pause too — CSS overflow alone doesn't stop its scrolling */
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    if (menuOpen) stopScroll()
    else if (!document.body.classList.contains('splash-active')) startScroll()
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  /* Close on Escape / viewport growth; trap Tab inside the overlay and
     return focus to the burger button on close */
  useEffect(() => {
    if (!menuOpen) return
    const opener = document.activeElement
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const overlay = overlayRef.current
      if (!overlay) return
      const nodes = overlay.querySelectorAll('a[href], button')
      if (!nodes.length) return
      const list = [...nodes]
      const first = list[0]
      const last = list[list.length - 1]
      if (!overlay.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 880px)')
    const onChange = () => mq.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    /* Focus the first link once the overlay has mounted */
    const focusTimer = requestAnimationFrame(() => {
      overlayRef.current?.querySelector('a[href]')?.focus()
    })
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
      cancelAnimationFrame(focusTimer)
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [menuOpen])

  const condensed = scrolled && !menuOpen

  /* Backgrounds derive from the paper tokens themselves — no
     literals to drift out of sync */
  const barBg = condensed
    ? 'color-mix(in srgb, var(--color-bg) 88%, transparent)'
    : 'transparent'
  const overlayBg = 'color-mix(in srgb, var(--color-bg) 98%, transparent)'

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--color-text-secondary);
          padding: 8px 2px;
          transition: color 0.3s var(--ease-lux);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 2px;
          right: 2px;
          bottom: 2px;
          height: 1px;
          background: var(--color-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s var(--ease-lux);
        }
        .nav-link:hover { color: var(--color-accent); }
        .nav-link:hover::after { transform: scaleX(1); }

        .nav-iconbtn {
          width: 44px;
          height: 44px;
          flex: none;
          border-radius: 50%;
          border: 1px solid var(--color-border-strong);
          background: transparent;
          color: var(--color-text-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.3s var(--ease-lux), color 0.3s var(--ease-lux);
        }
        .nav-iconbtn:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .nav-burger { display: none; }

        /* Hamburger ⇄ cross morph — same three bars, animated in place */
        .nav-burger-lines {
          position: relative;
          width: 20px;
          height: 14px;
          display: block;
        }
        .nav-burger-lines span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1.8px;
          border-radius: 2px;
          background: currentColor;
          transition: transform 0.42s var(--ease-lux), opacity 0.28s var(--ease-lux),
                      top 0.42s var(--ease-lux);
        }
        .nav-burger-lines span:nth-child(1) { top: 0; }
        .nav-burger-lines span:nth-child(2) { top: 6.1px; }
        .nav-burger-lines span:nth-child(3) { top: 12.2px; }
        .nav-burger--open .nav-burger-lines span:nth-child(1) {
          top: 6.1px;
          transform: rotate(45deg);
        }
        .nav-burger--open .nav-burger-lines span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0.35);
        }
        .nav-burger--open .nav-burger-lines span:nth-child(3) {
          top: 6.1px;
          transform: rotate(-45deg);
        }

        /* display lives here (not inline) so the media queries below can win */
        .nav-desktop { display: flex; }

        .nav-mlink {
          color: var(--color-text-primary);
          transition: color 0.3s var(--ease-lux);
        }
        .nav-mlink:hover,
        .nav-mlink:focus-visible { color: var(--color-accent); }

        .nav-contact a {
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.3s var(--ease-lux);
        }
        .nav-contact a:hover { color: var(--color-accent); }

        @media (max-width: 879px) {
          .nav-desktop, .nav-reserve-wrap { display: none; }
          .nav-burger { display: inline-flex; }
        }
        @media (min-width: 880px) {
          .nav-overlay { display: none !important; }
        }
      `}</style>

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          background: barBg,
          borderBottom: `1px solid ${condensed ? 'var(--color-border)' : 'transparent'}`,
          backdropFilter: condensed ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: condensed ? 'blur(20px)' : 'none',
          padding: condensed ? '12px 0' : '26px 0',
          transition:
            'background-color 0.4s var(--ease-lux), border-color 0.4s var(--ease-lux), padding 0.4s var(--ease-lux)',
        }}
      >
        <div
          className="container-site"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(20px, 3vw, 44px)',
          }}
        >
          {/* Wordmark */}
          <a
            href="#"
            aria-label="The Brew Room — back to top"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 4,
              lineHeight: 1,
              textDecoration: 'none',
              flex: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.46em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              The
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '0.005em',
                color: 'var(--color-text-primary)',
              }}
            >
              Brew Room
            </span>
          </a>

          {/* Desktop links */}
          <nav
            className="nav-desktop"
            aria-label="Primary"
            style={{
              alignItems: 'center',
              gap: 'clamp(18px, 2.4vw, 34px)',
              marginLeft: 'auto',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} className="nav-link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right cluster */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginLeft: 'auto',
            }}
          >
            <div className="nav-reserve-wrap">
              <a
                href="#reservation"
                className="btn btn-primary"
                style={{ padding: '13px 28px', minHeight: 44 }}
              >
                Reserve
              </a>
            </div>

            <button
              type="button"
              className={`nav-iconbtn nav-burger ${menuOpen ? 'nav-burger--open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="nav-mobile-menu"
            >
              {/* three lines morph into a cross in place */}
              <span className="nav-burger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nav-mobile-menu"
            className="nav-overlay"
            ref={overlayRef}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: EASE } }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1090,
              background: overlayBg,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            <nav
              aria-label="Mobile"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 'clamp(6px, 1.6vh, 16px)',
                padding: '120px var(--gutter) 40px',
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <div
                  key={link.href}
                  style={{
                    overflow: 'hidden',
                    /* descender slack for display-serif tails (see ui.jsx Reveal) */
                    padding: '0 0.14em 0.16em',
                    margin: '0 -0.14em -0.16em',
                  }}
                >
                  <motion.a
                    href={link.href}
                    className="nav-mlink"
                    onClick={() => setMenuOpen(false)}
                    initial={reduce ? { opacity: 0 } : { y: '110%' }}
                    animate={reduce ? { opacity: 1 } : { y: 0 }}
                    exit={
                      reduce
                        ? { opacity: 0, transition: { duration: 0.25 } }
                        : { y: '110%', transition: { duration: 0.4, ease: EASE } }
                    }
                    transition={{
                      duration: 0.85,
                      delay: 0.12 + i * 0.07,
                      ease: EASE,
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 20,
                      textDecoration: 'none',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(36px, 9vw, 52px)',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.15,
                      padding: '4px 0',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.3em',
                        color: 'var(--color-accent)',
                        flex: 'none',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </nav>

            <motion.div
              className="nav-contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{
                borderTop: '1px solid var(--color-border)',
                padding: '26px var(--gutter) 42px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <a
                href={SITE.phoneHref}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  letterSpacing: '0.06em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: 44,
                }}
              >
                {SITE.phone}
              </a>
              <p
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {SITE.address}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
