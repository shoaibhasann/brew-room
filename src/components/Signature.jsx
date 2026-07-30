import { motion, useReducedMotion } from 'framer-motion'
import { SIGNATURES } from '../data/site'
import { SectionHeader, ArrowRight, fadeUp, EASE, VIEWPORT } from './ui'

/* 1px gold rule that grows 0 → 48px when the card enters the viewport */
function GoldRule({ delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
      whileInView={reduce ? { opacity: 1 } : { scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{
        width: 48,
        height: 1,
        background: 'var(--panel-gold)',
        transformOrigin: 'left center',
        margin: '16px 0 14px',
      }}
    />
  )
}

/* Ghost numeral — cream outline, transparent fill. Sits bottom-left
   so the arch's rounded crown never clips it. */
const numeralStyle = {
  position: 'absolute',
  bottom: 12,
  left: 20,
  zIndex: 2,
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(64px, 7vw, 96px)',
  fontWeight: 400,
  lineHeight: 1,
  color: 'transparent',
  WebkitTextStroke: '1px rgba(242, 231, 211, 0.75)',
  pointerEvents: 'none',
  userSelect: 'none',
}

export default function Signature() {
  return (
    <section
      id="signature"
      className="section-pad panel-dark"
      style={{ background: 'var(--panel-bg)' }}
    >
      <style>{`
        .sig-headrow {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px 48px;
          margin-bottom: clamp(56px, 7vw, 88px);
        }
        .sig-intro {
          font-family: var(--font-accent);
          font-style: italic;
          font-size: clamp(17px, 1.6vw, 19px);
          line-height: 1.8;
          color: var(--panel-text-soft);
          max-width: 360px;
          margin: 0;
        }
        /* Mobile-first: horizontal scroll-snap strip */
        .sig-grid {
          display: flex;
          gap: clamp(24px, 3vw, 40px);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          margin: 0 calc(-1 * var(--gutter));
          padding: 0 var(--gutter) 8px;
          scroll-padding-left: var(--gutter);
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .sig-grid::-webkit-scrollbar { display: none; }
        .sig-card {
          flex: 0 0 78vw;
          scroll-snap-align: start;
        }
        .sig-body {
          padding-top: clamp(20px, 2.5vw, 28px);
          transition: transform 0.3s var(--ease-lux);
        }
        @media (hover: hover) {
          .sig-card:hover .sig-body { transform: translateY(-6px); }
        }
        /* Desktop: 3-column editorial grid */
        @media (min-width: 980px) {
          .sig-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            overflow: visible;
            margin: 0;
            padding: 0;
          }
          .sig-card { flex: none; }
          .sig-card--offset { margin-top: 48px; }
          .sig-intro { text-align: right; }
        }
      `}</style>

      <div className="container-site">
        <div className="sig-headrow">
          <SectionHeader
            index="02"
            eyebrow="The Signatures"
            script="Poured with patience"
            title="Crafted to be <em>remembered</em>"
          />
          <motion.p className="sig-intro" {...fadeUp(0.2, 24)}>
            Three pours and plates that built our name&nbsp;&mdash; each one
            refined season after season, beneath the garden canopy.
          </motion.p>
        </div>

        <div className="sig-grid">
          {SIGNATURES.map((item, i) => (
            <motion.article
              key={item.index}
              className={`sig-card${i === 1 ? ' sig-card--offset' : ''}`}
              {...fadeUp(i * 0.12)}
            >
              <div
                className="arch img-frame"
                style={{ aspectRatio: '3 / 4' }}
              >
                <img
                  src={item.img}
                  alt={`${item.name} — a signature of The Brew Room`}
                  loading="lazy"
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(0deg, rgba(24, 14, 5, 0.42) 0%, rgba(24, 14, 5, 0) 45%)',
                    pointerEvents: 'none',
                  }}
                />
                <span aria-hidden style={numeralStyle}>
                  {item.index}
                </span>
              </div>

              <div className="sig-body">
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.2vw, 26px)',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    color: 'var(--panel-text)',
                  }}
                >
                  {item.name}
                </h3>

                <GoldRule delay={0.15 + i * 0.12} />

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--panel-gold)',
                    margin: 0,
                  }}
                >
                  {item.note}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: 16,
                    lineHeight: 1.75,
                    color: 'var(--panel-text-soft)',
                    margin: '10px 0 0',
                    maxWidth: '42ch',
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.1)}
          style={{ textAlign: 'center', marginTop: 'clamp(64px, 9vw, 104px)' }}
        >
          <a className="link-arrow" href="#menu">
            Explore the full menu
            <ArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
