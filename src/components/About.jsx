import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { SectionHeader, fadeUp, fadeIn, ArrowRight, CoffeeCup, Leaf, Cutlery } from './ui'
import { STATS } from '../data/site'
import { IMAGES } from '../data/images'

/* ─────────────────────────────────────────────────────────────
   ABOUT — "Our Story"
   Asymmetric editorial split on warm paper: long-form serif copy
   on the left, a layered parallax composition on the right — the
   garden shot in an arch "garden window" frame — followed by a
   hairline-divided stats band and a trio of paper feature cards.
   ───────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: CoffeeCup,
    title: 'Artisan Coffee',
    desc: 'Meticulously brewed cappuccinos, flat whites, cold brews and espresso blends — every cup a masterpiece.',
  },
  {
    icon: Leaf,
    title: 'Garden Setting',
    desc: 'Serene outdoor seating under gazebos, surrounded by lush hotel gardens. A true urban escape.',
  },
  {
    icon: Cutlery,
    title: 'European Cuisine',
    desc: 'All-day breakfast, Italian and Mexican specialties, fresh bakes and indulgent desserts.',
  },
]

export default function About() {
  const visualRef = useRef(null)
  const reduce = useReducedMotion()

  /* Slow parallax drift across the layered composition */
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  })
  const gardenY = useTransform(scrollYProgress, [0, 1], [48, -48])
  const baristaY = useTransform(scrollYProgress, [0, 1], [-18, 36])
  const cardY = useTransform(scrollYProgress, [0, 1], [10, -26])

  return (
    <section id="about" className="section-pad" style={{ background: 'var(--color-bg)' }}>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(56px, 8vw, 104px);
          align-items: start;
        }
        @media (min-width: 980px) {
          .about-grid {
            grid-template-columns: 0.92fr 1.08fr;
          }
          /* text opens level with the arch's shoulder, not the grid center */
          .about-copy { padding-top: clamp(16px, 4vw, 56px); }
        }

        .about-visual {
          position: relative;
          padding-bottom: clamp(48px, 7vw, 88px);
        }
        .about-visual-main {
          width: min(86%, 480px);
          margin-left: auto;
        }
        .about-visual-overlap {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 45%;
          z-index: 2;
        }
        .about-visual-card {
          position: absolute;
          right: clamp(16px, 3vw, 36px);
          bottom: 20%;
          z-index: 3;
          padding: 18px 26px;
          background: var(--color-card);
          border: 1px solid var(--color-border-strong);
          border-radius: var(--radius-card);
          box-shadow: 0 24px 48px -18px rgba(36, 23, 8, 0.25);
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          margin-top: clamp(80px, 10vw, 128px);
        }
        .about-stat {
          padding: clamp(32px, 4.5vw, 52px) clamp(24px, 3vw, 44px);
          border-left: 1px solid var(--color-border);
        }
        .about-stat:nth-child(odd) { border-left: none; }
        .about-stat:nth-child(n + 3) { border-top: 1px solid var(--color-border); }
        @media (min-width: 760px) {
          .about-stats { grid-template-columns: repeat(4, 1fr); }
          .about-stat:nth-child(odd) { border-left: 1px solid var(--color-border); }
          .about-stat:first-child { border-left: none; }
          .about-stat:nth-child(n + 3) { border-top: none; }
        }

        .about-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: clamp(20px, 2.5vw, 28px);
          margin-top: clamp(64px, 8vw, 96px);
        }
        .about-feature {
          background: var(--color-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          padding: clamp(28px, 3.5vw, 40px);
          height: 100%;
          transition: transform 0.3s var(--ease-lux),
                      border-color 0.3s var(--ease-lux),
                      box-shadow 0.3s var(--ease-lux);
        }
        .about-feature:hover {
          transform: translateY(-6px);
          border-color: var(--color-accent-light);
          box-shadow: 0 24px 48px -18px rgba(135, 92, 32, 0.18);
        }
      `}</style>

      <div className="container-site">
        <SectionHeader
          index="01"
          eyebrow="Our Story"
          script="Our sanctuary in the city"
          title="A garden cafe like <em>no other</em>"
          style={{ marginBottom: 'clamp(56px, 8vw, 96px)' }}
        />

        {/* ── Editorial split ─────────────────────────────────── */}
        <div className="about-grid">
          {/* Left — long-form story */}
          <div className="about-copy" style={{ maxWidth: '54ch' }}>
            <motion.p className="prose-accent" style={{ marginBottom: '26px' }} {...fadeUp(0.05)}>
              Nestled within The Savera Hotel&rsquo;s lush gardens in Mylapore, The Brew Room
              is more than a cafe — it&rsquo;s a sanctuary. A place where the hum of the city
              fades into birdsong, and every visit feels like a well-deserved pause.
            </motion.p>
            <motion.p className="prose-accent" style={{ marginBottom: '44px' }} {...fadeUp(0.15)}>
              Our rustic-modern aesthetic, thoughtfully curated menu, and artisan coffee make
              The Brew Room the crown jewel of Chennai&rsquo;s cafe culture — consistently
              ranked No.1 for afternoon tea in the city.
            </motion.p>
            <motion.div {...fadeUp(0.25)}>
              <a className="link-arrow" href="#reservation">
                Plan Your Visit
                <ArrowRight />
              </a>
            </motion.div>
          </div>

          {/* Right — layered composition with parallax drift */}
          <motion.div className="about-visual" ref={visualRef} {...fadeIn(0.1)}>
            <motion.div className="about-visual-main" style={{ y: reduce ? 0 : gardenY }}>
              <motion.div {...fadeUp(0.1, 44)}>
                <div className="img-frame arch" style={{ aspectRatio: '4 / 5' }}>
                  <img
                    src={IMAGES.about.garden}
                    alt="Garden gazebo seating amid the lush Savera Hotel gardens"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="about-visual-overlap" style={{ y: reduce ? 0 : baristaY }}>
              <motion.div {...fadeUp(0.28, 40)}>
                <div
                  className="img-frame"
                  style={{
                    aspectRatio: '3 / 4',
                    border: '6px solid var(--color-bg)',
                    borderRadius: 'var(--radius-card)',
                  }}
                >
                  <img
                    src={IMAGES.about.barista}
                    alt="Barista pouring an artisan coffee at The Brew Room"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="about-visual-card" style={{ y: reduce ? 0 : cardY }}>
              <motion.div {...fadeUp(0.42, 24)}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2vw, 24px)',
                    lineHeight: 1.2,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Until 11 PM
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    marginTop: '6px',
                  }}
                >
                  Open Daily
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats band ──────────────────────────────────────── */}
        <div className="about-stats">
          {STATS.map((stat, i) => (
            <div className="about-stat" key={stat.label}>
              <motion.div {...fadeUp(0.1 + i * 0.12)}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(44px, 5vw, 64px)',
                    lineHeight: 1,
                    color: 'var(--color-accent)',
                    marginBottom: '16px',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '0.04em',
                    marginBottom: '4px',
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontStyle: 'italic',
                    fontSize: '16px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {stat.sub}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ── Feature trio ────────────────────────────────────── */}
        <div className="about-features">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} {...fadeUp(0.15 + i * 0.12)}>
                <div className="about-feature">
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      color: 'var(--color-on-accent)',
                      marginBottom: '24px',
                    }}
                  >
                    <Icon />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      marginBottom: '12px',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: '16px',
                      lineHeight: 1.7,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
