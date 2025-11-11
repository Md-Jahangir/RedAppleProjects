class InstructionPopup {
    constructor(scene) {
        this.scene = scene;
    };

    CreateInstructionPopup() {
        this.instructionPopupGroup = this.scene.add.group();

        // this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "one_pixel_black", 0, 0, 3000, 3000, "true", this.OverlayPressed);
        this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "instruction_overlay", 0, 0, scaleFactor, scaleFactor, "true", this.OverlayPressed);

        // this.overlay.alpha = 0.6;

        let tapTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '62px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.tapText = this.scene.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.5), "COLLECT THE LOWER NUMBER\n\nTAP TO PLAY", tapTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);

        this.hand = this.scene.add.sprite(Math.round(game.config.width / 1.9), Math.round(game.config.height / 1.2), "hand").setScale(scaleFactor, scaleFactor);
        this.scene.anims.create({
            key: "hand_tap",
            frameRate: 15,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("hand", { start: 0, end: 11 }),
        });
        setTimeout(() => {
            this.hand.play("hand_tap");
        }, 500);

        this.instructionPopupGroup.add(this.overlay);
        this.instructionPopupGroup.add(this.tapText);
        this.instructionPopupGroup.add(this.hand);

        this.instructionPopupGroup.setDepth(2);

    }

    OverlayPressed() {
        this.scene.scene.instructionPopup.HideInstructionPopup();
        this.scene.scene.willStartGame = true;
    }

    HideInstructionPopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.scene.instructionPopup.instructionPopupGroup],
            alpha: 0,
            ease: 'Linear',
            duration: 100,
            onComplete: this.onHideInstructionPopup
        });
    }

    onHideInstructionPopup(_this) {
        this.parent.scene.instructionPopup.instructionPopupGroup.setVisible(false);
    }

};

export default InstructionPopup;