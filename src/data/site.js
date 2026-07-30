// ─────────────────────────────────────────────────────────────
// SITE CONTENT — every string of copy lives here so sections
// stay presentational and copy can be edited in one place.
// ─────────────────────────────────────────────────────────────
import { IMAGES } from './images'

export const SITE = {
  name: 'The Brew Room',
  tagline: 'Where every sip tells a story',
  phone: '+91 97109 47380',
  phoneHref: 'tel:+919710947380',
  address: '146, Dr Radha Krishnan Salai, Mylapore, Chennai 600004',
  mapsUrl: 'https://maps.google.com/?q=The+Brew+Room+Chennai',
  instagram: 'https://www.instagram.com/brewroomcoffee',
  facebook: 'https://www.facebook.com/brewroomcoffee',
  rating: '4.4',
  reviewCount: '3,421',
}

export const NAV_LINKS = [
  { label: 'Story', href: '#about' },
  { label: 'Signatures', href: '#signature' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const HOURS = [
  { day: 'Mon – Fri', time: '10:00 AM – 11:00 PM' },
  { day: 'Sat – Sun', time: '8:00 AM – 11:00 PM' },
]

export const STATS = [
  { value: '4.4', label: 'Google Rating', sub: '3,421 reviews' },
  { value: 'No.1', label: 'Afternoon Tea', sub: 'in Chennai' },
  { value: '14', label: 'Years', sub: 'of craft' },
  { value: '40+', label: 'Curated Dishes', sub: 'on the menu' },
]

export const SIGNATURES = [
  {
    index: '01',
    name: 'Signature Cold Brew',
    note: 'Slow-steeped · 18 hours',
    desc: 'Single-origin beans steeped for eighteen patient hours, served over artisan ice with a whisper of vanilla.',
    img: IMAGES.signature.coldBrew,
  },
  {
    index: '02',
    name: 'The Flat White',
    note: 'Double ristretto · Micro-foam',
    desc: 'A double ristretto folded under velvet micro-foam. The morning ritual our regulars swear by.',
    img: IMAGES.signature.flatWhite,
  },
  {
    index: '03',
    name: 'Eggs Benedict',
    note: 'House hollandaise · Brioche',
    desc: 'Poached free-range eggs on toasted brioche with silken hollandaise and crisp pancetta.',
    img: IMAGES.signature.benedict,
  },
]

export const MENU_CATEGORIES = ['All', 'Coffee', 'Breakfast', 'Mains', 'Desserts']

export const MENU_ITEMS = [
  {
    category: 'Coffee',
    name: 'Signature Cold Brew',
    desc: 'Single-origin beans, slow-steeped 18 hours, artisan ice, a hint of vanilla.',
    price: '₹320',
    tag: 'Bestseller',
    img: IMAGES.menu.coldBrew,
  },
  {
    category: 'Coffee',
    name: 'Flat White',
    desc: 'Double ristretto with velvety steamed micro-foam.',
    price: '₹280',
    img: IMAGES.menu.flatWhite,
  },
  {
    category: 'Coffee',
    name: 'Salted Caramel Shake',
    desc: 'Blended espresso, house-made caramel, a whisper of Himalayan salt.',
    price: '₹380',
    tag: 'Must Try',
    img: IMAGES.menu.caramelShake,
  },
  {
    category: 'Breakfast',
    name: 'Eggs Benedict',
    desc: 'Poached free-range eggs, toasted brioche, house hollandaise, crispy pancetta.',
    price: '₹520',
    tag: "Chef's Pick",
    img: IMAGES.menu.eggsBenedict,
  },
  {
    category: 'Breakfast',
    name: 'Garden Waffles',
    desc: 'Belgian waffles, fresh berries, clotted cream, wildflower honey.',
    price: '₹450',
    img: IMAGES.menu.gardenWaffles,
  },
  {
    category: 'Mains',
    name: 'Penne Alfredo',
    desc: 'Chicken penne in rich parmesan cream, black pepper, fresh herbs.',
    price: '₹620',
    tag: 'Popular',
    img: IMAGES.menu.penneAlfredo,
  },
  {
    category: 'Mains',
    name: 'Caesar Salad',
    desc: 'Crisp romaine, house dressing, parmesan, garlic croutons.',
    price: '₹480',
    img: IMAGES.menu.caesarSalad,
  },
  {
    category: 'Desserts',
    name: 'Chocolate Cake',
    desc: 'Old-fashioned dark chocolate, ganache, hand-whipped chantilly.',
    price: '₹340',
    tag: 'Bestseller',
    img: IMAGES.menu.chocolateCake,
  },
]

export const REVIEWS = [
  {
    name: 'Aishwarya M.',
    rating: 5,
    date: 'Jan 2025',
    text: "Hands down the best cafe in Chennai. The garden setting is magical — feels like you've been transported somewhere else entirely. Cold brew is absolutely perfect.",
  },
  {
    name: 'Rahul S.',
    rating: 5,
    date: 'Mar 2025',
    text: 'Came for the eggs benedict, stayed for the vibe. The outdoor gazebo seating is so peaceful on weekday mornings. The staff are genuinely warm and attentive.',
  },
  {
    name: 'Priya N.',
    rating: 5,
    date: 'Feb 2025',
    text: 'The salted caramel shake is life-changing. Gorgeous rustic interiors, thoughtful menu. Easily the most Instagrammable cafe in Mylapore. Will be back every week!',
  },
]

export const TICKER_ITEMS = [
  'Est. 2011',
  'Garden Cafe',
  'Artisan Coffee',
  'European Cuisine',
  "Chennai's No.1 Afternoon Tea",
  'All-Day Breakfast',
  'The Savera Hotel · Mylapore',
]
