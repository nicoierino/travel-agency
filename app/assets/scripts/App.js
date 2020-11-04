import '../styles/styles.css'
import MobileMenu from "./modules/MobileMenu"
import RevealOnScroll from "./modules/RevealOnScroll"

let revealOnScroll = new RevealOnScroll(document.querySelectorAll(".feature-item"), 85)
let revealOnScroll2 = new RevealOnScroll(document.querySelectorAll(".testimonial"), 85)
let mobileMenu = new MobileMenu()

if (module.hot) module.hot.accept()

