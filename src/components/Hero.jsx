import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { EASE, Stamp, ArrowRight } from './ui'

/* ─────────────────────────────────────────────────────────────
   HERO — "Product Theatre". Starbucks-poster energy in the
   Roasted Paper language: massive solid + outline display type,
   a floating Brew Room glass tilting through it, an espresso
   circle bleeding off the right edge, drifting beans, stamp.
   All entrances run on mount (`animate`) so the choreography
   plays as the splash curtain lifts.
   ───────────────────────────────────────────────────────────── */

const GLASS_SRC = '/images/hero-glass.webp'

/* Masked line rise — page-load variant of <Reveal> */
function MaskedLine({ children, delay = 0, style }) {
  const reduce = useReducedMotion()
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        style={{
          display: 'block',
          /* slack for display-serif descenders/italic overhangs */
          padding: '0 0.14em 0.16em',
          margin: '0 -0.14em -0.16em',
          ...style,
        }}
        initial={reduce ? { opacity: 0 } : { y: '110%' }}
        animate={reduce ? { opacity: 1 } : { y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* Tiny coffee-bean SVG for the floating garnish.
   tone 'ink' reads on cream paper; 'gold' reads on the dark circle. */
const Bean = ({ size = 22, style, drift = 10, duration = 6, delay = 0, tone = 'ink' }) => {
  const reduce = useReducedMotion()
  const fill = tone === 'gold' ? 'var(--panel-gold)' : 'var(--panel-bg-2)'
  const crease = tone === 'gold' ? 'var(--panel-bg)' : 'var(--color-bg)'
  return (
    <motion.svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 20 27"
      aria-hidden="true"
      style={{ position: 'absolute', ...style }}
      initial={{ opacity: 0 }}
      animate={
        reduce
          ? { opacity: 0.9 }
          : { opacity: 0.9, y: [0, -drift, 0], rotate: [0, 8, 0] }
      }
      transition={
        reduce
          ? { duration: 0.5, delay }
          : {
              opacity: { duration: 0.8, delay, ease: EASE },
              y: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: duration * 1.2, delay, repeat: Infinity, ease: 'easeInOut' },
            }
      }
    >
      <ellipse cx="10" cy="13.5" rx="9" ry="13" fill={fill} />
      <path
        d="M10 1.5 C 6 8, 14 19, 10 25.5"
        stroke={crease}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()

  /* Scroll choreography — the glass drifts up and tips further
     over as the section scrolls away; the circle sinks slightly. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const glassY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const glassRotate = useTransform(scrollYProgress, [0, 1], [-7, 5])
  const circleY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        paddingTop: 'clamp(110px, 15vh, 160px)',
        paddingBottom: 'clamp(48px, 7vh, 88px)',
      }}
    >
      <style>{`
        .hero-section {
          min-height: 100vh;
          min-height: 100svh;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(36px, 5vw, 72px);
          align-items: center;
        }
        .hero-word--outline {
          color: transparent;
          -webkit-text-stroke: clamp(1.6px, 0.22vw, 3px) var(--color-text-primary);
          paint-order: stroke;
        }
        .hero-glass-wrap { position: relative; z-index: 3; }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.1fr 0.9fr; }
          /* the glass reaches back over the headline column */
          .hero-glass-wrap { margin-left: clamp(-140px, -9vw, -60px); }
        }
        @media (max-width: 1023px) {
          .hero-circle { display: none; }
          .hero-glass-img { max-height: 52vh; }
        }
        /* the left crescent needs wide margins to stay clear of the
           navbar wordmark — wide screens only */
        @media (max-width: 1439px) {
          .hero-circle-left { display: none; }
        }
        @media (max-width: 639px) {
          .hero-stamp { display: none; }
        }
      `}</style>

      {/* ── Espresso circle bleeding off the right edge ── */}
      <motion.div
        aria-hidden="true"
        className="hero-circle"
        style={{
          position: 'absolute',
          top: '50%',
          right: 'max(-52vh, -560px)',
          width: 'min(118vh, 1240px)',
          height: 'min(118vh, 1240px)',
          marginTop: 'min(-59vh, -620px)',
          borderRadius: '50%',
          background: 'var(--panel-bg)',
          y: reduce ? 0 : circleY,
          zIndex: 1,
        }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.86 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
      />
      {/* Solid espresso crescent on the left edge — echoes the big
          right circle. Sits below the navbar zone and pokes in at
          most ~120px, clear of the headline column at ≥1440px. */}
      <motion.div
        aria-hidden="true"
        className="hero-circle hero-circle-left"
        style={{
          position: 'absolute',
          top: '110px',
          left: '-360px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'var(--panel-bg)',
          zIndex: 0,
        }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
      />

      <div
        className="container-site hero-grid"
        style={{ position: 'relative', width: '100%', zIndex: 2 }}
      >
        {/* ══ LEFT — the poster type ══ */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.span
            className="script"
            aria-hidden="true"
            style={{
              display: 'block',
              fontSize: 'clamp(24px, 3vw, 34px)',
              rotate: -2,
              transformOrigin: 'left center',
              width: 'fit-content',
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            Good coffee, great company
          </motion.span>

          {/* COLD / BREW — solid line + stroked outline line */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: 'clamp(66px, 10vw, 158px)',
              lineHeight: 0.94,
              letterSpacing: '0.01em',
              color: 'var(--color-text-primary)',
              margin: 'clamp(12px, 2vh, 22px) 0 0',
            }}
          >
            <MaskedLine delay={0.3}>Cold</MaskedLine>
            <MaskedLine delay={0.42}>
              <span className="hero-word--outline">Brew</span>
            </MaskedLine>
          </h1>

          {/* Signature line under the wordmark */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              marginTop: 'clamp(18px, 3vh, 30px)',
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          >
            <span
              aria-hidden="true"
              style={{ width: 64, height: 2, background: 'var(--color-accent-light)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              The Signature Serve
            </span>
          </motion.div>

          <motion.p
            className="prose-accent"
            style={{
              maxWidth: 420,
              marginTop: 'clamp(16px, 2.4vh, 24px)',
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: EASE }}
          >
            Single-origin beans, steeped for eighteen unhurried hours and
            poured over hand-cut ice beneath the garden canopy. One glass,
            and the city slows down.
          </motion.p>

          {/* CTA row */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 18,
              marginTop: 'clamp(26px, 4vh, 40px)',
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.84, ease: EASE }}
          >
            <a className="btn btn-primary" href="#menu">
              Explore the Menu
              <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Craft details — quiet product facts, no social proof */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px 16px',
              marginTop: 34,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
          >
            {['Single Origin', 'Steeped 18 Hours', 'Served in the Garden'].map(
              (detail, i) => (
                <span
                  key={detail}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}
                >
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: 'var(--color-accent-light)',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {detail}
                  </span>
                </span>
              )
            )}
          </motion.div>
        </div>

        {/* ══ RIGHT — the glass ══ */}
        <div className="hero-glass-wrap">
          {/* scroll-driven layer */}
          <motion.div style={{ y: reduce ? 0 : glassY, rotate: reduce ? 0 : glassRotate }}>
            {/* idle float layer */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* entrance layer */}
              <motion.img
                src={GLASS_SRC}
                alt="The Brew Room signature cold brew — a tall glass of slow-steeped espresso over ice"
                className="hero-glass-img"
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, y: 90, scale: 0.94, rotate: 4 }
                }
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
                style={{
                  display: 'block',
                  width: 'min(100%, 460px)',
                  maxHeight: '68vh',
                  objectFit: 'contain',
                  margin: '0 auto',
                  filter: 'drop-shadow(0 60px 70px rgba(24, 14, 5, 0.45))',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Stamp badge tucked against the glass */}
          <motion.div
            className="hero-stamp"
            aria-hidden="true"
            style={{ position: 'absolute', bottom: '4%', left: '-2%', zIndex: 4 }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          >
            <Stamp
              text="SIGNATURE COLD BREW • SLOW-STEEPED 18 HOURS • "
              size={116}
              duration={20}
            />
          </motion.div>

          {/* Floating beans around the glass */}
          <Bean size={20} style={{ top: '9%', left: '4%' }} drift={12} duration={5.8} delay={1.2} />
          <Bean size={14} tone="gold" style={{ top: '24%', right: '6%' }} drift={9} duration={7} delay={1.45} />
          <Bean size={17} tone="gold" style={{ bottom: '14%', right: '13%' }} drift={11} duration={6.2} delay={1.7} />
        </div>
      </div>

    </section>
  )
}
