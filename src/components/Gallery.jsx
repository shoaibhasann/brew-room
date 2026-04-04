import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85&fit=crop',
    alt: 'Cafe interior',
    span: 'large',
  },
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=85&fit=crop',
    alt: 'Coffee bar',
    span: 'small',
  },
  {
    src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=85&fit=crop',
    alt: 'Garden seating',
    span: 'small',
  },
  {
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=85&fit=crop',
    alt: 'Latte art',
    span: 'medium',
  },
  {
    src: 'https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=600&q=85&fit=crop',
    alt: 'Pastries',
    span: 'medium',
  },
  {
    src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=85&fit=crop',
    alt: 'Outdoor dining',
    span: 'large',
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState(null)

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'clamp(40px, 6vw, 70px)' }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
        >
          <div style={{ width: '32px', height: '1px', background: 'var(--color-accent)' }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '12px',
            letterSpacing: '5px',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
          }}>Visual Journey</span>
        </motion.div>

        <motion.h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: '400',
            color: 'var(--color-text-primary)',
            letterSpacing: '-1px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Life at <em style={{ color: 'var(--color-accent)' }}>The Brew Room</em>
        </motion.h2>
      </div>

      {/* Masonry-style grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: '220px',
        gap: '14px',
      }}
        className="gallery-grid"
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.src}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'zoom-in',
              gridColumn: img.span === 'large' ? 'span 2' : 'span 1',
              gridRow: img.span === 'large' ? 'span 2' : 'span 1',
            }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setLightbox(img)}
          >
            <motion.img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              cursor: 'zoom-out',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '12px',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 160px !important;
          }
        }
        @media (max-width: 420px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 220px !important;
          }
          .gallery-grid > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
