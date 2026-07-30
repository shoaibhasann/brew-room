// ─────────────────────────────────────────────────────────────
// IMAGE MANIFEST — single source of truth for every image slot.
// All images are AI-generated originals, optimized to WebP in
// /public/images (source PNGs remain in /public).
// ─────────────────────────────────────────────────────────────

export const IMAGES = {
  hero: {
    main: '/images/hero-main.webp',
  },

  about: {
    garden: '/images/about-garden.webp',
    barista: '/images/about-barista.webp',
    interior: '/images/about-interior.webp',
  },

  signature: {
    coldBrew: '/images/signature-coldbrew.webp',
    flatWhite: '/images/signature-flatwhite.webp',
    benedict: '/images/signature-benedict.webp',
  },

  menu: {
    coldBrew: '/images/menu-coldbrew.webp',
    flatWhite: '/images/menu-flatwhite.webp',
    caramelShake: '/images/menu-caramelshake.webp',
    eggsBenedict: '/images/menu-benedict.webp',
    gardenWaffles: '/images/menu-waffles.webp',
    penneAlfredo: '/images/menu-alfredo.webp',
    caesarSalad: '/images/menu-caesar.webp',
    chocolateCake: '/images/menu-chocolatecake.webp',
  },

  gallery: [
    { src: '/images/gallery-01-interior.webp', alt: 'Rustic-modern cafe interior', span: 'large' },
    { src: '/images/gallery-02-coffeebar.webp', alt: 'The coffee bar', span: 'small' },
    { src: '/images/gallery-03-garden.webp', alt: 'Garden gazebo seating', span: 'small' },
    { src: '/images/gallery-04-latteart.webp', alt: 'Latte art in progress', span: 'medium' },
    { src: '/images/gallery-05-pastries.webp', alt: 'Fresh bakes and pastries', span: 'medium' },
    { src: '/images/gallery-06-evening.webp', alt: 'Evening at the garden cafe', span: 'large' },
  ],

  experience: {
    background: '/images/experience-bg.webp',
  },

  reservation: {
    table: '/images/reservation-table.webp',
  },
}
