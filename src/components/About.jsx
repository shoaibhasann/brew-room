import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '4.4★', label: 'Google Rating', sub: '3,421 reviews' },
  { value: '#1', label: 'Afternoon Tea', sub: 'In Chennai' },
  { value: '14+', label: 'Years', sub: 'Of excellence' },
  { value: '∞', label: 'Memories', sub: 'Created daily' },
]

const features = [
  {
    icon: '☕',
    title: 'Artisan Coffee',
    desc: 'Meticulously brewed cappuccinos, flat whites, cold brews and espresso blends — every cup a masterpiece.',
  },
  {
    icon: '🌿',
    title: 'Garden Setting',
    desc: 'Serene outdoor seating under gazebos, surrounded by lush hotel gardens. A true urban escape.',
  },
  {
    icon: '🍽️',
    title: 'European Cuisine',
    desc: 'All-day breakfast, Italian and Mexican specialties, fresh bakes and indulgent desserts.',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section label */}
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '60px',
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div style={{ width: '32px', height: '1px', background: 'var(--color-accent)' }} />
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '12px',
          letterSpacing: '5px',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
        }}>Our Story</span>
      </motion.div>

      {/* Two column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
        marginBottom: 'clamp(60px, 10vw, 100px)',
      }}>
        {/* Left — text */}
        <div>
          <motion.h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: '400',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              marginBottom: '28px',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            A garden cafe like<br />
            <em style={{ color: 'var(--color-accent)' }}>no other</em>
          </motion.h2>

          <motion.p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(17px, 2vw, 20px)',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              marginBottom: '20px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Nestled within The Savera Hotel's lush gardens in Mylapore, The Brew Room is more than a cafe — it's a sanctuary. A place where the hum of the city fades into birdsong, and every visit feels like a well-deserved pause.
          </motion.p>

          <motion.p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(17px, 2vw, 20px)',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              marginBottom: '36px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Our rustic-modern aesthetic, thoughtfully curated menu, and artisan coffee make The Brew Room the crown jewel of Chennai's cafe culture — consistently ranked #1 for afternoon tea in the city.
          </motion.p>

          <motion.a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              textDecoration: 'none',
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            whileHover={{ gap: '16px' }}
          >
            Plan Your Visit
            <span style={{ fontSize: '18px' }}>→</span>
          </motion.a>
        </div>

        {/* Right — image collage */}
        <motion.div
          style={{ position: 'relative', height: 'clamp(380px, 50vw, 520px)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main image */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: '20%',
              bottom: '20%',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=85&fit=crop"
              alt="Cafe garden ambiance"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom right, transparent 60%, rgba(13,10,7,0.3))',
            }} />
          </motion.div>

          {/* Secondary image */}
          <motion.div
            style={{
              position: 'absolute',
              top: '25%',
              right: 0,
              width: '42%',
              bottom: 0,
              borderRadius: '12px',
              overflow: 'hidden',
              border: '3px solid var(--color-bg)',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            initial={{ x: 20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=85&fit=crop"
              alt="Artisan coffee"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>

          {/* Floating accent card */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '5%',
              background: 'var(--color-accent)',
              borderRadius: '10px',
              padding: '16px 20px',
              boxShadow: '0 20px 40px rgba(212,160,85,0.4)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -4 }}
          >
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: '600', color: '#fff' }}>10AM</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.8)', letterSpacing: '1px', marginTop: '2px' }}>OPEN DAILY — 11PM</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1px',
        background: 'var(--color-border)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            style={{
              background: 'var(--color-surface)',
              padding: 'clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px)',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            whileHover={{ background: 'var(--color-card)' }}
          >
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '400',
              color: 'var(--color-accent)',
              marginBottom: '6px',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              letterSpacing: '0.3px',
            }}>
              {stat.label}
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              marginTop: '2px',
            }}>
              {stat.sub}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginTop: 'clamp(40px, 6vw, 70px)',
      }}>
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: 'clamp(24px, 3vw, 36px)',
              cursor: 'default',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
            whileHover={{ y: -6, borderColor: 'var(--color-accent)', boxShadow: '0 20px 40px rgba(212,160,85,0.12)' }}
          >
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              fontWeight: '500',
              color: 'var(--color-text-primary)',
              marginBottom: '10px',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
            }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
