import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const categories = ['All', 'Coffee', 'Breakfast', 'Mains', 'Desserts']

const menuItems = [
  {
    category: 'Coffee',
    name: 'Signature Cold Brew',
    desc: 'Single-origin beans, slow-steeped 18 hours. Served over artisan ice with a hint of vanilla.',
    price: '₹320',
    tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80&fit=crop',
  },
  {
    category: 'Coffee',
    name: 'Flat White',
    desc: 'Double ristretto with velvety steamed micro-foam. Our most requested morning ritual.',
    price: '₹280',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80&fit=crop',
  },
  {
    category: 'Coffee',
    name: 'Salted Caramel Shake',
    desc: 'Creamy blended espresso, house-made caramel, and a whisper of Himalayan salt.',
    price: '₹380',
    tag: 'Must Try',
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80&fit=crop',
  },
  {
    category: 'Breakfast',
    name: 'Eggs Benedict',
    desc: 'Poached free-range eggs on toasted brioche, house hollandaise, crispy pancetta.',
    price: '₹520',
    tag: 'Chef\'s Pick',
    img: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&q=80&fit=crop',
  },
  {
    category: 'Breakfast',
    name: 'Garden Waffles',
    desc: 'Belgian waffles with fresh berries, clotted cream, and house-made wildflower honey.',
    price: '₹450',
    img: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80&fit=crop',
  },
  {
    category: 'Mains',
    name: 'Penne Alfredo',
    desc: 'Chicken penne in a rich parmesan cream, black pepper, and fresh herbs. Italian tradition.',
    price: '₹620',
    tag: 'Popular',
    img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80&fit=crop',
  },
  {
    category: 'Mains',
    name: 'Caesar Salad',
    desc: 'Crispy romaine, house-made dressing, parmesan, garlic croutons. A timeless classic.',
    price: '₹480',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80&fit=crop',
  },
  {
    category: 'Desserts',
    name: 'Chocolate Cake',
    desc: 'Old-fashioned dark chocolate cake with ganache and hand-whipped chantilly cream.',
    price: '₹340',
    tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80&fit=crop',
  },
]

export default function Menu() {
  const [active, setActive] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = active === 'All' ? menuItems : menuItems.filter(m => m.category === active)

  return (
    <section
      id="menu"
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vw, 140px) 0',
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: 'clamp(40px, 6vw, 70px)',
        }}>
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <div style={{ width: '32px', height: '1px', background: 'var(--color-accent)' }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '12px',
              letterSpacing: '5px',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
            }}>Curated Selections</span>
            <div style={{ width: '32px', height: '1px', background: 'var(--color-accent)' }} />
          </motion.div>

          <motion.h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: '400',
              color: 'var(--color-text-primary)',
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Our Finest <em style={{ color: 'var(--color-accent)' }}>Offerings</em>
          </motion.h2>
        </div>

        {/* Category filter */}
        <motion.div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: 'clamp(32px, 5vw, 56px)',
            flexWrap: 'wrap',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '10px 22px',
                borderRadius: '50px',
                cursor: 'pointer',
                border: 'none',
                background: active === cat
                  ? 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))'
                  : 'var(--color-card)',
                color: active === cat ? '#fff' : 'var(--color-text-secondary)',
                transition: 'all 0.2s ease',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
                whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  {item.tag && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'var(--color-accent)',
                      color: '#fff',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '10px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '50px',
                    }}>
                      {item.tag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                    gap: '8px',
                  }}>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '18px',
                      fontWeight: '500',
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.2,
                    }}>{item.name}</h3>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '18px',
                      fontWeight: '400',
                      color: 'var(--color-accent)',
                      whiteSpace: 'nowrap',
                    }}>{item.price}</span>
                  </div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                  }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}
        <motion.p
          style={{
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '15px',
            color: 'var(--color-text-secondary)',
            marginTop: '48px',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          All prices are indicative. Full menu available at the cafe.
        </motion.p>
      </div>
    </section>
  )
}
