const CLASSES = {
    mainMenuOpened: 'menu-is-opened',
    scrollingDown: 'is-scrolling-down',
    sticky: 'is-sticky'
};
class Menu {
    constructor (selector) {
        this.element = document.querySelector(selector);
        this.globalHeader = document.querySelector("header.global-header");
        this.storyNavLinks = this.element.querySelectorAll(".menu a");
        if (!this.element) {
            return;
        }
        this.menu = this.element.querySelector('.menu');
        this.nav = this.element.querySelector('nav');
        this.mainButton = this.element.querySelector('button');

        this.state = {
            isOpened: false,
            previousScrollY: window.scrollY
        };

        this.listen();
    }
    listen () {
        this.mainButton.addEventListener('click', () => {
            this.toggleMainMenu();
        });
        ['scroll', 'touchmove'].forEach(event => {
            window.addEventListener(event, this.onScroll.bind(this));
        });
    }
    toggleMainMenu (open = !this.state.isOpened) {
        let classAction;
        this.state.isOpened = open;

        classAction = this.state.isOpened ? 'add' : 'remove';
        this.mainButton.setAttribute('aria-expanded', this.state.isOpened);
        this.nav.classList[classAction](CLASSES.mainMenuOpened);

        window.addEventListener('click', (event) => {
            if (event.target === document.body) {
                this.closeEverything();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 27 || event.key === 'Escape') {
                this.closeEverything();
            }
        });
        this.storyNavLinks.forEach(link => {
            link.addEventListener("click", () => {
                this.closeEverything();
            })
        })
    }

    onScroll () {
        const offset = this.globalHeader.offsetHeight,
            y = window.scrollY,
            threshold = 30;
        let hasChanged = false;

        if (y > this.state.previousScrollY + threshold) {
            this.globalHeader.classList.add("hidden");
            hasChanged = true;
        } else if (y < this.state.previousScrollY - threshold){
            this.globalHeader.classList.remove("hidden");
            hasChanged = true;
        }

        if (hasChanged) {
            this.state.previousScrollY = y;
        }
    }

    closeEverything () {
        this.state.isOpened = false;
        this.toggleMainMenu(false);
    }
}

export default new Menu('header#header');
