const homeCta = document.querySelector(".home-btn");

if (!homeCta) {
    return;
}

const ctaTrigger = document.getElementById("footer");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            homeCta.classList.add('visible');
            console.log("visible normalmeent")
        } else {
            homeCta.classList.remove('visible');
            console.log('finito')
        }
    })
}, {threshold: 1}
)

observer.observe(ctaTrigger);