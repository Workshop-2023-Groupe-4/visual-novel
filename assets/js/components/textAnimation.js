import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


  // Selecting just the first of my bars
  const myBar = example0.querySelector('.bar');

  function callback (entries, observer) {
    console.log('entries:', entries);
    console.log('observer:', observer);
  }
  
  // Instancing a new IntersectionObserver
  const observer = new IntersectionObserver(callback);

  // Adding a target to be observed
  observer.observe(myBar);

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