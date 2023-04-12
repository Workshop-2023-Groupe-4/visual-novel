import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const parallax = gsap.timeline({
  scrollTrigger: {
    trigger: ".stories__page  ",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.utils.toArray(".parallax").forEach(layer => {
  console.log(layer.offsetWidth)
  const depth = layer.dataset.depth;
  const movement = -(200 * depth)
  parallax.to(layer, {y: movement, ease: "none"}, 0)
});