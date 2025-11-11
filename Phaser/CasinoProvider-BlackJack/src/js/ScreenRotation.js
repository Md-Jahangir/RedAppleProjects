import { Constant } from "./Constant";
export default class ScreenRotation extends Phaser.Scene {
    constructor() {
        super('ScreenRotation' );
        this.gameStarted = false;
    }
    preload() {
        this.load.image('one_pixel_black', 'assets/images/one_pixel_black.png');
        this.load.image('screen_rotation', 'assets/images/screen_rotation.png');
    }

    create() {
        // Create overlay screen
        this.overlay = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'one_pixel_black');
        this.overlay.setAlpha(0.5);
        this.overlay.setScale(1080 * Constant.scaleFactorX, 1920 * Constant.scaleFactorY);

        this.autoRotationBtn = this.add.image(this.overlay.x, this.overlay.y,'screen_rotation');
        this.autoRotationBtn.setScale( Constant.scaleFactorX,  Constant.scaleFactorY);
        // Create auto-rotate button
        this.rotateButtonText = this.add.text(this.autoRotationBtn.x  - 200,  this.autoRotationBtn.y + 150, 'Rotate Your Device', {
            font: '60px Arial  Bold',
            fill: '#ffffff'
        });
        // Event listener for orientation change
        // window.addEventListener("orientationchange", () => {
        //     if (window.screen.orientation == 0 || window.screen.orientation == 180) { // WHEN IN PORTRAIT MODE
        //         // Show overlay and auto-rotate button
        //         this.overlay.setVisible(true);
        //         this.autoRotationBtn.setVisible(true);
        //         this.rotateButtonText.setVisible(true);
        //         // Set gameStarted to false since game needs to reload when orientation changes
        //         this.gameStarted = false;
        //     } else { // WHEN IN LANDSCAPE MODE
        //         // Hide overlay and auto-rotate button
        //         this.overlay.setVisible(false);
        //         this.autoRotationBtn.setVisible(false);
        //         this.rotateButtonText.setVisible(false);

        //         // If the game hasn't started yet, reload the window
        //         if (!this.gameStarted) {
        //             window.location.reload();
        //         }
        //     }
        // });
    }
}

// Add OverlayScene to game scenes
// Constant.game.scene.add('OverlayScene', OverlayScene);