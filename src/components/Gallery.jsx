import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SectionHeader, fadeUp, EASE, ArrowRight, CloseIcon } from './ui'
import { IMAGES } from '../data/images'
import { stopScroll, startScroll } from '../lib/scroll'

/* ─────────────────────────────────────────────────────────────
   GALLERY — "Moments"
   Editorial masonry of life at the cafe, with a cinematic
   lightbox viewer (keyboard navigable).
   ───────────────────────────────────────────────────────────── */

const SHOTS = IMAGES.gallery
const COUNT = SHOTS.length

const pad = (n) => String(n).padStart(2, '0')

const circleBtn = {
  width: '52px',
  height: '52px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#f2e7d3',
  cursor: 'pointer',
  flexShrink: 0,
}

export default function Gallery() {
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()
  const open = active !== null
  const dialogRef = useRef(null)
  const openerRef = useRef(null) /* tile that opened the viewer — focus returns here */

  const paginate = useCallback((dir) => {
    setActive((a) => (a === null ? a : (a + dir + COUNT) % COUNT))
  }, [])

  /* Modal behaviour while open: scroll lock (CSS + Lenis), keyboard
     controls, and a focus trap across the three dialog buttons */
  useEffect(() => {
    if (!open) return
    document.body.classList.add('lightbox-open')
    stopScroll()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setActive(null)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        paginate(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        paginate(-1)
      } else if (e.key === 'Tab') {
        const nodes = dialogRef.current?.querySelectorAll('button')
        if (!nodes?.length) return
        const list = [...nodes]
        const first = list[0]
        const last = list[list.length - 1]
        if (!dialogRef.current.contains(document.activeElement)) {
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
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('lightbox-open')
      startScroll()
      openerRef.current?.focus()
    }
  }, [open, paginate])

  const openViewer = (e, i) => {
    openerRef.current = e.currentTarget
    setActive(i)
  }

  const onTileKey = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openViewer(e, i)
    }
  }

  return (
    <section
      id="gallery"
      className="section-pad"
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <style>{`
        /* Curated 3×4 collage — every cell filled, each image placed
           to suit its aspect (talls in 1×2, wides in 2×1/2×2). */
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: clamp(170px, 16vw, 235px);
          gap: 16px;
        }
        .gal-grid > :nth-child(1) { grid-column: 1 / 3; grid-row: 1 / 3; } /* interior — wide */
        .gal-grid > :nth-child(2) { grid-column: 3 / 4; grid-row: 1 / 3; } /* coffee bar — tall */
        .gal-grid > :nth-child(3) { grid-column: 1 / 2; grid-row: 3 / 5; } /* garden — tall */
        .gal-grid > :nth-child(4) { grid-column: 2 / 3; grid-row: 3 / 4; } /* latte art */
        .gal-grid > :nth-child(5) { grid-column: 3 / 4; grid-row: 3 / 4; } /* pastries */
        .gal-grid > :nth-child(6) { grid-column: 2 / 4; grid-row: 4 / 5; } /* evening — wide */
        .gal-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(24, 14, 5, 0.8) 0%,
            rgba(24, 14, 5, 0.3) 40%,
            transparent 70%
          );
          opacity: 0;
          transform: translateY(22%);
          transition: opacity 0.35s var(--ease-lux), transform 0.5s var(--ease-lux);
          pointer-events: none;
        }
        .gal-cap {
          position: absolute;
          left: 20px;
          right: 20px;
          bottom: 18px;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #f2e7d3;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.4s var(--ease-lux), transform 0.55s var(--ease-lux);
          pointer-events: none;
        }
        .gal-tile:hover .gal-shade,
        .gal-tile:focus-visible .gal-shade,
        .gal-tile:hover .gal-cap,
        .gal-tile:focus-visible .gal-cap {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .gal-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 165px;
          }
          /* 2-col pack: wide / pair / pair / wide */
          .gal-grid > :nth-child(1) { grid-column: 1 / 3; grid-row: auto; }
          .gal-grid > :nth-child(2),
          .gal-grid > :nth-child(3),
          .gal-grid > :nth-child(4),
          .gal-grid > :nth-child(5) { grid-column: auto; grid-row: auto; }
          .gal-grid > :nth-child(6) { grid-column: 1 / 3; grid-row: auto; }
        }
        @media (max-width: 420px) {
          .gal-grid { grid-template-columns: 1fr; grid-auto-rows: 200px; }
          .gal-grid > * { grid-column: auto !important; grid-row: auto !important; }
        }
      `}</style>

      <div className="container-site">
        <SectionHeader
          index="04"
          eyebrow="Moments"
          script="Moments in the garden"
          title="Life at <em>The Brew Room</em>"
        />

        <div className="gal-grid" style={{ marginTop: 'clamp(56px, 7vw, 88px)' }}>
          {SHOTS.map((shot, i) => (
            <motion.div
              key={shot.src}
              className="gal-tile img-frame"
              style={{ borderRadius: 'var(--radius-card)', cursor: 'zoom-in' }}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${shot.alt}`}
              onClick={(e) => openViewer(e, i)}
              onKeyDown={(e) => onTileKey(e, i)}
              {...fadeUp((i % 3) * 0.1, 40)}
            >
              <img src={shot.src} alt={shot.alt} loading="lazy" />
              <div className="gal-shade" aria-hidden="true" />
              <span className="gal-cap" aria-hidden="true">
                {shot.alt}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={() => setActive(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1300,
              background: 'rgba(15, 9, 3, 0.95)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px, 4vw, 48px)',
            }}
          >
            {/* Close */}
            <button
              type="button"
              className="glass-panel"
              aria-label="Close image viewer"
              autoFocus
              onClick={(e) => {
                e.stopPropagation()
                setActive(null)
              }}
              style={{
                ...circleBtn,
                position: 'absolute',
                top: 'clamp(16px, 3vw, 32px)',
                right: 'clamp(16px, 3vw, 32px)',
              }}
            >
              <CloseIcon size={20} />
            </button>

            {/* Previous */}
            <button
              type="button"
              className="glass-panel"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation()
                paginate(-1)
              }}
              style={{
                ...circleBtn,
                position: 'absolute',
                left: 'clamp(10px, 3vw, 40px)',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <span
                aria-hidden="true"
                style={{ display: 'flex', transform: 'rotate(180deg)' }}
              >
                <ArrowRight size={18} />
              </span>
            </button>

            {/* Next */}
            <button
              type="button"
              className="glass-panel"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation()
                paginate(1)
              }}
              style={{
                ...circleBtn,
                position: 'absolute',
                right: 'clamp(10px, 3vw, 40px)',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <ArrowRight size={18} />
            </button>

            {/* Image + caption — clicks here must not close the viewer */}
            <figure
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '18px',
                cursor: 'default',
              }}
            >
              <motion.img
                key={active}
                src={SHOTS[active].src}
                alt={SHOTS[active].alt}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={
                  reduce ? { duration: 0.2 } : { duration: 0.55, ease: EASE }
                }
                style={{
                  maxWidth: '88vw',
                  maxHeight: '82vh',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  boxShadow: '0 40px 90px -20px rgba(0, 0, 0, 0.7)',
                }}
              />
              <figcaption
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '20px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ color: '#f2e7d3' }}>{SHOTS[active].alt}</span>
                <span style={{ color: 'rgba(242, 231, 211, 0.55)' }}>
                  {pad(active + 1)} / {pad(COUNT)}
                </span>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
