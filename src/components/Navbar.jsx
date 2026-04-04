import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '14px 0' : '24px 0',
          background: scrolled
            ? theme === 'dark'
              ? 'rgba(13,10,7,0.92)'
              : 'rgba(250,248,245,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <motion.a
            href="#"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '10px',
              letterSpacing: '4px',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
            }}>The</span>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              fontWeight: '500',
              color: 'var(--color-text-primary)',
              lineHeight: 1,
              letterSpacing: '-0.5px',
            }}>Brew Room</span>
          </motion.a>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="desktop-nav">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  position: 'relative',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ color: 'var(--color-accent)' }}
              >
                {link.label}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    height: '1px',
                    background: 'var(--color-accent)',
                    width: 0,
                  }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.25 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '50px',
                padding: '8px 14px',
                cursor: 'pointer',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              whileHover={{ scale: 1.05, borderColor: 'var(--color-accent)' }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Reserve CTA - desktop */}
            <motion.a
              href="#contact"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(212,160,85,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="desktop-cta"
            >
              Reserve
            </motion.a>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-primary)',
                padding: '4px',
                display: 'none',
              }}
              className="mobile-menu-btn"
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: theme === 'dark' ? 'rgba(13,10,7,0.98)' : 'rgba(250,248,245,0.98)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
            }}
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(32px, 8vw, 48px)',
                  fontWeight: '400',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                whileHover={{ color: 'var(--color-accent)', x: 8 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              style={{
                background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
                padding: '14px 40px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginTop: '16px',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileTap={{ scale: 0.97 }}
            >
              Reserve a Table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
