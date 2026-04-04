import { motion } from 'framer-motion'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-bg)',
      borderTop: '1px solid var(--color-border)',
      padding: 'clamp(48px, 7vw, 80px) clamp(20px, 5vw, 60px) clamp(28px, 4vw, 40px)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: 'clamp(36px, 5vw, 60px)',
          marginBottom: 'clamp(40px, 6vw, 60px)',
          paddingBottom: 'clamp(40px, 6vw, 60px)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '11px',
                letterSpacing: '4px',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>The</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '400',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.5px',
                lineHeight: 1,
              }}>Brew Room</div>
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              marginBottom: '24px',
            }}>
              Where every sip tells a story. Garden cafe nestled within The Savera Hotel, Mylapore.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: <InstagramIcon />, href: 'https://www.instagram.com/brewroomcoffee', label: 'Instagram' },
                { icon: <FacebookIcon />, href: 'https://www.facebook.com/brewroomcoffee', label: 'Facebook' },
                { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
              ].map(social => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                  }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              marginBottom: '20px',
            }}>Explore</h4>
            {['About', 'Menu', 'Gallery', 'Experience', 'Contact'].map(link => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  display: 'block',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '17px',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  marginBottom: '10px',
                }}
                whileHover={{ color: 'var(--color-accent)', x: 4 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Hours */}
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              marginBottom: '20px',
            }}>Hours</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { day: 'Mon – Fri', time: '10:00 AM – 11:00 PM' },
                { day: 'Saturday', time: '8:00 AM – 11:00 PM' },
                { day: 'Sunday', time: '8:00 AM – 11:00 PM' },
              ].map(h => (
                <div key={h.day}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: '500',
                    color: 'var(--color-text-primary)',
                  }}>{h.day}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    color: 'var(--color-text-secondary)',
                  }}>{h.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              marginBottom: '20px',
            }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '16px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                }}>146, Dr Radha Krishnan Salai,<br />Mylapore, Chennai 600004</div>
              </div>
              <motion.a
                href="tel:+919710947380"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '18px',
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                }}
                whileHover={{ letterSpacing: '0.5px' }}
              >
                +91 97109 47380
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.3px',
          }}>
            © {new Date().getFullYear()} The Brew Room, Chennai. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
          }}>
            <span style={{ color: 'var(--color-accent)' }}>☕</span>
            Crafted with love in Chennai
          </div>
        </div>
      </div>
    </footer>
  )
}
