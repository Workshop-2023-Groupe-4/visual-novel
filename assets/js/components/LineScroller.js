import gsap from 'gsap';

class LineScroller {
    constructor(element) {
        this.options = {
            speed: 0.3
        }
        this.element = element;
        this.progression = 0;
        this.init();
    }
    init() {
        this.lines = this.element.querySelectorAll('.story p');
        console.log(lines)
        this.timeline = new gsap.timeline({paused: true});

        this.lines.forEach((line, i) => this.addLineToTimeline(line, i));
        this.bindEvents();
    }
    addLineToTimeline(line, i, x = "-100%") {
        const action = i % 2 === 0 ? 'from' : 'to';
        this.timeline[action](line, {
            duration: 1,
            x: '-100%',
            linear: gsap.linear
        }, 0);
    }
    bindEvents() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }
    onScroll() {
        this.progression = this.element.getBoundingClientRect().top / window.innerHeight;
        this.progression = 1 - (Math.max(-1, Math.min(1, this.progression)) + 1) / 2;
        this.timeline.progress(this.progression * this.options.speed);
    }
}

export default LineScroller;
