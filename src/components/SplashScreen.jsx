import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CoffeeCupSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Steam wisps */}
    <motion.path
      d="M28 18 Q30 12 28 6"
      stroke="#d4a055"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
    />
    <motion.path
      d="M40 16 Q42 10 40 4"
      stroke="#d4a055"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
    />
    <motion.path
      d="M52 18 Q54 12 52 6"
      stroke="#d4a055"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
    />
    {/* Cup body */}
    <motion.path
      d="M18 26 L22 68 Q22 72 26 72 L54 72 Q58 72 58 68 L62 26 Z"
      fill="#1a0f05"
      stroke="#d4a055"
      strokeWidth="1.5"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    />
    {/* Coffee surface */}
    <motion.ellipse
      cx="40" cy="28" rx="22" ry="4"
      fill="#3d1f00"
      stroke="#d4a055"
      strokeWidth="1"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    />
    {/* Latte art spiral */}
    <motion.path
      d="M40 30 Q44 32 40 34 Q36 36 40 38 Q44 40 40 42"
      stroke="#c8943a"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.7 }}
      transition={{ duration: 1.2, delay: 0.9 }}
    />
    {/* Handle */}
    <motion.path
      d="M60 34 Q74 34 74 50 Q74 64 60 64"
      stroke="#d4a055"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.8 }}
    />
    {/* Saucer */}
    <motion.ellipse
      cx="40" cy="74" rx="26" ry="4"
      fill="#d4a055"
      opacity="0.3"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    />
  </svg>
)

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="splash-screen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0d0a07',
        overflow: 'hidden',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Ambient background glow */}
      <motion.div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,160,85,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Particle dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: '#d4a055',
            left: `${15 + (i * 6.5)}%`,
            top: `${20 + Math.sin(i * 0.8) * 40}%`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.6, 0], y: [20, -20, 20] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Logo container */}
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', zIndex: 1 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Cup icon */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'backOut' }}
        >
          <CoffeeCupSVG />
        </motion.div>

        {/* Brand name */}
        <motion.div style={{ textAlign: 'center' }}>
          <motion.div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(10px, 2vw, 13px)',
              letterSpacing: '6px',
              color: '#d4a055',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
            initial={{ opacity: 0, letterSpacing: '12px' }}
            animate={{ opacity: 1, letterSpacing: '6px' }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            The
          </motion.div>
          <motion.div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(48px, 8vw, 80px)',
              fontWeight: '400',
              color: '#f0e8d8',
              lineHeight: 0.9,
              letterSpacing: '-1px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Brew Room
          </motion.div>
          <motion.div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(10px, 2vw, 13px)',
              letterSpacing: '6px',
              color: '#d4a055',
              textTransform: 'uppercase',
              marginTop: '12px',
            }}
            initial={{ opacity: 0, letterSpacing: '12px' }}
            animate={{ opacity: 1, letterSpacing: '6px' }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Chennai · Est. Garden Cafe
          </motion.div>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <motion.div
            style={{ height: '1px', background: 'linear-gradient(to right, transparent, #d4a055)', width: '80px' }}
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#d4a055' }} />
          <motion.div
            style={{ height: '1px', background: 'linear-gradient(to left, transparent, #d4a055)', width: '80px' }}
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            color: '#a89070',
            letterSpacing: '1px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Where every sip tells a story
        </motion.p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '1px',
          background: 'rgba(212,160,85,0.2)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(to right, #d4a055, #e8c080)',
            borderRadius: '1px',
          }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, delay: 1.6, ease: 'easeInOut' }}
          onAnimationComplete={onComplete}
        />
      </motion.div>

      {/* Fade out overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0d0a07',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  )
}
