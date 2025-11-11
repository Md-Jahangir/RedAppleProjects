class ErrorPopup {
    constructor(scene) {
        this.scene = scene;
        this.CreateErrorPopup();
    };

    CreateErrorPopup() {
        this.errorPopupContainer = this.scene.add.container(Math.round(game.config.width / 2), Math.round(game.config.height / 2)).setScale(scaleFactor);
        // this.overlay = this.scene.add.image(0, 0, "overlay").setInteractive();
        // this.overlay.on("pointerdown", this.OverlayPressed, this);
        const errorTextStyle = { font: "bold 30px Arial", fill: "#fff",    wordWrap: { width: 300 }};
        this.popupBg = this.scene.add.sprite(0, 0, "popupBg").setOrigin(0.5, 0.5).setScale(scaleFactor);
        this.errorText = this.scene.add.text(0, 0,  "", errorTextStyle).setOrigin(0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        
        // this.loadingPopupContainer.add(this.overlay);
        this.errorPopupContainer.add(this.popupBg);
        this.errorPopupContainer.add(this.errorText);
        this.errorPopupContainer.setDepth(5);
        this.errorPopupContainer.alpha = 0;
    };
    ShowErrorPopup(_text) {
        // console.log("this.scene",this.scene);
        this.scene.errorPopup.errorPopupContainer.list[1].text = _text;
        if (this.scene.errorPopup.errorPopupContainer != null) 
        {
            this.scene.errorPopup.errorPopupContainer.visible = true;
            this.scene.errorPopup.errorPopupContainer.alpha = 1;
            // let alphaTween = this.scene.add.tween({
            //     targets: [this.scene.loadingPopup.loadingPopupContainer],
            //     alpha: 1,
            //     ease: 'Linear',
            //     duration: 200
            // });
        }
    };
    HideErrorPopup() {
        if (this.scene.errorPopup.errorPopupContainer != null) {
            this.onHideErrorPopup();
            // let alphaTween = this.scene.add.tween({
            //     targets: [this.scene.loadingPopup.loadingPopupContainer],
            //     alpha: 0,
            //     ease: 'Linear',
            //     duration: 200,
            //     onComplete: this.onHideLoadingPopup
            // });
        }
    };
    onHideErrorPopup(_this) {
        this.scene.errorPopup.errorPopupContainer.setVisible(false);
    };
    OverlayPressed() {};
};
export {ErrorPopup as ErrorPopup};