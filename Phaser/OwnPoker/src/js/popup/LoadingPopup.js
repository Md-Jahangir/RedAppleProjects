
class LoadingPopup {
    constructor(scene) {
        this.scene = scene;
        this.loadingPopupContainer = null;
        this.overlay = null;
        this.wheelImage = null;

        this.create();
    };
    //#############################################################################################
    /**
     *
     */
    create() {
        this.CreateOverlay();
        this.loadingPopupContainer = this.scene.add.container(0, 0);
        this.loadingPopupContainer.setVisible(false);
        this.loadingPopupContainer.setDepth(3);
        this.CreateWheelAnimation();

    };

    CreateOverlay() {
        this.overlay = this.scene.add.image(0, 0, "overlay").setOrigin(0);
        this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
        this.overlay.setInteractive();
        this.overlay.setDepth(3);
        this.overlay.setVisible(false);
    };

    CreateWheelAnimation() {
        this.wheelImage = this.scene.add.sprite(0, 0, "loading_wheel").setOrigin(0.5);
        if (!this.scene.anims.exists("loading_anim")) {
            this.scene.anims.create({
                key: "loading_anim",
                frameRate: 4,
                repeat: -1,
                frames: this.scene.anims.generateFrameNumbers("loading_wheel", { start: 0, end: 2 }),
            });
        }
        this.loadingPopupContainer.add(this.wheelImage);

    };
    ShowLoadingPopup() {
        this.overlay.setVisible(true);
        this.loadingPopupContainer.setVisible(true);
        this.wheelImage.play("loading_anim");
    };

    HideLoadingPopup() {
        this.overlay.setVisible(false);
        this.loadingPopupContainer.setVisible(false);
    };

    resize(newWidth, newHeight, newScale) {
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.loadingPopupContainer.setScale(newScale);
        this.loadingPopupContainer.setPosition((newWidth / 2), (newHeight / 2));
    };

};

export default LoadingPopup;