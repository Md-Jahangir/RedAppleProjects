class LoadingPopup {
    constructor(scene) {
        this.scene = scene;
        this.loadingPopupContainer =null;
        this.loading =null;
        this.CreateLoadingPopup();
    };

    CreateLoadingPopup() {
        this.loadingPopupContainer = this.scene.add.container(Math.round(game.config.width / 2), Math.round(game.config.height / 2)).setScale(scaleFactor);

        // this.overlay = this.scene.add.image(0, 0, "overlay").setInteractive();
        // this.overlay.on("pointerdown", this.OverlayPressed, this);

        this.loading = this.scene.add.sprite(0, 0, "loading_wheel").setOrigin(0.5, 0.5);
        // this.loading1 = this.scene.add.sprite(0, 0, "loading_wheel").setOrigin(0.5, 0.5);
        // this.loading2 = this.scene.add.sprite(0, 0, "loading_wheel").setOrigin(0.5, 0.5);
        // this.loading3 = this.scene.add.sprite(0, 0, "loading_wheel").setOrigin(0.5, 0.5);

        this.scene.anims.create({
            key: "loading_anim",
            frameRate: 5,
            frames: this.scene.anims.generateFrameNumbers("loading_wheel", { start: 0, end: 2 }),
            repeat: -1
        });
        this.loading.play("loading_anim");

        // this.loadingPopupContainer.add(this.overlay);
        this.loadingPopupContainer.add(this.loading);
        // this.loadingPopupContainer.add(this.loading1);
        // this.loadingPopupContainer.add(this.loading2);
        // this.loadingPopupContainer.add(this.loading3);

        this.loadingPopupContainer.setDepth(4);
        this.loadingPopupContainer.alpha = 0;
        // console.log("  this.loadingPopupContainer",  this.loadingPopupContainer);
        
    }


    ShowLoadingPopup() {
        // console.log("this.scene.loadingPopup.loadingPopupContainer",this.scene.loadingPopup.loadingPopupContainer);
        if (this.scene.loadingPopup.loadingPopupContainer != null) {
            this.scene.loadingPopup.loadingPopupContainer.visible = true;
            // if (this.scene == "LoginScene") {
            //     this.scene.HideInputField();
            // }
            this.scene.loadingPopup.loadingPopupContainer.alpha =  1;
            // let alphaTween = this.scene.add.tween({
            //     targets: [this.scene.loadingPopup.loadingPopupContainer],
            //     alpha: 1,
            //     ease: 'Linear',
            //     duration: 200
            // });
        }

    }
    HideLoadingPopup() {
        if (this.scene.loadingPopup.loadingPopupContainer != null) {
            this.onHideLoadingPopup();
            // let alphaTween = this.scene.add.tween({
            //     targets: [this.scene.loadingPopup.loadingPopupContainer],
            //     alpha: 0,
            //     ease: 'Linear',
            //     duration: 200,
            //     onComplete: this.onHideLoadingPopup
            // });

            // if (this.scene == "LoginScene") {
            //     this.scene.ShowInputField();
            // }
            // if (this.scene.ShowInputField != null) {
            //     console.log("login")
            //     this.scene.ShowInputField();
            // }
            // if (this.scene.changePasswordPopup != null) {
            //     console.log("show input");
            //     this.scene.changePasswordPopup.ShowInputField();
            // }
        }

    }
    onHideLoadingPopup(_this) {
        this.scene.loadingPopup.loadingPopupContainer.setVisible(false);
    }

    OverlayPressed() {}

};
export {LoadingPopup as LoadingPopup};