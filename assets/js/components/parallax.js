import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const homeIllustration = document.querySelector(".home-btn");

const parallax = gsap.timeline({
  scrollTrigger: {
    trigger: "main",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

if (homeIllustration && IntersectionObserver) {

    const illustrationTrigger = document.getElementById("illustration-trigger");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.utils.toArray(".parallax").forEach(layer => {
                const depth = layer.dataset.depth;
                const movement = -(70 * depth)
                parallax.to(layer, {y: movement, ease: "none"}, 0)
              });
            }
        })
    }, {threshold: 1}
    )
    
    observer.observe(illustrationTrigger);    
}