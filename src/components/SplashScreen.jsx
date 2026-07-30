import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from './ui'
import { SITE } from '../data/site'

/* ─────────────────────────────────────────────────────────────
   SPLASH — "the bean cracks the curtain open".
   A large photoreal coffee bean sits on cream paper, a crack
   draws slowly down its crease, then the screen splits like
   cinema curtains — each half carrying its side of the bean,
   which drops away under gravity as the page is revealed.

   Structure note: the bean halves are SIBLINGS of the curtain
   panels (layered above them), not children. A half nested in
   its panel gets painted over by the OTHER panel's opaque
   background wherever the jagged clip crosses the seam — the
   halves instead slide in sync with the curtains via matching
   vw transforms.

   Contract: onExitStart fires shortly BEFORE the curtains part
   (a prewarm — the app remounts the hero behind the opaque
   panels so the reveal is jank-free); onComplete fires exactly
   once when the reveal is done.
   ───────────────────────────────────────────────────────────── */

const PAPER = '#f6f0e4'
const BEAN_SRC = '/images/splash-bean.webp'

/* Jagged crack — shared by the SVG line and the two clip-paths
   so the split edges match the drawn fracture exactly. */
const CRACK = [
  [52, 0], [47, 10], [53, 22], [46, 34], [52, 46],
  [47, 58], [53, 70], [47, 82], [52, 92], [49, 100],
]
const crackPath = 'M' + CRACK.map(([x, y]) => `${x},${y}`).join(' L')
/* Each half's clip reaches past the crack so the two copies overlap
   while the bean is whole — no hairline can open on the zigzag. */
const OVERLAP = 1.2
const LEFT_CLIP = `polygon(0% 0%, ${CRACK.map(([x, y]) => `${x + OVERLAP}% ${y}%`).join(', ')}, 0% 100%)`
const RIGHT_CLIP = `polygon(${CRACK[0][0] - OVERLAP}% 0%, 100% 0%, 100% 100%, ${[...CRACK]
  .reverse()
  .map(([x, y]) => `${x - OVERLAP}% ${y}%`)
  .join(', ')})`

/* Timeline (ms) — deliberately unhurried: the bean settles, the
   crack draws slowly, a beat of stillness, then the curtains part */
const CRACK_AT = 1800
const CRACK_S = 0.9
const EXIT_AT = 3300
const PREWARM_MS = 400 /* hero remounts this long before the reveal */
const EXIT_S = 1.25
const CURTAIN_DELAY = 0.18 /* halves break apart first, then the curtains follow */

/* Shared bean sizing — halves + crack line all use this box */
const BEAN_BOX = {
  width: 'clamp(190px, 30vmin, 320px)',
  height: 'clamp(190px, 30vmin, 320px)',
}

/* A sliding curtain panel — pure paper, no children */
function CurtainPanel({ side, phase, reduce, onLeftDone }) {
  const isLeft = side === 'left'
  const exiting = phase === 'exit'
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        /* 1px overlap hides any subpixel seam between the panels */
        left: isLeft ? 0 : 'calc(50% - 1px)',
        right: isLeft ? 'calc(50% - 1px)' : 0,
        background: PAPER,
        zIndex: 1,
      }}
      animate={exiting && !reduce ? { x: isLeft ? '-100%' : '100%' } : { x: 0 }}
      transition={{ duration: EXIT_S, delay: exiting ? CURTAIN_DELAY : 0, ease: EASE }}
      onAnimationComplete={() => {
        if (exiting && isLeft) onLeftDone()
      }}
    />
  )
}

/* One half of the bean — layered ABOVE both panels, sliding in
   sync with its curtain while it falls away under gravity. */
function BeanHalf({ side, phase, reduce }) {
  const isLeft = side === 'left'
  const exiting = phase === 'exit'
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        ...BEAN_BOX,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      {/* Ride layer — mirrors the curtain slide + gravity fall */}
      <motion.div
        initial={{ x: '0vw' }}
        animate={
          exiting && !reduce
            ? {
                x: isLeft ? '-51vw' : '51vw',
                y: 210,
                rotate: isLeft ? -17 : 19,
              }
            : { x: '0vw', y: 0, rotate: 0 }
        }
        transition={
          exiting && !reduce
            ? {
                x: { duration: EXIT_S, delay: CURTAIN_DELAY, ease: EASE },
                y: { duration: EXIT_S + CURTAIN_DELAY, ease: [0.5, 0, 0.9, 0.4] },
                rotate: { duration: EXIT_S + CURTAIN_DELAY, ease: [0.5, 0, 0.9, 0.4] },
              }
            : { duration: 0 }
        }
        style={{ width: '100%', height: '100%' }}
      >
        {/* Phase layer — entrance pop + crack shake (+ fade on reduce) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.72, y: -26 }}
          animate={
            exiting && reduce
              ? { opacity: 0 }
              : phase === 'crack'
                ? { opacity: 1, scale: 1, y: 0, x: [0, -1.5, 1.5, -2, 2, -1, 1, 0] }
                : { opacity: 1, scale: 1, y: 0 }
          }
          transition={
            exiting && reduce
              ? { duration: 0.3 }
              : phase === 'crack'
                ? { x: { duration: CRACK_S, ease: 'easeInOut' } }
                : { duration: 1.1, delay: 0.2, ease: EASE }
          }
          style={{ width: '100%', height: '100%' }}
        >
          <img
            src={BEAN_SRC}
            alt=""
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              clipPath: isLeft ? LEFT_CLIP : RIGHT_CLIP,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function SplashScreen({ onComplete, onExitStart }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('in') // 'in' → 'crack' → 'exit'
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onComplete()
  }
  const finishRef = useRef(finish)
  finishRef.current = finish
  const exitStartRef = useRef(onExitStart)
  exitStartRef.current = onExitStart

  useEffect(() => {
    if (reduce) {
      /* Reduced motion: brief still frame, then a plain fade. */
      const prewarm = setTimeout(() => exitStartRef.current?.(), 600)
      const exitTimer = setTimeout(() => setPhase('exit'), 1000)
      const failsafe = setTimeout(() => finishRef.current(), 1800)
      return () => {
        clearTimeout(prewarm)
        clearTimeout(exitTimer)
        clearTimeout(failsafe)
      }
    }
    const crackTimer = setTimeout(() => setPhase('crack'), CRACK_AT)
    /* Prewarm: remount the hero behind the still-opaque panels so
       the curtain slide itself runs without main-thread jank */
    const prewarm = setTimeout(() => exitStartRef.current?.(), EXIT_AT - PREWARM_MS)
    const exitTimer = setTimeout(() => setPhase('exit'), EXIT_AT)
    /* Failsafe: guarantee onComplete even if animation callbacks drop */
    const failsafe = setTimeout(
      () => finishRef.current(),
      EXIT_AT + (CURTAIN_DELAY + EXIT_S) * 1000 + 500
    )
    return () => {
      clearTimeout(crackTimer)
      clearTimeout(prewarm)
      clearTimeout(exitTimer)
      clearTimeout(failsafe)
    }
  }, [reduce])

  const exiting = phase === 'exit'
  const cracked = phase !== 'in'

  return (
    <motion.div
      role="status"
      aria-label={`${SITE.name} — loading`}
      animate={reduce && exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      onAnimationComplete={() => {
        if (reduce && exiting) finish()
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
    >
      <CurtainPanel side="left" phase={phase} reduce={reduce} onLeftDone={finish} />
      <CurtainPanel side="right" phase={phase} reduce={reduce} onLeftDone={finish} />

      <BeanHalf side="left" phase={phase} reduce={reduce} />
      <BeanHalf side="right" phase={phase} reduce={reduce} />

      {/* The crack, drawn over the seam — matches the clip zigzag.
          Mounted only once cracking starts: at pathLength 0 some
          browsers still paint hairline segments of the path. */}
      {!reduce && cracked && (
        <motion.svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            ...BEAN_BOX,
            pointerEvents: 'none',
            overflow: 'visible',
            zIndex: 3,
          }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.18 }}
        >
          <motion.path
            d={crackPath}
            fill="none"
            stroke={PAPER}
            strokeWidth="1.1"
            strokeLinejoin="miter"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: cracked ? 1 : 0 }}
            transition={{ duration: CRACK_S, ease: [0.7, 0, 0.84, 0] }}
          />
        </motion.svg>
      )}
    </motion.div>
  )
}
