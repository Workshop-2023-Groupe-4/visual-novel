import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const allElt = gsap.utils.toArray(".gradation-animation__item");
allElt.forEach((elt) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: elt,
      pin: true,
      pinSpacing: false,
      scrub: true
    }
  });
  tl.to(elt, {
    autoAlpha: 1,
    color: '#FF2222',
    scale: 1.5,
    duration: 0.7
  }).to(
    elt,
    {
      autoAlpha: 0
    },
    0.5
  );
});
