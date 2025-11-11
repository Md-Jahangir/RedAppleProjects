class CategoryChoosePopup {
    constructor(scene) {
        this.scene = scene;
    };

    CreateChooseCategoryPopup() {
        this.chooseCategoryPopupContainer = this.scene.add.container();

        this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "one_pixel_black", 0, 0, 3000, 3000, "true", this.OverlayPressed);
        this.overlay.alpha = 0.6;

        this.base = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "popup_base", 0.5, 0.5, scaleFactor, scaleFactor);

        this.easyButtonContainer = this.scene.add.container(0, 0);
        this.easyButton = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 3), Math.round(game.config.height / 2.1), "easy_button_base", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.EasyButtonPressed, this.EasyButtonReleased);
        var easyTextStyle = { fontFamily: 'Bahnschrift', fontSize: '46px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.easyText = this.scene.add.text(Math.round(game.config.width / 3), Math.round(game.config.height / 1.98), "EASY", easyTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        this.easyButtonContainer.add([this.easyButton, this.easyText]);

        this.mediumButtonContainer = this.scene.add.container(0, 0);
        this.mediumButton = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 2), Math.round(game.config.height / 2.1), "medium_button_base", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.MediumButtonPressed, this.MediumButtonReleased);
        var mediumTextStyle = { fontFamily: 'Bahnschrift', fontSize: '46px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.mediumText = this.scene.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.98), "MEDIUM", mediumTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        this.mediumButtonContainer.add([this.mediumButton, this.mediumText]);

        this.hardButtonContainer = this.scene.add.container(0, 0);
        this.hardButton = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 1.5), Math.round(game.config.height / 2.1), "hard_button_base", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.HardButtonPressed, this.HardButtonReleased);
        var hardTextStyle = { fontFamily: 'Bahnschrift', fontSize: '46px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.hardText = this.scene.add.text(Math.round(game.config.width / 1.5), Math.round(game.config.height / 1.98), "HARD", hardTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        this.hardButtonContainer.add([this.hardButton, this.hardText]);

        this.chooseCategoryPopupContainer.add([this.overlay, this.base, this.easyButtonContainer, this.mediumButtonContainer, this.hardButtonContainer]);

        this.chooseCategoryPopupContainer.setAlpha(0);

        this.scene.CategoryChoosePopup.ShowChooseCategoryPopup();
    }

    OverlayPressed() {

    }

    EasyButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.CategoryChoosePopup.easyButton, scaleFactor);
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.CategoryChoosePopup.easyText, scaleFactor);
    }
    EasyButtonReleased() {
        setTimeout(() => {
            this.scene.scene.CategoryChoosePopup.HideChooseCategoryPopup();
        }, 100);
    }

    MediumButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.CategoryChoosePopup.mediumButton, scaleFactor);
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.CategoryChoosePopup.mediumText, scaleFactor);
    }
    MediumButtonReleased() {
        setTimeout(() => {
            this.scene.scene.CategoryChoosePopup.HideChooseCategoryPopup();
        }, 100);
    }

    HardButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.CategoryChoosePopup.hardButton, scaleFactor);
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.CategoryChoosePopup.hardText, scaleFactor);
    }
    HardButtonReleased() {
        setTimeout(() => {
            this.scene.scene.CategoryChoosePopup.HideChooseCategoryPopup();
        }, 100);
    }

    ShowChooseCategoryPopup() {
        console.log("this scene: ", this.scene);
        var alphaTween = this.scene.add.tween({
            targets: [this.scene.CategoryChoosePopup.chooseCategoryPopupContainer],
            alpha: 1,
            ease: 'Linear',
            duration: 300
        });
    }
    HideChooseCategoryPopup() {
        var alphaTween = this.scene.add.tween({
            targets: [this.scene.CategoryChoosePopup.chooseCategoryPopupContainer],
            alpha: 0,
            ease: 'Linear',
            duration: 300,
            onComplete: this.onHideCategoryPopup
        });
    }

    onHideCategoryPopup(_this) {
        this.parent.scene.CategoryChoosePopup.chooseCategoryPopupContainer.setVisible(false);
    }

};

export default CategoryChoosePopup;