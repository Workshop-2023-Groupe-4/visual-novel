import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const triggerElt = document.querySelector(".gradation-animation");

if(triggerElt){

  const line1 = document.querySelector(".line-1");
  const line2 = document.querySelector(".line-2");
  const line3 = document.querySelector(".line-3");
  const tlHome = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElt,
      start: "-=200",
      end: "bottom top",
      scrub: 1,
      pin: true
    }
  });
  tlHome.to(line1, {display: "block", scale: 1.5, color: '#FF2222', duration: .3})
  tlHome.to(line1, {display: "none", duration: .3})
  tlHome.to(line2, {display: "block", scale: 1.5, color: '#FF2222', duration: .3})
  tlHome.to(line2, {display: "none", duration: .3})
  tlHome.to(line3, {display: "block", scale: 1.5, color: '#FF2222', duration: .3})
  tlHome.to(line3, {display: "none", duration: .3})
}
