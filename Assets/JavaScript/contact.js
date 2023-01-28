import { header, ANIM, navBackgroundChanger, startAnimation, C_SHOW } from "./common/utils/animations.js"


// Active Page Animations
const pageAnimator = () => {

    // Header
    header.classList.add(ANIM)
    navBackgroundChanger()

    let scrollPos = window.scrollY, viewPort = window.visualViewport.height - header.offsetHeight
    startAnimation(formContainer.querySelector(".grad-bg"), formContainer, scrollPos, viewPort) // Form Gradient Heading
    startAnimation(formContainer.querySelector("form"), formContainer, scrollPos, viewPort) // Contact Form
}
const formContainer = document.querySelector("article.form-wrapper")
window.addEventListener("DOMContentLoaded", pageAnimator)
window.addEventListener("scroll", pageAnimator)


// FAQ Show/Hide Script
const faqContainer = document.querySelector(".faqs-container")
faqContainer.querySelectorAll(".question").forEach((ques) => {
    ques.addEventListener("click", () => {
        let showingFAQ = faqContainer.querySelector(`.question.${C_SHOW}`)
        if (showingFAQ) {
            showingFAQ.classList.remove(C_SHOW)
        }
        ques.classList.add(C_SHOW)
    })
})