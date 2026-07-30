import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SectionHeader, EASE, fadeUp, ArrowRight } from './ui'
import { SITE, MENU_CATEGORIES, MENU_ITEMS } from '../data/site'

/* ─────────────────────────────────────────────────────────────
   MENU — editorial menu grid with sliding-underline category
   tabs, dotted-leader price rows, and quiet card hovers.
   ───────────────────────────────────────────────────────────── */

export default function Menu() {
  const [active, setActive] = useState('All')
  const reduce = useReducedMotion()

  const filtered =
    active === 'All' ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === active)

  return (
    <section id="menu" className="section-pad" style={{ background: 'var(--color-bg)' }}>
      <style>{`
        .menu-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--color-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          overflow: hidden;
          transition: transform 0.35s var(--ease-lux),
                      border-color 0.35s var(--ease-lux),
                      background-color 0.35s var(--ease-lux),
                      box-shadow 0.35s var(--ease-lux);
        }
        .menu-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-accent-light);
          background: var(--color-card-hover);
          box-shadow: 0 24px 48px -18px rgba(36, 23, 8, 0.18);
        }
        .menu-card:hover .img-frame img {
          transform: scale(1.05);
        }
        .menu-tab {
          position: relative;
          min-height: 44px;
          padding: 10px 4px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          transition: color 0.3s var(--ease-lux);
        }
        .menu-tab:hover { color: var(--color-text-primary); }
        .menu-tab[aria-pressed="true"] { color: var(--color-accent); }
      `}</style>

      <div className="container-site">
        <SectionHeader
          index="03"
          eyebrow="Curated Selections"
          script="From our kitchen"
          title="Our finest <em>offerings</em>"
          align="center"
        />

        {/* Category tabs — sliding gold underline */}
        <motion.div
          {...fadeUp(0.12, 24)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(18px, 3vw, 32px)',
            marginTop: 'clamp(44px, 6vw, 68px)',
            marginBottom: 'clamp(40px, 5vw, 60px)',
          }}
        >
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className="menu-tab"
              aria-pressed={active === cat}
              onClick={() => setActive(cat)}
            >
              {cat}
              {active === cat && (
                <motion.span
                  layoutId="menu-tab-underline"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 4,
                    right: 4,
                    bottom: 6,
                    height: 1,
                    background: 'var(--color-accent)',
                  }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Item grid */}
        <motion.div
          {...fadeUp(0.18, 30)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '22px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <article className="menu-card">
                  <div className="img-frame" style={{ aspectRatio: '4 / 3' }}>
                    <img src={item.img} alt={item.name} loading="lazy" />
                    {item.tag && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          padding: '5px 12px',
                          borderRadius: 999,
                          background: 'var(--color-accent)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'var(--color-on-accent)',
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: 22 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 19,
                          fontWeight: 500,
                          letterSpacing: '-0.01em',
                          color: 'var(--color-text-primary)',
                          lineHeight: 1.25,
                        }}
                      >
                        {item.name}
                      </h3>
                      <span
                        aria-hidden="true"
                        style={{
                          flex: 1,
                          margin: '0 10px',
                          borderBottom: '1px dotted var(--color-border-strong)',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 19,
                          fontWeight: 400,
                          color: 'var(--color-accent)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.price}
                      </span>
                    </div>
                    <p
                      style={{
                        marginTop: 10,
                        fontFamily: 'var(--font-body)',
                        fontSize: 13.5,
                        lineHeight: 1.65,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </article>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footnote */}
        <motion.div
          {...fadeUp(0.1, 24)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 20,
            marginTop: 'clamp(56px, 8vw, 88px)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              color: 'var(--color-text-secondary)',
            }}
          >
            All prices are indicative. Full menu available at the cafe.
          </p>
          <a className="link-arrow" href={SITE.phoneHref}>
            Call for today&apos;s specials
            <ArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
