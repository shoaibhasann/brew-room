import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.63A2 2 0 0 1 3.78 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/>
  </svg>
)
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const contactInfo = [
  {
    icon: <MapPinIcon />,
    label: 'Address',
    value: '146, Dr Radha Krishnan Salai, Mylapore, Chennai, Tamil Nadu 600004',
    link: 'https://maps.google.com/?q=The+Brew+Room+Chennai',
    action: 'Get Directions',
  },
  {
    icon: <PhoneIcon />,
    label: 'Reservations',
    value: '+91 97109 47380',
    link: 'tel:+919710947380',
    action: 'Call Now',
  },
  {
    icon: <ClockIcon />,
    label: 'Hours',
    value: 'Mon–Fri: 10:00 AM – 11:00 PM\nSat–Sun: 8:00 AM – 11:00 PM',
    link: null,
    action: null,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
          marginBottom: 'clamp(48px, 7vw, 80px)',
        }}>
          <div>
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <div style={{ width: '32px', height: '1px', background: 'var(--color-accent)' }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '12px',
                letterSpacing: '5px',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
              }}>Find Us</span>
            </motion.div>

            <motion.h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: '400',
                color: 'var(--color-text-primary)',
                letterSpacing: '-1px',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Visit Us in<br />
              <em style={{ color: 'var(--color-accent)' }}>Mylapore</em>
            </motion.h2>

            <motion.p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(16px, 2vw, 19px)',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Tucked within the gardens of The Savera Hotel, we're a serene escape just moments from the heart of Mylapore. Weekday mornings are our quietest — perfect for focused work or intimate conversation.
            </motion.p>
          </div>

          {/* Quick reserve card */}
          <motion.div
            style={{
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
              borderRadius: '20px',
              padding: 'clamp(28px, 4vw, 48px)',
              position: 'relative',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Background decor */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>☕</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(26px, 4vw, 36px)',
                fontWeight: '400',
                color: '#fff',
                marginBottom: '12px',
                lineHeight: 1.1,
              }}>
                Reserve Your Table
              </h3>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '17px',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
                marginBottom: '28px',
              }}>
                For groups of 5 or more, we recommend calling ahead to ensure the best garden experience.
              </p>
              <motion.a
                href="tel:+919710947380"
                style={{
                  display: 'inline-block',
                  background: '#fff',
                  color: 'var(--color-accent-dark)',
                  borderRadius: '6px',
                  padding: '14px 28px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Call to Reserve
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Info cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '16px',
          marginBottom: 'clamp(40px, 6vw, 60px)',
        }}>
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.label}
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '14px',
                padding: 'clamp(20px, 3vw, 32px)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ borderColor: 'var(--color-accent)', y: -4 }}
            >
              <div style={{
                color: 'var(--color-accent)',
                marginBottom: '14px',
              }}>
                {info.icon}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
                marginBottom: '8px',
              }}>{info.label}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '17px',
                color: 'var(--color-text-primary)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
                marginBottom: info.action ? '16px' : 0,
              }}>{info.value}</div>
              {info.link && info.action && (
                <motion.a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  whileHover={{ gap: '10px' }}
                >
                  {info.action} →
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Map embed placeholder */}
        <motion.div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            height: 'clamp(280px, 40vw, 420px)',
            border: '1px solid var(--color-border)',
            position: 'relative',
            background: 'var(--color-card)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <iframe
            title="The Brew Room location"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block', filter: 'var(--map-filter, none)' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0!2d80.2707!3d13.0359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526791d68d22c3%3A0x7fc0a2fb5b1b3614!2sThe%20Brew%20Room!5e0!3m2!1sen!2sin!4v1"
          />
          {/* Overlay for dark mode */}
          <style>{`
            [data-theme="dark"] iframe { filter: invert(0.92) hue-rotate(180deg); }
          `}</style>
        </motion.div>
      </div>
    </section>
  )
}
