import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { EASE, SectionHeader, Star, QuoteMark } from './ui'
import { SITE, REVIEWS } from '../data/site'
import { IMAGES } from '../data/images'

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE — cinematic full-bleed testimonial theatre.
   Third roasted panel: one quote at a time over a slow parallax
   garden-night photo. The section carries .panel-dark, so the
   shared vocabulary (eyebrow, display, script) remaps itself —
   on-image details use panel tokens directly. The next section
   (Reservation) is paper, so this band ends on a crisp edge.
   ───────────────────────────────────────────────────────────── */

const AUTO_ADVANCE_MS = 6000

const quoteVariants = {
  enter: { opacity: 0, y: 26 },
  center: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  exit: { opacity: 0, y: -18, transition: { duration: 0.5, ease: EASE } },
}

export default function Experience() {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)

  /* Slow parallax drift on the backdrop */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  /* Auto-advance — paused on hover/focus, skipped for reduced motion.
     `active` in the deps restarts the 6s window on every change, so a
     manually selected quote always gets its full read time. */
  useEffect(() => {
    if (reduce || hovered) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % REVIEWS.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [reduce, hovered, active])

  const review = REVIEWS[active]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="panel-dark"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Parallax backdrop — oversized so the drift never reveals edges */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '-10%',
          bottom: '-10%',
          backgroundImage: `url(${IMAGES.experience.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: reduce ? '0%' : parallaxY,
          willChange: 'transform',
        }}
      />

      {/* Roast overlay — uniform espresso wash; crisp edge at the
          bottom because the next section returns to paper */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(24, 14, 5, 0.88)',
        }}
      />

      {/* Content — .panel-dark remaps the shared vocabulary, so the
          header and eyebrow read correctly without local overrides */}
      <div
        className="container-site section-pad"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SectionHeader
          index="05"
          eyebrow="Guest Voices"
          script="In their words"
          title="Loved by <em>Chennai</em>"
          align="center"
        />

        {/* ── Quote theatre ──────────────────────────────────── */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          style={{
            marginTop: 'clamp(48px, 6vw, 80px)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              minHeight: 'clamp(300px, 36vw, 340px)',
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  maxWidth: 800,
                  margin: '0 auto',
                }}
              >
                <span style={{ color: 'var(--panel-gold)', opacity: 0.85 }} aria-hidden>
                  <QuoteMark size={40} />
                </span>

                <blockquote
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(20px, 2.6vw, 30px)',
                    lineHeight: 1.7,
                    color: 'var(--panel-text)',
                    opacity: 0.9,
                    marginTop: 26,
                  }}
                >
                  {review.text}
                </blockquote>

                <div
                  role="img"
                  aria-label={`Rated ${review.rating} out of 5 stars`}
                  style={{ display: 'flex', gap: 6, color: 'var(--panel-gold)', marginTop: 30 }}
                >
                  {Array.from({ length: review.rating }, (_, s) => (
                    <Star key={s} size={13} />
                  ))}
                </div>

                <figcaption style={{ marginTop: 20 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      color: 'var(--panel-text)',
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      letterSpacing: '0.12em',
                      color: 'var(--panel-text-soft)',
                      marginTop: 6,
                    }}
                  >
                    Google Review · {review.date}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* ── Dot controls — active dot stretches into a gold pill ── */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            {REVIEWS.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show review ${i + 1}`}
                aria-current={i === active}
                style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                <motion.span
                  layout
                  animate={{
                    width: i === active ? 30 : 6,
                    backgroundColor:
                      i === active ? 'var(--panel-gold)' : 'rgba(242, 231, 211, 0.3)',
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ display: 'block', height: 6, borderRadius: 999 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Rating strip ───────────────────────────────────── */}
        <div
          style={{
            marginTop: 'clamp(56px, 7vw, 88px)',
            paddingTop: 30,
            borderTop: '1px solid var(--panel-border)',
            width: 'min(560px, 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '14px 22px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              lineHeight: 1,
              color: 'var(--panel-gold)',
            }}
          >
            {SITE.rating}
          </span>
          <span aria-hidden style={{ display: 'flex', gap: 4, color: 'var(--panel-gold)' }}>
            {Array.from({ length: 5 }, (_, s) => (
              <Star key={s} size={11} />
            ))}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--panel-text-soft)',
            }}
          >
            {SITE.reviewCount} Google Reviews
          </span>
        </div>
      </div>
    </section>
  )
}
