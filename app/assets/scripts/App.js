import '../styles/styles.css'
import MobileMenu from "./modules/MobileMenu"
import RevealOnScroll from "./modules/RevealOnScroll"
import StickyHeader from "./modules/StickyHeader"

new RevealOnScroll(document.querySelectorAll(".feature-item"), 85)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 85)
new StickyHeader()
new MobileMenu()

let modal

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", ev => {
        ev.preventDefault()
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal" */ "./modules/Modal")
                .then((x) => {
                    modal = new x.default()
                    modal.openTheModal()
                })
                .catch(() => {
                    console.error("there was an error")
                })
        } else {
            modal.openTheModal()
        }
    })
})

if (module.hot) module.hot.accept()

