import { gsap } from "gsap";

const homeCta = document.querySelector(".js-btn");

if (homeCta && IntersectionObserver) {

    const ctaTrigger = document.getElementById("home-sections");
    const ctaCancel = document.getElementById("home-cta");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(homeCta, {
                    autoAlpha: 1,
                    display: "flex",
                    duration: .2,
                    ease: "power2",
                    y: 0,
                    x: "-50%"
                });
    
            } else {
                gsap.to(homeCta, {
                    autoAlpha: 0,
                    display: "none",
                    duration: .2,
                    ease: "power2",
                    y: 50,
                    x: "-50%"
                });
            }
        })
    }, {threshold: 0.2}
    )
    
    observer.observe(ctaTrigger);  
    
    const observerClose = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(homeCta, {
                    autoAlpha: 0,
                    display: "none",
                    duration: .2,
                    ease: "power2",
                    y: 50,
                    x: "-50%"
                });
            }
        })
    }, {threshold: 0.2}
    )
    
    observerClose.observe(ctaCancel); 
}