const CLASSES = {
    hidden: 'hidden',
    storyPassage: 'storyPassage',
    choicesList: 'choicesList'
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

        if (!passage) {
            return;
        }

        this.getChoices(passage);

        this.hideAllPassages();
        passage.classList.remove(CLASSES.hidden);
        scrollTo(0, 0);
    }
    getChoices(passage) {
        this.linksContainer = passage.querySelector('.storyPassage__links');
        this.links = this.linksContainer.querySelectorAll('li');
        if (this.links.length > 1) {
            this.linksContainer.classList.add(CLASSES.choicesList);
        }
    }

    start() {
        if (document.location.hash) {
            this.showPassage(document.location.hash);
            return;
        }

        this.showPassage(this.startPassage);
    }
}