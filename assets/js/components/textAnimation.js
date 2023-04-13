

//   // Selecting just the first of my bars
//   const myBar = example0.querySelector('.bar');

//   function callback (entries, observer) {
  //     console.log('entries:', entries);
  //     console.log('observer:', observer);
  //   }

  //   // Instancing a new IntersectionObserver
  //   const observer = new IntersectionObserver(callback);

  //   // Adding a target to be observed
  //   observer.observe(myBar);

  // var tl = gsap.timeline({
    //   scrollTrigger: {
      //     trigger: ".active .dialog",
      //     toggleActions: "restart none none none"
      //   }
      // }),
      //   getLines = new TextSplitter(".active .dialog", {
        //     type: "lines"
        //   });

        // tl.from(getLines.lines, { opacity: 0, y: 50, ease: "power2", stagger: 0.05 });



import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplitter from '../helpers/TextSplitter';

// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(TextSplitter);

var tl = gsap.timeline(),
  mySplitText = new TextSplitter(".dialog", { type: "words,chars" }),
  chars = mySplitText.chars; //an array of all the divs that wrap each character

gsap.set(".dialog", { perspective: 400 });

console.log(chars);

tl.from(chars, {
  duration: 0.8,
  opacity: 0,
  scale: 0,
  y: 80,
  rotationX: 180,
  transformOrigin: "0% 50% -50",
  ease: "back",
  stagger: 0.01
});
