import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".splittext",
    toggleActions: "restart none none none"
  }
}),
  mySplitText = new SplitText(".splittext", {
    type: "words, lines, chars"
  });

tl.from(mySplitText.chars, { opacity: 0, y: 50, ease: "power2", stagger: 0.05 });

document.querySelector("#animate").addEventListener("click", function() {
  tl.restart();
});