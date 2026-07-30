import CurvedLoop from './CurvedLoop'
import { TICKER_ITEMS } from '../data/site'

/* The roasted band between hero and story — a curved, draggable
   marquee (React Bits CurvedLoop) arcing through the espresso
   panel. Decorative: the same facts live in About/Contact/Footer. */
export default function Ticker() {
  const marqueeText = TICKER_ITEMS.join(' ✦ ') + ' ✦'

  return (
    <div
      className="panel-dark"
      aria-hidden="true"
      style={{
        background: 'var(--panel-bg)',
        overflow: 'hidden',
        padding: 'clamp(48px, 7vw, 104px) 0 clamp(56px, 8vw, 120px)',
      }}
    >
      <CurvedLoop
        marqueeText={marqueeText}
        speed={1.4}
        curveAmount={150}
        direction="left"
        interactive={true}
      />
    </div>
  )
}
