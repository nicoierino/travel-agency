import throttle from "lodash/throttle"

class StickyHeader {
    constructor() {
        this.StickyHeader = document.querySelector(".site-header")
        this.events()
    }

    events() {
        window.addEventListener("scroll", throttle(() => {
            this.runOnScroll()
        }, 333))
    }

    runOnScroll() {
        if (window.scrollY > 60) {
            this.StickyHeader.classList.add("site-header--dark")
        } else {
            this.StickyHeader.classList.remove("site-header--dark")
        }
    }

}

export default StickyHeader