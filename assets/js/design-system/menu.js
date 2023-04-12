const CLASSES = {
    mainMenuOpened: 'menu-is-opened',
    isAnimating: 'is-animating',
    scrollingDown: 'is-scrolling-down',
    menusOpened: 'has-menu-opened',
    sticky: 'is-sticky'
};
class Menu {
    constructor (selector) {
        this.element = document.querySelector(selector);
        this.menu = this.element.querySelector('.menu');
        this.nav = this.element.querySelector('header#header nav');
        this.mainButton = this.element.querySelector('button');

        this.state = {
            isOpened: false,
            isMobile: false,
            hasDropdownOpened: false,
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

        // Close dropdown to avoid keeping overlay when mobile and menu closed 
        if (this.state.isMobile && !this.state.isOpened) {
            this.state.hasDropdownOpened = false;
        }

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
    }

    onScroll () {
        const offset = this.element.offsetHeight,
            y = window.scrollY,
            threshold = 50;
        let hasChanged = false;

        if (y > this.state.previousScrollY + threshold) {
            this.element.classList.add("hidden");
            hasChanged = true;
        } else if (y < this.state.previousScrollY - threshold){
            this.element.classList.remove("hidden");
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
