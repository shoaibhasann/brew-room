import { motion } from 'framer-motion'
import { SITE, NAV_LINKS, HOURS } from '../data/site'
import {
  Reveal,
  fadeUp,
  fadeIn,
  ArrowRight,
  Instagram,
  Facebook,
} from './ui'

/* ─────────────────────────────────────────────────────────────
   FOOTER — grand editorial closing statement.
   Fourth roasted-espresso panel: giant cream wordmark, hand-script
   tagline, four quiet columns, hairline bottom bar.
   ───────────────────────────────────────────────────────────── */

const COLUMN_HEADING = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'var(--panel-text-soft)',
  marginBottom: '26px',
}

const SOCIALS = [
  { label: 'Follow The Brew Room on Instagram', href: SITE.instagram, Icon: Instagram },
  { label: 'Follow The Brew Room on Facebook', href: SITE.facebook, Icon: Facebook },
]

export default function Footer() {
  /* "146, Dr Radha Krishnan Salai" / "Mylapore, Chennai 600004" */
  const addressParts = SITE.address.split(', ')
  const addressLines = [
    addressParts.slice(0, 2).join(', '),
    addressParts.slice(2).join(', '),
  ]

  return (
    <footer className="panel-dark" style={{ background: 'var(--panel-bg)' }}>
      <style>{`
        .ftr-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--panel-border);
          color: var(--panel-text-soft);
          cursor: pointer;
          transition: border-color 0.3s var(--ease-lux), color 0.3s var(--ease-lux);
        }
        .ftr-social:hover {
          border-color: var(--panel-gold);
          color: var(--panel-gold);
        }
        .ftr-navlink {
          display: inline-block;
          font-family: var(--font-accent);
          font-size: 17px;
          color: var(--panel-text-soft);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s var(--ease-lux), transform 0.3s var(--ease-lux);
        }
        .ftr-navlink:hover {
          color: var(--panel-gold);
          transform: translateX(4px);
        }
        .ftr-phone {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--panel-gold);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s var(--ease-lux);
        }
        .ftr-phone:hover {
          color: var(--panel-text);
        }
        .ftr-ghost {
          --btn-sweep: var(--panel-gold);
          background: transparent;
          color: var(--panel-text);
          border-color: rgba(242, 231, 211, 0.3);
        }
        .ftr-ghost:hover,
        .ftr-ghost:focus-visible {
          border-color: var(--panel-gold);
          color: var(--panel-bg);
        }
        .ftr-credit {
          color: var(--panel-gold);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-decoration: none;
          border-bottom: 1px solid rgba(208, 167, 92, 0.35);
          padding-bottom: 1px;
          transition: color 0.3s var(--ease-lux), border-color 0.3s var(--ease-lux);
        }
        .ftr-credit:hover {
          color: var(--panel-text);
          border-color: var(--panel-text);
        }
      `}</style>

      {/* ── Top block — ceremonial wordmark ─────────────────── */}
      <div
        className="container-site"
        style={{
          paddingTop: 'clamp(96px, 12vw, 160px)',
          paddingBottom: 'clamp(64px, 8vw, 104px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.span
          {...fadeIn(0)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.55em',
            textTransform: 'uppercase',
            color: 'var(--panel-gold)',
            marginBottom: '18px',
          }}
        >
          The
        </motion.span>

        <Reveal delay={0.06}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(64px, 12vw, 150px)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: 'var(--panel-text)',
              whiteSpace: 'nowrap',
            }}
          >
            Brew Room
          </h2>
        </Reveal>

        <motion.p
          className="script"
          {...fadeUp(0.18, 24)}
          style={{
            fontSize: 'clamp(20px, 2.4vw, 26px)',
            color: 'var(--panel-gold)',
            marginTop: '28px',
            /* rotate as a motion value so it composes with fadeUp's y */
            rotate: -2,
          }}
        >
          {SITE.tagline}
        </motion.p>

        <motion.div
          {...fadeUp(0.28, 24)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px 36px',
            marginTop: '44px',
          }}
        >
          <a className="btn ftr-ghost" href="#reservation">
            Reserve a Table
          </a>
          {/* .link-arrow reads --color-accent, remapped to panel gold here */}
          <a className="link-arrow" href={SITE.phoneHref}>
            {SITE.phone}
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>

      {/* ── Middle — four editorial columns ─────────────────── */}
      <div className="container-site" style={{ paddingBottom: 'clamp(64px, 8vw, 96px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(44px, 5vw, 64px)',
            borderTop: '1px solid var(--panel-border)',
            paddingTop: 'clamp(56px, 6vw, 80px)',
          }}
        >
          {/* Brand blurb + socials */}
          <motion.div {...fadeUp(0)}>
            <p
              style={{
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'var(--panel-text-soft)',
                maxWidth: '260px',
              }}
            >
              Garden cafe nestled within The Savera Hotel, Mylapore.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  className="ftr-social"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Explore */}
          <motion.nav {...fadeUp(0.08)} aria-label="Footer navigation">
            <h3 style={COLUMN_HEADING}>Explore</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a className="ftr-navlink" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Hours */}
          <motion.div {...fadeUp(0.16)}>
            <h3 style={COLUMN_HEADING}>Hours</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {HOURS.map((row) => (
                <li key={row.day}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--panel-text-soft)',
                      marginBottom: '4px',
                    }}
                  >
                    {row.day}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: '17px',
                      color: 'var(--panel-text)',
                    }}
                  >
                    {row.time}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div {...fadeUp(0.24)}>
            <h3 style={COLUMN_HEADING}>Contact</h3>
            <p
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '17px',
                lineHeight: 1.7,
                color: 'var(--panel-text-soft)',
              }}
            >
              {addressLines[0]},
              <br />
              {addressLines[1]}
            </p>
            <a
              className="ftr-phone"
              href={SITE.phoneHref}
              style={{ display: 'inline-block', marginTop: '18px' }}
            >
              {SITE.phone}
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar — centered ───────────────────────────── */}
      <div className="container-site">
        <motion.div
          {...fadeIn(0)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '10px',
            borderTop: '1px solid var(--panel-border)',
            padding: '30px 0 34px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--panel-text-soft)',
            }}
          >
            &copy; {new Date().getFullYear()} The Brew Room, Chennai. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.04em',
              color: 'var(--panel-text-soft)',
            }}
          >
            <span aria-hidden="true" style={{ color: 'var(--panel-gold)' }}>
              ✨
            </span>{' '}
            Designed &amp; Developed by{' '}
            <a
              className="ftr-credit"
              href="https://zyntec.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              ZYNTEC
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
