import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SITE } from '../data/site'
import { IMAGES } from '../data/images'
import { EASE, fadeUp, fadeIn, Reveal, Stamp, ArrowRight, ArrowDown, Phone, Leaf, Star } from './ui'

/* ─────────────────────────────────────────────────────────────
   RESERVATION — editorial split: arched table imagery / quiet
   request form on paper. Demo behaviour: submitting swaps the
   form for an in-card confirmation (no backend — the real build
   would email/SMS the cafe, who then confirm by phone).
   ───────────────────────────────────────────────────────────── */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function prettyDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${+d} ${MONTHS[+m - 1]} ${y}`
}

/* 10:00 AM → 10:00 PM, hourly */
const TIMES = Array.from({ length: 13 }, (_, i) => {
  const h = 10 + i
  const hour12 = ((h + 11) % 12) + 1
  return `${hour12}:00 ${h < 12 ? 'AM' : 'PM'}`
})

const GUESTS = Array.from({ length: 8 }, (_, i) => i + 1)

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'var(--color-text-secondary)',
  marginBottom: '8px',
}

function todayISO() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

function Field({ id, label, delay, children }) {
  return (
    <motion.div {...fadeUp(delay, 26)}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      {children}
    </motion.div>
  )
}

export default function Reservation() {
  const reduce = useReducedMotion()
  const [booking, setBooking] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setBooking({
      name: (data.get('name') || '').toString().trim(),
      date: prettyDate(data.get('date')),
      time: data.get('time'),
      guests: data.get('guests'),
    })
  }

  return (
    <section
      id="reservation"
      className="section-pad"
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <style>{`
        .resv-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 4.5vw, 64px);
          align-items: stretch;
        }
        @media (min-width: 980px) {
          .resv-grid { grid-template-columns: 1fr 1.08fr; }
        }
        /* keeps the card height steady when the form swaps to the
           confirmation, so the page below doesn't jump */
        .resv-swap {
          min-height: clamp(340px, 40vw, 420px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .resv-swap > * { width: 100%; }
        .resv-fields {
          display: grid;
          grid-template-columns: 1fr;
          gap: 34px clamp(28px, 3.5vw, 44px);
        }
        @media (min-width: 640px) {
          .resv-fields { grid-template-columns: 1fr 1fr; }
        }
        .resv-stamp { display: none; }
        @media (min-width: 640px) {
          .resv-stamp {
            display: block;
            position: absolute;
            top: -28px;
            right: -8px;
            z-index: 3;
          }
        }
        .resv-input {
          width: 100%;
          min-height: 44px;
          padding: 8px 2px 12px;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--color-border-strong);
          border-radius: 0;
          font-family: var(--font-accent);
          font-size: 18px;
          line-height: 1.4;
          color: var(--color-text-primary);
          transition: border-color 0.3s var(--ease-lux), box-shadow 0.3s var(--ease-lux);
        }
        .resv-input::placeholder {
          color: var(--color-text-secondary);
          opacity: 0.55;
        }
        .resv-input:focus {
          outline: none;
          border-bottom-color: var(--color-accent);
          box-shadow: 0 1px 0 var(--color-accent);
        }
        .resv-input option {
          background: var(--color-card);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          font-size: 15px;
        }
        select.resv-input {
          appearance: none;
          -webkit-appearance: none;
          padding-right: 30px;
          cursor: pointer;
        }
        .resv-input::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.65;
        }
        .resv-selectwrap { position: relative; }
        .resv-chev {
          position: absolute;
          right: 2px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          pointer-events: none;
          color: var(--color-text-secondary);
        }
      `}</style>

      <div className="container-site">
        <div className="resv-grid">
          {/* ── LEFT — the table, waiting, in a garden-window arch ── */}
          <div style={{ position: 'relative', height: '100%' }}>
            <motion.div
              {...fadeIn(0)}
              className="img-frame arch"
              style={{ minHeight: 'clamp(420px, 60vh, 680px)', height: '100%' }}
            >
              <img
                src={IMAGES.reservation.table}
                alt="An elegantly set table awaiting guests at The Brew Room"
                loading="lazy"
              />
              {/* Gradient anchor for the note strip */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(24, 14, 5, 0.74) 0%, rgba(24, 14, 5, 0.28) 36%, rgba(24, 14, 5, 0) 60%)',
                }}
              />
              <motion.div
                {...fadeUp(0.25, 24)}
                className="glass-panel"
                style={{
                  position: 'absolute',
                  left: 'clamp(18px, 3.5vw, 34px)',
                  right: 'clamp(18px, 3.5vw, 34px)',
                  bottom: 'clamp(18px, 3.5vw, 34px)',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: 'clamp(16px, 2.5vw, 24px) clamp(18px, 3vw, 28px)',
                  borderRadius: 'var(--radius-card)',
                }}
              >
                <span
                  aria-hidden
                  style={{ color: 'var(--panel-gold)', display: 'flex', flexShrink: 0 }}
                >
                  <Leaf size={19} />
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(16px, 1.8vw, 19px)',
                    lineHeight: 1.55,
                    color: '#f2e7d3',
                  }}
                >
                  Groups of five or more — we recommend calling ahead.
                </p>
              </motion.div>
            </motion.div>

            {/* Stamp overlaps the arch's top-right shoulder — lives
                outside the frame (arch clips overflow), ≥640px only */}
            <motion.div className="resv-stamp" aria-hidden="true" {...fadeIn(0.2)}>
              <Stamp size={96} text="RESERVE • THE BREW ROOM • MYLAPORE • CHENNAI • " />
            </motion.div>
          </div>

          {/* ── RIGHT — the request, on a paper card ──────────── */}
          <div
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: 'clamp(40px, 6vw, 88px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <motion.span className="eyebrow" {...fadeIn(0)}>
              <span style={{ opacity: 0.65 }}>06</span>
              Reserve
            </motion.span>

            <Reveal delay={0.08} style={{ marginTop: '22px' }}>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 4.4vw, 56px)' }}>
                Your table <em>awaits</em>
              </h2>
            </Reveal>

            <motion.p
              {...fadeUp(0.16, 24)}
              className="prose-accent"
              style={{ marginTop: '18px', maxWidth: '46ch' }}
            >
              Tell us when, and we will keep a quiet corner of the garden ready for you.
            </motion.p>

            <div className="resv-swap" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
            {booking ? (
              /* ── Confirmation state ─────────────────────────── */
              <motion.div
                key="confirmed"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{
                  marginTop: 'clamp(36px, 4vw, 52px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Gold seal with a drawing checkmark + sparkles */}
                <div style={{ position: 'relative' }}>
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                    animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
                    style={{
                      width: 84,
                      height: 84,
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 22px 44px -14px rgba(135, 92, 32, 0.55)',
                    }}
                  >
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                      <motion.path
                        d="M8 20.5 L15.5 27.5 L30 10.5"
                        stroke="var(--color-on-accent)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: reduce ? 1 : 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.55, delay: 0.55, ease: EASE }}
                      />
                    </svg>
                  </motion.div>
                  {/* sparkles */}
                  {[
                    { top: -10, right: -14, size: 15, delay: 0.85 },
                    { bottom: -4, left: -18, size: 11, delay: 1.0 },
                    { top: 8, left: -26, size: 8, delay: 1.12 },
                  ].map((s, i) => (
                    <motion.span
                      key={i}
                      aria-hidden="true"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.45, delay: reduce ? 0 : s.delay, ease: EASE }}
                      style={{
                        position: 'absolute',
                        top: s.top,
                        right: s.right,
                        bottom: s.bottom,
                        left: s.left,
                        color: 'var(--color-accent-light)',
                        display: 'flex',
                      }}
                    >
                      <Star size={s.size} />
                    </motion.span>
                  ))}
                </div>

                <motion.h3
                  className="display"
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
                  style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', marginTop: 28 }}
                >
                  Your table is set{booking.name ? `, ${booking.name.split(/\s+/)[0]}` : ''}<em>.</em>
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
                  style={{
                    marginTop: 14,
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                  }}
                >
                  {booking.date} · {booking.time} · {booking.guests}{' '}
                  {booking.guests === '1' ? 'Guest' : 'Guests'}
                </motion.p>

                <motion.p
                  className="prose-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
                  style={{ marginTop: 16, maxWidth: '42ch' }}
                >
                  Your request is on its way to the cafe — our team will call you
                  shortly to confirm. In a hurry?{' '}
                  <a
                    href={SITE.phoneHref}
                    style={{ color: 'var(--color-accent)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    {SITE.phone}
                  </a>
                </motion.p>

                <motion.button
                  type="button"
                  className="link-arrow"
                  onClick={() => setBooking(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
                  style={{ marginTop: 18, background: 'none', border: 'none' }}
                >
                  Book another table
                  <ArrowRight size={14} />
                </motion.button>
              </motion.div>
            ) : (
            <motion.form
              key="form"
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: EASE }}
              onSubmit={handleSubmit}
              aria-label="Reservation request"
              style={{ marginTop: 'clamp(36px, 4vw, 52px)' }}
            >
              <div className="resv-fields">
                <Field id="resv-name" label="Name" delay={0.22}>
                  <input
                    id="resv-name"
                    name="name"
                    type="text"
                    className="resv-input"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </Field>

                <Field id="resv-date" label="Date" delay={0.28}>
                  <input
                    id="resv-date"
                    name="date"
                    type="date"
                    className="resv-input"
                    min={todayISO()}
                    required
                  />
                </Field>

                <Field id="resv-time" label="Time" delay={0.34}>
                  <div className="resv-selectwrap">
                    <select id="resv-time" name="time" className="resv-input" defaultValue="7:00 PM">
                      {TIMES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <span className="resv-chev" aria-hidden>
                      <ArrowDown size={15} />
                    </span>
                  </div>
                </Field>

                <Field id="resv-guests" label="Guests" delay={0.4}>
                  <div className="resv-selectwrap">
                    <select id="resv-guests" name="guests" className="resv-input" defaultValue="2">
                      {GUESTS.map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    <span className="resv-chev" aria-hidden>
                      <ArrowDown size={15} />
                    </span>
                  </div>
                </Field>
              </div>

              <motion.div {...fadeUp(0.48, 24)} style={{ marginTop: 'clamp(36px, 4vw, 48px)' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Book My Table
                  <ArrowRight size={15} />
                </button>
                <p
                  style={{
                    marginTop: '14px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    letterSpacing: '0.02em',
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center',
                  }}
                >
                  No payment needed — the cafe confirms every booking personally.
                </p>
              </motion.div>
            </motion.form>
            )}
            </AnimatePresence>
            </div>

            <motion.div
              {...fadeUp(0.55, 20)}
              style={{ marginTop: '26px', display: 'flex', justifyContent: 'center' }}
            >
              <a
                className="link-arrow"
                href={SITE.phoneHref}
                aria-label={`Call ${SITE.name} at ${SITE.phone}`}
              >
                <Phone size={15} />
                {SITE.phone}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
