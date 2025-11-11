class LoadingPopup {
    constructor(scene) {
        this.scene = scene;
        this.loadingPopupContainer = null;
        this.loading = null;
        this.CreateLoadingPopup();
    };

    CreateLoadingPopup() {
        this.loadingPopupContainer = this.scene.add.container(Math.round(game.config.width / 2), Math.round(game.config.height / 2)).setScale(scaleFactor);
        this.loading = this.scene.add.sprite(0, 0, "loading_wheel").setOrigin(0.5, 0.5);
        this.scene.anims.create({
            key: "loading_anim",
            frameRate: 5,
            frames: this.scene.anims.generateFrameNumbers("loading_wheel", { start: 0, end: 2 }),
            repeat: -1
        });
        this.loading.play("loading_anim");

        this.loadingPopupContainer.add(this.loading);

        this.loadingPopupContainer.setDepth(4);
        this.loadingPopupContainer.alpha = 0;

    }


    ShowLoadingPopup() {
        if (this.scene.loadingPopup.loadingPopupContainer != null) {
            this.scene.loadingPopup.loadingPopupContainer.visible = true;
            this.scene.loadingPopup.loadingPopupContainer.alpha = 1;
        }

    }
    HideLoadingPopup() {
        if (this.scene.loadingPopup.loadingPopupContainer != null) {
            this.onHideLoadingPopup();
        }

    }
    onHideLoadingPopup(_this) {
        this.scene.loadingPopup.loadingPopupContainer.setVisible(false);
    }

    OverlayPressed() { }

};
export { LoadingPopup as LoadingPopup };