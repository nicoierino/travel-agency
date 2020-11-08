import '../styles/styles.css'
import MobileMenu from "./modules/MobileMenu"
import RevealOnScroll from "./modules/RevealOnScroll"
import StickyHeader from "./modules/StickyHeader"

new RevealOnScroll(document.querySelectorAll(".feature-item"), 85)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 85)

new StickyHeader()

new MobileMenu()

if (module.hot) module.hot.accept()

