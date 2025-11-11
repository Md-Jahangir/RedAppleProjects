
import { Constant } from "./Constant";
import { Utils } from "./Utils";
class FloatPanel {
    constructor(scene) {
        this.scene = scene;
        this.floatPanelContainer = null;
        this.plateContainer = null;
        this.howManyPlate = 3;
        this.sizeNameTextArray = [Constant.smallText, Constant.mediumText, Constant.bigText];
        this.floatPlateItems = [];

        this.create();
    };

    ShowFloatPanel() {
        this.scene.incense.HideAllIncenseObjects();
        this.scene.candle.HideAllCandleObjects();
        this.scene.flower.HideAllFlowerObjects();
        this.floatPanelContainer.setVisible(true);
    };
    HideFloatPanel() {
        this.floatPanelContainer.setVisible(false);
    }

    create() {
        this.floatPanelContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.plateContainer = this.scene.add.container(0, 0);

        this.CreateCharacterBackground();
        this.CreateCharacter();
        this.CreateFrontBgLayer();
        this.CreateMermaidWaterRipples();
        this.CreateLeftBubbles();
        this.CreateRightBubbles();
        this.CreateBratibMovingWater();

        this.floatPanelContainer.setVisible(false);

    };

    CreateCharacterBackground() {
        this.rotateBg = this.scene.add.image(0, -450, "meramaid_glow_rotate").setOrigin(0.5).setScale(0);
        this.floatPanelContainer.add(this.rotateBg);

    };
    ShowCharacterBg() {
        let scaleTween = this.scene.add.tween({
            targets: [this.rotateBg],
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function () {
                this.RotateCharacterBg();
            }
        });
    }
    RotateCharacterBg() {
        let angleTween = this.scene.tweens.add({
            targets: this.rotateBg,
            angle: 360,
            ease: 'Linear',
            repeat: -1,
            duration: 7000,
        });
    };

    CreateCharacter() {
        this.mermaidCharacter = this.scene.add.image(0, 1000, "mermaid").setOrigin(0.5).setScale(0.8);
        this.floatPanelContainer.add(this.mermaidCharacter);
    };
    CreateFrontBgLayer() {
        this.frontBg = this.scene.add.image(0, 0, "float_water_layer").setOrigin(0.5).setScale(1.1);
        this.floatPanelContainer.add(this.frontBg);
        // this.frontBg = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "float_water_layer").setOrigin(0.5);
    };
    CreateMermaidWaterRipples() {
        this.waterRipples = this.scene.add.sprite(0, 230, "mermaid_ripples").setOrigin(0.5);
        this.waterRipples.setVisible(false);
        this.floatPanelContainer.add(this.waterRipples);
    };
    CreateLeftBubbles() {
        this.leftBubbles = this.scene.add.sprite(-200, 100, "bubbles").setOrigin(0.5);
        this.leftBubbles.setVisible(false);
        this.floatPanelContainer.add(this.leftBubbles);
    };
    CreateRightBubbles() {
        this.rightBubbles = this.scene.add.sprite(200, 100, "bubbles").setOrigin(0.5);
        this.rightBubbles.setVisible(false);
        this.floatPanelContainer.add(this.rightBubbles);
    };

    ShowRipplesAndLeftRightBubbleAnimation() {
        this.waterRipples.setVisible(true);
        this.leftBubbles.setVisible(true);
        this.rightBubbles.setVisible(true);
        this.waterRipples.play("mermaid_ripples_anim");
        this.leftBubbles.play("bubbles_anim");
        this.rightBubbles.play("bubbles_anim");
    };

    CreateBratibMovingWater() {
        this.movingWater = this.scene.add.sprite(0, 1500, "bratib_move_water").setOrigin(0.5);
        // this.movingWater.setVisible(false);
        this.floatPanelContainer.add(this.movingWater);
    };

    // ResizeMovingWater(_scale, _posY) {
    //     this.movingWater.setScale(_scale);
    //     this.movingWater.setPosition(0, _posY);
    // };

    ShowMovingWaterAnimation(_scale, _posY) {
        this.movingWater.setScale(_scale);
        // this.movingWater.setVisible(true);
        this.movingWater.play("bratib_move_water_anim");

        let posTween = this.scene.tweens.add({
            targets: [this.movingWater],
            y: (_posY + 400),
            x: this.movingWater.x + 50,
            scaleX: (_scale - 0.1),
            scaleY: (_scale - 0.1),
            ease: 'Linear',
            duration: 1500,
            callbackScope: this,
            onComplete: function (tween) {
                let posTween = this.scene.tweens.add({
                    targets: [this.movingWater],
                    y: (_posY + 200),
                    x: this.movingWater.x - 30,
                    scaleX: (_scale - 0.05),
                    scaleY: (_scale - 0.05),
                    ease: 'Linear',
                    duration: 1000,
                    callbackScope: this,
                    onComplete: function (tween) {
                        let posTween = this.scene.tweens.add({
                            targets: [this.movingWater],
                            y: _posY,
                            x: this.movingWater.x,
                            scaleX: (_scale - 0.05),
                            scaleY: (_scale - 0.05),
                            ease: 'Linear',
                            duration: 1000,
                            callbackScope: this,
                            onComplete: function (tween) {

                            }
                        });
                    }
                });
            }
        });
    };

    ShowCharacter() {
        this.scene.HideSoundButton();
        this.ShowRipplesAndLeftRightBubbleAnimation();
        let posTween = this.scene.tweens.add({
            targets: [this.mermaidCharacter],
            y: -350,
            ease: 'Linear',
            duration: 2500,
            callbackScope: this,
            onComplete: function (tween) {
                this.ShowCharacterBg();
                setTimeout(() => {
                    this.scene.winPopup.ShowWinPopup();
                }, 500);
            }
        });
    };

    ShowFloatingPlate(_obj, _posY) {
        let posTween = this.scene.tweens.add({
            targets: [_obj, this.movingWater],
            y: (_posY + 400),
            x: _obj.x + 50,
            scaleX: (_obj.scaleX - 0.1),
            scaleY: (_obj.scaleX - 0.1),
            ease: 'Linear',
            duration: 1500,
            callbackScope: this,
            onComplete: function (tween) {
                let posTween = this.scene.tweens.add({
                    targets: [_obj, this.movingWater],
                    y: (_posY + 200),
                    x: _obj.x - 30,
                    scaleX: (_obj.scaleX - 0.05),
                    scaleY: (_obj.scaleX - 0.05),
                    ease: 'Linear',
                    duration: 1000,
                    callbackScope: this,
                    onComplete: function (tween) {
                        let posTween = this.scene.tweens.add({
                            targets: [_obj, this.movingWater],
                            y: _posY,
                            x: _obj.x,
                            scaleX: (_obj.scaleX - 0.05),
                            scaleY: (_obj.scaleX - 0.05),
                            ease: 'Linear',
                            duration: 1000,
                            callbackScope: this,
                            onComplete: function (tween) {
                                let text = this.scene.gameplayUI.timerText.text;
                                let split = text.split(":");
                                let time = split[1];
                                if (time > 0) {
                                    setTimeout(() => {
                                        this.ShowCharacter();
                                    }, 100);
                                } else {
                                    this.scene.loosePopup.ShowLoosePopup();
                                }
                            }
                        });
                    }
                });
            }
        });
    };

}

export default FloatPanel;