import gsap from 'gsap';
import TextSplitter from '../helpers/TextSplitter';

export default class LineScroller {
    constructor(element, type) {
        this.element = element;
        this.type = type;
        this.init();
    }
    init() {
        if (this.element.innerText.length > 0) {
            this.split = new TextSplitter(this.element, {
                type: this.type,
                overflow: 'hidden'
            });
        }
        this.prepare();
        this.element.classList.add('is-ready');
    }
    prepare() {
        this.timeline = new gsap.timeline({paused: true});
        if (this.split) {
            this.timeline.from(this.split.elements, {
                duration: 1.5,
                ease: "expo.out",
                opacity: 0,
                y: '100%'}
            );
        }
    }
    play() {
        this.timeline.play();
    }
    restart() {
        this.timeline.restart();
    }
    destroy() {
        if (this.split) {
            this.split.destroy();
        }
    }
}