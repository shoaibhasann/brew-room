import { motion } from 'framer-motion'
import { SectionHeader, fadeUp, ArrowRight, MapPin, Phone, Clock } from './ui'
import { SITE, HOURS } from '../data/site'

/* ─────────────────────────────────────────────────────────────
   CONTACT — "Find Us"
   Hairline-separated info column (address / reservations /
   hours) beside a framed map card. Quiet and editorial, set
   on warm paper with filled-gold icon medallions.
   ───────────────────────────────────────────────────────────── */

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0!2d80.2707!3d13.0359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526791d68d22c3%3A0x7fc0a2fb5b1b3614!2sThe%20Brew%20Room!5e0!3m2!1sen!2sin!4v1'

/* Filled accent medallion — matches the About feature trio */
const iconCircleStyle = {
  width: '48px',
  height: '48px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  background: 'var(--color-accent)',
  color: 'var(--color-on-accent)',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'var(--color-text-secondary)',
  marginBottom: '12px',
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(56px, 7vw, 96px);
          align-items: start;
          margin-top: clamp(56px, 7vw, 88px);
        }
        @media (min-width: 980px) {
          .contact-grid { grid-template-columns: 1fr 1.15fr; }
        }
        .contact-tel {
          color: var(--color-text-primary);
          text-decoration: none;
          transition: color 0.3s var(--ease-lux);
        }
        .contact-tel:hover { color: var(--color-accent); }
      `}</style>

      <div className="container-site">
        <SectionHeader
          index="07"
          eyebrow="Find Us"
          script="Come say hello"
          title="Visit us in <em>Mylapore</em>"
        />

        <div className="contact-grid">
          {/* ── Info column ─────────────────────────────────── */}
          <div>
            {/* Address */}
            <motion.div
              {...fadeUp(0.05)}
              style={{ display: 'flex', gap: '22px', paddingBottom: '34px' }}
            >
              <div style={iconCircleStyle} aria-hidden="true">
                <MapPin size={20} />
              </div>
              <div>
                <span style={labelStyle}>Address</span>
                <p
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: '18px',
                    lineHeight: 1.65,
                    color: 'var(--color-text-primary)',
                    maxWidth: '340px',
                  }}
                >
                  {SITE.address}
                </p>
                <a
                  className="link-arrow"
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '14px', padding: '8px 0' }}
                >
                  Get Directions
                  <ArrowRight />
                </a>
              </div>
            </motion.div>

            {/* Reservations */}
            <motion.div
              {...fadeUp(0.17)}
              style={{
                display: 'flex',
                gap: '22px',
                padding: '34px 0',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div style={iconCircleStyle} aria-hidden="true">
                <Phone size={20} />
              </div>
              <div>
                <span style={labelStyle}>Reservations</span>
                <a
                  className="contact-tel"
                  href={SITE.phoneHref}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.6vw, 28px)',
                    letterSpacing: '0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {SITE.phone}
                </a>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              {...fadeUp(0.29)}
              style={{
                display: 'flex',
                gap: '22px',
                paddingTop: '34px',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div style={iconCircleStyle} aria-hidden="true">
                <Clock size={20} />
              </div>
              <div style={{ flexGrow: 1, maxWidth: '340px' }}>
                <span style={labelStyle}>Hours</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {HOURS.map(({ day, time }) => (
                    <div
                      key={day}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '18px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {day}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-accent)',
                          fontSize: '16px',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Map card ────────────────────────────────────── */}
          <motion.div {...fadeUp(0.2)}>
            <div
              className="contact-map"
              style={{
                borderRadius: 'var(--radius-card)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                height: 'clamp(340px, 44vw, 520px)',
              }}
            >
              <iframe
                src={MAP_EMBED_SRC}
                title="The Brew Room location"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
              />
            </div>
            <p
              style={{
                marginTop: '18px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
              }}
            >
              Inside The Savera Hotel · Valet parking available
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
