import { useId, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   SHARED UI VOCABULARY
   Every section imports from here so motion + iconography stay
   perfectly consistent across the site.
   ───────────────────────────────────────────────────────────── */

/* Luxury easing curve — use for ALL transitions */
export const EASE = [0.22, 1, 0.36, 1]

/* Standard viewport config for whileInView reveals */
export const VIEWPORT = { once: true, margin: '-90px' }

/* Motion variants */
export const fadeUp = (delay = 0, y = 36) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.9, delay, ease: EASE },
})

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: VIEWPORT,
  transition: { duration: 1, delay, ease: EASE },
})

/* Masked line reveal — wrap text in <Reveal> for editorial rise.
   The viewport observer must sit on the OUTER (unclipped) wrapper:
   the inner element starts fully clipped by overflow:hidden, so an
   observer on it would never report an intersection. Variants
   propagate the trigger from wrapper to child. */
export function Reveal({ children, delay = 0, y = '110%', as = 'div', style }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div
  const variants = {
    hidden: reduce ? { opacity: 0 } : { y },
    shown: reduce
      ? { opacity: 1, transition: { duration: 0.6, delay } }
      : { y: 0, transition: { duration: 1, delay, ease: EASE } },
  }
  return (
    <motion.div
      style={{ overflow: 'hidden', ...style }}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
    >
      {/* Slack padding pulled back by negative margin: the display serif's
          descenders and italic overhangs paint outside the 1.04
          line-box and would otherwise be clipped by the mask. */}
      <Tag
        variants={variants}
        style={{ padding: '0 0.14em 0.16em', margin: '0 -0.14em -0.16em' }}
      >
        {children}
      </Tag>
    </motion.div>
  )
}

/* Editorial section header: numbered eyebrow + optional hand-script
   kicker + display title */
export function SectionHeader({ index, eyebrow, script, title, align = 'left', style }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        gap: '18px',
        ...style,
      }}
    >
      <motion.span
        className={`eyebrow ${align === 'center' ? 'eyebrow--center' : ''}`}
        {...fadeIn(0)}
      >
        {index && <span style={{ opacity: 0.65 }}>{index}</span>}
        {eyebrow}
      </motion.span>
      {script && (
        <motion.span
          className="script"
          aria-hidden="true"
          style={{
            fontSize: 'clamp(22px, 2.6vw, 30px)',
            transform: 'rotate(-2deg)',
            marginBottom: '-10px',
          }}
          {...fadeIn(0.06)}
        >
          {script}
        </motion.span>
      )}
      <Reveal delay={0.08}>
        <h2
          className="display"
          style={{ fontSize: 'clamp(40px, 5.6vw, 72px)' }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </Reveal>
    </div>
  )
}

/* Rotating circular stamp badge — "EST. 2011 • GARDEN CAFE •" */
export function Stamp({
  text = 'EST. 2011 • THE BREW ROOM • GARDEN CAFE • CHENNAI • ',
  size = 128,
  duration = 22,
}) {
  const reduce = useReducedMotion()
  const pathId = useId()
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'block', filter: 'drop-shadow(0 10px 24px rgba(36, 23, 8, 0.28))' }}
    >
      <defs>
        <path
          id={pathId}
          d="M50,50 m-35.5,0 a35.5,35.5 0 1,1 71,0 a35.5,35.5 0 1,1 -71,0"
        />
      </defs>
      <circle cx="50" cy="50" r="49" fill="var(--color-accent)" />
      <circle
        cx="50" cy="50" r="43"
        fill="none"
        stroke="var(--color-on-accent)"
        strokeWidth="0.6"
        opacity="0.55"
        strokeDasharray="1.6 2.2"
      />
      <text
        fill="var(--color-on-accent)"
        fontSize="7.4"
        fontFamily="Manrope, sans-serif"
        fontWeight="600"
        letterSpacing="1.7"
      >
        <textPath href={`#${pathId}`}>{text}</textPath>
      </text>
      {/* Center star */}
      <polygon
        points="50,42 52.2,47.2 57.8,47.8 53.6,51.6 54.9,57.2 50,54.2 45.1,57.2 46.4,51.6 42.2,47.8 47.8,47.2"
        fill="var(--color-on-accent)"
        opacity="0.9"
      />
    </motion.svg>
  )
}

/* Magnetic hover wrapper for CTAs (desktop nicety, inert on touch) */
export function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const handleMove = (e) => {
    const el = ref.current
    if (!el || reduce) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: 'inline-block', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ICON SET — 1.5px stroke, 24 viewBox, consistent everywhere
   ───────────────────────────────────────────────────────────── */

const iconProps = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
})

export const ArrowRight = ({ size = 16 }) => (
  <svg {...iconProps(size)}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="13 5 20 12 13 19" />
  </svg>
)

export const ArrowDown = ({ size = 18 }) => (
  <svg {...iconProps(size)}>
    <line x1="12" y1="4" x2="12" y2="20" />
    <polyline points="5 13 12 20 19 13" />
  </svg>
)

export const Star = ({ size = 13, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <polygon points="12,2.5 15.09,8.26 21.5,9.27 16.75,13.9 17.9,20.4 12,17.4 6.1,20.4 7.25,13.9 2.5,9.27 8.91,8.26" />
  </svg>
)

export const MapPin = ({ size = 18 }) => (
  <svg {...iconProps(size)}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const Phone = ({ size = 18 }) => (
  <svg {...iconProps(size)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.63A2 2 0 0 1 3.78 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const Clock = ({ size = 18 }) => (
  <svg {...iconProps(size)}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export const CoffeeCup = ({ size = 22 }) => (
  <svg {...iconProps(size)}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
)

export const Leaf = ({ size = 22 }) => (
  <svg {...iconProps(size)}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

export const Cutlery = ({ size = 22 }) => (
  <svg {...iconProps(size)}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </svg>
)

export const Sun = ({ size = 17 }) => (
  <svg {...iconProps(size)} strokeWidth="1.8">
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="1.5" x2="12" y2="3.5" />
    <line x1="12" y1="20.5" x2="12" y2="22.5" />
    <line x1="4.6" y1="4.6" x2="6" y2="6" />
    <line x1="18" y1="18" x2="19.4" y2="19.4" />
    <line x1="1.5" y1="12" x2="3.5" y2="12" />
    <line x1="20.5" y1="12" x2="22.5" y2="12" />
    <line x1="4.6" y1="19.4" x2="6" y2="18" />
    <line x1="18" y1="6" x2="19.4" y2="4.6" />
  </svg>
)

export const Moon = ({ size = 17 }) => (
  <svg {...iconProps(size)} strokeWidth="1.8">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export const MenuIcon = ({ size = 22 }) => (
  <svg {...iconProps(size)} strokeWidth="1.8">
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>
)

export const CloseIcon = ({ size = 22 }) => (
  <svg {...iconProps(size)} strokeWidth="1.8">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export const QuoteMark = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M10.5 5C6.9 6.6 4.5 9.5 4.5 13.4c0 3 1.9 5.1 4.3 5.1 2.2 0 3.8-1.6 3.8-3.8 0-2.1-1.5-3.6-3.5-3.6-.4 0-.9.1-1 .1.3-2 2-4.1 4-5.2L10.5 5zm9 0c-3.6 1.6-6 4.5-6 8.4 0 3 1.9 5.1 4.3 5.1 2.2 0 3.8-1.6 3.8-3.8 0-2.1-1.5-3.6-3.5-3.6-.4 0-.9.1-1 .1.3-2 2-4.1 4-5.2L19.5 5z" />
  </svg>
)

export const Instagram = ({ size = 18 }) => (
  <svg {...iconProps(size)}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.2" y1="6.8" x2="17.21" y2="6.8" strokeWidth="2.2" />
  </svg>
)

export const Facebook = ({ size = 18 }) => (
  <svg {...iconProps(size)}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
