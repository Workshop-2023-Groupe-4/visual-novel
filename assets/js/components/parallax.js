import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const homeIllustration = document.querySelector(".home-illustration");
const homeParallax = document.querySelectorAll(".parallax");

if (homeIllustration ) {
  homeParallax.forEach( parallax=> {
    const depth = parallax.dataset.depth;
    const movement = 70 * depth;

    gsap.to(parallax, {
      y: movement,
      ease: "none",
      scrollTrigger: {
          trigger: homeIllustration,
          scrub: true,
          start: "-=200",
          end: "bottom top"
      },
    })
  })
}
