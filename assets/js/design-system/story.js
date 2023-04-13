
import StoryImage from '../components/StoryImage';

const CLASSES = {
    hidden: 'hidden',
    storyPassage: 'storyPassage',
};

export default class Story {
    constructor() {
        this.passagesElement = document.getElementById('storyPassages');

        this.startPassage = this.passagesElement.dataset.start;

        this.listen();
    }

    listen() {
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
        passage.classList.add('active');

        if (!passage) {
            return;
        }

        this.playAnimations(passage);

        this.hideAllPassages();
        passage.classList.remove(CLASSES.hidden);
        scrollTo(0, 0);
    }

    playAnimations(passage) {
        window.storyImage = new StoryImage(passage);
        storyImage.init();
    }

    start() {
        if (document.location.hash) {
            this.showPassage(document.location.hash);
            return;
        }

        this.showPassage(this.startPassage);
    }
}