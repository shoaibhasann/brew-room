import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const reviews = [
  {
    name: 'Aishwarya M.',
    rating: 5,
    date: 'Jan 2025',
    text: 'Hands down the best cafe in Chennai. The garden setting is magical — feels like you\'ve been transported somewhere else entirely. Cold brew is absolutely perfect.',
    avatar: 'A',
  },
  {
    name: 'Rahul S.',
    rating: 5,
    date: 'Mar 2025',
    text: 'Came for the eggs benedict, stayed for the vibe. The outdoor gazebo seating is so peaceful on weekday mornings. The staff are genuinely warm and attentive.',
    avatar: 'R',
  },
  {
    name: 'Priya N.',
    rating: 5,
    date: 'Feb 2025',
    text: 'The salted caramel shake is life-changing. Gorgeous rustic interiors, thoughtful menu. Easily the most Instagrammable cafe in Mylapore. Will be back every week!',
    avatar: 'P',
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      id="experience"
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Parallax background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-15%',
          y: bgY,
          zIndex: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1400&q=85&fit=crop"
          alt="Cafe atmosphere"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--color-bg) 0%, rgba(13,10,7,0.85) 40%, rgba(13,10,7,0.9) 100%)',
        }} />
      </motion.div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 80px)' }}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <div style={{ width: '32px', height: '1px', background: 'var(--color-accent)' }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '12px',
              letterSpacing: '5px',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
            }}>Guest Voices</span>
            <div style={{ width: '32px', height: '1px', background: 'var(--color-accent)' }} />
          </motion.div>

          <motion.h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: '400',
              color: '#f0e8d8',
              letterSpacing: '-1px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            What Our Guests <em style={{ color: 'var(--color-accent)' }}>Say</em>
          </motion.h2>
        </div>

        {/* Reviews grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '20px',
          marginBottom: 'clamp(60px, 8vw, 100px)',
        }}>
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              style={{
                background: 'rgba(13,10,7,0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(212,160,85,0.2)',
                borderRadius: '16px',
                padding: 'clamp(24px, 3vw, 36px)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              whileHover={{ borderColor: 'rgba(212,160,85,0.5)', y: -4 }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(review.rating)].map((_, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.15 + j * 0.05 }}
                    style={{ fontSize: '14px' }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: 1.75,
                color: 'rgba(240,232,216,0.85)',
                marginBottom: '24px',
              }}>
                "{review.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#fff',
                }}>
                  {review.avatar}
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#f0e8d8',
                  }}>{review.name}</div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    color: '#a89070',
                  }}>Google Review · {review.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee strip — hours/info */}
        <motion.div
          style={{
            borderTop: '1px solid rgba(212,160,85,0.2)',
            borderBottom: '1px solid rgba(212,160,85,0.2)',
            padding: '18px 0',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            style={{
              display: 'flex',
              gap: '60px',
              whiteSpace: 'nowrap',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '15px',
              letterSpacing: '2px',
              color: 'rgba(212,160,85,0.7)',
              textTransform: 'uppercase',
            }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} style={{ display: 'flex', gap: '60px' }}>
                <span>Mon–Fri: 10AM – 11PM</span>
                <span>·</span>
                <span>Sat–Sun: 8AM – 11PM</span>
                <span>·</span>
                <span>+91 97109 47380</span>
                <span>·</span>
                <span>Mylapore, Chennai</span>
                <span>·</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
