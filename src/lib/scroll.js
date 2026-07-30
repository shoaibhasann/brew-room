/* Shared Lenis handle so overlays (splash, mobile menu, lightbox)
   can pause smooth scrolling — CSS overflow locks alone don't stop
   Lenis's programmatic scrolling. */
let lenis = null

export const setLenis = (instance) => { lenis = instance }
export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()
