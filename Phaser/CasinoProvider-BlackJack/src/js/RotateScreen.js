export default class RotateScreen {
    constructor(game) {
        this.game = game;
        this.overlay = null;
        this.image = null;
        this.text = null;
        this.init();
    }

    init() {
        this.overlay = document.createElement('div');
        this.overlay.style.position = 'fixed';
        this.overlay.style.top = 0;
        this.overlay.style.left = 0;
        this.overlay.style.width = '100%';
        this.overlay.style.height = '100%';
        this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Optional semi-transparent background
        this.overlay.style.display = 'none'; // Start hidden
        this.overlay.style.zIndex = 9999;
        document.body.appendChild(this.overlay);
        this.overlay.style.pointerEvents = 'auto';

        // Add the "rotate-screen" image
        this.image = document.createElement('img');
        this.image.src = document.getElementById('rotate-screen').src; // Use preloaded image
        this.image.style.position = 'absolute';
        this.image.style.width = `${window.innerWidth}px`; // Set to window width
        this.image.style.height = `${window.innerHeight}px`; // Set to window height
        this.image.style.objectFit = 'cover'; // Ensures the image scales properly
        this.image.style.top = 0;
        this.image.style.left = 0;
        this.image.style.cursor = 'pointer';
        this.overlay.appendChild(this.image);

        // Add the text element
        this.text = document.createElement('div');
        this.text.innerText = 'Please rotate your screen to landscape mode';
        this.text.style.position = 'absolute';
        this.text.style.bottom = '100px'; // Adjusted 100px below the image
        this.text.style.left = '50%';
        this.text.style.transform = 'translateX(-50%)'; // Center horizontally
        this.text.style.color = '#fff';
        this.text.style.fontSize = '40px';
        this.text.style.textAlign = 'center';
        this.overlay.appendChild(this.text);

        // Add event listener for resize or orientation change
        window.addEventListener('resize', () => this.checkOrientation());
        this.checkOrientation(); // Perform an initial check
    }

    checkOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        if (isPortrait) {
            this.overlay.style.display = 'flex';
            console.log('timeScalesForScenes', this.game);
            this.game.input.enabled = false;
        } else {
            this.overlay.style.display = 'none';
            this.game.input.enabled = true;
        }
    }

    destroy() {
        // Cleanup when no longer needed
        window.removeEventListener('resize', this.checkOrientation);
        document.body.removeChild(this.overlay);
    }
}
