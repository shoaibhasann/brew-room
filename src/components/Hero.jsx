import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Premium coffee/cafe images from Unsplash (free to use)
const heroImages = [
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1400&q=85&fit=crop',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1400&q=85&fit=crop',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=85&fit=crop',
]

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
)

const ArrowDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      id="home"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Parallax background image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          y: bgY,
        }}
      >
        <img
          src={heroImages[0]}
          alt="The Brew Room cafe ambiance"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          loading="eager"
        />
        {/* Layered overlays for depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(13,10,7,0.5) 0%, rgba(13,10,7,0.3) 40%, rgba(13,10,7,0.7) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(13,10,7,0.6) 100%)',
        }} />
      </motion.div>

      {/* Floating badge - top right */}
      <motion.div
        style={{
          position: 'absolute',
          top: '120px',
          right: 'clamp(20px, 4vw, 60px)',
          background: 'rgba(13,10,7,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,160,85,0.3)',
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div style={{ display: 'flex', gap: '3px' }}>
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '600', color: '#f0e8d8' }}>4.4</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#a89070', letterSpacing: '0.5px' }}>3,421 Reviews</span>
        <div style={{ height: '1px', width: '100%', background: 'rgba(212,160,85,0.2)', margin: '4px 0' }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#d4a055', letterSpacing: '1px', textTransform: 'uppercase' }}>#1 Afternoon Tea</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 clamp(20px, 5vw, 60px)',
          maxWidth: '900px',
          y: textY,
          opacity,
        }}
      >
        {/* Pre-heading */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div style={{ height: '1px', width: '40px', background: 'var(--color-accent)' }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '13px',
            letterSpacing: '5px',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
          }}>
            Mylapore, Chennai
          </span>
          <div style={{ height: '1px', width: '40px', background: 'var(--color-accent)' }} />
        </motion.div>

        {/* Main heading */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(52px, 9vw, 100px)',
              fontWeight: '400',
              color: '#f0e8d8',
              lineHeight: 0.92,
              letterSpacing: '-2px',
              marginBottom: '8px',
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Where Coffee
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(52px, 9vw, 100px)',
              fontWeight: '400',
              color: 'var(--color-accent)',
              lineHeight: 0.92,
              letterSpacing: '-2px',
              marginBottom: '8px',
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Meets Soul
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'rgba(240,232,216,0.75)',
            maxWidth: '520px',
            margin: '28px auto 0',
            lineHeight: 1.7,
            letterSpacing: '0.3px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          A serene garden cafe nestled within The Savera Hotel. Artisan brews, European cuisine, and rustic-modern beauty — all under the Chennai sky.
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginTop: '44px',
            flexWrap: 'wrap',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
        >
          <motion.a
            href="#menu"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px',
              padding: '16px 36px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(212,160,85,0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Menu
          </motion.a>
          <motion.a
            href="#about"
            style={{
              background: 'transparent',
              color: '#f0e8d8',
              textDecoration: 'none',
              borderRadius: '4px',
              padding: '16px 36px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              border: '1px solid rgba(240,232,216,0.3)',
              backdropFilter: 'blur(8px)',
            }}
            whileHover={{ scale: 1.04, borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
            whileTap={{ scale: 0.97 }}
          >
            Our Story
          </motion.a>
        </motion.div>

        {/* Location pill */}
        <motion.div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '40px',
            background: 'rgba(13,10,7,0.5)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(240,232,216,0.1)',
            borderRadius: '50px',
            padding: '8px 16px',
            color: 'rgba(240,232,216,0.6)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <LocationIcon />
          146, Dr Radha Krishnan Salai, Mylapore, Chennai 600004
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(240,232,216,0.5)',
          cursor: 'pointer',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown />
        </motion.div>
      </motion.div>
    </section>
  )
}
