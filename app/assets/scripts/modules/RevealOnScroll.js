import throttle from "lodash/throttle"
import debounce from "lodash/debounce"

class RevealOnScroll {
    constructor(elements, scrollPercent) {
        this.itemsToReveal = elements
        this.scrollPercentThreshold = scrollPercent
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 300).bind(this)
        this.events()
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(() => {
            console.log("Resize just ran")
            this.browserHeight = window.innerHeight
        }, 333))
    }

    //Funciones
    calcCaller() {
        console.log("Scroll function ran")
        this.itemsToReveal.forEach(element => this.calculateIfScrolledTo(element))
    }

    calculateIfScrolledTo(element) {
        if (element.isRevealed) return
        if (window.scrollY + this.browserHeight <= element.offsetTop) return
        console.log("Element was calculated")
        let scrollPercent = (element.getBoundingClientRect().y / this.browserHeight) * 100
        if (scrollPercent < this.scrollPercentThreshold) {
            element.classList.add("reveal-item--is-visible")
            element.isRevealed = true
            if (element.isLast) {
                window.removeEventListener("scroll", this.scrollThrottle)
            }
        }
        console.log(element.getBoundingClientRect().y)
    }

    hideInitially() {
        this.itemsToReveal.forEach(element => {
            element.classList.add("reveal-item")
            element.isRevealed = false
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLast = true
    }
}

export default RevealOnScroll