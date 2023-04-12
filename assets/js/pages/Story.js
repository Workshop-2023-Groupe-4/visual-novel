
import LineScroller from '../animations/LineScroller';

const CLASSES = {
    hidden: 'hidden',
    storyPassage: 'storyPassage',
};

export default class Story {
    constructor() {
        this.passagesElement = document.getElementById('storyPassages');

        this.startPassage = this.passagesElement.dataset.start;

        this.#listen();
    }

    // méthode privée, voir https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
    #listen() {
        window.addEventListener('popstate', event => {
            this.showPassage(document.location.hash)
        });
    }

    getPassageElementFromAnchor(anchor) {
        let id = anchor.replace('#', '');
        return document.getElementById(id);
    }

    hideAllPassages() {
        let allPassagesElements = this.passagesElement.querySelectorAll('.' + CLASSES.storyPassage);

        allPassagesElements.forEach(el => {
            el.classList.add(CLASSES.hidden);
        })
    }

    showPassage(passageAnchor) {
        let passage = this.getPassageElementFromAnchor(passageAnchor);
        this.splittedDialogs = new LineScroller(passage.querySelector('.dialog'), 'line');

        if (!passage) {
            return;
        }

        this.hideAllPassages();
        passage.classList.remove(CLASSES.hidden);
    }

    start() {
        if (document.location.hash) {
            this.showPassage(document.location.hash);
            return;
        }

        this.showPassage(this.startPassage);
        this.splittedDialogs.play();
    }
}