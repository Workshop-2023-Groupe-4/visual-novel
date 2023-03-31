const CLASSES = {
    mainMenuOpened: 'is-opened',
    isAnimating: 'is-animating',
    scrollingDown: 'is-scrolling-down',
    menusOpened: 'has-menu-opened',
    sticky: 'is-sticky'
};
class Menu {
    constructor (selector) {
        this.element = document.querySelector(selector);
        this.menu = this.element.querySelector('.menu');
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
    }
    toggleMainMenu (open = !this.state.isOpened) {
        let classAction;
        this.state.isOpened = open;
        classAction = this.state.isOpened ? 'add' : 'remove';
        this.mainButton.setAttribute('aria-expanded', this.state.isOpened);
        this.menu.classList[classAction](CLASSES.mainMenuOpened);

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

    closeEverything () {
        this.state.isOpened = false;
        this.toggleMainMenu(false);
    }
}

export default new Menu('header#header');
