
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class StoryImage {
	constructor(passage) {
        this.dom = passage;
        this.images = this.dom.querySelectorAll('img:not(:first-child)');
    }
    init() {
        this.images.forEach(image => {
            if (image.className === "left") {
                this.translateImage(image, '-50%');
            } 
            else if (image.className === "right") {
                this.translateImage(image, '50%');
            }
            else if (image.className === "fill") {
                this.scaleImage(image, 2);
            } 
            else if (image.className === "" || image.className === "center") {
                this.scaleImage(image, 1.2);
            }
            else if (image.className === "parallaxScale") {
                const depth = image.dataset.depth;
                const scale = image.dataset.scale;
                this.parallaxScale(image, depth, scale);
            }
            else if (image.className === "parallax") {
                const depth = image.dataset.depth;
                this.parallaxImage(image, depth);
            }
        })
    }
    scaleImage(image, scaleFinal) {
        gsap.to(image, {
            scale: scaleFinal,
            scrollTrigger: {
                trigger: image,
                scrub: true
            }
        }) 
    }
    translateImage(image, tranlation) {
        gsap.from(image, {
            x: tranlation,
            opacity: 0,
            scrollTrigger: {
                trigger: image,
                scrub: true
            },
        }) 
        gsap.to(image, {
            x: '0%',
            opacity: 1,
            scrollTrigger: {
                trigger: image,
                scrub: true,
                start: "top top",
                end: "bottom bottom"
            },
        }) 
    }
    parallaxScale(image, ratio, scale) {
        const movement = -(400 * ratio);
        gsap.to(image, {
            y: movement,
            scale: scale,
            ease: "none",
            scrollTrigger: {
                trigger: image,
                scrub: true,
                start: "-=200",
                end: "bottom top"
            },
        }) 
    }
    parallaxImage(image, ratio) {
        const movement = -(400 * ratio);
        gsap.to(image, {
            y: movement,
            ease: "none",
            scrollTrigger: {
                trigger: image,
                scrub: true,
                start: "-=200",
                end: "bottom top"
            },
        }) 
    }
}